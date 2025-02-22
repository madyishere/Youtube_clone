import { getUserByToken, userLogin, userRegister } from '../Controller/user.controller.js';

function userRoutes(app) {
    app.post('/login', userLogin );
    app.post('/register', userRegister);
    app.get('/user', getUserByToken);
}

export default userRoutes;