const Router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const UserController = require("../controllers/user");

const { validationBody, schemas, validateId } = require("../middlewares/validation");

Router.route("/")
    .get(passport.authenticate("jwt", { session: false }), UserController.index)
    .post(
        validationBody(schemas.userBody),
        passport.authenticate("jwt", { session: false }),
        UserController.createUser
    );

Router.route("/:id")
    .get(
        validateId(schemas.idSchema, "id"),
        passport.authenticate("jwt", { session: false }),
        UserController.getUser
    )
    .put(
        validateId(schemas.idSchema, "id"),
        validationBody(schemas.userUpdate),
        passport.authenticate("jwt", { session: false }),
        UserController.updateUser
    );

Router.route("/signin").post(
    validationBody(schemas.userSignIn),
    passport.authenticate("local", { session: false }),
    UserController.signIn
);

Router.route("/signup").post(validationBody(schemas.userBody), UserController.signUp);

Router.route("/secret").post(
    passport.authenticate("jwt", { session: false }),
    UserController.secret
);

module.exports = Router;
