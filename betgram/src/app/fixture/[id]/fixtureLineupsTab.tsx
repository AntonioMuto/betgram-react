import { GoalKeeperField } from "@/app/components/GoalKeeperField";
import { SvgCornerShape } from "@/app/components/SvgCornerShape";
import { SvgPenaltyArea } from "@/app/components/SvgPenaltyArea";
import { LineupData } from "@/types/lineups";
import { FixtureData } from "@/types/results";
import { useEffect, useState } from "react";

type FixtureScorersProps = {
    fixture: FixtureData;
};

export default function FixtureLineupsTab({ fixture }: FixtureScorersProps) {
    const [lineups, setLineups] = useState<LineupData | null>(null);

    useEffect(() => {
        const fetchLineups = async () => {
            const res = await fetch(`https://betgram.click/api/lineups/${fixture.fixture.id}`, {
                headers: { "Cache-Control": "no-cache" },
            });
            const json = await res.json();
            setLineups(json);
        };
        fetchLineups();
    }, [fixture]);

    if (!lineups) return <div>Caricamento formazioni...</div>;

    return (
        <div>
           <GoalKeeperField  goalKeeper={lineups.lineups[0].startXI[0]} />
        </div>
    );
}