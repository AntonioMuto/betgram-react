import { useUser } from "@/app/context/UserContext";
import { formatDateTimeToTimezone } from "@/app/utils/date";
import { isFixtureFinished, isFixtureInProgress, isFixtureScheduled } from "@/app/utils/fixtureState";
import { translate } from "@/app/utils/translate";
import { BetInfo } from "@/types/bets";
import { apiHandler } from "@/utils/apiHandler";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { CheckCircle, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

const BetDetailsModal = ({ betId, onClose }: { betId: string; onClose: () => void }) => {
    const { t } = useTranslation(); // Usa il hook per traduzioni
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [betDetails, setBetDetails] = useState<BetInfo | null>(null);
    const user = useUser();

    useEffect(() => {
        const fetchBetDetails = async () => {
            setIsLoading(true);
            try {
                const json = await apiHandler<BetInfo>(
                    `http://localhost:3001/api/bets/${betId}`,
                );
                setBetDetails(json);
            } catch (error) {
                console.error("Failed to fetch bet details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (betId) {
            fetchBetDetails();
        }
    }, [betId]);

    return (
        <div >
            {isLoading ? (
                <p>Caricamento...</p>
            ) : betDetails ? (
                <div>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between mb-2">
                            <strong>{t("ID scommessa")}:</strong>
                            <p>{betDetails.id}</p>
                        </div>
                        <div className="flex flex-row justify-between mb-2">
                            <strong>{t("data di creazione")}:</strong>
                            <p>{formatDateTimeToTimezone(betDetails.tippedDate, user?.user?.timezone || "UTC")}</p>
                        </div>
                        <div className="flex flex-row justify-between mb-2">
                            <strong>{t("quota totale")}:</strong>
                            <p>{betDetails.summaryBet.betsQuote}</p>
                        </div>
                        <div className="flex flex-row justify-between mb-2">
                            <strong>{t("importo scommesso")}:</strong>
                            <p>€ {betDetails.summaryBet.tipped}</p>
                        </div>
                        <div className="flex flex-row justify-between mb-2">
                            <strong>{t("bonus")}:</strong>
                            <p>€ {betDetails.summaryBet.bonus}</p>
                        </div>
                        <div className="flex flex-row justify-between mb-1">
                            <strong>{t("vittoria potenziale")}:</strong>
                            <p>€ {betDetails.summaryBet.total}</p>
                        </div>
                    </div>
                    <div className="divider mt-1 mb-0.5"></div>
                    <div>
                        {betDetails.events.map((event, index) => (
                            <div key={index} className="bg-gray-700 mt-3 rounded p-2 mb-4 pb-4">
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row gap-3 ">
                                            <img className="w-5 h-5 object-contain"
                                                src={event.fixture.league?.flag || ""}
                                                alt={event.fixture.league?.name}></img>
                                            <span className="font-bold text-sm">{event.fixture.league.name}</span>
                                            {isFixtureInProgress(event.fixture.status.short) && (
                                                <div className="inline-grid *:[grid-area:1/1] mt-1">
                                                    <div className="status status-error animate-ping"></div>
                                                    <div className="status status-error "></div>
                                                </div>
                                            )}
                                            {event.bet.abandoned && (
                                                <span className="badge badge-error ml-2">{t("abbandonata")}</span>
                                            )}
                                        </div>
                                        <span className="stat-desc text-sm">{formatDateTimeToTimezone(event.fixture.date, user?.user?.timezone || "UTC")}</span>
                                    </div>
                                    <div className="flex flex-row justify-between mt-4">
                                        <div className="flex flex-row gap-2 items-center">
                                            <img className="w-5 h-5 object-contain"
                                                src={event.fixture.teams.home.logo}
                                                alt={event.fixture.teams.home.name}></img>
                                            <span>{event.fixture.teams.home.name}</span>
                                            <span className="font-bold">-</span>
                                            <span>{event.fixture.teams.away.name}</span>
                                            <img className="w-5 h-5 object-contain"
                                                src={event.fixture.teams.away.logo}
                                                alt={event.fixture.teams.away.name}></img>
                                        </div>
                                        {((isFixtureFinished(event.fixture.status.short) || isFixtureInProgress(event.fixture.status.short)) && !event.bet.abandoned) && (
                                            <div className="flex flex-row gap-2">
                                                <span className={`${betDetails.isLive ?? "text-red-500" } text-md font-bold`}>{event.fixture.goals?.home ?? 0}-{event.fixture.goals?.away ?? 0}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="divider mt-1 mb-0.5"></div>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row gap-2 items-center">
                                            <span className="stat-desc text-sm" >{translate(event.bet.name)}:</span>
                                            <span className="font-bold">{translate(event.bet.values[0].value)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <span className={`${event.bet.abandoned ? "line-through" : ""} font-bold`}>{event.bet.values[0].odd}</span>
                                            {event.bet.values[0].winner === true &&
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            }
                                            {(event.bet.values[0].winner === false && event.bet.abandoned === undefined) &&
                                                <CircleX className="w-5 h-5 text-red-500" />
                                            }
                                            {event.bet.values[0].winner === undefined &&
                                                <span className="loading loading-dots loading-md text-amber-400"></span>
                                            }
                                            {(event.bet.values[0].winner === false && event.bet.abandoned) &&
                                                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            ) : (
                <p>{t("nessun dettaglio disponibile")}.</p>
            )}
        </div>
    );
};

export default BetDetailsModal;