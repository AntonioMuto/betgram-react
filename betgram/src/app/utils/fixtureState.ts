export function isFixtureInProgress(code: string) {
    switch (code) {
        case "1H": 
        case "HT":
        case "2H":
        case "ET":
        case "BT":
        case "P":
        case "SUSP":
        case "INT":
        case "LIVE":
            return true;
        default:
            return false;
    }
}

export function isFixtureScheduled(code: string) {
    switch (code) {
        case "TBD":
        case "NS":
            return true;
        default:
            return false;
    }
}

export function isFixtureFinished(code: string) {
    switch (code) {
        case "FT": 
        case "AET":
        case "PEN":
            return true;
        default:
            return false;
    }
}