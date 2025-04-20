
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function ChangeBoardKunde() {
  const { query } = useRouter();
  const kunde = query.kunde || 'Unbekannt';
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recog = new window.webkitSpeechRecognition();
      recog.lang = 'de-DE';
      recog.onresult = (event) => {
        setInput((prev) => prev + ' ' + event.results[0][0].transcript);
      };
      recog.onend = () => setIsListening(false);
      setRecognition(recog);
    }
  }, []);

  const startSpeech = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const handlePost = () => {
    if (!input.trim()) return;
    const newPost = { id: Date.now(), text: input.trim() };
    setPosts([newPost, ...posts]);
    setInput('');
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-green-700">📋 ChangeBoard für {kunde}</h1>
      <textarea
        className="w-full border rounded p-3"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Neuer Eintrag – sprechen oder schreiben..."
      />
      <div className="flex gap-4">
        <button onClick={startSpeech} className="border px-4 py-2 text-green-700 border-green-700 rounded">🎤 Sprich</button>
        <button onClick={handlePost} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Posten</button>
      </div>
      <section className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="p-3 bg-gray-100 border rounded">
            <p>{post.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
