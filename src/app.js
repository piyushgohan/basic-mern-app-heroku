const express = require('express')
const app = express()
require('./database/database')



const port = process.env.port || 4000

app.use(require('./middleware/Authenticate'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    const path = require('path')
    
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname,"client", "index.html"))
    })
}

app.listen(port , ()=>{
console.log(`Server connected at port no ${port}`)
})
