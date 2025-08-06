import { Request, Response } from 'express';
import { connection } from '../config/database';

export class UserController {

  async list(req: Request, res: Response): Promise<Response> {

    const [rows] = await connection.query('SELECT * FROM usuarios');

    return res.status(200).json(rows);
  }

  async getById(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);

    if (rows.length === 0) {

      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    return res.status(200).json(rows[0]);
  }

  async getByNome(req: Request, res: Response): Promise<Response> {

    const nome = req.query.nome;
    
    const [rows]: any = await connection.query('SELECT * FROM usuarios WHERE nome = ?', [nome]);
    

    if (rows.length === 0) {
    
        return res.status(404).json({ mensagem: 'Usuário não achado.' });
    }

    return res.status(200).json(rows[0]);
  }

  async create(req: Request, res: Response): Promise<Response> {

    let { nome, email } = req.body;

    await connection.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email]);

    if (nome == "") {
      nome = null
    }

    if(!nome || !email) return res.status(400).json({ mensagem: "Nome ou email faltantes." })

    return res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  }

  async update(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;
    const { nome, email } = req.body;

    await connection.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);

    if(!nome || !email) return res.status(400).json({ mensagem: "Nome e email faltantes." })
    if(!id) return res.status(404).json({ mensagem: "Id não encontrado!" })

    return res.status(200).json({ mensagem: 'Usuário atualizado!' });
  }

  async delete(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if(!id) return res.status(404).json({ mensagem: "Id não encontrado!" })

    return res.status(204).send();
  }

  async login(req: Request, res: Response): Promise<Response> {

    const { nome, email } = req.body;

    const [rows]: any = await connection.query('SELECT * FROM usuarios WHERE nome = ? AND email = ?', [nome, email]);

    if (rows.length === 0) {

        return res.status(401).json({ mensagem: 'Nome ou senha incorretas.' });
    }
    
    return res.status(200).json({ mensagem: "Login realizado com sucesso", usuario: rows[0] });
  }
}