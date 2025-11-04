'use client'
import { ForwardField } from "@/app/components/ForwardPlayerField";
import { GoalKeeperField } from "@/app/components/GoalKeeperField";
import { StandardPlayerField } from "@/app/components/StandardPlayerField";
import { LineupData, PlayerInfoPosition } from "@/types/lineups";
import { FixtureData, PlayerInfoModal } from "@/types/results";
import yellowCard from "../../../../public/images/yellow-card.png";
import redCard from "../../../../public/images/red-card.png";
import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import PlayerFixtureInfo from "./playerFixtureInfo";
import { soccerBall } from "@lucide/lab";
import { Icon } from "lucide-react";

type FixtureScorersProps = {
    fixture: FixtureData;
};

export default function FixtureLineupsTab({ fixture }: FixtureScorersProps) {
    const [lineups, setLineups] = useState<LineupData | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfoModal | null>(null);
    const [selectedPlayerData, setSelectedPlayerData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const fetchLineups = async () => {
            setIsLoading(true);
            const res = await fetch(`https://betgram.click/api/lineups/${fixture.fixture.id}`, {
                headers: { "Cache-Control": "no-cache" },
            });
            const json = await res.json();
            setLineups(json);
            setIsLoading(false);
        };
        fetchLineups();
    }, [fixture]);

    function loadInfoPlayer(player: PlayerInfoPosition, obj: any) {
        const playerInfo: PlayerInfoModal = {
            playerId: player?.player?.id,
            teamId: obj.team.id,
        };
        const playerData = {
            player: player,
            team: obj.team
        }
        setSelectedPlayer(playerInfo);
        setSelectedPlayerData(playerData);
        modalRef.current?.showModal();
    }

    const teamLineupsMap = useMemo(() => {
        if (!lineups?.lineups) return {};

        return lineups.lineups.reduce((acc, teamData) => {
            const teamId = teamData.team.id;
            const teamPlayerStats = lineups.playersInfo.find((p) => p.team.id === teamId)?.players || [];
            const players = teamData.startXI.map((p) => p);

            const getPositionGroup = (grid: string, pos: string) => {
                if (pos === "G") return "goalkeeper";
                if (grid) {

                    const line = grid?.split(":")[0];
                    switch (line) {
                        case "2": return "defenders";
                        case "3": return "midfielders";
                        case "4": return "backForwards";
                        case "5": return "forwards";
                        default: return "unknown";
                    }
                } else {
                    switch (pos) {
                        case "D": return "defenders";
                        case "M": return "midfielders";
                        case "F": return "forwards";
                        default: return "unknown";
                    }
                }
            };

            const mergedPlayers = players.map((playerObj) => {
                const stats = teamPlayerStats.find((p) => p.player.id === playerObj.player.id);
                const positionGroup = getPositionGroup(playerObj.player.grid, playerObj.player.pos);
                playerObj.player.photo = stats?.player.photo
                return {
                    ...playerObj,
                    stats: stats?.statistics?.[0] || null,
                    positionGroup,
                    photo: stats?.player.photo
                };
            });

            const groupedByRole = mergedPlayers.reduce((groups, p) => {
                const key = p.positionGroup;

                if (key && key in groups) {
                    groups[key].push(p);
                } else {
                    if (!groups.unknown) {
                        groups.unknown = [];
                    }
                    groups.unknown.push(p);
                }

                return groups;
            }, {
                goalkeeper: [],
                defenders: [],
                midfielders: [],
                backForwards: [],
                forwards: [],
            } as Record<string, any[]>);

            const substitutes = teamData.substitutes.map((playerObj) => {
                const player = teamPlayerStats.find((p) => p.player.id === playerObj.player.id);
                return {
                    ...playerObj,
                    stats: player?.statistics?.[0] || null,
                    photo: player?.player.photo
                };
            });
            acc[teamId] = {
                team: teamData.team,
                formation: teamData.formation,
                coach: teamData.coach,
                teamData: teamData.team,
                substitutes: substitutes,
                ...groupedByRole,
            };
            return acc;
        }, {} as Record<number, any>);
    }, [lineups]);


    const ratingColor = (rating: string) => {
        if (Number(rating) >= 8) {
            return "bg-green-700";
        } else if (Number(rating) >= 7) {
            return "bg-cyan-700";
        } else if (Number(rating) >= 6) {
            return "bg-yellow-700";
        } else {
            return "bg-red-700";
        }
    };


    function sortByGrid(players: any[]) {
        return players.sort((a, b) => {
            const [rowA, colA] = a.player.grid.split(":").map(Number);
            const [rowB, colB] = b.player.grid.split(":").map(Number);

            return rowA !== rowB ? rowB - rowA : colB - colA;
        });
    }

    const teamIds = Object.keys(teamLineupsMap).sort((a, b) => {
        if (a === fixture.teams.home.id.toString()) return -1;
        if (b === fixture.teams.home.id.toString()) return 1;
        return 0;
    });

    return (
        <div>
            {isLoading &&
                <div className="md:col-span-5 flex flex-col bg-custom-dark border border-gray-800 rounded-box shadow-md p-4 justify-center">
                    <div className="flex w-full flex-col gap-4">
                        <div className="skeleton h-150 w-full"></div>
                    </div>
                    <div className="flex w-full flex-col gap-4 mt-4">
                        <div className="flex flex-row">
                            <div className="skeleton h-120 w-full mr-50"></div>
                            <div className="skeleton h-120 w-full"></div>
                        </div>
                    </div>
                </div>}
            {teamIds.length === 0 && !isLoading && <div key={"loading"}>
                <p className="text-center">Nessuna formazione disponibile</p>
            </div>}
            {teamIds.map((teamId: any) => {
                const team = teamLineupsMap[teamId];
                const isHomeTeam = team.team.id === fixture.teams.home.id;
                const { goalkeeper, defenders, midfielders, backForwards, forwards, formation, coach, teamData } = team;
                const thereAreForwards = forwards.length > 0;
                const thereAreBackForwards = backForwards.length > 0;
                return (
                    <div key={teamId}>
                        {isHomeTeam ? (
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="avatar">
                                            <div className="w-9 rounded-full">
                                                <img src={coach.photo} alt="player" />
                                            </div>
                                        </div>
                                        <span className="font-bold text-lg">{coach.name}</span>
                                    </div>
                                    <span className="font-bold text-xl">{formation}</span>
                                </div>
                                <div className="relative flex flex-col justify-between h-full mt-4">
                                    <GoalKeeperField goalKeeper={goalkeeper} isHomeTeam={isHomeTeam} teamData={teamData} />
                                    <StandardPlayerField players={defenders} isHomeTeam={isHomeTeam} teamData={teamData} />
                                    <StandardPlayerField players={midfielders} isHomeTeam={isHomeTeam} teamData={teamData} />
                                    {thereAreBackForwards && !thereAreForwards && <ForwardField forwards={backForwards} isHomeTeam={isHomeTeam} teamData={teamData} />}
                                    {thereAreBackForwards && thereAreForwards && <StandardPlayerField players={backForwards} isHomeTeam={isHomeTeam} teamData={teamData} />}
                                    {thereAreForwards && <ForwardField forwards={forwards} isHomeTeam={isHomeTeam} teamData={teamData} />}

                                </div>
                            </div>
                        ) : (
                            <div key={teamId} className="flex flex-col">
                                <div className="relative flex flex-col justify-between h-full mb-4">
                                    {thereAreForwards && <ForwardField forwards={forwards} isHomeTeam={isHomeTeam} teamData={teamData} />}
                                    {thereAreBackForwards && thereAreForwards && <StandardPlayerField players={backForwards} isHomeTeam={isHomeTeam} teamData={teamData} />}
                                    {thereAreBackForwards && !thereAreForwards && <ForwardField forwards={backForwards} isHomeTeam={isHomeTeam} teamData={teamData} />}
                                    <StandardPlayerField players={midfielders} isHomeTeam={isHomeTeam} teamData={teamData} />
                                    <StandardPlayerField players={defenders} isHomeTeam={isHomeTeam} teamData={teamData} />
                                    <GoalKeeperField goalKeeper={goalkeeper} isHomeTeam={isHomeTeam} teamData={teamData} />
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="avatar">
                                            <div className="w-9 rounded-full">
                                                <img src={coach.photo} alt="player" />
                                            </div>
                                        </div>
                                        <span className="font-bold text-lg">{coach.name}</span>
                                    </div>
                                    <span className="font-bold text-xl">{formation}</span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
            {!isLoading &&
                <div className="divider"></div>
            }
            <div className="flex flex-row justify-between mt-8">
                {teamIds.map((teamId: any) => {
                    const team = teamLineupsMap[teamId];
                    return (
                        <div key={teamId} className="flex flex-col gap-5">
                            <div className="flex flex-row justify-evenly items-center">
                                <img
                                    src={team.team.logo}
                                    alt={team.team.name}
                                    className="w-12 h-12"
                                />
                                <span className="font-bold text-xl">{team.team.name}</span>
                            </div>
                            <div>
                                <ul className="list w-full bg-custom-dark border border-gray-800 rounded-box shadow-md">
                                    {team.substitutes.map((player: any) => {
                                        return (
                                            <div key={player.player.id}>
                                                <li onClick={() => loadInfoPlayer(player, team)} className="list-row hover:bg-highlight-custom-dark items-center">
                                                    <div>
                                                        <div className="w-11 h-11 bg-gray-200 rounded flex items-center justify-center">
                                                            <img
                                                                className="size-auto rounded-box object-contain"
                                                                src={player.photo}
                                                                alt={player.player.name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <div className="text-lg text-shadow-lg/30">
                                                            {player.player.name ?? '???'}
                                                        </div>
                                                    </div>
                                                    {player.stats?.goals?.total > 0 &&
                                                        <div
                                                            className={`h-6 w-10 rounded text-md font-bold text-white shadow-md `}
                                                        >
                                                            <Icon
                                                                iconNode={soccerBall}
                                                                className={`w-4 h-4 mt-1 ${player.stats.goals.conceded === null || player.stats.goals.conceded === 0 ? "text-white" : "text-red-600"} ml-5`}
                                                            />
                                                        </div>
                                                    }
                                                    {player.stats?.cards.yellow > 0 && player.stats?.cards.red === 0 &&
                                                        <div
                                                            className={`rounded text-md font-bold text-white shadow-md `}
                                                        >
                                                            <img className="w-3.5 h-5" src={yellowCard.src} alt="Red card" />
                                                        </div>
                                                    }
                                                    {player.stats?.cards.red > 0 &&
                                                        <div
                                                            className={`rounded text-md font-bold text-white shadow-md `}
                                                        >
                                                            <img className="w-3.5 h-5" src={redCard.src} alt="Red card" />
                                                        </div>
                                                    }
                                                    <div className="flex flex-col justify-center">
                                                        <div className={`text-lg text-shadow-lg/30 px-1 ${ratingColor(
                                                            player.stats?.games.rating ?? "0"
                                                        )}`}
                                                        >
                                                            {player.stats?.games.rating
                                                                && Number(player.stats.games.rating ?? 0).toFixed(2)
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <PlayerFixtureInfo
                        players={[]}
                        selectedPlayer={selectedPlayer}
                        singlePlayerInfo={selectedPlayerData?.player}
                        singlePlayerTeamData={selectedPlayerData?.team}
                    />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>

    );
}