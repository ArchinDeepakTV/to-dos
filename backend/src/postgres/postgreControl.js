const {
  delete_expenditure_from_db,
  data_insert_to_expendituredb,
  update_total_deletion,
  expendituredb_data_select_specific,
} = require("./postgre.js");

async function utc_to_ist(date_time) {
  // Given UTC time
  const utcTime = new Date(date_time);

  // Convert UTC time to IST (Indian Standard Time)
  const istTime = utcTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // console.log(istTime); // Output: 08/04/2024, 17:25:15
  return istTime;
}

function get_time() {
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    ", " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  console.log(datetime);
  return datetime;
}

module.exports = {
  utc_to_ist,
};
