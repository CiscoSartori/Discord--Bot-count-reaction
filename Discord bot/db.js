const { MongoClient } = require("mongodb");
const { ObjectId } = require ("mongodb");

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

module.exports = class db {
  
  static async insertOne(db, collection, data) {
    {
      try {
        const client = new MongoClient(uri);
        const database = await client.db(db).collection(collection);

        const log = await database.insertOne(data);

        await console.log("Saved");
        // await console.log(log);
        
        await client.close();

      } finally {
        await client.close();
      }
    }
  }

  static async findOne(db, collection, data) {
    {
      let id = {
        '_id': data._id
    }
      try {
        const client = new MongoClient(uri);
        const database = client.db(db).collection(collection);

        const log = await database.findOne(id);

        // await console.log(log);
        await client.close();
        return log
        
        
      } finally {
        await client.close();
      }
    }
  }


  static async find(db, collection) {
    {

      try {

        const client = new MongoClient(uri);
        const database = client.db(db).collection(collection);
        const log =  await database.find().toArray();

        // await console.log(log);
        await client.close();
        return log
        
        
      } finally {
        await client.close();
      }
    }
  }



  static async updateOne(db, collection, data) {
    const client = new MongoClient(uri);
    let update = {'$set':{
      'count':data.count
    }}
    let id = {
        '_id': data._id
    }
    {
      try {

        const database = client.db(db).collection(collection);

        const log = await database.updateOne(id, update);

        await console.log("Updated");
        // await console.log(log);

        await client.close();
      } finally {
        await client.close();
      }
    }
  }
  static async deleteMany (db, collection) {
    {
      try {
        const client = new MongoClient(uri);
        const database = await client.db(db).collection(collection);

        const log = await database.deleteMany();

        await console.log("Deleted");
        
        await client.close();
      } finally {
        await client.close();
      }
    }
  }




  static async count(db, collection, data) {
    {
      let id = {
        '_id': data._id
    }
      try {
        const client = new MongoClient(uri);
        const database = client.db(db).collection(collection);

        const log = await database.findOne(id);

        // await console.log(log);
        await client.close();
        return log
        
        
      } finally {
        await client.close();
      }
    }
  }









  static async findUserById(req, res) 
  {
     let id = new ObjectId(req) 
     console.log(id)
     console.log(`logging this... in api ${req}`)
     try {
         
       
         const client = await clientPromise;
         const db = client.db()
 
         //get details
         const details = await db.collection("Discord").find({_id:id})
        console.log(JSON.stringify(details))
         if (!details) {
             return res.status(402).json({ error: { message: 'Edit your Profile. No details found' } });
           }
 
         return res.json({details})
 
     } catch (error) {
         //return an error
         return res.json({
             message: new Error(error).message,
             success: false
         })
     }
 }







}