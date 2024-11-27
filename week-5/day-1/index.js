fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("div").innerHTML = JSON.stringify(data,null,2);
  })
  .catch(() => console.log("error"));
