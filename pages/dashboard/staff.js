
import Link from 'next/link';

export default function StaffDashboard() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">👷 Mitarbeiter Dashboard</h1>
      <div className="grid gap-4">
        <Link href="/journal" className="block bg-blue-600 text-white px-4 py-3 rounded text-center hover:bg-blue-700">
          🧠 Zum Journal
        </Link>
        <Link href="/changeboard" className="block bg-green-600 text-white px-4 py-3 rounded text-center hover:bg-green-700">
          🔁 Zum ChangeBoard
        </Link>
      </div>
    </main>
  );
}
