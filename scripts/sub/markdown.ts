export function italic(string: string)    : string  {return "*"  + string + "*";}
export function bold(string: string)      : string  {return "**" + string + "**";}
export function underline(string: string) : string  {return "__" + string + "__";}
export function quote()                   : string  {return "> ";}
export function quote_multiline()         : string  {return ">>> ";}
export function code(string: string)      : string  {return "`" + string + "`";}
export function code_multiline(string: string, language: string = "") : string  {return "```" + language + "\n" + string + "```";}
