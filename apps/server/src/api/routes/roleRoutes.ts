import {Router} from 'express';
import * as roleController from '../controllers/roleController.js';

const router: Router = Router();

router.get('/roles', roleController.getRoles);
router.get('/role/:id', roleController.getRoleById);
router.post('/role', roleController.createRole);
router.put('/role/:id', roleController.updateRole);
router.delete('/role/:id', roleController.deleteRole);

export default router;
