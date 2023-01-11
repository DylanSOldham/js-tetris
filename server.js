let express = require("express");
let app = express();

app.use(express.static("./client"));

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});