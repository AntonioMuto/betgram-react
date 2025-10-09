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

            const players = teamData.startXI.map((p) => p);

            const goalkeeper = players.filter((p) => p.player.pos === "G");
            const defenders = players.filter((p) => p.player.grid?.split(":")[0] === "2");
            const midfielders = players.filter((p) => p.player.grid?.split(":")[0] === "3");
            let backForwards: any = [];
            let forwards = players.filter((p) => p.player.grid?.split(":")[0] === "5");
            if (forwards.length === 0) {
                forwards = players.filter((p) => p.player.grid?.split(":")[0] === "4");
            } else {
                backForwards = players.filter((p) => p.player.grid?.split(":")[0] === "4");
            }

            const playersInfo = lineups.playersInfo.filter((p) => p.team.id === teamId); 

            acc[teamId] = {
                team: teamData.team,
                goalkeeper: sortByGrid(goalkeeper),
                defenders: sortByGrid(defenders),
                midfielders: sortByGrid(midfielders),
                backForwards: sortByGrid(backForwards),
                forwards: sortByGrid(forwards),
                formation: teamData.formation,
                coach: teamData.coach,
                teamData: teamData.team,
                statistics: lineups.playersInfo
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
                const { goalkeeper, defenders, midfielders, backForwards, forwards, formation, coach, teamData, statistics } = team;
                return (
                    < div key={teamId}>
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
                                    <GoalKeeperField goalKeeper={goalkeeper} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics} />
                                    <StandardPlayerField players={defenders} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics} />
                                    <StandardPlayerField players={midfielders} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics} />
                                    {backForwards.length === 0 ? null : <StandardPlayerField players={backForwards} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics} />}
                                    <ForwardField forwards={forwards} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics}  />
                                </div>
                            </div>
                        ) : (
                            <div key={teamId} className="flex flex-col">
                                <div className="relative flex flex-col justify-between h-full mb-4">
                                    <ForwardField forwards={forwards} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics} />
                                    {backForwards.length === 0 ? null : <StandardPlayerField players={backForwards} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics} />}
                                    <StandardPlayerField players={midfielders} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics}  />
                                    <StandardPlayerField players={defenders} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics}  />
                                    <GoalKeeperField goalKeeper={goalkeeper} isHomeTeam={isHomeTeam} teamData={teamData} lineupStats={statistics} />
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
        </div>

    );
}