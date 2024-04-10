const { Client } = require("pg");

const connect_client = () => {
  // * CONNECTING
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "todos",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL database");
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });
};

const close_connection = () => {
  // * CONNECTION CLOSING
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "todos",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  client
    .end()
    .then(() => {
      console.log("Connection to PostgreSQL closed");
    })
    .catch((err) => {
      console.error("Error closing connection", err);
    });
  return 0;
};

const create_db = async (name_of_person) => {
  // * CREATE DB using name_of_person
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "todos",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  const query = `CREATE TABLE ${name_of_person}_todo (
    userid SERIAL UNIQUE, 
    title VARCHAR(50) NOT NULL,
    details VARCHAR(200) NOT NULL,
    tags VARCHAR(20),
    date INT,
    month INT,
    year INT,
    reminder_time TIMESTAMP,
    status INT)`;
  try {
    await client.connect();
    await client.query(query);
    console.log("NEW TABLE CREATION SUCCESS");
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end(); // closes connection
  }
};

const select_data_from_db = async () => {
  // * SELECTING DATA from expenditure
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "todos",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  const query = `SELECT * FROM expenditure`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    // console.log(rows);
    console.log("FETCH | SUCCESS");
    return rows;
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end(); // closes connection
  }
};

const insert_data_to_db_authentication = async (name, mail_id, password) => {
  // * INSERTING DATA to expenditure
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "todos",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  try {
    await client.connect(); // gets connection
    await client.query(
      `INSERT INTO "authentication" ("name", "mailid","password")
             VALUES ($1, $2, $3)`,
      [name, mail_id, password]
    ); // sends queries
    console.log("USER CREATION SUCCESS");
    return true;
  } catch (error) {
    console.error(error.stack);
    console.log(name);
    return false;
  } finally {
    close_connection();
  }
};

const delete_data_from_db = async (id) => {
  //  * DELETING DATA from expenditure
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "todos",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  try {
    await client.connect(); // gets connection
    await client.query(`DELETE FROM "expenditure" WHERE "id" = $1`, [id]); // sends queries
    console.log("TASK | DELETED @ ", id);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end(); // closes connection
  }
};

async function utc_to_ist(date_time) {
  // Given UTC time
  const utcTime = new Date(date_time);

  // Convert UTC time to IST (Indian Standard Time)
  const istTime = utcTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // console.log(istTime); // Output: 08/04/2024, 17:25:15
  return istTime;
}

module.exports = {
  select_data_from_db,
  delete_data_from_db,
  utc_to_ist,
  insert_data_to_db_authentication,
  create_db,
};
