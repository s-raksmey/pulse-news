export default function AdminSettingsPage() {
  const settings = [
    { name: "Site title", value: "PULSE NEWS" },
    { name: "Default locale", value: "en-US" },
    { name: "Theme", value: "Light" },
  ];

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600">Configure core newsroom preferences.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <dl className="divide-y divide-gray-100">
          {settings.map((setting) => (
            <div key={setting.name} className="flex items-center justify-between px-4 py-3">
              <dt className="text-sm font-medium text-gray-800">{setting.name}</dt>
              <dd className="text-sm text-gray-600">{setting.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
