'use client';
import { League } from "@/types/results";
import Results from "./results";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { getCurrentDate } from "@/app/utils/date";

export default function MainPage() {
 const { user } = useUser();
  const timezone = user?.timezone || "UTC";
 const [selectedDate, setSelectedDate] = useState(getCurrentDate(timezone));

 function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}


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
      <Results date={formatDate(selectedDate)}/>
    </div>
  );
}
