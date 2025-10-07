import { PlayerInfoPosition, TeamInfo } from "@/types/lineups";
import { useEffect } from "react";

type PlayerFieldProps = {
    player: PlayerInfoPosition;
    teamData: TeamInfo;
}

export const PlayerCircleInfo = ({ player, teamData }: PlayerFieldProps) => {

    return (
        <div className={`flex flex-col items-center ${player?.player?.pos === "G" ? "mt-1" : player?.player?.pos === "D" ? "mt-5" : player?.player?.pos === "M" ? "mt-7" : player?.player?.pos === "F" ? "mt-3" : ""}`}>
            <div className="avatar">
                <div className={`w-12 rounded-full border border-4 `}  style={{ borderColor: `#${teamData?.colors['player'].primary}` }}>
                    <img src={`https://media.api-sports.io/football/players/${player.player?.id}.png`} alt="player" />
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <span className="text-md font-bold text-center mr-1 text-gray-400">{player.player.number}</span>
                <span className="text-md font-bold text-center">{player.player.name}</span>
            </div>
        </div>
    );

}