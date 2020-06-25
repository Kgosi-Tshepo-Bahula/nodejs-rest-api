const constants = require("../constants/index");

const validateObjSchema = (validationSchema) => {
    return async (req, res, next) => {
        let response = { ...constants.defaultResponse }
        const request = await validateReqBody(req.body, validationSchema);
        // WIP
        if (request) {
            console.log(request);
            response.body = request;
            response.message = constants.requestValidationMessage.BAD_REQUEST;
            return res.status(response.status).send(response);
        }
        return next();
    }
}

const validateReqBody = async (payload, validationSchema) => {
    try {
        const value = await validationSchema.validateAsync(payload, { convert: false })
        console.log(JSON.stringify(value));
    }
    catch (err) {
        const errorDetails = err.details.map(value => {
            return {
                error: value.message,
                path: value.path
            }
        });
        return errorDetails;
    }
    return null;

}

const validateQueryParamsSchema = (validationSchema) => {
    return async (req, res, next) => {
        let response = { ...constants.defaultResponse }
        const request = await validateReqBody(req.query, validationSchema);
        // WIP
        if (request) {
            console.log(request);
            response.body = request;
            response.message = constants.requestValidationMessage.BAD_REQUEST;
            return res.status(response.status).send(response);
        }
        return next();
    }
}

module.exports = { validateObjSchema, validateQueryParamsSchema }