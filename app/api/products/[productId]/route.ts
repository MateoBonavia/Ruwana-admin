import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Producto no encontrado" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[productId_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
