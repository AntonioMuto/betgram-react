import { PlayerInfoPosition, TeamInfo } from "@/types/lineups";
import { SvgCornerShape } from "./SvgCornerShape";
import { SvgPenaltyArea } from "./SvgPenaltyArea";
import { PlayerCircleInfo } from "@/app/components/PlayerCircleInfo";
import { useEffect } from "react";
import { PlayerData, PlayersData } from "@/types/results";

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
                    <div key={player.player.id} className="w-1/4">
                        <PlayerCircleInfo player={player} teamData={teamData} isHomeTeam={isHomeTeam} />
                    </div>
                ))}
            </div>

            {/* Solo grafica ruotata se non è squadra di casa */}
            <div
                className={`flex flex-row justify-between bg-custom-dark p-1 ${!isHomeTeam ? "items-baseline" : ""} `}>
                <SvgCornerShape
                    size={14}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                    direction="left"
                    isHome={isHomeTeam}
                />
                <SvgPenaltyArea width={160} height={75} stroke="rgba(255,255,255,0.3)" isHome={isHomeTeam} />
                <SvgCornerShape
                    size={14}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                    direction="right"
                    isHome={isHomeTeam}
                />
            </div>
        </div>
    );
};

