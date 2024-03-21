const express = require('express'); 
const app = express();  
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;  

dotenv.config();

app.get('/', (req, res) => {
    try {
        res.send('Server Started');
    }
    catch (err) {
        console.error(err);
    }
});

app.listen(port, (err) => {
    if (err) {
        console.error('Error in starting the server!!!', err);
    } else {
        console.log(`Server listening at http://localhost:${port}`);
    }
});
