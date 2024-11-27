//variables
let color = "white";
let height = 180;
let LikePizza = false;

//functions assignment-1
function sum(a, b) {
  console.log(a + b);
}
sum(1, 8);
sum("rookie", 1);
sum("rookie", "codes");

//assignment-2
function canVote(age) {
  if (age < 18) {
    return false;
  } else {
    return true;
  }
}

//if-else assignment
let num = 20;
if (num % 2 == 0) {
  console.log("given number is even");
} else {
  console.log("given number is odd");
}

// looops assignment

function sumUpTo(a) {
  let sum = 0;
  for (let i = 0; i <= a; i++) {
    sum = sum + i;
  }
  console.log(sum);
}
sumUpTo(2);

//objects-assignment

let user = {
  name: "harkirat",
  age: "20",
  gender: "male",
};
function greet(user) {
  console.log(`hello ${user.name}!, your age is ${user.age}`);
}
greet(user);
//assignment 2 and 3
function greetNew(user) {
  let title = "others";
  if (user.gender === "male") {
    title = "Mr";
  } else if (user.gender === "female") {
    title = "Mrs";
  }
  console.log(
    `Hi ${title} ${user.name},your age is ${user.age},you are ${
      user.age > 18 ? "eligible to vote" : "not eligible to vote"
    }`
  );
}
greetNew(user);

// array assignment
const uArray = [user];
function test1(u) {
  let newUsers = [];
  for (let i = 0; i < u.length; i++) {
    if (u[i].age > 18) {
      newUsers.push(u[i]);
    }
  }
  return newUsers;
}
// assignment - 2
function test2(u) {
  let newUsers = [];
  for (let i = 0; i < u.length; i++) {
    if (u[i].age > 18 && u[i].gender === "male") {
      newUsers.push(u[i]);
    }
  }
  return newUsers;
}
console.log(test2(uArray));
