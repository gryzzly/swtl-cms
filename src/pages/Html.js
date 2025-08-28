import { html } from "swtl";

export function Html({
  children,
  title,
  basePath = "",
  styles = [],
  scripts = [],
}) {
  return html`
    <html lang="en">
      <head>
        <meta name="view-transition" content="same-origin" />
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta name="Description" content="swtl cms" />
        <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic"> -->
        <!-- <link rel="stylesheet" href="https://unpkg.com/normalize.css">
        <link rel="stylesheet" href="https://unpkg.com/magick.css"> -->
        <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.1" />

        <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"> -->
        <!-- <link rel="stylesheet" href="https://unpkg.com/normalize.css@8.0.1/normalize.css">
        <link rel="stylesheet" href="https://unpkg.com/concrete.css@2.1.1/concrete.css"> -->

        <script
          async
          src="https://ga.jspm.io/npm:es-module-shims@1.10.0/dist/es-module-shims.js"
        ></script>

        <script type="importmap">
          {
            "imports": {
              "prosemirror-model": "https://esm.sh/*prosemirror-model@1.19.4",
              "orderedmap": "https://esm.sh/*orderedmap@2.1.1",
              "prosemirror-schema-basic": "https://esm.sh/*prosemirror-schema-basic@1.2.2",
              "prosemirror-state": "https://esm.sh/*prosemirror-state@1.4.3",
              "prosemirror-transform": "https://esm.sh/*prosemirror-transform@1.8.0",
              "prosemirror-view": "https://esm.sh/*prosemirror-view@1.33.3",
              "rope-sequence": "https://esm.sh/*rope-sequence@1.3.4",
              "prosemirror-history": "https://esm.sh/*prosemirror-history@1.4.0",
              "prosemirror-keymap": "https://esm.sh/*prosemirror-keymap@1.2.2",
              "w3c-keyname": "https://esm.sh/*w3c-keyname@2.2.8",
              "prosemirror-commands": "https://esm.sh/*prosemirror-commands@1.5.2"
            }
          }
        </script>
        <style>
          prosemirror-editor {
            background: #fff;
            display: block;
            min-height: 88px;
            border: 2px ridge;
            padding: 10px;
          }
          prosemirror-editor .ProseMirror {
            padding: 5px;
          }
        </style>

        ${scripts
          .map((script) => {
            if (script.includes("localhost")) {
              return `<script type="module" src="${script}"></script>`;
            }
            return `<script type="module" src="${basePath}/remote/${script}.js"></script>`;
          })
          .join("")}

        <title>${title ?? ""}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            font-family: -apple-system, system-ui, BlinkMacSystemFont,
              "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }

          body {
            background-color: #ececec;
          }

          /* Own
          */
          * {
            margin: 0;
            padding: 0;
          }
          p {
            margin-bottom: 0.5em;
          }

          // FIXME: all prosemirror styles should be included as part of the widget
          .ProseMirror p {
            margin-bottom: 0;
            margin-block: 0;
          }

          /* ProseMirror
          */
          .ProseMirror {
            position: relative;
          }

          .ProseMirror {
            word-wrap: break-word;
            white-space: pre-wrap;
            white-space: break-spaces;
            -webkit-font-variant-ligatures: none;
            font-variant-ligatures: none;
            font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
          }

          .ProseMirror pre {
            white-space: pre-wrap;
          }

          .ProseMirror li {
            position: relative;
          }

          .ProseMirror-hideselection *::selection {
            background: transparent;
          }
          .ProseMirror-hideselection *::-moz-selection {
            background: transparent;
          }
          .ProseMirror-hideselection {
            caret-color: transparent;
          }

          /* See https://github.com/ProseMirror/prosemirror/issues/1421#issuecomment-1759320191 */
          .ProseMirror [draggable][contenteditable="false"] {
            user-select: text;
          }

          .ProseMirror-selectednode {
            outline: 2px solid #8cf;
          }

          /* Make sure li selections wrap around markers */

          li.ProseMirror-selectednode {
            outline: none;
          }

          li.ProseMirror-selectednode:after {
            content: "";
            position: absolute;
            left: -32px;
            right: -2px;
            top: -2px;
            bottom: -2px;
            border: 2px solid #8cf;
            pointer-events: none;
          }

          /* Protect against generic img rules */

          img.ProseMirror-separator {
            display: inline !important;
            border: none !important;
            margin: 0 !important;
          }

          .ProseMirror.virtual-cursor-enabled {
            /* Hide the native cursor */
            caret-color: transparent;
          }

          .ProseMirror-focused {
            /* Color of the virtual cursor */
            --prosemirror-virtual-cursor-color: blue;
          }

          .ProseMirror .prosemirror-virtual-cursor {
            position: absolute;
            cursor: text;
            pointer-events: none;
            transform: translate(-1px);
            user-select: none;
            -webkit-user-select: none;
            border-left: 3px solid var(--prosemirror-virtual-cursor-color);
          }

          .ProseMirror .prosemirror-virtual-cursor-left {
            width: 1ch;
            transform: translate(calc(-1ch + -1px));
            border-bottom: 2px solid var(--prosemirror-virtual-cursor-color);
            border-right: 3px solid var(--prosemirror-virtual-cursor-color);
            border-left: none;
          }

          .ProseMirror .prosemirror-virtual-cursor-right {
            width: 1ch;
            border-bottom: 3px solid var(--prosemirror-virtual-cursor-color);
            border-left: 3px solid var(--prosemirror-virtual-cursor-color);
            border-right: none;
          }

          .ProseMirror-focused .prosemirror-virtual-cursor-animation {
            animation: prosemirror-virtual-cursor-blink 1s linear infinite;
            animation-delay: 0.5s;
          }
        </style>
        ${styles}
      </head>
      <body>
        <main>${children}</main>
        <script>
          let refreshing;
          async function handleUpdate() {
            // check to see if there is a current active service worker
            const oldSw = (await navigator.serviceWorker.getRegistration())
              ?.active?.state;

            navigator.serviceWorker.addEventListener(
              "controllerchange",
              async () => {
                if (refreshing) return;

                // when the controllerchange event has fired, we get the new service worker
                const newSw = (await navigator.serviceWorker.getRegistration())
                  ?.active?.state;

                // if there was already an old activated service worker, and a new activating service worker, do the reload
                if (oldSw === "activated" && newSw === "activating") {
                  refreshing = true;
                  window.location.reload();
                }
              },
            );
          }
          handleUpdate();
        </script>
      </body>
    </html>
  `;
}
