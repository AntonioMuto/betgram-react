"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/store/store";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { translate } from "@/app/utils/translate";
import { betPredictionData } from "@/types/bets";
import { Trash } from "lucide-react";
import { removeBetByIndex } from "@/store/betsSlice";
import { useUser } from "@/app/context/UserContext";
import { formatDateTimeToTimezone } from "@/app/utils/date";
import { apiHandler } from "@/utils/apiHandler";
import { addError } from "@/store/errorSlice";
import { HttpMethod } from "@/types/utils";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const bets = useSelector((state: RootState) => state.bets.bets);
  const dispatch = useDispatch();
  const { user } = useUser();
  const timezone = user?.timezone || "UTC";
  const [summaryBet, setSummaryBet] = useState<betPredictionData | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const [loadingCart, setLoadingCart] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
    if (!isCartOpen) {
      if (bets.length >= 0 && parseFloat(summaryBet?.tipped || "0") < 1) updateSummary(parseFloat("2"));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        iconButtonRef.current &&
        !iconButtonRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (bets.length > 0) {
      const puntata = parseFloat(summaryBet?.tipped || "2");
      if (!isNaN(puntata)) {
        updateSummary(puntata);
      }
      setIsCartOpen(true);
    }
  }, [bets]);

  const updateSummary = (puntata: number) => {
    if (puntata <= 0) return;
    const betsQuote = bets.reduce((acc, bet) => {
      const odd = parseFloat(bet.bet.values[0].odd);
      return acc * (isNaN(odd) ? 1 : odd);
    }, 1);
    const bonus = puntata * 0.1;
    const total = puntata * betsQuote + bonus;
    setSummaryBet({
      tipped: puntata.toFixed(2),
      bonus: bonus.toFixed(2),
      total: total.toFixed(2),
    });
  };

  const calculateSummary = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = (parseFloat(value) / 100).toFixed(2);
    e.target.value = formattedValue;
    const puntata = parseFloat(formattedValue) || 0;
    updateSummary(puntata);


    if (puntata < 1.0) {
      e.target.classList.add("border-red-500");
    } else {
      e.target.classList.remove("border-red-500");
    }
  };

  const deleteBet = (index: number) => {
    dispatch(removeBetByIndex(index));
    if (bets.length === 1) {
      setSummaryBet({
        tipped: "0.00",
        bonus: "0.00",
        total: "0.00",
      });
    }
  };

  const createBet = async () => {
    try {
      setLoadingCart(true);
      const res = await apiHandler<any>(
        `https://betgram.click/api/bets/insert/`,
        undefined,
        HttpMethod.POST,
        bets
      );
      if(res.ko) {
        console.log("Errore nella creazione della scommessa");
        return;
      }
      dispatch(removeAllBets());
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      dispatch(addError(errorMessage));
      setLoadingCart(false);
      throw err; // Ensure the error is propagated
    }
  }

  return (
    <nav className="p-4 h-15 bg-custom-dark border-b border-gray-800 text-white sticky top-0 z-50 border-b border-black">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Betgram</h1>
        <div className="relative">
          <div className="indicator">
            <button
              ref={iconButtonRef}
              onClick={toggleCart}
              className="text-white text-2xl"
            >
              {bets.length > 0 && (
                <span className="indicator-item badge  bg-green-800 w-4 h-5">
                  {bets.length}
                </span>
              )}
              <ListBulletIcon className="w-6 h-6" />
            </button>
          </div>
          {isCartOpen && (
            <div
              ref={cartRef}
              className="absolute right-0 mt-2 w-120 bg-white text-black rounded shadow-lg p-4"
            >
              <h2 className="text-lg font-bold mb-2">Scommesse</h2>
              {bets.length === 0 ? (
                <p>Nessuna scommessa aggiunta.</p>
              ) : (
                <div className="flex flex-col h-full">
                  <ul
                    className="list rounded-box shadow-md divide-y divide-gray-200 overflow-y-auto flex-grow"
                    style={{ maxHeight: "350px" }} // Altezza massima per la lista scrollabile
                  >
                    {bets.map((bet, index) => (
                      <li key={index} className="flex items-center gap-4 py-3">
                        <div className="flex-shrink-0 ml-2">
                          <Trash
                            onClick={() => deleteBet(index)}
                            className="w-5 h-5 text-red-600 cursor-pointer mb-2"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="text-xs uppercase font-semibold font-bold flex items-center gap-2">
                            <img
                              src={bet.fixture.teams.home.logo}
                              alt={bet.fixture.teams.home.name}
                              className="w-4 h-4 object-contain"
                            />
                            {bet.fixture.teams.home.name} - {bet.fixture.teams.away.name}
                            <img
                              src={bet.fixture.teams.away.logo}
                              alt={bet.fixture.teams.away.name}
                              className="w-4 h-4 object-contain"
                            />
                          </div>
                          <div className="text-sm text-gray-800">{translate(bet.bet.name)}</div>
                          <div className="text-xs text-gray-600">
                            {formatDateTimeToTimezone(bet.fixture.fixture.date, timezone)}
                          </div>
                        </div>
                        <div className="text-right mr-2">
                          <div className="text-md font-bold">
                            {translate(bet.bet.values[0].value)}
                          </div>
                          <div className="text-sm text-gray-800">{bet.bet.values[0].odd}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="p-3 font-bold border-t pt-3 bg-white sticky bottom-0"
                    style={{ zIndex: 10 }} // Mantieni il summary sopra la lista scrollabile
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-grow">Puntata:</div>
                      <div className="flex flex-row items-center gap-2">
                        <span>{"€"}</span>
                        <input
                          type="text"
                          onChange={calculateSummary()}
                          className="input bg-white w-25 border border-gray-300 text-center"
                          maxLength={5}
                          value={summaryBet?.tipped}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-4">
                        <div className="flex-grow">Bonus:</div>
                        <div className="text-md uppercase font-semibold font-bold">
                          € {summaryBet?.bonus || "0.00"}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-grow">Totale:</div>
                        <div className="text-md uppercase font-semibold font-bold">
                          € {summaryBet?.total || "0.00"}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-grow"></div>
                        <div className="text-md uppercase font-semibold font-bold">
                          <button onClick={createBet} className="btn btn-primary btn-sm btn-success text-black">
                            SCOMMETTI ORA
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function removeAllBets(): any {
  throw new Error("Function not implemented.");
}
