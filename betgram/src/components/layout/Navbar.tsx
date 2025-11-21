"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { translate } from "@/app/utils/translate";
import { betPredictionData } from "@/types/bets";
import { Trash } from "lucide-react";
import { removeBet } from "@/store/betsSlice";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const bets = useSelector((state: RootState) => state.bets.bets);
  const [summaryBet, setSummaryBet] = useState<betPredictionData | null>(null);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    if(summaryBet?.tipped){
      updateSummary(parseFloat(summaryBet.tipped));
    } else {
      updateSummary(2);
    }
  }, [bets]);

  const updateSummary = ( puntata: number) => {
     const betsQuote = bets.reduce((acc, bet) => {
      const odd = parseFloat(bet.bet.values[0].odd);
      return acc * (isNaN(odd) ? 1 : odd);
    }, 1);
    const bonus = puntata * 0.1;
    const total = puntata * betsQuote + bonus;
    setSummaryBet({ tipped: puntata.toFixed(2), bonus: bonus.toFixed(2), total: total.toFixed(2) });
  }

  const calculateSummary = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const puntata = parseFloat(e.target.value) || 0;
    updateSummary(puntata);
  };

  return (
    <nav className="p-9 h-25 bg-custom-dark border-b border-gray-800 text-white sticky top-0 z-50 border-b border-black">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Betgram</h1>
        <div className="relative">
          <div className="indicator">
            <button onClick={toggleCart} className="text-white text-2xl">
              {bets.length > 0 && <span className="indicator-item badge  bg-green-800 w-4 h-5">{bets.length}</span>}
              <ListBulletIcon className="w-6 h-6" />
            </button>
          </div>
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-120 bg-white text-black rounded shadow-lg p-4">
              <h2 className="text-lg font-bold mb-2">Scommesse</h2>
              {bets.length === 0 ? (
                <p>Nessuna scommessa aggiunta.</p>
              ) : (
                <ul className="list rounded-box shadow-md divide-y divide-gray-200">
                  {bets.map((bet, index) => (
                    <li key={index} className="flex items-center gap-4 py-3">
                      <div className="flex-shrink-0 ml-2">
                        <Trash onClick={() => {}} className="w-5 h-5 text-red-600 cursor-pointer mb-2" />
                      </div>
                      <div className="flex-grow">
                        <div className="text-xs uppercase font-semibold font-bold">
                          {bet.fixture.teams.home.name} - {bet.fixture.teams.away.name}
                        </div>
                        <div className="text-sm text-gray-800">{translate(bet.bet.name)}</div>
                      </div>
                      <div className="text-right mr-2">
                        <div className="text-md font-bold">{translate(bet.bet.values[0].value)}</div>
                        <div className="text-sm text-gray-800">{bet.bet.values[0].odd}</div>
                      </div>
                    </li>
                  ))}
                  <li key={"TOTAL"} className="p-3 font-bold border-t pt-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-grow">Puntata:</div>
                      <div className="flex flex-row items-center gap-2">
                        <span>{"€"}</span>
                        <input type="text" onChange={calculateSummary()} className="input bg-white w-25 border border-gray-300 text-center"  maxLength={5} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-4">
                        <div className="flex-grow">Bonus:</div>
                        <div className="text-md uppercase font-semibold font-bold">€ {summaryBet?.bonus || "0.00"}</div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-grow">Totale:</div>
                        <div className="text-md uppercase font-semibold font-bold">€ {summaryBet?.total || "0.00"}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}