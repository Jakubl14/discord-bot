import Discord = require("discord.js");

/**
 * @description Checks if the bot and the specified user has one or more specific permissions on the channel.
 * @see https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
 * @param {Discord.GuildMember} member - User to check the permissions for.
 * @param {Discord.TextChannel} channel - Channel to check bot's and user's permission on.
 * @param {Readonly<Discord.Permissions>} permissions - Permission flags to checks.
 * @returns {boolean[]} A two-element boolean that states check results in the following order: [member, bot].
 */
export function member_checkPermissionsInChannel(member: Discord.GuildMember, channel: Discord.TextChannel, permissions: Discord.PermissionString[]) : boolean[]
{        
    let permissions_member: Readonly<Discord.Permissions> = channel.permissionsFor(member);
    let permissions_bot:    Readonly<Discord.Permissions> = channel.permissionsFor(member.guild.me);

    return ([permissions_member.has(permissions), permissions_bot.has(permissions)]);
}

/**
 * @description Performs a check on whether executing a command from a message is possible
 * in scope of the current permissions of the bot and the user on the message's channel.
 * If permissions are lacking, the bot responds to the caller and states who is lacking them.
 * @see member_checkPermissionsInChannel() - The function that the checks are based on.
 * @see https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
 * @param {Discord.Message} message - Message to check permissions of and gain info from.
 * @param {Discord.PermissionString[]} permissions - Permission flags to check.
 * @param {boolean} referToCaller - Text modifier for whether refer to the answered message as "you" or "specified user". (optional, default: true)
 * @returns {boolean} Whether all permissions are granted or not.
 */
export function message_confirmPermissions(message : Discord.Message, permissions : Discord.PermissionString[], language: any, referToCaller: boolean = true) : boolean
{
    let permissionStatus: boolean[] = member_checkPermissionsInChannel(message.member, message.channel as Discord.TextChannel, permissions);

    if (permissionStatus[0] && permissionStatus[1])
    {
        return true;
    }
    else
    {
        let responses: any = language.error.permission;

        let text_reply: string = "";
        let text_user: string = (referToCaller) ? responses.caller.you : responses.caller.user;

        if (!permissionStatus[0] && !permissionStatus[1])
        {
            text_reply = responses.target.both + text_user;
        }
        else if (!permissionStatus[0])
        {
            text_reply = text_user;
        }
        else if (!permissionStatus[1])
        {
            text_reply = responses.target.bot;
        }

        text_reply += responses.noPermission;

        message.reply(text_reply);

        return false;
    }
}

/**
 * @description Performs a check on whether the caller has the permission to manage the server and is able to modify bot's configuration on the server.
 * @param {Discord.Message} message - The message of which user's to check permission of and answer to.
 */
export function message_confirmPermissions_config(message: Discord.Message, language: any) : boolean
{
    let permissionStatus: boolean[] = member_checkPermissionsInChannel(message.member, message.channel as Discord.TextChannel, ["MANAGE_GUILD"]);

    let memberHasConfigPermissions: boolean = permissionStatus[0];

    if (memberHasConfigPermissions)
    {
        return true;
    }
    else
    {
        let responses: any = language.error.config;

        message.reply(responses.noPermission);

        return false;
    }
}
