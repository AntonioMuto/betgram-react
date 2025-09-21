import { PlayersData } from "@/types/results";
import React from "react";

type PlayerFixtureInfoProps = {
  players: PlayersData[];
};

export default function PlayerFixtureInfo({ players }: PlayerFixtureInfoProps) {
  return (
    <>
      <div>
        <h3 className="font-bold text-lg">Players Info</h3>
        <h3 className="font-bold text-lg">{players.length}</h3>
      </div>
    </>
  );
}
