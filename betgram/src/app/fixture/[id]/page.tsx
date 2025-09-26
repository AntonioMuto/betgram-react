'use client'
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import FixtureInfo from "./fixtureInfo";
import FixtureTabs from "./fixtureTabs";
import FixtureHeader from "./fixtureHeader";
import { FixtureData } from "@/types/results";

const FixturePage = () => {
  const { id } = useParams();
  const [fixture, setFixture] = useState<FixtureData | null>(null);

  const aggiornaFixture = useCallback(
    (newFixture: React.SetStateAction<FixtureData | null>) => {
      setFixture(newFixture);
    },
    []
  );

  useEffect(() => {
    const fetchFixture = async () => {
      const res = await fetch(`https://betgram.click/api/fixtures/${id}`, {
        headers: { "Cache-Control": "no-cache" },
      });
      const json = await res.json();
      setFixture(json);
    };
    fetchFixture();
  }, [id]);

  if (!fixture) return <div className="flex justify-center mt-24">Loading…</div>;

  return (
    <div className="flex justify-center mt-10 sticky">
      <div className="card bg-custom-dark text-white w-full max-w-4xl shadow-xl">
        <FixtureHeader fixture={fixture} />
        {/* Passa la funzione memoizzata come prop */}
        <FixtureInfo fixture={fixture} setFixture={aggiornaFixture} />
        <FixtureTabs fixture={fixture} />
      </div>
    </div>
  );
};

export default FixturePage;
