"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, subIcon, accent = "#00a8cc" }) {
  return (
    <div
      className="rounded-xl border border-[#e2e8f0] bg-white p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow min-w-0"
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <div className="text-xs font-semibold uppercase tracking-widest text-[#64748b]">
        {label}
      </div>
      <div
        className="text-3xl font-bold font-mono tracking-tight truncate"
        style={{ color: accent }}
      >
        {value}
      </div>
      {sub && (
        <div className="flex items-center gap-1 text-xs text-[#22c55e] font-medium truncate">
          {subIcon && (
            <span className="material-symbols-outlined text-[14px] shrink-0">
              {subIcon}
            </span>
          )}
          <span className="truncate">{sub}</span>
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
          <div className="text-xs text-[#64748b] truncate">{desc}</div>
        </div>
        <span className="material-symbols-outlined text-[#94a3b8] group-hover:text-[#00a8cc] transition-colors shrink-0">
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
    <div className="flex flex-col gap-6 w-full min-w-0">

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#1e293b]">E404R — System Overview</h2>
          <p className="text-sm text-[#64748b]">Engine 404 Router — All systems nominal.</p>
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
        />
        <StatCard
          label="Active Providers"
          value={metrics.activeProviders}
          sub="Out of 104 available"
          accent="#6366f1"
        />
        <StatCard
          label="Cache Hit Rate"
          value={metrics.cacheHitRate}
          sub="High efficiency mode"
          subIcon="bolt"
          accent="#a855f7"
        />
        <StatCard
          label="Total Cost (24h)"
          value={metrics.totalCost}
          sub="-$5.40 via Smart Router"
          subIcon="savings"
          accent="#f59e0b"
        />
      </div>

      {/* ── Quick Actions ────────────────────────────────────────────── */}
      <div>
        <h3 className="text-sm font-semibold text-[#64748b] uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <QuickAction
            href="/dashboard/providers"
            icon="dns"
            title="Configure Providers"
            desc="Add API keys or local models"
            accent="#00a8cc"
          />
          <QuickAction
            href="/dashboard/security"
            icon="security"
            title="Security Center"
            desc="View logs and manage access"
            accent="#22c55e"
          />
          <QuickAction
            href="/dashboard/combos"
            icon="layers"
            title="Models & Combos"
            desc="Set up routing combos with fallback"
            accent="#6366f1"
          />
          <QuickAction
            href="/dashboard/usage"
            icon="monitoring"
            title="Usage & Analytics"
            desc="Monitor token consumption and cost"
            accent="#f59e0b"
          />
        </div>
      </div>

      {/* ── Live Traffic placeholder (compact) ──────────────────────── */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 flex items-center gap-5 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#00a8cc]/10 flex items-center justify-center shrink-0 border border-[#00a8cc]/20">
          <span className="material-symbols-outlined text-[#00a8cc] text-2xl">query_stats</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[#1e293b]">Live Traffic Analytics</h3>
          <p className="text-sm text-[#64748b]">
            Smart Router is actively balancing traffic across providers. Real-time charts appear here during active sessions.
          </p>
        </div>
        <Link href="/dashboard/usage" className="ml-auto shrink-0">
          <button className="text-sm font-semibold text-[#00a8cc] hover:text-[#0090b0] flex items-center gap-1 transition-colors whitespace-nowrap">
            View Analytics
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </Link>
      </div>

    </div>
  );
}
