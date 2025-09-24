'use client'
import { FixtureData, FixtureStatistics } from "@/types/results";
import { useEffect, useState } from "react";

interface FixtureDetailTabProps {
    fixture: FixtureData;
}

export default function FixtureStatsTab({ fixture }: FixtureDetailTabProps) {

    const [statistics, setStatistics] = useState<FixtureStatistics[] | null>([]);

    useEffect(() => {
        const fetchFixtureStats = async () => {
            const res = await fetch(`https://betgram.click/api/fixtures/statistics/${fixture.fixture.id}`, {
                headers: { "Cache-Control": "no-cache" },
            });
            const json = await res.json();
            setStatistics(json);
        };
        fetchFixtureStats();
    }, [fixture.fixture.id]);

    return (
        <div>
            
        </div>
    );
}