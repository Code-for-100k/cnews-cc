// ---------------------------------------------------------------------------
// Sanity CMS client — uses next-sanity for server-side fetching
// ---------------------------------------------------------------------------

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '@/lib/api/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// ---------------------------------------------------------------------------
// Image URL helper
// ---------------------------------------------------------------------------

const builder = imageUrlBuilder(client);

/**
 * Build a fully-qualified image URL from a Sanity image reference.
 *
 * Usage:
 *   <img src={urlFor(post.mainImage).width(800).url()} />
 */
export function urlFor(source: SanityImage) {
  return builder.image(source);
}
