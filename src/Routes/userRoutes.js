import { getUsers, createUsers, getUser, updateUser, deleteUser,  } from "../Controllers/userController.js";
import { registerUser } from "../Controllers/authController.js";

export const userRoutes = (app) => {

    //get all users
    app.route('/users')
        .get(getUsers)
        .post(createUsers);

    //get user by id
    app.route('/users/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser);
        

}

