import { useEffect, useState } from "react";
import { PostComponent } from "./post";
import "./App.css";
/* 
function App() {
  return (
    <div style={{backgroundColor:"gray",height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",padding:50}}>
      <Postcomponent time= {"4mo"} followers = {23068} name = {"100xdevs"} description = {"put your headdown and workhard"}  />
      <Postcomponent time= {"4mo"} followers = {23068} name = {"100xdevs"} description = {"put your headdown and workhard"}  />

    </div>
  );
}

const style = { width: 300,  display: "flex" };

function Postcomponent(props) {
  return (
    <div style={{width:300,height:120,backgroundColor:"white",padding:10,display:"flex",flexDirection:"column",justifyContent:"center",borderRadius:10,margin:10}}>
      <div style={style}>
        <div>
          <img
            src="https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
            style={{ height: 50, width: 50, marginRight: 10 }}
          ></img>
        </div>
        <div>
          <p style={{ fontWeight: 40, marginTop:0,marginBottom:5 }}>{props.name}</p>
          <p style={{ fontWeight: 40, marginTop:0,marginBottom:5 }}>{props.followers} followers</p>
          <p style={{ fontWeight: 40, marginTop:0,marginBottom:5 }}>{props.time}</p>

        </div>
      </div>
      <div style={{marginTop:10}}>
      {props.description}
      </div>
    </div>
  );
} */
/* 
function App() {

  const[postdata,setpost] = useState([{
    name:"tarun",
    subtitle:"harkirat",
    time:"4mo",
    image:"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
    description: "hi anon,work your ass off and put your head down and just work hard if possible in silence dont talk to anyone "
  }])

 
  

  const post = postdata.map((post)=><PostComponent name={post.name} subtitle={post.subtitle} time={post.time} image={post.image} description={post.description} ></PostComponent>)

 function add(){
  setpost([...postdata,{
    name:"tarun",
    subtitle:"harkirat",
    time:"4mo",
    image:"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
    description: "hi anon,work your ass off and put your head down and just work hard if possible in silence dont talk to anyone "
  }])
    
 }
  return (
    <div style={{backgroundColor:"gray",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:50}}>
      <button onClick={add}>add</button>
      <div> {post}</div>
    </div>
  );
} */

/* function Toggle() {
  const [isrender, setrender] = useState(true);

  return (
    <div>
      <button onClick={() => setrender(!isrender)}>toggle</button> 
      {isrender && (
        <p>
          hi anon,work your ass off and put your head down and just work hard if
          possible in silence dont talk to anyone
        </p>
      )}
    </div>
  );
} */

/* function App() {
  const [count, setcount] = useState(0);

  useEffect(function () {
    setInterval(() => {
      setcount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(
    function () {
      console.log("count has changed :" + count);
    },
    [count]
  );

  return <div>{count}</div>;
} */

/* function App() {
  const [tab, settab] = useState("feed");

  return (
    <div>
      <button
        style={tab === "feed" ? { color: "red" } : {}}
        onClick={() => settab("feed")}
      >
        feed
      </button>
      <button
        style={tab === "notification" ? { color: "red" } : {}}
        onClick={() => settab("notification")}
      >
        notification
      </button>
      <button
        style={tab === "message" ? { color: "red" } : {}}
        onClick={() => settab("message")}
      >
        message
      </button>
      <button
        style={tab === "jobs" ? { color: "red" } : {}}
        onClick={() => settab("jobs")}
      >
        jobs
      </button>
    </div>
  );
} */

/* function App() {
  const [todo, settodo] = useState("");
  const [tab, settab] = useState("todo1");
  const [loading,setloading] = useState(true)
  useEffect(
    function () {
      setloading(true)
      fetch("https://jsonplaceholder.typicode.com/todos/1").then(
        async (res) => {
          const response = await res.json();
          setloading(false)
          settodo(response.title);
        }
      );
    },
    [tab]
  );

  return (
    <div>
      <button
        style={{
          backgroundColor: tab === "todo1" ? "black" : "white",
          border: "none",
          padding: 5,
          marginRight: 10,
          borderRadius: 5,
          color: tab === "todo1" ? "white" : "black",
        }}
        onClick={() => {
          settab("todo1");
        }}
      >
        todo-1
      </button>
      <button
        style={{
          backgroundColor: tab === "todo2" ? "black" : "white",
          border: "none",
          padding: 5,
          marginRight: 10,
          borderRadius: 5,
          color: tab === "todo2" ? "white" : "black",
        }}
        onClick={() => {
          settab("todo2");
        }}
      >
        todo-2
      </button>
      <button
        style={{
          backgroundColor: tab === "todo3" ? "black" : "white",
          border: "none",
          padding: 5,
          marginRight: 10,
          borderRadius: 5,
          color: tab === "todo3" ? "white" : "black",
        }}
        onClick={() => {
          settab("todo3");
        }}
      >
        todo-3
      </button>
      <button
        style={{
          backgroundColor: tab === "todo4" ? "black" : "white",
          border: "none",
          padding: 5,
          marginRight: 10,
          borderRadius: 5,
          color: tab === "todo4" ? "white" : "black",
        }}
        onClick={() => {
          settab("todo4");
        }}
      >
        todo-4
      </button>
      <br />
      <div>{loading?"loading...":(todo)}</div>
    </div>
  );
} */

function App() {
  return (
    <div>
      <Card children={<button>Test</button>}></Card>
      <Card><button>Test-2</button></Card>
    </div>
  );
}

//

function Card(props) {
  return (
    <div
      style={{
        border: 1.5,
        borderColor: "black",
        borderStyle: "dotted",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width:"fit-content"
      }}
    >
      {props.children}
    </div>
  );
}
export default App;
