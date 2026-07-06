import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("Connected");

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(collections);

    const count = await mongoose.connection.db
      .collection("products")
      .countDocuments();

    console.log("Product Count:", count);

    const first = await mongoose.connection.db
      .collection("products")
      .findOne();

    console.log(first);
});


  