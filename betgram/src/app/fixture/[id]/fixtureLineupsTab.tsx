'use client'
import { ForwardField } from "@/app/components/ForwardPlayerField";
import { GoalKeeperField } from "@/app/components/GoalKeeperField";
import { StandardPlayerField } from "@/app/components/StandardPlayerField";
import { SvgCornerShape } from "@/app/components/SvgCornerShape";
import { SvgPenaltyArea } from "@/app/components/SvgPenaltyArea";
import { LineupData } from "@/types/lineups";
import { FixtureData, PlayerInfoModal } from "@/types/results";
import { line } from "framer-motion/client";
import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type FixtureScorersProps = {
    fixture: FixtureData;
};

export default function FixtureLineupsTab({ fixture }: FixtureScorersProps) {
    const [lineups, setLineups] = useState<LineupData | null>(null);

    useEffect(() => {
        const fetchLineups = async () => {
            const res = await fetch(`https://betgram.click/api/lineups/${fixture.fixture.id}`, {
                headers: { "Cache-Control": "no-cache" },
            });
            const json = await res.json();
            setLineups(json);
        };
        fetchLineups();
    }, [fixture]);

    const teamLineupsMap = useMemo(() => {
        if (!lineups?.lineups) return {};

        return lineups.lineups.reduce((acc, teamData) => {
            const teamId = teamData.team.id;
            const teamPlayerStats = lineups.playersInfo.find((p) => p.team.id === teamId)?.players || [];
            const players = teamData.startXI.map((p) => p);

            const getPositionGroup = (grid: string, pos: string) => {
                if (pos === "G") return "goalkeeper";
                const line = grid?.split(":")[0];
                switch (line) {
                    case "2": return "defenders";
                    case "3": return "midfielders";
                    case "4": return "backForwards";
                    case "5": return "forwards";
                    default: return "unknown";
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

            const groupedByRole = mergedPlayers.reduce(
                (groups, p) => {
                    groups[p.positionGroup].push(p);
                    return groups;
                },
                {
                    goalkeeper: [],
                    defenders: [],
                    midfielders: [],
                    backForwards: [],
                    forwards: [],
                } as Record<string, any[]>
            );

            acc[teamId] = {
                team: teamData.team,
                formation: teamData.formation,
                coach: teamData.coach,
                teamData: teamData.team,
                ...groupedByRole,
            };

            return acc;
        }, {} as Record<number, any>);
    }, [lineups]);


    function sortByGrid(players: any[]) {
        return players.sort((a, b) => {
            const [rowA, colA] = a.player.grid.split(":").map(Number);
            const [rowB, colB] = b.player.grid.split(":").map(Number);

            return rowA !== rowB ? rowB - rowA : colB - colA;
        });
    }

    if (!lineups) return <div key={"loading"}>Caricamento formazioni...</div>;

    const teamIds = Object.keys(teamLineupsMap).sort((a, b) => {
        if (a === fixture.teams.home.id.toString()) return -1;
        if (b === fixture.teams.home.id.toString()) return 1;
        return 0;
    });

    return (
        <div>
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
            <div>
                <span className="font-bold text-lg">TABLE SOSTIUZIONI DA INSERIRE TODO</span>
            </div>
        </div>

    );
}