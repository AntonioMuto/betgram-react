"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
  QueueListIcon,
  UsersIcon,
  PlayIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { FixtureData } from "@/types/results";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import { useUser } from "@/app/context/UserContext";
import { DateTime } from "luxon";
import { formatTimeToTimezone } from "@/app/utils/date";
import FixtureInfo from "./fixtureInfo";
import FixtureTabs from "./fixtureTabs";
import FixtureHeader from "./fixtureHeader";

const FixturePage = () => {
  const { id } = useParams();
  const [fixture, setFixture] = useState<FixtureData | null>(null);


  useEffect(() => {
    const fetchFixture = async () => {
      const res = await fetch(
        `http://[2a00:f48:1000:408::1]:3001/api/fixtures/${id}`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      const json = await res.json();
      setFixture(json);
    };
    fetchFixture();
  }, [id]);


  if (!fixture)
    return <div className="flex justify-center mt-24">Loading…</div>;

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-gray-900 text-white w-full max-w-3xl shadow-xl">
        <FixtureHeader fixture={fixture} /> 

        {/* Main info */}
        <FixtureInfo fixture={fixture} setFixture={setFixture}  />
        <FixtureTabs fixture={fixture} /> 
      </div>
    </div>
  );
};

export default FixturePage;
