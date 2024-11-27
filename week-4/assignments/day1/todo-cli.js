const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program.name("todo-cli").description("a simple cli for todo").version("1.0.0");

function readfile(file) {
  return fs.readFileSync(file, "utf-8");
}
function writeFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}
program
  .command("read")
  .description("to read the tasks in todo list")
  .argument("file", "file to get data")
  .action(function (file) {
    const data = readfile(file);
    console.log(JSON.parse(data));
  });

program
  .command("add")
  .description("to add the tasks in todo list")
  .argument("file", "file to get data")
  .argument("todo", "tasks to add")
  .action(function (file, todo) {
    const data = JSON.parse(readfile(file));
    data.push({
      task: todo,
      completed: false,
    });

    writeFile(file, data);
  });

program
  .command("del")
  .description("to delete the tasks in todo list")
  .argument("file", "file to get data")
  .argument("todo", "task to delete")
  .action(function (file, todo) {
    let data = JSON.parse(readfile(file));
    for (let i = 0; i < data.length; i++) {
      if (data[i].task === todo) {
        data.splice(i, 1);
        writeFile(file, data);
        return;
      }
    }
    console.log("no such task exist");
  });

program
  .command("mark")
  .description("to mark the tasks in todo list")
  .argument("file", "file to get data")
  .argument("todo", "task to be marked")
  .action(function (file, todo) {
    let data = JSON.parse(readfile(file));
    for (let i = 0; i, data.length; i++) {
      if (data[i].task === todo) {
        data[i].completed = !data[i].completed;
        writeFile(file, data);
        return;
      }
    }
    console.log("no such task is present");
  });

program.parse();
