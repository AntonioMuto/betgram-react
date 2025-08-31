export interface Result {
    fixture: Fixture;
    league: League;
    teams: Teams;
    goals: Goals;
    score: Score;
}

export interface Fixture {
    id: number,
    referee: string,
    timezone: string,
    date: string,
    timestamp: number,
    venue: Venue,
    status: Status
}

export interface Venue {
    id: number,
    name: string,
    city: string
}

export interface Status {
    long: string,
    short: string,
    elapsed: number,
    extra: number
}

export interface League {
    id: number,
    name: string,
    country: string,
    logo: string,
    flag: string,
    season: number,
    round: string,
    standings: boolean
}

export interface Teams {
    home: {
        id: number,
        name: string,
        logo: string,
        winner: boolean
    },
    away: {
        id: number,
        name: string,
        logo: string,
        winner: boolean
    }
}

export interface Goals {
    home: number,
    away: number
}

export interface Score {
    halftime: {
        home: number,
        away: number
    },
    fulltime: {
        home: number,
        away: number
    },
    extratime: {
        home: number,
        away: number
    },
    penalty: {
        home: number,
        away: number
    }
}