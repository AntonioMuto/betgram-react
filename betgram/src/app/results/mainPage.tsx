"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { getCurrentDate } from "@/app/utils/date";
import Results from "./results";
import LeaguesList from "./leaguesList";

export default function MainPage() {
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";

  const [selectedDate, setSelectedDate] = useState("");

  // al primo render recupera da localStorage o fallback su oggi
  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setSelectedDate(storedDate);
    } else {
      setSelectedDate(getCurrentDate(timezone));
    }
  }, [timezone]);

  // ogni volta che cambia selectedDate la salvo
  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedDate]);

  function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 py-5">
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* SEZIONE A */}
        <div className="col-span-3 rounded-2xl p-1 shadow-md ">
          <LeaguesList />
        </div>

        {/* SEZIONE B */}
        <div className="col-span-6 bg-custom-dark rounded-2xl shadow-lg flex flex-col items-center">
          <div className="w-full max-w-xl h-24 mb-6 rounded-2xl flex items-center justify-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              id="selected-date"
              className="p-2 text-2xl rounded-xl border border-gray-600 bg-custom-dark w-2/3 text-center"
            />
          </div>
          {selectedDate && <Results date={formatDate(selectedDate)} />}
        </div>

        {/* SEZIONE C */}
        <div className="col-span-3 bg-custom-dark rounded-2xl p-4 shadow-lg"></div>
      </div>
    </div>
  );
}
