import Joi from "joi";

const validationMiddleware = (request, response, next) => {
    const presenceParam = request.method === "POST" ? "required" : "optional";
    const validation = schema.validate(request.body, { presence: presenceParam }, { abortEarly: false });
    if (validation.error) {
        return response.status(400).send(validation.error.details);
    }
    next();
};

const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }),
    birthDate: Joi.date(),
    schedulingDay: Joi.date().min("now"),
    schedulingTime: Joi.date().min("now"),
});
export default validationMiddleware;
