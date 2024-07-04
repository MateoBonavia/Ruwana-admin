import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse, NextRequest } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Producto no encontrado" }),
        { status: 404, headers: corsHeaders }
      );
    }

    // El $or es para buscar productos que tengan la misma categoría o colección que el producto actual.
    // El $in lo utilizamos ya que collections es un array, y tenemos que buscar si el valor está dentro de ese array.
    // Y con el $ne le decimos que no incluya el producto actual.
    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { collections: { $in: product.collections } },
      ],
      _id: { $ne: product._id },
    });

    if (!relatedProducts.length) {
      return new NextResponse(
        JSON.stringify({ message: "No se encontraron productos relacionados" }),
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(relatedProducts, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("[related_GET]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const dynamic = "force-dynamic";
