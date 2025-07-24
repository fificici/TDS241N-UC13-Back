import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

// 🔹 GET
app.get('/usuarios', (req: Request, res: Response): Response => {

  return res.status(200).json({ mensagem: 'Lista de usuários' });
});

// 🔹 POST
app.post('/usuarios', (req: Request, res: Response): Response => {

  const { nome } = req.body;

  if (!nome) return res.status(400).json({ mensagem: 'Nome é obrigatório!' });

  return res.status(201).json({ mensagem: `Usuário ${nome} criado com sucesso!` });
});

// 🔹 PUT
app.put('/usuarios/:id', (req: Request, res: Response): Response => {
 
  const id: number = Number(req.params.id);
  const { nome, email } = req.body;

  if (!id || !nome || !email) return res.status(400).json({ mensagem: "Falta tudo ou alguma coisa"});

  return res.status(200).json({ mensagem: `Usuário de id ${id} atualizado completamente!` });
});

// // 🔹 PATCH
// app.patch('/usuarios/:id', (req: Request, res: Response): Response => {

//   const id: number = Number(req.params.id);
//   const usuarioAtualizado = req.body;

//   if (!id) return res.status(400).json({ mensagem: 'ID é obrigatório!' });

//   return res.status(200).json({ mensagem: `Usuário de id ${id} atualizado completamente!` });
// });

// 🔹 DELETE
app.delete('/usuarios/:id', (req: Request, res: Response): Response => {

  const { id } = req.params;

  if (!id) return res.status(400).json({ mensagem: 'ID não enviado' });

  return res.status(204).json({ mmensagem: "Usuário excluído com sucesso!"}); // Sem conteúdo
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})