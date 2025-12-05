"use client";
import { useTranslation } from "react-i18next";
import { EarthIcon, KeyRoundIcon, LockKeyholeIcon, UserPlusIcon } from "lucide-react";
import AccountSettingTab from "./accountSettingTab";
import LanguageTimeSettingTab from "./languageTimeSettingTab";
import InvitationSettingTab from "./invitationSettingTab";
import PrivacySettingTab from "./privacySettingTab";
import { useUser } from "@/app/context/UserContext";

const settingsPage = () => {
    const { t } = useTranslation();
    const { user } = useUser();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="bg-transparent shadow-md rounded-lg p-6">
                <div className="tabs tabs-lift">
                    <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2 border-base-300">
                        <input type="radio" name="my_tabs_4" defaultChecked />
                        <KeyRoundIcon className="size-8 me-2" />
                        {t("account")?.toUpperCase()}
                    </label>
                    <AccountSettingTab user={user} />

                    <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2">
                        <input type="radio" name="my_tabs_4" />
                        <LockKeyholeIcon className="size-8 me-2" />
                        {t("privacy")?.toUpperCase()}
                    </label>
                    <PrivacySettingTab user={user} />

                    <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2">
                        <input type="radio" name="my_tabs_4" />
                        <EarthIcon className="size-8 me-2" />
                        {t("lingua_e_ora")?.toUpperCase()}
                    </label>
                    <LanguageTimeSettingTab />

                    <label className="tab [--tab-bg:var(--bg-custom-gray)] mr-2">
                        <input type="radio" name="my_tabs_4" />
                        <UserPlusIcon className="size-8 me-2" />
                        {t("inviti")?.toUpperCase()}
                    </label>
                    <InvitationSettingTab user={user}/>
                </div>
            </div>
        </div>
    );
};

export default settingsPage;