import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exts = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.vue', '.css', '.scss', '.less',
  '.html', '.json', '.md', '.yml', '.yaml'
]);

const ignore = new Set([
  'node_modules', 'dist', 'build', '.git', 'coverage', '.next', '.nuxt'
]);

let out = '# 项目代码全量转储 (Project Dump)\n\n';

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (ignore.has(name)) continue;
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p);
    } else if (exts.has(path.extname(name))) {
      if (name === 'package-lock.json' || name === 'pnpm-lock.yaml' || name === 'yarn.lock') continue;
      out += `## FILE: ${p}\n\n`;
      out += '```' + path.extname(name).slice(1) + '\n';
      out += fs.readFileSync(p, 'utf8');
      out += '\n```\n\n';
    }
  }
}

walk('.');
fs.writeFileSync('project-dump.md', out);
console.log('✅ 成功！已生成 project-dump.md，请查看项目根目录！');