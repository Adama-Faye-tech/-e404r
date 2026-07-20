import { Card } from "@/shared/components";

export const metadata = {
  title: "Security Center - E404R",
};

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main mb-2">Security Center</h1>
        <p className="text-text-muted">
          Manage access controls, monitor security events, and configure firewall rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-blue-500 text-3xl">vpn_key</span>
            <h3 className="text-lg font-semibold">API Keys Management</h3>
          </div>
          <p className="text-sm text-text-muted mb-4">
            Create, rotate, and revoke API keys with granular permissions.
          </p>
          <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
            Manage Keys <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </Card>

        <Card className="p-6 border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-amber-500 text-3xl">policy</span>
            <h3 className="text-lg font-semibold">Access Policies</h3>
          </div>
          <p className="text-sm text-text-muted mb-4">
            Configure IP whitelists, rate limits, and authentication rules.
          </p>
          <button className="text-sm font-medium text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1">
            Configure Policies <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </Card>

        <Card className="p-6 border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-red-500 text-3xl">gavel</span>
            <h3 className="text-lg font-semibold">Audit Logs</h3>
          </div>
          <p className="text-sm text-text-muted mb-4">
            Review detailed security events, failed authentications, and system alerts.
          </p>
          <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
            View Logs <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </Card>
      </div>

      <Card className="mt-4 p-8 flex flex-col items-center justify-center text-center border-dashed bg-surface/50">
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-primary text-3xl">construction</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Advanced Security Rules</h3>
        <p className="text-text-muted max-w-md">
          Advanced intrusion detection (IDS) and AI-based anomaly detection are currently in development for the E404R platform.
        </p>
      </Card>
    </div>
  );
}
