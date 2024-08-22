
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./db/mongoose')

app.use(express.json())


const routerUser = require("./routers/user")
const routerArticle = require('./routers/article')
app.use(routerUser)
app.use(routerArticle)


app.listen(port, () => { console.log("All Done Successfully") })






