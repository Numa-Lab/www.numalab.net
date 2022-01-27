'use strict';

//import { writeFile } from 'fs/promises';
import puppeteer from 'puppeteer';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
//import { readmetmpl } from './README-tmpl.js';
//import fs from 'fs/promises';
import url from "url";
import path from 'path';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

async function generateImageFromNumaLab() {
  const html = __dirname + "/site/index.html" //GitHub actionsのときファイル移動するから注意！ "/../../_site/index.html"
  //const buffer = await fs.readFile(html)
  //console.log(`${buffer.toString("base64")}`)
  const url = html;
  const browser = await puppeteer.launch({
    args: [ '--disable-infobars', '--lang=ja' ],
  });
  const page = await browser.newPage()
  const originalImagePath = path.join('result.jpg');// don't change webp
  await page.setViewport({
    width: 1366,
    height: 768
  })
  await page.goto(url, { "waitUntil": [ 'load', 'networkidle2' ] });

  //await page.waitForSelector('#group-13211412 > .group-row-contents > .folder-toggle-wrap > .folder-caret > .gl-icon')
  //await page.click('#group-13211412 > .group-row-contents > .folder-toggle-wrap > .folder-caret > .gl-icon')
  //await page.waitForSelector('#group-13199335 > .group-row-contents > .folder-toggle-wrap > .folder-caret > .gl-icon')
  //await page.click('#group-13199335 > .group-row-contents > .folder-toggle-wrap > .folder-caret > .gl-icon')
  await page.addScriptTag({
    content: `
    console.log("Hello!")
  `
  });
  //await page.evaluate(() => {
  //  elementDelete = document.querySelector('header');
  //  elementDelete.parentNode.removeChild(elementDelete);
  //});
  //await page.addStyleTag({ content: 'img.emoji {height: 1em;width: 1em;margin: 0 .05em 0 .1em;vertical-align: -0.1em;}' })
  //await page.addScriptTag({ content: 'window.addEventListener("load", function() { twemoji.parse(document.body); });' });
  await page.waitForTimeout(10000);

  const element1 = await page.$('html')
  await element1.screenshot({ path: originalImagePath })

  await browser.close()
  await imagemin([ originalImagePath ], {
    plugins: [ imageminWebp({ quality: 100 }) ],
    destination: '.',
  });
}

//async function createReadme({ }) {
//  await writeFile(path.join(process.cwd(), 'README.md'), await readmetmpl());
//}

(async () => {
  await Promise.all([ generateImageFromNumaLab() ]);

  //await createReadme({});
})();

