"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { OAUTH_PROVIDERS, APIKEY_PROVIDERS } from "@/shared/constants/config";
import { MEDIA_PROVIDER_KINDS, AI_PROVIDERS } from "@/shared/constants/providers";
import { getProviderIconSrc } from "@/shared/utils/providerIcon";
import { translate } from "@/i18n/runtime";

export const getPageInfo = (pathname) => {
  if (!pathname) return { title: "", description: "", breadcrumbs: [] };

  const mediaDetailMatch = pathname.match(/\/media-providers\/([^/]+)\/([^/]+)$/);
  if (mediaDetailMatch) {
    const kindId = mediaDetailMatch[1];
    const providerId = mediaDetailMatch[2];
    const kindConfig = MEDIA_PROVIDER_KINDS.find((k) => k.id === kindId);
    const provider = AI_PROVIDERS[providerId];
    return {
      title: provider?.name || providerId,
      description: "",
      breadcrumbs: [
        { label: "Media Providers", href: `/dashboard/media-providers/${kindId}` },
        { label: kindConfig?.label || kindId, href: `/dashboard/media-providers/${kindId}` },
        { label: provider?.name || providerId, image: getProviderIconSrc(providerId) },
      ],
    };
  }

  const mediaKindMatch = pathname.match(/\/media-providers\/([^/]+)$/);
  if (mediaKindMatch) {
    const kindId = mediaKindMatch[1];
    const kindConfig = MEDIA_PROVIDER_KINDS.find((k) => k.id === kindId);
    return { title: kindConfig?.label || kindId, description: `Manage your ${kindConfig?.label || kindId} providers`, breadcrumbs: [] };
  }

  const providerMatch = pathname.match(/\/providers\/([^/]+)$/);
  if (providerMatch) {
    const providerId = providerMatch[1];
    const providerInfo = OAUTH_PROVIDERS[providerId] || APIKEY_PROVIDERS[providerId];
    if (providerInfo) {
      return {
        title: providerInfo.name,
        description: "",
        breadcrumbs: [
          { label: "Providers", href: "/dashboard/providers" },
          { label: providerInfo.name, image: getProviderIconSrc(providerInfo.id) },
        ],
      };
    }
  }

  if (pathname.includes("/providers") && !pathname.includes("/media-providers"))
    return { title: "Providers", description: "Manage your AI provider connections", breadcrumbs: [] };
  if (pathname.includes("/combos"))
    return { title: "Combos", description: "Model combos with fallback", breadcrumbs: [] };
  if (pathname.includes("/usage"))
    return { title: "Usage & Analytics", description: "Monitor your API usage, token consumption, and request logs", breadcrumbs: [] };
  if (pathname.includes("/auth-files"))
    return { title: "Auth Files", description: "Map provider credentials stored in the local database", breadcrumbs: [] };
  if (pathname.includes("/quota"))
    return { title: "Quota Tracker", description: "Track and manage your API quota limits", breadcrumbs: [] };
  if (pathname.includes("/mitm"))
    return { title: "MITM Proxy", description: "Intercept CLI tool traffic and route through E404R", breadcrumbs: [] };
  if (pathname.includes("/token-saver"))
    return { title: "Token Saver", description: "Compress prompts and outputs to save tokens", breadcrumbs: [] };
  if (pathname.includes("/cli-tools"))
    return { title: "CLI Tools", description: "Configure CLI tools", breadcrumbs: [] };
  if (pathname.includes("/proxy-pools"))
    return { title: "Proxy Pools", description: "Manage your proxy pool configurations", breadcrumbs: [] };
  if (pathname.includes("/skills"))
    return { title: "Agent Skills", description: "Copy a link and paste to your AI to use E404R — no install needed", breadcrumbs: [] };
  if (pathname.includes("/endpoint"))
    return { title: "Endpoint", description: "API endpoint configuration", breadcrumbs: [] };
  if (pathname.includes("/profile"))
    return { title: "Settings", description: "Manage your preferences", breadcrumbs: [] };
  if (pathname.includes("/translator"))
    return { title: "Translator", description: "Debug translation flow between formats", breadcrumbs: [] };
  if (pathname.includes("/console-log"))
    return { title: "Console Log", description: "Live server console output", breadcrumbs: [] };
  if (pathname.includes("/security"))
    return { title: "Security Center", description: "View logs and manage access", breadcrumbs: [] };
  if (pathname === "/dashboard")
    return { title: "Home", description: "Welcome to E404R", breadcrumbs: [] };

  return { title: "Dashboard", description: "Welcome", breadcrumbs: [] };
};

export default function PageHeader() {
  const pathname = usePathname();
  const pageInfo = getPageInfo(pathname);
  const { title, description, breadcrumbs } = pageInfo;

  return (
    <div className="w-full bg-white border-b border-border-subtle p-6 mb-6" translate="no">
      {breadcrumbs.length > 0 ? (
        <div className="flex items-center gap-2 text-xl font-medium text-text-main">
          {breadcrumbs.map((crumb, index) => (
            <div key={`${crumb.label}-${crumb.href || "current"}`} className="flex items-center gap-2">
              {index > 0 && <span className="material-symbols-outlined text-text-muted text-base">chevron_right</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="text-text-muted hover:text-primary transition-colors">{crumb.label}</Link>
              ) : (
                <div className="flex items-center gap-2">
                  {crumb.image && <ProviderIcon src={crumb.image} alt={crumb.label} size={28} className="object-contain rounded" fallbackText={crumb.label.slice(0, 2).toUpperCase()} />}
                  <h1 className="text-2xl font-light text-[#5c6e80] tracking-tight" suppressHydrationWarning>{translate(crumb.label)}</h1>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-light text-[#5c6e80] tracking-tight mb-1" suppressHydrationWarning>{translate(title)}</h1>
          {description && <p className="text-sm text-text-muted" suppressHydrationWarning>{translate(description)}</p>}
        </div>
      )}
    </div>
  );
}
