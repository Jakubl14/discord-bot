/**
 * @returns A random integer from the selected range.
 * @param range_min - Lowest possible number from the range.
 * @param range_max - Highest possible number from the range.
 */
export function range_int(range_min: number, range_max: number) : number
{
    return Math.floor(Math.random() * (range_max - range_min + 1) + range_min);
}
