export interface Authentication {
    id: string,
    username: string,
    password: string, // hashed
    email: string,
    salt: string,
    iterations: number,
    authKey: string
}

export interface DiscordAuthorizationLink {
    id : string;
    discord_id : string;
    auth_id: string //link to account auth
    discord_link_authKey : string;
}