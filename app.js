const Koa = require('Koa')
const app = new Koa()
require('dotenv').config()
const connectDB = require('./db/connect')
const MONGO_URI = process.env.MONGO_URI;
const BodyParser = require("koa-bodyparser");
const news = require('./routes/news')
app.use(BodyParser());
app.use(news.routes()).use(news.allowedMethods())

const start = async() =>{
    try{
        await connectDB(MONGO_URI)
        app.listen(
            3000, 
            console.log(`server is listening on port 3000...`)
        )
    }catch(err){
        console.log(err)
    }
}

start()