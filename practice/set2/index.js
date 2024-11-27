let fs = require("fs");
/* let count = 0;
setInterval(() => {
  console.log(count);
  count++;
}, 1000);

function cleanfile(filepath, callback) {
  let data = fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      callback(err, "failed");
    }
    console.log(data);
    fs.writeFile(filepath, data.trim(), (err, data) => {
      if (err) {
        callback(err, "failed");
      } else {
        callback(data, "successful");
      }
    });
  });
}

cleanfile("./a.txt", (data, message) => {
  console.log(message);
  console.log(data);
});
 */

/* 

setTimeoutPromisified(1000).then((x)=>{
    console.log("hello bosss")
}) */
/*   function setTimeoutPromisified(ms,){
        return new Promise((resolve,reject)=>{
        setTimeout(resolve, ms);
        })
}
function readFilepromisified(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function writeFilepromisified(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("successful");
      }
    });
  });
}

function cleanfile(path, message) {
  readFilepromisified(path)
    .then((data) => {
    //   writeFilepromisified(path, data.trim());

    setTimeout(()=>{
        console.log("hi there")
    },8000)
    })
    .then(() => {
      console.log(message);
    });
}

cleanfile("./a.txt", "mission successful");

function dummy(){
    let p = new Promise(function(resolve){
        setTimeout((resolve)=>{
            resolve("hello world")
        },2000)
    })

    return p;
}

async function main(){
    let value = dummyfunc();
    console.log(value)
}
main()

let p = [1,2,34,5]
 */

/* function Promisemaker(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return "jooooooooo";
    }, 5000);
  });
}

Promisemaker("hellothere")
  .then(function (x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("i am happy currently");
        return "hi";
      }, 1000);
    });
  })
  .then((x) => console.log(x)); */

/*   async function hi (){
    return "hi"
  }
  let p = hi();
  console.log(p)

  function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function solve() {
     setTimeoutPromisified(1000);
    console.log("hi");
    await setTimeoutPromisified(3000);
    console.log("hello");
    await setTimeoutPromisified(5000);
    console.log("hi there");
  }
  
  solve(); */
//   let pizza

// function getPizza() {
//     console.log('making pizza')
//     setTimeout(() => {
//         pizza = '🍕'
//         console.log(`${pizza} is done`)
//     }, 2000)
//     console.log('got the pizza')
// }
// getPizza()
// console.log(pizza) // Waits for the previous line to execute

//returns:
//>making pizza
//>got the pizza
//>🍕 is done // This was returned after 2 seconds because of the setTimeout() which is async function

//an example explaining the need of callbacks in doing the async tasks

/* function loaduserdata(id, callback) {
  setTimeout(() => {
    userdata = { name: "tarun" };
    console.log(userdata)
    callback(null, userdata);
  }, 2000);
}

function loaduserposts(id, callback) {
  setTimeout(() => {
    callback(null, [{ pid: "beast loading" }, {}, {}]);
  }, 2000);
}
function loadpostcomments(id, callback) {
  setTimeout(() => {
    callback(null, [{ cid: 1, comment: "reach heights king!" }, {}, {}]);
  }, 2000);
}

loaduserdata(1, (err, usedata) => {
  if (err) {
    console.error("error occured");
  } else {
    loaduserposts(usedata, (err, usedata) => {
      if (err) {
        console.error("error occured");
      } else {
        loadpostcomments(usedata, (err, data) => {
          if (err) {
            console.error("error occured");
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});
 */

function loaduserdata(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      userdata = { name: "tarun" };
      console.log(userdata);
      resolve("userdata");
    }, 2000);
  });
}

function loaduserposts(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ pid: "beast loading" }, {}, {}]);
    }, 2000);
  });
}
function loadpostcomments(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ cid: 1, comment: "reach heights king!" }, {}, {}]);
    }, 2000);
  });
}
loaduserdata()
  .then((data) => {
    console.log(data);
    loaduserdata(data)
  }

    )
  .then((data) => loadpostcomments(data))
  .then((data) => {
    console.log(data);
  });
  function asyncTask() {
    return new Promise(resolve => setTimeout(() => resolve("Task complete"), 2000));
}

Promise.resolve("Start")
    .then(result => {
        console.log(result + "from here"); // "Start"
        // asyncTask(); // No `return` here, so it won’t wait
    })
    .then(nextResult => {
        console.log(nextResult); // Runs immediately, logging `undefined`
    });
