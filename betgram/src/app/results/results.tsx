"use client";

import { Result, League } from "@/types/results";
import LeagueCollapse from "./leagueCollapse";
import { useEffect, useState } from "react";

type Props = {
  date: string;
};

export default function Results({ date }: Props) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!date) return;
    const fetchResults = async () => {
      const res = await fetch(`http://localhost:3001/api/fixtures/filter/data/${date}`);
      const json = await res.json();
      console.log("API response:", json); // 👈 stampa la forma esatta
      setResults(json);
    };
    fetchResults();
  }, [date]);

  if(results.length === 0) return <div>No results</div>;
  const uniqueLeagues: League[] = Array.from(
    new Map(
      results
        .map((r) => [r.league.id, r.league])
    ).values()
  );

  uniqueLeagues.sort((a, b) => a.name.localeCompare(b.name));
  results.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);

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
