"use client";
import { useUser } from "@/app/context/UserContext";
import { formatTimeToTimezone, formatDateTimeToTimezone } from "@/app/utils/date";
import {
  isFixtureFinished,
  isFixtureInProgress,
  isFixtureScheduled,
} from "@/app/utils/fixtureState";
import { FixtureData } from "@/types/results";
import { GlobeEuropeAfricaIcon, ClockIcon } from "@heroicons/react/24/outline";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import FixtureScorers from "./fixtureScorers";

interface FixtureInfoProps {
  fixture: FixtureData;
  setFixture: React.Dispatch<React.SetStateAction<FixtureData | null>>;
}

export default function FixtureInfo({ fixture, setFixture }: FixtureInfoProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";

  // countdown pre-partita
  useEffect(() => {
    if (!fixture || fixture.fixture.status.short !== "NS") return;

    const targetDate = DateTime.fromISO(fixture.fixture.date, {
      zone: "Europe/Rome",
    });

    const interval = setInterval(() => {
      const now = DateTime.now().setZone("Europe/Rome");
      const diff = targetDate.toMillis() - now.toMillis();

      if (diff <= 0) {
        setTimeLeft("Match started!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const formattedTime = ` ${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      if(days > 0 || hours > 0 || minutes > 0 || seconds > 0){
        setTimeLeft(formattedTime);
      } else {
        setTimeLeft("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [fixture]);

  // aggiornamento live
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isFixtureInProgress(fixture.fixture.status.short)) return;

      const res = await fetch(
        `https://api.jsonsilo.com/public/9147f508-d2b4-4309-8028-f82dc554152d`,
        { headers: { "Cache-Control": "no-cache" } }
      );

      const json = await res.json();
      const newFixture = json[0].live.filter(
        (f: FixtureData) => f.fixture.id === fixture.fixture.id
      );
      if (!newFixture.length) return;
      setFixture(newFixture[0]);
    }, 15000);

    return () => clearInterval(interval);
  }, [fixture, setFixture]);

  return (
    <div className="flex flex-col">
      {/* Venue */}
      <div className="flex items-center justify-between p-2 gap-2">
        <div className="flex flex-row gap-3">
          <GlobeEuropeAfricaIcon className="w-6 h-6" />
          <span className="text-gray-400 text-lg">
            {fixture.fixture.venue.city}, {fixture.fixture.venue.name}
          </span>
        </div>
        <div className="flex flex-row gap-3">
          <span className="text-gray-400 text-lg mr-2">
            {formatDateTimeToTimezone(fixture.fixture.date, timezone)}
          </span>
          <ClockIcon className="w-6 h-6 mr-2" />
        </div>
      </div>

      {/* Match header */}
      <div className="grid grid-cols-3 items-center py-8">
        {/* Home team */}
        <div className="flex items-center justify-end gap-3">
          <img
            src={fixture.teams.home.logo}
            alt={fixture.teams.home.name}
            className="w-12 h-12"
          />
          <span className={`font-bold ${fixture.teams.home.name.length > 20 ? "text-md" : "text-xl"}`}>{fixture.teams.home.name}</span>
        </div>

        {/* Center (time or score) */}
        <div className="flex flex-col items-center">
          {isFixtureScheduled(fixture.fixture.status.short) && (
            <div className="text-2xl font-bold">
              {formatTimeToTimezone(fixture.fixture.date, timezone)}
            </div>
          )}

          <div className="text-xl">
            {isFixtureScheduled(fixture.fixture.status.short) ? (
              <span className="countdown font-mono text-2xl text-zinc-400">
                {timeLeft ? (
                  timeLeft.split(":").map((val, idx, arr) => (
                    <React.Fragment key={idx}>
                      <span
                        style={{ "--value": Number(val) } as React.CSSProperties}
                        aria-live="polite"
                        aria-label={`${val} ${idx === 0 ? "hours" : idx === 1 ? "minutes" : "seconds"}`}
                      >
                        {val}
                      </span>
                      {idx < arr.length - 1 && ":"} {/* aggiunge ':' tra gli span */}
                    </React.Fragment>
                  ))
                ) : (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </span>
            ) : (
              <div className="flex flex-col items-center">
                <div
                  className={`text-3xl font-bold ${isFixtureInProgress(fixture.fixture.status.short)
                    ? "text-red-500"
                    : "text-white"
                    }`}
                >
                  {fixture.goals.home} - {fixture.goals.away}
                </div>
                {!isFixtureFinished(fixture.fixture.status.short) && (
                  <div className="text-sm text-red-500">
                    {fixture.fixture.status.extra
                      ? `${fixture.fixture.status.elapsed}+${fixture.fixture.status.extra}'`
                      : `${fixture.fixture.status.elapsed}'`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Away team */}
        <div className="flex items-center justify-start gap-3">
          <span className={`font-bold ${fixture.teams.away.name.length > 20 ? "text-md" : "text-xl"}`}>{fixture.teams.away.name}</span>
          <img
            src={fixture.teams.away.logo}
            alt={fixture.teams.away.name}
            className="w-12 h-12"
          />
        </div>
      </div>

      {/* Scorers / Events */}
      <FixtureScorers fixture={fixture} />
    </div>
  );
}
