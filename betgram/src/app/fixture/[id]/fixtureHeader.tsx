"use client";
import { FixtureData } from "@/types/results";
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

interface FixtureInfoProps {
  fixture: FixtureData;
}

export default function FixtureHeader({ fixture }: FixtureInfoProps) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between border-b border-gray-700 p-4">
      <div className="flex items-center gap-2">
        <button className="btn btn-circle" onClick={() => router.back()}>
          <ArrowLeftCircleIcon className="w-6 h-6" />
        </button>
        <span className="text-sm font-light">Indietro</span>
      </div>
      <div className="flex items-center gap-2 mr-20">
        <img
          src={fixture.league.logo}
          alt={fixture.league.name}
          className="w-6 h-6"
        />
        <span className="font-semibold">{fixture.league.name}</span>
      </div>
      <div>
        <InformationCircleIcon className="w-6 h-6" />
      </div>
    </div>
  );
}
