import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();

  const graphData = await getSalesPerMonth();

  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Panel</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Ingresos totales</CardTitle>
            <CircleDollarSign className="mx-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">$ {totalRevenue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total de ordenes</CardTitle>
            <ShoppingBag className="mx-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Clientes totales</CardTitle>
            <UserRound className="mx-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-10">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Gráfico de ventas ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
