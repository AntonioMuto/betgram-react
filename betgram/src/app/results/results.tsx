"use client";

import { Result } from "@/types/results";
import { League } from "@/types/results";
import LeagueCollapse from "./leagueCollapse";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiHandler } from "@/utils/apiHandler";
import { addError } from "@/store/errorSlice";
import ErrorAlerts from "../components/ErrorAlerts";
import { isFixtureInProgress } from '@/app/utils/fixtureState'; // Added import for isFixtureInProgress

type Props = {
  date: string;
};

export default function Results({ date }: Props) {
  const dispatch = useDispatch();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchByDate = async (): Promise<Result[]> => {
    setLoading(true);
    try {
      const res = await apiHandler<Result[]>(
        `https://betgram.click/api/fixtures/filter/data/${date}`
      );
      setResults(res);
      setLoading(false);
      return res;
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      dispatch(addError(errorMessage));
      setLoading(false);
      throw err; // Ensure the error is propagated
    }
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
    const res = await apiHandler<any>(
      "https://api.jsonsilo.com/public/9147f508-d2b4-4309-8028-f82dc554152d"
    );
    const json = res; // Removed `.json()` as `apiHandler` already parses JSON
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
    new Set(results.map((item) => item.league.id))
  ).map((id) => results.find((item) => item.league.id === id)?.league!);

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
          <div className="flex w-100 flex-col gap-4">
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
            </div>
        </div>
      ) : results.length === 0 ? (
        <div className="md:col-span-8 flex flex-col items-center bg-custom-dark justify-center bg-base-100 p-4 text-center rounded shadow-md">
          <h2 className="text-xl font-bold text-gray-200 mb-2">
            Nessun match in programma
          </h2>
          <p className="text-gray-500 mb-4">
            Non ci sono partite disponibili per la data selezionata. Prova a scegliere un'altra data.
          </p>
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
      <ErrorAlerts />
    </>
  );
}
