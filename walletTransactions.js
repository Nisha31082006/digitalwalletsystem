require("dotenv").config();
const { MongoClient } = require("mongodb");

async function main() {
  const client = new MongoClient(process.env.MONGO_DB_URI);

  try {
    await client.connect();
    console.log("MongoDB connected successfully");

    const db = client.db();
    const transactions = db.collection("transactions");

await transactions.updateOne(
  { transactionId: "WT01" },
  {
    $setOnInsert: {
      transactionId: "WT01",
      walletHolder: "Arun",
      amount: 2000,
      transactionType: "Credit"
    }
  },
  { upsert: true }
);

await transactions.updateOne(
  { transactionId: "WT03" },
  {
    $setOnInsert: {
      transactionId: "WT03",
      walletHolder: "Kavi",
      amount: 1500,
      transactionType: "Credit"
    }
  },
  { upsert: true }
);

    await transactions.insertOne({
      transactionId: "WT02",
      walletHolder: "Priya",
      amount: 3000,
      transactionType: "Credit"
    });

    console.log("Transaction WT02 inserted");

    
    const updateResult = await transactions.updateOne(
      { transactionId: "WT01" },
      { $set: { transactionType: "Debit" } }
    );

    console.log("WT01 updated:", updateResult.modifiedCount);

    
    const deleteResult = await transactions.deleteOne({
      transactionId: "WT03"
    });

    console.log("WT03 deleted:", deleteResult.deletedCount);

    
    const allTransactions = await transactions.find({}).toArray();
    console.log("Remaining transactions:", allTransactions);

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await client.close();
  }
}

main();
