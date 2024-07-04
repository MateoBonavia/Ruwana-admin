import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

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
    const { userId } = auth();

    // Si no hay userId, no puede realizar la operación ya que no esta autenticado.
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    await connectToDB();

    // Extraemos los datos del producto.
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    // Estos datos son obligatorios, por lo que si alguno de estos falta no se realiza el POST.
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Missing Fields", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Creamos el producto.
    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);

        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newProduct, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.log("[products_POST]", error);
    return new NextResponse("Internal Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(products, { status: 200, headers: corsHeaders });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const dynamic = "force-dynamic";
