import ScheduleModel from "../model/ScheduleModel.js";

class ScheduleController {
    async getOne(request, response) {
        const id = request.params.id;
        try {
            const schedule = await ScheduleModel.findById(id);
            if (schedule) {
                return response.json(schedule);
            }
            response.status(404).json({ message: "Schedule not found" });
        } catch (error) {
            //console.error(error.stack);
            response.status(400).json({ message: "Invalid id" });
        }
    }

    async index(request, response) {
        const schedules = await ScheduleModel.find();
        response.json(schedules);
    }

    async remove(request, response) {
        const id = request.params.id;
        const schedule = await ScheduleModel.findById(id);

        if (schedule) {
            await schedule.remove();
            return response.send({ message: "Schedule removed" });
        }
        response.status(404).json({ message: "Schedule not found" });
    }

    async store(request, response) {
        const { name, email, birthDate, schedulingDay, schedulingTime } = request.body;

        const schedule = await ScheduleModel.create({
            name,
            email,
            birthDate,
            schedulingDay,
            schedulingTime,
        });

        return response.json({ message: "Schedule created", schedule: schedule });
    }

    async update(request, response) {
        const id = request.params.id;
        const { name, email, birthDate, schedulingDay, schedulingTime } = request.body;

        const schedule = await ScheduleModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                birthDate,
                schedulingDay,
                schedulingTime,
            },
            {
                new: true,
            }
        );

        return response.json(schedule);
    }
}

export default ScheduleController;
