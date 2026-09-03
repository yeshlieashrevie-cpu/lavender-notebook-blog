import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
if (!url || !key) throw new Error('Missing Supabase environment variables. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Project Settings → Environment Variables, with Production enabled.');

for (const name of ['index.html', 'admin.html', 'style.css']) {
  fs.copyFileSync(path.join(root, name), path.join(out, name));
}
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8')
  .replace('__SUPABASE_URL__', url)
  .replace('__SUPABASE_ANON_KEY__', key);
fs.writeFileSync(path.join(out, 'script.js'), script);
