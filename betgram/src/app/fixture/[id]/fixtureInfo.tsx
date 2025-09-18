'use client'
import { useUser } from "@/app/context/UserContext";
import { formatTimeToTimezone } from "@/app/utils/date";
import { isFixtureFinished, isFixtureInProgress, isFixtureScheduled } from "@/app/utils/fixtureState";
import { FixtureData } from "@/types/results";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import { DateTime } from "luxon";
import React, { useEffect, useMemo, useState } from "react";

interface FixtureInfoProps {
  fixture: FixtureData;
  setFixture: React.Dispatch<React.SetStateAction<FixtureData | null>>;
}

export default function FixtureInfo({ fixture, setFixture }: FixtureInfoProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";

  useEffect(() => {
    if (!fixture || fixture.fixture.status.short !== "NS") return;

    const targetDate = DateTime.fromISO(fixture.fixture.date, { zone: "Europe/Rome" });

    const interval = setInterval(() => {
      const now = DateTime.now().setZone("Europe/Rome");
      const diff = targetDate.toMillis() - now.toMillis();

      if (diff <= 0) {
        setTimeLeft("Match started!");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      setTimeLeft(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [fixture]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isFixtureInProgress(fixture.fixture.status.short)) return;

      console.log("fetching fixture jsonsilo");
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

  // Memoizzazione filtri eventi
  const homeGoals = useMemo(
    () =>
      fixture.events.filter(
        (event) =>
          (event.type === "Goal" || event.type === "Own Goal") &&
          event.team.id === fixture.teams.home.id
      ),
    [fixture.events, fixture.teams.home.id]
  );

  const awayGoals = useMemo(
    () =>
      fixture.events.filter(
        (event) =>
          (event.type === "Goal" || event.type === "Own Goal") &&
          event.team.id === fixture.teams.away.id
      ),
    [fixture.events, fixture.teams.away.id]
  );

  return (
    <div className="flex flex-col ">
      <div className="flex item-start items-center p-2 gap-2">
        <GlobeEuropeAfricaIcon className="w-4 h-4" />
        <span className="text-gray-400 text-sm">
          {fixture.fixture.venue.city}, {fixture.fixture.venue.name}
        </span>
      </div>
      <div className="flex items-center justify-evenly py-8">
        <div className="flex items-center gap-2">
          <img
            src={fixture.teams.home.logo}
            alt={fixture.teams.home.name}
            className="w-10 h-10"
          />
          <span className="font-bold">{fixture.teams.home.name}</span>
        </div>

        <div className="flex items-center flex-col">
          <>
            {isFixtureScheduled(fixture.fixture.status.short) && (
              <div className="text-2xl font-bold">
                {formatTimeToTimezone(fixture.fixture.date, timezone)}
              </div>
            )}
          </>
          <div className="text-xl">
            {isFixtureScheduled(fixture.fixture.status.short) ? (
              timeLeft || <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <div className="flex flex-col items-center">
                <div
                  className={`text-2xl font-bold ${
                    isFixtureInProgress(fixture.fixture.status.short)
                      ? "text-red-500"
                      : "text-white"
                  }`}
                >
                  {fixture.goals.home} - {fixture.goals.away}
                </div>
                {isFixtureScheduled(fixture.fixture.status.short) && (
                  <div className="text-sm text-red-500">
                    {isFixtureFinished(fixture.fixture.status.short)
                      ? ""
                      : `${
                          fixture.fixture.status.extra
                            ? `${fixture.fixture.status.elapsed}+${fixture.fixture.status.extra}'`
                            : `${fixture.fixture.status.elapsed}'`
                        }`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold">{fixture.teams.away.name}</span>
          <img
            src={fixture.teams.away.logo}
            alt={fixture.teams.away.name}
            className="w-10 h-10"
          />
        </div>
      </div>
      <div className="flex justify-evenly pb-3 gap-4">
        {/* Goal squadra di casa */}
        <div className="flex flex-col items-start gap-1 mx-auto">
          {homeGoals.map((event, index) => (
            <span key={index} className="text-gray-400 text-sm">
              {event.player.name} {event.time.elapsed}'
            </span>
          ))}
        </div>

        {/* Goal squadra ospite */}
        <div className="flex flex-col items-end gap-1 mx-auto">
          {awayGoals.map((event, index) => (
            <span key={index} className="text-gray-400 text-sm">
              {event.time.elapsed}' {event.player.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
