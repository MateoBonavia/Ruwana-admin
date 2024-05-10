import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    // Si no hay userId, no puede realizar la operación ya que no esta autenticado.
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
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
      return new NextResponse("Missing Fields", { status: 400 });
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

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log("[products_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
