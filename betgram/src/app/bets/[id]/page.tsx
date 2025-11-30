"use client";
import { useUser } from "@/app/context/UserContext";
import { UserBet } from "@/types/bets";
import { apiHandler } from "@/utils/apiHandler";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const BetsPage = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [betsList, setBetsList] = useState<UserBet[] | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchFixture = async () => {
      setIsLoading(true);
      try {
        let json = await apiHandler<UserBet[]>(
          `http://localhost:3001/api/bets/user/${user?.id}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        setBetsList(json);
      } catch (error) {
        console.error("Failed to fetch fixture:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFixture();
  }, [userId]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {betsList?.map((bet) => {
          return (
            <div key={bet.user} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-lg font-bold">
                Puntata: €{bet.summaryBet.tipped}
              </p>
              <p className="text-sm text-gray-600">
                Eventi totali: {bet.totalEvents}
              </p>
              <p className="text-sm text-gray-600">Data: {bet.tippedDate}</p>
              <p
                className={`text-sm font-semibold ${
                  bet.status === "WIN"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Stato: {bet.status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BetsPage;
