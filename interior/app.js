if(process.env.NODE_ENV ==='development'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8800;
const router = require('./routers');

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})