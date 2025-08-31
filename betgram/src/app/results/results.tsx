import { Fixture, League, Result } from "@/types/results";
import React from "react";

const Results = async () => {
  const res = await fetch("http://localhost:3000/mock/results.json");
  const json = await res.json();
  const results: Result[] = json.response;

  // Estrai leghe uniche subito
  const uniqueLeagues: League[] = Array.from(
    new Map(results.map(r => [r.league.id, r.league])).values()
  );

  //estrai partite per lega by legaId
  const fixturesByLeagueId: { [leagueId: number]: Result[] } = {};
  results.forEach(result => {
    const leagueId = result.league.id;
    if (fixturesByLeagueId[leagueId]) {
      fixturesByLeagueId[leagueId].push(result);
    } else {
      fixturesByLeagueId[leagueId] = [result];
    }
  });

  return (
    <>
      {uniqueLeagues.map((league) => (
        <div key={league.id} className="collapse collapse-arrow bg-base-100 border border-base-300 w-3/5 mx-auto mb-2 hover:bg-base-300">
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            <div className="flex justify-left">
              <img src={league.logo} alt={league.name} className="w-12 h-12"/>
              <div className="p-4 text-lg font-bold">{league.name}</div>
            </div>
          </div>
          <div className="collapse-content text-sm border-t border-black">
            {
              fixturesByLeagueId[league.id].map(match => (
                <div key={match.fixture.id} className="flex items-center justify-between m-3">
                  <div className="flex items-center w-1/3">
                    <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-6 h-6 mr-2"/>
                    <div className="text-left ml-4">{match.teams.home.name}</div>
                  </div>

                  <div className="w-1/6 text-center font-bold">
                    {match.goals.home} - {match.goals.away}
                  </div>

                  <div className="flex items-center justify-end w-1/3">
                    <div className="text-right mr-4">{match.teams.away.name}</div>
                    <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-6 h-6 ml-2"/>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </>
  );
};

export default Results;
