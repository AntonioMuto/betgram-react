import { isFixtureFinished, isFixtureInProgress } from "@/app/utils/fixtureState";
import { translate, translateOdds } from "@/app/utils/translate";
import { OddsData } from "@/types/odds";
import { FixtureData } from "@/types/results";
import { useEffect, useState } from "react";

interface FixtureOddsTabProps {
  fixture: FixtureData;
}

export default function FixtureOddsTab({ fixture }: FixtureOddsTabProps) {
  const [odds, setOdds] = useState<OddsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canEdit, setCanEdit] = useState<boolean>(true);

  // ✅ Stato per selezione filtri
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // ✅ Stato per selezione bet
  const [selectedMap, setSelectedMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchOdds = async () => {
      const res = await fetch(
        `https://betgram.click/api/fixtures/odds/${fixture.fixture.id}`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      const json = await res.json();
      setOdds(json);
      setIsLoading(false);
    };
    fetchOdds();
  }, [fixture]);

  useEffect(() => {
    if (isFixtureFinished(fixture.fixture.status.short) || isFixtureInProgress(fixture.fixture.status.short)) {
      setCanEdit(false);
    } else {
      setCanEdit(true);
    }
  }, [fixture.fixture.status.short]);

  // ✅ Toggle per selezione quote
  const toggleSelected = (betId: string, valueKey: string) => {
    if (!canEdit) return;
    setSelectedMap((prev) => {
      const current = prev[betId] || [];
      if (current.includes(valueKey)) {
        return { ...prev, [betId]: [] };
      }
      return { ...prev, [betId]: [valueKey] };
    });
  };

  // ✅ Toggle per filtri (checkbox)
  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // ✅ Mappa di categorie → nomi scommesse
  const betCategories: Record<string, string[]> = {
    Classiche: ["Match Winner", "Goals Over/Under", "Both Teams Score", "Double Chance", "Own Goal"],
    Goals: ["Total - Home", "Total - Away", "Exact Goals Number", "Home Team Exact Goals Number", "Away Team Exact Goals Number"],
    Asiatiche: ["Asian Handicap", "Handicap Result", "Handicap Result - First Half", "Asian Handicap First Half"],
    PrimoTempo: ["Goals Over/Under First Half", "Correct Score - First Half", "First Half Winner", "Double Chance - First Half", "Both Teams Score - First Half", "Odd/Even - First Half", "Exact Goals Number - First Half"],
    SecondoTempo: ["Goals Over/Under - Second Half", "Second Half Winner", "Both Teams To Score - Second Half", "Second Half Exact Goals Number"],
    Speciali: ["Clean Sheet - Home", "Clean Sheet - Away", "Team To Score First", "Team To Score Last", "Odd/Even", "Home Odd/Even", "Away Odd/Even", "Odd/Even - Second Half", "Winning Margin", "Highest Scoring Half"],
    Combo: ["Results/Both Teams Score", "Result/Total Goals", "Total Goals/Both Teams To Score", "HT/FT Double"]
  };

  // ✅ Filtraggio bets in base ai filtri selezionati
  const filteredBets = odds?.bookmakers[0]?.bets.filter((bet) => {
    if (selectedFilters.length === 0) return true; // Nessun filtro → mostra tutto
    return selectedFilters.some((filter) =>
      betCategories[filter]?.some((name) =>
        bet.name.toLowerCase() === (name.toLowerCase())
      )
    );
  });

  return (
    <div>
      {isLoading && (
        <div className="md:col-span-5 flex flex-col bg-custom-dark border border-gray-800 rounded-box shadow-md p-4 justify-center">
          <div className="flex w-full flex-row gap-4">
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>
          <div className="flex w-full flex-col gap-4 mt-4">
              <div className="skeleton h-20 w-full"></div>
              <div className="skeleton h-20 w-full"></div>
              <div className="skeleton h-20 w-full"></div>
              <div className="skeleton h-20 w-full"></div>
              <div className="skeleton h-20 w-full"></div>
              <div className="skeleton h-20 w-full"></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <form className="mb-5 flex gap-2 flex-wrap ">
          {["Classiche", "Goals", "Asiatiche", "PrimoTempo", "SecondoTempo", "Speciali", "Combo"].map((label) => (
            <label key={label} className="btn cursor-pointer w-23 bg-custom-dark-black-light has-[input:checked]:bg-green-800 has-[input:checked]:border-green-500">
              <input className="btn bg-transparent border-0" type="checkbox" checked={selectedFilters.includes(label)}
                onChange={() => handleFilterChange(label)} aria-label={ label === 'PrimoTempo' ? '1° T' : label === 'SecondoTempo' ? '2° T' : label } />
            </label>
          ))}
          <input
            className="btn btn-square bg-custom-dark-black-light"
            type="reset"
            value="×"
            onClick={() => setSelectedFilters([])}
          />
        </form>
      )}

      {filteredBets?.map((bet) => {
        const count = bet.values.length;
        const isGrid = count >= 3;

        const containerClass = isGrid
          ? "grid grid-cols-3 gap-3 p-4"
          : "flex justify-between items-center gap-3 p-4";

        return (
          <div
            key={bet.id ?? bet.name}
            className="collapse collapse-arrow bg-highlight-custom-dark border border-base-300 mt-5"
          >
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title font-semibold text-lg">
              {translate(bet.name).toUpperCase()}
            </div>

            <div className="collapse-content text-sm bg-custom-dark-black-light">
              <div className={containerClass}>
                {bet.values.map((value, idx) => {
                  const valueKey = `${bet.id}_${value.value}_${idx}`;
                  const isSelected = isFixtureFinished(fixture.fixture.status.short)
                    ? value.winner
                    : selectedMap[bet.id]?.includes(valueKey);

                  return (
                    <div
                      key={valueKey}
                      className={`stat !border !border-custom-pitch rounded flex-1 cursor-pointer transition-colors ${isSelected
                          ? "bg-green-800"
                          : canEdit === true
                            ? "hover:bg-highlight-custom-dark"
                            : "bg-custom-disabled-odd"
                        }`}
                      onClick={() => toggleSelected(bet.id, valueKey)}
                    >
                      <div className="stat-title text-lg">
                        {translateOdds(value.value, bet.name) ?? translate(value.value)}
                      </div>
                      <div
                        className={`stat-value text-3xl ${canEdit === false && !isSelected ? "text-gray-500" : ""
                          }`}
                      >
                        {value.odd}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
