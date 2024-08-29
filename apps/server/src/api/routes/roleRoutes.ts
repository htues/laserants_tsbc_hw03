import {Router} from 'express';
import * as roleController from '../controllers/roleController';

const router: Router = Router();

router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);

export default router;