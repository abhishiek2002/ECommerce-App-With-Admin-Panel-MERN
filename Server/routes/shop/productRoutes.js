import Express from 'express'
import { getFilterProducts } from '../../controllers/shop/ProductController.js';

const router = Express.Router();

router.get("/get", getFilterProducts);


export default router;