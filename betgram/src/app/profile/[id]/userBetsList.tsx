import { UserBet } from "@/types/bets";
import { PieChart } from "@mui/x-charts/PieChart";
import { User } from "@/types/utils";
import { apiHandler } from "@/utils/apiHandler";
import { useEffect, useState } from "react";

interface UserBetsListProps {
    user: User;
}

export const UserBetsList = ({ user }: UserBetsListProps) => {
    const [betsList, setUserBetsList] = useState<UserBet[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("Fetching bets for user:", user);
        const fetchUserBetsList = async () => {
            setIsLoading(true);
            try {
                const json = await apiHandler<UserBet[]>(
                    `http://localhost:3001/api/bets/user/${user?.username}`,
                    { headers: { "Cache-Control": "no-cache" } }
                );
                setUserBetsList(json);
            } catch (error) {
                console.error("Failed to fetch user bets list:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserBetsList();
    }, [user]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-5">
                    {betsList?.map((bet) => {
                        // Dynamically construct the data for the PieChart
                        const pieData = [
                            { label: "Lost", value: bet.totalLost || 0, color: "#FF0000" }, // Red for lost
                            {
                                label: "Pending",
                                value:
                                    (bet.totalEvents || 0) -
                                    ((bet.totalWon || 0) + (bet.totalLost || 0)),
                                color: "#FFD700", // Yellow for pending
                            },
                            { label: "Won", value: bet.totalWon || 0, color: "#00FF00" }, // Green for won
                        ];

                        return (
                            <div
                                className="flex flex-col bg-custom-dark-black-light shadow-md rounded-lg p-2 mb-4"
                                key={bet.id}
                            >
                                <div className="flex flex-row mt-auto items-center justify-between">
                                    <PieChart
                                        series={[
                                            {
                                                innerRadius: 20,
                                                outerRadius: 40,
                                                data: pieData,
                                                arcLabel: (item) => (item.value > 0 ? `${item.value}` : ""), // Only show label if value > 0
                                            },
                                        ]}
                                        slotProps={{
                                            tooltip: { trigger: "none" },
                                        }}
                                        margin={{ right: 5 }}
                                        width={100}
                                        height={100}
                                        hideLegend={true}
                                    />
                                    <div className="stat">
                                        <div
                                            className={`${bet.status === "OK"
                                                ? "text-green-600"
                                                : bet.status === "KO"
                                                    ? "text-red-600"
                                                    : ""
                                                } stat-value text-right text-2xl`}
                                        >
                                            € {bet.summaryBet.total}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};