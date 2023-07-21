//#region [Initialization]

import Discord = require("discord.js");

import json_manager = require("./scripts/sub/json_manager");
import * as commandEngine from "./scripts/Main/commandEngine";

export const tsconfig: any = require("./tsconfig.json");
export const bot: Discord.Client = new Discord.Client();

export const botName:  string = "Diskoodo";
export const token:    string = "Njk1MjczOTIxMjA5MTcyMDU4.XoXzUw.ytVnqzA5o4CegLxaaUkIsT3Hp6w"; //|The password token that allows the manipulation of the bot.
export const clientID: string = "695273921209172058"; //|Bot's ID on Discord. Used in invitation links.

export const invitationLink: string = ("https://discordapp.com/oauth2/authorize?client_id=" + clientID + "&scope=bot");

export const supportedLanguages: string[] = ["English", "Polish"];

export const folder_database:   string = "database/";
export const file_serverConfig: string = "config.json";

//|Default configurations
export const prefix_default: string = tsconfig.prefix_default;
export const language_default: number = 0; 

//#endregion
//#region [Class: Diskoodo]

/**
 * @classdesc The class containing all operations of a Discord bot, Diskoodo.
 * @see Diskoodo.execute() - Class execution function.
 */
export class Diskoodo
{
    /**
     * @description The entry function for the class. 
     */
    public execute() : void
    {
        commandEngine.userCommand_listen();
        this.start(); //|Start needs to be last.
    }

    /** 
     * @description Announces the start of the application and attempts to start it using its configuration.
     */
    private start() : void
    {
        console.log("Starting " + botName + "...");
        console.log("Invitation link: " + invitationLink);
        bot.login(token);
    }
}

//#endregion
//#region [Instance Start]

json_manager.folder_create(folder_database);

export let instance: Diskoodo = new Diskoodo;
           instance.execute();

//#endregion
