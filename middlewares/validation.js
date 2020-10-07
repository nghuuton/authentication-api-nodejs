const Yup = require("yup");

const validationBody = (schema) => {
    return async (req, res, next) => {
        try {
            const result = await schema.validate(req.body);
            if (result) {
                if (!req.value) req.value = {};
                req.value.body = result;
                next();
            }
        } catch (error) {
            next(error);
        }
    };
};

const validateId = (schema, fieldId) => {
    return async (req, res, next) => {
        try {
            const result = await schema.validate(req.params[fieldId]);
            if (result) {
                if (!req.value) req.value = {};
                if (!req.value.params) req.value.params = {};
                req.value.params[fieldId] = result;
                next();
            }
        } catch (err) {
            next(err);
        }
    };
};

const schemas = {
    idSchema: Yup.string().matches(/^[0-9a-fA-F]{24}$/),
    userBody: Yup.object().shape({
        firstname: Yup.string().required("Firstname is required."),
        lastname: Yup.string().required("Lastname is required."),
        email: Yup.string().email("Invalid email format.").required("Email is required."),
        password: Yup.string().required("Password is required."),
    }),
    userSignIn: Yup.object().shape({
        email: Yup.string().email("In valid format email.").required("Email is required"),
        password: Yup.string().required("Password is required."),
    }),
    userUpdate: Yup.object().shape({
        firstname: Yup.string(),
        lastname: Yup.string(),
        email: Yup.string().email("In valid Email."),
    }),
    deckSchema: Yup.object().shape({
        name: Yup.string().required("Name is required."),
        description: Yup.string().required("Description is required."),
        owner: Yup.string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required("Id is required."),
    }),
    deckUpdate: Yup.object().shape({
        name: Yup.string(),
        description: Yup.string(),
        owner: Yup.string().matches(/^[0-9a-fA-F]{24}$/),
    }),
};

module.exports = { validationBody, schemas, validateId };
