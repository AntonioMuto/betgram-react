import Image from "next/image";
import Results from "./results/results";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto p-6">
      <Results />
    </section>
  )
}
