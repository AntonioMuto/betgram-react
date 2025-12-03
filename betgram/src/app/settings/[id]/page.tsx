"use client";
import { useTranslation } from "react-i18next";
import { EarthIcon, KeyRoundIcon, LockKeyholeIcon, UserPlusIcon } from "lucide-react";

const settingsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="bg-custom-dark shadow-md rounded-lg p-6">
                <div className="tabs tabs-lift">
                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        <KeyRoundIcon className="size-8 me-2" />
                        {t("account")?.toUpperCase()}
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

                    <label className="tab">
                        <input type="radio" name="my_tabs_4" defaultChecked />
                        <LockKeyholeIcon className="size-8 me-2" />
                        {t("privacy")?.toUpperCase()}
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        <EarthIcon className="size-8 me-2" />
                        {t("lingua")?.toUpperCase()}
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>

                    <label className="tab">
                        <input type="radio" name="my_tabs_4" />
                        <UserPlusIcon className="size-8 me-2" />
                        {t("inviti")?.toUpperCase()}
                    </label>
                    <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 4</div>
                </div>
            </div>
        </div>
    );
};

export default settingsPage;