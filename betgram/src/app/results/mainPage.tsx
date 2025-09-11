"use client";
import { League, LeagueData  } from "@/types/results";
import Results from "./results";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { getCurrentDate } from "@/app/utils/date";
import LeaguesList from "./leaguesList";

export default function MainPage() {
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";
  const [selectedDate, setSelectedDate] = useState(getCurrentDate(timezone));

  function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-14 gap-4 items-start">
      {/* Colonna sinistra */}
      <LeaguesList/>

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
      <div className="md:col-span-3 carousel rounded-box overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="flex animate-[scroll_20s_linear_infinite]">
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
              alt="Burger"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
