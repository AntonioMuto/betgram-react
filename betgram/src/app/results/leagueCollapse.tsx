"use client";
import { League, Result } from "@/types/results";
import { useState } from "react";
import { formatTimeToTimezone } from "@/app/utils/date";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { isFixtureInProgress, isFixtureScheduled } from "../utils/fixtureState";

type LeagueData = {
  league: League;
  matches: Result[];
};

export default function LeagueCollapse({ league, matches }: LeagueData) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";
  const router = useRouter();

  return (
    <div
      className={`collapse collapse-arrow bg-gray-900 border border-gray-800 border-base-300 w-3/4 mx-auto mb-2  
        ${!open ? "hover:bg-gray-800" : ""}`}
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
              src={league.logo}
              alt={league.name}
              className="w-7 h-7 object-contain"
            />
            <div className="p-1 ml-2 text-base font-bold ">{league.name}</div>
          </div>
          {/* <div>
            live
          </div> */}
        </div>
      </div>

      {open && (
        <div className="collapse-content !p-0 text-sm dark:bg-gray-950 w-full">
          {matches.map((match) => (
            <div
              onClick={() => router.push(`/fixture/${match.fixture.id}`)}
              key={match.fixture.id}
              className={`flex items-center justify-between p-4 mt-1 rounded w-full cursor-pointer border-t border-gray-800 ${
                open && "hover:bg-gray-800"
              }`}
            >
              <div className="flex text-base items-center w-1/3">
                <img
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  className="w-6 h-6 mr-2 object-contain"
                />
                <div className="text-left ml-4">{match.teams.home.name}</div>
              </div>
              {isFixtureInProgress(match.fixture.status.short) ? (
                <div className="flex flex-col items-center">
                  <div className="flex flex-row text-base text-center font-bold text-red-500">
                    {match.goals.home} - {match.goals.away}
                  </div>
                  <div className="flex flex-row text-xs text-base text-center font-bold text-red-500">
                    {match.fixture.status.elapsed}'
                  </div>
                </div>
              ) : isFixtureScheduled(match.fixture.status.short) ? (
                <div className="text-base text-center font-bold">
                  {formatTimeToTimezone(match.fixture.date, timezone)}
                </div>
              ) : (
                <div className="text-base text-center font-bold">
                  {match.goals.home} - {match.goals.away}
                </div>
              )}

              <div className="flex items-center justify-end w-1/3">
                <div className="text-right text-base mr-4">
                  {match.teams.away.name}
                </div>
                <img
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  className="w-6 h-6 ml-2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
