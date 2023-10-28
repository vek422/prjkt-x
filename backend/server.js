const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose.connect(process.env.DATABASE);
mongoose.connection.on("error", (err) => {
  console.log(`Error -> : ${err.message}`);
});

const PORT = process.env.PORT;
app.set("port", PORT || 8888);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running : PORT ${server.address().port}`);
});
