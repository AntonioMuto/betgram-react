'use client'
import { FixtureData, FixtureStatistics, Statistic, StatPercentages } from "@/types/results";
import { useEffect, useMemo, useState } from "react";
import ProgressBar from "./progressBar";
import { translate } from "@/app/utils/translate";

interface FixtureDetailTabProps {
    fixture: FixtureData;
}

export default function FixtureStatsTab({ fixture }: FixtureDetailTabProps) {

    const [statistics, setStatistics] = useState<FixtureStatistics[] | null>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchFixtureStats = async () => {
            const res = await fetch(`https://betgram.click/api/fixtures/statistics/${fixture.fixture.id}`, {
                headers: { "Cache-Control": "no-cache" },
            });
            const json = await res.json();
            setStatistics(json);
            setIsLoading(false)
        };
        fetchFixtureStats();
    }, [fixture.fixture.id]);

    function buildstatsHashMap(fixture: FixtureData) {
        const result: Record<string, Record<string, string | null>> = {};

        statistics?.forEach(teamData => {
            const teamId = teamData.team.id;

            teamData.statistics.forEach(stat => {
                if (!result[stat.type]) {
                    result[stat.type] = {};
                }
                result[stat.type][teamId] = stat.value;
            });
        });

        return result;
    }

    const statsHashMap = useMemo(
        () => {
            return buildstatsHashMap(fixture)
        },
        [statistics]
    );

    const percentagesMap = useMemo(() => {
        if (!statsHashMap) return {};
        const map: Record<string, StatPercentages> = {};
        Object.entries(statsHashMap).forEach(([title, teams]) => {
            map[title] = getStatPercentages(teams);
        });
        return map;
    }, [statsHashMap, getStatPercentages]);

    function getStatPercentages(stat: Record<string, string | null>): StatPercentages {
        const [homeId, awayId] = Object.keys(stat);
        const homeRaw = stat[homeId] ?? "0";
        const awayRaw = stat[awayId] ?? "0";
        const parseValue = (value: string | null) => {
            if (!value) return 0;
            if (value.includes("%")) return parseInt(value);
            return Number(value);
        };

        const homeValue = parseValue(homeRaw);
        const awayValue = parseValue(awayRaw);

        let homePercent = 0;
        let awayPercent = 0;

        if ((homeRaw.includes("%") ?? false) || (awayRaw.includes("%") ?? false)) {
            homePercent = homeValue;
            awayPercent = awayValue;
        } else {
            const sum = homeValue + awayValue;
            if (sum > 0) {
                homePercent = (homeValue / sum) * 100;
                awayPercent = (awayValue / sum) * 100;
            }
        }

        return { homePercent, awayPercent, homeRaw, awayRaw };
    }


    return (
        <div className="p-6">
            {
                isLoading ? (
                    <div className="md:col-span-5 flex bg-custom-dark border border-gray-800 rounded-box shadow-md p-4 justify-center">
                        <div className="flex w-full flex-col gap-4">
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                            <div className="skeleton h-7 w-full"></div>
                        </div>
                    </div>
                ) :
                    percentagesMap &&
                    Object.entries(percentagesMap).map(([title, { homePercent, awayPercent, homeRaw, awayRaw }]) => (
                        <div key={title} className="flex flex-col mb-7">
                            <div className="flex flex-row justify-between mb-1 gap-1">
                                <h3 className="text-lg ">{homeRaw}</h3>
                                <h3 className="text-md">{translate(title).toUpperCase()}</h3>
                                <h3 className="text-lg">{awayRaw}</h3>
                            </div>
                            <ProgressBar
                                homeValue={homePercent}
                                awayValue={awayPercent}
                                homeColor="bg-rose-800"
                                awayColor="bg-indigo-900"
                            />
                        </div>
                    ))}
        </div>
    );
}