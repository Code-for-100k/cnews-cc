import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ecosystemProject',
  title: 'Ecosystem Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'DeFi', value: 'defi' },
          { title: 'Wallet', value: 'wallet' },
          { title: 'Infrastructure', value: 'infrastructure' },
          { title: 'Explorer', value: 'explorer' },
          { title: 'Exchange', value: 'exchange' },
          { title: 'Stablecoin', value: 'stablecoin' },
          { title: 'Tokenization', value: 'tokenization' },
          { title: 'Governance', value: 'governance' },
          { title: 'Identity', value: 'identity' },
          { title: 'Analytics', value: 'analytics' },
          { title: 'Development', value: 'development' },
          { title: 'Institutional', value: 'institutional' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Beta', value: 'beta' },
          { title: 'In Development', value: 'development' },
          { title: 'Announced', value: 'announced' },
        ],
        layout: 'radio',
      },
      initialValue: 'live',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter Handle',
      type: 'string',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'launchDate',
      title: 'Launch Date',
      type: 'date',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
