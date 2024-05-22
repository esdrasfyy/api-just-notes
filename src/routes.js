const express = require("express");

const routes = express.Router();

const AnnotationsController = require("./controllers/AnnotationController");
const PriorittyController = require("./controllers/PriorittyController");
const ContentController = require("./controllers/ContentController");
const RegisterController = require("./controllers/RegisterController");
const LoginController = require("./controllers/LoginController");
const checkAuthentication = require("./middlewares/authMiddleware");

module.exports = routes;
//rota annotaions
routes.post("/notes/:user", AnnotationsController.create);
routes.get("/user/:username", AnnotationsController.read);
routes.delete("/users/:user/:id", AnnotationsController.delete);
// rota priority
routes.get("/priorities", PriorittyController.read);
routes.post("/priorities/:user/:id", PriorittyController.update);

//rota content

routes.post("/users/:user/change/:id", ContentController.update);

//rota register

routes.post("/register", RegisterController.register);

routes.post("/req/login", LoginController.login);

routes.get("/auth/:username", checkAuthentication, LoginController.authLogin);
