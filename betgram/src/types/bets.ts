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


