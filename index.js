import express from "express";
import cors from "cors";
import { scrapeAliExpress } from "./scraper.js";
import { enhanceCopy } from "./enhanceCopy.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/product", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing AliExpress product URL" });

  try {
    const scraped = await scrapeAliExpress(url);
    const enhanced = await enhanceCopy(scraped.title, scraped.description);

    res.json({
      original: scraped,
      enhanced
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process product" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
