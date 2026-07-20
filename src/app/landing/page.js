"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ─── Mini stat card ─── */
function StatCard({ value, label, color = "blue" }) {
  const colors = {
    blue:  "border-[rgba(0,212,255,0.3)] text-[#00D4FF]",
    green: "border-[rgba(0,255,136,0.3)] text-[#00FF88]",
    purple:"border-[rgba(155,89,245,0.3)] text-[#9b59f5]",
  };
  return (
    <div className={`card-cyber px-5 py-4 text-center border ${colors[color]}`}>
      <div className={`text-2xl font-bold font-mono ${colors[color].split(" ")[1]}`}>{value}</div>
      <div className="text-xs text-[#7aa0c0] mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ─── Provider badge ─── */
function ProviderBadge({ name, color }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border"
      style={{ borderColor: `${color}40`, color, background: `${color}10` }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: color }} />
      {name}
    </span>
  );
}

/* ─── Feature card ─── */
function FeatureCard({ icon, title, desc, accent = "#00D4FF" }) {
  return (
    <div
      className="card-cyber p-6 group hover:scale-[1.02] transition-transform duration-300 cursor-default"
      style={{ borderColor: `${accent}20` }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
        style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-sm text-[#e0f0ff] mb-2" style={{ color: accent }}>{title}</h3>
      <p className="text-xs text-[#7aa0c0] leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Architecture flow diagram ─── */
function ArchDiagram() {
  const clients = ["Claude Code", "Cursor", "Codex", "Cline", "OpenCode"];
  const providers = [
    { name: "OpenAI",    color: "#10a37f" },
    { name: "Anthropic", color: "#d4a574" },
    { name: "Gemini",    color: "#4285f4" },
    { name: "DeepSeek",  color: "#00D4FF" },
    { name: "Ollama",    color: "#00FF88" },
    { name: "Mistral",   color: "#9b59f5" },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      {/* Clients col */}
      <div className="flex flex-col gap-2 absolute left-0 top-1/2 -translate-y-1/2 w-28">
        {clients.map((c) => (
          <div
            key={c}
            className="px-2 py-1.5 rounded text-[10px] font-mono text-[#7aa0c0] border border-[rgba(0,212,255,0.1)] bg-[rgba(0,212,255,0.04)] text-center"
          >
            {c}
          </div>
        ))}
      </div>

      {/* Lines left → center */}
      <svg className="absolute left-28 top-0 h-full" width="80" style={{ overflow: "visible" }}>
        {clients.map((_, i) => {
          const y = 16 + i * 34;
          return (
            <line
              key={i}
              x1="0" y1={y} x2="80" y2="50%"
              stroke="rgba(0,212,255,0.25)" strokeWidth="1"
              strokeDasharray="4 3"
            />
          );
        })}
      </svg>

      {/* Center — E404R Gateway */}
      <div className="flex flex-col items-center justify-center mx-auto w-40 py-6 text-center topology-router-core rounded-xl border-2 relative z-10">
        <div className="topology-router-icon text-2xl mb-1">⬡</div>
        <div className="topology-router-label font-mono font-bold text-sm text-[#00D4FF]">E404R</div>
        <div className="text-[9px] text-[#00FF88] mt-0.5 tracking-wider">GATEWAY</div>
      </div>

      {/* Lines center → right */}
      <svg className="absolute right-28 top-0 h-full" width="80" style={{ overflow: "visible", transform: "scaleX(-1)" }}>
        {providers.map((_, i) => {
          const y = 16 + i * 28;
          return (
            <line
              key={i}
              x1="0" y1={y} x2="80" y2="50%"
              stroke="rgba(0,255,136,0.2)" strokeWidth="1"
              strokeDasharray="4 3"
            />
          );
        })}
      </svg>

      {/* Providers col */}
      <div className="flex flex-col gap-2 absolute right-0 top-1/2 -translate-y-1/2 w-28">
        {providers.map((p) => (
          <div
            key={p.name}
            className="px-2 py-1.5 rounded text-[10px] font-mono text-center"
            style={{
              borderColor: `${p.color}40`,
              background: `${p.color}10`,
              color: p.color,
              border: `1px solid ${p.color}40`,
            }}
          >
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();

  const features = [
    { icon: "⚡", title: "Smart AI Router",    accent: "#00D4FF", desc: "Automatically selects the best model based on task type, cost, speed, and quality." },
    { icon: "🔐", title: "Security Layer",      accent: "#9b59f5", desc: "JWT auth, encrypted API keys, role-based access, audit logs, and rate limiting." },
    { icon: "📊", title: "Full Observability",  accent: "#00FF88", desc: "Real-time dashboards, token usage tracking, cost analytics, and provider health." },
    { icon: "🌐", title: "100+ Providers",      accent: "#00D4FF", desc: "OpenAI, Anthropic, Gemini, DeepSeek, Ollama, Mistral, and 95 more out of the box." },
    { icon: "💰", title: "Cost Optimizer",      accent: "#00FF88", desc: "Intelligent routing minimizes spend by choosing the cheapest model for each task." },
    { icon: "🔌", title: "OpenAI Compatible",   accent: "#9b59f5", desc: "Drop-in replacement API: just change your base_url. Works with any OpenAI SDK." },
  ];

  const providers = [
    { name: "OpenAI",    color: "#10a37f" },
    { name: "Claude",    color: "#d4a574" },
    { name: "Gemini",    color: "#4285f4" },
    { name: "DeepSeek",  color: "#00D4FF" },
    { name: "Ollama",    color: "#00FF88" },
    { name: "Mistral",   color: "#9b59f5" },
    { name: "Llama",     color: "#ff6b35" },
    { name: "Qwen",      color: "#6dd5ed" },
    { name: "Grok",      color: "#ff4d4d" },
    { name: "Groq",      color: "#f0c040" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden antialiased" style={{ background: "#050d1a", color: "#e0f0ff" }}>

      {/* ── Animated background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyber grid */}
        <div className="absolute inset-0 e404r-grid" />
        {/* Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00D4FF, transparent 70%)", animation: "blob 20s ease-in-out infinite" }} />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00FF88, transparent 70%)", animation: "blob 24s ease-in-out infinite 3s" }} />
        <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] rounded-full opacity-[0.05] blur-[120px]"
          style={{ background: "radial-gradient(circle, #9b59f5, transparent 70%)", animation: "blob 22s ease-in-out infinite 6s" }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,13,26,0.6) 100%)" }} />
      </div>

      <div className="relative z-10">

        {/* ══════════════════════ NAVBAR ══════════════════════ */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(0,212,255,0.08)]"
          style={{ background: "rgba(5,13,26,0.85)", backdropFilter: "blur(20px)" }}>
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo-e404r.svg" alt="E404R" className="w-8 h-8" />
              <span className="font-mono font-bold text-lg text-[#00D4FF]" style={{ textShadow: "0 0 20px rgba(0,212,255,0.5)" }}>
                E404R
              </span>
              <span className="text-[10px] text-[#7aa0c0] border border-[rgba(0,212,255,0.2)] rounded px-1.5 py-0.5 font-mono">
                v1.0
              </span>
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-6 text-sm text-[#7aa0c0]">
              <a href="#features" className="hover:text-[#00D4FF] transition-colors">Features</a>
              <a href="#providers" className="hover:text-[#00D4FF] transition-colors">Providers</a>
              <a href="https://github.com" target="_blank" className="hover:text-[#00D4FF] transition-colors">GitHub</a>
              <a href="/docs" className="hover:text-[#00D4FF] transition-colors">Docs</a>
            </div>

            {/* CTA */}
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-cta px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0090CC)", color: "#050d1a" }}
            >
              Open Dashboard →
            </button>
          </div>
        </nav>

        {/* ══════════════════════ HERO ══════════════════════ */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)] text-[#00D4FF] text-xs font-mono mb-8">
              <span className="status-dot-online w-1.5 h-1.5" />
              Engine 404 Router · AI Gateway · v1.0.0
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05]">
              <span style={{ color: "#e0f0ff" }}>One Gateway.</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 60%, #9b59f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(0,212,255,0.3))"
                }}
              >
                Infinite Intelligence.
              </span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-[#7aa0c0] max-w-2xl mx-auto mb-10 leading-relaxed">
              E404R is your intelligent AI Infrastructure layer — connect any client to any AI provider
              with automatic routing, cost optimization, security, and full observability.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-cta w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #0090CC)", color: "#050d1a" }}
                id="hero-launch-btn"
              >
                🚀 Launch Dashboard
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold border border-[rgba(0,212,255,0.25)] text-[#00D4FF] hover:bg-[rgba(0,212,255,0.05)] transition-colors"
                id="hero-docs-btn"
              >
                📖 Read the Docs
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-20">
              <StatCard value="100+" label="Providers"      color="blue"   />
              <StatCard value="∞"    label="Models"         color="green"  />
              <StatCard value="< 10ms" label="Overhead"     color="purple" />
              <StatCard value="OpenAI" label="Compatible"   color="blue"   />
            </div>
          </div>

          {/* Architecture diagram */}
          <div className="max-w-3xl mx-auto h-52 relative">
            <ArchDiagram />
          </div>
        </section>

        {/* ══════════════════════ PROVIDERS ══════════════════════ */}
        <section id="providers" className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs text-[#7aa0c0] uppercase tracking-widest mb-6 font-mono">Connected AI Providers</p>
            <div className="flex flex-wrap justify-center gap-2">
              {providers.map((p) => (
                <ProviderBadge key={p.name} name={p.name} color={p.color} />
              ))}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono text-[#4a6880] border border-[rgba(0,212,255,0.08)]">
                +90 more
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════ FEATURES ══════════════════════ */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs text-[#00FF88] font-mono tracking-widest uppercase mb-3">Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#e0f0ff]">
                Built for AI Infrastructure
              </h2>
              <p className="text-[#7aa0c0] mt-3 max-w-xl mx-auto text-sm">
                Everything you need to build, scale, and secure AI-powered applications.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ CODE SNIPPET ══════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs text-[#00D4FF] font-mono tracking-widest uppercase mb-3">Quick Start</p>
            <h2 className="text-2xl font-black text-[#e0f0ff] mb-8">Drop-in OpenAI replacement</h2>
            <div className="card-cyber text-left p-6 font-mono text-sm">
              <div className="text-[#4a6880] mb-3 text-xs">// Before (OpenAI direct)</div>
              <div className="text-[#ff4d4d] mb-4">
                <span className="text-[#7aa0c0]">base_url</span> = <span className="text-[#ff6b6b]">"https://api.openai.com"</span>
              </div>
              <div className="text-[#4a6880] mb-3 text-xs">// After (via E404R — same code, all models)</div>
              <div className="text-[#00FF88]">
                <span className="text-[#7aa0c0]">base_url</span> = <span className="text-[#00FF88]">"http://localhost:20128"</span>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(0,212,255,0.1)] text-[#4a6880] text-xs">
                # That's it. E404R handles the rest. ✓
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to top, rgba(0,212,255,0.04), transparent)"
          }} />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span style={{
                background: "linear-gradient(135deg, #00D4FF, #00FF88)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Ready to deploy?
              </span>
            </h2>
            <p className="text-[#7aa0c0] mb-10 text-base">
              E404R is free and open source. Run it locally or deploy on your infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-cta w-full sm:w-auto px-10 py-4 rounded-xl text-base font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #0090CC)", color: "#050d1a" }}
                id="cta-launch-btn"
              >
                Launch E404R
              </button>
              <button
                onClick={() => window.open("https://github.com", "_blank")}
                className="w-full sm:w-auto px-10 py-4 rounded-xl text-base font-bold border border-[rgba(0,212,255,0.2)] text-[#7aa0c0] hover:text-[#00D4FF] hover:border-[rgba(0,212,255,0.4)] transition-all"
                id="cta-github-btn"
              >
                ⭐ Star on GitHub
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════ FOOTER ══════════════════════ */}
        <footer className="border-t border-[rgba(0,212,255,0.08)] py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4a6880]">
            <div className="flex items-center gap-2 font-mono">
              <img src="/logo-e404r.svg" alt="E404R" className="w-5 h-5 opacity-60" />
              <span>E404R — Engine 404 Router</span>
            </div>
            <span>"One Gateway. Infinite Intelligence."</span>
            <span>Built on E404R Open Source</span>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -50px) scale(1.1); }
          66%       { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
