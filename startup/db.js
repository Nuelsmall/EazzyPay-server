const mongoose = require('mongoose');
const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo connected');
    } catch (error) {
        console.log('mongo connection error');
    }
}


module.exports = {db}