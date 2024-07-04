import Product from "@/lib/models/Product";
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
    await connectToDB();

    // Esta función sirve para buscar productos que contengan el query en el titulo, categoría o tags.
    //Funciona de la siguiente forma:
    // - $regex: params.query, $options: "i" -> busca el query en cualquier parte del string y no distingue entre mayúsculas y minúsculas.
    // - $in: [new RegExp(params.query, "i")] -> busca el query en un array.
    const searchedProducts = await Product.find({
      $or: [
        { title: { $regex: params.query, $options: "i" } },
        { category: { $regex: params.query, $options: "i" } },
        { tags: { $in: [new RegExp(params.query, "i")] } },
      ],
    });

    return NextResponse.json(searchedProducts, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("[search_GET]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const dynamic = "force-dynamic";
