import { Router } from 'express';

import OrphanageController from './controllers/OrphanageController';

// Query params = req.query;  http://localhost:3333/user?name=gabriel
// Route params = req.params; http://localhost:3333/user/1
// Body = req.body;

const routes = Router();

// Rotas para gerenciamento dos orfanatos
routes.get("/orphanages", OrphanageController.index);
routes.post("/orphanages", OrphanageController.store);
routes.get("/orphanages/:id", OrphanageController.show);
routes.put("/orphanages/:id", OrphanageController.update);
routes.delete("/orphanages/:id", OrphanageController.delete);


export default routes;