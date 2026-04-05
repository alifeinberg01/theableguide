/**
 * Firestore CRUD for FAQs, Testimonials, and Resources.
 * Each follows the same pattern: try Firestore first, fall back to static data.
 */

import { adminDb } from "@/lib/firebase-admin";
import { faqs as staticFaqs } from "@/data/faqs";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { resources as staticResources } from "@/data/resources";
import type { FAQItem, Testimonial, Resource } from "@/types";

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export async function getFaqs(): Promise<FAQItem[]> {
  try {
    const snap = await adminDb.collection("faqs").orderBy("category").get();
    if (!snap.empty) return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQItem));
  } catch { /* fall through */ }
  return staticFaqs;
}

export async function createFaq(data: Omit<FAQItem, "id">): Promise<string> {
  const ref = await adminDb.collection("faqs").add(data);
  return ref.id;
}

export async function updateFaq(id: string, data: Partial<FAQItem>): Promise<void> {
  await adminDb.collection("faqs").doc(id).set(data, { merge: true });
}

export async function deleteFaq(id: string): Promise<void> {
  await adminDb.collection("faqs").doc(id).delete();
}

export async function seedFaqs(): Promise<number> {
  const batch = adminDb.batch();
  for (const item of staticFaqs) {
    batch.set(adminDb.collection("faqs").doc(item.id), item, { merge: true });
  }
  await batch.commit();
  return staticFaqs.length;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const snap = await adminDb.collection("testimonials").orderBy("date", "desc").get();
    if (!snap.empty) return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
  } catch { /* fall through */ }
  return staticTestimonials;
}

export async function createTestimonial(data: Omit<Testimonial, "id">): Promise<string> {
  const ref = await adminDb.collection("testimonials").add(data);
  return ref.id;
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<void> {
  await adminDb.collection("testimonials").doc(id).set(data, { merge: true });
}

export async function deleteTestimonial(id: string): Promise<void> {
  await adminDb.collection("testimonials").doc(id).delete();
}

export async function seedTestimonials(): Promise<number> {
  const batch = adminDb.batch();
  for (const item of staticTestimonials) {
    batch.set(adminDb.collection("testimonials").doc(item.id), item, { merge: true });
  }
  await batch.commit();
  return staticTestimonials.length;
}

// ─── Resources ────────────────────────────────────────────────────────────────

export async function getResources(): Promise<Resource[]> {
  try {
    const snap = await adminDb.collection("resources").orderBy("category").get();
    if (!snap.empty) return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Resource));
  } catch { /* fall through */ }
  return staticResources;
}

export async function createResource(data: Omit<Resource, "id">): Promise<string> {
  const ref = await adminDb.collection("resources").add(data);
  return ref.id;
}

export async function updateResource(id: string, data: Partial<Resource>): Promise<void> {
  await adminDb.collection("resources").doc(id).set(data, { merge: true });
}

export async function deleteResource(id: string): Promise<void> {
  await adminDb.collection("resources").doc(id).delete();
}

export async function seedResources(): Promise<number> {
  const batch = adminDb.batch();
  for (const item of staticResources) {
    batch.set(adminDb.collection("resources").doc(item.id), item, { merge: true });
  }
  await batch.commit();
  return staticResources.length;
}
