const { MongoClient } = require('mongodb');

let dbConnection;
let client;

let uri = 'mongodb+srv://tauseef:123456765@cluster0.w6xiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((mongoClient) => {
            client = mongoClient;
            dbConnection = client.db("yousafzai_db"); // ✅ Connects specifically to yousafzai_db
            console.log("Connected to MongoDB Atlas, Database: yousafzai_db");
            cb(null);
        })
        .catch(err => {
            console.error("MongoDB connection error:", err);
            cb(err);
        });
    },

    getDb: () => {
        if (!dbConnection) {
            throw new Error("Database not initialized. Call connectToDb() first.");
        }
        return dbConnection;
    },

    closeDb: () => {
        if (client) {
            client.close()
                .then(() => console.log("MongoDB connection closed"))
                .catch(err => console.error("Error closing MongoDB connection:", err));
        }
    }
};
