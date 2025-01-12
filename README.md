# SWTL CMS

A lightweight CMS that works entirely in the browser using Service Workers and GitHub as a backend.

## Quick Start

1. Clone this repository:

```bash
git clone https://github.com/yourusername/swtl-cms.git
cd swtl-cms
```

2. Install deps

```bash
npm install
```

3. Build the CMS

```bash
npm run build
```

4. Deploy:
   - Copy the entire `dist/admin` folder to your static hosting
   - Make sure it's accessible at your desired path (e.g., `https://yoursite.com/admin`)

## Development

To work on the CMS locally:

1. Start the development server with watch mode

pnpm dev

2. Make your changes in the `admin/src` folder
3. The build will automatically update when you save changes

## Structure
```
/dist/admin/ # Built files ready for deployment
/admin/src/ # Source files
```


