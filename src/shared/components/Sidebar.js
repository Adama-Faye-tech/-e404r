"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { APP_CONFIG, UPDATER_CONFIG } from "@/shared/constants/config";
import { MEDIA_PROVIDER_KINDS } from "@/shared/constants/providers";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import Button from "./Button";
import { ConfirmModal } from "./Modal";
import NineRemotePromoModal from "./NineRemotePromoModal";

// const VISIBLE_MEDIA_KINDS = ["embedding", "image", "imageToText", "tts", "stt", "webSearch", "webFetch", "video", "music"];
const VISIBLE_MEDIA_KINDS = ["embedding", "image", "video", "tts", "stt"];
// Combined entry: webSearch + webFetch share one page at /dashboard/media-providers/web
const COMBINED_WEB_ITEM = { id: "web", label: "Web Fetch & Search", icon: "travel_explore", href: "/dashboard/media-providers/web" };

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "space_dashboard" },
  { href: "/dashboard/endpoint", label: "Endpoint & Network", icon: "api" },
  { href: "/dashboard/providers", label: "Providers", icon: "dns" },
  { href: "/dashboard/combos", label: "Models & Combos", icon: "layers" },
  { href: "/dashboard/security", label: "Security", icon: "security" },
  { href: "/dashboard/usage", label: "Analytics", icon: "monitoring" },
  { href: "/dashboard/quota", label: "Quota Tracker", icon: "data_usage" },
  { href: "/dashboard/token-saver", label: "Token Saver", icon: "savings" },
  { href: "/dashboard/cli-tools", label: "CLI Tools", icon: "terminal" },
];

const debugItems = [
  { href: "/dashboard/console-log", label: "Console Log", icon: "terminal" },
  { href: "/dashboard/translator", label: "Translator", icon: "translate" },
];

const systemItems = [
  { href: "/dashboard/proxy-pools", label: "Proxy Pools", icon: "lan" },
  { href: "/dashboard/skills", label: "Skills", icon: "extension" },
];

export default function Sidebar({ onClose }) {
  const pathname = usePathname();
  const [mediaOpen, setMediaOpen] = useState(false);
  const [showRemoteModal, setShowRemoteModal] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [shutdownCountdown, setShutdownCountdown] = useState(0);
  const [enableTranslator, setEnableTranslator] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const { copied, copy } = useCopyToClipboard(2000);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => { if (data.enableTranslator) setEnableTranslator(true); })
      .catch(() => {});
      
    fetch("/api/auth/status", { cache: "no-store" })
      .then(res => res.json())
      .then(data => { setDisplayName(data?.displayName || data?.oidcName || data?.oidcEmail || ""); })
      .catch(() => {});
  }, []);

  // Lazy check for new npm version on mount
  useEffect(() => {
    fetch("/api/version")
      .then(res => res.json())
      .then(data => { if (data.hasUpdate) setUpdateInfo(data); })
      .catch(() => {});
  }, []);

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // Open manual update panel (no countdown yet — user must click Copy to trigger shutdown)
  const handleUpdate = () => {
    setShowUpdateModal(false);
    setIsUpdating(true);
  };

  // Triggered by Copy button inside ManualUpdatePanel: copy + countdown + shutdown
  const handleCopyAndShutdown = async () => {
    try { await navigator.clipboard.writeText(INSTALL_CMD); } catch { /* clipboard blocked */ }
    copy(INSTALL_CMD);
    let remaining = UPDATER_CONFIG.shutdownCountdownSec;
    setShutdownCountdown(remaining);
    const timer = setInterval(() => {
      remaining -= 1;
      setShutdownCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        fetch("/api/version/shutdown", { method: "POST" }).catch(() => {});
        setIsDisconnected(true);
      }
    }, 1000);
  };

  const handleCancelUpdate = () => {
    setIsUpdating(false);
    setShutdownCountdown(0);
  };

  // Note: legacy updater poll removed. New flow: copy install cmd + shutdown server,
  // user runs the command manually in another terminal.


  return (
    <>
      <aside className="flex w-64 flex-col bg-[#2b3c4e] text-white/80 transition-colors duration-300 min-h-full" translate="no">
        {/* User Profile Section — translate="no" prevents MS Translator from wrapping text in <font> tags */}
        <div className="px-6 py-8 flex flex-col gap-1 border-b border-white/10" translate="no" suppressHydrationWarning>
          <div className="text-white font-medium" suppressHydrationWarning>Hi, {displayName || "User"}</div>
          <div className="text-sm text-white/50 flex items-center gap-1 cursor-pointer hover:text-white transition-colors" suppressHydrationWarning>
            Super Admin <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-0 overflow-y-auto custom-scrollbar sidebar-nav-dark">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-4 px-6 py-3 transition-all group border-l-4",
                isActive(item.href)
                  ? "bg-[#00a8cc] text-white border-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-transparent"
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined text-[20px]",
                  isActive(item.href) ? "text-white" : "group-hover:text-white transition-colors"
                )}
              >
                {item.icon}
              </span>
              <span className="text-[14px] font-medium whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
          <div className="pt-3 mt-2">
            {/* Media Providers accordion */}
            <button
              onClick={() => setMediaOpen((v) => !v)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-3 transition-all group border-l-4",
                pathname.startsWith("/dashboard/media-providers")
                  ? "bg-[#00a8cc] text-white border-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-transparent"
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined text-[20px]",
                  pathname.startsWith("/dashboard/media-providers") ? "text-white" : "group-hover:text-white transition-colors"
                )}
              >
                perm_media
              </span>
              <span className="text-[14px] font-medium whitespace-nowrap">Media Providers</span>
              <span className="material-symbols-outlined ml-auto text-[18px] transition-transform duration-200" style={{ transform: mediaOpen ? "rotate(180deg)" : "" }}>
                expand_more
              </span>
            </button>
            {mediaOpen && (
              <div className="pl-4">
                {MEDIA_PROVIDER_KINDS.filter((k) => VISIBLE_MEDIA_KINDS.includes(k.id)).map((kind) => (
                  <Link
                  key={kind.id}
                  href={`/dashboard/media-providers/${kind.id}`}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 px-6 py-2 pl-14 transition-all group border-l-4",
                    pathname.startsWith(`/dashboard/media-providers/${kind.id}`)
                      ? "bg-[#00a8cc] text-white border-white"
                      : "text-white/60 hover:text-white border-transparent"
                  )}
                >
                  <span className="material-symbols-outlined text-[16px]">{kind.icon}</span>
                  <span className="text-xs font-medium whitespace-nowrap">{kind.label}</span>
                </Link>
                ))}
                <Link
                  key={COMBINED_WEB_ITEM.id}
                  href={COMBINED_WEB_ITEM.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 px-6 py-2 pl-14 transition-all group border-l-4",
                    pathname.startsWith(COMBINED_WEB_ITEM.href)
                      ? "bg-[#00a8cc] text-white border-white"
                      : "text-white/60 hover:text-white border-transparent"
                  )}
                >
                  <span className="material-symbols-outlined text-[16px]">{COMBINED_WEB_ITEM.icon}</span>
                  <span className="text-xs font-medium whitespace-nowrap">{COMBINED_WEB_ITEM.label}</span>
                </Link>
              </div>
            )}

            {systemItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-6 py-3 transition-all group border-l-4",
                  isActive(item.href)
                    ? "bg-[#00a8cc] text-white border-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white border-transparent"
                )}
              >
                <span
                  className={cn(
                    "material-symbols-outlined text-[20px]",
                    isActive(item.href) ? "text-white" : "group-hover:text-white transition-colors"
                  )}
                >
                  {item.icon}
                </span>
                <span className="text-[14px] font-medium whitespace-nowrap">{item.label}</span>
              </Link>
            ))}

            {/* Debug items (inside System section, before Settings) */}
            {debugItems.map((item) => {
              const show = item.href !== "/dashboard/translator" || enableTranslator;
              return show ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-1 rounded-lg transition-all group",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:bg-surface-2 hover:text-text-main"
                  )}
                >
                  <span
                    className={cn(
                      "material-symbols-outlined text-[18px]",
                      isActive(item.href) ? "fill-1" : "group-hover:text-primary transition-colors"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13px] font-medium">{item.label}</span>
                </Link>
              ) : null;
            })}

            {/* Remote */}
            <button
              onClick={() => setShowRemoteModal(true)}
              className={cn(
                "flex items-center gap-4 px-6 py-3 transition-all group border-l-4 w-full",
                "text-white/70 hover:bg-white/5 hover:text-white border-transparent"
              )}
            >
              <span className="material-symbols-outlined text-[20px] group-hover:text-white transition-colors">
                computer
              </span>
              <span className="text-[14px] font-medium">Remote</span>
            </button>

            {/* Settings */}
            <Link
              href="/dashboard/profile"
              onClick={onClose}
              className={cn(
                "flex items-center gap-4 px-6 py-3 transition-all group border-l-4",
                isActive("/dashboard/profile")
                  ? "bg-[#00a8cc] text-white border-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-transparent"
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined text-[20px]",
                  isActive("/dashboard/profile") ? "text-white" : "group-hover:text-white transition-colors"
                )}
              >
                settings
              </span>
              <span className="text-[14px] font-medium">Settings</span>
            </Link>
          </div>
        </nav>

      </aside>

      {/* Remote Promo Modal */}
      <NineRemotePromoModal isOpen={showRemoteModal} onClose={() => setShowRemoteModal(false)} />

      {/* Update Confirmation Modal */}
      <ConfirmModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onConfirm={handleUpdate}
        title="Update E404R"
        message={`Show install command for v${updateInfo?.latestVersion || ""}? You can copy it and shutdown to install manually.`}
        confirmText="Show Command"
        cancelText="Cancel"
        variant="primary"
      />

      {/* Disconnected / Updating Overlay */}
      {(isDisconnected || isUpdating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          {isUpdating ? (
            <ManualUpdatePanel
              latestVersion={updateInfo?.latestVersion}
              installCmd={INSTALL_CMD}
              copied={copied}
              onCopyAndShutdown={handleCopyAndShutdown}
              onCancel={handleCancelUpdate}
              countdown={shutdownCountdown}
              isDisconnected={isDisconnected}
            />
          ) : (
            <div className="text-center p-8">
              <div className="flex items-center justify-center size-16 rounded-full bg-red-500/20 text-red-500 mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px]">power_off</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Server Disconnected</h2>
              <p className="text-text-muted mb-6">The proxy server has been stopped.</p>
              <Button variant="secondary" onClick={() => globalThis.location.reload()}>
                Reload Page
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
};

function ManualUpdatePanel({ latestVersion, installCmd, copied, onCopyAndShutdown, onCancel, countdown, isDisconnected }) {
  const isCountingDown = countdown > 0;
  return (
    <div className="w-full max-w-lg rounded-xl bg-neutral-900/95 border border-white/10 p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center size-11 rounded-full bg-amber-500/20 text-amber-400">
          <span className="material-symbols-outlined text-[24px]">content_copy</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Update E404R{latestVersion ? ` to v${latestVersion}` : ""}</h2>
          <p className="text-xs text-white/60">
            {isDisconnected
              ? "Server stopped. Paste the command into a terminal to install."
              : isCountingDown
                ? `Command copied. Server will stop in ${countdown}s...`
                : "Click the button below to copy the install command and shutdown."}
          </p>
        </div>
      </div>

      <p className="text-sm text-white/80 mb-2">Install command:</p>
      <div className="w-full px-3 py-2 rounded bg-white/5 mb-4">
        <code className="text-xs font-mono text-amber-400 break-all">{installCmd}</code>
      </div>

      <ol className="text-xs text-white/70 space-y-1 list-decimal list-inside mb-4">
        <li>Click <strong>Copy & Shutdown</strong> below.</li>
        <li>Paste the command into your terminal and press Enter.</li>
        <li>Run <code className="px-1 rounded bg-white/10 text-green-400">e404r</code> again after install.</li>
      </ol>

      {isDisconnected ? (
        <Button variant="secondary" fullWidth onClick={() => globalThis.location.reload()}>
          Reload Page
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={isCountingDown}>
            Cancel
          </Button>
          <Button variant="primary" fullWidth onClick={onCopyAndShutdown} disabled={isCountingDown}>
            {copied ? "✓ Copied — shutting down..." : isCountingDown ? `Shutting down in ${countdown}s` : "Copy & Shutdown"}
          </Button>
        </div>
      )}
    </div>
  );
}

ManualUpdatePanel.propTypes = {
  latestVersion: PropTypes.string,
  installCmd: PropTypes.string.isRequired,
  copied: PropTypes.bool,
  onCopyAndShutdown: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  countdown: PropTypes.number,
  isDisconnected: PropTypes.bool,
};
