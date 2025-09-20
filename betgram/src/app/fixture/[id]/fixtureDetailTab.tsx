import { FixtureData } from "@/types/results";
import React from "react";
import yellowCard from "../../../../public/images/yellow-card.png";
import substitution from "../../../../public/images/substitution.png";
import { Icon } from 'lucide-react';
import { soccerBall, } from '@lucide/lab';

interface FixtureDetailTabProps {
  fixture: FixtureData;
}

export default function FixtureDetailTab({ fixture }: FixtureDetailTabProps) {
  return (
    <div>
      <ul className="timeline timeline-vertical">
        {fixture.events.map((event) => (
          <li>
            <div
              className={`timeline-box bg-highlight-custom-dark text-lg ${
                event.team.id === fixture.teams.home.id
                  ? "timeline-start mr-5"
                  : "timeline-end ml-5"
              }`}
            >
              <div className="flex gap-3 items-center">
                {event.type === "Card" && event.detail === "Yellow Card" && (
                  <img
                    className="w-5 h-6"
                    src={yellowCard.src}
                    alt="yellow card"
                  />
                )}
                {event.type === "subst" && (
                  <img
                    className="w-9 h-9"
                    src={substitution.src}
                    alt="substitution"
                  />
                )}
                {event.type === "Goal" && (
                  <Icon iconNode={soccerBall} className={`w-6 h-6 ml-5 ${event.detail === "Own Goal" ? "text-red-500" : "text-green-500"}`} />
                )}
                {/* {event.type} {event.detail} */}
                <div className="flex flex-col">
                  {event.player?.name}
                  <div className="flex text-base text-gray-400">
                    {event.assist.id === event.player.id ? "" : event.assist.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-middle">
              <div className="badge badge-md bg-white text-black text-lg">
                {event.time.elapsed}{" "}
                {event.time.extra && `+ ${event.time.extra}`}
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
