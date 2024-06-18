import GeneralOrders from "@/lib/models/GeneralOrders";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { generalOrderId: String } }
) => {
  try {
    await connectToDB();

    const orderDetails = await GeneralOrders.findById(
      params.generalOrderId
    ).exec();

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), {
        status: 404,
      });
    }

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    console.log("[generalOrderId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
