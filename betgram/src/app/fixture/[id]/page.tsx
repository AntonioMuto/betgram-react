'use client'
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import FixtureInfo from "./fixtureInfo";
import FixtureTabs from "./fixtureTabs";
import FixtureHeader from "./fixtureHeader";
import { FixtureData } from "@/types/results";
import { isFixtureFinished, isFixtureInProgress } from "@/app/utils/fixtureState";
import { apiHandler } from '@/utils/apiHandler';

const FixturePage = () => {
  const { id } = useParams();
  const [fixture, setFixture] = useState<FixtureData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const aggiornaFixture = useCallback(
    (newFixture: React.SetStateAction<FixtureData | null>) => {
      setFixture(newFixture);
    },
    []
  );

  useEffect(() => {
    const fetchFixture = async () => {
      setIsLoading(true);
      try {
        let json = await apiHandler<any>(
          `http://65.108.132.166:12030/api/fixtures/${id}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        if (json?.events.length === 0 && isFixtureFinished(json.fixture.status.short)) {
          json = await apiHandler<any>(
            `http://65.108.132.166:12030/api/fixtures/update/${id}`,
            { headers: { "Cache-Control": "no-cache" } }
          );
        }
        setFixture(json);
      } catch (error) {
        console.error('Failed to fetch fixture:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFixture();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!fixture) return <div className="w-1/2 mx-auto mt-5 flex flex-col bg-custom-dark border border-gray-800 rounded-box shadow-md p-4 justify-center">
    <div className="flex w-full flex-col gap-4 mt-4">
      <div className="skeleton h-10 w-full"></div>
      <div className="skeleton h-60 w-full"></div>
      <div className="flex w-full flex-row gap-4">
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
      <div className="skeleton h-80 w-full"></div>
    </div>
  </div>;

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
