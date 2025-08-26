import { Router } from 'express';
import { PostController } from '../controllers/PostController';

const routes = Router();
const postController = new PostController();

// Rotas de Posts
routes.get('/posts', postController.list);          // Listar todos
routes.get('/posts/:id', postController.show);      // Mostrar um
routes.post('/posts', postController.create);       // Criar
routes.patch('/posts/:id', postController.update);  // Atualizar
routes.delete('/posts/:id', postController.delete); // Deletar

export default routes;