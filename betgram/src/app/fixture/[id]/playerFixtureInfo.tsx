import { PlayerInfoModal, PlayersData } from "@/types/results";
import React, { useCallback, useMemo } from "react";

type PlayerFixtureInfoProps = {
  players: PlayersData[];
  selectedPlayer: PlayerInfoModal | null;
};

export default function PlayerFixtureInfo({ players, selectedPlayer }: PlayerFixtureInfoProps) {

  const { playerData, teamData } = useMemo(() => {
    let teamData = players.find((data) => data.team.id === selectedPlayer?.teamId);
    let playerData;

    if (teamData) {
      playerData = teamData.players.find((obj) => obj.player.id === selectedPlayer?.playerId);
    }

    return { playerData, teamData };
  }, [players, selectedPlayer]);


  return (
    <>
      <div>
        <div className="flex justify-evenly">
          <div className="flex avatar items-center">
            <div className="mask mask-squircle w-24">
              <img src={playerData?.player.photo} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src={teamData?.team.logo} className="w-24 h-24 object-contain"></img>
          </div>
        </div>
        <h3 className="flex justify-center font-bold text-lg mt-5">{playerData?.player.name}</h3>
        <div className="divider"></div>
        <div className="flex justify-evenly items-center">
          <div className="px-1 py-1 rounded bg-cyan-600 text-xl">
              {playerData?.statistics[0].games.rating}
          </div>
          <h3 className="font-bold text-xl">#{playerData?.statistics[0].games.number}</h3>
          <h3 className="font-bold text-xl">{playerData?.statistics[0].games.position}</h3>
        </div>
        <div className="divider"></div>
        <h3 className="flex justify-center font-bold text-lg mt-2">STATISTICHE</h3>
        <div className="flex justify-between mx-10">
          <h2 className="text-lg mt-2">Minuti Giocati</h2>
          <h2 className="text-lg mt-2">{playerData?.statistics[0].games.minutes}'</h2>
        </div>
        <div className="flex justify-between mx-10">
          <h2 className="text-lg mt-2">Goal</h2>
          <h2 className="text-lg mt-2">{playerData?.statistics[0].goals.total ?? 0}</h2>
        </div>
      </div>
    </>
  );
}
