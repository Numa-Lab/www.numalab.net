import fs from 'fs/promises';
import url from "url";
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
const html = __dirname +"/../../_site/assets/img/logo.webp"
const buffer = await fs.readFile(html)
console.log(`data:image/webp;base64,${buffer.toString("base64")}`)