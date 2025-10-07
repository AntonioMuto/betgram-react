import { PlayerInfoPosition } from "@/types/lineups";
import { useEffect } from "react";

type GoalKeeperFieldProps = {
    goalKeeper: PlayerInfoPosition;
}

export const PlayerCircleInfo = ({ goalKeeper }: GoalKeeperFieldProps) => {

    useEffect(() => {
        console.log(goalKeeper);
    }, [goalKeeper]);

    return (
        <div className="flex flex-col items-center">
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={`https://media.api-sports.io/football/players/${goalKeeper.player.id}.png`} alt="player" />
                </div>
            </div>
            <span>{goalKeeper.player.name}</span>
        </div>
    );

}