import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse, NextRequest } from "next/server";

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
        { status: 404 }
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
        { status: 404 }
      );
    }

    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (error) {
    console.log("[related_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
