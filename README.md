# SWTL CMS

A lightweight CMS that works entirely in the browser using Service Workers and GitHub as a backend.

The main features of this CMS are:
- declarative configuration for content (collections of items with custom fields)
- easy extensibility of default content types – create a standard web-component
  that implements ElementInternals and uses [`setFormValue`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue)
  when value is updated

## Quick Start

Use the a starter template https://github.com/gryzzly/swtl-cms-starter

or:

1. Clone this repository:

```bash
git clone https://github.com/gryzzly/swtl-cms.git
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
4. To update which config is used during the development, after starting
dev server, go to dist/index.html and replace the values in the config globals
5. For development, we need to simulate the setting of the config, that normally
happens during the CI action, specifically the following line:

  envsubst < dist/admin/index.html.tmpl > dist/admin/index.html

Here, we’ll need to manually copy the `dist/admin/index.html` file to the
`dist/admin` folder and manualy replace the ENV variables with respective
development values.

## Structure
```
/dist/admin/ # Built files ready for deployment
/admin/src/ # Source files
```

Entry point to the admin application is in the service worker – src/sw.js.

Since service worker is a bit of a special thing, let’s detail the setup:

- User visits the /admin path
- The default HTML file (dist/admin/index.html) is statically served
- That HTML file has basic settings / service worker bootstraping code
- After service worker is loaded the page is reloaded and the route handlers
of the admin applkication take over, taking user to /admin/login for authorization
