import testsRouter from "./controllers/tests";
import express from "express"; // https://expressjs.com/en/advanced/best-practice-performance.html
import sequelizeDB from "./dao/database";
import bodyParser from "body-parser";
import { authenticateToken } from "./auth";
import openRouter from "./controllers/open";
import cors from "cors";
import cookieParser from "cookie-parser";
import { isProd } from "./utils/utils";
import decksRouter from "./controllers/decks";
import cardsRouter from "./controllers/cards";

require("dotenv").config();

const sequelize = sequelizeDB();
const app = express();
const host = "localhost";
const port = 3001;
const apiUrl = "/api";
// cron tasks
require("./scheduled-jobs/db-backup");

/**
 * For production:
 * build create-react-app with skill-test
 *
 * create build prod script
 */
if (isProd()) {
  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static("C:/ideaWorkspace/skill-test/build"));
}

app.use(
  cors({
    origin: (process.env.ORIGIN || "").split(","),
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// public routes
app.use("/", openRouter);

/**
 * here we validate the API key, by mounting this middleware to /api
 * meaning only paths prefixed with "/api" will cause this middleware to be invoked
 */
app.use(apiUrl, authenticateToken);
// private routes
app.use(apiUrl + "/tests", testsRouter);
app.use(apiUrl + "/decks", decksRouter);
app.use(apiUrl + "/cards", cardsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});

process.on("exit", function () {
  console.log("About to exit.");
});
