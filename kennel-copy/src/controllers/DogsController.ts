import { Request, Response } from 'express';
import { connection } from '../configs/database';

export class DogsController {

    async listDogs(req: Request, res: Response): Promise<Response> {

        const [rows]: any = await connection.query(`
            SELECT 
            d.id AS dogId,
            d.name AS dogName,
            d.breed AS dogBreed,
            d.sex AS dogSex,
            d.age AS dogAge,
            d.price AS dogPrice,
        
            mom.id AS momId,
            mom.name AS momName,
            mom.breed AS momBreed,
            mom.sex AS momSex,
            mom.age AS momAge,
        
            dad.id AS dadId,
            dad.name AS dadName,
            dad.breed AS dadBreed,
            dad.sex AS dadSex,
            dad.age AS dadAge
        
            FROM dogs d
            LEFT JOIN parents mom ON d.idMom = mom.id
            LEFT JOIN parents dad ON d.idDad = dad.id
        `);

        return res.status(200).json(rows);
    }

    async getDogById(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        if (!id) return res.status(400).json({ mensagem: 'ID is required' });

        const [rows]: any = await connection.query('SELECT * FROM dogs WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Dog not found!' });
        }

        return res.status(200).json(rows[0]);
    }

    async getByName(req: Request, res: Response): Promise<Response> {

        const { name } = req.query;

        if (!name) return res.status(400).json({ mensagem: 'Name query param is required' });

        const [rows]: any = await connection.query('SELECT * FROM dogs WHERE name = ?', [name]);

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

        const [rows]: any = await connection.query('SELECT * FROM dogs WHERE sex = ?', [sex]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'No dogs found with specified sex!' });
        }

        return res.status(200).json(rows);
    }

    async getByBreed(req: Request, res: Response): Promise<Response> {

        const { breed } = req.query;

        if (!breed) return res.status(400).json({ mensagem: 'Breed query param is required!' });

        const [rows]: any = await connection.query('SELECT * FROM dogs WHERE breed = ?', [breed]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Breed not found!' });
        }

        return res.status(200).json(rows);
    }

    async getByIdMom(req: Request, res: Response): Promise<Response> {

        const { idMom } = req.query;

        if (!idMom) {
            return res.status(400).json({ mensagem: 'idMom query param is required!' });
        }

        const [rows]: any = await connection.query('SELECT * FROM dogs WHERE idMom = ?', [idMom]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'No dogs found with specified idMom!' });
        }

        return res.status(200).json(rows);
    }

    async getByIdDad(req: Request, res: Response): Promise<Response> {
        const { idDad } = req.query;

        if (!idDad) {
            return res.status(400).json({ mensagem: 'idDad query param is required!' });
        }

        const [rows]: any = await connection.query('SELECT * FROM dogs WHERE idDad = ?', [idDad]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'No dogs found with specified idDad!' });
        }

        return res.status(200).json(rows);
    }

    async createDog(req: Request, res: Response): Promise<Response> {

        const { name, breed, sex, age, price, idMom, idDad } = req.body;
        const validSex = ["M", "m", "F", "f"];

        if (!name || !breed || !sex || !age || !price || !idMom || !idDad) {
            return res.status(400).json({ mensagem: 'Incomplete data!' });
        }

        if (!validSex.includes(sex)) {
            return res.status(400).json({ mensagem: 'Type M for Male or F for Female!' });
        }

        await connection.query(
            'INSERT INTO dogs (name, breed, sex, age, price, idMom, idDad) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, breed, sex, age, price, idMom, idDad]
        );

        return res.status(201).json({ mensagem: 'Dog added!' });
    }

    async updateDog(req: Request, res: Response): Promise<Response> {

        const id =  Number(req.params.id)
        const { name, breed, sex, age, price, idMom, idDad } = req.body;
        const validSex = ["M", "m", "F", "f"];

        if (!id) return res.status(400).json({ mensagem: 'ID is required in params' });

        if (!name || !breed || !sex || !age || !price || !idMom || !idDad) {
            return res.status(400).json({ mensagem: 'Incomplete data!' });
        }

        if (!validSex.includes(sex)) {
            return res.status(400).json({ mensagem: 'Type M for Male or F for Female!' });
        }

        const [rows]: any = await connection.query('SELECT id FROM dogs WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Dog not found!' });
        }

        await connection.query(
            'UPDATE dogs SET name = ?, breed = ?, sex = ?, age = ?, price = ?, idMom = ?, idDad = ? WHERE id = ?',
            [name, breed, sex, age, price, idMom, idDad, id]
        );

        return res.status(200).json({ mensagem: 'Dog updated!' });
    }

    async deleteDog(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        if (!id) return res.status(400).json({ mensagem: 'ID is required in params!' });

        const [rows]: any = await connection.query('SELECT id FROM dogs WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Dog not found!' });
        }

        await connection.query('DELETE FROM dogs WHERE id = ?', [id]);

        return res.status(204).send();
    }
}
