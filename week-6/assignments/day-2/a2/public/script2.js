let signin_password = document.querySelector("#signin-password");
let signup_username = document.querySelector("#signup-username");
let signup_userid = document.querySelector("#signup-userid");
let signup_password = document.querySelector("#signup-password");
let signin_userid = document.querySelector("#signin-userid");
async function signup() {
  let username = signup_username.value;
  let userid = signup_userid.value;
  let password = signup_password.value;
  try {
    let response = await axios.post("http://localhost:3000/signup", {
      username,
      userid,
      password,
    });

    if (response.status === 200) {
      alert(response.data);
      window.location.href = "/signin.html";
    } else {
      alert("some error occured, signup failed");
    }
  } catch (e) {
    alert("some error occured");
  }
}
async function signin() {
  let userid = signin_userid.value;
  let password = signin_password.value;

  try {
    let response = await axios.post("http://localhost:3000/signin", {
      userid,
      password,
    });

    if (response.status === 200) {
      let token = response.data;
      alert("sucessfully signed in");
      localStorage.setItem("token", token);
     window.location.href = "/todo.html"
     currentuserid = userid
     islogin = true;
      
    }
  } catch (error) {}
}