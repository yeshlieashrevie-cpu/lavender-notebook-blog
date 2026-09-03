import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');

for (const name of ['index.html', 'admin.html', 'style.css']) {
  fs.copyFileSync(path.join(root, name), path.join(out, name));
}
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8')
  .replace('__SUPABASE_URL__', url)
  .replace('__SUPABASE_ANON_KEY__', key);
fs.writeFileSync(path.join(out, 'script.js'), script);
