
import { useState, useEffect } from 'react';

export default function Journal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleGPT = async () => {
    setLoading(true);
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    const data = await res.json();
    setOutput(data.output || 'Keine Antwort');
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">🧠 Journal</h1>
      <textarea
        className="w-full border p-4 rounded resize-none h-40"
        placeholder="Was ist passiert? Sprich oder schreibe..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-4">
        <button onClick={startSpeech} className="border px-4 py-2 rounded text-blue-600 border-blue-600 hover:bg-blue-100">🎤 Sprich</button>
        <button onClick={handleGPT} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'GPT denkt...' : 'Mit GPT umformulieren'}
        </button>
      </div>
      {output && (
        <div className="bg-white p-4 border rounded shadow-sm whitespace-pre-wrap">
          <strong>Formuliert:</strong>
          <p>{output}</p>
        </div>
      )}
    </main>
  );
}
