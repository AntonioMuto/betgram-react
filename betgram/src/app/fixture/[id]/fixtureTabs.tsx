import { use, useEffect, useState } from "react";
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
import FixtureLineupsTab from "./fixtureLineupsTab";
import FixtureOddsTab from "./fixtureOddsTab";
import { isFixtureFinished, isFixtureInProgress, isFixtureScheduled } from "@/app/utils/fixtureState";
import { t } from "i18next";

interface FixtureTabsProps {
  fixture: FixtureData;
}

export default function FixtureTabs({ fixture }: FixtureTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("details");

  useEffect(() => {
    let selectedTab = "details";
    if (isFixtureFinished(fixture.fixture.status.short) || isFixtureInProgress(fixture.fixture.status.short)) selectedTab = "details";
    if (isFixtureScheduled(fixture.fixture.status.short)) selectedTab = "quote";
    if(!isFixtureInProgress(fixture.fixture.status.short)){
      setActiveTab(selectedTab);
    }
  }, [fixture]);

  return (
    <div className="tabs tabs-lift mt-4">
      {(isFixtureInProgress(fixture.fixture.status.short) || isFixtureFinished(fixture.fixture.status.short)) && (
        <>
          <label className="tab [--tab-bg:var(--selected-tab)]">
            <input
              type="radio"
              name="my_tabs_4"
              checked={activeTab === "details"}
              onChange={() => setActiveTab("details")}
            />
            <PlayIcon className="size-8 me-2" />
            {t("dettagli").toUpperCase()}
          </label>
          <div className="tab-content bg-custom-dark-black border-base-300 p-6">
            {activeTab === "details" && <FixtureDetailTab fixture={fixture} />}
          </div>

          <label className="tab [--tab-bg:var(--selected-tab)]">
            <input
              type="radio"
              name="my_tabs_4"
              checked={activeTab === "stats"}
              onChange={() => setActiveTab("stats")}
            />
            <ChartBarSquareIcon className="size-8 me-2" />
            {t("statistiche").toUpperCase()}
          </label>
          <div className="tab-content bg-custom-dark-black border-base-300 p-6">
            {activeTab === "stats" && <FixtureStatsTab fixture={fixture} />}
          </div>
        </>
      )}
      <label className="tab [--tab-bg:var(--selected-tab)]">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "quote"}
          onChange={() => setActiveTab("quote")}
        />
        <BanknotesIcon className="size-8 me-2" />
        {t("quote").toUpperCase()}
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "quote" && <FixtureOddsTab fixture={fixture} />}
      </div>
      <label className="tab [--tab-bg:var(--selected-tab)]">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "formations"}
          onChange={() => setActiveTab("formations")}
        />
        <UsersIcon className="size-8 me-2" />
        {t("formazioni").toUpperCase()}
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "formations" && <><FixtureLineupsTab fixture={fixture} /></>}
      </div>

      <label className="tab [--tab-bg:var(--selected-tab)]">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "standings"}
          onChange={() => setActiveTab("standings")}
        />
        <QueueListIcon className="size-8 me-2" />
        {t("classifica").toUpperCase()}
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "standings" && <FixtureStandingTab fixture={fixture} />}
      </div>
    </div>
  );
}
