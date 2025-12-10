import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Destinations from "@/components/home/Destinations";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Destinations />
      <Footer />
    </main>
  );
}
