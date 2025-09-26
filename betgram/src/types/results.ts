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
    players?: PlayersData[];
}

export interface PlayersData {
    team: {
        id: number,
        name: string,
        logo: string,
        update: string
    },
    players: PlayerData[]
}

export interface PlayerInfoModal {
    playerId: number,
    teamId: number
}

export interface PlayerData {
    player: {
        id: number,
        name: string,
        photo: string
    },
    statistics: Statistic[]
}

export interface Statistic {
    games: {
        minutes: number,
        number: number,
        position: string,
        rating: string,
        captain: boolean,
        substitute: boolean
    },
    offsides: null,
    shots: {
        total: null,
        on: null
    },
    goals: {
        total: null,
        conceded: number,
        assists: number,
        saves: number
    },
    passes: {
        total: number,
        key: number,
        accuracy: string
    },
    tackles: {
        total: number,
        blocks: number,
        interceptions: number
    },
    duels: {
        total: number,
        won: number
    },
    dribbles: {
        attempts: number,
        success: number,
        past: number
    }
    fouls: {
        drawn: number,
        committed: number
    },
    cards: {
        yellow: number,
        red: number
    },
    penalty: {
        won: number,
        commited: number,
        scored: number,
        missed: number,
        saved: number
    }
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

export interface FixtureStatistics {
    team: {
        id: number,
        name: string,
        logo: string
    },
    statistics: FixtureStatistic[]
}

export interface FixtureStatistic {
    type: string,
    value: string
}

export interface StatPercentages {
  homePercent: number;
  awayPercent: number;
  homeRaw: string | null;
  awayRaw: string | null;
};