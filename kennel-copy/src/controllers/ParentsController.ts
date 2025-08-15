import { Request, Response } from 'express';
import { connection } from '../configs/database';

export class ParentsController {

  async listParents(req: Request, res: Response): Promise<Response> {

    const [rows] = await connection.query('SELECT * FROM parents');

    return res.status(200).json(rows);
  }

  async getParentById(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    if (!id) return res.status(400).json({ mensagem: 'ID is required' });

    const [rows]: any = await connection.query('SELECT * FROM parents WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Parent not found!' });
    }

    return res.status(200).json(rows[0]);
  }

  async getByName(req: Request, res: Response): Promise<Response> {

    const { name } = req.query;

    if (!name) return res.status(400).json({ mensagem: 'Name query param is required' });

    const [rows]: any = await connection.query('SELECT * FROM parents WHERE name = ?', [name]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Name not found!' });
    }

    return res.status(200).json(rows);
  }

  async getBySex(req: Request, res: Response): Promise<Response> {

    const { sex } = req.query;
    const validSex = ["M", "m", "F", "f"];

    if (!sex) return res.status(400).json({ mensagem: 'Sex query param is required!' });

    if (!validSex.includes(sex as string)) {
      return res.status(400).json({ mensagem: 'Type M for Male or F for Female!' });
    }

    const [rows]: any = await connection.query('SELECT * FROM parents WHERE sex = ?', [sex]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'No parents found with specified sex!' });
    }

    return res.status(200).json(rows);
  }

  async getByBreed(req: Request, res: Response): Promise<Response> {

    const { breed } = req.query;

    if (!breed) return res.status(400).json({ mensagem: 'Breed query param is required!' });

    const [rows]: any = await connection.query('SELECT * FROM parents WHERE breed = ?', [breed]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Breed not found!' });
    }

    return res.status(200).json(rows);
  }

  async createParent(req: Request, res: Response): Promise<Response> {

    const { name, breed, sex, age } = req.body;
    const validSex = ["M", "m", "F", "f"];

    if (!name || !breed || !sex || !age) {
      return res.status(400).json({ mensagem: 'Incomplete data!' });
    }

    if (!validSex.includes(sex)) {
      return res.status(400).json({ mensagem: 'Type M for Male or F for Female!' });
    }

    await connection.query(
      'INSERT INTO parents (name, breed, sex, age) VALUES (?, ?, ?, ?)',
      [name, breed, sex, age]
    );

    return res.status(201).json({ mensagem: 'Parent added!' });
  }

  async updateParent(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;
    const { name, breed, sex, age } = req.body;
    const validSex = ["M", "m", "F", "f"];

    if (!id) return res.status(400).json({ mensagem: 'ID is required in params!' });

    if (!name || !breed || !sex || !age) {
      return res.status(400).json({ mensagem: 'Incomplete data!' });
    }

    if (!validSex.includes(sex)) {
      return res.status(400).json({ mensagem: 'Type M for Male or F for Female!' });
    }

    const [rows]: any = await connection.query('SELECT id FROM parents WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Parent not found!' });
    }

    await connection.query(
      'UPDATE parents SET name = ?, breed = ?, sex = ?, age = ? WHERE id = ?',
      [name, breed, sex, age, id]
    );

    return res.status(200).json({ mensagem: 'Parent updated!' });
  }

  async deleteParent(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    if (!id) return res.status(400).json({ mensagem: 'ID is required in params!' });

    const [rows]: any = await connection.query('SELECT id FROM parents WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Parent not found!' });
    }

    await connection.query('DELETE FROM parents WHERE id = ?', [id]);

    return res.status(204).send();
  }
}
