
import { useState, useEffect } from 'react';

export default function ChangeBoard() {
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
      <h1 className="text-2xl font-bold text-blue-600">📋 ChangeBoard</h1>
      <textarea
        className="w-full border rounded p-3"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Neuer Beitrag – sprechen oder schreiben..."
      />
      <div className="flex gap-4">
        <button onClick={startSpeech} className="border px-4 py-2 text-blue-600 border-blue-600 rounded">🎤 Sprich</button>
        <button onClick={handlePost} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Posten</button>
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
