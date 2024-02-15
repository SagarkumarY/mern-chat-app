import  express  from "express";
import protectRouter from "../middleware/protectRouter.js";
import { getUsersForSidebar } from "../controller/usersController.js";
const router = express.Router();


router.get('/',protectRouter, getUsersForSidebar)









export default router;