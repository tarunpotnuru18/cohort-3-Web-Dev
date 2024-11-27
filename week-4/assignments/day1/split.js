
//for no of words

/* const { program } = require("commander");
const fs = require("fs");
const { resolve } = require("path");
program.option("-f, --path <type>", "add the specified path", ".wdcfwg.");

program.parse();

const location = program.opts().path;
console.log(program.opts());
async function read(f) {
  try {
    const opt = await new Promise((resolve, reject) => {
      fs.readFile(f, "utf-8", function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    console.log(opt.length);
  } catch (err) {
    console.log( err);
    return;
  }
}

read(location);
 */

/* const fs = require("fs");
function main(filename){
    fs.readFile(filename,"utf-8",function(err,data){
      let total = 0;
      console.log(data[0]);
      for(let i = 0;i<data.length;i++){

      }
    })
}
main("a.txt") */
console.log(process.argv);