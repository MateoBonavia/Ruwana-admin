"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const GeneralOrders = () => {
  const router = useRouter();

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Ordenes Generales</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/generalOrders/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar nueva orden
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
    </div>
  );
};

export default GeneralOrders;
