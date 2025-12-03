import { UserBet } from "@/types/bets";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { User } from "@/types/utils";
import { apiHandler } from "@/utils/apiHandler";
import { useEffect, useRef, useState } from "react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { formatDateTimeToTimezoneBet } from "@/app/utils/date";
import { Clock } from "lucide-react";
import BetDetailsModal from "./betDetailsModal";
import { t } from "i18next";

interface UserBetsListProps {
    user: User;
}

export const UserBetsList = ({ user }: UserBetsListProps) => {
    const [betsList, setUserBetsList] = useState<UserBet[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedBetId, setSelectedBetId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserBetsList = async () => {
            setIsLoading(true);
            try {
                const json = await apiHandler<UserBet[]>(
                    `http://localhost:3001/api/bets/user/${user?.username}`,
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

    const openBetDetails = (betId: string) => {
        setSelectedBetId(betId);
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
        setSelectedBetId(null); 
    };

    return (
        <div>
            {isLoading ? (
                <div>{t("loading")}...</div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {betsList?.map((bet) => {
                        return (
                            <div className="flex flex-col w-32/100" key={bet.id}>
                                <div
                                    className="bg-custom-dark-black-light shadow-md rounded-lg p-2 mb-4"
                                    key={bet.id}
                                    onClick={() => openBetDetails(bet.id)}
                                >
                                    <div className="flex flex-row items-center justify-between ">
                                        <div className="flex flex-row items-center gap-2 ml-1">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="bg-green-600 rounded-full">
                                                    <p className="px-2">{bet.totalWons}</p>
                                                </div>
                                                <div className="bg-amber-600 rounded-full">
                                                    <p className="px-2">{(bet.totalEvents || 0) - ((bet.totalWons || 0) + (bet.totalLost || 0))}</p>
                                                </div>
                                                <div className="bg-red-600 rounded-full">
                                                    <p className="px-2">{bet.totalLost}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tooltip tooltip-bottom text-white" data-tip={formatDateTimeToTimezoneBet(bet.tippedDate, user.timezone)}>
                                            <Clock className="h-6 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-5 items-center justify-between">
                                        <div className={`stat-desc text-right text-sm`}>
                                            {t("stato scommessa")}:
                                        </div>
                                        {bet.status === "PENDING" ? (
                                            <div className="badge badge-warning !bg-yellow-500 text-yellow-900 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    {t("in corso")}
                                                </div>
                                                <span className="loading loading-dots loading-md"></span>
                                            </div>
                                        ) : bet.status === "OK" ? (
                                            <div className="badge badge-success !bg-green-600 text-white font-semibold">{t("vinta")}</div>
                                        ) : (
                                            <div className="badge badge-error !bg-red-600 text-white font-semibold">{t("persa")}</div>
                                        )}
                                    </div>
                                    <div className="flex flex-row mt-2 items-center justify-between">
                                        <div className={`stat-desc text-right text-sm`}>
                                            {t("puntata")}:
                                        </div>
                                        <div className={`stat-value text-gray-400 text-right text-lg`}>
                                            € {bet.summaryBet.tipped}
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-2 items-center justify-between">
                                        <div className={`stat-desc text-right text-sm`}>
                                            {t("vittoria potenziale")}:
                                        </div>
                                        <div
                                            className={`${bet.status === "OK"
                                                ? "text-green-600"
                                                : bet.status === "KO"
                                                    ? "text-red-600"
                                                    : ""
                                                } stat-value text-right text-xl`}
                                        >
                                            € {bet.summaryBet.total}
                                        </div>
                                        {/* <PieChart
                                                    series={[
                                                        {
                                                            innerRadius: 14,
                                                            outerRadius: 35,
                                                            data: pieData,
                                                            arcLabel: (item) => (item.value > 0 ? `${item.value}` : ""), 
                                                        },
                                                    ]}
                                                    slotProps={{
                                                        tooltip: { trigger: "none" },
                                                        pieArc: {
                                                            strokeWidth: 0,
                                                        },
                                                        pieArcLabel: {
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                    margin={{ right: 5 }}
                                                    width={100}
                                                    height={100}
                                                    hideLegend={true}
                                                /> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {isModalOpen && selectedBetId && (
                <dialog className="modal" open>
                    <div className="modal-box w-11/12 max-w-2xl mt-14">
                        <BetDetailsModal betId={selectedBetId} onClose={closeModal} />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={closeModal}>{t("chiudi")}</button>
                    </form>
                </dialog>
            )}
        </div>
    );
};