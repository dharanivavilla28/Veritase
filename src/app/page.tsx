import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import DashboardOverviewPage from "@/app/dashboard/page"; // Reusing the overview component

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />

      {/* Live Demo Section */}
      <section className="container mx-auto px-4 py-12 border-b border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">See It In Action</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Veritas Bridge analyzes reports in real-time. Here is a live preview of a factory verification result.
          </p>
        </div>
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
          {/* We render the dashboard overview here as a "Preview" */}
          <div className="pointer-events-none select-none opacity-90 scale-[0.98] transform transition-transform group-hover:scale-100 group-hover:opacity-100">
            <DashboardOverviewPage />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
              Live Dashboard Preview
            </span>
          </div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <CTA />

      <footer className="py-8 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="mb-2">© 2024 Veritas Bridge. Built for Hult Prize.</p>
          <div className="flex justify-center gap-4 text-xs text-slate-600">
            <span>ILO API</span> • <span>EPFO Data</span> • <span>UN Comtrade</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
