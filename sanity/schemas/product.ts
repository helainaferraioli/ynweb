import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: 'e.g. "32"W × 18"D × 30"H"',
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "string",
      description: 'e.g. "Solid walnut, brass hardware"',
    }),
    defineField({
      name: "condition",
      title: "Condition",
      type: "string",
      options: {
        list: [
          { title: "Excellent", value: "excellent" },
          { title: "Good", value: "good" },
          { title: "Fair", value: "fair" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "quantity_total",
      title: "Quantity Total",
      type: "number",
      initialValue: 1,
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: "quantity_available",
      title: "Quantity Available",
      type: "number",
      initialValue: 1,
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft",     value: "draft" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Live",      value: "live" },
          { title: "Sold Out",  value: "sold_out" },
          { title: "Archived",  value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "posted_at",
      title: "Posted At",
      type: "datetime",
      description: "Used to determine the 'New' badge (within 7 days of this date).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "photos.0",
      status: "status",
      price: "price",
    },
    prepare({ title, media, status, price }) {
      return {
        title,
        media,
        subtitle: `$${price} — ${status}`,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "postedAtDesc",
      by: [{ field: "posted_at", direction: "desc" }],
    },
  ],
});
