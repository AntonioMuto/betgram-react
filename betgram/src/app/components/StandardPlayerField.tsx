import { PlayerInfoPosition, TeamInfo } from "@/types/lineups";
import { SvgCornerShape } from "./SvgCornerShape";
import { SvgPenaltyArea } from "./SvgPenaltyArea";
import { PlayerCircleInfo } from "@/app/components/PlayerCircleInfo";
import { useEffect } from "react";
import { use } from "framer-motion/m";

type PlayersFieldProps = {
    players: PlayerInfoPosition[];
    isHomeTeam: boolean;
    teamData: TeamInfo;
}


export const StandardPlayerField = ({ players, isHomeTeam, teamData }: PlayersFieldProps) => {

    return (
        <div className="flex flex-row h-30 justify-evenly items-center bg-custom-dark">
            {players.map((player) => {
                return (
                    <div key={player.player.id} className="w-1/5">
                        <PlayerCircleInfo player={player} teamData={teamData} />
                    </div>
                );
            })}
        </div>
    );

};
