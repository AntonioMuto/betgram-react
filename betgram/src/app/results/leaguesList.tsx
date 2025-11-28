"use client";
import { LeagueData } from "@/types/results";
import React, { use, useEffect, useState } from "react";
import { apiHandler } from '@/utils/apiHandler';

export default function LeaguesList() {
  const [leagues, setLeagues] = useState<LeagueData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      try {
        const json = await apiHandler<LeagueData[]>(`http://65.108.132.166:12030/api/leagues`);
        setLeagues(json);
      } catch (error) {
        console.error('Failed to fetch leagues:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeagues();
  }, []);

  return (
    <>
      {loading ? (
        <div className="md:col-span-5 flex bg-custom-dark border border-gray-800 rounded-box shadow-md p-4 justify-center">
            <div className="flex w-full flex-col gap-4">
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
      ) : (
        <ul className="md:col-span-3 list bg-custom-dark border border-gray-800 rounded-box shadow-md">
          {leagues.map((league) => (
            <li key={league.league.id} className="list-row hover:bg-highlight-custom-dark">
              <div>
                <div className="w-11 h-11 bg-gray-200 rounded flex items-center justify-center">
                  <img
                    className="size-auto rounded-box object-contain"
                    src={league.league.logo}
                    alt={league.league.name}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-lg text-shadow-lg/30">
                  {league.league.name}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
