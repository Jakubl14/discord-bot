import fs = require("fs");

/**
 * @description Returs whether a local folder on a provided path exists or not.
 * @param {string} folder - Path of the folder to check for.
 */
export function folder_exists(folder : string) : boolean
{
    return fs.existsSync(folder);
}

/**
 * @description Creates a local folder if it does not exist.
 * @param {string} folder - Path and a name of the folder to create. 
 */
export function folder_create(folder: string) : void
{
    if (!this.folder_exists(folder))
    {
        fs.mkdirSync(folder);
    }
}

/**
 * @description Writes an object with its properties to a JSON file.
 * @param {string} file - Path and a name of the file to write to.
 * @param {object} object - Object to save as a string inside of the file.
 */
export async function write(file: string, object: object) : Promise<void>
{
    fs.writeFile(file, JSON.stringify(object), function(error)
    {
        if (error)
        {
            console.log("ERROR (JSON_Manager.write): " + error);
        }
    })
}

/**
 * @description Reads a JSON file and returns an object inside of it as an object that can be programmatically manipulated. 
 * This function is asynchronous and will initially return only a promise of the object, until the file is actual read.
 * The "await" keyword has to be used upon calling this function.
 * @param {string} file - Path and a name of the file to read the object from.
 * @returns Promise of an Object, then actual Object if the read was succesful.
 */
export async function read(file: string) : Promise<object>
{
    return new Promise(resolve =>
    {
        fs.readFile(file, "utf8", (error : Error, jsonString: string) => 
        {
            if (error) 
            {
                console.log("File read failed: ", error);
                return;
            }
            
            try 
            {
                resolve(JSON.parse(jsonString));
            } 
            catch(error) 
            {
                console.log("Error parsing JSON string: ", error);
            } 
        });
    });
}
