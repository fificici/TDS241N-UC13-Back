import { Router } from 'express';
import { ParentsController } from '../controllers/ParentsController';

const parentsRoutes = Router();
const parentsController = new ParentsController();

parentsRoutes.get('/id/:id', (req, res) => parentsController.getParentById(req, res));
parentsRoutes.get('/name', (req, res) => parentsController.getByName(req, res));
parentsRoutes.get('/sex', (req, res) => parentsController.getBySex(req, res));
parentsRoutes.get('/breed', (req, res) => parentsController.getByBreed(req, res));
parentsRoutes.get('/', (req, res) => parentsController.listParents(req, res));

parentsRoutes.post('/', (req, res) => parentsController.createParent(req, res));
parentsRoutes.put('/:id', (req, res) => parentsController.updateParent(req, res));
parentsRoutes.delete('/:id', (req, res) => parentsController.deleteParent(req, res));

export default parentsRoutes;
