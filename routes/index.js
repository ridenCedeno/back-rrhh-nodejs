const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ErrorMiddleware } = require("../middleware");
// const swaggerUI = require("swagger-ui-express");
//const authMiddleware = require("../middlewares/auth.middleware");
// const { SWAGGER_PATH } = require("../config");
//const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({
  ExampleRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter.use(express.json()).use(cors()).use(morgan("dev")).use(express.urlencoded({ extended: true }));
  apiRouter.use("/example", ExampleRoutes);

  router.use("/v1/api", apiRouter);
  router.use("/", (req, res) => {
    res.send("v.0.1.0.3");
  });
  //router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  //router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
