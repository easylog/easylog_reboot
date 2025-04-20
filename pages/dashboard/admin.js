
export default function AdminDashboard() {
  const invoices = [
    { id: 1, month: 'April 2025', amount: 'CHF 1300.–', status: 'Bezahlt' },
    { id: 2, month: 'März 2025', amount: 'CHF 1300.–', status: 'Bezahlt' },
    { id: 3, month: 'Februar 2025', amount: 'CHF 1300.–', status: 'Offen' }
  ];

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">📊 Admin Dashboard</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Rechnungsübersicht</h2>
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Monat</th>
              <th className="p-2 border">Betrag</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="p-2 border">{inv.month}</td>
                <td className="p-2 border">{inv.amount}</td>
                <td className="p-2 border">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
