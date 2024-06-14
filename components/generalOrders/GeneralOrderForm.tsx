"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";

const formSchema = z.object({
  costumer: z.string().min(2).max(20),
  products: z.string().min(2).max(30),
  color: z.string().min(2).max(10),
  size: z.string().min(2).max(10),
  quantity: z.coerce.number().min(1),
  totalAmount: z.coerce.number().min(1),
});

interface GeneralOrderFormProps {
  initialData?: GeneralOrderType | null;
}

const GeneralOrderForm: React.FC<GeneralOrderFormProps> = ({ initialData }) => {
  const router = useRouter();

  const initializeDefaultValues = (initialData: GeneralOrderType) => {
    if (initialData) {
      return {
        costumer: initialData.costumer,
        products: initialData.products,
        color: initialData.color,
        size: initialData.size,
        quantity: initialData.quantity,
        totalAmount: initialData.totalAmount,
      };
    }
    return {
      costumer: "",
      products: "",
      color: "",
      size: "",
      quantity: 0,
      totalAmount: 0,
    };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initializeDefaultValues(initialData!),
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = initialData
        ? `/api/generalOrders/${initialData._id}`
        : "/api/generalOrders";
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success(
          `Orden ${initialData ? "actualizada" : "creada"} exitosamente!`
        );
        window.location.href = "/generalOrders";
        router.push("/generalOrders");
        console.log(res);
      }
    } catch (error) {
      console.log("[GeneralOrders_POST]", error);
      toast.error("Algo salio mal! Por favor intente de nuevo.");
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Editar Orden</p>
          <Delete id={initialData._id} item="generalOrder" />
        </div>
      ) : (
        <p className="text-heading2-bold">Crear orden</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="costumer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cliente"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Producto"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Color"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tamaño</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tamaño"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Cantidad"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio total ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Precio total"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Guardar
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/generalOrders")}
              className="bg-red-1 text-white"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralOrderForm;
