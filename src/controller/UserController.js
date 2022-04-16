import UserModel from "../model/UserModel.js";
class UserController {
    async getOne(request, response) {
        const id = request.params.id;
        try {
            const user = await UserModel.findById(id);
            if (user) {
                return response.send(user);
            }
            response.status(404).send({ message: "User not found" });
        } catch (error) {
            //console.error(error.stack);
            response.status(400).send({ message: "Invalid id" });
        }
    }

    async index(request, response) {
        const users = await UserModel.find();
        response.send(users);
    }

    async remove(request, response) {
        const id = request.params.id;
        const user = await UserModel.findById(id);

        if (user) {
            await user.remove();
            return response.send({ message: "User Removed" });
        }
        response.status(404).send({ message: "User not found" });
    }

    async store(request, response) {
        const { name, email, birthDate, schedulingDay, schedulingTime } = request.body;

        const user = await UserModel.create({
            name,
            email,
            birthDate,
            schedulingDay,
            schedulingTime,
        });

        return response.send({ message: "User Created", user });
    }

    async update(request, response) {
        const id = request.params.id;
        const { name, email, birthDate, schedulingDay, schedulingTime } = request.body;

        const user = await UserModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                birthDate,
                schedulingDay,
                schedulingTim,
            },
            {
                new: true,
            }
        );

        return response.send(user);
    }
}

export default UserController;
