import { PlayerInfoPosition } from "@/types/lineups";
import { SvgCornerShape } from "./SvgCornerShape";
import { SvgPenaltyArea } from "./SvgPenaltyArea";
import { PlayerCircleInfo } from "@/app/components/PlayerCircleInfo";
import { useEffect } from "react";

type GoalKeeperFieldProps = {
  goalKeeper: PlayerInfoPosition;
}


export const GoalKeeperField = ({ goalKeeper }: GoalKeeperFieldProps) => {

    return (
        <div className="relative">
            {/* Livello 2: div sopra il div principale */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <PlayerCircleInfo goalKeeper={goalKeeper} />
            </div>

            {/* Livello 1: div principale */}
            <div className="flex flex-row justify-between bg-custom-dark p-1">
                <SvgCornerShape
                    size={14}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                    direction="left"
                />

                <SvgPenaltyArea
                    width={160}
                    height={75}
                    stroke="rgba(255,255,255,0.3)"
                />

                <SvgCornerShape
                    size={14}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                    direction="right"
                />
            </div>
        </div>
    );

};
