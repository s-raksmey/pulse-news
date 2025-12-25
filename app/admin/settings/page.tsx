export default function AdminSettingsPage() {
  const settings = [
    { name: "Site title", value: "PULSE NEWS" },
    { name: "Default locale", value: "en-US" },
    { name: "Theme", value: "Light" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Settings</h1>
          <p className="text-sm text-gray-600">Configure core newsroom preferences and review system status.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-100">Autosave enabled</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 ring-1 ring-blue-100">Responsive cards</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">Workspace preferences</h2>
          <dl className="divide-y divide-gray-100">
            {settings.map((setting) => (
              <div key={setting.name} className="grid gap-2 py-3 sm:grid-cols-3 sm:items-center sm:gap-4">
                <dt className="text-sm font-medium text-gray-800">{setting.name}</dt>
                <dd className="sm:col-span-2">
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    <span>{setting.value}</span>
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-900 p-4 text-white shadow-sm sm:p-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">System health</h3>
            <p className="text-sm text-gray-200">Mobile-ready status indicators.</p>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
              <span>API connectivity</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Good</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
              <span>Backups</span>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">Synced</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
              <span>Team seats</span>
              <span className="text-xs text-gray-200">Unlimited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
