import { FixtureData } from "@/types/results";
import {
  PlayIcon,
  BanknotesIcon,
  UsersIcon,
  QueueListIcon,
  ChartBarSquareIcon
} from "@heroicons/react/24/outline";
import React from "react";
import FixtureInfo from "./fixtureInfo";
import FixtureDetailTab from "./fixtureDetailTab";
import FixtureStatsTab from "./fixtureStatsTab";

interface FixtureTabsProps {
  fixture: FixtureData;
}

export default function FixtureTabs({ fixture }: FixtureTabsProps) {
  return (
    <div className="tabs tabs-lift mt-4">
        <label className="tab">
          <input type="radio" name="my_tabs_4" defaultChecked />
          <PlayIcon className="size-8 me-2" />
          DETTAGLI
        </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        <FixtureDetailTab fixture={fixture} />
      </div>

      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <ChartBarSquareIcon className="size-8 me-2" />
        STATISTICHE
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        <FixtureStatsTab fixture={fixture}/>
      </div>

      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <BanknotesIcon className="size-8 me-2" />
        QUOTE
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        tab quote
      </div>

      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <UsersIcon className="size-8 me-2" />
        FORMAZIONI
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        Tab content 2
      </div>

      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <QueueListIcon className="size-8 me-2" />
        CLASSIFICA
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        Tab content 3
      </div>
    </div>
  );
}
