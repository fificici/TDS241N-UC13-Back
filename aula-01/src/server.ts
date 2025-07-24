import express, { Application, Request, Response } from "express"

const app: Application = express()
const PORT: number = 3000

app.use(express.json())

app.get("/", (req: Request, res: Response): Response => {
    return res.json({ mensagem: "Olá Mundo!", nome: "Xexel Pica Seca" })
})

app.get("/:idade", (req: Request, res: Response): Response => {
    const idade: number = Number(req.params.idade)
    
    if (idade >= 18) {
        return res.json({ mensagem: "Parabéns, você é um lixo"})
    } else {
        return res.json({ mensagem: "Parabéns, você é um idiota"})
    }
})

app.listen(PORT, (): void => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})