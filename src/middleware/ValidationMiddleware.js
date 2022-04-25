import joi from "joi";

const validationMiddleware = (request, response, next) => {
    const presenceParam = request.method === "POST" ? "required" : "optional";
    const validation = schema.validate(request.body, { presence: presenceParam }, { abortEarly: false });
    if (validation.error) {
        return response.status(400).send(validation.error.details);
    }
    next();
};

const schema = joi.object({
    name: joi.string().min(3).max(50),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }),
    birthDate: joi.date(),
    schedulingDay: joi.date().min("now"),
    schedulingTime: joi.date().min("now"),
    wasAttended: joi.string().optional().valid("yes", "no").default("no").failover("no"),
    //wasAttended: joi.alternatives().try(joi.string().optional().valid("yes", "no").failover("no")),
});

export default validationMiddleware;
