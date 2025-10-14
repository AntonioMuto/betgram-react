import { PlayerInfoModal, PlayersData } from "@/types/results";
import { Icon, LucideShield, PlayIcon, SwordsIcon, TableIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo } from "react";
import { soccerBall } from "@lucide/lab";

type PlayerFixtureInfoProps = {
  players: PlayersData[];
  selectedPlayer: PlayerInfoModal | null;
  singlePlayerInfo: any | undefined;
  singlePlayerTeamData: any | undefined;
};

export default function PlayerFixtureInfo({
  players,
  selectedPlayer,
  singlePlayerInfo,
  singlePlayerTeamData
}: PlayerFixtureInfoProps) {

  const { playerData, teamData, notAPlayer } = useMemo(() => {
    let teamData = undefined;
    let playerData = undefined;

    if (singlePlayerInfo) {
      playerData = {
        player: {
          id: singlePlayerInfo.player.id,
          name: singlePlayerInfo.player.name,
          photo: singlePlayerInfo.photo ?? singlePlayerInfo.player.photo,
        },
        statistics: [singlePlayerInfo.stats]
      }
      if (singlePlayerTeamData) {
        teamData = {
          team: singlePlayerTeamData
        }
      }
    } else {
      teamData = players?.find(
        (data) => data.team.id === selectedPlayer?.teamId
      );
      playerData = teamData
        ? teamData.players?.find(
          (obj) => obj.player.id === selectedPlayer?.playerId
        )
        : undefined;
    }
    const notAPlayer = playerData === undefined;
    return { playerData, teamData, notAPlayer };
  }, [players, selectedPlayer]);

  const ratingColor = (rating: string) => {
    if (Number(rating) >= 8) {
      return "text-green-600";
    } else if (Number(rating) >= 7) {
      return "text-cyan-600";
    } else if (Number(rating) >= 6) {
      return "text-yellow-600";
    } else {
      return "text-red-600";
    }
  };

  const transcodePosition = (position: string) => {
    switch (position) {
      case "G":
        return "POR";
      case "D":
        return "DIF";
      case "M":
        return "CEN";
      case "F":
        return "ATT";
      default:
        return position;
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
              src={teamData?.team?.logo}
              className="w-24 h-24 object-contain"
            ></img>
          </div>
        </div>
        <h3 className="stat-value flex justify-center mt-5">
          {playerData?.player.name}
        </h3>
        <div className="divider"></div>
        {!notAPlayer && (
          <>
            <div className="stats stats-horizontal lg:stats-horizontal shadow">
              <div className="stat !border-none w-40">
                <div className="stat-title text-lg">Rating</div>
                <div className={`stat-value ${ratingColor(playerData?.statistics[0].games.rating ?? "0")}`}>{Number(playerData?.statistics[0].games.rating).toFixed(2) ?? "0"}</div>
              </div>
              <div className="stat !border-none w-40">
                <div className="stat-title text-lg">Maglia</div>
                <div className="stat-value">#{playerData?.statistics[0].games.number}</div>
              </div>

              <div className="stat !border-none w-40">
                <div className="stat-title text-lg">Posizione</div>
                <div className="stat-value">{transcodePosition(playerData?.statistics[0].games.position)}</div>
              </div>
            </div>
            <div className="divider"></div>
            <div key={selectedPlayer?.playerId} className="tabs tabs-lift mt-2">
              <label className="tab text-xl">
                <input
                  type="radio"
                  name={`modal_tabs_${selectedPlayer?.playerId}`}
                  className="tab"
                  aria-label="GENERALI"
                  defaultChecked
                />
                <TableIcon className="size-5 me-2" />
                GENERALI
              </label>
              <div className="tab-content p-1 mt-5">
                <div className="stats stats-horizontal lg:stats-horizontal shadow">
                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Minuti Giocati</div>
                    <div className="stat-value">{playerData?.statistics[0].games.minutes ?? 0}'</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Pass. Totali</div>
                    <div className="stat-value ">{playerData?.statistics[0].passes.total ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Pass. Chiave</div>
                    <div className="stat-value ">{playerData?.statistics[0].passes.key ?? 0}</div>
                  </div>
                </div>
                <div className="stats stats-horizontal lg:stats-horizontal shadow mt-0.5">
                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Precisione Pass.</div>
                    <div className="stat-value">{playerData?.statistics[0].passes.accuracy ?? 0}%</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Goals</div>
                    <div className="stat-value">{playerData?.statistics[0].goals.total ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Assists</div>
                    <div className="stat-value">{playerData?.statistics[0].goals.assists ?? 0}</div>
                  </div>
                </div>
              </div>
              <label className="tab text-xl">
                <input
                  type="radio"
                  name={`modal_tabs_${selectedPlayer?.playerId}`}
                  className="tab"
                  aria-label="DIFESA"
                />
                <LucideShield className="size-5 me-2" />
                DIFESA
              </label>
              <div className="tab-content p-1 mt-5">
                <div className="stats stats-horizontal lg:stats-horizontal shadow">
                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Ammonizioni</div>
                    <div className="stat-value text-yellow-500">{playerData?.statistics[0].cards.yellow ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Espulsioni</div>
                    <div className="stat-value text-red-500">{playerData?.statistics[0].cards.red ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Rigori Parati</div>
                    <div className="stat-value">{playerData?.statistics[0].penalty.saved ?? 0}</div>
                  </div>
                </div>
                <div className="stats stats-horizontal lg:stats-horizontal shadow mt-0.5">
                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Falli Commessi</div>
                    <div className="stat-value"> {playerData?.statistics[0].fouls.committed ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Duelli Totali</div>
                    <div className="stat-value">{playerData?.statistics[0].duels.total ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Duelli Vinti</div>
                    <div className="stat-value">{playerData?.statistics[0].duels.won ?? 0}</div>
                  </div>
                </div>
              </div>
              <label className="tab text-xl">
                <input
                  type="radio"
                  name={`modal_tabs_${selectedPlayer?.playerId}`}
                  className="tab"
                  aria-label="ATTACCO"
                />
                <SwordsIcon className="size-5 me-2" />
                ATTACCO
              </label>
              <div className="tab-content p-1 mt-5">
                <div className="stats stats-horizontal lg:stats-horizontal shadow">
                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Tiri Totali</div>
                    <div className="stat-value">{playerData?.statistics[0].shots.total ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Tiri in Porta</div>
                    <div className="stat-value">{playerData?.statistics[0].shots.on ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Fuorigioco</div>
                    <div className="stat-value">{playerData?.statistics[0].offsides ?? 0}</div>
                  </div>
                </div>
                <div className="stats stats-horizontal lg:stats-horizontal shadow mt-0.5">
                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Rigori Segnati</div>
                    <div className="stat-value">{playerData?.statistics[0].penalty.scored ?? 0}</div>
                  </div>

                  <div className="stat !border-none w-40">
                    <div className="stat-title text-lg">Falli Subiti</div>
                    <div className="stat-value">{playerData?.statistics[0].fouls.drawn ?? 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
