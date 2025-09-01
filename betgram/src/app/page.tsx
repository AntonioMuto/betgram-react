import Image from "next/image";
import Results from "./results/results";
import { Main } from "next/document";
import MainPage from "./results/mainPage";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto p-6">
      <MainPage />
    </section>
  )
}
