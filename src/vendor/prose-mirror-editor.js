// There is a name collision between prosemirror-model export `DOMParser` and
// the native constructor that we use to parse `html` attribute string value
// to DOM, so we import the prosemirror parser as an alias "PMDOMParser"
import {
  Schema,
  DOMParser as PMDOMParser,
  DOMSerializer,
} from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

import "https://unpkg.com/element-internals-polyfill";

const schema = new Schema({
  nodes: {
    doc: { content: "block+" },
    paragraph: {
      content: "text*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      },
    },
    text: { group: "inline" },
  },
  marks: {
    link: {
      attrs: {
        href: {},
        title: { default: null },
      },
      // By default, marks are inclusive, meaning that they
      // get applied to content inserted at their end (as well
      // as at their start when they start at the start
      // of their parent node)
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs(dom) {
            return {
              href: dom.getAttribute("href"),
              title: dom.getAttribute("title"),
            };
          },
        },
      ],
      toDOM(node) {
        return ["a", node.attrs, 0];
      },
    },
  },
});

class ProseMirrorEditor extends HTMLElement {
  // make this element hook into its parent form
  static formAssociated = true;

  constructor() {
    super();
    this.editorView = null;
    // Enable form association internals
    this._internals = this.attachInternals();

    console.log("constructor of the editor is running");
  }

  connectedCallback() {
    this.innerHTML = `<div id="editor"></div>`;
    const editorElement = this.querySelector("#editor");
    const initialContent = this.getAttribute("html");
    const customChangeEventName = this.getAttribute("change-event");

    // default empty paragraph
    let doc = schema.node("doc", null, [schema.node("paragraph")]);

    console.log(
      "connected callback is running, initial html is " + initialContent,
    );

    if (initialContent) {
      // html -> DOM
      const contentElement = new DOMParser().parseFromString(
        initialContent,
        "text/html",
      ).body;
      // DOM -> Prosemirror doc
      doc = PMDOMParser.fromSchema(schema).parse(contentElement);
    }

    const state = EditorState.create({
      doc,
      schema,
      plugins: [
        history(),
        keymap({ "Mod-z": undo, "Mod-y": redo }),
        keymap(baseKeymap),
      ],
    });

    this.editorView = new EditorView(editorElement, {
      state,
      dispatchTransaction: (transaction) => {
        const newState = this.editorView.state.apply(transaction);
        this.editorView.updateState(newState);
        if (transaction.docChanged) {
          const newHtml = getHTMLStringFromState(newState);
          this.dispatchEvent(
            new CustomEvent(customChangeEventName || "editor-change", {
              detail: {
                html: newHtml,
                json: newState.doc.toJSON(),
              },
            }),
          );
          // set the value of this "input" element
          this._internals.setFormValue(newHtml);
        }
      },
    });
    const toggle = document.createElement("button");
    toggle.innerText = "toggle link";
    editorElement.before(toggle);
    toggle.addEventListener("click", (event) => {
      // prevent the button from submitting the form it is in
      event.preventDefault();
      toggleLink(this.editorView);
    });
  }

  disconnectedCallback() {
    if (this.editorView) {
      this.editorView.destroy();
    }
  }
}

function getHTMLStringFromState(state) {
  const fragment = DOMSerializer.fromSchema(state.schema).serializeFragment(
    state.doc.content,
  );
  const div = document.createElement("div");
  div.appendChild(fragment);
  return div.innerHTML;
}

import { toggleMark } from "prosemirror-commands";

const linkSchema = schema.marks.link;

function toggleLink(view) {
  const { state, dispatch } = view;
  if (markActive(state, linkSchema)) {
    toggleMark(linkSchema)(state, dispatch);
    return true;
  }
  const href = prompt("Link target?");
  toggleMark(linkSchema, { href })(view.state, view.dispatch);
  view.focus();
}

function markActive(state, type) {
  let { from, $from, to, empty } = state.selection;
  if (empty) return !!type.isInSet(state.storedMarks || $from.marks());
  else return state.doc.rangeHasMark(from, to, type);
}

customElements.define("prosemirror-editor", ProseMirrorEditor);
