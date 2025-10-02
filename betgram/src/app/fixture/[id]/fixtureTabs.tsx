import { useState } from "react";
import { FixtureData } from "@/types/results";
import {
  PlayIcon,
  BanknotesIcon,
  UsersIcon,
  QueueListIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import FixtureInfo from "./fixtureInfo";
import FixtureDetailTab from "./fixtureDetailTab";
import FixtureStatsTab from "./fixtureStatsTab";
import FixtureStandingTab from "./fixtureStandingTab";

interface FixtureTabsProps {
  fixture: FixtureData;
}

export default function FixtureTabs({ fixture }: FixtureTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "stats" | "quote" | "formations" | "standings">("details");

  return (
    <div className="tabs tabs-lift mt-4">
      <label className="tab">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "details"}
          onChange={() => setActiveTab("details")}
        />
        <PlayIcon className="size-8 me-2" />
        DETTAGLI
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "details" && <FixtureDetailTab fixture={fixture} />}
      </div>

      <label className="tab">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "stats"}
          onChange={() => setActiveTab("stats")}
        />
        <ChartBarSquareIcon className="size-8 me-2" />
        STATISTICHE
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "stats" && <FixtureStatsTab fixture={fixture} />}
      </div>

      <label className="tab">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "quote"}
          onChange={() => setActiveTab("quote")}
        />
        <BanknotesIcon className="size-8 me-2" />
        QUOTE
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "quote" && <>tab quote</>}
      </div>

      <label className="tab">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "formations"}
          onChange={() => setActiveTab("formations")}
        />
        <UsersIcon className="size-8 me-2" />
        FORMAZIONI
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "formations" && <>Tab content 2</>}
      </div>

      <label className="tab">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "standings"}
          onChange={() => setActiveTab("standings")}
        />
        <QueueListIcon className="size-8 me-2" />
        CLASSIFICA
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "standings" && <FixtureStandingTab fixture={fixture}/>}
      </div>
    </div>
  );
}
