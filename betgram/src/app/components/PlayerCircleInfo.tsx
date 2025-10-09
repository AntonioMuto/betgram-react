'use client'
import { PlayerInfoPosition, TeamInfo } from "@/types/lineups";
import { PlayerData, PlayerInfoModal, PlayersData } from "@/types/results";
import React from "react";
import { useEffect, useRef } from "react";
import PlayerFixtureInfo from "../fixture/[id]/playerFixtureInfo";
import { li, line } from "framer-motion/m";

type PlayerFieldProps = {
    player: PlayerInfoPosition;
    teamData: TeamInfo;
    lineupStats: PlayersData[];
}

export const PlayerCircleInfo = ({ player, teamData, lineupStats }: PlayerFieldProps) => {
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

    return (
        <div>
            <div onClick={() => loadInfoPlayer(player)} className={`flex flex-col items-center ${player?.player?.pos === "G" ? "mt-1" : player?.player?.pos === "D" ? "mt-5" : player?.player?.pos === "M" ? "mt-7" : player?.player?.pos === "F" ? "mt-3" : ""}`}>
                <div className="avatar">
                    <div className={`w-12 rounded-full border border-4 `} style={{ borderColor: `#${teamData?.colors['player'].primary}` }}>
                        <img src={`https://media.api-sports.io/football/players/${player.player?.id}.png`} alt="player" />
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <span className="text-md font-bold text-center mr-1 text-gray-400">{player.player.number}</span>
                    <span className="text-md font-bold text-center">{player.player.name}</span>
                </div>
            </div>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <PlayerFixtureInfo
                        players={lineupStats ?? []}
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