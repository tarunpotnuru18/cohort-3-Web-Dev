//code a counter in Javascript It should go up as time goes by in intervals of 1 second
let count = 0
setInterval(()=>{
    count++;
    console.log(count);


},1000)

// Write code to read contents of a file and print it to the console. You can use the fs library to as a black box, the goal is to understand async tasks. Try to do an expensive operation below the file read and see how it affects the output. Make the expensive operation more and more expensive and see how it affects the output.
const fs = require("fs");

fs.readFile("../../2.2/a.txt", "utf-8", (err, data) => {
  console.log(data);
}); 

// code for writing the contents insdie the file
 fs.writeFile("../../2.2/a.txt", "radhe radhe", (err) => {
  if (!err) {
    console.log("no error is there so maha mantra is written into the file");
  } else {
    console.log(err);
  }
});

 fs.readFile("../../2.2/a.txt", "utf-8", (err, data) => {
  console.log(data);

  if (!err) {
    console.log("hey bhai");
  }
}); 

// clean the file

/* function cleanfile(filepath, callback) {
  fs.readFile(filepath, "utf-8", function (err, data) {
    console.log(data);
    console.log(data.trim());
    data = data.trim();
    if (err) {
      console.log(err);
    }
    console.log(data);
    fs.writeFile(filepath, data, (err) => {
      if (err) {
        callback(err, "failed");
        return;
      }
      callback(err, "sucessful");
    });
  });
}
function display(y, x) {
  if (!y) {
    console.log("display value :" + x);
  } else {
    console.log(y);
  }
}
cleanfile("./test.txt", display); */

// promisified cleanFile

/* async function main(filepath) {
  let data = await cleanf(filepath);
}

function cleanf(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
      fs.writeFile(filepath, data.trim(), "utf-8", (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("sucessfull");
          resolve("sucessfull");
        }
      });
    });
  });
}
main("./test.txt"); */

// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2

// callback approach

/* function function1() {
  setTimeout(() => {
    function2();
    console.log("hi");
  }, 1000);
}
function function2() {
  setTimeout(() => {
    console.log("hello");
    function3();
  }, 3000);
}

function function3() {
  setTimeout(() => {
    console.log("hello there");
  }, 5000);
}
function1(); */

//promisified approach
/*function setTimeoutpromisified(ms){
    return new Promise(function (resolve,reject){
        setTimeout(()=>resolve(),ms)
   })
}

async function main(){
  await setTimeoutpromisified(1000)
  console.log("hi");
  await setTimeoutpromisified(3000)
  console.log('hello');
  await setTimeoutpromisified(5000)
  console.log("hello there");
}
main() */
function example() {
  return new Promise(function (resolve, reject) {
       resolve(72);
  });
}

console.log(example());
