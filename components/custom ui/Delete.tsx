"use client";
import React, { useState } from "react";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.href = "/collections";
        toast.success("Colección eliminada!");
        setLoading(false);
      }
    } catch (error) {
      console.log("[collectionId_DELETE]", error);
      toast.error("Algo salio mal. Por favor intenta de nuevo.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Estas segura que queres eliminar esta colección?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto va a borrar permanentemente
            tu collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
