import express, { Application } from "express"
import dogsRoutes from './routes/DogsRoutes';
import parentsRoutes from './routes/ParentsRoutes';

const app: Application = express()
const PORT: number = 3000

app.use(express.json())

app.use('/dogs', dogsRoutes);
app.use('/parents', parentsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})