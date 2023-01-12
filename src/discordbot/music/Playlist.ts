import { Song } from "./Song";

export interface Playlist {
    id : string;
    songs : Song[];
    name : string;
    author_auth_id : string //private merge this with join during sending json (link this to /link endpoint for playlist) 
}