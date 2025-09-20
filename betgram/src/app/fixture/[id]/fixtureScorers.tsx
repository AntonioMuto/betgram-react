import { Event, Fixture, FixtureData } from "@/types/results";
import React, { useMemo } from "react";
import { Icon } from 'lucide-react';
import { soccerBall } from '@lucide/lab';

type FixtureScorersProps = {
  fixture: FixtureData;
};

export default function FixtureScorers({ fixture }: FixtureScorersProps) {
  // Memoizzazione filtri eventi
  function buildGoalsMap(
    fixture: FixtureData,
    teamId: number
  ): Record<string, FixtureData["events"][number][]> {
    return fixture.events
      .filter(
        (event) =>
          event.type === "Goal" &&
          event.team.id === teamId
      )
      .reduce<Record<string, FixtureData["events"][number][]>>((acc, event) => {
        const key =
          event.player?.id?.toString() ?? event.player?.name ?? "unknown";

        if (!acc[key]) acc[key] = [];
        acc[key].push(event);

        return acc;
      }, {});
  }

  const homeGoalsMap = useMemo(() => {
    let x = buildGoalsMap(fixture, fixture.teams.home.id);
    console.log(x);
    return x;
  }, [fixture]);

  const awayGoalsMap = useMemo(
    () => buildGoalsMap(fixture, fixture.teams.away.id),
    [fixture]
  );

  return (
    <div className="flex justify-evenly pb-3 gap-4 w-1/1">
      <div className="flex flex-col items-start gap-1 mx-auto">
        {Object.entries(homeGoalsMap).map(([playerId, events]) => {
          const playerName = events[0]?.player?.name ?? "Unknown";
          const minutes = events.map((e) => `${e.time.elapsed}'`).join(", ");
          const isOwnGoal = events.some((e) => e.detail === "Own Goal");
          const isNormalGoal = events.some((e) => e.detail === "Normal Goal");
          const isPenalty = events.some((e) => e.detail === "Penalty");
          return (
            <div className="flex items-center">
              <div
                key={playerId}
                className={`${
                  isOwnGoal ? "text-red-500" : "text-gray-400"
                } text-md flex`}
              >
                {playerName} {minutes}
              </div>
              {isOwnGoal && <Icon iconNode={soccerBall} className="w-4 h-4 text-red-500 ml-5" />}
              {isNormalGoal && <Icon iconNode={soccerBall} className="w-4 h-4 text-gray-400 ml-5" />}
              {isPenalty && <div className="flex items-center gap-2">
                <Icon iconNode={soccerBall} className="w-4 h-4 text-gray-400 ml-5" />
                <span className="text-gray-400">(Rig)</span>
              </div>}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-start gap-1 mx-auto">
        {Object.entries(awayGoalsMap).map(([playerId, events]) => {
          const playerName = events[0]?.player?.name ?? "Unknown";
          const minutes = events.map((e) => `${e.time.elapsed}'`).join(", ");
          const isOwnGoal = events.some((e) => e.detail === "Own Goal");
          const isNormalGoal = events.some((e) => e.detail === "Normal Goal");
          const isPenalty = events.some((e) => e.detail === "Penalty");
          return (
            <div className="flex items-center">
              <div
                key={playerId}
                className={`${
                  isOwnGoal ? "text-red-500" : "text-gray-400"
                } text-md flex`}
              >
                {playerName} {minutes}
              </div>
              {isOwnGoal && <Icon iconNode={soccerBall} className="w-4 h-4 text-red-500 ml-5" />}
              {isNormalGoal && <Icon iconNode={soccerBall} className="w-4 h-4 text-gray-400 ml-5" />}
              {isPenalty && <div className="flex items-center gap-2">
                <Icon iconNode={soccerBall} className="w-4 h-4 text-gray-400 ml-5" />
                <span className="text-gray-400">(Rig)</span>
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
