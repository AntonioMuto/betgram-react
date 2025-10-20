export interface OddsData {
    league: {
        id: number;
        name: string;
        country: string;
        flag: string;
        logo: string;
        season: number;
    }
    fixture: {
        id: number;
        timezone: string;
        date: string;
        timestamp: number;
    }
    bookmakers: OddsBookmaker[];
    fixtureId: string;
}

export interface OddsBookmaker {
    id: string;
    name: string;
    bets: OddsBet[];
}

export interface OddsBet {
    id: string;
    name: string;
    values: BetValue[];
}

export interface BetValue {
    value: string;
    odd: string;
    winner?: boolean;
}