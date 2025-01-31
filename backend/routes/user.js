import express from 'express';
import { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById 
} from '../controllers/userController.js';

const router = express.Router();

router.route('/users')
    .get(getUsers)
    .post(createUser);

router.route('/users/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

export default router;
