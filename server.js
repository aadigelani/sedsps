import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static assets from the current directory
app.use(express.static(__dirname));

// Direct routes for problem statement pages (supporting legacy and clean paths)
app.get(['/problem-statement-1', '/problem-statement-1.html', '/pages/problem-statement-1'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'problem-statement-1.html'));
});
app.get(['/problem-statement-2', '/problem-statement-2.html', '/pages/problem-statement-2'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'problem-statement-2.html'));
});
app.get(['/problem-statement-3', '/problem-statement-3.html', '/pages/problem-statement-3'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'problem-statement-3.html'));
});

// SPA fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
