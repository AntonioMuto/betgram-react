import { PlayerInfoModal, PlayersData } from "@/types/results";
import { LucideShield, PlayIcon, SwordsIcon, TableIcon } from "lucide-react";
import React, { useCallback, useMemo } from "react";

type PlayerFixtureInfoProps = {
  players: PlayersData[];
  selectedPlayer: PlayerInfoModal | null;
};

export default function PlayerFixtureInfo({
  players,
  selectedPlayer,
}: PlayerFixtureInfoProps) {
  const { playerData, teamData, notAPlayer } = useMemo(() => {
    const teamData = players.find(
      (data) => data.team.id === selectedPlayer?.teamId
    );

    const playerData = teamData
      ? teamData.players.find(
          (obj) => obj.player.id === selectedPlayer?.playerId
        )
      : undefined;

    const notAPlayer = playerData === undefined;
    console.log(playerData, teamData, notAPlayer);
    return { playerData, teamData, notAPlayer };
  }, [players, selectedPlayer]);

  const ratingColor = (rating: string) => {
    if (Number(rating) >= 8) {
      return "bg-green-600";
    } else if (Number(rating) >= 7) {
      return "bg-cyan-600";
    } else if (Number(rating) >= 6) {
      return "bg-yellow-600";
    } else {
      return "bg-red-600";
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-evenly">
          <div className="flex avatar items-center">
            <div className="mask mask-squircle w-24">
              <img
                src={
                  !notAPlayer
                    ? playerData?.player.photo
                    : `https://media.api-sports.io/football/players/${selectedPlayer?.playerId}.png`
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={teamData?.team.logo}
              className="w-24 h-24 object-contain"
            ></img>
          </div>
        </div>
        <h3 className="flex justify-center font-bold text-lg mt-5">
          {playerData?.player.name}
        </h3>
        <div className="divider"></div>
        {!notAPlayer && (
          <>
            <div className="flex justify-evenly items-center">
              <div
                className={`px-1 py-1 rounded text-xl ${ratingColor(
                  playerData?.statistics[0].games.rating ?? "0"
                )}`}
              >
                {playerData?.statistics[0].games.rating
                  ? Number(playerData?.statistics[0].games.rating ?? 0).toFixed(
                      2
                    )
                  : "SV"}
              </div>
              <h3 className="font-bold text-xl">
                #{playerData?.statistics[0].games.number}
              </h3>
              <h3 className="font-bold text-xl">
                {playerData?.statistics[0].games.position}
              </h3>
            </div>
            <div className="divider"></div>
            <h3 className="flex justify-center font-bold text-lg mt-2">
              STATISTICHE
            </h3>
            <div className="tabs tabs-lift mt-2">
              <label className="tab">
                <input
                  type="radio"
                  name="modal_tabs"
                  className="tab"
                  aria-label="GENERALI"
                  defaultChecked
                />
                <TableIcon className="size-5 me-2" />
                GENERALI
              </label>
              <div className="tab-content p-1">
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Minuti Giocati</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].games.minutes}'
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Passaggi Totali</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].passes.total ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Passaggi Chiave</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].passes.key ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Precisione Passaggi</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].passes.accuracy ?? 0}%
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Goals</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].goals.total ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Assists</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].goals.assists ?? 0}
                  </h2>
                </div>
              </div>
              <label className="tab">
                <input
                  type="radio"
                  name="modal_tabs"
                  className="tab"
                  aria-label="DIFESA"
                />
                <LucideShield className="size-5 me-2" />
                DIFESA
              </label>
              <div className="tab-content p-1">
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Minuti Giocati</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].games.minutes}'
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Cartellini Gialli</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].cards.yellow ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Cartellini Rossi</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].cards.red ?? 0}
                  </h2>
                </div>
              </div>
              <label className="tab">
                <input
                  type="radio"
                  name="modal_tabs"
                  className="tab"
                  aria-label="ATTACCO"
                />
                <SwordsIcon className="size-5 me-2" />
                ATTACCO
              </label>
              <div className="tab-content p-1">
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Tiri Totali</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].shots.total ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Tiri in Porta</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].shots.on ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Fuorigioco</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].offsides ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Rigori Segnati</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].penalty.scored ?? 0}
                  </h2>
                </div>
                <div className="flex justify-between mx-10">
                  <h2 className="text-lg mt-2">Rigori Parati</h2>
                  <h2 className="text-lg mt-2">
                    {playerData?.statistics[0].penalty.saved ?? 0}
                  </h2>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
