import { isFixtureFinished, isFixtureInProgress } from "@/app/utils/fixtureState";
import { translate } from "@/app/utils/translate";
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

  // 👇 Stato per i selezionati
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
    if(isFixtureFinished(fixture.fixture.status.short) || isFixtureInProgress(fixture.fixture.status.short)){
        setCanEdit(false);
    } else {
        setCanEdit(true);
    }
  }, [fixture.fixture.status.short]);

  // 👇 Funzione toggle: solo un valore selezionato per bet
  const toggleSelected = (betId: string, valueKey: string) => {
    if(!canEdit) return;
    setSelectedMap((prev) => {
      const current = prev[betId] || [];

      // se è già selezionato → rimuovilo
      if (current.includes(valueKey)) {
        return { ...prev, [betId]: [] };
      }

      // altrimenti sostituisci il precedente
      return { ...prev, [betId]: [valueKey] };
    });
  };

  return (
    <div>
      <form className="mb-5">
        <input className="btn" type="checkbox" aria-label="Svelte" />
        <input className="btn" type="checkbox" aria-label="Vue" />
        <input className="btn" type="checkbox" aria-label="React" />
        <input className="btn btn-square" type="reset" value="×" />
      </form>

      {odds?.bookmakers[0]?.bets.map((bet) => {
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
              {translate(bet.name)}
            </div>

            <div className="collapse-content text-sm bg-custom-dark-black-light">
              <div className={containerClass}>
                {bet.values.map((value, idx) => {
                  const valueKey = `${bet.id}_${value.value}_${idx}`;
                  const isSelected = isFixtureFinished(fixture.fixture.status.short) ? value.winner : selectedMap[bet.id]?.includes(valueKey);

                  return (
                    <div
                      key={valueKey}
                      className={`stat !border !border-custom-pitch rounded flex-1 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-green-800"
                          : canEdit === true ? "hover:bg-highlight-custom-dark" : "bg-custom-disabled-odd"
                      }`}
                      onClick={() => toggleSelected(bet.id, valueKey)}
                    >
                      <div className="stat-title text-lg">
                        {translate(value.value)}
                      </div>
                      <div className={`stat-value text-3xl ${canEdit === false ? isSelected ? "" : "text-gray-500" : ""}`}>{value.odd}</div>
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
