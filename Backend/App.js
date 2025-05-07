const express = require("express");

const app = express();
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Book = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");


app.use(express.json());


const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

//  API routes
app.use("/api/v1", User);
app.use("/api/v1", Book); 
app.use("/api/v1",Favourite); 
app.use("/api/v1",Cart); 
app.use("/api/v1",Order); 

// Start server
app.listen(1000, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
