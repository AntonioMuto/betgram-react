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
          <div className="w-full max-w-xl h-24 mb-6 rounded-2xl flex items-center justify-center gap-4 bg-highlight-custom-dark p-4 shadow-md">
            <button
              onClick={() => {
                const prevDate = new Date(selectedDate);
                prevDate.setDate(prevDate.getDate() - 1);
                setSelectedDate(prevDate.toISOString().split("T")[0]);
              }}
              className="btn bg-gray-600 text-white text-lg px-5 py-2 rounded-lg shadow hover:bg-gray-600 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              id="selected-date"
              className="p-3 text-lg rounded-lg border border-custom-league-card bg-custom-dark-black-light text-white w-1/2 text-center focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <button
              onClick={() => {
                const nextDate = new Date(selectedDate);
                nextDate.setDate(nextDate.getDate() + 1);
                setSelectedDate(nextDate.toISOString().split("T")[0]);
              }}
              className="btn bg-gray-600 text-white text-lg px-5 py-2 rounded-lg shadow hover:bg-gray-600 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          {selectedDate && <Results date={formatDate(selectedDate)} />}
        </div>

        {/* SEZIONE C */}
        <div className="col-span-3 bg-custom-dark rounded-2xl p-4 shadow-lg"></div>
      </div>
    </div>
  );
}
