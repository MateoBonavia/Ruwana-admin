import { connectToDB } from "../mongoDB";

export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await Customer.find({});
  return customers.length;
};
