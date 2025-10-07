import { PlayerInfoPosition, TeamInfo } from "@/types/lineups";
import { SvgCornerShape } from "./SvgCornerShape";
import { SvgPenaltyArea } from "./SvgPenaltyArea";
import { PlayerCircleInfo } from "@/app/components/PlayerCircleInfo";
import { useEffect } from "react";

type GoalKeeperFieldProps = {
    goalKeeper: PlayerInfoPosition[];
    isHomeTeam: boolean;
    teamData: TeamInfo;
}


export const GoalKeeperField = ({ goalKeeper, isHomeTeam, teamData }: GoalKeeperFieldProps) => {
    return (
        <div className="relative">
            {/* Giocatori (non ruotati mai) */}
            <div className="absolute inset-0 flex justify-evenly items-center mt-3">
                {goalKeeper.map((player) => (
                    <div key={player.player.id} className="w-1/5">
                        <PlayerCircleInfo player={player} teamData={teamData} />
                    </div>
                ))}
            </div>

            {/* Solo grafica ruotata se non è squadra di casa */}
            <div
                className="flex flex-row justify-between bg-custom-dark p-1">
                <SvgCornerShape
                    size={14}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                    direction="left"
                    isHome
                />
                <SvgPenaltyArea width={160} height={75} stroke="rgba(255,255,255,0.3)" isHome={isHomeTeam} />
                <SvgCornerShape
                    size={14}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                    direction="right"
                    isHome
                />
            </div>
        </div>
    );
};

