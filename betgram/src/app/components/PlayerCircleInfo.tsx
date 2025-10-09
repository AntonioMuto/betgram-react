'use client'
import { PlayerInfoPosition, TeamInfo } from "@/types/lineups";
import { PlayerData, PlayerInfoModal, PlayersData } from "@/types/results";
import React from "react";
import { useEffect, useRef } from "react";
import PlayerFixtureInfo from "../fixture/[id]/playerFixtureInfo";
import { soccerBall } from "@lucide/lab";
import { Icon } from "lucide-react";
import yellowCard from "../../../public/images/yellow-card.png";
import redCard from "../../../public/images/red-card.png";

type PlayerFieldProps = {
    player: any;
    teamData: TeamInfo;
    isHomeTeam: boolean;
}

export const PlayerCircleInfo = ({ player, teamData, isHomeTeam }: PlayerFieldProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [selectedPlayer, setSelectedPlayer] =
        React.useState<PlayerInfoModal | null>(null);

    function loadInfoPlayer(player: PlayerInfoPosition) {
        const playerInfo: PlayerInfoModal = {
            playerId: player?.player?.id,
            teamId: teamData.id,
        };
        setSelectedPlayer(playerInfo);
        modalRef.current?.showModal();
    }

    const ratingColor = (rating: string) => {
        if (Number(rating) >= 8) {
            return "bg-green-700";
        } else if (Number(rating) >= 7) {
            return "bg-cyan-700";
        } else if (Number(rating) >= 6) {
            return "bg-yellow-700";
        } else {
            return "bg-red-700";
        }
    };

    return (
        <div>
            <div
                onClick={() => loadInfoPlayer(player)}
                className={`flex flex-col items-center cursor-pointer ${player?.player?.pos === "G"
                    ? isHomeTeam ? "mt-1" : "mb-2"
                    : player?.player?.pos === "D"
                        ? isHomeTeam ? "mt-5" : "mb-5"
                        : player?.player?.pos === "M"
                            ? isHomeTeam ? "mt-7" : "mb-7"
                            : player?.player?.pos === "F"
                                ? isHomeTeam ? "mt-5" : "mb-5"
                                : ""
                    }`}
            >
                <div className="relative avatar">
                    <div
                        className={`w-13 rounded-full border-4 border-gray-300`}
                    >
                        <img
                            src={`https://media.api-sports.io/football/players/${player.player?.id}.png`}
                            alt="player"
                        />
                    </div>

                    {/* 🔹 Riquadro rating sovrapposto in basso */}
                    <div
                        className={`absolute bottom-[-10px] left-1/2 translate-x-5 mb-1 py-0.3 px-1 h-6 w-10 rounded text-md font-bold text-white shadow-md ${ratingColor(
                            player?.stats?.games?.rating ?? "0"
                        )}`}
                    >
                        {player?.stats?.games?.rating
                            ? Number(player?.stats?.games?.rating ?? 0).toFixed(2)
                            : "SV"}
                    </div>
                    {player.stats.goals.total > 0 &&
                        <div
                            className={`absolute bottom-[-10px] left-1/2 -translate-x-17 mb-1 py-0.3 px-1 h-6 w-10 rounded text-md font-bold text-white shadow-md `}
                        >
                            <Icon
                                iconNode={soccerBall}
                                className={`w-4 h-4 ${player.stats.goals.conceded === null || player.stats.goals.conceded === 0 ? "text-white" : "text-red-600"} ml-5`}
                            />
                        </div>
                    }
                    {player.stats.cards.yellow > 0 && player.stats.cards.red === 0 &&
                        <div
                            className={`absolute bottom-[25px] left-1/2 -translate-x-10 mb-1 py-0.2 px-1 rounded text-md font-bold text-white shadow-md `}
                        >
                            <img className="w-1 h-2" src={yellowCard.src} alt="Red card" />
                        </div>
                    }
                    {player.stats.cards.red > 0 &&
                        <div
                            className={`absolute bottom-[25px] left-1/2 -translate-x-10 mb-1 py-0.2 px-1 rounded text-md font-bold text-white shadow-md `}
                        >
                            <img className="w-1 h-2" src={redCard.src} alt="Red card" />
                        </div>
                    }
                </div>

                {/* Nome e numero */}
                <div className="flex flex-row justify-center items-center mt-1">
                    <span className="text-md font-bold text-gray-400 mr-1">
                        {player.player.number}
                    </span>
                    <span className="text-md font-bold text-center">{player.player.name}</span>
                </div>
            </div>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <PlayerFixtureInfo
                        players={[]}
                        selectedPlayer={selectedPlayer}
                        singlePlayerInfo={player}
                        singlePlayerTeamData={teamData}
                    />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );

}