"use client";
import { League, LeagueData } from "@/types/results";
import Results from "./results";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { getCurrentDate } from "@/app/utils/date";

export default function MainPage() {
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";
  const [selectedDate, setSelectedDate] = useState(getCurrentDate(timezone));
  const [leagues, setLeagues] = useState<LeagueData[]>([]);

  function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const fetchLeagues = async () => {
      const res = await fetch(`http://localhost:3001/api/leagues`);
      const json = await res.json();
      setLeagues(json);
    };
    fetchLeagues();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-14 gap-4">
      {/* Colonna sinistra */}
      <ul className="md:col-span-3 list bg-base-100 rounded-box shadow-md">
        {leagues.map((league) => (
          <li key={league.league.id} className="list-row">
            <div>
              <img
                className="size-7 rounded-box"
                src={league.league.logo}
                alt={league.league.name}
              />
            </div>
            <div>
              <div>{league.league.name}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {league.country.name}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Colonna centrale */}
      <div className="md:col-span-8 flex flex-col items-center">
        <div className="flex justify-center items-center bg-base-100 border border-base-300 w-3/5 p-2 mb-2 rounded">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            id="selected-date"
          />
        </div>
        <Results date={formatDate(selectedDate)} />
      </div>

      {/* Colonna destra */}
      <div className="md:col-span-3">
        <div className="p-4 bg-gray-800 text-white border-b border-black rounded">
          <h1 className="text-xl font-bold">Betgram</h1>
        </div>
      </div>
    </div>
  );
}
