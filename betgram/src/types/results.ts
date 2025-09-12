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

export interface LeagueData {
    league: {
        id: number,
        name: string,
        type: string,
        logo: string
    },
    country: {
        name: string,
        code: string,
        flag: string
    }
}

export interface FixtureData {
    fixture: Fixture,
    league: League,
    teams: Teams,
    goals: Goals,
    score: Score,
    events: Event[]
}

export interface Event {
    time: {
        elapsed: number,
        extra: number
    },
    team: {
        id: number,
        name: string,
        logo: string
    },
    player: {
        id: number,
        name: string
    },
    assist: {
        id: number,
        name: string
    },
    type: string,
    detail: string,
    comments: string
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