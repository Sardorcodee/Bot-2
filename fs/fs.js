import fs from "fs";

const read = (file_name) => {
  return JSON.parse(fs.readFileSync(`./Db/${file_name}`, "utf8"));
};

const write = (file_name, data) => {
  return fs.writeFileSync(
    `./Db/${file_name}`,
    JSON.stringify(data, null, 4),
    (err) => {
      if (err) throw err;
      console.log("Created!");
    }
  );
};

export { read, write };
