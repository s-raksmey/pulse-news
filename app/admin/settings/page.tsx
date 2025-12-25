import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

const preferences = [
  { name: "Site title", value: "PULSE NEWS" },
  { name: "Default locale", value: "en-US" },
  { name: "Theme", value: "Light" },
  { name: "Logo treatment", value: "Mono mark" },
];

const controls = [
  { label: "Workspace preferences", active: true },
  { label: "Access & roles", active: false },
  { label: "Billing", active: false },
];

const systemHealth = [
  { label: "API connectivity", status: "Good", tone: "bg-emerald-100 text-emerald-700" },
  { label: "Backups", status: "Synced", tone: "bg-blue-100 text-blue-700" },
  { label: "Team seats", status: "Unlimited", tone: "bg-white/20 text-white" },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="sr-only">Back</span>
          </button>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Pulse News CMS</p>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Settings</h1>
            <p className="text-sm text-gray-600">Configure core newsroom preferences and review system status.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-100">Autosave enabled</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 ring-1 ring-blue-100">Responsive cards</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6 lg:col-span-2">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-inner">
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>Site controls</span>
                <span className="text-xs text-gray-500">Live</span>
              </div>
              <div className="space-y-2 text-sm">
                {controls.map((control) => (
                  <button
                    key={control.label}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition ${
                      control.active
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                        : "text-gray-600 hover:bg-white"
                    }`}
                  >
                    <span>{control.label}</span>
                    {control.active ? (
                      <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
                    ) : (
                      <ArrowLeft className="h-3 w-3 rotate-180 text-gray-400" aria-hidden />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Workspace preferences</h2>
                  <p className="text-sm text-gray-600">Baseline settings applied across the newsroom experience.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  Save changes
                </button>
              </div>

              <dl className="divide-y divide-gray-100">
                {preferences.map((preference) => (
                  <div key={preference.name} className="grid gap-2 py-3 sm:grid-cols-3 sm:items-center sm:gap-4">
                    <dt className="text-sm font-medium text-gray-800">{preference.name}</dt>
                    <dd className="sm:col-span-2">
                      <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                        <span>{preference.value}</span>
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Edit</button>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-900 p-4 text-white shadow-sm ring-1 ring-gray-800 sm:p-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">System health</h3>
            <p className="text-sm text-gray-200">Mobile-ready status indicators.</p>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {systemHealth.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
                <span>{item.label}</span>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.tone}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
