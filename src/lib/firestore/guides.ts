import { adminDb } from "@/lib/firebase-admin";
import { guides as staticGuides } from "@/data/guides";
import type { Guide } from "@/types";

const COL = "guides";

// ─── Read ─────────────────────────────────────────────────────────────────────

/** Returns all published guides. Falls back to static data if Firestore is empty. */
export async function getPublishedGuides(): Promise<Guide[]> {
  try {
    const snap = await adminDb
      .collection(COL)
      .where("status", "!=", "draft")
      .orderBy("status")
      .orderBy("publishedAt", "desc")
      .get();
    if (!snap.empty) return snap.docs.map(docToGuide);
  } catch { /* fall through */ }
  return staticGuides;
}

/** Returns ALL guides (published + draft) for the admin panel. */
export async function getAllGuides(): Promise<Guide[]> {
  try {
    const snap = await adminDb
      .collection(COL)
      .orderBy("publishedAt", "desc")
      .get();
    if (!snap.empty) return snap.docs.map(docToGuide);
  } catch { /* fall through */ }
  return staticGuides;
}

export async function getGuideById(id: string): Promise<Guide | null> {
  try {
    const doc = await adminDb.collection(COL).doc(id).get();
    if (doc.exists) return docToGuide(doc);
  } catch { /* fall through */ }
  return null;
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  // Try Firestore first
  try {
    const snap = await adminDb
      .collection(COL)
      .where("slug", "==", slug)
      .limit(1)
      .get();
    if (!snap.empty) return docToGuide(snap.docs[0]);
  } catch { /* fall through */ }
  // Fallback to static data
  return staticGuides.find((g) => g.slug === slug) ?? null;
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function createGuide(data: Omit<Guide, "id">): Promise<string> {
  const ref = await adminDb.collection(COL).add({
    ...data,
    status:    data.status ?? "published",
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateGuide(id: string, data: Partial<Guide>): Promise<void> {
  await adminDb.collection(COL).doc(id).set(
    { ...data, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function deleteGuide(id: string): Promise<void> {
  await adminDb.collection(COL).doc(id).delete();
}

/** One-time: seeds Firestore from the static guides.ts file. Safe to call multiple times. */
export async function seedGuides(): Promise<number> {
  const batch = adminDb.batch();
  for (const guide of staticGuides) {
    const ref = adminDb.collection(COL).doc(guide.id);
    batch.set(ref, { ...guide, status: "published", updatedAt: new Date().toISOString() }, { merge: true });
  }
  await batch.commit();
  return staticGuides.length;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function docToGuide(doc: FirebaseFirestore.DocumentSnapshot): Guide {
  return { id: doc.id, ...doc.data() } as Guide;
}
