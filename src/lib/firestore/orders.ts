import { adminDb } from "@/lib/firebase-admin";
import type { Order } from "@/types";

export async function getOrders(limit = 200): Promise<Order[]> {
  const snap = await adminDb
    .collection("orders")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => ({ ...d.data() } as Order));
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  const snap = await adminDb
    .collection("orders")
    .where("email", "==", email)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => ({ ...d.data() } as Order));
}
