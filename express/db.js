import { config } from "dotenv";
config();
import mongoose from "mongoose";

const db = process.env.db
await mongoose.connect(process.env.DB).then(() => console.log('connected to mongoose:', db));





