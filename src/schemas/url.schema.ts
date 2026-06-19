import Joi from "joi";

const urlSchema = Joi.object({
    url: Joi.string().uri({ scheme: ['http', 'https'] }).required()
});

export default urlSchema;