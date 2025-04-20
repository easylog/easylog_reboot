import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const users = [
    { email: 'admin@easylog.ch', password: 'admin123', role: 'admin' },
    { email: 'staff@easylog.ch', password: 'test123', role: 'staff' }
  ];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Login fehlgeschlagen' });

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET || 'devsecret',
    { expiresIn: '7d' }
  );

  res.status(200).json({ token });
}