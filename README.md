# Subhajit Mondal - Gumroad Neo-Brutalism Portfolio ✦

An ultra-clean, high-impact **Gumroad Neo-Brutalism** portfolio website engineered specifically for **Subhajit Mondal** (Business & Data Analyst).

Combines Gumroad's iconic design language (thick black borders, hard offset black drop-shadows, warm cream background, tactile press-down buttons, marquee ticker, floating parallax stickers, and high-contrast color blocks) with skimmable, concise writing and interactive operations simulators.

---

## ⚡ Gumroad Neo-Brutalism Highlights

- **Authentic Gumroad Visual Style**:
  - Warm cream background (`#F4F4F0`) with a subtle retro dot matrix pattern.
  - Heavy black borders (`2.5px solid #000000`).
  - Hard, zero-blur offset black shadows (`4px 4px 0px #000` to `6px 6px 0px #000`).
  - Signature Gumroad color blocks: Hot Pink (`#FF90E8`), Canary Yellow (`#FFC900`), Mint Green (`#00F5A0`), and Sky Blue (`#90A8ED`).
  - Tactile press interaction: Buttons depress downward (`translate(2px, 2px)`) on click with satisfying Web Audio pop SFX.
  - Running black & white marquee ticker strip.
- **Concise & Skimmable (Less Reading, More Signal)**:
  - High signal-to-noise ratio: crisp bullet points, big numbers (`₹94.5L Saved`, `-18.2% CPU`, `200K+ Modeled`), zero fluff.
  - Recruiter-friendly: any hiring manager can understand your impact in under 15 seconds.
- **Parallax Sticker Engine**:
  - Multi-layer floating neo-brutalist stickers (✦ starbursts, ★ badges, pills) that glide dynamically based on scroll and mouse position (`data-parallax-speed`).
- **Clean Profile Photo Showcase**:
  - Subhajit's verified portrait in a clean framed neo-brutalist card with tilted badges.
  - Completely free of disturbing clipping rings or overlapping circles.
- **3 Interactive Data Labs**:
  1. **Warehouse Productivity & Cost-per-Unit (CPU) Optimization**:
     - Interactive Zone A, B, C, D selector with instant throughput and CPU readouts.
     - Key metrics: **₹94.5 Lakhs annual savings** and **CPU slashed by 18.2%**.
  2. **Quick Commerce Dark Store Inventory Optimization**:
     - Interactive Days of Inventory Outstanding (DIO) slider with real-time stockout/spoilage alerts.
     - Key metrics: **-22% stockout risk** and **-15% perishable spoilage**.
  3. **Enterprise Sales Margin Intelligence System**:
     - Star Schema interactive explorer (Fact & Dimensions).
     - 1-click executable SQL CTE Window Function runner uncovering **₹18.5 Lakhs in margin leakage**.
- **Tactile Web Audio API (Zero External Dependencies)**:
  - Bubble pop on button hover.
  - Snappy mechanical click on press.
  - Success chime on modal open or clipboard copy.
  - Instant **🔊 SFX: ON/OFF** toggle button in the navbar.
- **Recruiter Fast-Track HUD & Resume Dossier**:
  - 1-click clipboard copy for email (`mondalsubhajit556@gmail.com`) and phone (`+91 6295716179`).
  - In-app printable resume modal.
  - Strictly single-line sticky navigation bar.

---

## 📂 Project Structure

```
D:\Websites\subhajit-portfolio/
│
├── index.html           # Main Gumroad Neo-Brutalism webpage
├── styles.css           # Gumroad Neo-Brutalist stylesheet & animations
├── script.js            # Parallax engine, Web Audio SFX & simulators
├── README.md            # Documentation & deployment guide
└── assets/
    ├── profile.jpg      # Subhajit Mondal's verified portrait photograph
    ├── subhajit_photo1.jpg
    └── subhajit_photo2.jpg
```

---

## 🚀 How to View Locally

Double-click `index.html` in `D:\Websites\subhajit-portfolio\` or open it in your browser:
```
file:///D:/Websites/subhajit-portfolio/index.html
```
Or start a local development server using PowerShell:
```powershell
cd D:\Websites\subhajit-portfolio
python -m http.server 8000
# or npx serve
```
Then visit `http://localhost:8000`.

---

## 🌐 Deploying to GitHub Pages (Free)

1. Create a repository on GitHub named `subhajit-portfolio`.
2. Run in PowerShell:
   ```powershell
   cd D:\Websites\subhajit-portfolio
   git init
   git add .
   git commit -m "feat: Gumroad Neo-Brutalism portfolio with parallax engine"
   git branch -M main
   git remote add origin https://github.com/<your-username>/subhajit-portfolio.git
   git push -u origin main
   ```
3. Enable GitHub Pages in Repository Settings -> Pages -> Deploy from branch `main` / `root`.
