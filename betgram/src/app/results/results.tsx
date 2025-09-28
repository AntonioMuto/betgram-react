"use client";

import { Result, League } from "@/types/results";
import LeagueCollapse from "./leagueCollapse";
import { useEffect, useState } from "react";
import { isFixtureInProgress } from "../utils/fixtureState";

type Props = {
  date: string;
};

export default function Results({ date }: Props) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchByDate = async (): Promise<Result[]> => {
    setLoading(true);
    const res = await fetch(
      `https://betgram.click/api/fixtures/filter/data/${date}`,
      {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      }
    );
    const json = await res.json();
    setResults(json);
    setLoading(false);
    return json;
  };

  const mergeLiveData = (results: Result[], liveJson: any): Result[] => {
    if (!liveJson || !liveJson[0]?.live) return results;

    const liveFixtures = liveJson[0].live;

    return results.map((r) => {
      const match = liveFixtures.find(
        (l: any) => l.fixture.id === r.fixture.id
      );

      if (match) {
        return {
          ...r,
          fixture: {
            ...r.fixture,
            status: match.fixture.status,
          },
          goals: match.goals,
          score: match.score,
        };
      }

      return r;
    });
  };

  const fetchLive = async () => {
    const res = await fetch(
      "https://api.jsonsilo.com/public/9147f508-d2b4-4309-8028-f82dc554152d",
      {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      }
    );
    const json = await res.json();
    setResults((prev) => mergeLiveData(prev, json));
  };

  useEffect(() => {
    if (!date) return;

    let interval: NodeJS.Timeout | null = null;

    const init = async () => {
      const initialResults = await fetchByDate();

      const d = new Date();
      const today = `${String(d.getDate()).padStart(2, "0")}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}-${d.getFullYear()}`;

      const isToday = date === today;
      if (!isToday) return;

      const hasInProgress = initialResults.some((r) =>
        isFixtureInProgress(r.fixture.status.short)
      );

      if (hasInProgress) {
        fetchLive();
        interval = setInterval(fetchLive, 20000);
      }
    };

    init();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [date]);

  const uniqueLeagues: League[] = Array.from(
    new Map(results.map((r) => [r.league.id, r.league])).values()
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
      {loading ? (
        <div className="md:col-span-8 flex flex-col items-center justify-center bg-base-100 ">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : results.length === 0 ? (
        <div className="md:col-span-8 flex flex-col items-center justify-center bg-base-100 p-4 text-center rounded">
          Nessun match in programma
        </div>
      ) : (
        uniqueLeagues.map((league) => (
          <LeagueCollapse
            key={league.id}
            league={league}
            matches={fixturesByLeagueId[league.id]}
          />
        ))
      )}
    </>
  );
}
