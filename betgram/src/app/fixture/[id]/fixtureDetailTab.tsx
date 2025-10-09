import { Event, FixtureData, PlayerInfoModal } from "@/types/results";
import React, { useCallback, useMemo, useRef } from "react";
import yellowCard from "../../../../public/images/yellow-card.png";
import redCard from "../../../../public/images/red-card.png";
import substitution from "../../../../public/images/substitution.png";
import { Icon } from "lucide-react";
import { soccerBall } from "@lucide/lab";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { translate } from "@/app/utils/translate";
import PlayerFixtureInfo from "./playerFixtureInfo";
interface FixtureDetailTabProps {
  fixture: FixtureData;
}

export default function FixtureDetailTab({ fixture }: FixtureDetailTabProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedPlayer, setSelectedPlayer] =
    React.useState<PlayerInfoModal | null>(null);

  const handleClick = (playerId: number, teamId: number) => {
    const playerInfo: PlayerInfoModal = {
      playerId: playerId,
      teamId: teamId,
    };
    setSelectedPlayer(playerInfo);
    modalRef.current?.showModal();
  };

  const renderDetail = useCallback(
    (event: Event) => {
      if (event.type === "Var") {
        return (
          <div className="flex text-base text-gray-400">
            {translate(event.detail)}
          </div>
        );
      }

      if (event.type === "Card") {
        return (
          <div className="flex text-base text-gray-400">
            {translate(event.comments)}
          </div>
        );
      }

      if (event.type === "subst") {
        return (
          <div
            className="flex text-base text-green-500 cursor-pointer hover:underline"
            onClick={() => handleClick(event.assist.id, event.team.id)}
          >
            {event.assist?.id === event.player?.id ? "" : event.assist?.name}
          </div>
        );
      }

      if (event.type === "Goal" && event.detail === "Penalty") {
        return (
          <div className="flex text-base text-gray-400">
            {translate(event.detail)}
          </div>
        );
      }

      return (
        <div
          className="flex text-base text-gray-400 cursor-pointer hover:underline"
          onClick={() => handleClick(event.assist.id, event.team.id)}
        >
          {event.assist?.id === event.player?.id ? "" : event.assist?.name}
        </div>
      );
    },
    [fixture.events]
  );

  return (
    <div>
      <ul className="timeline timeline-vertical gap-4">
        {fixture.events.map((event, index) => {
          const isHome = event.team.id === fixture.teams.home.id;
          const isSubstitution = event.type === "subst";
          const icon = (
            <>
              {event.type === "Card" && event.detail === "Yellow Card" && (
                <img
                  className="w-5 h-6"
                  src={yellowCard.src}
                  alt="yellow card"
                />
              )}
              {event.type === "subst" && (
                <ArrowPathRoundedSquareIcon className="w-5 h-5" />
              )}
              {event.type === "Goal" && (
                <Icon
                  iconNode={soccerBall}
                  className={`w-5 h-5 ${
                    event.detail === "Own Goal" ? "text-red-500" : "text-white"
                  }`}
                />
              )}
              {event.type === "Card" && event.detail === "Red Card" && (
                <img className="w-5 h-6" src={redCard.src} alt="yellow card" />
              )}
              {event.type === "Var" &&
                (event.detail === "Goal Disallowed - offside" || event.detail === "Goal confirmed" || event.detail === "Goal cancelled") && (
                  <div className="px-1 py-1 text-xs text-white font-bold bg-red-700 rounded">
                    VAR
                  </div>
                )}
            </>
          );

          const playerInfo = (
            <div
              className={`flex flex-col ${
                isSubstitution ? "text-red-400" : ""
              } ${isHome ? "items-end" : "items-start"}`}
            >
              <span
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(event.player.id, event.team.id)}
              >
                {event.player?.name ?? "???"}
              </span>
              {renderDetail(event)}
            </div>
          );

          return (
            <li
              key={`${index}-${event.time.elapsed}-${event.player?.id}-${event.type}-${
                event.detail ?? ""
              }`}
            >
              <div
                className={`text-lg ${
                  isHome ? "timeline-start mr-7" : "timeline-end ml-7"
                }`}
              >
                <div
                  className={`flex gap-5 items-center ${
                    isHome ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* {event.type} {event.detail} */}
                  {playerInfo}
                  {icon}
                </div>
              </div>
              <div className="timeline-middle">
                <div className="badge badge-md w-20 bg-zinc-600 text-zinc-300 text-lg">
                  {event.time.elapsed}{" "}
                  {event.time.extra && `+ ${event.time.extra}`}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <PlayerFixtureInfo
            players={fixture.players ?? []}
            selectedPlayer={selectedPlayer}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
