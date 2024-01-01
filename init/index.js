const mongoose = require("mongoose");
const data = require("../init/data2.js");
const listnew = require("../model/data.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust")
}
main().then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log(err);
})


const initdb = async ()=>{
    await listnew.deleteMany({}) ;
    data.data = data.data.map((obj)=>({...obj, owner:"658e96181697fdab43db7efa"}))
    await listnew.insertMany(data.data);
    console.log("Data got inserted");
}

initdb();