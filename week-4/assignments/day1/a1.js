const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("counter")
  .description("CLI to do file based tasks")
  .version("0.8.0");

program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program
  .command("count_char")
  .argument("file", "file to count")
  .action(function (file) {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log("file is not there" + "  : " + err);
      } else {
        console.log(
          `${
            data.split("").length
          } these number of characters are present in the given file`
        );
      }
    });
  });

program.parse();
