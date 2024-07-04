import GeneralOrders from "@/lib/models/GeneralOrders";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { customer, productsName, color, size, products, totalAmount } =
      await req.json();

    if (
      !customer ||
      !productsName ||
      !color ||
      !size ||
      !products ||
      !totalAmount
    ) {
      return new NextResponse("Missing Fields", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const newOrder = await GeneralOrders.create({
      customer,
      productsName,
      color,
      size,
      products,
      totalAmount,
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.log("[generalOrders_POST]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const collections = await GeneralOrders.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("[generalOrders_GET]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
};
