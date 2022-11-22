const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.ca/s?k=amazon+basics&crid=1BXDTOK946PL6&sprefix=amazon+basics%2Caps%2C196&ref=nb_sb_noss_1"
  );

  const productList = await page.$$("div.s-main-slot > .s-asin");

  for (const products of productList) {
    if (products != null) {
      const productTitile = await page.evaluate(
        (e) => e.querySelector("h2>a>span").innerHTML,
        products
      );

      const productPrice = await page.evaluate(
        (e) => e.querySelector(".a-price>.a-offscreen").innerHTML,
        products
      );

      if (productTitile != null) {
        console.log(JSON.stringify(productTitile));
        console.log(JSON.stringify(productPrice));

      }
    }
  }
}

main();
