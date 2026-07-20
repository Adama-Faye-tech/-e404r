"use client";

import { useState, useEffect } from "react";
import { Card } from "@/shared/components";

export default function SecurityPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fake logs for demonstration of the new UI
  useEffect(() => {
    setTimeout(() => {
      setLogs([
        { id: 1, action: "API Key Generated", user: "admin", ip: "192.168.1.42", time: "2 mins ago", status: "success" },
        { id: 2, action: "Failed Login Attempt", user: "unknown", ip: "103.45.12.9", time: "15 mins ago", status: "danger" },
        { id: 3, action: "Model Policy Updated", user: "dev_team", ip: "192.168.1.105", time: "1 hour ago", status: "success" },
        { id: 4, action: "Rate Limit Exceeded", user: "api_client_7", ip: "45.22.19.88", time: "3 hours ago", status: "warning" },
        { id: 5, action: "Provider Config Changed", user: "admin", ip: "192.168.1.42", time: "1 day ago", status: "success" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#00D4FF] flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl">security</span>
            E404R Security Center
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Manage roles, API keys encryption, rate limits, and view audit logs.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.05)]">
          <span className="status-dot-online w-2 h-2" />
          <span className="text-[#00FF88] text-xs font-mono font-bold">SECURITY MODE: ACTIVE</span>
        </div>
      </div>

      {/* Grid of config cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-cyber p-5 hover:border-[#00D4FF] transition-colors cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="text-[#00D4FF] bg-[rgba(0,212,255,0.1)] p-2 rounded-lg">
              <span className="material-symbols-outlined">key</span>
            </div>
          </div>
          <h3 className="mt-4 font-semibold text-lg">API Keys Encryption</h3>
          <p className="text-xs text-text-muted mt-2">AES-256-GCM encryption is active for all provider credentials at rest.</p>
        </Card>

        <Card className="card-cyber p-5 hover:border-[#00D4FF] transition-colors cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="text-[#9b59f5] bg-[rgba(155,89,245,0.1)] p-2 rounded-lg">
              <span className="material-symbols-outlined">group_remove</span>
            </div>
          </div>
          <h3 className="mt-4 font-semibold text-lg">RBAC & Roles</h3>
          <p className="text-xs text-text-muted mt-2">3 active roles (Admin, Developer, User). Strict isolation enforced.</p>
        </Card>

        <Card className="card-cyber p-5 hover:border-[#00FF88] transition-colors cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="text-[#00FF88] bg-[rgba(0,255,136,0.1)] p-2 rounded-lg">
              <span className="material-symbols-outlined">speed</span>
            </div>
          </div>
          <h3 className="mt-4 font-semibold text-lg">Rate Limiting</h3>
          <p className="text-xs text-text-muted mt-2">Global limit: 1000 req/min. Adaptive DDOS protection is enabled.</p>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card className="card-cyber mt-8 border-[rgba(0,212,255,0.15)]">
        <div className="p-4 border-b border-[rgba(0,212,255,0.1)] flex justify-between items-center bg-[rgba(0,0,0,0.2)]">
          <h3 className="font-semibold text-[15px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#00D4FF]">list_alt</span>
            Recent Audit Logs
          </h3>
          <button className="text-xs text-[#00D4FF] hover:underline font-mono">EXPORT CSV</button>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-[rgba(0,212,255,0.02)] text-text-muted font-mono">
              <tr>
                <th className="px-6 py-3 font-medium">Event</th>
                <th className="px-6 py-3 font-medium">User / Identity</th>
                <th className="px-6 py-3 font-medium">IP Address</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(0,212,255,0.05)]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-text-muted">
                    <span className="material-symbols-outlined animate-spin text-[#00D4FF] text-2xl">sync</span>
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[rgba(0,212,255,0.02)] transition-colors">
                    <td className="px-6 py-3 font-medium text-text-main">{log.action}</td>
                    <td className="px-6 py-3 font-mono text-xs">{log.user}</td>
                    <td className="px-6 py-3 font-mono text-xs text-text-muted">{log.ip}</td>
                    <td className="px-6 py-3 text-xs">{log.time}</td>
                    <td className="px-6 py-3 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        log.status === "success" ? "bg-[rgba(0,255,136,0.1)] text-[#00FF88] border border-[rgba(0,255,136,0.2)]" :
                        log.status === "danger"  ? "bg-[rgba(255,77,77,0.1)] text-[#ff4d4d] border border-[rgba(255,77,77,0.2)]" :
                        "bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border border-[rgba(245,158,11,0.2)]"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
