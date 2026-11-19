# Zainab Montaser Eid – Graphic Designer Portfolio

A responsive, single-page portfolio website for a graphic designer who also edits video and manages social media pages. It is built with plain **HTML, CSS and JavaScript**, with no frameworks and no build step.

## Features

- Light and dark mode. The choice is remembered in the browser, and it follows the system setting the first time.
- Accent color picker. Pick a swatch in the hero section to recolor the whole page.
- Filterable work gallery: All, Social media, Logos, Ads, Video and Zainab Studio.
- Image lightbox. Click any image to enlarge it, then close it with the button, a click outside, or `Esc`.
- Video cards that load only when played, and only one video plays at a time.
- Responsive layout for phones, tablets and desktops.
- Accessible markup: labels, focus outlines, and support for reduced motion.

## Project structure

```
zainab-portfolio/
├── index.html          # Page structure and content
├── css/
│   └── style.css       # All styles, including the light and dark themes
├── js/
│   └── script.js       # Theme, color picker, filters, lightbox, video behavior
├── assets/
│   ├── images/         # Project images, logos, and video posters
│   └── videos/         # Project videos (MP4)
└── README.md
```

## Run it locally

No installation is needed.

1. Download or clone the project.
2. Open `index.html` in any modern browser.

If you prefer a local server:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

> **Note:** the fonts (Bricolage Grotesque and Figtree) load from Google Fonts, so an internet connection is needed to see them. Offline, the page falls back to the system fonts and still works.

## Customize

### Colors and theme

All colors are CSS variables at the top of `css/style.css`:

```css
:root {
  --bg: #f4f2fb;       /* page background */
  --surface: #fff;     /* cards */
  --ink: #1c1833;      /* main text */
  --muted: #5d587a;    /* secondary text */
  --line: #d9d5ec;     /* borders */
  --accent: #e0359b;   /* accent color */
}
```

The dark theme values are in the `prefers-color-scheme: dark` block and the `[data-theme="dark"]` rule. The accent swatches are listed in the `cols` array in `js/script.js`.

### Add a new image project

1. Put the image in `assets/images/`.
2. Add a card inside `<div class="grid">` in `index.html`:

```html
<article class="card" data-c="social">
  <button class="art cover" type="button" aria-label="View My Project: short description">
    <img src="assets/images/my-project.jpg" alt="Short description of the image" loading="lazy">
  </button>
  <div class="t"><h3>My Project</h3><p>Social media post</p></div>
</article>
```

- `data-c` sets the filter category: `social`, `logo`, `ad`, `video` or `studio`. You can combine categories with a space, for example `data-c="video studio"`.
- Use `class="art cover"` for images that should fill the square, or `class="art contain"` for logos that should show in full.

### Add a new video project

1. Put the MP4 in `assets/videos/` and a poster image in `assets/images/`.
2. Add a card:

```html
<article class="card" data-c="video">
  <div class="vw">
    <video controls preload="none" playsinline
           aria-label="Short description of the video"
           poster="assets/images/poster-my-video.jpg"
           src="assets/videos/my-video.mp4"></video>
  </div>
  <div class="t"><h3>My Video</h3><p>Video</p></div>
</article>
```

### Edit the text and contact details

The About, Experience and Contact text is in `index.html`. Search for the section ids `about`, `experience` and `contact`.

## Deploy

The project is static, so it works on any static host:

- **GitHub Pages:** push the folder to a repository, then go to Settings, Pages, and pick the branch.
- **Netlify or Vercel:** drag and drop the folder, or connect the repository. No build command is needed, and the publish directory is the project root.

## Tips

- The videos total about 6 MB. Compressing them (for example with HandBrake or `ffmpeg`) makes the page load faster on mobile data.
- Keep file names lowercase with dashes and no spaces, so links work the same on every host.

## Author

**Zainab Montaser Eid**: Graphic Designer, Video Editor and Social Media Manager
LinkedIn: <https://www.linkedin.com/in/zainab-montaser-21a579382/>

---

