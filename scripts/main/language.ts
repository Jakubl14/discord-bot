import {prefix_default} from "../../bot";

/**
 * @description Language object stores all strings that can be printed to the user. 
 * Each language is its own object, so after saving it to a variable, all languages can be referred to in the same way.
 * 
 * The command properties are scanned by other functions to access their information and therefore can alter their functionality,
 * for example to make it require specific arguments.
 * 
 * A missing string will not crash the bot on runtime, but will cause it to print "undefined" instead.
 */
export const list: object =
{
    english:
    {
        command:
        {
            ping:
            {
                invocations: ["ping"],
                description: 'Reply to the user with a simple "pong" message. Intended as testing functionality.',
                arguments: undefined,
                arguments_optional: undefined,
                responses: undefined
            },

            prefix:
            {
                invocations: ["prefix"],
                description: ("Change the bot's invocation prefix for this server. (Default: " + prefix_default + ")"),
                arguments: ["new prefix"],
                arguments_optional: undefined,
                responses:
                {
                    prefix_set: "the server's prefix has been set to: "
                }
            },

            userinfo:
            {
                invocations: ["userinfo"],
                description: "Fetch the information about a user.",
                arguments: ["user mention"],
                arguments_optional: undefined,
                responses:
                {
                    default: "Default",

                    info:
                    {
                        username: "Username",
                        accountID: "Account ID",
                        accountCreationDate: "Account Creation Date"
                    },
                }
            },

            serverinfo:
            {
                invocations: ["serverinfo"],
                description: "Fetch the information about the server.",
                arguments: undefined,
                arguments_optional: undefined,
                responses:
                {
                    info:
                    {
                        serverID: "Server ID",
                        serverName: "Server Name",
                        serverRegion: "Server Region",
                        memberCount: "Member Count",
                        creationDate: "Creation Date"
                    }
                }
            },

            kick:
            {
                invocations: ["kick"],
                description: "Kick a user from the server.",
                arguments: ["user mention"],
                arguments_optional: ["reason"],
                responses:
                {
                    user_kicked: "user was kicked from the server."
                }
            },

            ban:
            {
                invocations: ["ban"],
                description: "Ban a user from the server. Permamently or for a specified number of days.",
                arguments: ["user mention"],
                arguments_optional: ["reason", "length (in days)"],
                responses:
                {
                    perma: "perma-",
                    for: "for ",
                    days: " days",
                    memberWas: "member was ",
                    bannedFromTheServer: "banned from the server",

                    error:
                    {
                        tempBanPeriodNumber: "please provide a proper number of days for the temporary ban period."
                    }
                }
            },

            roll:
            {
                invocations: ["roll"],
                description: "Roll a selected game dice (d4, d6, d10, d12, d20, d100).",
                arguments: ["type"],
                arguments_optional: undefined,
                responses:
                {
                    result: "the result is: ",

                    error:
                    {
                        invalidDice: "invalid command. Please choose from: d4, d6, d10, d12, d20, d100."
                    }
                }
            },

            random:
            {
                invocations: ["random"],
                description: "Draw a random number from choosen range.",
                arguments: ["range1", "range2"],
                arguments_optional: undefined,
                responses:
                {
                    result: "the result is: ",

                    error:
                    {
                        singleRange: "the provided numbers are the same, so the result will always be: ",
                        wrongInput: "invalid command. Please provide two different integer numbers."
                    }
                }
            },

            rps:
            {
                invocations: ["rps"],
                description: "Play a round of Rock-Paper-Scissors with me.",
                arguments: ["hand"],
                arguments_optional: undefined,
                responses:
                {
                    hand: 
                    {
                        paper: "paper",
                        rock: "rock", 
                        scissors: "scissors"
                    },

                    result: 
                    {
                        draw: "It's a draw!",
                        win_bot: "I won!",
                        win_user: "You won!"
                    },

                    error:
                    {
                        wrongInput: "invalid command. Please provide a proper hand: Rock, Paper or Scissors."
                    }
                }
            },

            clear:
            {
                invocations: ["clear"],
                description: "Remove a selected number of messages from before.",
                arguments: ["number"],
                arguments_optional: undefined,
                responses:
                {
                    error:
                    {
                        wrongInput: "invalid command. Please provide a number of messages to remove.",
                        rangeTooLow: "this number is too low. No action has been taken.",
                        rangeTooHigh: "this number is too high. Please provide a number that isn't higher than 500."
                    }
                }
            },

            invite:
            {
                invocations: ["invite"],
                description: "Create a invite link to the current channel.",
                arguments: undefined,
                arguments_optional: ["expiration (in hours)", "use limit"],
                responses:
                {
                    error:
                    {
                        wrongExpiration: "the expiration time for the invite period is incorrect. Please input a number of hours after which the invite will expire, from 1 to 24.",
                        wrongUses: "the number of use limit for the invite is incorrect. Please provide a number from 1 to 100."
                    }
                }
            },

            wikipedia:
            {
                invocations: ["wikipedia", "wiki", "encyclopedia"],
                description: "Fetch an article from Wikipedia.",
                arguments: ["article"],
                arguments_optional: ["language prefix"],
                responses:
                {
                    languagePrefix: "en"
                }
            },

            language:
            {
                invocations: ["language"],
                description: "Change the bot's language for this server (English/Polish).",
                arguments: ["name"],
                arguments_optional: undefined,
                responses:
                {
                    language_set: "my language for this server has been set to: ",
                    
                    error:
                    {
                        wrongInput: "the provided language name is wrong or the language is not supported."
                    }
                }
            }
        },

        error:
        {
            argument:
            {
                wrongArguments_single:  "this command requires the following argument",
                wrongArguments_mutiple: "this command requires the following arguments"
            },

            permission:
            {
                caller:
                {
                    you: "you",
                    user: "the specified user"
                },

                target:
                {
                    both: "both me and ",
                    bot: "I"
                },

                noPermission: " lack the permission for this operation."
            },

            config:
            {
                noPermission: "you lack the permission to manage the current server and therefore cannot modify my configuration for it."
            },

            memberMention:
            {
                noMemberMention: "please provide a member mention.",
                memberNotFound: "server member not found."
            }
        }
    },

    polish:
    {
        command:
        {
            ping:
            {
                invocations: ["ping"],
                description: 'Odpowiedz do użytkownika prostą wiadomością "pong". Do użytku jako test.',
                arguments: undefined,
                arguments_optional: undefined,
                responses: undefined
            },

            prefix:
            {
                invocations: ["prefiks", "prefix"],
                description: ("Zmień prefiks wywołania bota na tym serwerze. (Domyślny: " + prefix_default + ")"),
                arguments: ["nowy prefiks"],
                arguments_optional: undefined,
                responses:
                {
                    prefix_set: "prefiks serwera został ustawiony na: "
                }
            },

            userinfo:
            {
                invocations: ["użytkownik", "userinfo"],
                description: "Pobierz informacje o użytkowniku.",
                arguments: ["wspomnienie użytkownika"],
                arguments_optional: undefined,
                responses:
                {
                    default: "Domyślny",

                    info:
                    {
                        username: "Nazwa użytkownika",
                        accountID: "ID Konta",
                        accountCreationDate: "Data utworzenia konta"
                    }
                }
            },

            serverinfo:
            {
                invocations: ["serwer", "serwerinfo", "serverinfo"],
                description: "Pobierz informacje o serwerze.",
                arguments: undefined,
                arguments_optional: undefined,
                responses:
                {
                    info:
                    {
                        serverID: "ID Serwera",
                        serverName: "Nazwa Serwera",
                        serverRegion: "Region Serwera",
                        memberCount: "Liczba Członków",
                        creationDate: "Data Utworzenia"
                    }
                }
            },

            kick:
            {
                invocations: ["wyrzuć", "kick"],
                description: "Wyrzuć użyszkodnika z serwera.",
                arguments: ["wspomnienie użytkownika"],
                arguments_optional: ["powód"],
                responses:
                {
                    user_kicked: "użyszkodnik został wyrzucony z serwera."
                }
            },

            ban:
            {
                invocations: ["zablokuj", "blokada", "ban"],
                description: "Zablokuj użyszkodnikowi dostęp do serwera. Na stałe lub na określoną ilość dni.",
                arguments: ["wspomnienie użytkownika"],
                arguments_optional: ["powód", "długość (w dniach)"],
                responses:
                {
                    perma: "na stałe ",
                    for: "na ",
                    days: " dni",
                    memberWas: "dostęp użyszkodnika do serwera został ",
                    bannedFromTheServer: "zablokowany ",

                    error:
                    {
                        tempBanPeriodNumber: "proszę podać poprawną ilość dni okresu tymczasowej blokady."
                    }
                }
            },

            roll:
            {
                invocations: ["kość", "rzut", "roll"],
                description: "Rzuć kostką do gry (d4, d6, d10, d12, d20, d100).",
                arguments: ["typ"],
                arguments_optional: undefined,
                responses:
                {
                    result: "wynik to: ",

                    error:
                    {
                        invalidDice: "niepoprawna komenda. Proszę wybrać z: d4, d6, d10, d12, d20, d100."
                    }
                }
            },

            random:
            {
                invocations: ["losuj", "random"],
                description: "Wylosuj liczbę z wybranego przedziału",
                arguments: ["zasięg1", "zasięg2"],
                arguments_optional: undefined,
                responses:
                {
                    result: "wynik to: ",

                    error:
                    {
                        singleRange: "podane liczby są takie same, więc wynikiem zawsze będzie: ",
                        wrongInput: "niepoprawna komenda. Proszę podać dwie różne liczby całkowite."
                    }
                }
            },

            rps:
            {
                invocations: ["pkn", "papierkamieńnożyce", "papierkamiennozyce", "papierkamieńnozyce", "papierkamiennożyce", "rps"],
                description: "Rozegraj ze mną rundę w Papier-Kamień-Nożyce.",
                arguments: ["ręka"],
                arguments_optional: undefined,
                responses:
                {
                    hand: 
                    {
                        paper: "papier",
                        rock: "kamień", 
                        scissors: "nożyce"
                    },

                    result: 
                    {
                        draw: "Remis!",
                        win_bot: "Wygrywam!",
                        win_user: "Wygrywasz!"
                    },

                    error:
                    {
                        wrongInput: "niepoprawna komenda. Proszę podać poprawną rękę: Papier, kamień lub nożyce."
                    }
                }
            },

            clear:
            {
                invocations: ["czyść", "clear"],
                description: "Usuń wybraną liczbę poprzedzających wiadomości.",
                argument: ["liczba"],
                arguments_optional: undefined,
                responses:
                {
                    error:
                    {
                        wrongInput: "niepoprawna komenda. Proszę podać liczbę wiadomości do usunięcia.",
                        rangeTooLow: "ta liczba jest zbyt niska. Nie podjęto żadnej akcji.",
                        rangeTooHigh: "ta liczba jest zbyt wysoka. Proszę podać liczbę, która nie jest większa od 500."
                    }
                }
            },

            invite:
            {
                invocations: ["zaproszenie", "zaproś", "zapros", "invite"],
                description: "Stwórz link zaproszenia na obecny kanał.",
                arguments: undefined,
                arguments_optional: ["wygaśnięcie (w godzinach)", "limit użyć"],
                responses:
                {
                    error:
                    {
                        wrongExpiration: "okres wygaśnięcia zaproszenia jest nieprawidłowy. Proszę podać liczbe godzin po których zaproszenie wygaśnie od 1 do 24.",
                        wrongUses: "liczba limitu użyć zaproszenia jest nieprawidłowy. Proszę podać liczbę od 1 do 100."
                    }
                }
            },

            wikipedia:
            {
                invocations: ["wikipedia", "wiki", "encyklopedia"],
                description: "Pobierz link do artykułu na Wikipedii.",
                arguments: ["artykuł"],
                arguments_optional: ["prefiks językowy"],
                responses:
                {
                    languagePrefix: "pl"
                }
            },

            language:
            {
                invocations: ["język", "jezyk", "language"],
                description: "Zmień język bota dla tego serwera (English/Polish).",
                arguments: ["nazwa"],
                arguments_optional: undefined,
                responses:
                {
                    language_set: "mój język dla tego serwera został ustawiony na: ",
                    
                    error:
                    {
                        wrongInput: "podana nazwa języka jest niepoprawna lub ten język nie jest wspierany"
                    }
                }
            }
        },

        error:
        {
            argument:
            {
                wrongArguments_single:  "ta komenda wymaga poniższego argumentu",
                wrongArguments_mutiple: "ta komenda wymaga poniższych argumentów"
            },

            permission:
            {
                caller:
                {
                    you: "tobie",
                    user: "temu użytkownikowi"
                },

                target:
                {
                    both: "zarówno mi, jak i ",
                    bot: "mi"
                },

                noPermission: " brakuje uprawnień do wykonania tej operacji."
            },

            config:
            {
                noPermission: "brakuje ci uprawnień, aby modyfikować obecny serwer, przez co nie możesz modyfikować mojej konfiguracji dla niego."
            },

            memberMention:
            {
                noMemberMention: "proszę podać wspomnienie członka serwera.",
                memberNotFound: "nie znaleziono członka serwera."
            }
        }
    }
}
