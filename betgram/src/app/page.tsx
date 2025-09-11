import Image from "next/image";
import Results from "./results/results";
import { Main } from "next/document";
import MainPage from "./results/mainPage";

export default function Home() {
  return (
    <section className="mx-8 p-6">
      <MainPage />
    </section>
  )
}
