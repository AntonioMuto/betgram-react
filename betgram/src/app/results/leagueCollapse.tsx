"use client";

import { League, Result } from "@/types/results";
import { useState } from "react";
import { formatTimeToTimezone } from "@/app/utils/date";
import { useUser } from "@/app/context/UserContext";

type LeagueData = {
  league: League;
  matches: Result[];
};

export default function LeagueCollapse({ league, matches }: LeagueData) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";

  return (
    <div
      className={`collapse collapse-arrow bg-base-100 border border-base-300 w-3/4 mx-auto mb-2  
        ${!open ? "hover:bg-base-200" : ""}`}
    >
      <input
        key={`checkbox-league-${league.id}`}
        type="checkbox"
        checked={open}
        onChange={() => setOpen((prev) => !prev)}
      />
      <div className="collapse-title font-semibold">
        <div className="flex justify-left">
          <img
            src={league.logo}
            alt={league.name}
            className="w-8 h-8 object-contain"
          />
          <div className="p-1 ml-2 text-base font-bold ">{league.name}</div>
        </div>
      </div>

      {open && (
        <div className="collapse-content !p-0 text-sm bg-base-300 w-full">
          {matches.map((match) => (
            <div
              key={match.fixture.id}
              className={`flex items-center justify-between p-4 mt-1 rounded w-full cursor-pointer ${
                open && "hover:bg-base-100"
              }`}
            >
              <div className="flex items-center w-1/3">
                <img
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  className="w-6 h-6 mr-2 object-contain"
                />
                <div className="text-left ml-4">{match.teams.home.name}</div>
              </div>

              <div className="w-1/6 text-center font-bold">
                {match.fixture.status.short === "NS" ||
                match.fixture.status.short === "TBD"
                  ? `${formatTimeToTimezone(match.fixture.date, timezone)}`
                  : `${match.goals.home} - ${match.goals.away}`}
              </div>

              <div className="flex items-center justify-end w-1/3">
                <div className="text-right mr-4">{match.teams.away.name}</div>
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
