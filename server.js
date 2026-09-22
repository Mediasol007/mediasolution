const express=require("express");
const sqlite3=require("sqlite3").verbose();
const path=require("path");

const app=express();
const PORT=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const db=new sqlite3.Database("msbp.db");
db.run(`CREATE TABLE IF NOT EXISTS clients(
id INTEGER PRIMARY KEY AUTOINCREMENT,
client TEXT,
channel TEXT,
email TEXT,
plan TEXT
)`);

app.get("/",(req,res)=>{
db.all("SELECT * FROM clients ORDER BY id DESC",(e,rows)=>{
let html=`
<!DOCTYPE html><html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MSBP</title>
<style>
body{margin:0;font-family:Arial;background:#041a34;color:#fff}
.top{background:#2563eb;padding:20px 30px}
.wrap{padding:25px}
.card{background:#17386a;padding:20px;border-radius:12px;margin-bottom:20px}
input,select{width:100%;padding:12px;margin:8px 0;background:#0f2f5c;color:#fff;border:1px solid #31578a;border-radius:8px}
button{width:100%;padding:12px;background:#16a34a;color:#fff;border:none;border-radius:8px;font-size:16px}
table{width:100%;border-collapse:collapse;background:#102d57}
th,td{padding:12px;border:1px solid #29456d}
th{background:#163b71}
</style></head><body>
<div class="top"><h1>MEDIA SOLUTION</h1><div>Broadcast Panel</div></div>
<div class="wrap">

<div class="card">
<h2>Create Client</h2>
<form method="POST" action="/create-client">
<input name="client" placeholder="Client Name" required>
<input name="channel" placeholder="Channel Name" required>
<input name="email" type="email" placeholder="Email" required>
<select name="plan">
<option>Starter</option>
<option>Pro</option>
<option>Enterprise</option>
</select>
<button type="submit">SAVE CLIENT</button>
</form>
</div>

<div class="card">
<h2>Client List</h2>
<table>
<tr><th>ID</th><th>Client</th><th>Channel</th><th>Email</th><th>Plan</th></tr>`;

rows.forEach(r=>{
html+=`<tr>
<td>${r.id}</td>
<td>${r.client}</td>
<td>${r.channel}</td>
<td>${r.email}</td>
<td>${r.plan}</td>
</tr>`;
});

html+=`</table></div></div></body></html>`;
res.send(html);
});
});

app.post("/create-client",(req,res)=>{
const {client,channel,email,plan}=req.body;
db.run(
"INSERT INTO clients(client,channel,email,plan) VALUES(?,?,?,?)",
[client,channel,email,plan],
()=>res.redirect("/")
);
});

app.listen(PORT,"0.0.0.0",()=>console.log("MSBP Running :3000"));
