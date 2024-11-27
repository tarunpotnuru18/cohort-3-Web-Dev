let signup_username = document.querySelector("#signup-username");
let signup_password = document.querySelector("#signup-password");

let signin_username = document.querySelector("#signin-username");
let signin_password = document.querySelector("#signin-password");
let issignin = false;
let user_dashboard = document.querySelector(".user");
let user_info = document.querySelector("#user-info");
render();
async function signup() {
  let username = signup_username.value;
  let password = signup_password.value;
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      username: username,
      password: password,
    });
    alert(response.data);
    signup_username.value = "";
    signup_password.value = "";
  } catch (e) {
    console.error(e);
    console.log("error occured");
  }
}

async function signin() {
  let username = signin_username.value;
  let password = signin_password.value;

  try {
    const response = await axios.post("http://localhost:3000/signin", {
      username: username,
      password: password,
    });
    const token = response.data;
    localStorage.setItem("token", token);
    alert(token);
    getuserinfo();
    signin_username.value = "";
    signin_password.value = "";
    issignin = true;
    render();
  } catch (e) {
    console.log(e);
    console.log("error occured");
  }
}

async function getuserinfo() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:3000/me", {
      headers: {
        token: token,
      },
    });

    user_info.innerHTML = `username:${response.data.username} 
       password:${response.data.password}`;
  } catch (e) {
    console.error(e);
  }
}
function render() {
  if (issignin) {
    user_dashboard.classList.remove("hide");
    document.querySelector(".signup").classList.add("hide");
  } else {
    user_dashboard.classList.add("hide");
    document.querySelector(".signup").classList.remove("hide");
  }
}

function logout() {
  localStorage.removeItem("token");
  issignin = false;
  render();
}
