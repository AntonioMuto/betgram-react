export interface betPredictionData {
    tipped: string;
    bonus: string;
    total: string;
}

export interface UserBet {
    user: string;
    summaryBet: betPredictionData;
    isLive: boolean;
    isCompleted: boolean;
    id: string;
    tippedDate: string;
    status: string;
    totalEvents: number;
    totalWons: number;
    totalLost: number;
}


export interface BetInfo {
    user: string;
    events: Array<{
        fixture: {
            id: number;
            date: string;
            status: {
                short: string;
                elapsed: number | null;
                extra: string | null;
            };
            teams: {
                home: {
                    id: number;
                    name: string;
                    logo: string;
                    winner: boolean | null;
                };
                away: {
                    id: number;
                    name: string;
                    logo: string;
                    winner: boolean | null;
                };
            };
            goals: {
                home: number | null;
                away: number | null;
            };
            league: {
                id: number;
                name: string;
                country: string;
                logo: string;
                flag: string | null;
            };
        };
        bet: {
            id: number;
            name: string;
            values: Array<{
                value: string;
                odd: string;
                winner?: boolean;
            }>;
        };
    }>;
    summaryBet: betPredictionData;
    isLive: boolean;
    isCompleted: boolean;
    id: string;
    tippedDate: string;
    status: string;
}   
