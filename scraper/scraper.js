const cheerio = require("cheerio");
const request = require("request");
const { getTextByClass } = require("./utils");

const getCurrentEntries = url => {
  return new Promise((resolve, reject) => {
    try {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const page = cheerio.load(html);
          let currentEntries = [];

          page(".list-row").map((i, el) => {
            const entry = page(el);

            const displayValue = entry.css("display");
            const price = getTextByClass(entry, ".list-item-price");

            if (displayValue !== "none" && price !== "") {
              const pricePM = getTextByClass(entry, ".price-pm");
              const floor = getTextByClass(entry, ".list-Floors");
              const area = getTextByClass(entry, ".list-AreaOverall");
              const rooms = getTextByClass(entry, ".list-RoomNum");
              const link =
                "https://www.aruodas.lt" + entry.find("a").attr("href");

              currentEntries.push({ price, pricePM, floor, area, rooms, link });
            }
          });

          resolve(currentEntries);
        } else {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCurrentEntries
}