import { PlayerInfoPosition, TeamInfo } from "@/types/lineups";
import { SvgCornerShape } from "./SvgCornerShape";
import { SvgPenaltyArea } from "./SvgPenaltyArea";
import { PlayerCircleInfo } from "@/app/components/PlayerCircleInfo";
import { useEffect } from "react";
import { SvgMiddleCircle } from "./SvgMiddleCircle";

type ForwardFieldProps = {
    forwards: PlayerInfoPosition[];
    isHomeTeam: boolean;
    teamData: TeamInfo
}


export const ForwardField = ({ forwards, isHomeTeam, teamData }: ForwardFieldProps) => {

    return (
        <div className="relative">
            <div className="absolute inset-0 flex justify-evenly items-center mt-3">
                {forwards.map((player) => {
                    return (
                        <div key={player.player.id} className="w-1/5">
                            <PlayerCircleInfo player={player} teamData={teamData} />
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-row justify-center bg-custom-dark border border-gray-800">
                <SvgMiddleCircle width={180}
                    height={100} stroke="rgba(255,255,255,0.3)" isHome={isHomeTeam} />
            </div>
        </div>
    );

};
