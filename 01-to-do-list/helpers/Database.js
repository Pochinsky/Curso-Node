const fs = require("fs");

const file = "./db/data.json";

/**
 * It takes in a data object, converts it to a JSON string, and then writes that string to a file
 * @param {string} data - The data to be saved.
 */
const saveDatabase = async (data) =>
  fs.writeFileSync(file, JSON.stringify(data));

/**
 * It reads the database file and returns the data in it
 * @returns {object} the data that is being read from the file.
 */
const readDatabase = () => {
  if (!fs.existsSync(file)) return null;
  const info = fs.readFileSync(file, { encoding: "utf-8" });
  let data;
  if (info)
    data = JSON.parse(info);
  return data;
};

module.exports = {
  saveDatabase,
  readDatabase,
};
