import { connect } from "mongoose"

export const connectDb = async () => {
  await connect(process.env.MONGO_URI as string);
  console.log("Database connected!");
}
