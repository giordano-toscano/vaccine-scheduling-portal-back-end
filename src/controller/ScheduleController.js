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
            console.error(error.stack);
            response.status(400).json({ message: "Invalid id" });
        }
    }

    async index(request, response) {
        const schedules = await ScheduleModel.find();
        response.json(schedules);
    }

    async remove(request, response) {
        const { id } = request.params;
        try {
            const schedule = await ScheduleModel.findById(id);
            if (!schedule) {
                return response.status(404).json({ message: "Schedule not found" });
            }
            await schedule.remove();
            response.json({ message: "Schedule removed" });
        } catch (error) {
            console.error(error.message);
            response.status(400).json({ message: "An unexpected error happened while trying to remove schedule" });
        }
    }

    async store(request, response) {
        const { name, email, birthDate, schedulingDay, schedulingTime } = request.body;
        try {
            const schedule = await ScheduleModel.create({
                name,
                email,
                birthDate,
                schedulingDay,
                schedulingTime,
            });
            return response.json({ message: "Schedule created", schedule: schedule });
        } catch (error) {
            response.status(400).json({ message: "Fields are invalid or missing" });
        }
    }

    async update(request, response) {
        const id = request.params.id;
        const { name, email, birthDate, schedulingDay, schedulingTime, wasAttended } = request.body;

        const schedule = await ScheduleModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                birthDate,
                schedulingDay,
                schedulingTime,
                wasAttended,
            },
            {
                new: true,
            }
        );

        return response.json(schedule);
    }
    //Retonar quantidade de schedules marcados para um determinado dia
    async getQuantityInDate(request, response) {
        const { schedulingDay } = request.params;
        try {
            const countDate = await ScheduleModel.find({ schedulingDay: schedulingDay }).count();

            response.json({ item: countDate });
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    //Retonar quantidade de schedules marcados para um determinado tempo em uma determinada data
    async getQuantityInTime(request, response) {
        const { schedulingDay, schedulingTime } = request.params;
        try {
            const countTime = await ScheduleModel.find({
                schedulingDay: schedulingDay,
                schedulingTime: schedulingTime,
            }).count();

            response.json({ item: countTime });
        } catch (error) {
            response.json({ message: error.message });
        }
    }
}

export default ScheduleController;
