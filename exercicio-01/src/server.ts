import express, { Application, Request, Response } from "express"

const app: Application = express()
const PORT: number = 5001

app.use(express.json())

app.get("/", (req: Request, res: Response): Response => {

    return res.send(`<h1>🍆💦🍑Server rodando em http://localhost:${PORT}</h1>`)
})

app.get("/:nome", (req: Request, res: Response): Response => {

    const nome: string = req.params.nome
    
    return res.send(`<h1>Olá meu nome é ${nome}!</h1>`)
})

app.listen(PORT, (): void => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})