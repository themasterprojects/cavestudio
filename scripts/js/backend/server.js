import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3030;

app.use(cors());

app.get("/download", async (req, res) => {

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:5173/run/", { waitUntil: "load" });

    const data = await page.content();

    await browser.close();

    res.send(data);
  }
  catch (e) {
    res.status(500).send("Failed to fetch... !");
  }

});

app.get("/main", async (req, res) => {

  try {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.google.com/", { waitUntil: "load" });

    const target = await page.$eval(".uU7dJb", item => item.textContent);

    const content = await page.content();

    await browser.close();

    res.send(target);
  }
  catch (e) {
    res.send("Error.. !");
  }

});

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});