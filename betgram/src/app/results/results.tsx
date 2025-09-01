"use client";

import { Result, League } from "@/types/results";
import LeagueCollapse from "./leagueCollapse";
import { useEffect, useState } from "react";

type Props = {
  date: string;
};

export default function Results({ date }: Props) {
  const [results, setResults] = useState<Result[]>([]);
  const leagues: number[] = [135, 78, 94, 61, 140, 39];

  useEffect(() => {
    if (!date) return;
    const fetchResults = async () => {
      const res = await fetch(`http://localhost:3000/mock/results.json?date=${date}`);
      const json = await res.json();
      setResults(json.response);
    };
    fetchResults();
  }, [date]);

  const uniqueLeagues: League[] = Array.from(
    new Map(
      results
        .filter((r) => leagues.includes(r.league.id))
        .map((r) => [r.league.id, r.league])
    ).values()
  );

  const fixturesByLeagueId: { [leagueId: number]: Result[] } = {};
  results.forEach((result) => {
    const leagueId = result.league.id;
    if (fixturesByLeagueId[leagueId]) {
      fixturesByLeagueId[leagueId].push(result);
    } else {
      fixturesByLeagueId[leagueId] = [result];
    }
  });

  return (
    <>
      {uniqueLeagues.map((league) => (
        <LeagueCollapse
          key={league.id}
          league={league}
          matches={fixturesByLeagueId[league.id]}
        />
      ))}
    </>
  );
}
