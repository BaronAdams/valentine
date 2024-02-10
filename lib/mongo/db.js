import mongoose from "mongoose";
let db;

connect();

async function connect() {

  mongoose.set('strictQuery', true)
  if (db) return db;

  if (process.env.NODE_ENV === "production") {
    db = await mongoose.connect(process.env.MONGODB_URL, {
      dbName:'valentines'
    });
  } else {
    // in development, need to store the db connection in a global variable
    // this is because the dev server purges the require cache on every request
    // and will cause multiple connections to be made
    // if (!global.__db) {
       db = await mongoose.connect('mongodb://127.0.0.1:27017/valentine');
      //  global.__db
    // }
    // db = global.__db;
  }
  return db;
}

export { mongoose, connect };