# Styling Guide

We use **Tailwind CSS**. You style elements by adding small utility classes in `className`. You should not need to write
any CSS files.

```tsx
<p className="text-sm font-semibold text-brand-700">$5.00</p>
```

## Who edits what

> **Current design owner: [Caleb So (@casopoly)](https://github.com/casopoly).**

| File / folder                  | Who edits it                 | What it contains                                                    |
| ------------------------------ | ---------------------------- | ------------------------------------------------------------------- |
| `tailwind.config.ts`           | **Design owner only**        | Brand colors, fonts, the app's look                                 |
| `src/app/globals.css`          | **Design owner only**        | Page background, default text/heading/link styles                   |
| `src/app/layout.tsx`           | **Design owner only**        | Loads fonts, wraps every page                                       |
| `src/components/ui/*`          | Design owner (others via PR) | Shared building blocks: `Container`, `Button`, `Card`, `PageHeader` |
| `src/components/YourThing.tsx` | Whoever owns that component  | Style it with Tailwind classes in the same file                     |
| `src/app/<page>/page.tsx`      | Whoever owns that page       | Style it with Tailwind classes in the same file                     |

If you need a change to a design-owner file (a new color, a new shared component), ask the design owner or open a small
PR for it. Do not work around it in your own file.

## Rules

1. **Style in your own file with Tailwind classes.** Do not create `.css` files and do not edit `globals.css`.
2. **Use the shared components** in `src/components/ui/` before building your own:
   - Wrap page content in `<Container>`.
   - Start each page with `<PageHeader title="..." />`.
   - Use `<Button>` for buttons and `<Card>` for boxes.
3. **Use theme colors only**: `brand-50` to `brand-900`, `surface`, `ink`. Examples: `bg-brand-600`, `text-brand-800`,
   `border-brand-100`.
4. **No arbitrary values.** Do not write `bg-[#ff5733]`, `text-[17px]` or `w-[413px]`. Pick the closest standard class
   (`text-lg`, `w-96`). If nothing fits, ask the design owner.
5. **No inline `style={{ ... }}`.** Use classes.
6. **Fonts are set globally.** Body text uses the sans font and headings (`h1`-`h3`) use the heading font
   automatically. Do not set `font-family` yourself.
7. **Make it work on mobile first.** Write the phone layout with no prefix, then add `sm:`, `md:`, `lg:` for larger
   screens (e.g. `flex-col md:flex-row`).

## Cheat sheet

| I want...                         | Use                                                              |
| --------------------------------- | ---------------------------------------------------------------- |
| Space inside / outside            | `p-4`, `px-6`, `py-2` / `m-4`, `mt-2`, `mb-6`                    |
| Space between children            | `gap-4` (with `flex` or `grid`)                                  |
| Row / column layout               | `flex`, `flex-col`, `items-center`, `justify-between`            |
| Grid of cards                     | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`           |
| Text size / weight                | `text-sm`, `text-lg`, `text-2xl`, `font-medium`, `font-semibold` |
| Text / background color           | `text-brand-700`, `bg-brand-50`, `bg-white`                      |
| Rounded corners / border / shadow | `rounded-lg`, `border border-brand-100`, `shadow-sm`             |
| Hover effect                      | `hover:bg-brand-700`                                             |
| Hide on mobile                    | `hidden md:block`                                                |

Full class list: https://tailwindcss.com/docs (use the search box).

## Example: a new component

```tsx
import Card from "@/components/ui/Card";

export default function JobCard({ title, pay }: { title: string; pay: string }) {
  return (
    <Card className="flex items-center justify-between">
      <h2 className="text-xl">{title}</h2>
      <p className="font-semibold text-brand-700">{pay}</p>
    </Card>
  );
}
```

## Example: a new page

```tsx
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export default function Jobs() {
  return (
    <main>
      <Navbar />
      <Container>
        <PageHeader title="Jobs" subtitle="Join our team" />
        {/* page content */}
      </Container>
    </main>
  );
}
```

## Tips

- Install the VS Code extension **Tailwind CSS IntelliSense**. It autocompletes class names and shows what each one does.
- Long class lists are normal. If one element gets very long or you repeat it a lot, make it a small component instead
  of copy-pasting.
- If something looks off, check the browser dev tools to see which classes are applied.

## For the design owner

For now, the design owner is [Caleb So (@casopoly)](https://github.com/casopoly), the tech lead.

You are responsible for the app looking consistent. Responsibilities:

- **Own the theme.** Colors and fonts are defined in `tailwind.config.ts`; fonts are loaded in `src/app/layout.tsx`.
  Change them there and every page updates. Replace the placeholder coffee palette and fonts with the real brand.
- **Own the shared components** in `src/components/ui/`. Add new ones when you see the same pattern repeated on
  several pages.
- **Review PRs for styling** using this checklist:
  - [ ] Uses `Container`, `PageHeader`, `Button`, `Card` where they apply
  - [ ] Only theme colors, no `[#hex]` or `[17px]` arbitrary values
  - [ ] No new `.css` files, no inline `style`
  - [ ] Looks fine at phone width and desktop width
- **Do not let styling PRs touch your files** (`tailwind.config.ts`, `globals.css`, `layout.tsx`) unless you approve.
