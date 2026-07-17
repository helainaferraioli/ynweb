# YN Site — Yesterday's News Website

## Project Overview
Website for Yesterday's News, a vintage/antique shop at 428 Court Street,
Carroll Gardens, Brooklyn (25 years in operation). Built with Next.js,
deployed on Vercel.

## Tech Stack
- Framework: Next.js 16 (React 19, TypeScript)
- CMS: Sanity
- Email: Resend
- File uploads: Uploadthing
- Payments: Stripe
- Styling: Tailwind CSS v4 [confirm: primary going forward?] +
  styled-components (legacy/in places — confirm which pages use which)
- Deployment: Vercel

## Key Pages
- Home
- About — two-column layout, includes bio of founder JP Ferraioli
- We Buy — lead capture page for people selling items to the shop
- Contact — includes Google Maps embed and a photo upload form
- [Shop/checkout pages — given Stripe is installed, confirm status]

## Brand Voice
Warm, direct, nostalgic, story-driven. Never clever for its own sake.
Palette: red / gold / cream.

## Conventions
- [Component structure — e.g. src/components, src/app]
- [When to use Tailwiomponents, if both are intentional]

## Environment
- .env.local holds API keys (Resend, Uploadthing, Sanity, Stripe) —
  never commit or expose these
- Run locally: npm run dev
- Deploy: pushes to main auto-deploy via Vercel

## Notes for Claude
- Prefer editing existing components over creating new ones unless asked
- Ask before regenerating API keys or touching .env.local
- Keep copy changes consistent with brand voice above
