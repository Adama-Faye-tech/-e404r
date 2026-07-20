"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, subIcon, accent = "#00a8cc", subPositive = true }) {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent, opacity: 0.85 }}>
        {label}
      </div>
      <div
        className="text-3xl font-bold font-mono tracking-tight"
        style={{ color: accent }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: subPositive ? "#16a34a" : "#dc2626" }}
        >
          {subIcon && (
            <span className="material-symbols-outlined text-[14px] shrink-0">
              {subIcon}
            </span>
          )}
          <span className="leading-tight">{sub}</span>
        </div>
      )}
    </div>
  );
}

// ─── Quick Action ─────────────────────────────────────────────────────────────
function QuickAction({ href, icon, title, desc, accent = "#00a8cc" }) {
  return (
    <Link href={href}>
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-4 flex items-center gap-4 cursor-pointer hover:border-[#00a8cc]/40 hover:shadow-md transition-all group">
        <div
          className="p-3 rounded-lg shrink-0 transition-colors"
          style={{ background: `${accent}18` }}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ color: accent }}
          >
            {icon}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-[#1e293b] text-sm">{title}</div>
          <div className="text-xs text-[#64748b] mt-0.5 leading-snug">{desc}</div>
        </div>
        <span className="material-symbols-outlined text-[#94a3b8] group-hover:text-[#00a8cc] transition-colors shrink-0 text-[20px]">
          chevron_right
        </span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OverviewPageClient() {
  const [metrics, setMetrics] = useState({
    totalRequests: 0,
    activeProviders: 0,
    cacheHitRate: "0%",
    totalCost: "$0.00",
  });
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setMetrics({
        totalRequests: 14205,
        activeProviders: 12,
        cacheHitRate: "42.8%",
        totalCost: "$14.20",
      });
      setIsOnline(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#1e293b]">E404R — System Overview</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Engine 404 Router — All systems nominal.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
              isOnline
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-slate-300 bg-slate-50 text-slate-500"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isOnline ? "bg-green-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            {isOnline ? "Router Online" : "Connecting…"}
          </div>
          {/* CTA */}
          <Link href="/dashboard/endpoint">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#00a8cc] hover:bg-[#0090b0] text-white rounded-lg transition-colors text-sm font-semibold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">api</span>
              Connect Client
            </button>
          </Link>
        </div>
      </div>

      {/* ── Metric Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard
          label="Total Requests (24h)"
          value={metrics.totalRequests.toLocaleString()}
          sub="+12% vs yesterday"
          subIcon="trending_up"
          accent="#00a8cc"
          subPositive={true}
        />
        <StatCard
          label="Active Providers"
          value={metrics.activeProviders}
          sub="Out of 104 available"
          accent="#6366f1"
          subPositive={true}
        />
        <StatCard
          label="Cache Hit Rate"
          value={metrics.cacheHitRate}
          sub="High efficiency mode"
          subIcon="bolt"
          accent="#a855f7"
          subPositive={true}
        />
        <StatCard
          label="Total Cost (24h)"
          value={metrics.totalCost}
          sub="-$5.40 saved via Smart Router"
          subIcon="savings"
          accent="#f59e0b"
          subPositive={true}
        />
      </div>

      {/* ── Quick Actions ────────────────────────────────────────────── */}
      <div>
        <h3 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <QuickAction
            href="/dashboard/providers"
            icon="dns"
            title="Configure Providers"
            desc="Add API keys, local models and OAuth accounts"
            accent="#00a8cc"
          />
          <QuickAction
            href="/dashboard/security"
            icon="security"
            title="Security Center"
            desc="View audit logs and manage API access"
            accent="#22c55e"
          />
          <QuickAction
            href="/dashboard/combos"
            icon="layers"
            title="Models & Combos"
            desc="Build routing combos with automatic fallback"
            accent="#6366f1"
          />
          <QuickAction
            href="/dashboard/usage"
            icon="monitoring"
            title="Usage & Analytics"
            desc="Monitor token consumption and costs over time"
            accent="#f59e0b"
          />
        </div>
      </div>

      {/* ── Live Traffic Banner ──────────────────────────────────────── */}
      <div className="rounded-xl border border-[#e2e8f0] bg-gradient-to-r from-[#00a8cc]/5 to-[#6366f1]/5 p-5 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="w-11 h-11 rounded-full bg-[#00a8cc]/10 flex items-center justify-center shrink-0 border border-[#00a8cc]/20">
          <span className="material-symbols-outlined text-[#00a8cc] text-xl">query_stats</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[#1e293b]">Live Traffic Analytics</h3>
          <p className="text-xs text-[#64748b] mt-0.5">
            Smart Router is actively balancing traffic across providers. Open Analytics to view real-time charts.
          </p>
        </div>
        <Link href="/dashboard/usage" className="shrink-0">
          <button className="text-sm font-semibold text-white bg-[#00a8cc] hover:bg-[#0090b0] px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm">
            View Analytics
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </Link>
      </div>

    </div>
  );
}
