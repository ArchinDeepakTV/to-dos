const cors = require("cors");
const express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

const app = express();
const PORT = process.env.PORT || 5050;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);
app.use(
  session({
    // set a custom name for the session cookie
    name: "_aravind_v_design",
    // a secure secret key for session encryption
    secret: "complex_secret_key",
    // ! NEED TO MAKE A KEY
    // Additional session configurations...
  })
);

const {
  select_data_from_db,
  delete_data_from_db,
  insert_data_to_db_authentication,
} = require("./postgres/postgre");

app.post("/DB-check-password", async (req, res) => {
  let { mail_id, password } = req.body;
  //   let response = await checkUser(); //   check if user exists.
  let response = 1;
  if (response === 1) res.status(200).json(`User with ${mail_id} found`); // if user exists
  if (response === 0) res.status(200).json(`User with ${mail_id} not found`); // if user doesn't exist
});

app.post("/DB-create-user", async (req, res) => {
  let { mail_id, password, name } = req.body;
  let response = await insert_data_to_db_authentication(
    name,
    mail_id,
    password
  );
  if (response) res.status(200).json(`User with ${mail_id} & ${name} created`);
  // after user creation
});

app.get("/", (req, res) => {
  res.status(200).json("Need to-DO SOMETHING");
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
