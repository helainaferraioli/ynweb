"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>({
  url: "/api/uploadthing",
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "inherit",
  fontSize: "1rem",
  padding: "0.75rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.3)",
  background: "transparent",
  color: "#fff",
  outline: "none",
};

type PhotoEntry = {
  id: string;
  name: string;
  localUrl: string;
  uploadedUrl: string | null;
  status: "uploading" | "done" | "error";
};

export default function WeBuyContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "", phone: "", zip: "", furnitureCount: "", message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (overlayRef.current) observer.observe(overlayRef.current);
    return () => observer.disconnect();
  }, []);

  const { startUpload } = useUploadThing("photoUploader", {
    onClientUploadComplete: (files) => {
      files.forEach((f) => {
        setPhotos((prev) =>
          prev.map((p) =>
            p.name === f.name ? { ...p, uploadedUrl: f.url, status: "done" } : p
          )
        );
      });
    },
    onUploadError: () => {
      setPhotos((prev) =>
        prev.map((p) => p.status === "uploading" ? { ...p, status: "error" } : p)
      );
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const remaining = 6 - photos.length;
    const toAdd = files.slice(0, remaining);

    // Show local previews immediately
    const entries: PhotoEntry[] = toAdd.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      localUrl: URL.createObjectURL(file),
      uploadedUrl: null,
      status: "uploading",
    }));
    setPhotos((prev) => [...prev, ...entries]);

    await startUpload(toAdd);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.localUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const uploadedUrls = photos.filter((p) => p.uploadedUrl).map((p) => p.uploadedUrl!);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photos: uploadedUrls }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact-form" className="relative flex flex-col md:flex-row">

      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/we%20buy/contact%20us%20photo.jpg"
          alt="Yesterday's News"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Form LEFT — slides in from left */}
      <div
        ref={overlayRef}
        className="relative flex flex-col justify-center gap-8 px-14 py-16 md:w-1/2"
        style={{
          backgroundColor: "rgba(0,0,0,0.78)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {status === "success" ? (
          <p className="font-serif text-2xl leading-relaxed text-white">
            Thanks — we&apos;ll be in touch within one business day.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
                Get in Touch
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
                Tell us what you have.
              </h2>
              <p className="font-serif text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Prefer to talk? Call or text us at 917-375-1361 — you can send photos right to that number.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <style>{`.we-buy-input::placeholder{color:rgba(255,255,255,0.45);opacity:1}.we-buy-input option{color:#1a0a0e;background:#fff}`}</style>

              <input required type="text" placeholder="First & last name" className="we-buy-input" style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} />
              <input required type="tel" placeholder="Phone number" className="we-buy-input" style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              <input required type="text" placeholder="Zip code" className="we-buy-input" style={inputStyle} value={form.zip} onChange={(e) => set("zip", e.target.value)} />
              <select
                required
                className="we-buy-input"
                style={{ ...inputStyle, color: form.furnitureCount ? "#fff" : "rgba(255,255,255,0.45)" }}
                value={form.furnitureCount}
                onChange={(e) => set("furnitureCount", e.target.value)}
              >
                <option value="" disabled>Approximate number of furniture pieces</option>
                <option value="8–10 pieces">8–10 pieces</option>
                <option value="11–20 pieces">11–20 pieces</option>
                <option value="20+ pieces">20+ pieces</option>
              </select>
              <textarea required placeholder="Tell us a little about what you have" rows={4} className="we-buy-input" style={{ ...inputStyle, resize: "none" }} value={form.message} onChange={(e) => set("message", e.target.value)} />

              {/* Photo upload */}
              <div className="flex flex-col gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />

                {photos.length < 6 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="self-start font-serif text-sm font-bold tracking-widest uppercase px-6 py-3 transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#971B2E", color: "#fff" }}
                  >
                    {photos.length === 0 ? "Add Photos" : "Add More"}
                  </button>
                )}

                {/* Photo list */}
                {photos.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    {photos.map((photo) => (
                      <div key={photo.id} className="flex items-center gap-3">
                        {/* Thumbnail */}
                        <div className="relative flex-none w-10 h-10 overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photo.localUrl} alt={photo.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Name + status */}
                        <span className="font-serif text-sm truncate flex-1" style={{ color: photo.status === "error" ? "#FFB81C" : "rgba(255,255,255,0.75)" }}>
                          {photo.status === "uploading" ? "Uploading…" : photo.status === "error" ? "Upload failed" : photo.name}
                        </span>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="flex-none text-white hover:opacity-50 transition-opacity text-xl leading-none"
                          aria-label="Remove photo"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {status === "error" && (
                <p className="font-serif text-sm" style={{ color: "#FFB81C" }}>
                  Something went wrong. Please try again or call us at 917-375-1361.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || photos.some((p) => p.status === "uploading")}
                className="self-start font-serif text-sm font-bold tracking-widest uppercase px-8 py-4 transition-opacity hover:opacity-80 disabled:opacity-50 mt-2"
                style={{ backgroundColor: "#FFB81C", color: "#1a0a0e" }}
              >
                {status === "submitting" ? "Sending…" : "Send My Info"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Right half — photo shows through */}
      <div className="relative md:w-1/2 min-h-[500px]" />

    </section>
  );
}
