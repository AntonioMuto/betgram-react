import { PlayIcon, Table } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { User } from "@/types/utils";
import { useEffect, useState } from "react";
import { UserBetsList } from "./userBetsList";

interface UserTabsProps {
  user: User;
}

const UserTabs = ({ user }: UserTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("bets");

  useEffect(() => {
    setActiveTab("bets");
  }, [user]);

  return (
    <div className="tabs tabs-lift mt-4">
      <label className="tab [--tab-bg:var(--selected-tab)]">
        <input
          type="radio"
          name="my_tabs_4"
          checked={activeTab === "bets"}
          onChange={() => setActiveTab("bets")}
        />
        <Table className="size-8 me-2" />
        SCOMMESSE
      </label>
      <div className="tab-content bg-custom-dark-black border-base-300 p-6">
        {activeTab === "bets" && <UserBetsList user={user} />}
      </div>
    </div>
  );
}
export default UserTabs;