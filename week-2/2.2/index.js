/* const tarun =  {
    name:"tarun",
}
const king = {
    name: "virat",
}
 const trail  =  function (){
     
          console.log(this.name);
}
trail(); */
/* class rectangle{
    constructor(height,width){
             this.height = height;
             this.width = width;
    }
     
area(){
    return this.height*this.width;
}

}
let p = new rectangle(20,30);
console.log(p.area());
console.log("promises");
const d = new Date();
console.log(d.getDate()); */

// function setPromisified(ms) {
//   const p = new Promise((resolve) => setTimeout(resolve, ms));
//   return p;
// }
/* function after5s(resolve){
    setTimeout(resolve,5000);
}
after5s(()=>console.log("hi ra bacha ")) */

/* function setPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function callback() {
  console.log("hi");
}
setPromisified(2000).then(callback);

function q() {
  console.log("hi");
  setTimeout(() =>
    
    {
    console.log("hello");
    setTimeout(() =>
      
      console.log("hello there"), 5000);
  }, 3000);
}

setTimeout(q,1000); */

/* function waitfor3s(resolve) {
  setTimeout(resolve, 3000);
}
function setPromisified() {
  return new Promise(waitfor3s);
}
setPromisified().then(() =>
  
  console.log("main is called")); */

//   const fs = require('fs');
//   function a(resolve){
//         resolve()
//   };
// const p = new Promise(a);
//  p.then(fs.readFile("a.txt",'utf-8'))
/* function wait(resolve) {
  console.log(resolve);
  setTimeout(resolve,1000);
}

function setTimeoutPromisified() {
  return new Promise(wait);
}
function main() {
  console.log("hey there whatsup!");
}
setTimeoutPromisified().then(main); */

// function random(a,b){
//  a();
// }

// const p = new Promise(random);
// console.log(p);

// //promisified version of readfile
// const fs = require('fs');

// function readfilePromisified(){
// const r = new Promise(random);
// return r;
// }
// readfilePromisified().then(fs.readFile('a.txt','utf-8',(a,b) =>console.log(b)))

// function step1(val, callback) {
//   callback(val + 10, false);
// }
// function step2(val, callback) {
//   callback(val + 10, false);
// }
// function step3(val, callback) {
//   callback(val + 10, false);
// }

// step1(10, function (a, err) {
//   if (!err) {
//     step2(a + 10, function (a, err) {
//       if (!err) {
//         step3(a + 10, function (a, err) {
//           if (!err) {
//             console.log(a);
//           }
//         });
//       }
//     });
//   }
// });

let pizza;
function orderPizza(callback) {
  setTimeout(callback, 2000);
}
function taskeat() {
  pizza = "🍕";
  console.log("stop whatever you are doing");
  console.log(`eat the ${pizza} `);
}
orderPizza(taskeat);
console.log("watch virat kohli master class");

function thing1(callback) {
  callback();
  //call the pizzashop
}
function thing2(callback) {
  callback();
  //order the pizza
}
function thing3(callback) {
  callback();
  //eat the pizza
}
thing1(function () {
  thing2(function () {
    thing3(() =>
      
      {});
  });
}); 
 
 function callpizzashop(
  callback1,
  callback2,
  callback3,
  callback4,
  callback5,
  callback6
) {
  console.log("hey pizza shop please make an order for me");
  setTimeout(
    () =>
      
      callback1(callback2, callback3, callback4, callback5, callback6),
    1000
  );
}
function makeorder(callback2, callback3, callback4, callback5, callback6) {
  console.log("make order of one veg pizza");
  setTimeout(() =>
    
    callback2(callback3, callback4, callback5, callback6), 2000);
}
function takeorder(callback3, callback4, callback5, callback6) {
  console.log("took your order please hang on, have a small strool");
  setTimeout(() =>
    
    callback3(callback4, callback5, callback6), 1000);
}
function makepizza(callback4, callback5, callback6) {
  console.log("we are making some good delicious pizza for you");
  setTimeout(() =>
    
    callback4(callback5, callback6), 2000);
}
function pizzaready(callback5, callback6) {
  console.log("hey our beloved customer your yummy delicious pizza is ready");
  setTimeout(() =>
    
    callback5(callback6), 3000);
}
function eatpizza(callback6) {
  console.log("eating my delicious pizza");
  setTimeout(() =>
    
    callback6(), 2000);
}
function burp() {
  console.log("my digestive system is pretty fast you know !");
}
callpizzashop(makeorder, takeorder, makepizza, pizzaready, eatpizza, burp);
setTimeout(()=>{console.log("ooooo eyeyyeyeye")})

/* console.log('hey');
setTimeout(()=>{console.log("ooooo eyeyyeyeye")});
console.log(`j`);
console.log(`j`);
console.log(`j`);
console.log(`j`);
console.log(`j`);
console.log(`j`);
console.log(`j`); */

/* let  p = new Promise(()=>{
 resolve("clay")
  console.log("hey there");
})
p.then((x)=>console.log("hey there 2" + x)) */

/* function getWeather() {
  setTimeout(() =>
    
    {
      return 'sunny'
  }, 500)
}

let weather = getWeather()
console.log(weather) */

/* function getWeather(callback) {
  let p;
  setTimeout(() =>
    
    {
    let p = "sunny";
    callback(p);
  }, 500);
}
function printweather(data) {
  console.log(data);
}
getWeather(printweather); */

/* function getWeather() {
  return new Promise(function (resolve, reject) {
    resolve("sunny")
  });
}
let  p =getWeather()
console.log(p); */
/* let  p = 
new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner) => {
      setTimeout(resolveInner, 1000);
    }),
  );
});
console.log(p); */

/* let x = new Promise(function(resolve,reject){
  reject("hey there")
});
let data2 = 20;
x.then((data,data2)=>{
  console.log(data);
  console.log("data2"+data2);
}) */
/* 
function getWeather() {
  return new Promise(function (resolve, reject) {
    setTimeout(() =>
      
      {
      resolve("sunny");
    }, 2000);
  });
}
function icon(weather){
       switch(weather){
        case "sunny": return '☀️';
       }
}
getWeather().then(icon).then((x)=>console.log(x)) */

/* function f1() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("hey buddy");
    }, 2000);
  });
}
function f2() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("amma nana");
    }, 2000);
  });
}
f1()
  .then(f2)
  .then((data) => console.log(data)); */

/* function callpizzashop(
  callback1,
  callback2,
  callback3,
  callback4,
  callback5,
  callback6
) {
  console.log("hey pizza shop please make an order for me");
  setTimeout(
    () =>
      
      callback1(callback2, callback3, callback4, callback5, callback6),
    1000
  );
}
function makeorder(callback2, callback3, callback4, callback5, callback6) {
  console.log("make order of one veg pizza");
  setTimeout(() =>
    
    callback2(callback3, callback4, callback5, callback6), 2000);
}
function takeorder(callback3, callback4, callback5, callback6) {
  console.log("took your order please hang on, have a small strool");
  setTimeout(() =>
    
    callback3(callback4, callback5, callback6), 1000);
}
function makepizza(callback4, callback5, callback6) {
  console.log("we are making some good delicious pizza for you");
  setTimeout(() =>
    
    callback4(callback5, callback6), 2000);
}
function pizzaready(callback5, callback6) {
  console.log("hey our beloved customer your yummy delicious pizza is ready");
  setTimeout(() =>
    
    callback5(callback6), 3000);
}
function eatpizza(callback6) {
  console.log("eating my delicious pizza");
  setTimeout(() =>
    
    callback6(), 2000);
}
function burp() {
  console.log("my digestive system is pretty fast you know !");
}
callpizzashop(makeorder, takeorder, makepizza, pizzaready, eatpizza, burp);
setTimeout(()=>{console.log("ooooo eyeyyeyeye")}) */

/* function callpizzashop() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("hello pizza shop please take my order");
      resolve("one is called");
    }, 1000);
  });
}
function makeorder() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      const order = "veg pizza";
      console.log(`order one ${order}`);
      resolve(order);
    }, 2000);
  });
}
function takeorder(order) {
  return new Promise((resolve) => {
    setTimeout(function () {
      console.log(`your order of one ${order} taken down`);
      resolve(order);
    }, 1000);
  });
}
function makepizza(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("we are preparing your order");
      resolve(order);
    }, 2000);
  });
}
function pizzaready(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`your ${order} is ready`);
      resolve(order);
    }, 3000);
  });
}
function eatpizza(order) {
  return new Promise((resolve) => {
    console.log("yummy yummy 😋");
    resolve(order);
  }, 2000);
}
function burp(order) {
  console.log(`${order} is digested`);
}
callpizzashop()
  .then(makeorder)
  .then(takeorder)
  .then(makepizza)
  .then(pizzaready)
  .then(eatpizza)
  .then(burp); */

/* function watchTutorialCallback() {
  let userLeft = false;
  let userWatchingCatMeme = false;
  return new Promise((resolve, reject) => {
    if (userLeft) {
      resolve({
        name: "User Left",
        message: ":(",
      });
    } else if (userWatchingCatMeme) {
      resolve({
        name: "User Watching Cat Meme",
        message: "WebDevSimplified < Cat",
      });
    } else {
      reject("Thumbs up and Subscribe");
    }
  });
}

watchTutorialCallback()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  }); */

/* function fetchdata() {
  return new Promise(function (resolve, reject) {
    fetch("https://api.weather.gov/gridpoints/0kX/35,35/forecast")
      .then((Response) => Response.json())
      .then((data) => resolve(data.properties.periods[1].shortForecast));
  });
}
function displaydata(data) {
  console.log(data);
}

fetchdata().then(displaydata); */
/* function fetchdata() {
  return new Promise(function (resolve, reject) {
    fetch("https://api.weather.gov/gridpoints/0kX/35,35/forecast")
      .then((response) => response.json()) // Use lowercase "response" for consistency
      .then((data) => resolve(data.properties.periods[1].shortForecast))
      .catch((error) => reject(error)); // Handle fetch errors
  });
}

function displaydata(data) {
  console.log(data);
}

fetchdata()
  .then(displaydata)
  .catch((error) => console.error("Error fetching data:", error)); */

/* function callpizzashop() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("hello pizza shop please take my order");
      resolve("one is called");
    }, 1000);
  });
}
function makeorder() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      const order = "veg pizza";
      console.log(`order one ${order}`);
      resolve(order);
    }, 2000);
  });
}
function takeorder(order) {
  return new Promise((resolve) => {
    setTimeout(function () {
      console.log(`your order of one ${order} taken down`);
      resolve(order);
    }, 1000);
  });
}
function makepizza(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("we are preparing your order");
      resolve(order);
    }, 2000);
  });
}
function pizzaready(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`your ${order} is ready`);
      resolve(order);
    }, 3000);
  });
}
function eatpizza(order) {
  return new Promise((resolve) => {
    console.log("yummy yummy 😋");
    resolve(order);
  }, 2000);
}
function burp(order) {
  console.log(`${order} is digested`);
}
 */
// async function pizza() {
/*  callpizzashop()
  .then(makeorder)
  .then(takeorder)
  .then(makepizza)
  .then(pizzaready)
  .then(eatpizza)
  .then(burp); */
// console.log(callpizzashop());
/*  await callpizzashop();
 let order =  await makeorder();
  await takeorder(order);
  await makepizza(order);
  await pizzaready(order);
  await eatpizza(order);
  burp(order);
  console.log(await callpizzashop() + 'knjhsgd'); 
  }
  pizza()*/

function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function solve() {
  await setTimeoutPromisified(1000);
  console.log("hi");
  await setTimeoutPromisified(3000);
  console.log("hello");
  await setTimeoutPromisified(5000);
  console.log("hi there");
}

solve();
