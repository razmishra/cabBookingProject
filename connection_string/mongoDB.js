
const mongoose = require("mongoose")
const dbURI = "mongodb://0.0.0.0:27017/cabBookingDatabase"
mongoose.connect(dbURI);

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))

db.once('open', function(){
    console.log('connection successful')
});

//Handle the process termination
const handleTermination = ()=>{
    console.log("Disconnected from the database")
    mongoose.connection.close(()=>{
        process.exit(0);
    })
};

// sigint is a signal that is sent to a process when the user presses ctrl+c in terminal. It is often used to graceffullt terminate a process.
process.on('SIGINT', handleTermination);

//sigterm is a signal that is sent to a process to request its termination.
process.on('SIGTERM', handleTermination);


const connectWithRetry = ()=>{
    console.log("Connection lost,attempting to reconnect...");
    setTimeout(()=>{
        mongoose.connect(dbURI);
        console.log("Reconnected to the database")
    },5000)
}
db.on('disconnected', connectWithRetry)