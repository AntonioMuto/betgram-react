'use client';
import { League } from "@/types/results";
import Results from "./results";
import { useEffect, useState } from "react";

export default function MainPage() {
 const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center bg-base-100 border border-base-300 w-3/5 mx-auto p-2 mb-2 rounded">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          id="selected-date"
        />
      </div>
      <Results date={selectedDate}/>
    </div>
  );
}
