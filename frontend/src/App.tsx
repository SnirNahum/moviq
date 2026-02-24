import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrendingNow } from "./components/TrendingNow";

export default function App() {
  return (
    <main>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        <Hero />
        <TrendingNow />
      </div>
    </main>
  );
}
