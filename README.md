# Iluma Studio Design — website

Static website for **Iluma Studio Design** (interior design & concept, Constanța), built with
**Astro** and **Tailwind CSS v4**. Content comes from the studio's Instagram
[@ilumastudiodesign](https://www.instagram.com/ilumastudiodesign/).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site → dist/
npm run preview
npm run check     # type-check
```

Deploy `dist/` anywhere static. For Cloudflare (`npx wrangler deploy`) use `wrangler.jsonc`.
Set the real domain in `astro.config.mjs` (`site`) and `src/config/site.ts` (`url`).

---

## Contact data

Set in `src/config/site.ts`: phone **+40 762 412 004** (also used for WhatsApp), designer **Cristina**.
The contact buttons call this number, and the WhatsApp buttons open a pre-filled message
(`whatsappMessage`). Set `whatsapp: false` to hide them. An optional `email` is shown automatically once you add it.

---

## The 3D effects

| Effect | Where | How it works |
| --- | --- | --- |
| **Step into the mirror** | Homepage hero + every guide page | Pinned tall section. Scroll moves the arched mirror toward the camera (`translateZ`) until it fills the screen, then a light flash. It also tilts with the cursor. `scripts/modules/mirror.ts` + CSS `.mirror-*` |
| **First-person walk-through** | "Plimbă-te prin spații" | A 3D corridor with rooms on alternating walls. Scroll walks the camera forward and turns its head right, then left, stopping in front of each room. `walkthrough.ts` (desktop; mobile shows a list) |
| **Wardrobe doors** | "Deschide ușile" | Two fluted-wood doors swing open in 3D to reveal the moodboard. `progress-scenes.ts` + CSS `.door-*` |
| **3D coverflow** | Iconic chairs | Drag, swipe, arrows or keys. Side chairs rotate away in 3D. `coverflow.ts` |
| **Flip cards** | Designer vs. DIY | 3D flip on hover or tap. `misc.ts` |
| **Turning cards** | Guide pages | Each tip turns in 3D as it enters. `turn.ts` |
| **Zoom page transition** | Between pages | View Transitions API. Guide cards morph into the guide's mirror (`transition:name`) |
| **Tilt + spotlight** | Service and guide cards | `tilt.ts`, `spotlight.ts` |
| Reveals, word-by-word titles, curtain wipes, timeline that draws itself, custom cursor with labels ("Intră", "Citește") | everywhere | `reveal.ts`, `progress-scenes.ts`, `cursor.ts` |

Everything respects **reduce motion**. The scenes then show their final state with no 3D travel.
Without JavaScript, all content is still visible.

---

## Where to change things

| I want to… | Edit |
| --- | --- |
| Name, motto, phone, email, Instagram, effect toggles | `src/config/site.ts` |
| Reorder / hide / retheme homepage sections, edit headings | `src/config/sections.ts` |
| Menu links | `src/config/navigation.ts` |
| Services | `src/data/services.ts` |
| Rooms in the 3D walk-through | `src/data/rooms.ts` (+ images in `src/assets/images/rooms/`) |
| Color palette panels | `src/data/palette.ts` |
| Iconic chairs | `src/data/chairs.ts` |
| "Înainte să cumperi…" guides (each gets its own page) | `src/data/guides.ts` |
| Process, principles, Designer vs. DIY | `src/data/studio.ts` |
| Colors, fonts, animation speeds | `src/styles/global.css` → `@theme` |

Images go in `src/assets/images/<folder>/` and are referenced as `'<folder>/<file>.jpg'`.
Astro optimizes them automatically. A wrong path fails the build and lists the available files.

New homepage block: create `src/components/sections/MyBlock.astro` (props `id`, `tone`, `copy`),
register it in `src/components/sections/registry.ts`, then add it to `src/config/sections.ts`.

## Structure

```text
src/
├── config/        site.ts · sections.ts · navigation.ts
├── data/          services · rooms · palette · chairs · guides · studio
├── assets/images/ rooms/ · chairs/ · textures/ · moodboard/   (from Instagram)
├── components/
│   ├── ui/        Button, Icon, SplitText, SectionHeading, Section
│   ├── layout/    Header, Footer, Logo, FloatingCta
│   └── sections/  MirrorHero, Manifesto, Walkthrough, Services, Palette, Doors,
│                  Chairs, Process, Guides, DesignerVsDiy, Contact + registry.ts
├── layouts/BaseLayout.astro
├── pages/         index.astro · ghiduri/[slug].astro · 404.astro
├── scripts/       main.ts + modules/ (one file per effect)
└── styles/global.css
public/media/      palette reel (video)
```

## Image sources

All images and the reel are from the studio's own Instagram posts: interior renders, the
"Iconic Chairs" carousel, the "5 culori de toamnă" textures and the palette reel. Text overlays were cropped out.
