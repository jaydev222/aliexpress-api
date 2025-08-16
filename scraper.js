import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function scrapeAliExpress(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $("h1").first().text().trim() || $("title").text().trim();
  const description = $("body").text().slice(0, 1000).trim(); // fallback if structured data missing

  const images = [];
  $("img").each((i, el) => {
    const src = $(el).attr("src");
    if (src && src.includes("jpg")) images.push(src);
  });

  return { title, description, images };
}
