import { useUser } from "@/app/context/UserContext";
import i18n from "@/i18n";
import { addAlert } from "@/store/errorSlice";
import { User } from "@/types/utils";
import { s } from "framer-motion/m";
import { changeLanguage, t } from "i18next";
import { Save } from "lucide-react";
import { win32 } from "path";
import { use, useState } from "react";
import { useDispatch } from "react-redux";

const languageOptions = [
    { label: "IT", value: "it" },
    { label: "GB", value: "en" },
];

const timeZoneOptions = [
    { label: "Roma +1", value: "Europe/Rome" },
    { label: "Londra 0", value: "Europe/London" },
    { label: "New York -5", value: "America/New_York" },
    { label: "Los Angeles -8", value: "America/Los_Angeles" },
    { label: "Tokyo +9", value: "Asia/Tokyo" },
    { label: "Sydney +10", value: "Australia/Sydney" },
    { label: "UTC 0", value: "UTC" },
    { label: "Moscow +3", value: "Europe/Moscow" },
    { label: "Beijing +8", value: "Asia/Shanghai" },
    { label: "Dubai +4", value: "Asia/Dubai" },
    { label: "Mumbai +5:30", value: "Asia/Kolkata" },
    { label: "Sao Paulo -3", value: "America/Sao_Paulo" },
    { label: "Cairo +2", value: "Africa/Cairo" },
];

const LanguageTimeSettingTab = () => {
    const user = useUser().user;
    const [selectedLanguage, setSelectedLanguage] = useState<string>(user?.language || "it");
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>(user?.timezone || "UTC");
    const dispatch = useDispatch();

    const selectFlag = (lang: string) => {
        if (lang === "en") {
            lang = "GB";
        }
        setSelectedLanguage(lang);
    }

    const setTimeZone = () => {
        if (user) {
            user.timezone = selectedTimeZone;
            dispatch(addAlert({ text: t("fuso_orario_aggiornato"), type: "success" }));
        }
    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        // window.location.reload();
    };

    return <div className="tab-content bg-custom-dark border-base-300 p-6">
        <span className="text-2xl font-semibold">{t("lingua").toUpperCase()}</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mt-7">
            <div className="flex flex-col">
                <span className="text-gray-400 text-md mb-2">{t("attuale")}</span>
                <div className="flex flex-row items-center gap-6">
                    <div>
                        <img key={'picked'} src={`https://flagsapi.com/${selectedLanguage.toUpperCase()}/flat/64.png`}></img>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    {languageOptions.map((option) => (
                        <div onClick={() => selectFlag(option.value)} key={option.value}>
                            <img src={`https://flagsapi.com/${option.label}/flat/64.png`}></img>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div onClick={() => changeLanguage(selectedLanguage)} className="btn btn-outline btn-accent mt-6 w-80">
            {t("salva").toUpperCase()}
            <Save className="w-8 h-8" />
        </div>
        <div className="divider"></div>
        <span className="text-2xl font-semibold">{t("orario").toUpperCase()}</span>
        <div className="mt-4">
            <span className="text-gray-400 text-md mb-2">{t("fuso_orario")}</span>
            <div>
                <select
                    value={selectedTimeZone} // Use the value prop to control the selected option
                    onChange={(e) => setSelectedTimeZone(e.target.value)}
                    className="select select-bordered w-80 bg-black"
                >
                    {timeZoneOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div onClick={() => setTimeZone()} className="btn btn-outline btn-accent">
                    <Save className="inline-block w-8 h-8cursor-pointer" />
                </div>
            </div>
        </div>
    </div>;
}

export default LanguageTimeSettingTab;