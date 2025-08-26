import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();
const userController = new UserController();

// Rotas de Usuários
routes.get('/users', userController.list);          // Listar todos
routes.get('/users/:id', userController.show);      // Mostrar um
routes.post('/users', userController.create);       // Criar
routes.patch('/users/:id', userController.update);  // Atualizar
routes.delete('/users/:id', userController.delete); // Deletar
routes.post('/login', userController.login)

export default routes;