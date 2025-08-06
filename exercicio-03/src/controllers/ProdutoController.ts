import { Request, Response } from "express"
import { Produto, produtos } from "../models/Produto"

export class ProdutoController {
    
    createProduto(req: Request, res: Response): Response {
       
        const { id, nome } = req.body;
        
        if (!id || !nome) {
            return res.status(400).json({ mensagem: "Falta o nome tlgd que ratiada" })
        }

        const produto = new Produto(id, nome)

        produtos.push(produto)

        return res.status(201).json({ mensagem: "Criou o produto mano boa joga mto", usuario: produto })
    }

    listAllProdutos(req: Request, res: Response): Response {
        return res.status(200).json({ mensagem: "Todos os produtos contaminados:", usuarios: produtos })
    }

    updateProduto(req: Request, res: Response): Response {

        const id: number = Number(req.params.id)
        const { nome } = req.body

        let produto = produtos.find( produto => produto.id === id)

        if (!nome) return res.status(400).json({ mensagem: "Falta nome tlgd que ratiada" })

        if (!produto) return res.status(404).json({ mensagem: "N tem esse produto q tu ta querendo" })

        produto.nome = nome

        return res.status(200).json({ mensagem: "Mudou o produto q queria malandrao", new_produto: produto })
    }

    deleteProduto(req: Request, res: Response): Response {

        const id: number = Number(req.params.id)

        let index = produtos.findIndex( produto => produto.id === id)

        if (index == -1) return res.status(404).json({ mensagem: "N tem esse produto q tu ta querendo" })

        produtos.splice(index, 1)

        return res.status(204).send()
    }
}
