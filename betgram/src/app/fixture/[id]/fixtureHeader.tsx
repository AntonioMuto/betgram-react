"use client";
import { FixtureData } from "@/types/results";
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { t } from "i18next";
import { useRouter } from "next/navigation";
import React from "react";

interface FixtureInfoProps {
  fixture: FixtureData;
}

export default function FixtureHeader({ fixture }: FixtureInfoProps) {
  const router = useRouter();
  return (
    <div className="flex items-center border-b border-gray-700 p-4">
      <div className="flex items-center gap-2 flex-1">
        <button className="btn btn-circle" onClick={() => router.back()}>
          <ArrowLeftCircleIcon className="w-8 h-8" />
        </button>
        <span className="text-lg font-light">{t("indietro")}</span>
      </div>
      <div className="flex items-center gap-2 mx-auto">
        <img
          src={fixture.league.logo}
          alt={fixture.league.name}
          className="w-9 h-9 object-contain"
        />
        <span className="font-semibold text-lg">{fixture.league.name}</span>
      </div>
      <div className="flex justify-end flex-1">
        <InformationCircleIcon className="w-6 h-6" />
      </div>
    </div>
  );


}
