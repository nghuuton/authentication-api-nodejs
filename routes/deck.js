const Router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../middlewares/passport");

const {
  validateId,
  validationBody,
  schemas,
} = require("../middlewares/validation");

const DeckController = require("../controllers/deck");

Router.route("/")
  .get(passport.authenticate("jwt", { session: false }), DeckController.index)
  .post(
    validationBody(schemas.deckSchema),
    passport.authenticate("jwt", { session: false }),
    DeckController.createDeck
  );

Router.route("/:id")
  .get(
    validateId(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    DeckController.getDeck
  )
  .put(
    validateId(schemas.idSchema, "id"),
    validationBody(schemas.deckUpdate),
    passport.authenticate("jwt", { session: false }),
    DeckController.updateDeck
  )
  .delete(
    validateId(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    DeckController.deleteDeck
  );

module.exports = Router;
