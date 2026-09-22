const express=require("express");
const path=require("path");
const sqlite3=require("sqlite3").verbose();

const app=express();
const db=new sqlite3.Database("./data/msbp.db");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

db.serialize(()=>{
db.run(`CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY,
username TEXT UNIQUE,
password TEXT
)`);

db.get("SELECT * FROM users WHERE username='admin'",(e,row)=>{
if(!row){
db.run("INSERT INTO users(username,password) VALUES('admin','admin123')");
}
});
});

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"views","login.html"));
});

app.post("/login",(req,res)=>{
const {username,password}=req.body;

db.get(
"SELECT * FROM users WHERE username=? AND password=?",
[username,password],
(err,row)=>{
if(row){
res.sendFile(path.join(__dirname,"views","index.html"));
}else{
res.send("<h2>Invalid Login</h2><a href='/'>Try Again</a>");
}
});
});

app.listen(3000,()=>{
console.log("MSBP Running :3000");
});
