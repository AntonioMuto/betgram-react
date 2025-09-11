"use client";
import { LeagueData } from "@/types/results";
import React, { use, useEffect, useState } from "react";

export default function LeaguesList() {
  const [leagues, setLeagues] = useState<LeagueData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/leagues`);
      const json = await res.json();
      setLeagues(json);
      setLoading(false);
    };
    fetchLeagues();
  }, []);

  return (
    <>
      {loading ? (
        <div className="md:col-span-3 flex bg-base-100 rounded-box shadow-md p-4 justify-center">
            <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <ul className="md:col-span-3 list bg-base-100 rounded-box shadow-md">
          {leagues.map((league) => (
            <li key={league.league.id} className="list-row hover:bg-base-200">
              <div>
                <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <img
                    className="size-6 rounded-box object-contain"
                    src={league.league.logo}
                    alt={league.league.name}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div>{league.league.name}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
