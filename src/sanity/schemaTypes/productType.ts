import { TagIcon } from '@sanity/icons/Tag'
import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Auto-generated from title. Used in the product URL.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Lehngas', value: 'lehngas' },
          { title: 'Readymade Suits', value: 'readymade-suits' },
          { title: 'Fabric Suits', value: 'fabric-suits' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹ INR)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'discountedPrice',
      title: 'Sale Price (₹ INR) — leave blank if no discount',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      discountedPrice: 'discountedPrice',
      category: 'category',
      media: 'image',
    },
    prepare({ title, price, discountedPrice, category, media }) {
      const displayPrice = discountedPrice ?? price
      return {
        title,
        subtitle: [
          displayPrice != null ? `₹${displayPrice}` : null,
          category,
        ]
          .filter(Boolean)
          .join(' · '),
        media,
      }
    },
  },
})

