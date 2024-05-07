const express = require("express");
const cors = require("cors");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;

app.use('/api/create', require('./routes/auth'));
app.use('/api/help', require('./routes/helps'));

app.listen(port,()=>{   
    console.log(`listening on http://localhost:${port}`);
});