import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import product from "./sanity/schemas/product";
import order from "./sanity/schemas/order";

export default defineConfig({
  name: "yesterdays-news",
  title: "Yesterday's News",
  projectId: "v2qh74v1",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [product, order],
  },
});
