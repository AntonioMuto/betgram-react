import { User } from "@/types/utils";
import RefreshIcon from "@heroicons/react/24/outline/ArrowPathRoundedSquareIcon";
import { t } from "i18next";
import { Check, Lock, Plus, Save, X } from "lucide-react";
import { use, useState } from "react";

const colorOptions = [
    { value: "white", className: "checkbox-white bg-white" },
    { value: "primary", className: "checkbox-primary bg-primary" },
    { value: "secondary", className: "checkbox-secondary bg-secondary" },
    { value: "accent", className: "checkbox-accent bg-accent" },
    { value: "info", className: "checkbox-info bg-info" },
    { value: "success", className: "checkbox-success bg-success" },
    { value: "warning", className: "checkbox-warning bg-warning" },
    { value: "error", className: "checkbox-error bg-error" },
];

const AccountSettingTab = ({ user }: { user: User | null }) => {
    const [selectedColor, setSelectedColor] = useState<string>("primary");
    const [selectedAvatar, setSelectedAvatar] = useState<string>("");

    return <div className="tab-content bg-custom-dark border-base-300 p-6">
        <span className="text-2xl font-semibold">{t("dati_account").toUpperCase()}</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mt-7">
            <div>
                <label className="floating-label">
                    <span>Email</span>
                    <div className="flex items-center">
                        <input type="mail" placeholder="mail@site.com" className="input input-md !bg-black" defaultValue={user?.email} disabled={!!user?.email} />
                        <button className="btn btn-outline btn-accent text-xs" disabled={user?.email ? false : true}>
                            <span className="">{t("cambia")}</span>
                            <RefreshIcon className="w-4 h-4" />
                        </button>
                    </div>
                </label>
                <span className={`${user?.isVerified ? "text-green-500" : "text-red-500"} text-xs ml-2`}>{t("email_verificata")}:</span>
                {user?.isVerified ? (
                    <Check className="inline-block ml-2 text-green-500 w-5 h-5" />
                ) : (
                    <X className="inline-block ml-2 text-red-500 w-5 h-5" />
                )}
            </div>

            <label className="floating-label">
                <span>Username</span>
                <div className="flex items-center">
                    <input type="text" className="input input-md !bg-black" defaultValue={user?.username} disabled={!!user?.username} />
                </div>
            </label>

            <button className="btn btn-outline btn-accent mt-2 w-1/2">
                {t("aggiorna_password")}
                <Lock className="w-4 h-4" />
            </button>

        </div>
        <div className="divider"></div>
        <span className="text-2xl font-semibold">{t("personalizzazione").toUpperCase()}</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mt-4">
            <div className="flex flex-col">
                <span className="text-gray-400 text-md mb-2">Username</span>
                <span
                    className={`text-lg font-medium ${selectedColor === "primary" ? "text-primary" :
                        selectedColor === "secondary" ? "text-secondary" :
                            selectedColor === "accent" ? "text-accent" :
                                selectedColor === "info" ? "text-info" :
                                    selectedColor === "success" ? "text-success" :
                                        selectedColor === "warning" ? "text-warning" :
                                            selectedColor === "error" ? "text-error" : ""
                        }`}
                >
                    {user?.username}
                </span>
                <div className="mt-4 flex flex-wrap gap-2">
                    {colorOptions.map((opt) => (
                        <input
                            key={opt.value}
                            type="checkbox"
                            className={`checkbox ${opt.className}`}
                            checked={selectedColor === opt.value}
                            onChange={() => setSelectedColor(opt.value)}
                        />
                    ))}
                    <div onClick={() => console.log("select new color")} className="tooltip" data-tip={t('seleziona_nuovo_colore')}>
                        <Plus className="inline-block me-2 bg-gray-300 rounded-full text-black" />
                    </div>
                </div>
                <div className="btn btn-outline btn-accent mt-6 w-26">
                    {t("salva").toUpperCase()}
                    <Save className="w-12 h-12" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 text-md mb-2">Avatar</span>
                <div className="flex flex-row">
                    <div className="avatar">
                        <div className="w-24 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="avatar">
                        <div  className="w-24 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img src="../images/avatar01.png"/>
                        </div>
                        <div className="w-24 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out ml-1">
                            <img src="../images/avatar02.png"/>
                        </div>
                        <div className="w-24 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out ml-1">
                            <Plus className="inline-block bg-gray-300 rounded-full text-black w-24 h-24 flex items-center justify-center"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default AccountSettingTab;