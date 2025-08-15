import { Router } from 'express';
import { DogsController } from '../controllers/DogsController';

const dogsRoutes = Router();
const dogsController = new DogsController();


dogsRoutes.get('/id/:id', (req, res) => dogsController.getDogById(req, res));
dogsRoutes.get('/name', (req, res) => dogsController.getByName(req, res));
dogsRoutes.get('/sex', (req, res) => dogsController.getBySex(req, res));
dogsRoutes.get('/breed', (req, res) => dogsController.getByBreed(req, res));
dogsRoutes.get('/mom', (req, res) => dogsController.getByIdMom(req, res));
dogsRoutes.get('/dad', (req, res) => dogsController.getByIdDad(req, res));
dogsRoutes.get('/', (req, res) => dogsController.listDogs(req, res));


dogsRoutes.post('/', (req, res) => dogsController.createDog(req, res));
dogsRoutes.put('/:id', (req, res) => dogsController.updateDog(req, res));
dogsRoutes.delete('/:id', (req, res) => dogsController.deleteDog(req, res));

export default dogsRoutes;
