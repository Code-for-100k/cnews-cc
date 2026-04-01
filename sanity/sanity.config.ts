// ---------------------------------------------------------------------------
// Sanity Studio configuration for cnews.cc
// ---------------------------------------------------------------------------

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import post from './schemas/post';
import author from './schemas/author';
import category from './schemas/category';
import glossaryTerm from './schemas/glossaryTerm';
import learnArticle from './schemas/learnArticle';
import ecosystemProject from './schemas/ecosystemProject';
import blockContent from './schemas/blockContent';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'cnews-cc-studio',
  title: 'cnews.cc — Canton Network Hub',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      // Block types
      blockContent,
      // Documents
      post,
      author,
      category,
      glossaryTerm,
      learnArticle,
      ecosystemProject,
    ],
  },
});
