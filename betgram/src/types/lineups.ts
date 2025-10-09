import { PlayersData } from "./results";

export interface LineupData {
    lineups: LineupInfo[];
    playersInfo: PlayersData[];
}

export interface LineupInfo {
    team: TeamInfo;
    coach: CoachInfo;
    formation: string;
    startXI: PlayerInfoPosition[];
    substitutes: PlayerInfoPosition[];
}

export interface TeamInfo {
    colors: {
        player: {
            primary: string;
            number: string;
            border: string;
        };
        goalkeeper: {
            primary: string;
            number: string;
            border: string;
        };
    }
    id: number;
    name: string;
    logo: string;
}

export interface CoachInfo {
    id: number;
    name: string;
    photo: string;
}

export interface PlayerInfoPosition {
    player: {
        id: number;
        name: string;
        number: number;
        pos: string;
        grid: string;
        photo?: string;
    }
}