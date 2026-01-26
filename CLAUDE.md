# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Controcanto is a static HTML5 marketing website for a Bitcoin educational service focused on self-sovereignty and onboarding. Built on the Spectral template from HTML5 UP with custom branding.

## Development Commands

### Sass Compilation

No build system is configured. Sass files must be compiled manually:

```bash
sass assets/sass/main.scss assets/css/main.css
sass assets/sass/noscript.scss assets/css/noscript.css
```

## Architecture

### Technology Stack
- HTML5 with semantic markup
- CSS3/Sass with responsive flexbox layout
- jQuery with Scrollex and Scrolly plugins for animations
- Font Awesome icons
- Calendly widget integration

### Key Files
- `index.html` - Main landing page
- `assets/sass/main.scss` - Primary stylesheet (compiles to `assets/css/main.css`)
- `assets/sass/libs/_vars.scss` - Color palette, typography, and sizing variables
- `assets/js/main.js` - Custom application logic

### Responsive Breakpoints
Defined in `assets/sass/libs/_vars.scss`:
- xlarge: 1281px - 1680px
- large: 981px - 1280px
- medium: 737px - 980px
- small: 481px - 736px
- xsmall: 0px - 480px

### Color Palette
- Background: `#2e3842`
- Primary teal: `#21b2a6`
- Accent cyan: `#00ffcc`, `#00f0ff`
- Sky blue: `#76ddff`
- Purple: `#505393`
- Red/orange: `#ed4933`

## Workflow Notes

- Edit Sass files in `assets/sass/`, then compile to CSS
- Content changes go directly in HTML files
- Video background: `images/controcanto.mp4`
- Contact: controcanto@proton.me
