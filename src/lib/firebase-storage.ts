import { adminStorage } from "./firebase-admin";

/**
 * Uploads a Buffer to Firebase Storage and returns the public HTTPS URL.
 * The file is made publicly readable so it can be linked in emails.
 */
export async function uploadToStorage(
  buffer: Buffer,
  destination: string, // e.g. "guides/disney-world/guide.pdf"
  contentType: string
): Promise<string> {
  const bucket = adminStorage.bucket();
  const file   = bucket.file(destination);

  await file.save(buffer, {
    metadata:    { contentType },
    resumable:   false,
  });

  // Make the file publicly readable
  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${destination}`;
}

/**
 * Deletes a file from Firebase Storage.
 * Silently ignores "not found" errors.
 */
export async function deleteFromStorage(destination: string): Promise<void> {
  try {
    const bucket = adminStorage.bucket();
    await bucket.file(destination).delete();
  } catch {
    // ignore
  }
}

/**
 * Extracts the storage path from a public Storage URL.
 * e.g. "https://storage.googleapis.com/bucket/guides/foo.pdf" → "guides/foo.pdf"
 */
export function storagePathFromUrl(url: string): string | null {
  try {
    const u    = new URL(url);
    const parts = u.pathname.split("/");
    // pathname = /bucket-name/path/to/file  — drop leading slash + bucket name
    return parts.slice(2).join("/");
  } catch {
    return null;
  }
}
