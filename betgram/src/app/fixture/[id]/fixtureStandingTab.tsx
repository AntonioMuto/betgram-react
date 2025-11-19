import { FixtureData, Standing, StandingsData } from "@/types/results";
import { s } from "framer-motion/client";
import { useEffect, useState } from "react";
import { apiHandler } from '@/utils/apiHandler';
import { useDispatch } from "react-redux";
import { addError } from "@/store/errorSlice";

interface FixtureStandingTabProps {
  fixture: FixtureData;
}


export default function FixtureStandingTab({ fixture }: FixtureStandingTabProps) {
  const [standing, setStanding] = useState<StandingsData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStanding = async () => {
      try {
        const json = await apiHandler<StandingsData>(
          `https://betgram.click/api/standings/${fixture.league.id}/${fixture.league.season}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        setStanding(json);
      } catch (error) {
        console.error('Failed to fetch standings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStanding();
  }, [fixture]);

  const filterColor = (description?: string) => {
    if (description && description.includes("Champions League")) return "bg-custom-champions-league";
    if (description && description.includes("Europa League")) return "bg-custom-europa-league";
    if (description && description.includes("Conference League")) return "bg-custom-conference-league";
    if (description && description.includes("Relegation")) return "bg-red-700";
    return "bg-transparent";
  };

  return (
    isLoading ? (
      <div className="md:col-span-5 flex bg-custom-dark border border-gray-800 rounded-box shadow-md p-4 justify-center">
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
          <div className="skeleton h-7 w-full"></div>
        </div>
      </div>
    ) :
      <>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-custom-dark-black-light">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th className="text-white">#</th>
                <th className="text-white">SQUADRA</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info text-white" data-tip="Punti">
                    PT
                  </div>
                </th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info" data-tip="Vittorie">
                    V
                  </div>
                </th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info" data-tip="Sconfitte">
                    S
                  </div>
                </th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info" data-tip="Pareggiate">
                    P
                  </div>
                </th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info" data-tip="Goal Fatti">
                    GF
                  </div>
                </th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info" data-tip="Goal Subiti">
                    GS
                  </div>
                </th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info" data-tip="Differenza Reti">
                    DR
                  </div>
                </th>
                <th>
                  <div className="tooltip tooltip-bottom tooltip-info" data-tip="Partite Giocate">
                    PG
                  </div>
                </th>
                <th>FORMA</th>
              </tr>
            </thead>
            <tbody>
              {standing?.league.standings[0].map((standing: Standing) => (
                <tr className={`text-lg text-center text-gray-300 ${standing.team.id === fixture.teams.home.id || standing.team.id === fixture.teams.away.id ? "bg-custom-highlighted-list-row" : ""}`} key={standing.team.id}>
                  <td>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${filterColor(standing.description)}`}>
                      {standing.rank}
                    </div>
                  </td>
                  <td colSpan={5}>
                    <div className="flex flex-row items-center text-left">
                      <img
                        src={standing.team.logo}
                        alt={standing.team.name}
                        className="w-7 h-7 mr-4 object-contain"
                      />
                      <span className="text-white">
                        {standing.team.name}
                      </span>
                    </div>
                  </td>
                  <td className="font-bold text-white">{standing.points}</td>
                  <td>{standing.all.win}</td>
                  <td>{standing.all.lose}</td>
                  <td>{standing.all.draw}</td>
                  <td>{standing.all.goals.for}</td>
                  <td>{standing.all.goals.against}</td>
                  <td>{standing.goalsDiff}</td>
                  <td>{standing.all.played}</td>
                  <td>
                    <div className="flex flex-row items-center gap-0.5">
                      {standing.form.split("").map((char: string, index: number) => (
                        <div
                          key={ index }
                          className={`w-3 h-3 rounded-full ${char === "W" ? "bg-green-600" :
                            char === "L" ? "bg-red-600" :
                              "bg-gray-500"
                            }`}
                        ></div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-custom-champions-league" />
            <span className="text-lg text-gray-400">Champions League</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-custom-europa-league" />
            <span className="text-lg text-gray-400">Europa League</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-custom-conference-league" />
            <span className="text-lg text-gray-400">Conference League</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-700" />
            <span className="text-lg text-gray-400">Retrocessione</span>
          </div>
        </div>
      </>
  );
}