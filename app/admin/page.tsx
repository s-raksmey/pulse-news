import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  FilePenLine,
  LayoutDashboard,
  PenLine,
  PlayCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Published Articles",
    value: "328",
    change: "+8.4% vs last week",
    trend: "up",
  },
  {
    label: "Drafts in Review",
    value: "24",
    change: "5 awaiting edits",
    trend: "neutral",
  },
  {
    label: "Editors Online",
    value: "12",
    change: "Live collaboration",
    trend: "up",
  },
  {
    label: "Avg. Publish Time",
    value: "3h 12m",
    change: "From submission",
    trend: "down",
  },
];

const recentContent = [
  {
    title: "Quantum leap in sustainable energy storage",
    section: "Tech",
    status: "Scheduled",
    owner: "Alex Morgan",
    publishAt: "Today, 4:30 PM",
  },
  {
    title: "Elections 2024: What the polls miss",
    section: "Politics",
    status: "In copy edit",
    owner: "Priya Desai",
    publishAt: "Today, 6:10 PM",
  },
  {
    title: "Global markets steady after rate update",
    section: "Business",
    status: "Ready to publish",
    owner: "Lena Fox",
    publishAt: "Tomorrow, 9:00 AM",
  },
  {
    title: "Flood response playbook saves coastal town",
    section: "World",
    status: "Awaiting media",
    owner: "Marco Li",
    publishAt: "Tomorrow, 11:45 AM",
  },
];

const workflow = [
  {
    label: "Ideation",
    count: 18,
    description: "Pitches approved this week",
    accent: "bg-blue-100 text-blue-700",
  },
  {
    label: "Drafting",
    count: 27,
    description: "Writers actively drafting",
    accent: "bg-purple-100 text-purple-700",
  },
  {
    label: "Editing",
    count: 14,
    description: "Copy + fact checks in progress",
    accent: "bg-amber-100 text-amber-700",
  },
  {
    label: "Published",
    count: 42,
    description: "Stories shipped this month",
    accent: "bg-emerald-100 text-emerald-700",
  },
];

const tasks = [
  {
    title: "Finalize climate feature visuals",
    owner: "Design",
    due: "Today",
    status: "Urgent",
  },
  {
    title: "Approve weekend headline lineup",
    owner: "Desk Chief",
    due: "Today",
    status: "Pending",
  },
  {
    title: "Schedule newsletter promos",
    owner: "Growth",
    due: "Tomorrow",
    status: "Queued",
  },
];

export default function AdminDashboard() {
  return (
    <main className="bg-gray-50">
      <section className="container-8xl px-4 py-10 space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin · CMS Dashboard</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Content Operations</h1>
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Live
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Monitor publishing velocity, review queue, and team activity in real-time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Access Controls
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
              <FilePenLine className="h-4 w-4" />
              New Article
            </button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{item.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
                {item.trend === "down" ? "Slightly slower" : item.change}
                <ArrowUpRight className="h-4 w-4 text-blue-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Latest in pipeline</h2>
                  <p className="text-sm text-gray-600">Editorial status across key desks</p>
                </div>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Ready
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                    <Clock3 className="h-4 w-4" /> In review
                  </span>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Story</th>
                      <th className="px-4 py-3 font-semibold">Section</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Owner</th>
                      <th className="px-4 py-3 font-semibold">Publish</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {recentContent.map((story) => (
                      <tr key={story.title} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {story.title}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{story.section}</td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                          >
                            <Clock3 className="h-3.5 w-3.5" />
                            {story.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{story.owner}</td>
                        <td className="px-4 py-3 text-gray-600">{story.publishAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Workflow health</h3>
                    <p className="text-sm text-gray-600">
                      Track progression from ideation to publish.
                    </p>
                  </div>
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                </div>

                <div className="mt-5 grid gap-3">
                  {workflow.map((step) => (
                    <div
                      key={step.label}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          {step.label}
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${step.accent}`}
                          >
                            {step.count} tasks
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Priority tasks</h3>
                    <p className="text-sm text-gray-600">Fast-track items for today.</p>
                  </div>
                  <PenLine className="h-5 w-5 text-indigo-600" />
                </div>

                <div className="mt-5 space-y-4">
                  {tasks.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.owner}</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-amber-600" />
                          Due {item.due}
                        </div>
                        <button className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                          Mark done
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-gray-900 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Publishing tempo</h3>
                  <p className="text-sm text-gray-200">Speed vs. target SLA</p>
                </div>
                <Users className="h-5 w-5 text-blue-200" />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Today</span>
                  <span className="font-semibold">86% on-time</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-200">
                  <span>This week</span>
                  <span>18 stories ahead</span>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-white/10 p-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="font-semibold">Autoschedule running</p>
                    <p className="text-gray-200">Prioritizing evening traffic windows.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live desk signals</h3>
                  <p className="text-sm text-gray-600">Collaboration pulse</p>
                </div>
                <Clock3 className="h-5 w-5 text-blue-600" />
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between rounded-xl bg-gray-50 p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">Desk huddles</p>
                    <p className="text-gray-600">3 live editing sessions</p>
                  </div>
                  <span className="text-emerald-600">● On air</span>
                </div>
                <div className="flex items-start justify-between rounded-xl bg-gray-50 p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">Fact-check lane</p>
                    <p className="text-gray-600">7 articles tagged critical</p>
                  </div>
                  <span className="text-amber-600">● Busy</span>
                </div>
                <div className="flex items-start justify-between rounded-xl bg-gray-50 p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">Media pipeline</p>
                    <p className="text-gray-600">12 assets uploading</p>
                  </div>
                  <span className="text-blue-600">● Stable</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
