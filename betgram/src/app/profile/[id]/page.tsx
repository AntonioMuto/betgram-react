"use client";
import { useUser } from "@/app/context/UserContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
                setBetsCount(1);
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
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center gap-6 justify-evenly">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700">
                            {user?.id?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <h1 className="text-2xl font-bold text-black mt-1">{user?.email || "User"}</h1>
                    </div>
                    <div className="flex justify-between w-1/3">
                    <div>
                        <p className="text-lg font-bold text-black">{followers}</p>
                        <p className="text-md text-gray-600">Followers</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-black">{betsCount}</p>
                        <p className="text-md text-gray-600">Scommesse</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
