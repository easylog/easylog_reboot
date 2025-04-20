
import Link from 'next/link';

const kunden = ['david', 'maya', 'julia', 'tobias'];

export default function ChangeBoardIndex() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">🗂 Kundenauswahl – ChangeBoard</h1>
      <ul className="space-y-3">
        {kunden.map((name) => (
          <li key={name}>
            <Link href={\`/changeboard/\${name}\`} className="block bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded">
              📋 ChangeBoard für {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
