import { apiHandler } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LeagueInfo = ({ leagueId }: { leagueId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [leagueDetails, setLeagueDetails] = useState<any>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchLeagueDetails = async () => {
            setIsLoading(true);
            try {
                const json = await apiHandler<any>(
                    `http://localhost:3001/api/leagues/info/${leagueId}`,
                );
                setLeagueDetails(json);
            } catch (error) {
                console.error("Failed to fetch league details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (leagueId) {
            fetchLeagueDetails();
        }
    }, [leagueId]);

    return (
        <div className="tab-content bg-custom-dark border-base-300 p-6">
            {isLoading ? (
                <p>{t("loading")}...</p>
            ) : (
                <div>
                    <div className="flex flex-row items-center">
                        <img src={leagueDetails.leagueData.league.logo} alt={leagueDetails.leagueData.league.name} className="w-20 h-20 mb-4 rounded" />
                        <div className="ml-6">
                            <h2 className="text-2xl font-bold mb-2">{leagueDetails.leagueData.league.name}</h2>
                            <div className="flex flex-row gap-1">
                                <p className="mb-1">{leagueDetails.leagueData.country.name}</p>
                                <img src={leagueDetails.leagueData.country.flag} alt={leagueDetails.leagueData.country.name} className="w-8 h-5 object-contain mb-2" />
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <span className="text-2xl font-semibold">{t("teams").toUpperCase()}</span>

                </div>
            )}
        </div>
    );
};

export default LeagueInfo;