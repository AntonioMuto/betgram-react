"use client";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/store/store";
import { ListBulletIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const bets = useSelector((state: RootState) => state.bets.bets);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav className="p-9 h-25 bg-custom-dark border-b border-gray-800 text-white sticky top-0 z-50 border-b border-black">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Betgram</h1>
        <div className="relative">
          <button onClick={toggleCart} className="text-white text-2xl">
            <ListBulletIcon className="w-6 h-6" />
          </button>
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg p-4">
              <h2 className="text-lg font-bold mb-2">Scommesse</h2>
              {bets.length === 0 ? (
                <p>Nessuna scommessa aggiunta.</p>
              ) : (
                <ul>
                  {bets.map((bet, index) => (
                    <li key={index} className="mb-2">
                      <p className="font-semibold">Fixture ID: {bet.fixture.id}</p>
                      <p>Bet: {bet.bet.name}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}