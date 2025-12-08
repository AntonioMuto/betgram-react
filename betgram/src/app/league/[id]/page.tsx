"use client";
import { InfoIcon, ListIcon, Table, Users } from "lucide-react";
import LeagueInfo from "./leagueInfo";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation"; 

const LeaguePage = () => {
  const { t } = useTranslation();
  const params = useParams(); 
  const leagueId = params.id as string; 

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-transparent shadow-md rounded-lg p-6">
        <div className="tabs tabs-lift">
          <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2 border-base-300">
            <input type="radio" name="my_tabs_4" defaultChecked />
            <InfoIcon className="size-8 me-2" />
            {t("info")?.toUpperCase()}
          </label>
          <LeagueInfo leagueId={leagueId} /> {/* Passa l'id al componente */}

          <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2">
            <input type="radio" name="my_tabs_4" />
            <ListIcon className="size-8 me-2" />
            {t("partite")?.toUpperCase()}
          </label>
          <LeagueInfo leagueId={leagueId} />

          <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2">
            <input type="radio" name="my_tabs_4" />
            <Table className="size-8 me-2" />
            {t("classifica")?.toUpperCase()}
          </label>
          <LeagueInfo leagueId={leagueId} />

          <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2">
            <input type="radio" name="my_tabs_4" />
            <Users className="size-8 me-2" />
            {t("giocatori")?.toUpperCase()}
          </label>
          <LeagueInfo leagueId={leagueId} />
        </div>
      </div>
    </div>
  );
};

export default LeaguePage;