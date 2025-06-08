const express=require("express");
const app=express();
const path=require("path");
const { v4 : uuidv4 }=require("uuid");
const methodOverride = require('method-override');


app.listen(8080,()=>{
    console.log("app is listening on port 8080");
});


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));




let posts=[{
    id:uuidv4(),
    username:"koushik@12",
    post:"Hello my name is koushik kumar mandal"
},
{
    id:uuidv4(),
    username:"souvik@68",
    post:"Hello my name is souvik"
},
{
    id:uuidv4(),
    username:"rohan@21",
    post:"Hello my name is rohan"
}
]







app.get("/post",(req,res)=>{
    res.render("home.ejs",{posts});
});


app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/post",(req,res)=>{
    let {username,post}=req.body;
    let id =uuidv4();
    posts.push({username,post,id});
    res.redirect("/post");
});

app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
    
});




app.patch("/post/:id", (req, res) => {
    const { id } = req.params;
    const newContent = req.body.post;
    const post = posts.find((p) => p.id === id);
    post.post = newContent;
    res.redirect("/post");
});



app.get("/post/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

app.delete("/post/:id",(req,res)=>{
let {id}=req.params;
posts = posts.filter((p) => p.id !== id);
res.redirect("/post");

});



