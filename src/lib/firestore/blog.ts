import { adminDb } from "@/lib/firebase-admin";
import { blogPosts as staticPosts } from "@/data/blog-posts";
import type { BlogPost } from "@/types";

const COL = "blog-posts";

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const snap = await adminDb
      .collection(COL)
      .where("status", "!=", "draft")
      .orderBy("status")
      .orderBy("publishedAt", "desc")
      .get();
    if (!snap.empty) return snap.docs.map(docToPost);
  } catch { /* fall through */ }
  return staticPosts;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const snap = await adminDb
      .collection(COL)
      .orderBy("publishedAt", "desc")
      .get();
    if (!snap.empty) return snap.docs.map(docToPost);
  } catch { /* fall through */ }
  return staticPosts;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const doc = await adminDb.collection(COL).doc(id).get();
    if (doc.exists) return docToPost(doc);
  } catch { /* fall through */ }
  return null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const snap = await adminDb
      .collection(COL)
      .where("slug", "==", slug)
      .limit(1)
      .get();
    if (!snap.empty) return docToPost(snap.docs[0]);
  } catch { /* fall through */ }
  return staticPosts.find((p) => p.slug === slug) ?? null;
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function createPost(data: Omit<BlogPost, "id">): Promise<string> {
  const ref = await adminDb.collection(COL).add({
    ...data,
    status:    data.status ?? "published",
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<void> {
  await adminDb.collection(COL).doc(id).set(
    { ...data, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function deletePost(id: string): Promise<void> {
  await adminDb.collection(COL).doc(id).delete();
}

export async function seedBlogPosts(): Promise<number> {
  const batch = adminDb.batch();
  for (const post of staticPosts) {
    const ref = adminDb.collection(COL).doc(post.id);
    batch.set(ref, { ...post, status: "published", updatedAt: new Date().toISOString() }, { merge: true });
  }
  await batch.commit();
  return staticPosts.length;
}

function docToPost(doc: FirebaseFirestore.DocumentSnapshot): BlogPost {
  return { id: doc.id, ...doc.data() } as BlogPost;
}
