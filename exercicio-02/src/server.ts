import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

const middleware = (req: Request, res: Response, next: NextFunction) => {

    const dataReq: Date = new Date(); 

    console.log("")
    console.log(`Hora: ${dataReq.getHours()}`)
    console.log(`Horário da requisição: ${dataReq}`);
    console.log(`Requisição recebida em: ${req.url}`);

    if ((dataReq.getHours() > 19 && dataReq.getHours() <= 23) || (dataReq.getHours() >= 0 && dataReq.getHours() < 6)) {
        res.status(401).json({ mensagem: "Vai dormir" })
        return;
    }

    next(); 
};

app.use(middleware);
  

// 🔹 GET
app.get('/sobre', (req: Request, res: Response): Response => {
    
    const { nome, descricao } = req.body;
    const idade: number = Number(req.body.idade);

    if (!nome || !idade || !descricao) return res.status(400).json({ mensagem: 'Falta algo miga sua louca!' });

    return res.status(200).json({ nome: `${nome}`, idade: `${idade}`, descricao: `${descricao}` });
});

// 🔹 POST
app.post('/comentarios', (req: Request, res: Response): Response => {

    const { texto } = req.body;
  
    if (!texto) return res.status(400).json({ mensagem: 'Cade o texto migaaaa, esquecidinha!' });
  
    return res.status(201).json({ mensagem: `${texto}` });
});

// 🔹 DELETE
app.delete('/comentarios/:id', (req: Request, res: Response): Response => {

    const { id } = req.params;
  
    if (!id) return res.status(400).json({ mensagem: 'ID não enviado miga cadela' });
  
    return res.status(204).json({ mensagem: "Usuário excluído com sucesso!"});
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})