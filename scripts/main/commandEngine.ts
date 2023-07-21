import Discord = require("discord.js");
import {bot, prefix_default, folder_database, file_serverConfig} from "../../bot";

import * as commands from "./commands";
import * as config from "./config"
import * as language from "./language";

import json_manager = require("../sub/json_manager");
import markdown = require("../sub/markdown");


/**
 * @description The bot reads the user chat messages and attempts to recognize its own prefix and then available command. 
 * If successful, it will execute the function listed on that command's configuration.
 */
export async function userCommand_listen() : Promise<void>
{
    bot.on("message", async (message: Discord.Message) =>
    {
        message.content = message.content.toLowerCase();

        let prefix: string = prefix_default;

        let folder_serverDatabase: string = ("./" + folder_database + message.guild.id + "/");

        if (!json_manager.folder_exists(folder_serverDatabase))
        {
            config.createDefault(message.guild.id);
        }
        else
        {
            let config: any = await json_manager.read("./" + folder_database + message.guild.id + "/" + file_serverConfig);

            prefix = config.prefix;
        }

        if (message.content.charAt(0) == prefix)
        {
            let userCommand: string[] = message.content.slice(prefix.length).split(" "); //|Cut the prefix from the command, so it can be easily read.
            
            if (userCommand[0] == "help")
            {
                command_listAll(message.channel as Discord.TextChannel, await message_language(message)); //|message.channel can be of 3 different types, 
                                                                                                                    // so it has to be speficially treated as TextChannel.
            }
            else
            {
                let languageID: number = await message_language(message);
                let language_current: any = language.list[Object.keys(language.list)[languageID]];

                Object.values(language_current.command).forEach(async (command: any, i: number) => 
                {
                    let validCommand: boolean = false;

                    for (let i = 0; i < command.invocations.length; i++)
                    {
                        if (userCommand[0] == command.invocations[i])
                        {
                            validCommand = true;
                        }
                    }

                    if (validCommand)
                    {
                        if ((command.arguments != undefined) && ((userCommand.length - 1) < command.arguments.length))
                        {
                            let responses: any = language_current.error.argument;

                            let text_arguments: string = ((command.arguments.length) <= 1 ? responses.wrongArguments_single : responses.wrongArguments_multiple);

                            message.reply(text_arguments + ": " + markdown.code(command_formatArguments(command, true)));
                        }
                        else
                        {
                            let command: any = Object.values(commands.list);

                            command[i].execution(message, language_current, userCommand);
                        }
                    }
                });
            }
        }
    });
}

/** 
 * @description Reads the list of all available commands and then uses it to create a reply to the user.
 * @param {Discord.TextChannel} channel - The channel to send the message to.
 */
export function command_listAll(channel: Discord.TextChannel, languageID: number) : void
{
    let text: string = markdown.quote_multiline(); //|Starting a Discord message in this way will create a simple formatted message.
    let language_current: any = language.list[Object.keys(language.list)[languageID]];
    let commands: any = Object.values(language_current.command);
    let invocations: any = Object.keys(language_current.command);

    for (let i: number = 0; i < invocations.length; i++)
    {
        let text_arguments: string = command_formatArguments(commands[i]);

        if (text_arguments.length > 0)
        {
            text_arguments = (" " + text_arguments);
        }
        
        text += (markdown.code(invocations[i] + text_arguments) + ": " + commands[i].description + "\n\n");
    }

    channel.send(text);
}

/**
 * @description Replies with a message with a format of "Label: Property" suited for creating informational panels.
 * @param {Discord.Message} message - Message to reply to.
 * @param {string[]} labels - Text labels that explain purpose of the listed properties.
 * @param {any[]} properties - Properties to list.
 */
export function command_listInfo(message: Discord.Message, labels: string[], properties: any[]) : void
{
    let answer: string = ("\n" + markdown.quote_multiline());

    for (let i: number = 0; i < properties.length; i++)
    {
        answer += (markdown.bold(labels[i] + ":") + " " + properties[i] + "\n");
    }

    message.reply(answer);
}

/**
 * @description Formats a string that lists all optional arguments of a specified command in the following way: [argument1, argument2...]. 
 * Returns an empty string if the arguments are undefined.
 * @param {property} command - The command to return the arguments of.
 * @returns string
 */
export function command_formatArguments(command: any, ignoreOptional: boolean = false) : string
{
    let text_arguments: string = "";

    let argumentTypes: string[] = ((ignoreOptional) ? [command.arguments] : [command.arguments, command.arguments_optional]);

    for (let i = 0; i < argumentTypes.length; i++)
    {
        let argumentSet = argumentTypes[i];

        if (argumentSet != undefined)
        {
            let text_addon: string = ((argumentSet == command.arguments_optional) ? "*" : "");

            if (text_arguments.length <= 0) 
            {
                text_arguments = "[";
            }

            for (let j: number = 0; j < argumentSet.length; j++)
            {
                text_arguments += (text_addon + argumentSet[j]);

                if (j != (argumentSet.length - 1) || (i != argumentTypes.length && argumentTypes[i + 1] != undefined))
                {
                    text_arguments += ", ";
                }
            }
        }
    }

    if (text_arguments.length > 0)
    {
        text_arguments += "]";
    }

    return text_arguments;
}

/**
 * @description Gets the ID of the language from the configuration of the server where a specific language was sent to.
 * @see supportedLanguages - Array that the ID refers to.
 * @param {Discord.Message} message - Message to get the configuration of.
 * @returns {number} A value containing the ID of the language, as it is saved in the configuration and referred in the array.
 */
export async function message_language(message: Discord.Message) : Promise<number>
{
    let database_channelFolder: string = (folder_database + message.guild.id + "/");
    let json_file: string = (database_channelFolder + file_serverConfig);

    let config: any = await json_manager.read(json_file);
    let languageID: number = config.language;

    return languageID;
}

/**
 * @description Gathers all member mentions from the message into an array. Also can respond to the caller with an 
 * error message if none are found or a non-member mention was provided.
 * @param {Discord.Message} message - Message to gather mentions from and to reply to.
 * @param {boolean} replyOnError - Whether or not reply to the caller if incorrect input was provided.
 * @returns {Discord.GuildMember[]} An array of mentioned guild members. Will be empty on no mentions or error.
 */
export function command_getMentions_member(message: Discord.Message, language: any, replyOnError: boolean = false) : Discord.GuildMember[]
{
    let responses: any = language.error.memberMention;

    let memberMentions: Discord.GuildMember[] = message.mentions.members.array();
    
    if (replyOnError)
    {
        if (memberMentions.length <= 0)
        {
            message.reply(responses.noMemberMention);
        }
        else
        {
            for (let i: number = 0; i < memberMentions.length; i++)
            {
                if (typeof memberMentions[i] != "object")
                {
                    message.reply(responses.memberNotFound);
                    return [];
                }
            }
        }
    }

    return memberMentions;
}
