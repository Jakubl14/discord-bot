import fs = require("fs");
import json_manager = require("../sub/json_manager");

import {prefix_default, language_default, file_serverConfig, folder_database} from "../../bot"


/**
 * @description Creates a pre-set database for the server in a folder named with the server ID to allow the bot to work while using it as a base.
 * @see config_write() - The function used to write to the database.
 * @param {string} serverID - Unique ID of the server given by Discord of which configuration is to be written, used as name of the folder in the database.
 */
export async function createDefault(serverID: string) : Promise<void>
{
    write(serverID,
    {
        prefix: prefix_default,
        language: language_default
    });
}

/**
 * @description Writes object content to the server's cofiguration file.
 * @param {string} serverID - Unique ID of the server given by Discord of which configuration is to be written, used as name of the folder in the database.
 * @param {object} content - Content to be written in the configuration.
 */
export async function write(serverID: string, content: object) : Promise<void>
{
    let database_channelFolder: string = (folder_database + serverID + "/");

    json_manager.folder_create(database_channelFolder);

    let json_file: string = (database_channelFolder + file_serverConfig);

    let config: object = {};

    if (fs.existsSync(json_file))
    {
        config = await json_manager.read(json_file);
    }

    Object.assign(config, content);

    await json_manager.write(json_file, config);
}

