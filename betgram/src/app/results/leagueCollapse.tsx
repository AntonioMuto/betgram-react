"use client";
import { League, Result } from "@/types/results";
import { useMemo, useState } from "react";
import { formatTimeToTimezone } from "@/app/utils/date";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { isFixtureInProgress, isFixtureScheduled } from "../utils/fixtureState";

type LeagueData = {
  league: League;
  matches: Result[];
  clearLiveInterval: () => void; // Aggiungi il tipo per la funzione di callback
};

export default function LeagueCollapse({ league, matches, clearLiveInterval }: LeagueData) {
  const [open, setOpen] = useState(true);
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";
  const router = useRouter();


  const { inProgressCount, scheduledCount, finishedCount } = useMemo(() => {
    let inProgress = 0;
    let scheduled = 0;
    let finished = 0;

    matches.forEach((match) => {
      const status = match.fixture.status.short;
      if (isFixtureInProgress(status)) inProgress++;
      else if (isFixtureScheduled(status)) scheduled++;
      else finished++;
    });

    return { inProgressCount: inProgress, scheduledCount: scheduled, finishedCount: finished };
  }, [matches]);

  const showInfo = (fixtureId: number) => {
    clearLiveInterval(); // Chiama la funzione per cancellare l'interval
    router.push(`/fixture/${fixtureId}`);
  }

  return (
    <div
      className={`collapse collapse-arrow bg-custom-league-card border-base-300  mx-auto mb-2  
        ${!open ? "hover:bg-highlight-custom-dark" : ""}`}
    >
      <input
        key={`checkbox-league-${league.id}`}
        type="checkbox"
        checked={open}
        onChange={() => setOpen((prev) => !prev)}
      />
      <div className="collapse-title text-base">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              src={league.flag ?? league.logo}
              alt={league.name}
              className="w-8 h-8 object-contain"
            />
            <div className="p-1 ml-2 text-xl font-bold ">{league.name}</div>
          </div>
          {!open && (
            <div className="flex gap-2">
              {inProgressCount > 0 && (
                <div className="badge badge-error text-lg">{inProgressCount}</div>
              )}
              {scheduledCount > 0 && (
                <div className="badge badge-warning text-lg">{scheduledCount}</div>
              )}
              {finishedCount > 0 && (
                <div className="badge badge-success text-lg">{finishedCount}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="collapse-content !p-0 text-sm dark:bg-custom-dark w-full">
          {matches.map((match) => (
            <div
              role="button"
              tabIndex={0}
              onClick={() => showInfo(match.fixture.id)} // Usa la funzione showInfo
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  showInfo(match.fixture.id);
                }
              }}
              key={match.fixture.id}
              className={`flex items-center justify-between p-4 mt-1 rounded w-full cursor-pointer border-t border-gray-800 ${open && "hover:bg-highlight-collapse-child"
                }`}
            >
              <div className="flex text-base items-center w-1/3">
                <img
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  className="w-8 h-8 mr-2 object-contain"
                />
                <div className="text-left text-lg ml-4">{match.teams.home.name}</div>
              </div>
              {isFixtureInProgress(match.fixture.status.short) ? (
                <div className="flex flex-col items-center">
                  <div className="flex flex-row text-lg text-center font-bold text-red-500">
                    {match.goals.home} - {match.goals.away}
                  </div>
                  {match.fixture.status.short === "HT" ? (
                    <div className="flex flex-row text-lg text-center font-bold text-red-500">
                      HT
                    </div>
                  ) : (
                  <div className="flex flex-row text-lg text-base text-center font-bold text-red-500">
                    {match.fixture.status.elapsed}' {match.fixture.status.extra && `+ ${match.fixture.status.extra}`}
                  </div>
                  )}
                </div>
              ) : isFixtureScheduled(match.fixture.status.short) ? (
                <div className="text-lg text-center font-bold">
                  {formatTimeToTimezone(match.fixture.date, timezone)}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="text-lg text-center font-bold">
                    {match.goals.home} - {match.goals.away}
                  </div>
                  <div className="text-sm text-center text-gray-400">
                    ({match.score.halftime.home} - {match.score.halftime.away})
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end w-1/3">
                <div className="text-right text-lg mr-4">
                  {match.teams.away.name}
                </div>
                <img
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  className="w-8 h-8 ml-2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
