import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Short Definition',
      type: 'text',
      rows: 3,
      description: 'A concise 1-2 sentence definition displayed in lists.',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'longDefinition',
      title: 'Long Definition',
      type: 'blockContent',
      description: 'A rich-text deep-dive shown on the term detail page.',
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: 'term' },
  },
  orderings: [
    {
      title: 'Alphabetical',
      name: 'termAsc',
      by: [{ field: 'term', direction: 'asc' }],
    },
  ],
});
