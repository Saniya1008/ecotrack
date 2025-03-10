const express = require('express');
const connectDb = require('./config/db');
const authRoute = require('./routes/Auth') 
const emissionRouter = require('./routes/emissions');
const carbonNeutrality = require('./routes/carbonNeutrality');
const CoalDataRoute = require('./routes/CoalDataRoute'); 


const app = express();




connectDb();

const cors = require('cors');
app.use(cors());

app.use(express.json());


app.use('/api/auth',authRoute);
app.use('/api/emissions', emissionRouter);
app.use('/api/carbonNeutrality',carbonNeutrality);
app.use('/api/coaldata',CoalDataRoute);



const port = 5000;



app.listen(port,()=> {
    console.log(`Server running on port ${port}`);
});

