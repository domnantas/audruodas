const getTextByClass = (entry, className) => {
  const rawText = entry.find(className).text();
  try {
    if (rawText != undefined) {
      return rawText.trim().replace(/ +(?= )/g, "");
    } else {
      return "";
    }
  } catch (e) {
    console.log("An error occured" + e);
  }
};

module.exports = {
  getTextByClass
}