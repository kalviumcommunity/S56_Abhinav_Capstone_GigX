const express = require('express'); 
const app = express();  
const dotenv = require('dotenv');
const cors = require('cors');  
const port = process.env.PORT || 3000;  
const { connectDB, mongooseConnect } = require('./db')

const router = require('./routes');
app.use(express.json());
app.use(cors());
connectDB();
dotenv.config();

app.get('/', (req, res) => {
    try {
        const connectionStatus = mongooseConnect();
        if (connectionStatus ) {
            res.send('MongoDB Connected Successfully');
        }
        
    }
    catch (err) {
        res.send("MongoDB Connection Failed");
    }
});
app.use(router);

app.listen(port, (err) => {
    if (err) {
        console.error('Error in starting the server!!!', err);
    } else {
        console.log(`Server listening at http://localhost:${port}`);
    }
});
