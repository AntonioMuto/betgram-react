"use client";
import { useUser } from "@/app/context/UserContext";
import { NotebookText, PlayIcon, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import UserTabs from "./userTabs";
import { t } from "i18next";

const ProfilePage = () => {
    const { userId } = useParams();
    const { user } = useUser();
    const [followers, setFollowers] = useState<number>(0);
    const [betsCount, setBetsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);
            try {
                const profileData = await new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                followers: 120,
                                betsCount: 45,
                            }),
                        1000
                    )
                );
                setFollowers(200);
                setBetsCount(45);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfileData();
    }, [userId]);

    return isLoading ? (
        <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>
    ) : (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-custom-dark shadow-md rounded-lg p-6">
                <div className="flex items-center gap-6 justify-evenly mb-5">
                    <div className="flex flex-col items-center">
                        <div className="avatar avatar-online">
                            <div className="w-24 rounded-full ">
                                <img src={`/images/${user?.avatar}`} />
                            </div>
                        </div>

                        <h1 className="text-lg font-bold text-white mt-2"  style={{ color: user?.nameColor }}>{user?.username || "User"}</h1>
                    </div>
                    <div className="stats shadow">
                        <div className="stat !border-none">
                            <div className="stat-figure text-secondary">
                                <Users size={30} className="mt-6 !text-green-600" />
                            </div>
                            <div className="stat-title text-lg">Follower</div>
                            <div className="stat-value">{followers}</div>
                        </div>
                    </div>
                    <div className="stats shadow">
                        <div className="stat !border-none">
                            <div className="stat-figure text-secondary">
                                <NotebookText size={30} className="mt-6 !text-green-600" />
                            </div>
                            <div className="stat-title text-lg">{t("scommesse")}</div>
                            <div className="stat-value">{betsCount}</div>
                        </div>
                    </div>
                </div>
            <UserTabs user={user!} />
            </div>
        </div>
    );
};

export default ProfilePage;
