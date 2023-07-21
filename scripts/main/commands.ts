import Discord = require("discord.js");
import markdown = require("../sub/markdown");
import random = require("../sub/random");

import {supportedLanguages} from "../../bot";
import * as config from "./config";
import * as permissions from "./permissions";
import * as commandEngine from "./commandEngine"

export const list: object =
{
    ping:
    {
        execution: function(message: Discord.Message) : void
        {
            message.reply("pong");
        }
    },

    prefix:
    {
        execution: async function(message: Discord.Message, language: any, userCommand: string[]) : Promise<void>
        {
            if (permissions.message_confirmPermissions_config(message, language))
            {
                let prefix_new: string = userCommand[1];
                let responses: any = language.command.prefix.responses;

                config.write(message.guild.id, {prefix: prefix_new});

                message.reply(responses.prefix_set + markdown.code(prefix_new) + ".");
            }
        }
    },

    userinfo:
    {
        execution: function(message: Discord.Message, language: any) : void
        {
            let responses: any = language.command.userinfo.responses;

            let user: any = message.mentions.users.first();

            if (typeof user == "object")
            {
                let info: Discord.User = user;

                let info_name: string = (info.username + "#" + info.discriminator);
                let info_avatar: string = info.avatarURL({format: "webp", dynamic: true, size: 256});

                if (info_avatar == null)
                {
                    info_avatar = responses.default;
                }

                let labels: string[] = [responses.info.username, responses.info.accountID, responses.info.accountCreationDate, "Avatar"];
                let answers: any[]   = [info_name,               info.id,                  info.createdAt,                     info_avatar];
                
                commandEngine.command_listInfo(message, labels, answers);
            }
            else
            {
                message.reply(language.error.memberMention.noMemberMention);
            }
        }
    },

    serverinfo:
    {
        execution: function(message: Discord.Message, language: any) : void
        {
            let responses: any = language.command.serverinfo.responses;
            let info: Discord.Guild = message.guild;

            let labels:  string[] = [responses.info.serverID, responses.info.serverName, responses.info.serverRegion, responses.info.memberCount, responses.info.creationDate];
            let answers: any[]    = [info.id,                 info.name,                 info.region,                 info.memberCount,           info.createdAt];

            commandEngine.command_listInfo(message, labels, answers);
        }
    },

    kick:
    {
        execution: function(message: Discord.Message, language: any, userCommand: string[]) : void
        {
            let responses: any = language.command.kick.responses;

            if (permissions.message_confirmPermissions(message, ["KICK_MEMBERS"], language))
            {
                let memberMentions: Discord.GuildMember[] = commandEngine.command_getMentions_member(message, language, true);

                if (memberMentions.length > 0)
                {
                    let member: Discord.GuildMember = message.mentions.members.first();
                    let reason: string = ((userCommand.length >= 3) ? userCommand[2] : "");

                    member.kick(reason);

                    message.reply(responses.user_kicked);
                }
            }
        }
    },

    ban:
    {
        execution: function(message: Discord.Message, language: any, userCommand: string[]) : void
        {
            let responses: any = language.command.ban.responses;

            if (permissions.message_confirmPermissions(message, ["BAN_MEMBERS"], language))
            {
                let memberMentions: Discord.GuildMember[] = commandEngine.command_getMentions_member(message, language, true);

                if (memberMentions.length > 0)
                {
                    let member: Discord.GuildMember = memberMentions[0];
                    let reason: string = ((userCommand.length >= 3) ? userCommand[2] : "");
                    let tempBanDuration: number = ((userCommand.length >= 4) ? parseInt(userCommand[3]) : 0);

                    if ((typeof tempBanDuration == "number") && (tempBanDuration >= 0))
                    {
                        member.ban({reason});

                        let text_perma: string = ((tempBanDuration == 0) ? responses.perma : "");
                        let text_duration: string = ((tempBanDuration > 0) ? responses.for + tempBanDuration.toString() + responses.days : "");

                        message.reply(responses.memberWas + text_perma + responses.bannedFromTheServer + text_duration + ".");
                    }
                    else
                    {
                        message.reply(responses.error.tempBanPeriodNumber);
                    }
                }
            }
        }
    },

    roll:
    {
        execution: function(message: Discord.Message, language: any, userCommand: string[]) : void
        {
            let responses: any = language.command.roll.responses;

            let dice: string = userCommand[1];
            let sides: number = parseInt(dice.slice(1, dice.length));

            const possibleSides: number[] = [4, 6, 10, 12, 20, 100];

            for (let i = 0; i < possibleSides.length; i++)
            {
                if (sides == possibleSides[i])
                {
                    let result: number = random.range_int(1, sides);
                    message.reply(responses.result + result.toString());
                    return;
                }
            }

            message.reply(responses.error.invalidDice);
        }
    },

    random:
    {
        execution: function(message: Discord.Message, language: any, userCommand: string[]) : void
        {
            let responses: any = language.command.random.responses;

            let min: number = parseFloat(userCommand[1]);
            let max: number = parseFloat(userCommand[2]);

            if (((!isNaN(min)) && (!isNaN(max))) && (Number.isInteger(min) && Number.isInteger(max)))
            {
                if (min == max)
                {
                    message.reply(responses.error.singleRange + min);
                }
                else
                {
                    let result: number;

                    result = (min < max) ? random.range_int(min, max) : random.range_int(max, min);

                    message.reply(responses.result + result.toString());
                }
            }
            else
            {
                message.reply(responses.error.wrongInput)
            }

        }
    },

    rps:
    {
        execution: function(message: Discord.Message, language: any, userCommand: string[]) : void
        {
            let responses: any = language.command.rps.responses;
            let hands: any = Object.values(responses.hand);
    
            let hand_user: string = userCommand[1].toLowerCase();
            let hand_bot: string;

            let handID_user: number = undefined;;
            let handID_bot: number = random.range_int(-1, 1);

            for (let i: number = 0; i < hands.length; i++)
            {
                if (hands[i] == hand_user)
                {
                    handID_user = (i - 1);
                }
                
                if (i == (handID_bot + 1))
                {
                    hand_bot = hands[i];
                }
            }

            if (handID_user != undefined)
            {
                let winner: number = undefined;

                if (handID_user != handID_bot)
                {  
                    winner = (Math.abs(handID_user) == Math.abs(handID_bot)) ? Math.max(handID_user, handID_bot) : Math.min(handID_user, handID_bot);
                }

                let text_result: string = hand_bot + "! "

                if (winner == undefined)
                {
                    text_result += responses.result.draw;
                }
                else
                {
                    text_result += (winner == handID_bot) ? responses.result.win_bot : responses.result.win_user;
                }

                message.reply(text_result);
            }
            else
            {
                message.reply(responses.error.wrongInput);
            }
        }
    },

    clear:
    {
        execution: async function(message: Discord.Message, language: any, userCommand: string[]) : Promise<void>
        {
            let responses: any = language.command.clear.responses;

            if (permissions.message_confirmPermissions(message, ["MANAGE_MESSAGES"], language))
            {
                let range: number = parseFloat(userCommand[1]);

                if (isNaN(range))
                {
                    message.reply(responses.error.wrongInput);
                }
                else
                {
                    if (range > 500)  
                    {
                        message.reply(responses.error.rangeTooHigh);
                    }
                    else if (range <= 0)
                    {
                        message.reply(responses.error.rangeTooLow);
                    }
                    else
                    {
                        await message.channel.messages.fetch({limit: range}).then(messages => {message.channel.bulkDelete(messages)});
                    }
                }
            }
        }
    },

    invite:
    {
        execution: async function(message: Discord.Message, language: any, userCommand: string[]) : Promise<void>
        {
            let responses: any = language.command.invite.responses;

            let target_channel = message.channel as Discord.TextChannel;
            let expiration: number = (userCommand.length >= 2 ? parseFloat(userCommand[1]) : 24);
            let uses:       number = (userCommand.length >= 3 ? parseFloat(userCommand[2]) :  0);
            
            if (isNaN(expiration) || (expiration < 1) || (expiration > 24))
            {
                message.reply(responses.error.wrongExpiration);
            }
            else if (isNaN(uses) || (uses < 0) || (uses > 100))
            {
                message.reply(responses.error.wrongUses);
            }
            else
            {
                let invite: any = await target_channel.createInvite({maxAge: (expiration * (3600)), maxUses: uses})

                let text_inviteLink: string = ("https://discord.gg/" + invite.code);

                message.reply(text_inviteLink);
            }
        }
    },

    wikipedia:
    {
        execution: function(messages: Discord.Message, language: any, userCommand: string[]) : void
        {
            let responses: any = language.command.wikipedia.responses;
            let article = userCommand[1];
            let languagePrefix = (userCommand.length >= 3) ? userCommand[2] : responses.languagePrefix;

            let text_reply = ("https://" + languagePrefix + ".wikipedia.org/wiki/" + article);

            messages.reply(text_reply);
        }
    },

    language:
    {
        execution: async function(message: Discord.Message, language: any, userCommand: string[]) : Promise<void>
        {
            if (permissions.message_confirmPermissions_config(message, language))
            {
                let language_target: string = userCommand[1];
                let language_new: number = undefined;

                for (let i: number = 0; i < supportedLanguages.length; i++)
                {
                    if (language_target == supportedLanguages[i].toLowerCase())
                    {
                        language_new = i;
                        break;
                    }
                }

                if (language_new != undefined)
                {
                    await config.write(message.guild.id, {language: language_new});
                    
                    let responses: any = language.command.language.responses;
                    
                    message.reply(responses.language_set + markdown.code(supportedLanguages[language_new]) + ".");
                }
                else
                {
                    let responses: any = language.command.language.responses;

                    message.reply(responses.error.wrongInput); //+TODO: List all languages.
                }
            }
        }
    }

    /*
    test:
    {
        execution: function(message: Discord.Message) : void
        {
            console.log(instance.command_getMentions_member(message));
        }
    }
    */
}
