/*  p.name("counter").description("a simple CLI tool").version("0.0.4");

p.command("count")
  .description("a command to count no of words in a given file")
  .argument("<string>","provide the file name")
  .option("-w","no of words")
  .option("-c","no of characters")
  .action((str,opts) => {
         fs.readFile(str,'utf-8',(err,data)=>{
            if(err){
              console.log("there is no such file present please look carefully")
            }
            else{
              if(opts.w){
                const length = data.split(' ').length
                console.log(length)
              }else if(opts.c){
                const length = data.split('').length
                console.log(length)
              }
                 else{
                  console.log("no option given ")
                 }
    
            }

         })
  });

  p.parse()  */
const fs = require("fs");
const { Command } = require("commander");
const cli = new Command();
cli
  .name("stringfun")
  .description("a cli tool which helps in concating the strings")
  .version("1.0.0");

cli
  .command("concat")
  .description("command to concat given two strings")
  .argument("<string>", "string 1")
  .argument("<string2>", "string 2")
  .option("-c", "concatination of the value")
  .action((str1, str2, option) => {
    console.log(str1 + str2);
    console.log(option.c);
    console.log(option.conc);
  });

cli.parse();
