import mongoose from "mongoose";

export async function connect() {
  mongoose.set('strictQuery', true)

  if (process.env.NODE_ENV === "production") {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        serverApi: { version: '1', strict: true, deprecationErrors: true },
        dbName:'valentines',
        useNewUrlParser: true,
      });
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Connected successfully to MongoDB")
    } catch (error) {
      console.log("Error in connecting database")
      throw new Error("An error has occurred! Please try again!");
    }finally{
      await mongoose.disconnect();
    }
  } else {
      mongoose.connect('mongodb://127.0.0.1:27017/valentine',{
        useNewUrlParser:true,
      })
      .then(()=>console.log("Connexion reussie"))
      .catch((error)=>console.log("Connexion echouée"))
  }

}