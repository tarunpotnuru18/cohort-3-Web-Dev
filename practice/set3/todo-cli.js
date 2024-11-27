const fs = require("fs");

const { Command } = require("commander");

const program = new Command();
 
// node todo-cli.js add "cry" -f "todo.json"

program.name("todo-cli").description("a cli for todo").version("1.0.0");

program
  .command("add")
  .description("to add an todo")
  .argument("<task>")
  .option("-f,--file <file>") // these are specila type of options called as value options
  .action((task, option) => {
    console.log(task);
    console.log(option.file); // here it is value of the file since it is an value option otherwise if it is a boolean option then this would be an boolean value,
    fs.readFile(option.file, "utf-8", (err, data) => {
      if (err) {
        console.log("no such file is present");
      } else {
        let newData = JSON.parse(data);

        newData.push({
          task: task,
        });

        fs.writeFile(option.file, JSON.stringify(newData), (err) => {
          if (err) {
            console.log("error");
          } else {
            console.log("successful");
          }
        });
      }
    });
  });

program.parse();
