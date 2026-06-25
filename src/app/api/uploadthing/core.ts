import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  photoUploader: f({ image: { maxFileSize: "10MB", maxFileCount: 6 } })
    .middleware(() => ({}))
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
