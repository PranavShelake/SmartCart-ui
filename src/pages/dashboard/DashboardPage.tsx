import KpiCard from "./KpiCard";
import SalesChart from "./SalesChart";
import TopProducts from "./TopProducts";
import RecentOrders from "./RecentOrders";
import { kpiData } from "../../data/mockData";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <h2 className="text-[28px] font-bold text-white font-display leading-tight">Morning, Aryan</h2>
        <p className="text-slate-500 text-[14px] mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map(k => <KpiCard key={k.id} {...k} />)}
      </div>

      {/* Chart + Top Products */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8"><SalesChart /></div>
        <div className="col-span-4"><TopProducts /></div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}