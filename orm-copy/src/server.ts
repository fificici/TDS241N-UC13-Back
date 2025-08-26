import express, { Application } from "express"
import { AppDataSource } from "./config/data-source"
import userRoutes from "./routes/userRoutes"
import postRoutes from "./routes/postRoutes"

const app: Application = express()
const PORT: number = Number(process.env.PORT || 3000)

app.use(express.json())

app.use(userRoutes)
app.use(postRoutes)

app.use((req, res) => {
    res.status(404).send(404).send("<h1>404 Not Found</h1>")
})

AppDataSource.initialize().then(() => {

    console.log("Database connected successfully")
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("Database connection has failed", error)
})