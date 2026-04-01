// ---------------------------------------------------------------------------
// GROQ queries for Sanity CMS content
// ---------------------------------------------------------------------------

import { client } from './client';

// ---- Shared projections ----

const authorProjection = `{
  _id,
  name,
  "slug": slug.current,
  bio,
  image,
  twitter
}`;

const categoryProjection = `{
  _id,
  title,
  "slug": slug.current,
  description
}`;

const postProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  mainImage,
  "author": author->${authorProjection},
  "categories": categories[]->${categoryProjection},
  publishedAt,
  readingTime,
  seoTitle,
  seoDescription
}`;

const glossaryProjection = `{
  _id,
  term,
  "slug": slug.current,
  definition,
  longDefinition,
  "relatedTerms": relatedTerms[]->{ "slug": slug.current, term },
  seoTitle,
  seoDescription
}`;

const learnProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  difficulty,
  category,
  mainImage,
  "author": author->${authorProjection},
  readingTime,
  order,
  publishedAt,
  seoTitle,
  seoDescription
}`;

const ecosystemProjection = `{
  _id,
  name,
  "slug": slug.current,
  description,
  longDescription,
  category,
  website,
  logo,
  status,
  twitter,
  github,
  launchDate,
  tags
}`;

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export async function getAllPosts(limit = 50, offset = 0) {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [${offset}...${offset + limit}] ${postProjection}`,
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] ${postProjection}`,
    { slug },
  );
}

export async function getPostsByCategory(categorySlug: string, limit = 50) {
  return client.fetch(
    `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) [0...${limit}] ${postProjection}`,
    { categorySlug },
  );
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
}

// ---------------------------------------------------------------------------
// Glossary Terms
// ---------------------------------------------------------------------------

export async function getAllGlossaryTerms() {
  return client.fetch(
    `*[_type == "glossaryTerm"] | order(term asc) ${glossaryProjection}`,
  );
}

export async function getGlossaryTermBySlug(slug: string) {
  return client.fetch(
    `*[_type == "glossaryTerm" && slug.current == $slug][0] ${glossaryProjection}`,
    { slug },
  );
}

export async function getGlossaryTermSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "glossaryTerm"]{ "slug": slug.current }`);
}

// ---------------------------------------------------------------------------
// Learn Articles
// ---------------------------------------------------------------------------

export async function getAllLearnArticles() {
  return client.fetch(
    `*[_type == "learnArticle"] | order(order asc) ${learnProjection}`,
  );
}

export async function getLearnArticleBySlug(slug: string) {
  return client.fetch(
    `*[_type == "learnArticle" && slug.current == $slug][0] ${learnProjection}`,
    { slug },
  );
}

export async function getLearnArticlesByDifficulty(difficulty: string) {
  return client.fetch(
    `*[_type == "learnArticle" && difficulty == $difficulty] | order(order asc) ${learnProjection}`,
    { difficulty },
  );
}

export async function getLearnArticleSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "learnArticle"]{ "slug": slug.current }`);
}

// ---------------------------------------------------------------------------
// Ecosystem Projects
// ---------------------------------------------------------------------------

export async function getAllEcosystemProjects() {
  return client.fetch(
    `*[_type == "ecosystemProject"] | order(name asc) ${ecosystemProjection}`,
  );
}

export async function getEcosystemProjectBySlug(slug: string) {
  return client.fetch(
    `*[_type == "ecosystemProject" && slug.current == $slug][0] ${ecosystemProjection}`,
    { slug },
  );
}

export async function getEcosystemProjectsByCategory(category: string) {
  return client.fetch(
    `*[_type == "ecosystemProject" && category == $category] | order(name asc) ${ecosystemProjection}`,
    { category },
  );
}

export async function getEcosystemProjectSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "ecosystemProject"]{ "slug": slug.current }`);
}
