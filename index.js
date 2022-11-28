const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.ca/s?k=amazon+basicss&crid=G1MOZKTPU47G&sprefix=amazon+basicss%2Caps%2C84&ref=nb_sb_noss_1"
  );
  let productTitile = "null";
  let productPrice = "null";
  let img = "null";
  let items=[];
  const productList = await page.$$("div.s-main-slot > .s-asin");

  for (const products of productList) {
    try {
      productTitile = await page.evaluate(
        (e) => e.querySelector("h2>a>span").innerHTML,
        products
      );
    } catch (error) {}

    try {
      productPrice = await page.evaluate(
        (e) => e.querySelector(".a-price>.a-offscreen").innerHTML,
        products
      );
    } catch (error) {}

    try {
      img = await page.evaluate(
        (e) => e.querySelector(".s-image").getAttribute("src"),
        products
      );
    } catch (error) {}

    if (productTitile != null) {
      items.push({productTitile,productPrice,img})
      // console.log(JSON.stringify(productTitile),JSON.stringify(productPrice),img);
      
    }
    
  }
  console.log(items.length)
  console.log(items);
}

main();
