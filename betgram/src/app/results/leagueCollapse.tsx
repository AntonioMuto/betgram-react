"use client";

import { League, Result } from "@/types/results";
import { useState } from "react";

type LeagueData = {
  league: League;
  matches: Result[];
};

export default function LeagueCollapse({ league, matches }: LeagueData) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`collapse collapse-arrow bg-base-100 border border-base-300 w-3/5 mx-auto mb-2  
        ${!open ? "hover:bg-base-300" : ""}`}>
      <input
        key={`checkbox-league-${league.id}`}
        type="checkbox"
        checked={open}
        onChange={() => setOpen((prev) => !prev)}
      />
      <div className="collapse-title font-semibold">
        <div className="flex justify-left">
          <img src={league.logo} alt={league.name} className="w-8 h-8 object-contain" />
          <div className="p-1 ml-2 text-base font-bold ">{league.name}</div>
        </div>
      </div>

      {open && (
        <div className="collapse-content text-sm ">
          {matches.map((match) => (
            <div
              key={match.fixture.id}
              className={`flex items-center justify-between p-4 mt-1 rounded ${open && "hover:bg-base-300" }`}
            >
              <div className="flex items-center w-1/3">
                {/* 👇 immagine caricata solo se open === true */}
                <img
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  className="w-6 h-6 mr-2 object-contain"
                />
                <div className="text-left ml-4">{match.teams.home.name}</div>
              </div>

              <div className="w-1/6 text-center font-bold">
                {match.goals.home} - {match.goals.away}
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
