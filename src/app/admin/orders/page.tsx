import { requirePermission } from "@/lib/admin-session";
import { getOrders } from "@/lib/firestore/orders";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatCents(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export default async function OrdersPage() {
  await requirePermission("manage_users"); // admin+ can see orders
  const orders = await getOrders(500);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.amountTotal ?? 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-lg font-semibold text-gray-900">Orders</h1>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-6">

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">{formatCents(totalRevenue, "usd")}</p>
          </div>
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Guide</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Stripe Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{order.name || "—"}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-xs max-w-[200px] truncate">{order.guideTitle}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatCents(order.amountTotal, order.currency || "usd")}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-gray-400 truncate max-w-[120px] block">{order.stripeSessionId}</span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No orders yet. Orders appear here automatically after each successful purchase.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
