/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pr = window, go = pr.ShadowRoot && (pr.ShadyCSS === void 0 || pr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bo = Symbol(), Zo = /* @__PURE__ */ new WeakMap();
class Ya {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== bo)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (go && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Zo.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Zo.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const ku = (n) => new Ya(typeof n == "string" ? n : n + "", void 0, bo), xu = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((r, i, s) => r + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[s + 1], n[0]);
  return new Ya(t, n, bo);
}, wu = (n, e) => {
  go ? n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
    const r = document.createElement("style"), i = pr.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
  });
}, Yo = go ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules)
    t += r.cssText;
  return ku(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var qi;
const wr = window, Xo = wr.trustedTypes, Cu = Xo ? Xo.emptyScript : "", Qo = wr.reactiveElementPolyfillSupport, Ns = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Cu : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Xa = (n, e) => e !== n && (e == e || n == n), Ji = { attribute: !0, type: String, converter: Ns, reflect: !1, hasChanged: Xa }, Ls = "finalized";
class Qt extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(e) {
    var t;
    this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((t, r) => {
      const i = this._$Ep(r, t);
      i !== void 0 && (this._$Ev.set(i, r), e.push(i));
    }), e;
  }
  static createProperty(e, t = Ji) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const r = typeof e == "symbol" ? Symbol() : "__" + e, i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Object.defineProperty(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    return { get() {
      return this[t];
    }, set(i) {
      const s = this[e];
      this[t] = i, this.requestUpdate(e, s, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || Ji;
  }
  static finalize() {
    if (this.hasOwnProperty(Ls))
      return !1;
    this[Ls] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, r = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const i of r)
        this.createProperty(i, t[i]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r)
        t.unshift(Yo(i));
    } else
      e !== void 0 && t.push(Yo(e));
    return t;
  }
  static _$Ep(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  _$Eu() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, r;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) === null || r === void 0 || r.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return wu(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) === null || r === void 0 ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) === null || r === void 0 ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$EO(e, t, r = Ji) {
    var i;
    const s = this.constructor._$Ep(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const o = (((i = r.converter) === null || i === void 0 ? void 0 : i.toAttribute) !== void 0 ? r.converter : Ns).toAttribute(t, r.type);
      this._$El = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$El = null;
    }
  }
  _$AK(e, t) {
    var r;
    const i = this.constructor, s = i._$Ev.get(e);
    if (s !== void 0 && this._$El !== s) {
      const o = i.getPropertyOptions(s), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? o.converter : Ns;
      this._$El = s, this[s] = l.fromAttribute(t, o.type), this._$El = null;
    }
  }
  requestUpdate(e, t, r) {
    let i = !0;
    e !== void 0 && (((r = r || this.constructor.getPropertyOptions(e)).hasChanged || Xa)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), r.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, r))) : i = !1), !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((i, s) => this[s] = i), this._$Ei = void 0);
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
        var s;
        return (s = i.hostUpdate) === null || s === void 0 ? void 0 : s.call(i);
      }), this.update(r)) : this._$Ek();
    } catch (i) {
      throw t = !1, this._$Ek(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((r) => {
      var i;
      return (i = r.hostUpdated) === null || i === void 0 ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((t, r) => this._$EO(r, this[r], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
Qt[Ls] = !0, Qt.elementProperties = /* @__PURE__ */ new Map(), Qt.elementStyles = [], Qt.shadowRootOptions = { mode: "open" }, Qo == null || Qo({ ReactiveElement: Qt }), ((qi = wr.reactiveElementVersions) !== null && qi !== void 0 ? qi : wr.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Gi;
const Cr = window, fn = Cr.trustedTypes, el = fn ? fn.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ds = "$lit$", ct = `lit$${(Math.random() + "").slice(9)}$`, Qa = "?" + ct, Su = `<${Qa}>`, Vt = document, Hn = () => Vt.createComment(""), zn = (n) => n === null || typeof n != "object" && typeof n != "function", ec = Array.isArray, Mu = (n) => ec(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Zi = `[ 	
\f\r]`, Mn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tl = /-->/g, nl = />/g, _t = RegExp(`>|${Zi}(?:([^\\s"'>=/]+)(${Zi}*=${Zi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rl = /'/g, il = /"/g, tc = /^(?:script|style|textarea|title)$/i, Eu = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), D = Eu(1), Ft = Symbol.for("lit-noChange"), U = Symbol.for("lit-nothing"), sl = /* @__PURE__ */ new WeakMap(), Nt = Vt.createTreeWalker(Vt, 129, null, !1);
function nc(n, e) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return el !== void 0 ? el.createHTML(e) : e;
}
const Tu = (n, e) => {
  const t = n.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : "", o = Mn;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let c, d, u = -1, h = 0;
    for (; h < a.length && (o.lastIndex = h, d = o.exec(a), d !== null); )
      h = o.lastIndex, o === Mn ? d[1] === "!--" ? o = tl : d[1] !== void 0 ? o = nl : d[2] !== void 0 ? (tc.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = _t) : d[3] !== void 0 && (o = _t) : o === _t ? d[0] === ">" ? (o = i != null ? i : Mn, u = -1) : d[1] === void 0 ? u = -2 : (u = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? _t : d[3] === '"' ? il : rl) : o === il || o === rl ? o = _t : o === tl || o === nl ? o = Mn : (o = _t, i = void 0);
    const f = o === _t && n[l + 1].startsWith("/>") ? " " : "";
    s += o === Mn ? a + Su : u >= 0 ? (r.push(c), a.slice(0, u) + Ds + a.slice(u) + ct + f) : a + ct + (u === -2 ? (r.push(void 0), l) : f);
  }
  return [nc(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : "")), r];
};
class jn {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, d] = Tu(e, t);
    if (this.el = jn.createElement(c, r), Nt.currentNode = this.el.content, t === 2) {
      const u = this.el.content, h = u.firstChild;
      h.remove(), u.append(...h.childNodes);
    }
    for (; (i = Nt.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) {
          const u = [];
          for (const h of i.getAttributeNames())
            if (h.endsWith(Ds) || h.startsWith(ct)) {
              const f = d[o++];
              if (u.push(h), f !== void 0) {
                const p = i.getAttribute(f.toLowerCase() + Ds).split(ct), m = /([.?@])?(.*)/.exec(f);
                a.push({ type: 1, index: s, name: m[2], strings: p, ctor: m[1] === "." ? _u : m[1] === "?" ? $u : m[1] === "@" ? Nu : Si });
              } else
                a.push({ type: 6, index: s });
            }
          for (const h of u)
            i.removeAttribute(h);
        }
        if (tc.test(i.tagName)) {
          const u = i.textContent.split(ct), h = u.length - 1;
          if (h > 0) {
            i.textContent = fn ? fn.emptyScript : "";
            for (let f = 0; f < h; f++)
              i.append(u[f], Hn()), Nt.nextNode(), a.push({ type: 2, index: ++s });
            i.append(u[h], Hn());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === Qa)
          a.push({ type: 2, index: s });
        else {
          let u = -1;
          for (; (u = i.data.indexOf(ct, u + 1)) !== -1; )
            a.push({ type: 7, index: s }), u += ct.length - 1;
        }
      s++;
    }
  }
  static createElement(e, t) {
    const r = Vt.createElement("template");
    return r.innerHTML = e, r;
  }
}
function pn(n, e, t = n, r) {
  var i, s, o, l;
  if (e === Ft)
    return e;
  let a = r !== void 0 ? (i = t._$Co) === null || i === void 0 ? void 0 : i[r] : t._$Cl;
  const c = zn(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== c && ((s = a == null ? void 0 : a._$AO) === null || s === void 0 || s.call(a, !1), c === void 0 ? a = void 0 : (a = new c(n), a._$AT(n, t, r)), r !== void 0 ? ((o = (l = t)._$Co) !== null && o !== void 0 ? o : l._$Co = [])[r] = a : t._$Cl = a), a !== void 0 && (e = pn(n, a._$AS(n, e.values), a, r)), e;
}
class Au {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var t;
    const { el: { content: r }, parts: i } = this._$AD, s = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : Vt).importNode(r, !0);
    Nt.currentNode = s;
    let o = Nt.nextNode(), l = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (l === c.index) {
        let d;
        c.type === 2 ? d = new Qn(o, o.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (d = new Lu(o, this, e)), this._$AV.push(d), c = i[++a];
      }
      l !== (c == null ? void 0 : c.index) && (o = Nt.nextNode(), l++);
    }
    return Nt.currentNode = Vt, s;
  }
  v(e) {
    let t = 0;
    for (const r of this._$AV)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class Qn {
  constructor(e, t, r, i) {
    var s;
    this.type = 2, this._$AH = U, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cp = (s = i == null ? void 0 : i.isConnected) === null || s === void 0 || s;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = pn(this, e, t), zn(e) ? e === U || e == null || e === "" ? (this._$AH !== U && this._$AR(), this._$AH = U) : e !== this._$AH && e !== Ft && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Mu(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== U && zn(this._$AH) ? this._$AA.nextSibling.data = e : this.$(Vt.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var t;
    const { values: r, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = jn.createElement(nc(i.h, i.h[0]), this.options)), i);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === s)
      this._$AH.v(r);
    else {
      const o = new Au(s, this), l = o.u(this.options);
      o.v(r), this.$(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = sl.get(e.strings);
    return t === void 0 && sl.set(e.strings, t = new jn(e)), t;
  }
  T(e) {
    ec(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const s of e)
      i === t.length ? t.push(r = new Qn(this.k(Hn()), this.k(Hn()), this, this.options)) : r = t[i], r._$AI(s), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cp = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class Si {
  constructor(e, t, r, i, s) {
    this.type = 1, this._$AH = U, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = U;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, r, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0)
      e = pn(this, e, t, 0), o = !zn(e) || e !== this._$AH && e !== Ft, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = s[0], a = 0; a < s.length - 1; a++)
        c = pn(this, l[r + a], t, a), c === Ft && (c = this._$AH[a]), o || (o = !zn(c) || c !== this._$AH[a]), c === U ? e = U : e !== U && (e += (c != null ? c : "") + s[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === U ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class _u extends Si {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === U ? void 0 : e;
  }
}
const Ou = fn ? fn.emptyScript : "";
class $u extends Si {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== U ? this.element.setAttribute(this.name, Ou) : this.element.removeAttribute(this.name);
  }
}
class Nu extends Si {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    var r;
    if ((e = (r = pn(this, e, t, 0)) !== null && r !== void 0 ? r : U) === Ft)
      return;
    const i = this._$AH, s = e === U && i !== U || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== U && (i === U || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && r !== void 0 ? r : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Lu {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    pn(this, e);
  }
}
const ol = Cr.litHtmlPolyfillSupport;
ol == null || ol(jn, Qn), ((Gi = Cr.litHtmlVersions) !== null && Gi !== void 0 ? Gi : Cr.litHtmlVersions = []).push("2.8.0");
const Du = (n, e, t) => {
  var r, i;
  const s = (r = t == null ? void 0 : t.renderBefore) !== null && r !== void 0 ? r : e;
  let o = s._$litPart$;
  if (o === void 0) {
    const l = (i = t == null ? void 0 : t.renderBefore) !== null && i !== void 0 ? i : null;
    s._$litPart$ = o = new Qn(e.insertBefore(Hn(), l), l, void 0, t != null ? t : {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Yi, Xi;
class On extends Qt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, t;
    const r = super.createRenderRoot();
    return (e = (t = this.renderOptions).renderBefore) !== null && e !== void 0 || (t.renderBefore = r.firstChild), r;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Du(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return Ft;
  }
}
On.finalized = !0, On._$litElement$ = !0, (Yi = globalThis.litElementHydrateSupport) === null || Yi === void 0 || Yi.call(globalThis, { LitElement: On });
const ll = globalThis.litElementPolyfillSupport;
ll == null || ll({ LitElement: On });
((Xi = globalThis.litElementVersions) !== null && Xi !== void 0 ? Xi : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ru = (n, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
  t.createProperty(e.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, n);
} }, Pu = (n, e, t) => {
  e.constructor.createProperty(t, n);
};
function Je(n) {
  return (e, t) => t !== void 0 ? Pu(n, e, t) : Ru(n, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Iu(n) {
  return Je({ ...n, state: !0 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Qi;
((Qi = window.HTMLSlotElement) === null || Qi === void 0 ? void 0 : Qi.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bu = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Hu = (n) => (...e) => ({ _$litDirective$: n, values: e });
class zu {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = Hu(class extends zu {
  constructor(n) {
    var e;
    if (super(n), n.type !== Bu.ATTRIBUTE || n.name !== "class" || ((e = n.strings) === null || e === void 0 ? void 0 : e.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return " " + Object.keys(n).filter((e) => n[e]).join(" ") + " ";
  }
  update(n, [e]) {
    var t, r;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), n.strings !== void 0 && (this.nt = new Set(n.strings.join(" ").split(/\s/).filter((s) => s !== "")));
      for (const s in e)
        e[s] && !(!((t = this.nt) === null || t === void 0) && t.has(s)) && this.it.add(s);
      return this.render(e);
    }
    const i = n.element.classList;
    this.it.forEach((s) => {
      s in e || (i.remove(s), this.it.delete(s));
    });
    for (const s in e) {
      const o = !!e[s];
      o === this.it.has(s) || ((r = this.nt) === null || r === void 0 ? void 0 : r.has(s)) || (o ? (i.add(s), this.it.add(s)) : (i.remove(s), this.it.delete(s)));
    }
    return Ft;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* ju(n, e) {
  if (n !== void 0) {
    let t = 0;
    for (const r of n)
      yield e(r, t++);
  }
}
const Rs = Math.min, on = Math.max, Sr = Math.round, kt = (n) => ({
  x: n,
  y: n
}), Vu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Fu = {
  start: "end",
  end: "start"
};
function al(n, e, t) {
  return on(n, Rs(e, t));
}
function Mi(n, e) {
  return typeof n == "function" ? n(e) : n;
}
function Wt(n) {
  return n.split("-")[0];
}
function Ei(n) {
  return n.split("-")[1];
}
function rc(n) {
  return n === "x" ? "y" : "x";
}
function ic(n) {
  return n === "y" ? "height" : "width";
}
function Ti(n) {
  return ["top", "bottom"].includes(Wt(n)) ? "y" : "x";
}
function sc(n) {
  return rc(Ti(n));
}
function Wu(n, e, t) {
  t === void 0 && (t = !1);
  const r = Ei(n), i = sc(n), s = ic(i);
  let o = i === "x" ? r === (t ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (o = Mr(o)), [o, Mr(o)];
}
function Uu(n) {
  const e = Mr(n);
  return [Ps(n), e, Ps(e)];
}
function Ps(n) {
  return n.replace(/start|end/g, (e) => Fu[e]);
}
function Ku(n, e, t) {
  const r = ["left", "right"], i = ["right", "left"], s = ["top", "bottom"], o = ["bottom", "top"];
  switch (n) {
    case "top":
    case "bottom":
      return t ? e ? i : r : e ? r : i;
    case "left":
    case "right":
      return e ? s : o;
    default:
      return [];
  }
}
function qu(n, e, t, r) {
  const i = Ei(n);
  let s = Ku(Wt(n), t === "start", r);
  return i && (s = s.map((o) => o + "-" + i), e && (s = s.concat(s.map(Ps)))), s;
}
function Mr(n) {
  return n.replace(/left|right|bottom|top/g, (e) => Vu[e]);
}
function Ju(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function Gu(n) {
  return typeof n != "number" ? Ju(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function Er(n) {
  return {
    ...n,
    top: n.y,
    left: n.x,
    right: n.x + n.width,
    bottom: n.y + n.height
  };
}
function cl(n, e, t) {
  let {
    reference: r,
    floating: i
  } = n;
  const s = Ti(e), o = sc(e), l = ic(o), a = Wt(e), c = s === "y", d = r.x + r.width / 2 - i.width / 2, u = r.y + r.height / 2 - i.height / 2, h = r[l] / 2 - i[l] / 2;
  let f;
  switch (a) {
    case "top":
      f = {
        x: d,
        y: r.y - i.height
      };
      break;
    case "bottom":
      f = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      f = {
        x: r.x + r.width,
        y: u
      };
      break;
    case "left":
      f = {
        x: r.x - i.width,
        y: u
      };
      break;
    default:
      f = {
        x: r.x,
        y: r.y
      };
  }
  switch (Ei(e)) {
    case "start":
      f[o] -= h * (t && c ? -1 : 1);
      break;
    case "end":
      f[o] += h * (t && c ? -1 : 1);
      break;
  }
  return f;
}
const Zu = async (n, e, t) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: o
  } = t, l = s.filter(Boolean), a = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let c = await o.getElementRects({
    reference: n,
    floating: e,
    strategy: i
  }), {
    x: d,
    y: u
  } = cl(c, r, a), h = r, f = {}, p = 0;
  for (let m = 0; m < l.length; m++) {
    const {
      name: g,
      fn: b
    } = l[m], {
      x: v,
      y: C,
      data: T,
      reset: _
    } = await b({
      x: d,
      y: u,
      initialPlacement: r,
      placement: h,
      strategy: i,
      middlewareData: f,
      rects: c,
      platform: o,
      elements: {
        reference: n,
        floating: e
      }
    });
    d = v != null ? v : d, u = C != null ? C : u, f = {
      ...f,
      [g]: {
        ...f[g],
        ...T
      }
    }, _ && p <= 50 && (p++, typeof _ == "object" && (_.placement && (h = _.placement), _.rects && (c = _.rects === !0 ? await o.getElementRects({
      reference: n,
      floating: e,
      strategy: i
    }) : _.rects), {
      x: d,
      y: u
    } = cl(c, h, a)), m = -1);
  }
  return {
    x: d,
    y: u,
    placement: h,
    strategy: i,
    middlewareData: f
  };
};
async function oc(n, e) {
  var t;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: s,
    rects: o,
    elements: l,
    strategy: a
  } = n, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: h = !1,
    padding: f = 0
  } = Mi(e, n), p = Gu(f), g = l[h ? u === "floating" ? "reference" : "floating" : u], b = Er(await s.getClippingRect({
    element: (t = await (s.isElement == null ? void 0 : s.isElement(g))) == null || t ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: a
  })), v = u === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), T = await (s.isElement == null ? void 0 : s.isElement(C)) ? await (s.getScale == null ? void 0 : s.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, _ = Er(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: v,
    offsetParent: C,
    strategy: a
  }) : v);
  return {
    top: (b.top - _.top + p.top) / T.y,
    bottom: (_.bottom - b.bottom + p.bottom) / T.y,
    left: (b.left - _.left + p.left) / T.x,
    right: (_.right - b.right + p.right) / T.x
  };
}
const Yu = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(e) {
      var t, r;
      const {
        placement: i,
        middlewareData: s,
        rects: o,
        initialPlacement: l,
        platform: a,
        elements: c
      } = e, {
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: h,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: m = !0,
        ...g
      } = Mi(n, e);
      if ((t = s.arrow) != null && t.alignmentOffset)
        return {};
      const b = Wt(i), v = Wt(l) === l, C = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), T = h || (v || !m ? [Mr(l)] : Uu(l));
      !h && p !== "none" && T.push(...qu(l, m, p, C));
      const _ = [l, ...T], A = await oc(e, g), H = [];
      let Z = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && H.push(A[b]), u) {
        const ve = Wu(i, o, C);
        H.push(A[ve[0]], A[ve[1]]);
      }
      if (Z = [...Z, {
        placement: i,
        overflows: H
      }], !H.every((ve) => ve <= 0)) {
        var R, pe;
        const ve = (((R = s.flip) == null ? void 0 : R.index) || 0) + 1, Gt = _[ve];
        if (Gt)
          return {
            data: {
              index: ve,
              overflows: Z
            },
            reset: {
              placement: Gt
            }
          };
        let rt = (pe = Z.filter((Re) => Re.overflows[0] <= 0).sort((Re, _e) => Re.overflows[1] - _e.overflows[1])[0]) == null ? void 0 : pe.placement;
        if (!rt)
          switch (f) {
            case "bestFit": {
              var Ae;
              const Re = (Ae = Z.map((_e) => [_e.placement, _e.overflows.filter((ke) => ke > 0).reduce((ke, At) => ke + At, 0)]).sort((_e, ke) => _e[1] - ke[1])[0]) == null ? void 0 : Ae[0];
              Re && (rt = Re);
              break;
            }
            case "initialPlacement":
              rt = l;
              break;
          }
        if (i !== rt)
          return {
            reset: {
              placement: rt
            }
          };
      }
      return {};
    }
  };
};
async function Xu(n, e) {
  const {
    placement: t,
    platform: r,
    elements: i
  } = n, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Wt(t), l = Ei(t), a = Ti(t) === "y", c = ["left", "top"].includes(o) ? -1 : 1, d = s && a ? -1 : 1, u = Mi(e, n);
  let {
    mainAxis: h,
    crossAxis: f,
    alignmentAxis: p
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...u
  };
  return l && typeof p == "number" && (f = l === "end" ? p * -1 : p), a ? {
    x: f * d,
    y: h * c
  } : {
    x: h * c,
    y: f * d
  };
}
const Qu = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(e) {
      var t, r;
      const {
        x: i,
        y: s,
        placement: o,
        middlewareData: l
      } = e, a = await Xu(e, n);
      return o === ((t = l.offset) == null ? void 0 : t.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: i + a.x,
        y: s + a.y,
        data: {
          ...a,
          placement: o
        }
      };
    }
  };
}, eh = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(e) {
      const {
        x: t,
        y: r,
        placement: i
      } = e, {
        mainAxis: s = !0,
        crossAxis: o = !1,
        limiter: l = {
          fn: (g) => {
            let {
              x: b,
              y: v
            } = g;
            return {
              x: b,
              y: v
            };
          }
        },
        ...a
      } = Mi(n, e), c = {
        x: t,
        y: r
      }, d = await oc(e, a), u = Ti(Wt(i)), h = rc(u);
      let f = c[h], p = c[u];
      if (s) {
        const g = h === "y" ? "top" : "left", b = h === "y" ? "bottom" : "right", v = f + d[g], C = f - d[b];
        f = al(v, f, C);
      }
      if (o) {
        const g = u === "y" ? "top" : "left", b = u === "y" ? "bottom" : "right", v = p + d[g], C = p - d[b];
        p = al(v, p, C);
      }
      const m = l.fn({
        ...e,
        [h]: f,
        [u]: p
      });
      return {
        ...m,
        data: {
          x: m.x - t,
          y: m.y - r
        }
      };
    }
  };
};
function xt(n) {
  return lc(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function be(n) {
  var e;
  return (n == null || (e = n.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function St(n) {
  var e;
  return (e = (lc(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : e.documentElement;
}
function lc(n) {
  return n instanceof Node || n instanceof be(n).Node;
}
function nt(n) {
  return n instanceof Element || n instanceof be(n).Element;
}
function Ue(n) {
  return n instanceof HTMLElement || n instanceof be(n).HTMLElement;
}
function dl(n) {
  return typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof be(n).ShadowRoot;
}
function er(n) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: r,
    display: i
  } = Me(n);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + t) && !["inline", "contents"].includes(i);
}
function th(n) {
  return ["table", "td", "th"].includes(xt(n));
}
function yo(n) {
  const e = vo(), t = Me(n);
  return t.transform !== "none" || t.perspective !== "none" || (t.containerType ? t.containerType !== "normal" : !1) || !e && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !e && (t.filter ? t.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (t.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (t.contain || "").includes(r));
}
function nh(n) {
  let e = mn(n);
  for (; Ue(e) && !Ai(e); ) {
    if (yo(e))
      return e;
    e = mn(e);
  }
  return null;
}
function vo() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ai(n) {
  return ["html", "body", "#document"].includes(xt(n));
}
function Me(n) {
  return be(n).getComputedStyle(n);
}
function _i(n) {
  return nt(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.pageXOffset,
    scrollTop: n.pageYOffset
  };
}
function mn(n) {
  if (xt(n) === "html")
    return n;
  const e = n.assignedSlot || n.parentNode || dl(n) && n.host || St(n);
  return dl(e) ? e.host : e;
}
function ac(n) {
  const e = mn(n);
  return Ai(e) ? n.ownerDocument ? n.ownerDocument.body : n.body : Ue(e) && er(e) ? e : ac(e);
}
function Is(n, e, t) {
  var r;
  e === void 0 && (e = []), t === void 0 && (t = !0);
  const i = ac(n), s = i === ((r = n.ownerDocument) == null ? void 0 : r.body), o = be(i);
  return s ? e.concat(o, o.visualViewport || [], er(i) ? i : [], o.frameElement && t ? Is(o.frameElement) : []) : e.concat(i, Is(i, [], t));
}
function cc(n) {
  const e = Me(n);
  let t = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = Ue(n), s = i ? n.offsetWidth : t, o = i ? n.offsetHeight : r, l = Sr(t) !== s || Sr(r) !== o;
  return l && (t = s, r = o), {
    width: t,
    height: r,
    $: l
  };
}
function dc(n) {
  return nt(n) ? n : n.contextElement;
}
function ln(n) {
  const e = dc(n);
  if (!Ue(e))
    return kt(1);
  const t = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: s
  } = cc(e);
  let o = (s ? Sr(t.width) : t.width) / r, l = (s ? Sr(t.height) : t.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const rh = /* @__PURE__ */ kt(0);
function uc(n) {
  const e = be(n);
  return !vo() || !e.visualViewport ? rh : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ih(n, e, t) {
  return e === void 0 && (e = !1), !t || e && t !== be(n) ? !1 : e;
}
function Vn(n, e, t, r) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const i = n.getBoundingClientRect(), s = dc(n);
  let o = kt(1);
  e && (r ? nt(r) && (o = ln(r)) : o = ln(n));
  const l = ih(s, t, r) ? uc(s) : kt(0);
  let a = (i.left + l.x) / o.x, c = (i.top + l.y) / o.y, d = i.width / o.x, u = i.height / o.y;
  if (s) {
    const h = be(s), f = r && nt(r) ? be(r) : r;
    let p = h, m = p.frameElement;
    for (; m && r && f !== p; ) {
      const g = ln(m), b = m.getBoundingClientRect(), v = Me(m), C = b.left + (m.clientLeft + parseFloat(v.paddingLeft)) * g.x, T = b.top + (m.clientTop + parseFloat(v.paddingTop)) * g.y;
      a *= g.x, c *= g.y, d *= g.x, u *= g.y, a += C, c += T, p = be(m), m = p.frameElement;
    }
  }
  return Er({
    width: d,
    height: u,
    x: a,
    y: c
  });
}
const sh = [":popover-open", ":modal"];
function hc(n) {
  return sh.some((e) => {
    try {
      return n.matches(e);
    } catch {
      return !1;
    }
  });
}
function oh(n) {
  let {
    elements: e,
    rect: t,
    offsetParent: r,
    strategy: i
  } = n;
  const s = i === "fixed", o = St(r), l = e ? hc(e.floating) : !1;
  if (r === o || l && s)
    return t;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = kt(1);
  const d = kt(0), u = Ue(r);
  if ((u || !u && !s) && ((xt(r) !== "body" || er(o)) && (a = _i(r)), Ue(r))) {
    const h = Vn(r);
    c = ln(r), d.x = h.x + r.clientLeft, d.y = h.y + r.clientTop;
  }
  return {
    width: t.width * c.x,
    height: t.height * c.y,
    x: t.x * c.x - a.scrollLeft * c.x + d.x,
    y: t.y * c.y - a.scrollTop * c.y + d.y
  };
}
function lh(n) {
  return Array.from(n.getClientRects());
}
function fc(n) {
  return Vn(St(n)).left + _i(n).scrollLeft;
}
function ah(n) {
  const e = St(n), t = _i(n), r = n.ownerDocument.body, i = on(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), s = on(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -t.scrollLeft + fc(n);
  const l = -t.scrollTop;
  return Me(r).direction === "rtl" && (o += on(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: s,
    x: o,
    y: l
  };
}
function ch(n, e) {
  const t = be(n), r = St(n), i = t.visualViewport;
  let s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    const c = vo();
    (!c || c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function dh(n, e) {
  const t = Vn(n, !0, e === "fixed"), r = t.top + n.clientTop, i = t.left + n.clientLeft, s = Ue(n) ? ln(n) : kt(1), o = n.clientWidth * s.x, l = n.clientHeight * s.y, a = i * s.x, c = r * s.y;
  return {
    width: o,
    height: l,
    x: a,
    y: c
  };
}
function ul(n, e, t) {
  let r;
  if (e === "viewport")
    r = ch(n, t);
  else if (e === "document")
    r = ah(St(n));
  else if (nt(e))
    r = dh(e, t);
  else {
    const i = uc(n);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return Er(r);
}
function pc(n, e) {
  const t = mn(n);
  return t === e || !nt(t) || Ai(t) ? !1 : Me(t).position === "fixed" || pc(t, e);
}
function uh(n, e) {
  const t = e.get(n);
  if (t)
    return t;
  let r = Is(n, [], !1).filter((l) => nt(l) && xt(l) !== "body"), i = null;
  const s = Me(n).position === "fixed";
  let o = s ? mn(n) : n;
  for (; nt(o) && !Ai(o); ) {
    const l = Me(o), a = yo(o);
    !a && l.position === "fixed" && (i = null), (s ? !a && !i : !a && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || er(o) && !a && pc(n, o)) ? r = r.filter((d) => d !== o) : i = l, o = mn(o);
  }
  return e.set(n, r), r;
}
function hh(n) {
  let {
    element: e,
    boundary: t,
    rootBoundary: r,
    strategy: i
  } = n;
  const o = [...t === "clippingAncestors" ? uh(e, this._c) : [].concat(t), r], l = o[0], a = o.reduce((c, d) => {
    const u = ul(e, d, i);
    return c.top = on(u.top, c.top), c.right = Rs(u.right, c.right), c.bottom = Rs(u.bottom, c.bottom), c.left = on(u.left, c.left), c;
  }, ul(e, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function fh(n) {
  const {
    width: e,
    height: t
  } = cc(n);
  return {
    width: e,
    height: t
  };
}
function ph(n, e, t) {
  const r = Ue(e), i = St(e), s = t === "fixed", o = Vn(n, !0, s, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = kt(0);
  if (r || !r && !s)
    if ((xt(e) !== "body" || er(i)) && (l = _i(e)), r) {
      const u = Vn(e, !0, s, e);
      a.x = u.x + e.clientLeft, a.y = u.y + e.clientTop;
    } else
      i && (a.x = fc(i));
  const c = o.left + l.scrollLeft - a.x, d = o.top + l.scrollTop - a.y;
  return {
    x: c,
    y: d,
    width: o.width,
    height: o.height
  };
}
function hl(n, e) {
  return !Ue(n) || Me(n).position === "fixed" ? null : e ? e(n) : n.offsetParent;
}
function mc(n, e) {
  const t = be(n);
  if (!Ue(n) || hc(n))
    return t;
  let r = hl(n, e);
  for (; r && th(r) && Me(r).position === "static"; )
    r = hl(r, e);
  return r && (xt(r) === "html" || xt(r) === "body" && Me(r).position === "static" && !yo(r)) ? t : r || nh(n) || t;
}
const mh = async function(n) {
  const e = this.getOffsetParent || mc, t = this.getDimensions;
  return {
    reference: ph(n.reference, await e(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      ...await t(n.floating)
    }
  };
};
function gh(n) {
  return Me(n).direction === "rtl";
}
const bh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: oh,
  getDocumentElement: St,
  getClippingRect: hh,
  getOffsetParent: mc,
  getElementRects: mh,
  getClientRects: lh,
  getDimensions: fh,
  getScale: ln,
  isElement: nt,
  isRTL: gh
}, yh = eh, vh = Yu, kh = (n, e, t) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: bh,
    ...t
  }, s = {
    ...i.platform,
    _c: r
  };
  return Zu(n, e, {
    ...i,
    platform: s
  });
};
function Y(n) {
  this.content = n;
}
Y.prototype = {
  constructor: Y,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n)
        return e;
    return -1;
  },
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), s = r.content.slice();
    return i == -1 ? s.push(t || n, e) : (s[i + 1] = e, t && (s[i] = t)), new Y(s);
  },
  remove: function(n) {
    var e = this.find(n);
    if (e == -1)
      return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Y(t);
  },
  addToStart: function(n, e) {
    return new Y([n, e].concat(this.remove(n).content));
  },
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Y(t);
  },
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(n);
    return i.splice(s == -1 ? i.length : s, 0, e, t), new Y(i);
  },
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  prepend: function(n) {
    return n = Y.from(n), n.size ? new Y(n.content.concat(this.subtract(n).content)) : this;
  },
  append: function(n) {
    return n = Y.from(n), n.size ? new Y(this.subtract(n).content.concat(n.content)) : this;
  },
  subtract: function(n) {
    var e = this;
    n = Y.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  get size() {
    return this.content.length >> 1;
  }
};
Y.from = function(n) {
  if (n instanceof Y)
    return n;
  var e = [];
  if (n)
    for (var t in n)
      e.push(t, n[t]);
  return new Y(e);
};
function gc(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), s = e.child(r);
    if (i == s) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return t;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++)
        t++;
      return t;
    }
    if (i.content.size || s.content.size) {
      let o = gc(i.content, s.content, t + 1);
      if (o != null)
        return o;
    }
    t += i.nodeSize;
  }
}
function bc(n, e, t, r) {
  for (let i = n.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: t, b: r };
    let o = n.child(--i), l = e.child(--s), a = o.nodeSize;
    if (o == l) {
      t -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0, d = Math.min(o.text.length, l.text.length);
      for (; c < d && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = bc(o.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class k {
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  nodesBetween(e, t, r, i = 0, s) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let d = l + 1;
        a.nodesBetween(Math.max(0, e - d), Math.min(a.content.size, t - d), r, i + d);
      }
      l = c;
    }
  }
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  textBetween(e, t, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (o ? o = !1 : s += r), s += c;
    }, 0), s;
  }
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new k(i, this.size + e.size);
  }
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))), r.push(l), i += l.nodeSize), o = a;
      }
    return new k(r, i);
  }
  cutByIndex(e, t) {
    return e == t ? k.empty : e == 0 && t == this.content.length ? this : new k(this.content.slice(e, t));
  }
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new k(i, s);
  }
  addToStart(e) {
    return new k([e].concat(this.content), this.size + e.nodeSize);
  }
  addToEnd(e) {
    return new k(this.content.concat(e), this.size + e.nodeSize);
  }
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  get childCount() {
    return this.content.length;
  }
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  maybeChild(e) {
    return this.content[e] || null;
  }
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  findDiffStart(e, t = 0) {
    return gc(this, e, t);
  }
  findDiffEnd(e, t = this.size, r = e.size) {
    return bc(this, e, t, r);
  }
  findIndex(e, t = -1) {
    if (e == 0)
      return ir(0, e);
    if (e == this.size)
      return ir(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let s = this.child(r), o = i + s.nodeSize;
      if (o >= e)
        return o == e || t > 0 ? ir(r + 1, o) : ir(r, i);
      i = o;
    }
  }
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  toStringInner() {
    return this.content.join(", ");
  }
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  static fromJSON(e, t) {
    if (!t)
      return k.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new k(t.map(e.nodeFromJSON));
  }
  static fromArray(e) {
    if (!e.length)
      return k.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new k(t || e, r);
  }
  static from(e) {
    if (!e)
      return k.empty;
    if (e instanceof k)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new k([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
k.empty = new k([], 0);
const es = { index: 0, offset: 0 };
function ir(n, e) {
  return es.index = n, es.offset = e, es;
}
function Tr(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!Tr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Tr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
class B {
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  eq(e) {
    return this == e || this.type == e.type && Tr(this.attrs, e.attrs);
  }
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    return r.create(t.attrs);
  }
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return B.none;
    if (e instanceof B)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
}
B.none = [];
class Ar extends Error {
}
class w {
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  insertAt(e, t) {
    let r = vc(this.content, e + this.openStart, t);
    return r && new w(r, this.openStart, this.openEnd);
  }
  removeBetween(e, t) {
    return new w(yc(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  static fromJSON(e, t) {
    if (!t)
      return w.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new w(k.fromJSON(e, t.content), r, i);
  }
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new w(e, r, i);
  }
}
w.empty = new w(k.empty, 0, 0);
function yc(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), s = n.maybeChild(r), { index: o, offset: l } = n.findIndex(t);
  if (i == e || s.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(yc(s.content, e - i - 1, t - i - 1)));
}
function vc(n, e, t, r) {
  let { index: i, offset: s } = n.findIndex(e), o = n.maybeChild(i);
  if (s == e || o.isText)
    return r && !r.canReplace(i, i, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let l = vc(o.content, e - s - 1, t);
  return l && n.replaceChild(i, o.copy(l));
}
function xh(n, e, t) {
  if (t.openStart > n.depth)
    throw new Ar("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Ar("Inconsistent open depths");
  return kc(n, e, t, 0);
}
function kc(n, e, t, r) {
  let i = n.index(r), s = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let o = kc(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent, l = o.content;
      return Bt(o, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = wh(t, n);
      return Bt(s, wc(n, o, l, e, r));
    }
  else
    return Bt(s, _r(n, e, r));
}
function xc(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Ar("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Bs(n, e, t) {
  let r = n.node(t);
  return xc(r, e.node(t)), r;
}
function It(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function $n(n, e, t, r) {
  let i = (e || n).node(t), s = 0, o = e ? e.index(t) : i.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (It(n.nodeAfter, r), s++));
  for (let l = s; l < o; l++)
    It(i.child(l), r);
  e && e.depth == t && e.textOffset && It(e.nodeBefore, r);
}
function Bt(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function wc(n, e, t, r, i) {
  let s = n.depth > i && Bs(n, e, i + 1), o = r.depth > i && Bs(t, r, i + 1), l = [];
  return $n(null, n, i, l), s && o && e.index(i) == t.index(i) ? (xc(s, o), It(Bt(s, wc(n, e, t, r, i + 1)), l)) : (s && It(Bt(s, _r(n, e, i + 1)), l), $n(e, t, i, l), o && It(Bt(o, _r(t, r, i + 1)), l)), $n(r, null, i, l), new k(l);
}
function _r(n, e, t) {
  let r = [];
  if ($n(null, n, t, r), n.depth > t) {
    let i = Bs(n, e, t + 1);
    It(Bt(i, _r(n, e, t + 1)), r);
  }
  return $n(e, null, t, r), new k(r);
}
function wh(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    i = e.node(s).copy(k.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Fn {
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  get parent() {
    return this.node(this.depth);
  }
  get doc() {
    return this.node(0);
  }
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      i += r.child(s).nodeSize;
    return i;
  }
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return B.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new Or(this, e, r);
    return null;
  }
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, s = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), c = s - a;
      if (r.push(o, l, i + a), !c || (o = o.child(l), o.isText))
        break;
      s = c - 1, i += a + 1;
    }
    return new Fn(t, r, s);
  }
  static resolveCached(e, t) {
    for (let i = 0; i < ts.length; i++) {
      let s = ts[i];
      if (s.pos == t && s.doc == e)
        return s;
    }
    let r = ts[ns] = Fn.resolve(e, t);
    return ns = (ns + 1) % Ch, r;
  }
}
let ts = [], ns = 0, Ch = 12;
class Or {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  get start() {
    return this.$from.before(this.depth + 1);
  }
  get end() {
    return this.$to.after(this.depth + 1);
  }
  get parent() {
    return this.$from.node(this.depth);
  }
  get startIndex() {
    return this.$from.index(this.depth);
  }
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Sh = /* @__PURE__ */ Object.create(null);
class Fe {
  constructor(e, t, r, i = B.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || k.empty;
  }
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  get childCount() {
    return this.content.childCount;
  }
  child(e) {
    return this.content.child(e);
  }
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  forEach(e) {
    this.content.forEach(e);
  }
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  get firstChild() {
    return this.content.firstChild;
  }
  get lastChild() {
    return this.content.lastChild;
  }
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  hasMarkup(e, t, r) {
    return this.type == e && Tr(this.attrs, t || e.defaultAttrs || Sh) && B.sameSet(this.marks, r || B.none);
  }
  copy(e = null) {
    return e == this.content ? this : new Fe(this.type, this.attrs, e, this.marks);
  }
  mark(e) {
    return e == this.marks ? this : new Fe(this.type, this.attrs, this.content, e);
  }
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return w.empty;
    let i = this.resolve(e), s = this.resolve(t), o = r ? 0 : i.sharedDepth(t), l = i.start(o), c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new w(c, i.depth - o, s.depth - o);
  }
  replace(e, t, r) {
    return xh(this.resolve(e), this.resolve(t), r);
  }
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  resolve(e) {
    return Fn.resolveCached(this, e);
  }
  resolveNoCache(e) {
    return Fn.resolve(this, e);
  }
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
  }
  get isBlock() {
    return this.type.isBlock;
  }
  get isTextblock() {
    return this.type.isTextblock;
  }
  get inlineContent() {
    return this.type.inlineContent;
  }
  get isInline() {
    return this.type.isInline;
  }
  get isText() {
    return this.type.isText;
  }
  get isLeaf() {
    return this.type.isLeaf;
  }
  get isAtom() {
    return this.type.isAtom;
  }
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Cc(this.marks, e);
  }
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  canReplace(e, t, r = k.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), l = o && o.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  check() {
    this.type.checkContent(this.content);
    let e = B.none;
    for (let t = 0; t < this.marks.length; t++)
      e = this.marks[t].addToSet(e);
    if (!B.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r = null;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = k.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
}
Fe.prototype.text = void 0;
class $r extends Fe {
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Cc(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new $r(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new $r(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Cc(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class Ut {
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  static parse(e, t) {
    let r = new Mh(e, t);
    if (r.next == null)
      return Ut.empty;
    let i = Sc(r);
    r.next && r.err("Unexpected trailing text");
    let s = Nh($h(i));
    return Lh(s, r), s;
  }
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let s = t; i && s < r; s++)
      i = i.matchType(e.child(s).type);
    return i;
  }
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return k.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: d, next: u } = o.next[c];
        if (!(d.isText || d.hasRequiredAttrs()) && i.indexOf(u) == -1) {
          i.push(u);
          let h = s(u, l.concat(d));
          if (h)
            return h;
        }
      }
      return null;
    }
    return s(this, []);
  }
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let l = i; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  get edgeCount() {
    return this.next.length;
  }
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
Ut.empty = new Ut(!0);
class Mh {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function Sc(n) {
  let e = [];
  do
    e.push(Eh(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Eh(n) {
  let e = [];
  do
    e.push(Th(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Th(n) {
  let e = Oh(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Ah(n, e);
    else
      break;
  return e;
}
function fl(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Ah(n, e) {
  let t = fl(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = fl(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function _h(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let s in t) {
    let o = t[s];
    o.groups.indexOf(e) > -1 && i.push(o);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function Oh(n) {
  if (n.eat("(")) {
    let e = Sc(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = _h(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function $h(n) {
  let e = [[]];
  return i(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function i(o, l) {
    o.forEach((a) => a.to = l);
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(s(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = s(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (o.type == "star") {
      let a = t();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = t();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let d = t();
          i(s(o.expr, a), d), a = d;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let d = t();
            r(a, d), i(s(o.expr, a), d), a = d;
          }
        return [r(a)];
      } else {
        if (o.type == "name")
          return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Mc(n, e) {
  return e - n;
}
function pl(n, e) {
  let t = [];
  return r(e), t.sort(Mc);
  function r(i) {
    let s = n[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Nh(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(pl(n, 0));
  function t(r) {
    let i = [];
    r.forEach((o) => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let d = 0; d < i.length; d++)
          i[d][0] == l && (c = i[d][1]);
        pl(n, a).forEach((d) => {
          c || i.push([l, c = []]), c.indexOf(d) == -1 && c.push(d);
        });
      });
    });
    let s = e[r.join(",")] = new Ut(r.indexOf(n.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(Mc);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || t(l) });
    }
    return s;
  }
}
function Lh(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ec(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Tc(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let s = n[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function Ac(n) {
  let e = /* @__PURE__ */ Object.create(null);
  if (n)
    for (let t in n)
      e[t] = new Dh(n[t]);
  return e;
}
class Nr {
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ac(r.attrs), this.defaultAttrs = Ec(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  get isInline() {
    return !this.isBlock;
  }
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  get isLeaf() {
    return this.contentMatch == Ut.empty;
  }
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Tc(this.attrs, e);
  }
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Fe(this, this.computeAttrs(e), k.from(t), B.setFrom(r));
  }
  createChecked(e = null, t, r) {
    return t = k.from(t), this.checkContent(t), new Fe(this, this.computeAttrs(e), t, B.setFrom(r));
  }
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = k.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t), s = i && i.fillBefore(k.empty, !0);
    return s ? new Fe(this, e, t.append(s), B.setFrom(r)) : null;
  }
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : B.none : e;
  }
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new Nr(s, t, o));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
}
class Dh {
  constructor(e) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(e, "default"), this.default = e.default;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Oi {
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ac(i.attrs), this.excluded = null;
    let s = Ec(this.attrs);
    this.instance = s ? new B(this, s) : null;
  }
  create(e = null) {
    return !e && this.instance ? this.instance : new B(this, Tc(this.attrs, e));
  }
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new Oi(s, i++, t, o)), r;
  }
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Rh {
  constructor(e) {
    this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Y.from(e.nodes), t.marks = Y.from(e.marks || {}), this.nodes = Nr.compile(this.spec.nodes, this), this.marks = Oi.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      s.contentMatch = r[o] || (r[o] = Ut.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.markSet = l == "_" ? null : l ? ml(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : ml(this, o.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Nr) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else
      throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  text(e, t) {
    let r = this.nodes.text;
    return new $r(r, r.defaultAttrs, e, B.setFrom(t));
  }
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  nodeFromJSON(e) {
    return Fe.fromJSON(this, e);
  }
  markFromJSON(e) {
    return B.fromJSON(this, e);
  }
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function ml(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = n.marks[i], o = s;
    if (s)
      t.push(s);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
class gn {
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [], t.forEach((r) => {
      r.tag ? this.tags.push(r) : r.style && this.styles.push(r);
    }), this.normalizeLists = !this.tags.some((r) => {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node)
        return !1;
      let i = e.nodes[r.node];
      return i.contentMatch.matchType(i);
    });
  }
  parse(e, t = {}) {
    let r = new bl(this, t, !1);
    return r.addAll(e, t.from, t.to), r.finish();
  }
  parseSlice(e, t = {}) {
    let r = new bl(this, t, !0);
    return r.addAll(e, t.from, t.to), w.maxOpen(r.finish());
  }
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (Bh(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  matchStyle(e, t, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = yl(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = yl(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return t;
  }
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new gn(e, gn.schemaRules(e)));
  }
}
const _c = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Ph = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Oc = { ol: !0, ul: !0 }, Lr = 1, Dr = 2, Nn = 4;
function gl(n, e, t) {
  return e != null ? (e ? Lr : 0) | (e === "full" ? Dr : 0) : n && n.whitespace == "pre" ? Lr | Dr : t & ~Nn;
}
class sr {
  constructor(e, t, r, i, s, o, l) {
    this.type = e, this.attrs = t, this.marks = r, this.pendingMarks = i, this.solid = s, this.options = l, this.content = [], this.activeMarks = B.none, this.stashMarks = [], this.match = o || (l & Nn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(k.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Lr)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let t = k.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(k.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  popFromStashMark(e) {
    for (let t = this.stashMarks.length - 1; t >= 0; t--)
      if (e.eq(this.stashMarks[t]))
        return this.stashMarks.splice(t, 1)[0];
  }
  applyPending(e) {
    for (let t = 0, r = this.pendingMarks; t < r.length; t++) {
      let i = r[t];
      (this.type ? this.type.allowsMarkType(i.type) : zh(i.type, e)) && !i.isInSet(this.activeMarks) && (this.activeMarks = i.addToSet(this.activeMarks), this.pendingMarks = i.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !_c.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class bl {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let i = t.topNode, s, o = gl(null, t.preserveWhitespace, 0) | (r ? Nn : 0);
    i ? s = new sr(i.type, i.attrs, B.none, B.none, !0, t.topMatch || i.type.contentMatch, o) : r ? s = new sr(null, null, B.none, B.none, !0, null, o) : s = new sr(e.schema.topNodeType, null, B.none, B.none, !0, null, o), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  addDOM(e) {
    e.nodeType == 3 ? this.addTextNode(e) : e.nodeType == 1 && this.addElement(e);
  }
  withStyleRules(e, t) {
    let r = e.getAttribute("style");
    if (!r)
      return t();
    let i = this.readStyles(Hh(r));
    if (!i)
      return;
    let [s, o] = i, l = this.top;
    for (let a = 0; a < o.length; a++)
      this.removePendingMark(o[a], l);
    for (let a = 0; a < s.length; a++)
      this.addPendingMark(s[a]);
    t();
    for (let a = 0; a < s.length; a++)
      this.removePendingMark(s[a], l);
    for (let a = 0; a < o.length; a++)
      this.addPendingMark(o[a]);
  }
  addTextNode(e) {
    let t = e.nodeValue, r = this.top;
    if (r.options & Dr || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(t)) {
      if (r.options & Lr)
        r.options & Dr ? t = t.replace(/\r\n?/g, `
`) : t = t.replace(/\r?\n|\r/g, " ");
      else if (t = t.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(t) && this.open == this.nodes.length - 1) {
        let i = r.content[r.content.length - 1], s = e.previousSibling;
        (!i || s && s.nodeName == "BR" || i.isText && /[ \t\r\n\u000c]$/.test(i.text)) && (t = t.slice(1));
      }
      t && this.insertNode(this.parser.schema.text(t)), this.findInText(e);
    } else
      this.findInside(e);
  }
  addElement(e, t) {
    let r = e.nodeName.toLowerCase(), i;
    Oc.hasOwnProperty(r) && this.parser.normalizeLists && Ih(e);
    let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (i = this.parser.matchTag(e, this, t));
    if (s ? s.ignore : Ph.hasOwnProperty(r))
      this.findInside(e), this.ignoreFallback(e);
    else if (!s || s.skip || s.closeParent) {
      s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
      let o, l = this.top, a = this.needsBlock;
      if (_c.hasOwnProperty(r))
        l.content.length && l.content[0].isInline && this.open && (this.open--, l = this.top), o = !0, l.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e);
        return;
      }
      s && s.skip ? this.addAll(e) : this.withStyleRules(e, () => this.addAll(e)), o && this.sync(l), this.needsBlock = a;
    } else
      this.withStyleRules(e, () => {
        this.addElementByRule(e, s, s.consuming === !1 ? i : void 0);
      });
  }
  leafFallback(e) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`));
  }
  ignoreFallback(e) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"));
  }
  readStyles(e) {
    let t = B.none, r = B.none;
    for (let i = 0; i < e.length; i += 2)
      for (let s = void 0; ; ) {
        let o = this.parser.matchStyle(e[i], e[i + 1], this, s);
        if (!o)
          break;
        if (o.ignore)
          return null;
        if (o.clearMark ? this.top.pendingMarks.concat(this.top.activeMarks).forEach((l) => {
          o.clearMark(l) && (r = l.addToSet(r));
        }) : t = this.parser.schema.marks[o.mark].create(o.attrs).addToSet(t), o.consuming === !1)
          s = o;
        else
          break;
      }
    return [t, r];
  }
  addElementByRule(e, t, r) {
    let i, s, o;
    t.node ? (s = this.parser.schema.nodes[t.node], s.isLeaf ? this.insertNode(s.create(t.attrs)) || this.leafFallback(e) : i = this.enter(s, t.attrs || null, t.preserveWhitespace)) : (o = this.parser.schema.marks[t.mark].create(t.attrs), this.addPendingMark(o));
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (r)
      this.addElement(e, r);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a);
    }
    i && this.sync(l) && this.open--, o && this.removePendingMark(o, l);
  }
  addAll(e, t, r) {
    let i = t || 0;
    for (let s = t ? e.childNodes[t] : e.firstChild, o = r == null ? null : e.childNodes[r]; s != o; s = s.nextSibling, ++i)
      this.findAtPoint(e, i), this.addDOM(s);
    this.findAtPoint(e, i);
  }
  findPlace(e) {
    let t, r;
    for (let i = this.open; i >= 0; i--) {
      let s = this.nodes[i], o = s.findWrapping(e);
      if (o && (!t || t.length > o.length) && (t = o, r = s, !o.length) || s.solid)
        break;
    }
    if (!t)
      return !1;
    this.sync(r);
    for (let i = 0; i < t.length; i++)
      this.enterInner(t[i], null, !1);
    return !0;
  }
  insertNode(e) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let t = this.textblockFromContext();
      t && this.enterInner(t);
    }
    if (this.findPlace(e)) {
      this.closeExtra();
      let t = this.top;
      t.applyPending(e.type), t.match && (t.match = t.match.matchType(e.type));
      let r = t.activeMarks;
      for (let i = 0; i < e.marks.length; i++)
        (!t.type || t.type.allowsMarkType(e.marks[i].type)) && (r = e.marks[i].addToSet(r));
      return t.content.push(e.mark(r)), !0;
    }
    return !1;
  }
  enter(e, t, r) {
    let i = this.findPlace(e.create(t));
    return i && this.enterInner(e, t, !0, r), i;
  }
  enterInner(e, t = null, r = !1, i) {
    this.closeExtra();
    let s = this.top;
    s.applyPending(e), s.match = s.match && s.match.matchType(e);
    let o = gl(e, i, s.options);
    s.options & Nn && s.content.length == 0 && (o |= Nn), this.nodes.push(new sr(e, t, s.activeMarks, s.pendingMarks, r, null, o)), this.open++;
  }
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--)
      if (this.nodes[t] == e)
        return this.open = t, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let d = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= s ? r.node(a - s).type : null;
          if (!d || d.name != c && d.groups.indexOf(c) == -1)
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
  addPendingMark(e) {
    let t = jh(e, this.top.pendingMarks);
    t && this.top.stashMarks.push(t), this.top.pendingMarks = e.addToSet(this.top.pendingMarks);
  }
  removePendingMark(e, t) {
    for (let r = this.open; r >= 0; r--) {
      let i = this.nodes[r];
      if (i.pendingMarks.lastIndexOf(e) > -1)
        i.pendingMarks = e.removeFromSet(i.pendingMarks);
      else {
        i.activeMarks = e.removeFromSet(i.activeMarks);
        let o = i.popFromStashMark(e);
        o && i.type && i.type.allowsMarkType(o.type) && (i.activeMarks = o.addToSet(i.activeMarks));
      }
      if (i == t)
        break;
    }
  }
}
function Ih(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Oc.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Bh(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Hh(n) {
  let e = /\s*([\w-]+)\s*:\s*([^;]+)/g, t, r = [];
  for (; t = e.exec(n); )
    r.push(t[1], t[2].trim());
  return r;
}
function yl(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function zh(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let s = [], o = (l) => {
      s.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: d } = l.edge(a);
        if (c == e || s.indexOf(d) < 0 && o(d))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
function jh(n, e) {
  for (let t = 0; t < e.length; t++)
    if (n.eq(e[t]))
      return e[t];
}
class je {
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  serializeFragment(e, t = {}, r) {
    r || (r = rs(t).createDocumentFragment());
    let i = r, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < s.length && a < o.marks.length; ) {
          let c = o.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < s.length; )
          i = s.pop()[1];
        for (; a < o.marks.length; ) {
          let c = o.marks[a++], d = this.serializeMark(c, o.isInline, t);
          d && (s.push([c, i]), i.appendChild(d.dom), i = d.contentDOM || d.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, t));
    }), r;
  }
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = je.renderSpec(rs(t), this.nodes[e.type.name](e));
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && je.renderSpec(rs(r), i(e, t));
  }
  static renderSpec(e, t, r = null) {
    if (typeof t == "string")
      return { dom: e.createTextNode(t) };
    if (t.nodeType != null)
      return { dom: t };
    if (t.dom && t.dom.nodeType != null)
      return t;
    let i = t[0], s = i.indexOf(" ");
    s > 0 && (r = i.slice(0, s), i = i.slice(s + 1));
    let o, l = r ? e.createElementNS(r, i) : e.createElement(i), a = t[1], c = 1;
    if (a && typeof a == "object" && a.nodeType == null && !Array.isArray(a)) {
      c = 2;
      for (let d in a)
        if (a[d] != null) {
          let u = d.indexOf(" ");
          u > 0 ? l.setAttributeNS(d.slice(0, u), d.slice(u + 1), a[d]) : l.setAttribute(d, a[d]);
        }
    }
    for (let d = c; d < t.length; d++) {
      let u = t[d];
      if (u === 0) {
        if (d < t.length - 1 || d > c)
          throw new RangeError("Content hole must be the only child of its parent node");
        return { dom: l, contentDOM: l };
      } else {
        let { dom: h, contentDOM: f } = je.renderSpec(e, u, r);
        if (l.appendChild(h), f) {
          if (o)
            throw new RangeError("Multiple content holes");
          o = f;
        }
      }
    }
    return { dom: l, contentDOM: o };
  }
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new je(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  static nodesFromSchema(e) {
    let t = vl(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  static marksFromSchema(e) {
    return vl(e.marks);
  }
}
function vl(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function rs(n) {
  return n.document || window.document;
}
const $c = 65535, Nc = Math.pow(2, 16);
function Vh(n, e) {
  return n + e * Nc;
}
function kl(n) {
  return n & $c;
}
function Fh(n) {
  return (n - (n & $c)) / Nc;
}
const Lc = 1, Dc = 2, mr = 4, Rc = 8;
class Hs {
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  get deleted() {
    return (this.delInfo & Rc) > 0;
  }
  get deletedBefore() {
    return (this.delInfo & (Lc | mr)) > 0;
  }
  get deletedAfter() {
    return (this.delInfo & (Dc | mr)) > 0;
  }
  get deletedAcross() {
    return (this.delInfo & mr) > 0;
  }
}
class me {
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && me.empty)
      return me.empty;
  }
  recover(e) {
    let t = 0, r = kl(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Fh(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  _map(e, t, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], d = this.ranges[l + o], u = a + c;
      if (e <= u) {
        let h = c ? e == a ? -1 : e == u ? 1 : t : t, f = a + i + (h < 0 ? 0 : d);
        if (r)
          return f;
        let p = e == (t < 0 ? a : u) ? null : Vh(l / 3, e - a), m = e == a ? Dc : e == u ? Lc : mr;
        return (t < 0 ? e != a : e != u) && (m |= Rc), new Hs(f, m, p);
      }
      i += d - c;
    }
    return r ? e + i : new Hs(e + i, 0, null);
  }
  touches(e, t) {
    let r = 0, i = kl(t), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], d = a + c;
      if (e <= d && l == i * 3)
        return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), c = this.ranges[i + t], d = this.ranges[i + r];
      e(l, l + c, a, a + d), s += d - c;
    }
  }
  invert() {
    return new me(this.ranges, !this.inverted);
  }
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  static offset(e) {
    return e == 0 ? me.empty : new me(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
me.empty = new me([]);
class an {
  constructor(e = [], t, r = 0, i = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = i;
  }
  slice(e = 0, t = this.maps.length) {
    return new an(this.maps, this.mirror, e, t);
  }
  copy() {
    return new an(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  invert() {
    let e = new an();
    return e.appendMappingInverted(this), e;
  }
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  _map(e, t, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this.maps[s], l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, e = this.maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Hs(e, i, null);
  }
}
const is = /* @__PURE__ */ Object.create(null);
class ie {
  getMap() {
    return me.empty;
  }
  merge(e) {
    return null;
  }
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = is[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  static jsonID(e, t) {
    if (e in is)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return is[e] = t, t.prototype.jsonID = e, t;
  }
}
class W {
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  static ok(e) {
    return new W(e, null);
  }
  static fail(e) {
    return new W(null, e);
  }
  static fromReplace(e, t, r, i) {
    try {
      return W.ok(e.replace(t, r, i));
    } catch (s) {
      if (s instanceof Ar)
        return W.fail(s.message);
      throw s;
    }
  }
}
function ko(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let s = n.child(i);
    s.content.size && (s = s.copy(ko(s.content, e, s))), s.isInline && (s = e(s, t, i)), r.push(s);
  }
  return k.fromArray(r);
}
class ht extends ie {
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new w(ko(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), t.openStart, t.openEnd);
    return W.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new Ve(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ht(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ht && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ht(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new ht(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ie.jsonID("addMark", ht);
class Ve extends ie {
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new w(ko(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return W.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new ht(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Ve(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ve && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ve(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Ve(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ie.jsonID("removeMark", Ve);
class ft extends ie {
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return W.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return W.fromReplace(e, this.pos, this.pos + 1, new w(k.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new ft(this.pos, t.marks[i]);
        return new ft(this.pos, this.mark);
      }
    }
    return new bn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new ft(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new ft(t.pos, e.markFromJSON(t.mark));
  }
}
ie.jsonID("addNodeMark", ft);
class bn extends ie {
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return W.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return W.fromReplace(e, this.pos, this.pos + 1, new w(k.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new ft(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new bn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new bn(t.pos, e.markFromJSON(t.mark));
  }
}
ie.jsonID("removeNodeMark", bn);
class K extends ie {
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && zs(e, this.from, this.to) ? W.fail("Structure replace would overwrite content") : W.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new me([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new K(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new K(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof K) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? w.empty : new w(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new K(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? w.empty : new w(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new K(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new K(t.from, t.to, w.fromJSON(e, t.slice), !!t.structure);
  }
}
ie.jsonID("replace", K);
class q extends ie {
  constructor(e, t, r, i, s, o, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (zs(e, this.from, this.gapFrom) || zs(e, this.gapTo, this.to)))
      return W.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return W.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? W.fromReplace(e, this.from, this.to, r) : W.fail("Content does not fit in gap");
  }
  getMap() {
    return new me([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new q(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = e.map(this.gapFrom, -1), s = e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || s > r.pos ? null : new q(t.pos, r.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new q(t.from, t.to, t.gapFrom, t.gapTo, w.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
ie.jsonID("replaceAround", q);
function zs(n, e, t) {
  let r = n.resolve(e), i = t - e, s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function Wh(n, e, t, r) {
  let i = [], s = [], o, l;
  n.doc.nodesBetween(e, t, (a, c, d) => {
    if (!a.isInline)
      return;
    let u = a.marks;
    if (!r.isInSet(u) && d.type.allowsMarkType(r.type)) {
      let h = Math.max(c, e), f = Math.min(c + a.nodeSize, t), p = r.addToSet(u);
      for (let m = 0; m < u.length; m++)
        u[m].isInSet(p) || (o && o.to == h && o.mark.eq(u[m]) ? o.to = f : i.push(o = new Ve(h, f, u[m])));
      l && l.to == h ? l.to = f : s.push(l = new ht(h, f, r));
    }
  }), i.forEach((a) => n.step(a)), s.forEach((a) => n.step(a));
}
function Uh(n, e, t, r) {
  let i = [], s = 0;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (r instanceof Oi) {
      let c = o.marks, d;
      for (; d = r.isInSet(c); )
        (a || (a = [])).push(d), c = d.removeFromSet(c);
    } else
      r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let d = 0; d < a.length; d++) {
        let u = a[d], h;
        for (let f = 0; f < i.length; f++) {
          let p = i[f];
          p.step == s - 1 && u.eq(i[f].style) && (h = p);
        }
        h ? (h.to = c, h.step = s) : i.push({ style: u, from: Math.max(l, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => n.step(new Ve(o.from, o.to, o.style)));
}
function Kh(n, e, t, r = t.contentMatch) {
  let i = n.doc.nodeAt(e), s = [], o = e + 1;
  for (let l = 0; l < i.childCount; l++) {
    let a = i.child(l), c = o + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new K(o, c, w.empty));
    else {
      r = d;
      for (let u = 0; u < a.marks.length; u++)
        t.allowsMarkType(a.marks[u].type) || n.step(new Ve(o, c, a.marks[u]));
      if (a.isText && !t.spec.code) {
        let u, h = /\r?\n|\r/g, f;
        for (; u = h.exec(a.text); )
          f || (f = new w(k.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new K(o + u.index, o + u.index + u[0].length, f));
      }
    }
    o = c;
  }
  if (!r.validEnd) {
    let l = r.fillBefore(k.empty, !0);
    n.replace(o, o, new w(l, 0, 0));
  }
  for (let l = s.length - 1; l >= 0; l--)
    n.step(s[l]);
}
function qh(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Sn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), s = n.$from.index(r), o = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(s, o, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !qh(i, s, o))
      break;
  }
  return null;
}
function Jh(n, e, t) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), l = i.after(s + 1), a = o, c = l, d = k.empty, u = 0;
  for (let p = s, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, d = k.from(r.node(p).copy(d)), u++) : a--;
  let h = k.empty, f = 0;
  for (let p = s, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, h = k.from(i.node(p).copy(h)), f++) : c++;
  n.step(new q(a, c, o, l, new w(d.append(h), u, f), d.size - u, !0));
}
function xo(n, e, t = null, r = n) {
  let i = Gh(n, e), s = i && Zh(r, e);
  return s ? i.map(xl).concat({ type: e, attrs: t }).concat(s.map(xl)) : null;
}
function xl(n) {
  return { type: n, attrs: null };
}
function Gh(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(r, i, o) ? s : null;
}
function Zh(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function Yh(n, e, t) {
  let r = k.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = k.from(t[o].type.create(t[o].attrs, r));
  }
  let i = e.start, s = e.end;
  n.step(new q(i, s, i, s, new w(r, 0, 0), t.length, !0));
}
function Xh(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (o.isTextblock && !o.hasMarkup(r, i) && Qh(n.doc, n.mapping.slice(s).map(l), r)) {
      n.clearIncompatible(n.mapping.slice(s).map(l, 1), r);
      let a = n.mapping.slice(s), c = a.map(l, 1), d = a.map(l + o.nodeSize, 1);
      return n.step(new q(c, d, c + 1, d - 1, new w(k.from(r.create(i, null, o.marks)), 0, 0), 1, !0)), !1;
    }
  });
}
function Qh(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function ef(n, e, t, r, i) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(r, null, i || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new q(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new w(k.from(o), 0, 0), 1, !0));
}
function cn(n, e, t = 1, r) {
  let i = n.resolve(e), s = i.depth - t, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, d = t - 2; c > s; c--, d--) {
    let u = i.node(c), h = i.index(c);
    if (u.type.spec.isolating)
      return !1;
    let f = u.content.cutByIndex(h, u.childCount), p = r && r[d + 1];
    p && (f = f.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[d] || u;
    if (!u.canReplace(h + 1, u.childCount) || !m.type.validContent(f))
      return !1;
  }
  let l = i.indexAfter(s), a = r && r[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function tf(n, e, t = 1, r) {
  let i = n.doc.resolve(e), s = k.empty, o = k.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    s = k.from(i.node(l).copy(s));
    let d = r && r[c];
    o = k.from(d ? d.type.create(d.attrs, o) : i.node(l).copy(o));
  }
  n.step(new K(e, e, new w(s.append(o), t, t), !0));
}
function Mt(n, e) {
  let t = n.resolve(e), r = t.index();
  return Pc(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Pc(n, e) {
  return !!(n && e && !n.isLeaf && n.canAppend(e));
}
function $i(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let s, o, l = r.index(i);
    if (i == r.depth ? (s = r.nodeBefore, o = r.nodeAfter) : t > 0 ? (s = r.node(i + 1), l++, o = r.node(i).maybeChild(l)) : (s = r.node(i).maybeChild(l - 1), o = r.node(i + 1)), s && !s.isTextblock && Pc(s, o) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function nf(n, e, t) {
  let r = new K(e - t, e + t, w.empty, !0);
  n.step(r);
}
function rf(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function Ic(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let s = 0; s < t.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let l = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, a = r.index(o) + (l > 0 ? 1 : 0), c = r.node(o), d = !1;
      if (s == 1)
        d = c.canReplace(a, a, i);
      else {
        let u = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        d = u && c.canReplaceWith(a, a, u[0]);
      }
      if (d)
        return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function Ni(n, e, t = e, r = w.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), s = n.resolve(t);
  return Bc(i, s, r) ? new K(e, t, r) : new sf(i, s, r).fit();
}
function Bc(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class sf {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = k.empty;
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = k.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new w(s, o, l);
    return e > -1 ? new q(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new K(r.pos, i.pos, a) : null;
  }
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = ss(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], d, u = null;
          if (t == 1 && (o ? c.matchType(o.type) || (u = c.fillBefore(k.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: u };
          if (t == 2 && o && (d = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: d };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ss(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new w(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ss(e, t);
    if (i.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + i.size;
      this.unplaced = new w(Tn(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new w(Tn(e, t, 1), t, r);
  }
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, d = [], { match: u, type: h } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        d.push(i.child(m));
      u = u.matchFragment(i);
    }
    let f = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = u.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (u = g, d.push(Hc(m.mark(h.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? f : -1)));
    }
    let p = c == l.childCount;
    p || (f = -1), this.placed = An(this.placed, t, k.from(d)), this.frontier[t].match = u, p && f < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < f; m++) {
      let b = g.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), g = b.content;
    }
    this.unplaced = p ? e == 0 ? w.empty : new w(Tn(o.content, e - 1, 1), e - 1, f < 0 ? o.openEnd : e - 1) : new w(Tn(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !ls(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e:
      for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: r, type: i } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = ls(e, t, i, r, s);
        if (!!o) {
          for (let l = t - 1; l >= 0; l--) {
            let { match: a, type: c } = this.frontier[l], d = ls(e, l, c, a, !0);
            if (!d || d.childCount)
              continue e;
          }
          return { depth: t, fit: o, move: s ? e.doc.resolve(e.after(t + 1)) : e };
        }
      }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = An(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = An(this.placed, this.depth, k.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(k.empty, !0);
    t.childCount && (this.placed = An(this.placed, this.frontier.length, t));
  }
}
function Tn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Tn(n.firstChild.content, e - 1, t)));
}
function An(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(An(n.lastChild.content, e - 1, t)));
}
function ss(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Hc(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Hc(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(k.empty, !0)))), n.copy(r);
}
function ls(n, e, t, r, i) {
  let s = n.node(e), o = i ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type))
    return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !of(t, s.content, o) ? l : null;
}
function of(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function lf(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function af(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), s = n.doc.resolve(t);
  if (Bc(i, s, r))
    return n.step(new K(e, t, r));
  let o = jc(i, n.doc.resolve(t));
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let h = i.depth, f = i.pos - 1; h > 0; h--, f--) {
    let p = i.node(h).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(h) > -1 ? l = h : i.before(h) == f && o.splice(1, 0, -h);
  }
  let a = o.indexOf(l), c = [], d = r.openStart;
  for (let h = r.content, f = 0; ; f++) {
    let p = h.firstChild;
    if (c.push(p), f == r.openStart)
      break;
    h = p.content;
  }
  for (let h = d - 1; h >= 0; h--) {
    let f = c[h], p = lf(f.type);
    if (p && !f.sameMarkup(i.node(Math.abs(l) - 1)))
      d = h;
    else if (p || !f.type.isTextblock)
      break;
  }
  for (let h = r.openStart; h >= 0; h--) {
    let f = (h + d + 1) % (r.openStart + 1), p = c[f];
    if (!!p)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + a) % o.length], b = !0;
        g < 0 && (b = !1, g = -g);
        let v = i.node(g - 1), C = i.index(g - 1);
        if (v.canReplaceWith(C, C, p.type, p.marks))
          return n.replace(i.before(g), b ? s.after(g) : t, new w(zc(r.content, 0, r.openStart, f), f, r.openEnd));
      }
  }
  let u = n.steps.length;
  for (let h = o.length - 1; h >= 0 && (n.replace(e, t, r), !(n.steps.length > u)); h--) {
    let f = o[h];
    f < 0 || (e = i.before(f), t = s.after(f));
  }
}
function zc(n, e, t, r, i) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(zc(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(k.empty, !0));
  }
  return n;
}
function cf(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = rf(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new w(k.from(r), 0, 0));
}
function df(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), s = jc(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && t > r.end(o) && i.end(o) - t != i.depth - o)
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function jc(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = n.start(i);
    if (s < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i);
  }
  return t;
}
class dn extends ie {
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return W.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return W.fromReplace(e, this.pos, this.pos + 1, new w(k.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return me.empty;
  }
  invert(e) {
    return new dn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new dn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new dn(t.pos, t.attr, t.value);
  }
}
ie.jsonID("attr", dn);
class Wn extends ie {
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return W.ok(r);
  }
  getMap() {
    return me.empty;
  }
  invert(e) {
    return new Wn(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Wn(t.attr, t.value);
  }
}
ie.jsonID("docAttr", Wn);
let yn = class extends Error {
};
yn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
yn.prototype = Object.create(Error.prototype);
yn.prototype.constructor = yn;
yn.prototype.name = "TransformError";
class Vc {
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new an();
  }
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new yn(t.failed);
    return this;
  }
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  get docChanged() {
    return this.steps.length > 0;
  }
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  replace(e, t = e, r = w.empty) {
    let i = Ni(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  replaceWith(e, t, r) {
    return this.replace(e, t, new w(k.from(r), 0, 0));
  }
  delete(e, t) {
    return this.replace(e, t, w.empty);
  }
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  replaceRange(e, t, r) {
    return af(this, e, t, r), this;
  }
  replaceRangeWith(e, t, r) {
    return cf(this, e, t, r), this;
  }
  deleteRange(e, t) {
    return df(this, e, t), this;
  }
  lift(e, t) {
    return Jh(this, e, t), this;
  }
  join(e, t = 1) {
    return nf(this, e, t), this;
  }
  wrap(e, t) {
    return Yh(this, e, t), this;
  }
  setBlockType(e, t = e, r, i = null) {
    return Xh(this, e, t, r, i), this;
  }
  setNodeMarkup(e, t, r = null, i) {
    return ef(this, e, t, r, i), this;
  }
  setNodeAttribute(e, t, r) {
    return this.step(new dn(e, t, r)), this;
  }
  setDocAttribute(e, t) {
    return this.step(new Wn(e, t)), this;
  }
  addNodeMark(e, t) {
    return this.step(new ft(e, t)), this;
  }
  removeNodeMark(e, t) {
    if (!(t instanceof B)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new bn(e, t)), this;
  }
  split(e, t = 1, r) {
    return tf(this, e, t, r), this;
  }
  addMark(e, t, r) {
    return Wh(this, e, t, r), this;
  }
  removeMark(e, t, r) {
    return Uh(this, e, t, r), this;
  }
  clearIncompatible(e, t, r) {
    return Kh(this, e, t, r), this;
  }
}
const as = /* @__PURE__ */ Object.create(null);
class L {
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new uf(e.min(t), e.max(t))];
  }
  get anchor() {
    return this.$anchor.pos;
  }
  get head() {
    return this.$head.pos;
  }
  get from() {
    return this.$from.pos;
  }
  get to() {
    return this.$to.pos;
  }
  get $from() {
    return this.ranges[0].$from;
  }
  get $to() {
    return this.ranges[0].$to;
  }
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  replace(e, t = w.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], d = e.mapping.slice(s);
      e.replaceRange(d.map(a.pos), d.map(c.pos), l ? w.empty : t), l == 0 && Sl(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = e.mapping.slice(r), c = a.map(o.pos), d = a.map(l.pos);
      s ? e.deleteRange(c, d) : (e.replaceRangeWith(c, d, t), Sl(e, r, t.isInline ? -1 : 1));
    }
  }
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new O(e) : en(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = t < 0 ? en(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : en(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (o)
        return o;
    }
    return null;
  }
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Le(e.node(0));
  }
  static atStart(e) {
    return en(e, e, 0, 0, 1) || new Le(e);
  }
  static atEnd(e) {
    return en(e, e, e.content.size, e.childCount, -1) || new Le(e);
  }
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = as[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  static jsonID(e, t) {
    if (e in as)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return as[e] = t, t.prototype.jsonID = e, t;
  }
  getBookmark() {
    return O.between(this.$anchor, this.$head).getBookmark();
  }
}
L.prototype.visible = !0;
class uf {
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let wl = !1;
function Cl(n) {
  !wl && !n.parent.inlineContent && (wl = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class O extends L {
  constructor(e, t = e) {
    Cl(e), Cl(t), super(e, t);
  }
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return L.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new O(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = w.empty) {
    if (super.replace(e, t), t == w.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof O && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Li(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new O(e.resolve(t.anchor), e.resolve(t.head));
  }
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = L.findFrom(t, r, !0) || L.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return L.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (L.findFrom(e, -r, !0) || L.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new O(e, t);
  }
}
L.jsonID("text", O);
class Li {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Li(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return O.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class E extends L {
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), s = e.resolve(i);
    return r ? L.near(s) : new E(s);
  }
  content() {
    return new w(k.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof E && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new wo(this.anchor);
  }
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new E(e.resolve(t.anchor));
  }
  static create(e, t) {
    return new E(e.resolve(t));
  }
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
E.prototype.visible = !1;
L.jsonID("node", E);
class wo {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Li(r, r) : new wo(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && E.isSelectable(r) ? new E(t) : L.near(t);
  }
}
class Le extends L {
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = w.empty) {
    if (t == w.empty) {
      e.delete(0, e.doc.content.size);
      let r = L.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  static fromJSON(e) {
    return new Le(e);
  }
  map(e) {
    return new Le(e);
  }
  eq(e) {
    return e instanceof Le;
  }
  getBookmark() {
    return hf;
  }
}
L.jsonID("all", Le);
const hf = {
  map() {
    return this;
  },
  resolve(n) {
    return new Le(n);
  }
};
function en(n, e, t, r, i, s = !1) {
  if (e.inlineContent)
    return O.create(n, t);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && E.isSelectable(l))
        return E.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = en(n, l, t + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Sl(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof K || i instanceof q))
    return;
  let s = n.mapping.maps[r], o;
  s.forEach((l, a, c, d) => {
    o == null && (o = d);
  }), n.setSelection(L.near(n.doc.resolve(o), t));
}
const Ml = 1, or = 2, El = 4;
class ff extends Vc {
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Ml) & ~or, this.storedMarks = null, this;
  }
  get selectionSet() {
    return (this.updated & Ml) > 0;
  }
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= or, this;
  }
  ensureMarks(e) {
    return B.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  get storedMarksSet() {
    return (this.updated & or) > 0;
  }
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~or, this.storedMarks = null;
  }
  setTime(e) {
    return this.time = e, this;
  }
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || B.none))), r.replaceWith(this, e), this;
  }
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r == null ? t : r, !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, s)), this.selection.empty || this.setSelection(L.near(this.selection.$to)), this;
    }
  }
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  scrollIntoView() {
    return this.updated |= El, this;
  }
  get scrolledIntoView() {
    return (this.updated & El) > 0;
  }
}
function Tl(n, e) {
  return !e || !n ? n : n.bind(e);
}
class _n {
  constructor(e, t, r) {
    this.name = e, this.init = Tl(t.init, r), this.apply = Tl(t.apply, r);
  }
}
const pf = [
  new _n("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new _n("selection", {
    init(n, e) {
      return n.selection || L.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new _n("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new _n("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class cs {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = pf.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new _n(r.key, r.spec.state, r));
    });
  }
}
class rn {
  constructor(e) {
    this.config = e;
  }
  get schema() {
    return this.config.schema;
  }
  get plugins() {
    return this.config.plugins;
  }
  apply(e) {
    return this.applyTransaction(e).state;
  }
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, c = i ? i[o].state : this, d = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (d && r.filterTransaction(d, o)) {
            if (d.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let u = 0; u < this.config.plugins.length; u++)
                i.push(u < o ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(d), r = r.applyInner(d), s = !0;
          }
          i && (i[o] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new rn(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  get tr() {
    return new ff(this);
  }
  static create(e) {
    let t = new cs(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new rn(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  reconfigure(e) {
    let t = new cs(this.schema, e.plugins), r = t.fields, i = new rn(t);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
    }
    return i;
  }
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new cs(e.schema, e.plugins), s = new rn(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = Fe.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        s.selection = L.fromJSON(s.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              s[o.name] = c.fromJSON.call(a, e, t[l], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function Fc(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = Fc(i, e, {})), t[r] = i;
  }
  return t;
}
class se {
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Fc(e.props, this, this.props), this.key = e.key ? e.key.key : Wc("plugin");
  }
  getState(e) {
    return e[this.key];
  }
}
const ds = /* @__PURE__ */ Object.create(null);
function Wc(n) {
  return n in ds ? n + "$" + ++ds[n] : (ds[n] = 0, n + "$");
}
class Ee {
  constructor(e = "key") {
    this.key = Wc(e);
  }
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  getState(e) {
    return e[this.key];
  }
}
const Q = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, Un = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let js = null;
const Qe = function(n, e, t) {
  let r = js || (js = document.createRange());
  return r.setEnd(n, t == null ? n.nodeValue.length : t), r.setStart(n, e || 0), r;
}, mf = function() {
  js = null;
}, Kt = function(n, e, t, r) {
  return t && (Al(n, e, t, r, -1) || Al(n, e, t, r, 1));
}, gf = /^(img|br|input|textarea|hr)$/i;
function Al(n, e, t, r, i) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : ze(n))) {
      let s = n.parentNode;
      if (!s || s.nodeType != 1 || tr(n) || gf.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = Q(n) + (i < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (i < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = i < 0 ? ze(n) : 0;
    } else
      return !1;
  }
}
function ze(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function bf(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = ze(n);
    } else if (n.parentNode && !tr(n))
      e = Q(n), n = n.parentNode;
    else
      return null;
  }
}
function yf(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !tr(n))
      e = Q(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function vf(n, e, t) {
  for (let r = e == 0, i = e == ze(n); r || i; ) {
    if (n == t)
      return !0;
    let s = Q(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, i = i && s == ze(n);
  }
}
function tr(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const Di = function(n) {
  return n.focusNode && Kt(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function Ot(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function kf(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function xf(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: r.offset };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: r.startOffset };
  }
}
const Ke = typeof navigator < "u" ? navigator : null, _l = typeof document < "u" ? document : null, Et = Ke && Ke.userAgent || "", Vs = /Edge\/(\d+)/.exec(Et), Uc = /MSIE \d/.exec(Et), Fs = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Et), he = !!(Uc || Fs || Vs), gt = Uc ? document.documentMode : Fs ? +Fs[1] : Vs ? +Vs[1] : 0, De = !he && /gecko\/(\d+)/i.test(Et);
De && +(/Firefox\/(\d+)/.exec(Et) || [0, 0])[1];
const Ws = !he && /Chrome\/(\d+)/.exec(Et), oe = !!Ws, wf = Ws ? +Ws[1] : 0, le = !he && !!Ke && /Apple Computer/.test(Ke.vendor), vn = le && (/Mobile\/\w+/.test(Et) || !!Ke && Ke.maxTouchPoints > 2), Ce = vn || (Ke ? /Mac/.test(Ke.platform) : !1), Cf = Ke ? /Win/.test(Ke.platform) : !1, $e = /Android \d/.test(Et), nr = !!_l && "webkitFontSmoothing" in _l.documentElement.style, Sf = nr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Mf(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function Ze(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Ef(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function Ol(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; o = Un(o)) {
    if (o.nodeType != 1)
      continue;
    let l = o, a = l == s.body, c = a ? Mf(s) : Ef(l), d = 0, u = 0;
    if (e.top < c.top + Ze(r, "top") ? u = -(c.top - e.top + Ze(i, "top")) : e.bottom > c.bottom - Ze(r, "bottom") && (u = e.bottom - e.top > c.bottom - c.top ? e.top + Ze(i, "top") - c.top : e.bottom - c.bottom + Ze(i, "bottom")), e.left < c.left + Ze(r, "left") ? d = -(c.left - e.left + Ze(i, "left")) : e.right > c.right - Ze(r, "right") && (d = e.right - c.right + Ze(i, "right")), d || u)
      if (a)
        s.defaultView.scrollBy(d, u);
      else {
        let h = l.scrollLeft, f = l.scrollTop;
        u && (l.scrollTop += u), d && (l.scrollLeft += d);
        let p = l.scrollLeft - h, m = l.scrollTop - f;
        e = { left: e.left - p, top: e.top - m, right: e.right - p, bottom: e.bottom - m };
      }
    if (a || /^(fixed|sticky)$/.test(getComputedStyle(o).position))
      break;
  }
}
function Tf(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = n.root.elementFromPoint(s, o);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Kc(n.dom) };
}
function Kc(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = Un(r))
    ;
  return e;
}
function Af({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  qc(t, r == 0 ? 0 : r - e);
}
function qc(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: s } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let Zt = null;
function _f(n) {
  if (n.setActive)
    return n.setActive();
  if (Zt)
    return n.focus(Zt);
  let e = Kc(n);
  n.focus(Zt == null ? {
    get preventScroll() {
      return Zt = { preventScroll: !0 }, !0;
    }
  } : void 0), Zt || (Zt = !1, qc(e, 0));
}
function Jc(n, e) {
  let t, r = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
  for (let d = n.firstChild, u = 0; d; d = d.nextSibling, u++) {
    let h;
    if (d.nodeType == 1)
      h = d.getClientRects();
    else if (d.nodeType == 3)
      h = Qe(d).getClientRects();
    else
      continue;
    for (let f = 0; f < h.length; f++) {
      let p = h[f];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          t = d, r = m, i = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, d.nodeType == 1 && m && (s = u + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = d, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = u + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? Of(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : Jc(t, i);
}
function Of(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let s = st(r, 1);
    if (s.top != s.bottom && Co(e, s))
      return { node: n, offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function Co(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function $f(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Nf(n, e, t) {
  let { node: r, offset: i } = Jc(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, s);
}
function Lf(n, e, t, r) {
  let i = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let l = n.docView.nearestDesc(s, !0);
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent && !o || !l.contentDOM)) {
      let a = l.dom.getBoundingClientRect();
      if (l.node.isBlock && l.parent && !o && (o = !0, a.left > r.left || a.top > r.top ? i = l.posBefore : (a.right < r.left || a.bottom < r.top) && (i = l.posAfter)), !l.contentDOM && i < 0 && !l.node.isText)
        return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    }
    s = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function Gc(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Co(e, c))
            return Gc(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return n;
}
function Df(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, s = xf(t, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!Co(e, c) || (o = Gc(n.dom, e, c), !o))
      return null;
  }
  if (le)
    for (let c = o; r && c; c = Un(c))
      c.draggable && (r = void 0);
  if (o = $f(o, e), r) {
    if (De && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let d = r.childNodes[i], u;
      d.nodeName == "IMG" && (u = d.getBoundingClientRect()).right <= e.left && u.bottom > e.top && i++;
    }
    let c;
    nr && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Lf(n, r, i, e));
  }
  l == null && (l = Nf(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function $l(n) {
  return n.top < n.bottom || n.left < n.right;
}
function st(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if ($l(r))
      return r;
  }
  return Array.prototype.find.call(t, $l) || n.getBoundingClientRect();
}
const Rf = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Zc(n, e, t) {
  let { node: r, offset: i, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = nr || De;
  if (r.nodeType == 3)
    if (o && (Rf.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = st(Qe(r, i, i), t);
      if (De && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = st(Qe(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let d = st(Qe(r, i, i + 1), -1);
          if (d.top != a.top)
            return En(d, d.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, d = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, d = -1) : t >= 0 && i == r.nodeValue.length ? (a--, d = 1) : t < 0 ? a-- : c++, En(st(Qe(r, a, c), d), d < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (t < 0 || i == ze(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return us(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < ze(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return us(a.getBoundingClientRect(), !0);
    }
    return us(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && i && (t < 0 || i == ze(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? Qe(a, ze(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return En(st(c, 1), !1);
  }
  if (s == null && i < ze(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? Qe(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return En(st(c, -1), !0);
  }
  return En(st(r.nodeType == 3 ? Qe(r) : r, -t), t >= 0);
}
function En(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function us(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function Yc(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function Pf(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return Yc(n, e, () => {
    let { node: s } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = Zc(n, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Qe(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let d = a[c];
        if (d.bottom > d.top + 1 && (t == "up" ? o.top - d.top > (d.bottom - o.top) * 2 : d.bottom - o.bottom > (o.bottom - d.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const If = /[\u0590-\u08ac]/;
function Bf(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, l = n.domSelection();
  return !If.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? s : o : Yc(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: d, anchorOffset: u } = n.domSelectionRange(), h = l.caretBidiLevel;
    l.modify("move", t, "character");
    let f = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: m } = n.domSelectionRange(), g = p && !f.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(d, u), a && (a != d || c != u) && l.extend && l.extend(a, c);
    } catch {
    }
    return h != null && (l.caretBidiLevel = h), g;
  });
}
let Nl = null, Ll = null, Dl = !1;
function Hf(n, e, t) {
  return Nl == e && Ll == t ? Dl : (Nl = e, Ll = t, Dl = t == "up" || t == "down" ? Pf(n, e, t) : Bf(n, e, t));
}
const Se = 0, Rl = 1, Lt = 2, qe = 3;
class rr {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = Se, r.pmViewDesc = this;
  }
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  parseRule() {
    return null;
  }
  stopEvent(e) {
    return !1;
  }
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > Q(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return (i == null ? r > 0 : i) ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!t || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          i = i.children[0];
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], l = s + o.size;
      if (l > e || o instanceof Qc) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof Xc && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? Q(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? Q(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (i == -1 && e <= c) {
        let d = o + a.border;
        if (e >= d && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, d);
        e = o;
        for (let u = l; u > 0; u--) {
          let h = this.children[u - 1];
          if (h.size && h.dom.parentNode == this.contentDOM && !h.emptyChildAt(1)) {
            i = Q(h.dom) + 1;
            break;
          }
          e -= h.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let d = l + 1; d < this.children.length; d++) {
          let u = this.children[d];
          if (u.size && u.dom.parentNode == this.contentDOM && !u.emptyChildAt(-1)) {
            s = Q(u.dom);
            break;
          }
          t += u.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  setSelection(e, t, r, i = !1) {
    let s = Math.min(e, t), o = Math.max(e, t);
    for (let h = 0, f = 0; h < this.children.length; h++) {
      let p = this.children[h], m = f + p.size;
      if (s > f && o < m)
        return p.setSelection(e - f - p.border, t - f - p.border, r, i);
      f = m;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.getSelection(), d = !1;
    if ((De || le) && e == t) {
      let { node: h, offset: f } = l;
      if (h.nodeType == 3) {
        if (d = !!(f && h.nodeValue[f - 1] == `
`), d && f == h.nodeValue.length)
          for (let p = h, m; p; p = p.parentNode) {
            if (m = p.nextSibling) {
              m.nodeName == "BR" && (l = a = { node: m.parentNode, offset: Q(m) + 1 });
              break;
            }
            let g = p.pmViewDesc;
            if (g && g.node && g.node.isBlock)
              break;
          }
      } else {
        let p = h.childNodes[f - 1];
        d = p && (p.nodeName == "BR" || p.contentEditable == "false");
      }
    }
    if (De && c.focusNode && c.focusNode != a.node && c.focusNode.nodeType == 1) {
      let h = c.focusNode.childNodes[c.focusOffset];
      h && h.contentEditable == "false" && (i = !0);
    }
    if (!(i || d && le) && Kt(l.node, l.offset, c.anchorNode, c.anchorOffset) && Kt(a.node, a.offset, c.focusNode, c.focusOffset))
      return;
    let u = !1;
    if ((c.extend || e == t) && !d) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), u = !0;
      } catch {
      }
    }
    if (!u) {
      if (e > t) {
        let f = l;
        l = a, a = f;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + s.border, a = o - s.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == o ? Lt : Rl, e == l && t == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = qe : s.markDirty(e - l, t - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? Lt : qe;
      }
      r = o;
    }
    this.dirty = Lt;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? Lt : Rl;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class Xc extends rr {
  constructor(e, t, r, i) {
    let s, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == Se && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class zf extends rr {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class qt extends rr {
  constructor(e, t, r, i) {
    super(e, [], r, i), this.mark = t;
  }
  static create(e, t, r, i) {
    let s = i.nodeViews[t.type.name], o = s && s(t, i, r);
    return (!o || !o.dom) && (o = je.renderSpec(document, t.type.spec.toDOM(t, r))), new qt(e, t, o.dom, o.contentDOM || o.dom);
  }
  parseRule() {
    return this.dirty & qe || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != qe && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Se) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Se;
    }
  }
  slice(e, t, r) {
    let i = qt.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    t < o && (s = qs(s, t, o, r)), e > 0 && (s = qs(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = i;
    return i.children = s, i;
  }
}
class bt extends rr {
  constructor(e, t, r, i, s, o, l, a, c) {
    super(e, [], s, o), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  static create(e, t, r, i, s, o) {
    let l = s.nodeViews[t.type.name], a, c = l && l(t, s, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), d = c && c.dom, u = c && c.contentDOM;
    if (t.isText) {
      if (!d)
        d = document.createTextNode(t.text);
      else if (d.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else
      d || ({ dom: d, contentDOM: u } = je.renderSpec(document, t.type.spec.toDOM(t)));
    !u && !t.isText && d.nodeName != "BR" && (d.hasAttribute("contenteditable") || (d.contentEditable = "false"), t.type.spec.draggable && (d.draggable = !0));
    let h = d;
    return d = nd(d, r, t), c ? a = new jf(e, t, r, i, d, u || null, h, c, s, o + 1) : t.isText ? new Ri(e, t, r, i, d, h, s) : new bt(e, t, r, i, d, u || null, h, s, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => k.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == Se && e.eq(this.node) && Ks(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, s = e.composing ? this.localCompositionInfo(e, t) : null, o = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new Ff(this, o && o.node, e);
    Kf(this.node, this.innerDeco, (c, d, u) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !u && a.syncToMarks(d == this.node.childCount ? B.none : this.node.child(d).marks, r, e), a.placeWidget(c, e, i);
    }, (c, d, u, h) => {
      a.syncToMarks(c.marks, r, e);
      let f;
      a.findNodeMatch(c, d, u, h) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (f = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, d, u, f, e) || a.updateNextNode(c, d, u, e, h, i) || a.addNode(c, d, u, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == Lt) && (o && this.protectLocalComposition(e, o), ed(this.contentDOM, this.children, e), vn && qf(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof O) || r < t || i > t + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, l = Jf(this.node.content, o, r - t, i - t);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new zf(this, s, t, i);
    e.input.compositionNodes.push(o), this.children = qs(this.children, r, r + i.length, e, o);
  }
  update(e, t, r, i) {
    return this.dirty == qe || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Se;
  }
  updateOuterDeco(e) {
    if (Ks(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = td(this.dom, this.nodeDOM, Us(this.outerDeco, this.node, t), Us(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  deselectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable");
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Pl(n, e, t, r, i) {
  nd(r, e, n);
  let s = new bt(void 0, n, e, t, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class Ri extends bt {
  constructor(e, t, r, i, s, o, l) {
    super(e, t, r, i, s, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == qe || this.dirty != Se && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Se || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Se, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), s = document.createTextNode(i.text);
    return new Ri(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = qe);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Qc extends rr {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Se && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class jf extends bt {
  constructor(e, t, r, i, s, o, l, a, c, d) {
    super(e, t, r, i, s, o, l, c, d), this.spec = a;
  }
  update(e, t, r, i) {
    if (this.dirty == qe)
      return !1;
    if (this.spec.update) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, i), s;
    } else
      return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r) : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function ed(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = Il(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (o instanceof qt) {
      let a = r ? r.previousSibling : n.lastChild;
      ed(o.contentDOM, o.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Il(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const Ln = function(n) {
  n && (this.nodeName = n);
};
Ln.prototype = /* @__PURE__ */ Object.create(null);
const Dt = [new Ln()];
function Us(n, e, t) {
  if (n.length == 0)
    return Dt;
  let r = t ? Dt[0] : new Ln(), i = [r];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (!!o) {
      o.nodeName && i.push(r = new Ln(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (t && i.length == 1 && i.push(r = new Ln(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function td(n, e, t, r) {
  if (t == Dt && r == Dt)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], l = t[s];
    if (s) {
      let a;
      l && l.nodeName == o.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = Dt[0]), i = a;
    }
    Vf(i, l || Dt[0], o);
  }
  return i;
}
function Vf(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.add(i[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function nd(n, e, t) {
  return td(n, n, Dt, Us(e, t, n.nodeType != 1));
}
function Ks(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Il(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Ff {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Wf(e.node.content, e);
  }
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  syncToMarks(e, t, r) {
    let i = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < s; )
      this.destroyRest(), this.top.dirty = Se, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = qt.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  findNodeMatch(e, t, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == qe && o.dom == o.contentDOM && (o.dirty = Lt), o.update(e, t, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  updateNextNode(e, t, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof bt) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s)
          return !1;
        let d = a.dom, u, h = this.isLocked(d) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != qe && Ks(t, a.outerDeco));
        if (!h && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != d && (this.changed = !0), this.index++, !0;
        if (!h && (u = this.recreateWrapper(a, e, t, r, i, o)))
          return this.top.children[this.index] = u, u.contentDOM && (u.dirty = Lt, u.updateChildren(i, o + 1), u.dirty = Se), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  recreateWrapper(e, t, r, i, s, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content))
      return null;
    let l = bt.create(this.top, t, r, i, s, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  addNode(e, t, r, i, s) {
    let o = bt.create(this.top, e, t, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new Xc(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof qt; )
      t = e, e = t.children[t.children.length - 1];
    (!e || !(e instanceof Ri) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((le || oe) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Qc(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function Wf(n, e) {
  let t = e, r = t.children.length, i = n.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e:
    for (; i > 0; ) {
      let l;
      for (; ; )
        if (r) {
          let c = t.children[r - 1];
          if (c instanceof qt)
            t = c, r = c.children.length;
          else {
            l = c, r--;
            break;
          }
        } else {
          if (t == e)
            break e;
          r = t.parent.children.indexOf(t), t = t.parent;
        }
      let a = l.node;
      if (!!a) {
        if (a != n.child(i - 1))
          break;
        --i, s.set(l, i), o.push(l);
      }
    }
  return { index: i, matched: s, matches: o.reverse() };
}
function Uf(n, e) {
  return n.type.side - e.type.side;
}
function Kf(n, e, t, r) {
  let i = e.locals(n), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let d = n.child(c);
      r(d, i, e.forChild(s, d), c), s += d.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let d, u;
    for (; o < i.length && i[o].to == s; ) {
      let g = i[o++];
      g.widget && (d ? (u || (u = [d])).push(g) : d = g);
    }
    if (d)
      if (u) {
        u.sort(Uf);
        for (let g = 0; g < u.length; g++)
          t(u[g], c, !!a);
      } else
        t(d, c, !!a);
    let h, f;
    if (a)
      f = -1, h = a, a = null;
    else if (c < n.childCount)
      f = c, h = n.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= s && l.splice(g--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      l.push(i[o++]);
    let p = s + h.nodeSize;
    if (h.isText) {
      let g = p;
      o < i.length && i[o].from < g && (g = i[o].from);
      for (let b = 0; b < l.length; b++)
        l[b].to < g && (g = l[b].to);
      g < p && (a = h.cut(g - s), h = h.cut(0, g - s), p = g, f = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = h.isInline && !h.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(h, m, e.forChild(s, h), f), s = p;
  }
}
function qf(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function Jf(n, e, t, r) {
  for (let i = 0, s = 0; i < n.childCount && s <= r; ) {
    let o = n.child(i++), l = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (s >= t) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function qs(n, e, t, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o], c = l, d = l += a.size;
    c >= t || d <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, r)), i && (s.push(i), i = void 0), d > t && s.push(a.slice(t - c, a.size, r)));
  }
  return s;
}
function So(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), s = i && i.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (Di(t)) {
    for (a = l; i && !i.node; )
      i = i.parent;
    let d = i.node;
    if (i && d.isAtom && E.isSelectable(d) && i.parent && !(d.isInline && vf(t.focusNode, t.focusOffset, i.dom))) {
      let u = i.posBefore;
      c = new E(o == u ? l : r.resolve(u));
    }
  } else {
    let d = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (d < 0)
      return null;
    a = r.resolve(d);
  }
  if (!c) {
    let d = e == "pointer" || n.state.selection.head < l.pos && !s ? 1 : -1;
    c = Mo(n, a, l, d);
  }
  return c;
}
function rd(n) {
  return n.editable ? n.hasFocus() : sd(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function tt(n, e = !1) {
  let t = n.state.selection;
  if (id(n, t), !!rd(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && oe) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && Kt(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      Zf(n);
    else {
      let { anchor: r, head: i } = t, s, o;
      Bl && !(t instanceof O) && (t.$from.parent.inlineContent || (s = Hl(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = Hl(n, t.to))), n.docView.setSelection(r, i, n.root, e), Bl && (s && zl(s), o && zl(o)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Gf(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const Bl = le || oe && wf < 63;
function Hl(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (le && i && i.contentEditable == "false")
    return hs(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return hs(i);
    if (s)
      return hs(s);
  }
}
function hs(n) {
  return n.contentEditable = "true", le && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function zl(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function Gf(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!rd(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function Zf(n) {
  let e = n.domSelection(), t = document.createRange(), r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setEnd(r.parentNode, Q(r) + 1) : t.setEnd(r, 0), t.collapse(!1), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && he && gt <= 11 && (r.disabled = !0, r.disabled = !1);
}
function id(n, e) {
  if (e instanceof E) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (jl(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    jl(n);
}
function jl(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function Mo(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || O.between(e, t, r);
}
function Vl(n) {
  return n.editable && !n.hasFocus() ? !1 : sd(n);
}
function sd(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function Yf(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return Kt(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Js(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), s = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && L.findFrom(s, e);
}
function ot(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function Fl(n, e, t) {
  let r = n.state.selection;
  if (r instanceof O)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = n.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return ot(n, new O(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Js(n.state, e);
        return i && i instanceof E ? ot(n, i) : !1;
      } else if (!(Ce && t.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = n.docView.descAt(l)) && !o.contentDOM ? E.isSelectable(s) ? ot(n, new E(e < 0 ? n.state.doc.resolve(i.pos - s.nodeSize) : i)) : nr ? ot(n, new O(n.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else
      return !1;
  else {
    if (r instanceof E && r.node.isInline)
      return ot(n, new O(e > 0 ? r.$to : r.$from));
    {
      let i = Js(n.state, e);
      return i ? ot(n, i) : !1;
    }
  }
}
function Rr(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Dn(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Yt(n, e) {
  return e < 0 ? Xf(n) : Qf(n);
}
function Xf(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, s, o = !1;
  for (De && t.nodeType == 1 && r < Rr(t) && Dn(t.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (Dn(l, -1))
          i = t, s = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (od(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && Dn(l, -1); )
          i = t.parentNode, s = Q(l), l = l.previousSibling;
        if (l)
          t = l, r = Rr(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  o ? Gs(n, t, r) : i && Gs(n, i, s);
}
function Qf(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = Rr(t), s, o;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (Dn(l, 1))
        s = t, o = ++r;
      else
        break;
    } else {
      if (od(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && Dn(l, 1); )
          s = l.parentNode, o = Q(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = Rr(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && Gs(n, s, o);
}
function od(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function ep(n, e) {
  for (; n && e == n.childNodes.length && !tr(n); )
    e = Q(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function tp(n, e) {
  for (; n && !e && !tr(n); )
    e = Q(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Gs(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = ep(e, t)) ? (e = o, t = 0) : (s = tp(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (Di(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else
    r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && tt(n);
  }, 50);
}
function Wl(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(oe || Cf) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function Ul(n, e, t) {
  let r = n.state.selection;
  if (r instanceof O && !r.empty || t.indexOf("s") > -1 || Ce && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Js(n.state, e);
    if (o && o instanceof E)
      return ot(n, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, l = r instanceof Le ? L.near(o, e) : L.findFrom(o, e);
    return l ? ot(n, l) : !1;
  }
  return !1;
}
function Kl(n, e) {
  if (!(n.state.selection instanceof O))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function ql(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function np(n) {
  if (!le || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    ql(n, r, "true"), setTimeout(() => ql(n, r, "false"), 20);
  }
  return !1;
}
function rp(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function ip(n, e) {
  let t = e.keyCode, r = rp(e);
  if (t == 8 || Ce && t == 72 && r == "c")
    return Kl(n, -1) || Yt(n, -1);
  if (t == 46 && !e.shiftKey || Ce && t == 68 && r == "c")
    return Kl(n, 1) || Yt(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Ce && t == 66 && r == "c") {
    let i = t == 37 ? Wl(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return Fl(n, i, r) || Yt(n, i);
  } else if (t == 39 || Ce && t == 70 && r == "c") {
    let i = t == 39 ? Wl(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return Fl(n, i, r) || Yt(n, i);
  } else {
    if (t == 38 || Ce && t == 80 && r == "c")
      return Ul(n, -1, r) || Yt(n, -1);
    if (t == 40 || Ce && t == 78 && r == "c")
      return np(n) || Ul(n, 1, r) || Yt(n, 1);
    if (r == (Ce ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function ld(n, e) {
  n.someProp("transformCopied", (f) => {
    e = f(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let f = r.firstChild;
    t.push(f.type.name, f.attrs != f.type.defaultAttrs ? f.attrs : null), r = f.content;
  }
  let o = n.someProp("clipboardSerializer") || je.fromSchema(n.state.schema), l = fd(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, d, u = 0;
  for (; c && c.nodeType == 1 && (d = hd[c.nodeName.toLowerCase()]); ) {
    for (let f = d.length - 1; f >= 0; f--) {
      let p = l.createElement(d[f]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), u++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${u ? ` -${u}` : ""} ${JSON.stringify(t)}`);
  let h = n.someProp("clipboardTextSerializer", (f) => f(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: h };
}
function ad(n, e, t, r, i) {
  let s = i.parent.type.spec.code, o, l;
  if (!t && !e)
    return null;
  let a = e && (r || s || !t);
  if (a) {
    if (n.someProp("transformPastedText", (h) => {
      e = h(e, s || r, n);
    }), s)
      return e ? new w(k.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : w.empty;
    let u = n.someProp("clipboardTextParser", (h) => h(e, i, r, n));
    if (u)
      l = u;
    else {
      let h = i.marks(), { schema: f } = n.state, p = je.fromSchema(f);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(f.text(m, h)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (u) => {
      t = u(t, n);
    }), o = lp(t), nr && ap(o);
  let c = o && o.querySelector("[data-pm-slice]"), d = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (d && d[3])
    for (let u = +d[3]; u > 0; u--) {
      let h = o.firstChild;
      for (; h && h.nodeType != 1; )
        h = h.nextSibling;
      if (!h)
        break;
      o = h;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || gn.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || d),
    context: i,
    ruleFromNode(h) {
      return h.nodeName == "BR" && !h.nextSibling && h.parentNode && !sp.test(h.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), d)
    l = cp(Jl(l, +d[1], +d[2]), d[4]);
  else if (l = w.maxOpen(op(l.content, i), !0), l.openStart || l.openEnd) {
    let u = 0, h = 0;
    for (let f = l.content.firstChild; u < l.openStart && !f.type.spec.isolating; u++, f = f.firstChild)
      ;
    for (let f = l.content.lastChild; h < l.openEnd && !f.type.spec.isolating; h++, f = f.lastChild)
      ;
    l = Jl(l, u, h);
  }
  return n.someProp("transformPasted", (u) => {
    l = u(l, n);
  }), l;
}
const sp = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function op(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
    if (n.forEach((l) => {
      if (!o)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && s.length && dd(a, s, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = ud(o[o.length - 1], s.length));
        let d = cd(l, a);
        o.push(d), i = i.matchType(d.type), s = a;
      }
    }), o)
      return k.from(o);
  }
  return n;
}
function cd(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, k.from(n));
  return n;
}
function dd(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let s = dd(n, e, t, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(k.from(cd(t, n, i + 1))));
  }
}
function ud(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, ud(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(k.empty, !0);
  return n.copy(t.append(r));
}
function Zs(n, e, t, r, i, s) {
  let o = e < 0 ? n.firstChild : n.lastChild, l = o.content;
  return n.childCount > 1 && (s = 0), i < r - 1 && (l = Zs(l, e, t, r, i + 1, s)), i >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(k.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l));
}
function Jl(n, e, t) {
  return e < n.openStart && (n = new w(Zs(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new w(Zs(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const hd = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let Gl = null;
function fd() {
  return Gl || (Gl = document.implementation.createHTMLDocument("title"));
}
function lp(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = fd().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && hd[r[1].toLowerCase()]) && (n = i.map((s) => "<" + s + ">").join("") + n + i.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = n, i)
    for (let s = 0; s < i.length; s++)
      t = t.querySelector(i[s]) || t;
  return t;
}
function ap(n) {
  let e = n.querySelectorAll(oe ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function cp(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: s, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = k.from(a.create(r[l + 1], i)), s++, o++;
  }
  return new w(i, s, o);
}
const ae = {}, ce = {}, dp = { touchstart: !0, touchmove: !0 };
class up {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function hp(n) {
  for (let e in ae) {
    let t = ae[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      pp(n, r) && !Eo(n, r) && (n.editable || !(r.type in ce)) && t(n, r);
    }, dp[e] ? { passive: !0 } : void 0);
  }
  le && n.dom.addEventListener("input", () => null), Ys(n);
}
function pt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function fp(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function Ys(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => Eo(n, r));
  });
}
function Eo(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function pp(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function mp(n, e) {
  !Eo(n, e) && ae[e.type] && (n.editable || !(e.type in ce)) && ae[e.type](n, e);
}
ce.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !md(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !($e && oe && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), vn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, Ot(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else
      n.someProp("handleKeyDown", (r) => r(n, t)) || ip(n, t) ? t.preventDefault() : pt(n, "key");
};
ce.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
ce.keypress = (n, e) => {
  let t = e;
  if (md(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Ce && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof O) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (s) => s(n, r.$from.pos, r.$to.pos, i)) && n.dispatch(n.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
  }
};
function Pi(n) {
  return { left: n.clientX, top: n.clientY };
}
function gp(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function To(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (n.someProp(e, (l) => o > s.depth ? l(n, t, s.nodeAfter, s.before(o), i, !0) : l(n, t, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function un(n, e, t) {
  n.focused || n.focus();
  let r = n.state.tr.setSelection(e);
  t == "pointer" && r.setMeta("pointer", !0), n.dispatch(r);
}
function bp(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && E.isSelectable(r) ? (un(n, new E(t), "pointer"), !0) : !1;
}
function yp(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof E && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (E.isSelectable(l)) {
      r && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (un(n, E.create(n.state.doc, i), "pointer"), !0) : !1;
}
function vp(n, e, t, r, i) {
  return To(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (i ? yp(n, t) : bp(n, t));
}
function kp(n, e, t, r) {
  return To(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function xp(n, e, t, r) {
  return To(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || wp(n, t, r);
}
function wp(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (un(n, O.create(r, 0, r.content.size), "pointer"), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), l = i.before(s);
    if (o.inlineContent)
      un(n, O.create(r, l + 1, l + 1 + o.content.size), "pointer");
    else if (E.isSelectable(o))
      un(n, E.create(r, l), "pointer");
    else
      continue;
    return !0;
  }
}
function Ao(n) {
  return Pr(n);
}
const pd = Ce ? "metaKey" : "ctrlKey";
ae.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Ao(n), i = Date.now(), s = "singleClick";
  i - n.input.lastClick.time < 500 && gp(t, n.input.lastClick) && !t[pd] && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: s };
  let o = n.posAtCoords(Pi(t));
  !o || (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new Cp(n, o, t, !!r)) : (s == "doubleClick" ? kp : xp)(n, o.pos, o.inside, t) ? t.preventDefault() : pt(n, "pointer"));
};
class Cp {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[pd], this.allowDefault = r.shiftKey;
    let s, o;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let d = e.state.doc.resolve(t.pos);
      s = d.parent, o = d.depth ? d.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof E && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && De && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), pt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => tt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Pi(e))), this.updateAllowDefault(e), this.allowDefault || !t ? pt(this.view, "pointer") : vp(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || le && this.mightDrag && !this.mightDrag.node.isAtom || oe && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (un(this.view, L.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : pt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), pt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
ae.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Ao(n), pt(n, "pointer");
};
ae.touchmove = (n) => {
  n.input.lastTouch = Date.now(), pt(n, "pointer");
};
ae.contextmenu = (n) => Ao(n);
function md(n, e) {
  return n.composing ? !0 : le && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const Sp = $e ? 5e3 : -1;
ce.compositionstart = ce.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$from;
    if (e.selection.empty && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), Pr(n, !0), n.markCursor = null;
    else if (Pr(n), De && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          n.domSelection().collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    n.input.composing = !0;
  }
  gd(n, Sp);
};
ce.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, gd(n, 20));
};
function gd(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Pr(n), e));
}
function bd(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Ep()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function Mp(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = bf(e.focusNode, e.focusOffset), r = yf(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let s = t.pmViewDesc;
      if (!(!s || !s.isText(t.nodeValue)))
        return r;
    }
  }
  return t;
}
function Ep() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Pr(n, e = !1) {
  if (!($e && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), bd(n), e || n.docView && n.docView.dirty) {
      let t = So(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Tp(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Kn = he && gt < 15 || vn && Sf < 604;
ae.copy = ce.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let s = Kn ? null : t.clipboardData, o = r.content(), { dom: l, text: a } = ld(n, o);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : Tp(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Ap(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function _p(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? qn(n, r.value, null, i, e) : qn(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function qn(n, e, t, r, i) {
  let s = ad(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, s || w.empty)))
    return !0;
  if (!s)
    return !1;
  let o = Ap(s), l = o ? n.state.tr.replaceSelectionWith(o, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function yd(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
ce.paste = (n, e) => {
  let t = e;
  if (n.composing && !$e)
    return;
  let r = Kn ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && qn(n, yd(r), r.getData("text/html"), i, t) ? t.preventDefault() : _p(n, t);
};
class vd {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const kd = Ce ? "altKey" : "ctrlKey";
ae.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, s = i.empty ? null : n.posAtCoords(Pi(t)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof E ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = E.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (o = E.create(n.state.doc, d.posBefore));
    }
  }
  let l = (o || n.state.selection).content(), { dom: a, text: c } = ld(n, l);
  t.dataTransfer.clearData(), t.dataTransfer.setData(Kn ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Kn || t.dataTransfer.setData("text/plain", c), n.dragging = new vd(l, !t[kd], o);
};
ae.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
ce.dragover = ce.dragenter = (n, e) => e.preventDefault();
ce.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(Pi(t));
  if (!i)
    return;
  let s = n.state.doc.resolve(i.pos), o = r && r.slice;
  o ? n.someProp("transformPasted", (p) => {
    o = p(o, n);
  }) : o = ad(n, yd(t.dataTransfer), Kn ? null : t.dataTransfer.getData("text/html"), !1, s);
  let l = !!(r && !t[kd]);
  if (n.someProp("handleDrop", (p) => p(n, t, o || w.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!o)
    return;
  t.preventDefault();
  let a = o ? Ic(n.state.doc, s.pos, o) : s.pos;
  a == null && (a = s.pos);
  let c = n.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let d = c.mapping.map(a), u = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, h = c.doc;
  if (u ? c.replaceRangeWith(d, d, o.content.firstChild) : c.replaceRange(d, d, o), c.doc.eq(h))
    return;
  let f = c.doc.resolve(d);
  if (u && E.isSelectable(o.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(o.content.firstChild))
    c.setSelection(new E(f));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, b, v) => p = v), c.setSelection(Mo(n, f, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
ae.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && tt(n);
  }, 20));
};
ae.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
ae.beforeinput = (n, e) => {
  if (oe && $e && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, Ot(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in ce)
  ae[n] = ce[n];
function Jn(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Ir {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || Ht, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: s, deleted: o } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new ge(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Ir && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Jn(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class yt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Ht;
  }
  map(e, t, r, i) {
    let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new ge(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof yt && Jn(this.attrs, e.attrs) && Jn(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof yt;
  }
  destroy() {
  }
}
class _o {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Ht;
  }
  map(e, t, r, i) {
    let s = e.mapResult(t.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new ge(s.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), s;
    return i == t.from && !(s = e.child(r)).isText && i + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof _o && Jn(this.attrs, e.attrs) && Jn(this.spec, e.spec);
  }
  destroy() {
  }
}
class ge {
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  copy(e, t) {
    return new ge(e, t, this.type);
  }
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  static widget(e, t, r) {
    return new ge(e, e, new Ir(t, r));
  }
  static inline(e, t, r, i) {
    return new ge(e, t, new yt(r, i));
  }
  static node(e, t, r, i) {
    return new ge(e, t, new _o(r, i));
  }
  get spec() {
    return this.type.spec;
  }
  get inline() {
    return this.type instanceof yt;
  }
  get widget() {
    return this.type instanceof Ir;
  }
}
const tn = [], Ht = {};
class F {
  constructor(e, t) {
    this.local = e.length ? e : tn, this.children = t.length ? t : tn;
  }
  static create(e, t) {
    return t.length ? Br(t, e, 0, Ht) : ne;
  }
  find(e, t, r) {
    let i = [];
    return this.findInner(e == null ? 0 : e, t == null ? 1e9 : t, i, 0, r), i;
  }
  findInner(e, t, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, i + l, s);
      }
  }
  map(e, t, r) {
    return this == ne || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || Ht);
  }
  mapInner(e, t, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? Op(this.children, o || [], e, t, r, i, s) : o ? new F(o.sort(zt), tn) : ne;
  }
  add(e, t) {
    return t.length ? this == ne ? F.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, s = 0;
    e.forEach((l, a) => {
      let c = a + r, d;
      if (!!(d = wd(t, l, c))) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a ? i[s + 2] = i[s + 2].addInner(l, d, c + 1) : i.splice(s, 0, a, a + l.nodeSize, Br(d, l, c + 1, Ht)), s += 3;
      }
    });
    let o = xd(s ? Cd(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new F(o.length ? this.local.concat(o).sort(zt) : this.local, i || this.children);
  }
  remove(e) {
    return e.length == 0 || this == ne ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, l = r[s] + t, a = r[s + 1] + t;
      for (let d = 0, u; d < e.length; d++)
        (u = e[d]) && u.from > l && u.to < a && (e[d] = null, (o || (o = [])).push(u));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != ne ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new F(i, r) : ne;
  }
  forChild(e, t) {
    if (this == ne)
      return this;
    if (t.isLeaf)
      return F.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, o = s + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof yt) {
        let c = Math.max(s, a.from) - s, d = Math.min(o, a.to) - s;
        c < d && (i || (i = [])).push(a.copy(c, d));
      }
    }
    if (i) {
      let l = new F(i.sort(zt), tn);
      return r ? new dt([l, r]) : l;
    }
    return r || ne;
  }
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof F) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  locals(e) {
    return Oo(this.localsInner(e));
  }
  localsInner(e) {
    if (this == ne)
      return tn;
    if (e.inlineContent || !this.local.some(yt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof yt || t.push(this.local[r]);
    return t;
  }
}
F.empty = new F([], []);
F.removeOverlap = Oo;
const ne = F.empty;
class dt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, Ht));
    return dt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return F.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, t);
      s != ne && (s instanceof dt ? r = r.concat(s.members) : r.push(s));
    }
    return dt.from(r);
  }
  eq(e) {
    if (!(e instanceof dt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (!!s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            t.push(s[o]);
        }
    }
    return t ? Oo(r ? t : t.sort(zt)) : tn;
  }
  static from(e) {
    switch (e.length) {
      case 0:
        return ne;
      case 1:
        return e[0];
      default:
        return new dt(e.every((t) => t instanceof F) ? e : e.reduce((t, r) => t.concat(r instanceof F ? r : r.members), []));
    }
  }
}
function Op(n, e, t, r, i, s, o) {
  let l = n.slice();
  for (let c = 0, d = s; c < t.maps.length; c++) {
    let u = 0;
    t.maps[c].forEach((h, f, p, m) => {
      let g = m - p - (f - h);
      for (let b = 0; b < l.length; b += 3) {
        let v = l[b + 1];
        if (v < 0 || h > v + d - u)
          continue;
        let C = l[b] + d - u;
        f >= C ? l[b + 1] = h <= C ? -2 : -1 : h >= d && g && (l[b] += g, l[b + 1] += g);
      }
      u += g;
    }), d = t.maps[c].map(d, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let d = t.map(n[c] + s), u = d - i;
      if (u < 0 || u >= r.content.size) {
        a = !0;
        continue;
      }
      let h = t.map(n[c + 1] + s, -1), f = h - i, { index: p, offset: m } = r.content.findIndex(u), g = r.maybeChild(p);
      if (g && m == u && m + g.nodeSize == f) {
        let b = l[c + 2].mapInner(t, g, d + 1, n[c] + s + 1, o);
        b != ne ? (l[c] = u, l[c + 1] = f, l[c + 2] = b) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = $p(l, n, e, t, i, s, o), d = Br(c, r, 0, o);
    e = d.local;
    for (let u = 0; u < l.length; u += 3)
      l[u + 1] < 0 && (l.splice(u, 3), u -= 3);
    for (let u = 0, h = 0; u < d.children.length; u += 3) {
      let f = d.children[u];
      for (; h < l.length && l[h] < f; )
        h += 3;
      l.splice(h, 0, d.children[u], d.children[u + 1], d.children[u + 2]);
    }
  }
  return new F(e.sort(zt), l);
}
function xd(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new ge(i.from + e, i.to + e, i.type));
  }
  return t;
}
function $p(n, e, t, r, i, s, o) {
  function l(a, c) {
    for (let d = 0; d < a.local.length; d++) {
      let u = a.local[d].map(r, i, c);
      u ? t.push(u) : o.onRemove && o.onRemove(a.local[d].spec);
    }
    for (let d = 0; d < a.children.length; d += 3)
      l(a.children[d + 2], a.children[d] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + s + 1);
  return t;
}
function wd(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) && o.from > t && o.to < r && ((i || (i = [])).push(o), n[s] = null);
  return i;
}
function Cd(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function Br(n, e, t, r) {
  let i = [], s = !1;
  e.forEach((l, a) => {
    let c = wd(n, l, a + t);
    if (c) {
      s = !0;
      let d = Br(c, l, t + a + 1, r);
      d != ne && i.push(a, a + l.nodeSize, d);
    }
  });
  let o = xd(s ? Cd(n) : n, -t).sort(zt);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new F(o, i) : ne;
}
function zt(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Oo(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[i] = s.copy(s.from, r.to), Zl(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), Zl(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function Zl(n, e, t) {
  for (; e < n.length && zt(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function fs(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != ne && e.push(r);
  }), n.cursorWrapper && e.push(F.create(n.state.doc, [n.cursorWrapper.deco])), dt.from(e);
}
const Np = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, Lp = he && gt <= 11;
class Dp {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class Rp {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Dp(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      he && gt <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), Lp && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Np)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (!!Vl(this.view)) {
      if (this.suppressingSelectionUpdates)
        return tt(this.view);
      if (he && gt <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Kt(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = Un(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = Un(s))
      if (t.has(s)) {
        r = s;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && Vl(e) && !this.ignoreSelectionChange(r), s = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let d = 0; d < t.length; d++) {
        let u = this.registerMutation(t[d], a);
        u && (s = s < 0 ? u.from : Math.min(u.from, s), o = o < 0 ? u.to : Math.max(u.to, o), u.typeOver && (l = !0));
      }
    if (De && a.length > 1) {
      let d = a.filter((u) => u.nodeName == "BR");
      if (d.length == 2) {
        let u = d[0], h = d[1];
        u.parentNode && u.parentNode.parentNode == h.parentNode ? h.remove() : u.remove();
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Di(r) && (c = So(e)) && c.eq(L.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, tt(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), Pp(e)), this.handleDOMChange(s, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || tt(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let d = 0; d < e.addedNodes.length; d++)
        t.push(e.addedNodes[d]);
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if (he && gt <= 11 && e.addedNodes.length)
        for (let d = 0; d < e.addedNodes.length; d++) {
          let { previousSibling: u, nextSibling: h } = e.addedNodes[d];
          (!u || Array.prototype.indexOf.call(e.addedNodes, u) < 0) && (i = u), (!h || Array.prototype.indexOf.call(e.addedNodes, h) < 0) && (s = h);
        }
      let o = i && i.parentNode == e.target ? Q(i) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = s && s.parentNode == e.target ? Q(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else
      return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : {
        from: r.posAtStart,
        to: r.posAtEnd,
        typeOver: e.target.nodeValue == e.oldValue
      };
  }
}
let Yl = /* @__PURE__ */ new WeakMap(), Xl = !1;
function Pp(n) {
  if (!Yl.has(n) && (Yl.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = De, Xl)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Xl = !0;
  }
}
function Ip(n) {
  let e;
  function t(a) {
    a.preventDefault(), a.stopImmediatePropagation(), e = a.getTargetRanges()[0];
  }
  n.dom.addEventListener("beforeinput", t, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", t, !0);
  let r = e.startContainer, i = e.startOffset, s = e.endContainer, o = e.endOffset, l = n.domAtPos(n.state.selection.anchor);
  return Kt(l.node, l.offset, s, o) && ([r, i, s, o] = [s, o, r, i]), { anchorNode: r, anchorOffset: i, focusNode: s, focusOffset: o };
}
function Bp(n, e, t) {
  let { node: r, fromOffset: i, toOffset: s, from: o, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, d = a.anchorNode;
  if (d && n.dom.contains(d.nodeType == 1 ? d : d.parentNode) && (c = [{ node: d, offset: a.anchorOffset }], Di(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), oe && n.input.lastKeyCode === 8)
    for (let g = s; g > i; g--) {
      let b = r.childNodes[g - 1], v = b.pmViewDesc;
      if (b.nodeName == "BR" && !v) {
        s = g;
        break;
      }
      if (!v || v.size)
        break;
    }
  let u = n.state.doc, h = n.someProp("domParser") || gn.fromSchema(n.state.schema), f = u.resolve(o), p = null, m = h.parse(r, {
    topNode: f.parent,
    topMatch: f.parent.contentMatchAt(f.index()),
    topOpen: !0,
    from: i,
    to: s,
    preserveWhitespace: f.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: Hp,
    context: f
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, b = c[1] && c[1].pos;
    b == null && (b = g), p = { anchor: g + o, head: b + o };
  }
  return { doc: m, sel: p, from: o, to: l };
}
function Hp(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (le && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || le && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const zp = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function jp(n, e, t, r, i) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let R = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, pe = So(n, R);
    if (pe && !n.state.selection.eq(pe)) {
      if (oe && $e && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (ve) => ve(n, Ot(13, "Enter"))))
        return;
      let Ae = n.state.tr.setSelection(pe);
      R == "pointer" ? Ae.setMeta("pointer", !0) : R == "key" && Ae.scrollIntoView(), s && Ae.setMeta("composition", s), n.dispatch(Ae);
    }
    return;
  }
  let o = n.state.doc.resolve(e), l = o.sharedDepth(t);
  e = o.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = Bp(n, e, t), d = n.state.doc, u = d.slice(c.from, c.to), h, f;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (h = n.state.selection.to, f = "end") : (h = n.state.selection.from, f = "start"), n.input.lastKeyCode = null;
  let p = Wp(u.content, c.doc.content, c.from, h, f);
  if ((vn && n.input.lastIOSEnter > Date.now() - 225 || $e) && i.some((R) => R.nodeType == 1 && !zp.test(R.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (R) => R(n, Ot(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof O && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let R = Ql(n, n.state.doc, c.sel);
        if (R && !R.eq(n.state.selection)) {
          let pe = n.state.tr.setSelection(R);
          s && pe.setMeta("composition", s), n.dispatch(pe);
        }
      }
      return;
    }
  n.input.domChangeCount++, n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof O && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), he && gt <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == " \xA0" && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), b = d.resolve(p.start), v = m.sameParent(g) && m.parent.inlineContent && b.end() >= p.endA, C;
  if ((vn && n.input.lastIOSEnter > Date.now() - 225 && (!v || i.some((R) => R.nodeName == "DIV" || R.nodeName == "P")) || !v && m.pos < c.doc.content.size && !m.sameParent(g) && (C = L.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && C.head == g.pos) && n.someProp("handleKeyDown", (R) => R(n, Ot(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && Fp(d, p.start, p.endA, m, g) && n.someProp("handleKeyDown", (R) => R(n, Ot(8, "Backspace")))) {
    $e && oe && n.domObserver.suppressSelectionUpdates();
    return;
  }
  oe && $e && p.endB == p.start && (n.input.lastAndroidDelete = Date.now()), $e && !v && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, g = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(R) {
      return R(n, Ot(13, "Enter"));
    });
  }, 20));
  let T = p.start, _ = p.endA, A, H, Z;
  if (v) {
    if (m.pos == g.pos)
      he && gt <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => tt(n), 20)), A = n.state.tr.delete(T, _), H = d.resolve(p.start).marksAcross(d.resolve(p.endA));
    else if (p.endA == p.endB && (Z = Vp(m.parent.content.cut(m.parentOffset, g.parentOffset), b.parent.content.cut(b.parentOffset, p.endA - b.start()))))
      A = n.state.tr, Z.type == "add" ? A.addMark(T, _, Z.mark) : A.removeMark(T, _, Z.mark);
    else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let R = m.parent.textBetween(m.parentOffset, g.parentOffset);
      if (n.someProp("handleTextInput", (pe) => pe(n, T, _, R)))
        return;
      A = n.state.tr.insertText(R, T, _);
    }
  }
  if (A || (A = n.state.tr.replace(T, _, c.doc.slice(p.start - c.from, p.endB - c.from))), c.sel) {
    let R = Ql(n, A.doc, c.sel);
    R && !(oe && $e && n.composing && R.empty && (p.start != p.endB || n.input.lastAndroidDelete < Date.now() - 100) && (R.head == T || R.head == A.mapping.map(_) - 1) || he && R.empty && R.head == T) && A.setSelection(R);
  }
  H && A.ensureMarks(H), s && A.setMeta("composition", s), n.dispatch(A.scrollIntoView());
}
function Ql(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : Mo(n, e.resolve(t.anchor), e.resolve(t.head));
}
function Vp(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, s = r, o, l, a;
  for (let d = 0; d < r.length; d++)
    i = r[d].removeFromSet(i);
  for (let d = 0; d < t.length; d++)
    s = t[d].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    l = i[0], o = "add", a = (d) => d.mark(l.addToSet(d.marks));
  else if (i.length == 0 && s.length == 1)
    l = s[0], o = "remove", a = (d) => d.mark(l.removeFromSet(d.marks));
  else
    return null;
  let c = [];
  for (let d = 0; d < e.childCount; d++)
    c.push(a(e.child(d)));
  if (k.from(c).eq(n))
    return { mark: l, type: o };
}
function Fp(n, e, t, r, i) {
  if (t - e <= i.pos - r.pos || ps(r, !0, !1) < i.pos)
    return !1;
  let s = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(ps(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || ps(o, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function ps(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function Wp(n, e, t, r, i) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: o, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    r -= o + a - s;
  }
  if (o < s && n.size < e.size) {
    let a = r <= s && r >= o ? s - r : 0;
    s -= a, s && s < e.size && ea(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), l = s + (l - o), o = s;
  } else if (l < s) {
    let a = r <= s && r >= l ? s - r : 0;
    s -= a, s && s < n.size && ea(n.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), o = s + (o - l), l = s;
  }
  return { start: s, endA: o, endB: l };
}
function ea(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class Up {
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new up(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(sa), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = ra(this), na(this), this.nodeViews = ia(this), this.docView = Pl(this.state.doc, ta(this), fs(this), this.dom, this), this.domObserver = new Rp(this, (r, i, s, o) => jp(this, r, i, s, o)), this.domObserver.start(), hp(this), this.updatePluginViews();
  }
  get composing() {
    return this.input.composing;
  }
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Ys(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(sa), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (bd(this), o = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let f = ia(this);
      qp(f, this.nodeViews) && (this.nodeViews = f, s = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && Ys(this), this.editable = ra(this), na(this);
    let a = fs(this), c = ta(this), d = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", u = s || !this.docView.matchesNode(e.doc, c, a);
    (u || !e.selection.eq(i.selection)) && (o = !0);
    let h = d == "preserve" && o && this.dom.style.overflowAnchor == null && Tf(this);
    if (o) {
      this.domObserver.stop();
      let f = u && (he || oe) && !this.composing && !i.selection.empty && !e.selection.empty && Kp(i.selection, e.selection);
      if (u) {
        let p = oe ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = Mp(this)), (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = Pl(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (f = !0);
      }
      f || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Yf(this)) ? tt(this, f) : (id(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), ((r = this.dragging) === null || r === void 0 ? void 0 : r.node) && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), d == "reset" ? this.dom.scrollTop = 0 : d == "to selection" ? this.scrollToSelection() : h && Af(h);
  }
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this)))
      if (this.state.selection instanceof E) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && Ol(this, t.getBoundingClientRect(), e);
      } else
        Ol(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new vd(e.slice, e.move, i < 0 ? void 0 : E.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  hasFocus() {
    if (he) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  focus() {
    this.domObserver.stop(), this.editable && _f(this.dom), tt(this), this.domObserver.start();
  }
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  updateRoot() {
    this._root = null;
  }
  posAtCoords(e) {
    return Df(this, e);
  }
  coordsAtPos(e, t = 1) {
    return Zc(this, e, t);
  }
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  endOfTextblock(e, t) {
    return Hf(this, t || this.state, e);
  }
  pasteHTML(e, t) {
    return qn(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  pasteText(e, t) {
    return qn(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  destroy() {
    !this.docView || (fp(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], fs(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, mf());
  }
  get isDestroyed() {
    return this.docView == null;
  }
  dispatchEvent(e) {
    return mp(this, e);
  }
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  domSelectionRange() {
    return le && this.root.nodeType === 11 && kf(this.dom.ownerDocument) == this.dom ? Ip(this) : this.domSelection();
  }
  domSelection() {
    return this.root.getSelection();
  }
}
function ta(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [ge.node(0, n.state.doc.content.size, e)];
}
function na(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: ge.widget(n.state.selection.head, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function ra(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function Kp(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function ia(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function qp(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function sa(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var wt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Hr = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Jp = typeof navigator < "u" && /Mac/.test(navigator.platform), Gp = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ee = 0; ee < 10; ee++)
  wt[48 + ee] = wt[96 + ee] = String(ee);
for (var ee = 1; ee <= 24; ee++)
  wt[ee + 111] = "F" + ee;
for (var ee = 65; ee <= 90; ee++)
  wt[ee] = String.fromCharCode(ee + 32), Hr[ee] = String.fromCharCode(ee);
for (var ms in wt)
  Hr.hasOwnProperty(ms) || (Hr[ms] = wt[ms]);
function Zp(n) {
  var e = Jp && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || Gp && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Hr : wt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const Yp = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function Xp(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      Yp ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), o && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function Qp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[Xp(t)] = n[t];
  return e;
}
function gs(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function em(n) {
  return new se({ props: { handleKeyDown: Sd(n) } });
}
function Sd(n) {
  let e = Qp(n);
  return function(t, r) {
    let i = Zp(r), s, o = e[gs(i, r)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[gs(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) && (s = wt[r.keyCode]) && s != i) {
        let l = e[gs(s, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const tm = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Md(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const nm = (n, e, t) => {
  let r = Md(n, t);
  if (!r)
    return !1;
  let i = $o(r);
  if (!i) {
    let o = r.blockRange(), l = o && Sn(o);
    return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (!s.type.spec.isolating && _d(n, i, e))
    return !0;
  if (r.parent.content.size == 0 && (kn(s, "end") || E.isSelectable(s))) {
    let o = Ni(n.doc, r.before(), r.after(), w.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = n.tr.step(o);
        l.setSelection(kn(s, "end") ? L.findFrom(l.doc.resolve(l.mapping.map(i.pos, -1)), -1) : E.create(l.doc, i.pos - s.nodeSize)), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, rm = (n, e, t) => {
  let r = Md(n, t);
  if (!r)
    return !1;
  let i = $o(r);
  return i ? Ed(n, i, e) : !1;
}, im = (n, e, t) => {
  let r = Td(n, t);
  if (!r)
    return !1;
  let i = No(r);
  return i ? Ed(n, i, e) : !1;
};
function Ed(n, e, t) {
  let r = e.nodeBefore, i = r, s = e.pos - 1;
  for (; !i.isTextblock; s--) {
    if (i.type.spec.isolating)
      return !1;
    let d = i.lastChild;
    if (!d)
      return !1;
    i = d;
  }
  let o = e.nodeAfter, l = o, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let d = l.firstChild;
    if (!d)
      return !1;
    l = d;
  }
  let c = Ni(n.doc, s, a, w.empty);
  if (!c || c.from != s || c instanceof K && c.slice.size >= a - s)
    return !1;
  if (t) {
    let d = n.tr.step(c);
    d.setSelection(O.create(d.doc, s)), t(d.scrollIntoView());
  }
  return !0;
}
function kn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const sm = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = $o(r);
  }
  let o = s && s.nodeBefore;
  return !o || !E.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(E.create(n.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function $o(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Td(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const om = (n, e, t) => {
  let r = Td(n, t);
  if (!r)
    return !1;
  let i = No(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if (_d(n, i, e))
    return !0;
  if (r.parent.content.size == 0 && (kn(s, "start") || E.isSelectable(s))) {
    let o = Ni(n.doc, r.before(), r.after(), w.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = n.tr.step(o);
        l.setSelection(kn(s, "start") ? L.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : E.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, lm = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = No(r);
  }
  let o = s && s.nodeAfter;
  return !o || !E.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(E.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function No(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const am = (n, e) => {
  let t = n.selection, r = t instanceof E, i;
  if (r) {
    if (t.node.isTextblock || !Mt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = $i(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let s = n.tr.join(i);
    r && s.setSelection(E.create(s.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, cm = (n, e) => {
  let t = n.selection, r;
  if (t instanceof E) {
    if (t.node.isTextblock || !Mt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = $i(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, dm = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), s = i && Sn(i);
  return s == null ? !1 : (e && e(n.tr.lift(i, s).scrollIntoView()), !0);
}, um = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ad(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const hm = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), s = t.indexAfter(-1), o = Ad(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection(L.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, fm = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Le || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = Ad(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(o, s.createAndFill());
    l.setSelection(O.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, pm = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (cn(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Sn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
}, mm = (n, e) => {
  let { $from: t, to: r } = n.selection, i, s = t.sharedDepth(r);
  return s == 0 ? !1 : (i = t.before(s), e && e(n.tr.setSelection(E.create(n.doc, i))), !0);
};
function gm(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || Mt(n.doc, e.pos)) ? !1 : (t && t(n.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function _d(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, s, o;
  if (r.type.spec.isolating || i.type.spec.isolating)
    return !1;
  if (gm(n, e, t))
    return !0;
  let l = e.parent.canReplace(e.index(), e.index() + 1);
  if (l && (s = (o = r.contentMatchAt(r.childCount)).findWrapping(i.type)) && o.matchType(s[0] || i.type).validEnd) {
    if (t) {
      let u = e.pos + i.nodeSize, h = k.empty;
      for (let m = s.length - 1; m >= 0; m--)
        h = k.from(s[m].create(null, h));
      h = k.from(r.copy(h));
      let f = n.tr.step(new q(e.pos - 1, u, e.pos, u, new w(h, 1, 0), s.length, !0)), p = u + 2 * s.length;
      Mt(f.doc, p) && f.join(p), t(f.scrollIntoView());
    }
    return !0;
  }
  let a = L.findFrom(e, 1), c = a && a.$from.blockRange(a.$to), d = c && Sn(c);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(c, d).scrollIntoView()), !0;
  if (l && kn(i, "start", !0) && kn(r, "end")) {
    let u = r, h = [];
    for (; h.push(u), !u.isTextblock; )
      u = u.lastChild;
    let f = i, p = 1;
    for (; !f.isTextblock; f = f.firstChild)
      p++;
    if (u.canReplace(u.childCount, u.childCount, f.content)) {
      if (t) {
        let m = k.empty;
        for (let b = h.length - 1; b >= 0; b--)
          m = k.from(h[b].copy(m));
        let g = n.tr.step(new q(e.pos - h.length, e.pos + i.nodeSize, e.pos + p, e.pos + i.nodeSize - p, new w(m, h.length, 0), 0, !0));
        t(g.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Od(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (t && t(e.tr.setSelection(O.create(e.doc, n < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const bm = Od(-1), ym = Od(1);
function vm(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), l = o && xo(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function oa(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let s = 0; s < t.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: l } } = t.selection.ranges[s];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let d = t.doc.resolve(c), u = d.index();
            i = d.parent.canReplaceWith(u, u + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[o];
        s.setBlockType(l, a, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function km(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), l = !1, a = o;
    if (!o)
      return !1;
    if (o.depth >= 2 && i.node(o.depth - 1).type.compatibleContent(n) && o.startIndex == 0) {
      if (i.index(o.depth - 1) == 0)
        return !1;
      let d = t.doc.resolve(o.start - 2);
      a = new Or(d, d, o.depth), o.endIndex < o.parent.childCount && (o = new Or(i, t.doc.resolve(s.end(o.depth)), o.depth)), l = !0;
    }
    let c = xo(a, n, e, o);
    return c ? (r && r(xm(t.tr, o, c, l, n).scrollIntoView()), !0) : !1;
  };
}
function xm(n, e, t, r, i) {
  let s = k.empty;
  for (let d = t.length - 1; d >= 0; d--)
    s = k.from(t[d].type.create(t[d].attrs, s));
  n.step(new q(e.start - (r ? 2 : 0), e.end, e.start, e.end, new w(s, 0, 0), t.length, !0));
  let o = 0;
  for (let d = 0; d < t.length; d++)
    t[d].type == i && (o = d + 1);
  let l = t.length - o, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let d = e.startIndex, u = e.endIndex, h = !0; d < u; d++, h = !1)
    !h && cn(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(d).nodeSize;
  return n;
}
function wm(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? Cm(e, t, n, s) : Sm(e, t, s) : !0 : !1;
  };
}
function Cm(n, e, t, r) {
  let i = n.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new q(s - 1, o, s, o, new w(k.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Or(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const l = Sn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.mapping.map(s, -1) - 1;
  return Mt(i.doc, a) && i.join(a), e(i.scrollIntoView()), !0;
}
function Sm(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let f = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    f -= i.child(p).nodeSize, r.delete(f - 1, f + 1);
  let s = r.doc.resolve(t.start), o = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = s.node(-1), d = s.index(-1);
  if (!c.canReplace(d + (l ? 0 : 1), d + 1, o.content.append(a ? k.empty : k.from(i))))
    return !1;
  let u = s.pos, h = u + o.nodeSize;
  return r.step(new q(u - (l ? 1 : 0), h + (a ? 1 : 0), u + 1, h - 1, new w((l ? k.empty : k.from(i.copy(k.empty))).append(a ? k.empty : k.from(i.copy(k.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Mm(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let l = s.parent, a = l.child(o - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, d = k.from(c ? n.create() : null), u = new w(k.from(n.create(null, k.from(l.type.create(null, d)))), c ? 3 : 1, 0), h = s.start, f = s.end;
      t(e.tr.step(new q(h - (c ? 3 : 1), f, h, f, u, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Ii(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: s } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = t.selection, i = t.doc, s = t.storedMarks, t;
    }
  };
}
class Bi {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: s } = r, o = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...d) => {
      const u = a(...d)(o);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(s), u;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = [], a = !!e, c = e || s.tr, d = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c), l.every((h) => h === !0)), u = {
      ...Object.fromEntries(Object.entries(r).map(([h, f]) => [h, (...m) => {
        const g = this.buildProps(c, t), b = f(...m)(g);
        return l.push(b), u;
      }])),
      run: d
    };
    return u;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, s = e || r.tr, o = this.buildProps(s, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([a, c]) => [a, (...d) => c(...d)({ ...o, dispatch: void 0 })])),
      chain: () => this.createChain(s, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = {
      tr: e,
      editor: i,
      view: o,
      state: Ii({
        state: s,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...d) => c(...d)(l)]));
      }
    };
    return l;
  }
}
class Em {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((i) => i.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((i) => i !== t) : delete this.callbacks[e]), this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function S(n, e, t) {
  return n.config[e] === void 0 && n.parent ? S(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? S(n.parent, e, t) : null
  }) : n.config[e];
}
function Hi(n) {
  const e = n.filter((i) => i.type === "extension"), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function $d(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = Hi(n), i = [...t, ...r], s = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, a = S(o, "addGlobalAttributes", l);
    if (!a)
      return;
    a().forEach((d) => {
      d.types.forEach((u) => {
        Object.entries(d.attributes).forEach(([h, f]) => {
          e.push({
            type: u,
            name: h,
            attribute: {
              ...s,
              ...f
            }
          });
        });
      });
    });
  }), i.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, a = S(o, "addAttributes", l);
    if (!a)
      return;
    const c = a();
    Object.entries(c).forEach(([d, u]) => {
      const h = {
        ...s,
        ...u
      };
      typeof (h == null ? void 0 : h.default) == "function" && (h.default = h.default()), (h == null ? void 0 : h.isRequired) && (h == null ? void 0 : h.default) === void 0 && delete h.default, e.push({
        type: o.name,
        name: d,
        attribute: h
      });
    });
  }), e;
}
function G(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function j(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([i, s]) => {
      if (!r[i]) {
        r[i] = s;
        return;
      }
      if (i === "class") {
        const l = s ? s.split(" ") : [], a = r[i] ? r[i].split(" ") : [], c = l.filter((d) => !a.includes(d));
        r[i] = [...a, ...c].join(" ");
      } else
        i === "style" ? r[i] = [r[i], s].join("; ") : r[i] = s;
    }), r;
  }, {});
}
function Xs(n, e) {
  return e.filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => j(t, r), {});
}
function Nd(n) {
  return typeof n == "function";
}
function N(n, e = void 0, ...t) {
  return Nd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Tm(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function Am(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function la(n, e) {
  return n.style ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((s, o) => {
        const l = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Am(t.getAttribute(o.name));
        return l == null ? s : {
          ...s,
          [o.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function aa(n) {
  return Object.fromEntries(
    Object.entries(n).filter(([e, t]) => e === "attrs" && Tm(t) ? !1 : t != null)
  );
}
function _m(n, e) {
  var t;
  const r = $d(n), { nodeExtensions: i, markExtensions: s } = Hi(n), o = (t = i.find((c) => S(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, l = Object.fromEntries(i.map((c) => {
    const d = r.filter((b) => b.type === c.name), u = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, h = n.reduce((b, v) => {
      const C = S(v, "extendNodeSchema", u);
      return {
        ...b,
        ...C ? C(c) : {}
      };
    }, {}), f = aa({
      ...h,
      content: N(S(c, "content", u)),
      marks: N(S(c, "marks", u)),
      group: N(S(c, "group", u)),
      inline: N(S(c, "inline", u)),
      atom: N(S(c, "atom", u)),
      selectable: N(S(c, "selectable", u)),
      draggable: N(S(c, "draggable", u)),
      code: N(S(c, "code", u)),
      defining: N(S(c, "defining", u)),
      isolating: N(S(c, "isolating", u)),
      attrs: Object.fromEntries(d.map((b) => {
        var v;
        return [b.name, { default: (v = b == null ? void 0 : b.attribute) === null || v === void 0 ? void 0 : v.default }];
      }))
    }), p = N(S(c, "parseHTML", u));
    p && (f.parseDOM = p.map((b) => la(b, d)));
    const m = S(c, "renderHTML", u);
    m && (f.toDOM = (b) => m({
      node: b,
      HTMLAttributes: Xs(b, d)
    }));
    const g = S(c, "renderText", u);
    return g && (f.toText = g), [c.name, f];
  })), a = Object.fromEntries(s.map((c) => {
    const d = r.filter((g) => g.type === c.name), u = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, h = n.reduce((g, b) => {
      const v = S(b, "extendMarkSchema", u);
      return {
        ...g,
        ...v ? v(c) : {}
      };
    }, {}), f = aa({
      ...h,
      inclusive: N(S(c, "inclusive", u)),
      excludes: N(S(c, "excludes", u)),
      group: N(S(c, "group", u)),
      spanning: N(S(c, "spanning", u)),
      code: N(S(c, "code", u)),
      attrs: Object.fromEntries(d.map((g) => {
        var b;
        return [g.name, { default: (b = g == null ? void 0 : g.attribute) === null || b === void 0 ? void 0 : b.default }];
      }))
    }), p = N(S(c, "parseHTML", u));
    p && (f.parseDOM = p.map((g) => la(g, d)));
    const m = S(c, "renderHTML", u);
    return m && (f.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: Xs(g, d)
    })), [c.name, f];
  }));
  return new Rh({
    topNode: o,
    nodes: l,
    marks: a
  });
}
function bs(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function ca(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
const Om = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (i, s, o, l) => {
    var a, c;
    const d = ((c = (a = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(a, {
      node: i,
      pos: s,
      parent: o,
      index: l
    })) || i.textContent || "%leaf%";
    t += d.slice(0, Math.max(0, r - s));
  }), t;
};
function Lo(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class zi {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const $m = (n, e) => {
  if (Lo(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function ys(n) {
  var e;
  const { editor: t, from: r, to: i, text: s, rules: o, plugin: l } = n, { view: a } = t;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (c.parent.type.spec.code || !!(!((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((h) => h.type.spec.code)))
    return !1;
  let d = !1;
  const u = Om(c) + s;
  return o.forEach((h) => {
    if (d)
      return;
    const f = $m(u, h.find);
    if (!f)
      return;
    const p = a.state.tr, m = Ii({
      state: a.state,
      transaction: p
    }), g = {
      from: r - (f[0].length - s.length),
      to: i
    }, { commands: b, chain: v, can: C } = new Bi({
      editor: t,
      state: m
    });
    h.handler({
      state: m,
      range: g,
      match: f,
      commands: b,
      chain: v,
      can: C
    }) === null || !p.steps.length || (p.setMeta(l, {
      transform: p,
      from: r,
      to: i,
      text: s
    }), a.dispatch(p), d = !0);
  }), d;
}
function Nm(n) {
  const { editor: e, rules: t } = n, r = new se({
    state: {
      init() {
        return null;
      },
      apply(i, s) {
        const o = i.getMeta(r);
        return o || (i.selectionSet || i.docChanged ? null : s);
      }
    },
    props: {
      handleTextInput(i, s, o, l) {
        return ys({
          editor: e,
          from: s,
          to: o,
          text: l,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: s } = i.state.selection;
          s && ys({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      handleKeyDown(i, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: o } = i.state.selection;
        return o ? ys({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    isInputRules: !0
  });
  return r;
}
function Lm(n) {
  return typeof n == "number";
}
class Dm {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Rm = (n, e, t) => {
  if (Lo(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const s = [i.text];
    return s.index = i.index, s.input = n, s.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(i.replaceWith)), s;
  }) : [];
};
function Pm(n) {
  const { editor: e, state: t, from: r, to: i, rule: s, pasteEvent: o, dropEvent: l } = n, { commands: a, chain: c, can: d } = new Bi({
    editor: e,
    state: t
  }), u = [];
  return t.doc.nodesBetween(r, i, (f, p) => {
    if (!f.isTextblock || f.type.spec.code)
      return;
    const m = Math.max(r, p), g = Math.min(i, p + f.content.size), b = f.textBetween(m - p, g - p, void 0, "\uFFFC");
    Rm(b, s.find, o).forEach((C) => {
      if (C.index === void 0)
        return;
      const T = m + C.index + 1, _ = T + C[0].length, A = {
        from: t.tr.mapping.map(T),
        to: t.tr.mapping.map(_)
      }, H = s.handler({
        state: t,
        range: A,
        match: C,
        commands: a,
        chain: c,
        can: d,
        pasteEvent: o,
        dropEvent: l
      });
      u.push(H);
    });
  }), u.every((f) => f !== null);
}
function Im(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  return t.map((c) => new se({
    view(d) {
      const u = (h) => {
        var f;
        r = !((f = d.dom.parentElement) === null || f === void 0) && f.contains(h.target) ? d.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", u), {
        destroy() {
          window.removeEventListener("dragstart", u);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, u) => (s = r === d.dom.parentElement, l = u, !1),
        paste: (d, u) => {
          var h;
          const f = (h = u.clipboardData) === null || h === void 0 ? void 0 : h.getData("text/html");
          return o = u, i = !!(f != null && f.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, u, h) => {
      const f = d[0], p = f.getMeta("uiEvent") === "paste" && !i, m = f.getMeta("uiEvent") === "drop" && !s;
      if (!p && !m)
        return;
      const g = u.doc.content.findDiffStart(h.doc.content), b = u.doc.content.findDiffEnd(h.doc.content);
      if (!Lm(g) || !b || g === b.b)
        return;
      const v = h.tr, C = Ii({
        state: h,
        transaction: v
      });
      if (!(!Pm({
        editor: e,
        state: C,
        from: Math.max(g - 1, 0),
        to: b.b - 1,
        rule: c,
        pasteEvent: o,
        dropEvent: l
      }) || !v.steps.length))
        return l = typeof DragEvent < "u" ? new DragEvent("drop") : null, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, v;
    }
  }));
}
function Bm(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return [...new Set(e)];
}
class sn {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = sn.resolve(e), this.schema = _m(this.extensions, t), this.extensions.forEach((r) => {
      var i;
      this.editor.extensionStorage[r.name] = r.storage;
      const s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: this.editor,
        type: bs(r.name, this.schema)
      };
      r.type === "mark" && ((i = N(S(r, "keepOnSplit", s))) !== null && i !== void 0 ? i : !0) && this.splittableMarks.push(r.name);
      const o = S(r, "onBeforeCreate", s);
      o && this.editor.on("beforeCreate", o);
      const l = S(r, "onCreate", s);
      l && this.editor.on("create", l);
      const a = S(r, "onUpdate", s);
      a && this.editor.on("update", a);
      const c = S(r, "onSelectionUpdate", s);
      c && this.editor.on("selectionUpdate", c);
      const d = S(r, "onTransaction", s);
      d && this.editor.on("transaction", d);
      const u = S(r, "onFocus", s);
      u && this.editor.on("focus", u);
      const h = S(r, "onBlur", s);
      h && this.editor.on("blur", h);
      const f = S(r, "onDestroy", s);
      f && this.editor.on("destroy", f);
    });
  }
  static resolve(e) {
    const t = sn.sort(sn.flatten(e)), r = Bm(t.map((i) => i.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((i) => `'${i}'`).join(", ")}]. This can lead to issues.`), t;
  }
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, i = S(t, "addExtensions", r);
      return i ? [t, ...this.flatten(i())] : t;
    }).flat(10);
  }
  static sort(e) {
    return e.sort((r, i) => {
      const s = S(r, "priority") || 100, o = S(i, "priority") || 100;
      return s > o ? -1 : s < o ? 1 : 0;
    });
  }
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: bs(t.name, this.schema)
      }, i = S(t, "addCommands", r);
      return i ? {
        ...e,
        ...i()
      } : e;
    }, {});
  }
  get plugins() {
    const { editor: e } = this, t = sn.sort([...this.extensions].reverse()), r = [], i = [], s = t.map((o) => {
      const l = {
        name: o.name,
        options: o.options,
        storage: o.storage,
        editor: e,
        type: bs(o.name, this.schema)
      }, a = [], c = S(o, "addKeyboardShortcuts", l);
      let d = {};
      if (o.type === "mark" && o.config.exitable && (d.ArrowRight = () => ye.handleExit({ editor: e, mark: o })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([g, b]) => [g, () => b({ editor: e })]));
        d = { ...d, ...m };
      }
      const u = em(d);
      a.push(u);
      const h = S(o, "addInputRules", l);
      ca(o, e.options.enableInputRules) && h && r.push(...h());
      const f = S(o, "addPasteRules", l);
      ca(o, e.options.enablePasteRules) && f && i.push(...f());
      const p = S(o, "addProseMirrorPlugins", l);
      if (p) {
        const m = p();
        a.push(...m);
      }
      return a;
    }).flat();
    return [
      Nm({
        editor: e,
        rules: r
      }),
      ...Im({
        editor: e,
        rules: i
      }),
      ...s
    ];
  }
  get attributes() {
    return $d(this.extensions);
  }
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = Hi(this.extensions);
    return Object.fromEntries(t.filter((r) => !!S(r, "addNodeView")).map((r) => {
      const i = this.attributes.filter((a) => a.type === r.name), s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: G(r.name, this.schema)
      }, o = S(r, "addNodeView", s);
      if (!o)
        return [];
      const l = (a, c, d, u) => {
        const h = Xs(a, i);
        return o()({
          editor: e,
          node: a,
          getPos: d,
          decorations: u,
          HTMLAttributes: h,
          extension: r
        });
      };
      return [r.name, l];
    }));
  }
}
function Hm(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function vs(n) {
  return Hm(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function ji(n, e) {
  const t = { ...n };
  return vs(n) && vs(e) && Object.keys(e).forEach((r) => {
    vs(e[r]) ? r in n ? t[r] = ji(n[r], e[r]) : Object.assign(t, { [r]: e[r] }) : Object.assign(t, { [r]: e[r] });
  }), t;
}
class fe {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = N(S(this, "addOptions", {
      name: this.name
    }))), this.storage = N(S(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new fe(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = ji(this.options, e), t.storage = N(S(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new fe({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = N(S(t, "addOptions", {
      name: t.name
    })), t.storage = N(S(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Ld(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: s = `

`, textSerializers: o = {} } = t || {};
  let l = "", a = !0;
  return n.nodesBetween(r, i, (c, d, u, h) => {
    var f;
    const p = o == null ? void 0 : o[c.type.name];
    p ? (c.isBlock && !a && (l += s, a = !0), u && (l += p({
      node: c,
      pos: d,
      parent: u,
      index: h,
      range: e
    }))) : c.isText ? (l += (f = c == null ? void 0 : c.text) === null || f === void 0 ? void 0 : f.slice(Math.max(r, d) - d, i - d), a = !1) : c.isBlock && !a && (l += s, a = !0);
  }), l;
}
function Dd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const zm = fe.create({
  name: "clipboardTextSerializer",
  addProseMirrorPlugins() {
    return [
      new se({
        key: new Ee("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, { ranges: s } = i, o = Math.min(...s.map((d) => d.$from.pos)), l = Math.max(...s.map((d) => d.$to.pos)), a = Dd(t);
            return Ld(r, { from: o, to: l }, {
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), jm = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), Vm = (n = !1) => ({ commands: e }) => e.setContent("", n), Fm = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: s, $to: o }) => {
    n.doc.nodesBetween(s.pos, o.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: d } = e, u = c.resolve(d.map(a)), h = c.resolve(d.map(a + l.nodeSize)), f = u.blockRange(h);
      if (!f)
        return;
      const p = Sn(f);
      if (l.type.isTextblock) {
        const { defaultType: m } = u.parent.contentMatchAt(u.index());
        e.setNodeMarkup(f.start, m);
      }
      (p || p === 0) && e.lift(f, p);
    });
  }), !0;
}, Wm = (n) => (e) => n(e), Um = () => ({ state: n, dispatch: e }) => fm(n, e), Km = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, s = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const o = r.mapping.map(e);
  return r.insert(o, s.content), r.setSelection(new O(r.doc.resolve(o - 1))), !0;
}, qm = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let s = i.depth; s > 0; s -= 1)
    if (i.node(s).type === r.type) {
      if (e) {
        const l = i.before(s), a = i.after(s);
        n.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Jm = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = G(n, t.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === i) {
      if (r) {
        const a = s.before(o), c = s.after(o);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Gm = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Zm = () => ({ state: n, dispatch: e }) => tm(n, e), Ym = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Xm = () => ({ state: n, dispatch: e }) => hm(n, e);
function zr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Lo(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Qs(n, e, t = {}) {
  return n.find((r) => r.type === e && zr(r.attrs, t));
}
function Qm(n, e, t = {}) {
  return !!Qs(n, e, t);
}
function Do(n, e, t = {}) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if (n.parentOffset === r.offset && r.offset !== 0 && (r = n.parent.childBefore(n.parentOffset)), !r.node)
    return;
  const i = Qs([...r.node.marks], e, t);
  if (!i)
    return;
  let s = r.index, o = n.start() + r.offset, l = s + 1, a = o + r.node.nodeSize;
  for (Qs([...r.node.marks], e, t); s > 0 && i.isInSet(n.parent.child(s - 1).marks); )
    s -= 1, o -= n.parent.child(s).nodeSize;
  for (; l < n.parent.childCount && Qm([...n.parent.child(l).marks], e, t); )
    a += n.parent.child(l).nodeSize, l += 1;
  return {
    from: o,
    to: a
  };
}
function Tt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const e1 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const s = Tt(n, r.schema), { doc: o, selection: l } = t, { $from: a, from: c, to: d } = l;
  if (i) {
    const u = Do(a, s, e);
    if (u && u.from <= c && u.to >= d) {
      const h = O.create(o, u.from, u.to);
      t.setSelection(h);
    }
  }
  return !0;
}, t1 = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function Rd(n) {
  return n instanceof O;
}
function Rt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Pd(n, e = null) {
  if (!e)
    return null;
  const t = L.atStart(n), r = L.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, s = r.to;
  return e === "all" ? O.create(n, Rt(0, i, s), Rt(n.content.size, i, s)) : O.create(n, Rt(e, i, s), Rt(e, i, s));
}
function Ro() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const n1 = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    Ro() && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (s && n === null && !Rd(t.state.selection))
    return o(), !0;
  const l = Pd(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return s && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, r1 = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), i1 = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), Id = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Id(r);
  }
  return n;
};
function da(n) {
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Id(t);
}
function jr(n, e, t) {
  if (t = {
    slice: !0,
    parseOptions: {},
    ...t
  }, typeof n == "object" && n !== null)
    try {
      return Array.isArray(n) && n.length > 0 ? k.fromArray(n.map((r) => e.nodeFromJSON(r))) : e.nodeFromJSON(n);
    } catch (r) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", r), jr("", e, t);
    }
  if (typeof n == "string") {
    const r = gn.fromSchema(e);
    return t.slice ? r.parseSlice(da(n), t.parseOptions).content : r.parse(da(n), t.parseOptions);
  }
  return jr("", e, t);
}
function s1(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof K || i instanceof q))
    return;
  const s = n.mapping.maps[r];
  let o = 0;
  s.forEach((l, a, c, d) => {
    o === 0 && (o = d);
  }), n.setSelection(L.near(n.doc.resolve(o), t));
}
const o1 = (n) => n.toString().startsWith("<"), l1 = (n, e, t) => ({ tr: r, dispatch: i, editor: s }) => {
  if (i) {
    t = {
      parseOptions: {},
      updateSelection: !0,
      ...t
    };
    const o = jr(e, s.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...t.parseOptions
      }
    });
    if (o.toString() === "<>")
      return !0;
    let { from: l, to: a } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, c = !0, d = !0;
    if ((o1(o) ? o : [o]).forEach((h) => {
      h.check(), c = c ? h.isText && h.marks.length === 0 : !1, d = d ? h.isBlock : !1;
    }), l === a && d) {
      const { parent: h } = r.doc.resolve(l);
      h.isTextblock && !h.type.spec.code && !h.childCount && (l -= 1, a += 1);
    }
    c ? Array.isArray(e) ? r.insertText(e.map((h) => h.text || "").join(""), l, a) : typeof e == "object" && !!e && !!e.text ? r.insertText(e.text, l, a) : r.insertText(e, l, a) : r.replaceWith(l, a, o), t.updateSelection && s1(r, r.steps.length - 1, -1);
  }
  return !0;
}, a1 = () => ({ state: n, dispatch: e }) => am(n, e), c1 = () => ({ state: n, dispatch: e }) => cm(n, e), d1 = () => ({ state: n, dispatch: e }) => nm(n, e), u1 = () => ({ state: n, dispatch: e }) => om(n, e), h1 = () => ({ tr: n, state: e, dispatch: t }) => {
  try {
    const r = $i(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
  } catch {
    return !1;
  }
}, f1 = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = $i(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, p1 = () => ({ state: n, dispatch: e }) => rm(n, e), m1 = () => ({ state: n, dispatch: e }) => im(n, e);
function Po() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function g1(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      Ro() || Po() ? o = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), o && (t = `Meta-${t}`), s && (t = `Shift-${t}`), t;
}
const b1 = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const s = g1(n).split(/-(?!$)/), o = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const d = c.map(r.mapping);
    d && i && r.maybeStep(d);
  }), !0;
};
function Gn(n, e, t = {}) {
  const { from: r, to: i, empty: s } = n.selection, o = e ? G(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, h) => {
    if (u.isText)
      return;
    const f = Math.max(r, h), p = Math.min(i, h + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: p
    });
  });
  const a = i - r, c = l.filter((u) => o ? o.name === u.node.type.name : !0).filter((u) => zr(u.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((u, h) => u + h.to - h.from, 0) >= a;
}
const y1 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = G(n, t.schema);
  return Gn(t, i, e) ? dm(t, r) : !1;
}, v1 = () => ({ state: n, dispatch: e }) => pm(n, e), k1 = (n) => ({ state: e, dispatch: t }) => {
  const r = G(n, e.schema);
  return wm(r)(e, t);
}, x1 = () => ({ state: n, dispatch: e }) => um(n, e);
function Vi(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function ua(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const w1 = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = Vi(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (s = G(n, r.schema)), l === "mark" && (o = Tt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, d) => {
      s && s === c.type && t.setNodeMarkup(d, void 0, ua(c.attrs, e)), o && c.marks.length && c.marks.forEach((u) => {
        o === u.type && t.addMark(d, d + c.nodeSize, o.create(ua(u.attrs, e)));
      });
    });
  }), !0) : !1;
}, C1 = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), S1 = () => ({ tr: n, commands: e }) => e.setTextSelection({
  from: 0,
  to: n.doc.content.size
}), M1 = () => ({ state: n, dispatch: e }) => sm(n, e), E1 = () => ({ state: n, dispatch: e }) => lm(n, e), T1 = () => ({ state: n, dispatch: e }) => mm(n, e), A1 = () => ({ state: n, dispatch: e }) => ym(n, e), _1 = () => ({ state: n, dispatch: e }) => bm(n, e);
function Bd(n, e, t = {}) {
  return jr(n, e, { slice: !1, parseOptions: t });
}
const O1 = (n, e = !1, t = {}) => ({ tr: r, editor: i, dispatch: s }) => {
  const { doc: o } = r, l = Bd(n, i.schema, t);
  return s && r.replaceWith(0, o.content.size, l).setMeta("preventUpdate", !e), !0;
};
function Fi(n, e) {
  const t = Tt(e, n.schema), { from: r, to: i, empty: s } = n.selection, o = [];
  s ? (n.storedMarks && o.push(...n.storedMarks), o.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    o.push(...a.marks);
  });
  const l = o.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function $1(n, e) {
  const t = new Vc(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function N1(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function L1(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (i, s) => {
    t(i) && r.push({
      node: i,
      pos: s
    });
  }), r;
}
function D1(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function Io(n) {
  return (e) => D1(e.$from, n);
}
function R1(n, e) {
  const t = je.fromSchema(e).serializeFragment(n), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
function P1(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return Ld(n, t, e);
}
function I1(n, e) {
  const t = G(e, n.schema), { from: r, to: i } = n.selection, s = [];
  n.doc.nodesBetween(r, i, (l) => {
    s.push(l);
  });
  const o = s.reverse().find((l) => l.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function Hd(n, e) {
  const t = Vi(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? I1(n, e) : t === "mark" ? Fi(n, e) : {};
}
function B1(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function H1(n) {
  const e = B1(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((s, o) => o !== r).some((s) => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to));
}
function z1(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, s) => {
    const o = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        o.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = t[s];
      if (l === void 0 || a === void 0)
        return;
      o.push({ from: l, to: a });
    }
    o.forEach(({ from: l, to: a }) => {
      const c = e.slice(s).map(l, -1), d = e.slice(s).map(a), u = e.invert().map(c, -1), h = e.invert().map(d);
      r.push({
        oldRange: {
          from: u,
          to: h
        },
        newRange: {
          from: c,
          to: d
        }
      });
    });
  }), H1(r);
}
function Bo(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const s = t.resolve(n - 1), o = Do(s, i.type);
    !o || r.push({
      mark: i,
      ...o
    });
  }) : t.nodesBetween(n, e, (i, s) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(...i.marks.map((o) => ({
      from: s,
      to: s + i.nodeSize,
      mark: o
    })));
  }), r;
}
function gr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((s) => s.type === e && s.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function eo(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, s = e ? Tt(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => s ? s.name === u.type.name : !0).find((u) => zr(u.attrs, t, { strict: !1 }));
  let o = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: h }) => {
    const f = u.pos, p = h.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const b = Math.max(f, g), v = Math.min(p, g + m.nodeSize), C = v - b;
      o += C, l.push(...m.marks.map((T) => ({
        mark: T,
        from: b,
        to: v
      })));
    });
  }), o === 0)
    return !1;
  const a = l.filter((u) => s ? s.name === u.mark.type.name : !0).filter((u) => zr(u.mark.attrs, t, { strict: !1 })).reduce((u, h) => u + h.to - h.from, 0), c = l.filter((u) => s ? u.mark.type !== s && u.mark.type.excludes(s) : !0).reduce((u, h) => u + h.to - h.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function j1(n, e, t = {}) {
  if (!e)
    return Gn(n, null, t) || eo(n, null, t);
  const r = Vi(e, n.schema);
  return r === "node" ? Gn(n, e, t) : r === "mark" ? eo(n, e, t) : !1;
}
function ha(n, e) {
  const { nodeExtensions: t } = Hi(e), r = t.find((o) => o.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = N(S(r, "group", i));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function V1(n) {
  var e;
  const t = (e = n.type.createAndFill()) === null || e === void 0 ? void 0 : e.toJSON(), r = n.toJSON();
  return JSON.stringify(t) === JSON.stringify(r);
}
function F1(n, e, t) {
  var r;
  const { selection: i } = e;
  let s = null;
  if (Rd(i) && (s = i.$cursor), s) {
    const l = (r = n.storedMarks) !== null && r !== void 0 ? r : s.marks();
    return !!t.isInSet(l) || !l.some((a) => a.type.excludes(t));
  }
  const { ranges: o } = i;
  return o.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (d, u, h) => {
      if (c)
        return !1;
      if (d.isInline) {
        const f = !h || h.type.allowsMarkType(t), p = !!t.isInSet(d.marks) || !d.marks.some((m) => m.type.excludes(t));
        c = f && p;
      }
      return !c;
    }), c;
  });
}
const W1 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: s } = t, { empty: o, ranges: l } = s, a = Tt(n, r.schema);
  if (i)
    if (o) {
      const c = Fi(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else
      l.forEach((c) => {
        const d = c.$from.pos, u = c.$to.pos;
        r.doc.nodesBetween(d, u, (h, f) => {
          const p = Math.max(f, d), m = Math.min(f + h.nodeSize, u);
          h.marks.find((b) => b.type === a) ? h.marks.forEach((b) => {
            a === b.type && t.addMark(p, m, a.create({
              ...b.attrs,
              ...e
            }));
          }) : t.addMark(p, m, a.create(e));
        });
      });
  return F1(r, t, a);
}, U1 = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), K1 = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const s = G(n, t.schema);
  return s.isTextblock ? i().command(({ commands: o }) => oa(s, e)(t) ? !0 : o.clearNodes()).command(({ state: o }) => oa(s, e)(o, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, q1 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Rt(n, 0, r.content.size), s = E.create(r, i);
    e.setSelection(s);
  }
  return !0;
}, J1 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: s } = typeof n == "number" ? { from: n, to: n } : n, o = O.atStart(r).from, l = O.atEnd(r).to, a = Rt(i, o, l), c = Rt(s, o, l), d = O.create(r, a, c);
    e.setSelection(d);
  }
  return !0;
}, G1 = (n) => ({ state: e, dispatch: t }) => {
  const r = G(n, e.schema);
  return Mm(r)(e, t);
};
function fa(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Z1 = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: s, doc: o } = e, { $from: l, $to: a } = s, c = i.extensionManager.attributes, d = gr(c, l.node().type.name, l.node().attrs);
  if (s instanceof E && s.node.isBlock)
    return !l.parentOffset || !cn(o, l.pos) ? !1 : (r && (n && fa(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  if (r) {
    const u = a.parentOffset === a.parent.content.size;
    s instanceof O && e.deleteSelection();
    const h = l.depth === 0 ? void 0 : N1(l.node(-1).contentMatchAt(l.indexAfter(-1)));
    let f = u && h ? [
      {
        type: h,
        attrs: d
      }
    ] : void 0, p = cn(e.doc, e.mapping.map(l.pos), 1, f);
    if (!f && !p && cn(e.doc, e.mapping.map(l.pos), 1, h ? [{ type: h }] : void 0) && (p = !0, f = h ? [
      {
        type: h,
        attrs: d
      }
    ] : void 0), p && (e.split(e.mapping.map(l.pos), 1, f), h && !u && !l.parentOffset && l.parent.type !== h)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, h) && e.setNodeMarkup(e.mapping.map(l.before()), h);
    }
    n && fa(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return !0;
}, Y1 = (n) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  var s;
  const o = G(n, t.schema), { $from: l, $to: a } = t.selection, c = t.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a))
    return !1;
  const d = l.node(-1);
  if (d.type !== o)
    return !1;
  const u = i.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== o || l.index(-2) !== l.node(-2).childCount - 1)
      return !1;
    if (r) {
      let g = k.empty;
      const b = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let H = l.depth - b; H >= l.depth - 3; H -= 1)
        g = k.from(l.node(H).copy(g));
      const v = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, C = gr(u, l.node().type.name, l.node().attrs), T = ((s = o.contentMatch.defaultType) === null || s === void 0 ? void 0 : s.createAndFill(C)) || void 0;
      g = g.append(k.from(o.createAndFill(null, T) || void 0));
      const _ = l.before(l.depth - (b - 1));
      e.replace(_, l.after(-v), new w(g, 4 - b, 0));
      let A = -1;
      e.doc.nodesBetween(_, e.doc.content.size, (H, Z) => {
        if (A > -1)
          return !1;
        H.isTextblock && H.content.size === 0 && (A = Z + 1);
      }), A > -1 && e.setSelection(O.near(e.doc.resolve(A))), e.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? d.contentMatchAt(0).defaultType : null, f = gr(u, d.type.name, d.attrs), p = gr(u, l.node().type.name, l.node().attrs);
  e.delete(l.pos, a.pos);
  const m = h ? [
    { type: o, attrs: f },
    { type: h, attrs: p }
  ] : [{ type: o, attrs: f }];
  if (!cn(e.doc, l.pos, 2))
    return !1;
  if (r) {
    const { selection: g, storedMarks: b } = t, { splittableMarks: v } = i.extensionManager, C = b || g.$to.parentOffset && g.$from.marks();
    if (e.split(l.pos, 2, m).scrollIntoView(), !C || !r)
      return !0;
    const T = C.filter((_) => v.includes(_.type.name));
    e.ensureMarks(T);
  }
  return !0;
}, ks = (n, e) => {
  const t = Io((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Mt(n.doc, t.pos) && n.join(t.pos), !0;
}, xs = (n, e) => {
  const t = Io((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Mt(n.doc, r) && n.join(r), !0;
}, X1 = (n, e, t, r = {}) => ({ editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: d }) => {
  const { extensions: u, splittableMarks: h } = i.extensionManager, f = G(n, o.schema), p = G(e, o.schema), { selection: m, storedMarks: g } = o, { $from: b, $to: v } = m, C = b.blockRange(v), T = g || m.$to.parentOffset && m.$from.marks();
  if (!C)
    return !1;
  const _ = Io((A) => ha(A.type.name, u))(m);
  if (C.depth >= 1 && _ && C.depth - _.depth <= 1) {
    if (_.node.type === f)
      return c.liftListItem(p);
    if (ha(_.node.type.name, u) && f.validContent(_.node.content) && l)
      return a().command(() => (s.setNodeMarkup(_.pos, f), !0)).command(() => ks(s, f)).command(() => xs(s, f)).run();
  }
  return !t || !T || !l ? a().command(() => d().wrapInList(f, r) ? !0 : c.clearNodes()).wrapInList(f, r).command(() => ks(s, f)).command(() => xs(s, f)).run() : a().command(() => {
    const A = d().wrapInList(f, r), H = T.filter((Z) => h.includes(Z.type.name));
    return s.ensureMarks(H), A ? !0 : c.clearNodes();
  }).wrapInList(f, r).command(() => ks(s, f)).command(() => xs(s, f)).run();
}, Q1 = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: s = !1 } = t, o = Tt(n, r.schema);
  return eo(r, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: s }) : i.setMark(o, e);
}, eg = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const s = G(n, r.schema), o = G(e, r.schema);
  return Gn(r, s, t) ? i.setNode(o) : i.setNode(s, t);
}, tg = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = G(n, t.schema);
  return Gn(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, ng = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let s;
    if (i.spec.isInputRules && (s = i.getState(n))) {
      if (e) {
        const o = n.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          const a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, a));
        } else
          o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, rg = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: i } = t;
  return r || e && i.forEach((s) => {
    n.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, ig = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var s;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: l } = t, a = Tt(n, r.schema), { $from: c, empty: d, ranges: u } = l;
  if (!i)
    return !0;
  if (d && o) {
    let { from: h, to: f } = l;
    const p = (s = c.marks().find((g) => g.type === a)) === null || s === void 0 ? void 0 : s.attrs, m = Do(c, a, p);
    m && (h = m.from, f = m.to), t.removeMark(h, f, a);
  } else
    u.forEach((h) => {
      t.removeMark(h.$from.pos, h.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, sg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = Vi(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (s = G(n, r.schema)), l === "mark" && (o = Tt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    const c = a.$from.pos, d = a.$to.pos;
    r.doc.nodesBetween(c, d, (u, h) => {
      s && s === u.type && t.setNodeMarkup(h, void 0, {
        ...u.attrs,
        ...e
      }), o && u.marks.length && u.marks.forEach((f) => {
        if (o === f.type) {
          const p = Math.max(h, c), m = Math.min(h + u.nodeSize, d);
          t.addMark(p, m, o.create({
            ...f.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, og = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = G(n, t.schema);
  return vm(i, e)(t, r);
}, lg = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = G(n, t.schema);
  return km(i, e)(t, r);
};
var ag = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: jm,
  clearContent: Vm,
  clearNodes: Fm,
  command: Wm,
  createParagraphNear: Um,
  cut: Km,
  deleteCurrentNode: qm,
  deleteNode: Jm,
  deleteRange: Gm,
  deleteSelection: Zm,
  enter: Ym,
  exitCode: Xm,
  extendMarkRange: e1,
  first: t1,
  focus: n1,
  forEach: r1,
  insertContent: i1,
  insertContentAt: l1,
  joinUp: a1,
  joinDown: c1,
  joinBackward: d1,
  joinForward: u1,
  joinItemBackward: h1,
  joinItemForward: f1,
  joinTextblockBackward: p1,
  joinTextblockForward: m1,
  keyboardShortcut: b1,
  lift: y1,
  liftEmptyBlock: v1,
  liftListItem: k1,
  newlineInCode: x1,
  resetAttributes: w1,
  scrollIntoView: C1,
  selectAll: S1,
  selectNodeBackward: M1,
  selectNodeForward: E1,
  selectParentNode: T1,
  selectTextblockEnd: A1,
  selectTextblockStart: _1,
  setContent: O1,
  setMark: W1,
  setMeta: U1,
  setNode: K1,
  setNodeSelection: q1,
  setTextSelection: J1,
  sinkListItem: G1,
  splitBlock: Z1,
  splitListItem: Y1,
  toggleList: X1,
  toggleMark: Q1,
  toggleNode: eg,
  toggleWrap: tg,
  undoInputRule: ng,
  unsetAllMarks: rg,
  unsetMark: ig,
  updateAttributes: sg,
  wrapIn: og,
  wrapInList: lg
});
const cg = fe.create({
  name: "commands",
  addCommands() {
    return {
      ...ag
    };
  }
}), dg = fe.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new se({
        key: new Ee("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), ug = fe.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new se({
        key: new Ee("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), hg = fe.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      () => o.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: d, $anchor: u } = a, { pos: h, parent: f } = u, p = u.parent.isTextblock ? l.doc.resolve(h - 1) : u, m = p.parent.type.spec.isolating, g = u.pos - u.parentOffset, b = m && p.parent.childCount === 1 ? g === u.pos : L.atStart(c).from === h;
        return !d || !b || !f.type.isTextblock || f.textContent.length ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Ro() || Po() ? s : i;
  },
  addProseMirrorPlugins() {
    return [
      new se({
        key: new Ee("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (!(n.some((p) => p.docChanged) && !e.doc.eq(t.doc)))
            return;
          const { empty: i, from: s, to: o } = e.selection, l = L.atStart(e.doc).from, a = L.atEnd(e.doc).to;
          if (i || !(s === l && o === a) || !(t.doc.textBetween(0, t.doc.content.size, " ", " ").length === 0))
            return;
          const u = t.tr, h = Ii({
            state: t,
            transaction: u
          }), { commands: f } = new Bi({
            editor: this.editor,
            state: h
          });
          if (f.clearNodes(), !!u.steps.length)
            return u;
        }
      })
    ];
  }
}), fg = fe.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new se({
        key: new Ee("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
var pg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ClipboardTextSerializer: zm,
  Commands: cg,
  Editable: dg,
  FocusEvents: ug,
  Keymap: hg,
  Tabindex: fg
});
class $t {
  constructor(e, t, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get name() {
    return this.node.type.name;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can\u2019t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new $t(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new $t(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new $t(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, s = this.pos + r + (i ? 0 : 1), o = this.resolvedPos.doc.resolve(s);
      if (!i && o.depth <= this.depth)
        return;
      const l = new $t(o, this.editor, i, i ? t : null);
      i && (l.actualDepth = this.depth + 1), e.push(new $t(o, this.editor, i, i ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const s = i.node.attrs, o = Object.keys(t);
          for (let l = 0; l < o.length; l += 1) {
            const a = o[l];
            if (s[a] !== t[a])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let i = [];
    return this.isBlock || !this.children || this.children.length === 0 || this.children.forEach((s) => {
      if (s.node.type.name === e) {
        if (Object.keys(t).length > 0) {
          const o = s.node.attrs, l = Object.keys(t);
          for (let a = 0; a < l.length; a += 1) {
            const c = l[a];
            if (o[c] !== t[c])
              return;
          }
        }
        if (i.push(s), r)
          return;
      }
      i = i.concat(s.querySelectorAll(e));
    }), i;
  }
  setAttribute(e) {
    const t = this.editor.state.selection;
    this.editor.chain().setTextSelection(this.from).updateAttributes(this.node.type.name, e).setTextSelection(t.from).run();
  }
}
const mg = `.ProseMirror {
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

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 1px !important;
  height: 1px !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function gg(n, e, t) {
  const r = document.querySelector(`style[data-tiptap-style${t ? `-${t}` : ""}]`);
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute(`data-tiptap-style${t ? `-${t}` : ""}`, ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
class bg extends Em {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }));
    }, 0);
  }
  get storage() {
    return this.extensionStorage;
  }
  get commands() {
    return this.commandManager.commands;
  }
  chain() {
    return this.commandManager.chain();
  }
  can() {
    return this.commandManager.can();
  }
  injectCSS() {
    this.options.injectCSS && document && (this.css = gg(mg, this.options.injectNonce));
  }
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  get state() {
    return this.view.state;
  }
  registerPlugin(e, t) {
    const r = Nd(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
    this.view.updateState(i);
  }
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = typeof e == "string" ? `${e}$` : e.key, r = this.state.reconfigure({
      plugins: this.state.plugins.filter((i) => !i.key.startsWith(t))
    });
    this.view.updateState(r);
  }
  createExtensionManager() {
    const t = [...this.options.enableCoreExtensions ? Object.values(pg) : [], ...this.options.extensions].filter((r) => ["extension", "node", "mark"].includes(r == null ? void 0 : r.type));
    this.extensionManager = new sn(t, this);
  }
  createCommandManager() {
    this.commandManager = new Bi({
      editor: this
    });
  }
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  createView() {
    const e = Bd(this.options.content, this.schema, this.options.parseOptions), t = Pd(e, this.options.autofocus);
    this.view = new Up(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: rn.create({
        doc: e,
        selection: t || void 0
      })
    });
    const r = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(r), this.createNodeViews(), this.prependClass();
    const i = this.view.dom;
    i.editor = this;
  }
  createNodeViews() {
    this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((o) => {
        var l;
        return (l = this.capturedTransaction) === null || l === void 0 ? void 0 : l.step(o);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const i = e.getMeta("focus"), s = e.getMeta("blur");
    i && this.emit("focus", {
      editor: this,
      event: i.event,
      transaction: e
    }), s && this.emit("blur", {
      editor: this,
      event: s.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  getAttributes(e) {
    return Hd(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return j1(this.state, r, i);
  }
  getJSON() {
    return this.state.doc.toJSON();
  }
  getHTML() {
    return R1(this.state.doc.content, this.schema);
  }
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return P1(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...Dd(this.schema),
        ...r
      }
    });
  }
  get isEmpty() {
    return V1(this.state.doc);
  }
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  destroy() {
    this.emit("destroy"), this.view && this.view.destroy(), this.removeAllListeners();
  }
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
  $node(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelector(e, t)) || null;
  }
  $nodes(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelectorAll(e, t)) || null;
  }
  $pos(e) {
    const t = this.state.doc.resolve(e);
    return new $t(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
}
function Jt(n) {
  return new zi({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = N(n.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: s } = e, o = r[r.length - 1], l = r[0];
      if (o) {
        const a = l.search(/\S/), c = t.from + l.indexOf(o), d = c + o.length;
        if (Bo(t.from, t.to, e.doc).filter((f) => f.mark.type.excluded.find((m) => m === n.type && m !== f.mark.type)).filter((f) => f.to > c).length)
          return null;
        d < t.to && s.delete(d, t.to), c > t.from && s.delete(t.from + a, c);
        const h = t.from + a + o.length;
        s.addMark(t.from + a, h, n.type.create(i || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function yg(n) {
  return new zi({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = N(n.getAttributes, void 0, r) || {}, { tr: s } = e, o = t.from;
      let l = t.to;
      const a = n.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let d = o + c;
        d > l ? d = l : l = d + r[1].length;
        const u = r[0][r[0].length - 1];
        s.insertText(u, o + r[0].length - 1), s.replaceWith(d, l, a);
      } else
        r[0] && s.insert(o - 1, n.type.create(i)).delete(s.mapping.map(o), s.mapping.map(l));
      s.scrollIntoView();
    }
  });
}
function to(n) {
  return new zi({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), s = N(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, s);
    }
  });
}
function Zn(n) {
  return new zi({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const s = N(n.getAttributes, void 0, r) || {}, o = e.tr.delete(t.from, t.to), a = o.doc.resolve(t.from).blockRange(), c = a && xo(a, n.type, s);
      if (!c)
        return null;
      if (o.wrap(a, c), n.keepMarks && n.editor) {
        const { selection: u, storedMarks: h } = e, { splittableMarks: f } = n.editor.extensionManager, p = h || u.$to.parentOffset && u.$from.marks();
        if (p) {
          const m = p.filter((g) => f.includes(g.type.name));
          o.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const u = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(u, s).run();
      }
      const d = o.doc.resolve(t.from - 1).nodeBefore;
      d && d.type === n.type && Mt(o.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, d)) && o.join(t.from - 1);
    }
  });
}
class ye {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = N(S(this, "addOptions", {
      name: this.name
    }))), this.storage = N(S(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ye(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = ji(this.options, e), t.storage = N(S(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ye({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = N(S(t, "addOptions", {
      name: t.name
    })), t.storage = N(S(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const a = o.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
class re {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = N(S(this, "addOptions", {
      name: this.name
    }))), this.storage = N(S(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new re(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = ji(this.options, e), t.storage = N(S(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new re({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = N(S(t, "addOptions", {
      name: t.name
    })), t.storage = N(S(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Ct(n) {
  return new Dm({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const s = N(n.getAttributes, void 0, r, i);
      if (s === !1 || s === null)
        return null;
      const { tr: o } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const d = a.search(/\S/), u = t.from + a.indexOf(l), h = u + l.length;
        if (Bo(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((g) => g === n.type && g !== p.mark.type)).filter((p) => p.to > u).length)
          return null;
        h < t.to && o.delete(h, t.to), u > t.from && o.delete(t.from + d, u), c = t.from + d + l.length, o.addMark(t.from + d, c, n.type.create(s || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
const vg = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))$/, kg = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))/g, xg = ye.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-color") || n.style.backgroundColor,
        renderHTML: (n) => n.color ? {
          "data-color": n.color,
          style: `background-color: ${n.color}; color: inherit`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["mark", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setHighlight: (n) => ({ commands: e }) => e.setMark(this.name, n),
      toggleHighlight: (n) => ({ commands: e }) => e.toggleMark(this.name, n),
      unsetHighlight: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      Jt({
        find: vg,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ct({
        find: kg,
        type: this.type
      })
    ];
  }
}), wg = fe.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something \u2026",
      showOnlyWhenEditable: !0,
      considerAnyAsEmpty: !1,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new se({
        key: new Ee("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            var t;
            const r = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: i } = e, s = [];
            if (!r)
              return null;
            const { firstChild: o } = n.content, l = o && o.type.isLeaf, a = o && o.isAtom, c = this.options.considerAnyAsEmpty ? !0 : o && o.type.name === ((t = n.type.contentMatch.defaultType) === null || t === void 0 ? void 0 : t.name), d = n.content.childCount <= 1 && o && c && o.nodeSize <= 2 && (!l || !a);
            return n.descendants((u, h) => {
              const f = i >= h && i <= h + u.nodeSize, p = !u.isLeaf && !u.childCount;
              if ((f || !this.options.showOnlyCurrent) && p) {
                const m = [this.options.emptyNodeClass];
                d && m.push(this.options.emptyEditorClass);
                const g = ge.node(h, h + u.nodeSize, {
                  class: m.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: u,
                    pos: h,
                    hasAnchor: f
                  }) : this.options.placeholder
                });
                s.push(g);
              }
              return this.options.includeChildren;
            }), F.create(n, s);
          }
        }
      })
    ];
  }
}), Cg = ye.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["u", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
}), Sg = /^\s*>\s$/, Mg = re.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["blockquote", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      Zn({
        find: Sg,
        type: this.type
      })
    ];
  }
}), Eg = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/, Tg = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g, Ag = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/, _g = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g, Og = ye.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      Jt({
        find: Eg,
        type: this.type
      }),
      Jt({
        find: Ag,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ct({
        find: Tg,
        type: this.type
      }),
      Ct({
        find: _g,
        type: this.type
      })
    ];
  }
}), $g = re.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", j(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), pa = ye.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Fi(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), ma = /^\s*([-+*])\s$/, Ng = re.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes($g.name, this.editor.getAttributes(pa.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = Zn({
      find: ma,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Zn({
      find: ma,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(pa.name),
      editor: this.editor
    })), [
      n
    ];
  }
}), Lg = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/, Dg = /(?:^|\s)((?:`)((?:[^`]+))(?:`))/g, Rg = ye.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["code", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: n }) => n.setMark(this.name),
      toggleCode: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetCode: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      Jt({
        find: Lg,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ct({
        find: Dg,
        type: this.type
      })
    ];
  }
}), Pg = /^```([a-z]+)?[\s\n]$/, Ig = /^~~~([a-z]+)?[\s\n]$/, Bg = re.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options, s = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((o) => o.startsWith(t)).map((o) => o.replace(t, ""))[0];
          return s || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      j(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: i } = t;
        if (!i || r.parent.type !== this.type)
          return !1;
        const s = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith(`

`);
        return !s || !o ? !1 : n.chain().command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: i, empty: s } = t;
        if (!s || i.parent.type !== this.type || !(i.parentOffset === i.parent.nodeSize - 2))
          return !1;
        const l = i.after();
        return l === void 0 || r.nodeAt(l) ? !1 : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      to({
        find: Pg,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      to({
        find: Ig,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      new se({
        key: new Ee("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, s = i == null ? void 0 : i.mode;
            if (!t || !s)
              return !1;
            const { tr: o } = n.state;
            return o.replaceSelectionWith(this.type.create({ language: s })), o.setSelection(O.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.insertText(t.replace(/\r\n?/g, `
`)), o.setMeta("paste", !0), n.dispatch(o), !0;
          }
        }
      })
    ];
  }
}), Hg = re.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function zg(n = {}) {
  return new se({
    view(e) {
      return new jg(e, n);
    }
  });
}
class jg {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let s = (o) => {
        this[i](o);
      };
      return e.dom.addEventListener(i, s), { name: i, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r;
    if (t) {
      let l = e.nodeBefore, a = e.nodeAfter;
      if (l || a) {
        let c = this.editorView.nodeDOM(this.cursorPos - (l ? l.nodeSize : 0));
        if (c) {
          let d = c.getBoundingClientRect(), u = l ? d.bottom : d.top;
          l && a && (u = (u + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2), r = { left: d.left, right: d.right, top: u - this.width / 2, bottom: u + this.width / 2 };
        }
      }
    }
    if (!r) {
      let l = this.editorView.coordsAtPos(this.cursorPos);
      r = { left: l.left - this.width / 2, right: l.left + this.width / 2, top: l.top, bottom: l.bottom };
    }
    let i = this.editorView.dom.offsetParent;
    this.element || (this.element = i.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let s, o;
    if (!i || i == document.body && getComputedStyle(i).position == "static")
      s = -pageXOffset, o = -pageYOffset;
    else {
      let l = i.getBoundingClientRect();
      s = l.left - i.scrollLeft, o = l.top - i.scrollTop;
    }
    this.element.style.left = r.left - s + "px", this.element.style.top = r.top - o + "px", this.element.style.width = r.right - r.left + "px", this.element.style.height = r.bottom - r.top + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), i = r && r.type.spec.disableDropCursor, s = typeof i == "function" ? i(this.editorView, t, e) : i;
    if (t && !s) {
      let o = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = Ic(this.editorView.state.doc, o, this.editorView.dragging.slice);
        l != null && (o = l);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    (e.target == this.editorView.dom || !this.editorView.dom.contains(e.relatedTarget)) && this.setCursor(null);
  }
}
const Vg = fe.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      zg(this.options)
    ];
  }
});
class V extends L {
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return V.valid(r) ? new V(r) : L.near(r);
  }
  content() {
    return w.empty;
  }
  eq(e) {
    return e instanceof V && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new V(e.resolve(t.pos));
  }
  getBookmark() {
    return new Ho(this.anchor);
  }
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !Fg(e) || !Wg(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  static findGapCursorFrom(e, t, r = !1) {
    e:
      for (; ; ) {
        if (!r && V.valid(e))
          return e;
        let i = e.pos, s = null;
        for (let o = e.depth; ; o--) {
          let l = e.node(o);
          if (t > 0 ? e.indexAfter(o) < l.childCount : e.index(o) > 0) {
            s = l.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
            break;
          } else if (o == 0)
            return null;
          i += t;
          let a = e.doc.resolve(i);
          if (V.valid(a))
            return a;
        }
        for (; ; ) {
          let o = t > 0 ? s.firstChild : s.lastChild;
          if (!o) {
            if (s.isAtom && !s.isText && !E.isSelectable(s)) {
              e = e.doc.resolve(i + s.nodeSize * t), r = !1;
              continue e;
            }
            break;
          }
          s = o, i += t;
          let l = e.doc.resolve(i);
          if (V.valid(l))
            return l;
        }
        return null;
      }
  }
}
V.prototype.visible = !1;
V.findFrom = V.findGapCursorFrom;
L.jsonID("gapcursor", V);
class Ho {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Ho(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return V.valid(t) ? new V(t) : L.near(t);
  }
}
function Fg(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Wg(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Ug() {
  return new se({
    props: {
      decorations: Gg,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && V.valid(t) ? new V(t) : null;
      },
      handleClick: qg,
      handleKeyDown: Kg,
      handleDOMEvents: { beforeinput: Jg }
    }
  });
}
const Kg = Sd({
  ArrowLeft: lr("horiz", -1),
  ArrowRight: lr("horiz", 1),
  ArrowUp: lr("vert", -1),
  ArrowDown: lr("vert", 1)
});
function lr(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, s) {
    let o = r.selection, l = e > 0 ? o.$to : o.$from, a = o.empty;
    if (o instanceof O) {
      if (!s.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = V.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new V(c))), !0) : !1;
  };
}
function qg(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!V.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && E.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new V(r))), !0);
}
function Jg(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof V))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = k.empty;
  for (let o = r.length - 1; o >= 0; o--)
    i = k.from(r[o].createAndFill(null, i));
  let s = n.state.tr.replace(t.pos, t.pos, new w(i, 0, 0));
  return s.setSelection(O.near(s.doc.resolve(t.pos + 1))), n.dispatch(s), !1;
}
function Gg(n) {
  if (!(n.selection instanceof V))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", F.create(n.doc, [ge.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const Zg = fe.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      Ug()
    ];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = N(S(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), Yg = re.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", j(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: i, storedMarks: s } = t;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: l } = r.extensionManager, a = s || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: d }) => {
            if (d && a && o) {
              const u = a.filter((h) => l.includes(h.type.name));
              c.ensureMarks(u);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), Xg = re.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, j(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => to({
      find: new RegExp(`^(#{1,${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
});
var Vr = 200, J = function() {
};
J.prototype.append = function(e) {
  return e.length ? (e = J.from(e), !this.length && e || e.length < Vr && this.leafAppend(e) || this.length < Vr && e.leafPrepend(this) || this.appendInner(e)) : this;
};
J.prototype.prepend = function(e) {
  return e.length ? J.from(e).append(this) : this;
};
J.prototype.appendInner = function(e) {
  return new Qg(this, e);
};
J.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? J.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
J.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
J.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
J.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, t, r), i;
};
J.from = function(e) {
  return e instanceof J ? e : e && e.length ? new zd(e) : J.empty;
};
var zd = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, s) {
    return i == 0 && s == this.length ? this : new e(this.values.slice(i, s));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, s, o, l) {
    for (var a = s; a < o; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, s, o, l) {
    for (var a = s - 1; a >= o; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= Vr)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= Vr)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(J);
J.empty = new zd([]);
var Qg = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(s, l), o) === !1 || s > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, s) - l, o + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(s, l) - l, o + l) === !1 || s < l && this.left.forEachInvertedInner(r, Math.min(i, l), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var s = this.left.length;
    return i <= s ? this.left.slice(r, i) : r >= s ? this.right.slice(r - s, i - s) : this.left.slice(r, s).append(this.right.slice(0, i - s));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(J);
const e0 = 500;
class Ne {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    t && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, l, a, c = [], d = [];
    return this.items.forEach((u, h) => {
      if (!u.step) {
        i || (i = this.remapping(r, h + 1), s = i.maps.length), s--, d.push(u);
        return;
      }
      if (i) {
        d.push(new Pe(u.map));
        let f = u.step.map(i.slice(s)), p;
        f && o.maybeStep(f).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new Pe(p, void 0, void 0, c.length + d.length))), s--, p && i.appendMap(p, s);
      } else
        o.maybeStep(u.step);
      if (u.selection)
        return l = i ? u.selection.map(i.slice(s)) : u.selection, a = new Ne(this.items.slice(0, r).append(d.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  addTransform(e, t, r, i) {
    let s = [], o = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let d = 0; d < e.steps.length; d++) {
      let u = e.steps[d].invert(e.docs[d]), h = new Pe(e.mapping.maps[d], u, t), f;
      (f = a && a.merge(h)) && (h = f, d ? s.pop() : l = l.slice(0, l.length - 1)), s.push(h), t && (o++, t = void 0), i || (a = h);
    }
    let c = o - r.depth;
    return c > n0 && (l = t0(l, c), o -= c), new Ne(l.append(s), o);
  }
  remapping(e, t) {
    let r = new an();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new Ne(this.items.append(e.map((t) => new Pe(t))), this.eventCount);
  }
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), s = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((h) => {
      h.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((h) => {
      let f = s.getMirror(--a);
      if (f == null)
        return;
      o = Math.min(o, f);
      let p = s.maps[f];
      if (h.step) {
        let m = e.steps[f].invert(e.docs[f]), g = h.selection && h.selection.map(s.slice(a + 1, f));
        g && l++, r.push(new Pe(p, m, g));
      } else
        r.push(new Pe(p));
    }, i);
    let c = [];
    for (let h = t; h < o; h++)
      c.push(new Pe(s.maps[h]));
    let d = this.items.slice(0, i).append(c).append(r), u = new Ne(d, l);
    return u.emptyItemCount() > e0 && (u = u.compress(this.items.length - r.length)), u;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], s = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let a = o.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let d = o.selection && o.selection.map(t.slice(r));
          d && s++;
          let u = new Pe(c.invert(), a, d), h, f = i.length - 1;
          (h = i.length && i[f].merge(u)) ? i[f] = h : i.push(u);
        }
      } else
        o.map && r--;
    }, this.items.length, 0), new Ne(J.from(i.reverse()), s);
  }
}
Ne.empty = new Ne(J.empty, 0);
function t0(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class Pe {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new Pe(t.getMap().invert(), t, this.selection);
    }
  }
}
class lt {
  constructor(e, t, r, i, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const n0 = 20;
function r0(n, e, t, r) {
  let i = t.getMeta(jt), s;
  if (i)
    return i.historyState;
  t.getMeta(o0) && (n = new lt(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(jt))
    return o.getMeta(jt).redo ? new lt(n.done.addTransform(t, void 0, r, br(e)), n.undone, ga(t.mapping.maps[t.steps.length - 1]), n.prevTime, n.prevComposition) : new lt(n.done, n.undone.addTransform(t, void 0, r, br(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !o && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !i0(t, n.prevRanges)), c = o ? ws(n.prevRanges, t.mapping) : ga(t.mapping.maps[t.steps.length - 1]);
    return new lt(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, br(e)), Ne.empty, c, t.time, l == null ? n.prevComposition : l);
  } else
    return (s = t.getMeta("rebased")) ? new lt(n.done.rebased(t, s), n.undone.rebased(t, s), ws(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new lt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), ws(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function i0(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (t = !0);
  }), t;
}
function ga(n) {
  let e = [];
  return n.forEach((t, r, i, s) => e.push(i, s)), e;
}
function ws(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    i <= s && t.push(i, s);
  }
  return t;
}
function s0(n, e, t) {
  let r = br(e), i = jt.get(e).spec.config, s = (t ? n.undone : n.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), l = (t ? n.done : n.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), a = new lt(t ? l : s.remaining, t ? s.remaining : l, null, 0, -1);
  return s.transform.setSelection(o).setMeta(jt, { redo: t, historyState: a });
}
let Cs = !1, ba = null;
function br(n) {
  let e = n.plugins;
  if (ba != e) {
    Cs = !1, ba = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        Cs = !0;
        break;
      }
  }
  return Cs;
}
const jt = new Ee("history"), o0 = new Ee("closeHistory");
function l0(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new se({
    key: jt,
    state: {
      init() {
        return new lt(Ne.empty, Ne.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return r0(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? Vd : r == "historyRedo" ? Fd : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function jd(n, e) {
  return (t, r) => {
    let i = jt.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = s0(i, t, n);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const Vd = jd(!1, !0), Fd = jd(!0, !0), a0 = fe.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => Vd(n, e),
      redo: () => ({ state: n, dispatch: e }) => Fd(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      l0(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Mod-\u044F": () => this.editor.commands.undo(),
      "Shift-Mod-\u044F": () => this.editor.commands.redo()
    };
  }
}), c0 = re.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", j(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        const { $to: t } = e.selection, r = n();
        return t.parentOffset === 0 ? r.insertContentAt(Math.max(t.pos - 2, 0), { type: this.name }) : r.insertContent({ type: this.name }), r.command(({ tr: i, dispatch: s }) => {
          var o;
          if (s) {
            const { $to: l } = i.selection, a = l.end();
            if (l.nodeAfter)
              l.nodeAfter.isTextblock ? i.setSelection(O.create(i.doc, l.pos + 1)) : l.nodeAfter.isBlock ? i.setSelection(E.create(i.doc, l.pos)) : i.setSelection(O.create(i.doc, l.pos));
            else {
              const c = (o = l.parent.type.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.create();
              c && (i.insert(a, c), i.setSelection(O.create(i.doc, a + 1)));
            }
            i.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      yg({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), d0 = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/, u0 = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g, h0 = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/, f0 = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g, p0 = ye.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      Jt({
        find: d0,
        type: this.type
      }),
      Jt({
        find: h0,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ct({
        find: u0,
        type: this.type
      }),
      Ct({
        find: f0,
        type: this.type
      })
    ];
  }
}), m0 = re.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", j(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), g0 = re.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", j(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), ya = ye.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Fi(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), va = /^(\d+)\.\s$/, b0 = re.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", j(this.options.HTMLAttributes, t), 0] : ["ol", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(g0.name, this.editor.getAttributes(ya.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = Zn({
      find: va,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Zn({
      find: va,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(ya.name) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), y0 = re.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), v0 = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/, k0 = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))/g, x0 = ye.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    const n = {};
    return Po() ? n["Mod-Shift-s"] = () => this.editor.commands.toggleStrike() : n["Ctrl-Shift-s"] = () => this.editor.commands.toggleStrike(), n;
  },
  addInputRules() {
    return [
      Jt({
        find: v0,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ct({
        find: k0,
        type: this.type
      })
    ];
  }
}), w0 = re.create({
  name: "text",
  group: "inline"
}), C0 = fe.create({
  name: "starterKit",
  addExtensions() {
    var n, e, t, r, i, s, o, l, a, c, d, u, h, f, p, m, g, b;
    const v = [];
    return this.options.blockquote !== !1 && v.push(Mg.configure((n = this.options) === null || n === void 0 ? void 0 : n.blockquote)), this.options.bold !== !1 && v.push(Og.configure((e = this.options) === null || e === void 0 ? void 0 : e.bold)), this.options.bulletList !== !1 && v.push(Ng.configure((t = this.options) === null || t === void 0 ? void 0 : t.bulletList)), this.options.code !== !1 && v.push(Rg.configure((r = this.options) === null || r === void 0 ? void 0 : r.code)), this.options.codeBlock !== !1 && v.push(Bg.configure((i = this.options) === null || i === void 0 ? void 0 : i.codeBlock)), this.options.document !== !1 && v.push(Hg.configure((s = this.options) === null || s === void 0 ? void 0 : s.document)), this.options.dropcursor !== !1 && v.push(Vg.configure((o = this.options) === null || o === void 0 ? void 0 : o.dropcursor)), this.options.gapcursor !== !1 && v.push(Zg.configure((l = this.options) === null || l === void 0 ? void 0 : l.gapcursor)), this.options.hardBreak !== !1 && v.push(Yg.configure((a = this.options) === null || a === void 0 ? void 0 : a.hardBreak)), this.options.heading !== !1 && v.push(Xg.configure((c = this.options) === null || c === void 0 ? void 0 : c.heading)), this.options.history !== !1 && v.push(a0.configure((d = this.options) === null || d === void 0 ? void 0 : d.history)), this.options.horizontalRule !== !1 && v.push(c0.configure((u = this.options) === null || u === void 0 ? void 0 : u.horizontalRule)), this.options.italic !== !1 && v.push(p0.configure((h = this.options) === null || h === void 0 ? void 0 : h.italic)), this.options.listItem !== !1 && v.push(m0.configure((f = this.options) === null || f === void 0 ? void 0 : f.listItem)), this.options.orderedList !== !1 && v.push(b0.configure((p = this.options) === null || p === void 0 ? void 0 : p.orderedList)), this.options.paragraph !== !1 && v.push(y0.configure((m = this.options) === null || m === void 0 ? void 0 : m.paragraph)), this.options.strike !== !1 && v.push(x0.configure((g = this.options) === null || g === void 0 ? void 0 : g.strike)), this.options.text !== !1 && v.push(w0.configure((b = this.options) === null || b === void 0 ? void 0 : b.text)), v;
  }
}), S0 = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5m\xF6gensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", M0 = "\u03B5\u03BB1\u03C52\u0431\u04331\u0435\u043B3\u0434\u0435\u0442\u04384\u0435\u044E2\u043A\u0430\u0442\u043E\u043B\u0438\u043A6\u043E\u043C3\u043C\u043A\u04342\u043E\u043D1\u0441\u043A\u0432\u04306\u043E\u043D\u043B\u0430\u0439\u043D5\u0440\u04333\u0440\u0443\u04412\u04442\u0441\u0430\u0439\u04423\u0440\u04313\u0443\u043A\u04403\u049B\u0430\u04373\u0570\u0561\u05753\u05D9\u05E9\u05E8\u05D0\u05DC5\u05E7\u05D5\u05DD3\u0627\u0628\u0648\u0638\u0628\u064A5\u0631\u0627\u0645\u0643\u06485\u0644\u0627\u0631\u062F\u06464\u0628\u062D\u0631\u064A\u06465\u062C\u0632\u0627\u0626\u06315\u0633\u0639\u0648\u062F\u064A\u06296\u0639\u0644\u064A\u0627\u06465\u0645\u063A\u0631\u06285\u0645\u0627\u0631\u0627\u062A5\u06CC\u0631\u0627\u06465\u0628\u0627\u0631\u062A2\u0632\u0627\u06314\u064A\u062A\u06433\u06BE\u0627\u0631\u062A5\u062A\u0648\u0646\u06334\u0633\u0648\u062F\u0627\u06463\u0631\u064A\u06295\u0634\u0628\u0643\u06294\u0639\u0631\u0627\u06422\u06282\u0645\u0627\u06464\u0641\u0644\u0633\u0637\u064A\u06466\u0642\u0637\u06313\u0643\u0627\u062B\u0648\u0644\u064A\u06436\u0648\u06453\u0645\u0635\u06312\u0644\u064A\u0633\u064A\u06275\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u06277\u0642\u06394\u0647\u0645\u0631\u0627\u06475\u067E\u0627\u06A9\u0633\u062A\u0627\u06467\u0680\u0627\u0631\u062A4\u0915\u0949\u092E3\u0928\u0947\u091F3\u092D\u093E\u0930\u09240\u092E\u094D3\u094B\u09245\u0938\u0902\u0917\u0920\u09285\u09AC\u09BE\u0982\u09B2\u09BE5\u09AD\u09BE\u09B0\u09A42\u09F0\u09A44\u0A2D\u0A3E\u0A30\u0A244\u0AAD\u0ABE\u0AB0\u0AA44\u0B2D\u0B3E\u0B30\u0B244\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE6\u0BB2\u0B99\u0BCD\u0B95\u0BC86\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD11\u0C2D\u0C3E\u0C30\u0C24\u0C4D5\u0CAD\u0CBE\u0CB0\u0CA44\u0D2D\u0D3E\u0D30\u0D24\u0D025\u0DBD\u0D82\u0D9A\u0DCF4\u0E04\u0E2D\u0E213\u0E44\u0E17\u0E223\u0EA5\u0EB2\u0EA73\u10D2\u10D42\u307F\u3093\u306A3\u30A2\u30DE\u30BE\u30F34\u30AF\u30E9\u30A6\u30C94\u30B0\u30FC\u30B0\u30EB4\u30B3\u30E02\u30B9\u30C8\u30A23\u30BB\u30FC\u30EB3\u30D5\u30A1\u30C3\u30B7\u30E7\u30F36\u30DD\u30A4\u30F3\u30C84\u4E16\u754C2\u4E2D\u4FE11\u56FD1\u570B1\u6587\u7F513\u4E9A\u9A6C\u900A3\u4F01\u4E1A2\u4F5B\u5C712\u4FE1\u606F2\u5065\u5EB72\u516B\u53662\u516C\u53F81\u76CA2\u53F0\u6E7E1\u70632\u5546\u57CE1\u5E971\u68072\u5609\u91CC0\u5927\u9152\u5E975\u5728\u7EBF2\u5927\u62FF2\u5929\u4E3B\u65593\u5A31\u4E502\u5BB6\u96FB2\u5E7F\u4E1C2\u5FAE\u535A2\u6148\u55842\u6211\u7231\u4F603\u624B\u673A2\u62DB\u80582\u653F\u52A11\u5E9C2\u65B0\u52A0\u57612\u95FB2\u65F6\u5C1A2\u66F8\u7C4D2\u673A\u67842\u6DE1\u9A6C\u95213\u6E38\u620F2\u6FB3\u95802\u70B9\u770B2\u79FB\u52A82\u7EC4\u7EC7\u673A\u67844\u7F51\u57401\u5E971\u7AD91\u7EDC2\u8054\u901A2\u8C37\u6B4C2\u8D2D\u72692\u901A\u8CA92\u96C6\u56E22\u96FB\u8A0A\u76C8\u79D14\u98DE\u5229\u6D663\u98DF\u54C12\u9910\u53852\u9999\u683C\u91CC\u62C93\u6E2F2\uB2F7\uB1371\uCEF42\uC0BC\uC1312\uD55C\uAD6D2", xn = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, no = "numeric", ro = "ascii", io = "alpha", yr = "asciinumeric", ar = "alphanumeric", so = "domain", Wd = "emoji", E0 = "scheme", T0 = "slashscheme", ka = "whitespace";
function A0(n, e) {
  return n in e || (e[n] = []), e[n];
}
function Pt(n, e, t) {
  e[no] && (e[yr] = !0, e[ar] = !0), e[ro] && (e[yr] = !0, e[io] = !0), e[yr] && (e[ar] = !0), e[io] && (e[ar] = !0), e[ar] && (e[so] = !0), e[Wd] && (e[so] = !0);
  for (const r in e) {
    const i = A0(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function _0(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function ue(n) {
  n === void 0 && (n = null), this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
ue.groups = {};
ue.prototype = {
  accepts() {
    return !!this.t;
  },
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], s = e.jr[r][1];
      if (s && i.test(n))
        return s;
    }
    return e.jd;
  },
  has(n, e) {
    return e === void 0 && (e = !1), e ? n in this.j : !!this.go(n);
  },
  ta(n, e, t, r) {
    for (let i = 0; i < n.length; i++)
      this.tt(n[i], e, t, r);
  },
  tr(n, e, t, r) {
    r = r || ue.groups;
    let i;
    return e && e.j ? i = e : (i = new ue(e), t && r && Pt(e, t, r)), this.jr.push([n, i]), i;
  },
  ts(n, e, t, r) {
    let i = this;
    const s = n.length;
    if (!s)
      return i;
    for (let o = 0; o < s - 1; o++)
      i = i.tt(n[o]);
    return i.tt(n[s - 1], e, t, r);
  },
  tt(n, e, t, r) {
    r = r || ue.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const s = e;
    let o, l = i.go(n);
    if (l ? (o = new ue(), xn(o.j, l.j), o.jr.push.apply(o.jr, l.jr), o.jd = l.jd, o.t = l.t) : o = new ue(), s) {
      if (r)
        if (o.t && typeof o.t == "string") {
          const a = xn(_0(o.t, r), t);
          Pt(s, a, r);
        } else
          t && Pt(s, t, r);
      o.t = s;
    }
    return i.j[n] = o, o;
  }
};
const $ = (n, e, t, r, i) => n.ta(e, t, r, i), xe = (n, e, t, r, i) => n.tr(e, t, r, i), xa = (n, e, t, r, i) => n.ts(e, t, r, i), x = (n, e, t, r, i) => n.tt(e, t, r, i), Xe = "WORD", oo = "UWORD", Yn = "LOCALHOST", lo = "TLD", ao = "UTLD", vr = "SCHEME", nn = "SLASH_SCHEME", zo = "NUM", Ud = "WS", jo = "NL", Rn = "OPENBRACE", Pn = "CLOSEBRACE", Fr = "OPENBRACKET", Wr = "CLOSEBRACKET", Ur = "OPENPAREN", Kr = "CLOSEPAREN", qr = "OPENANGLEBRACKET", Jr = "CLOSEANGLEBRACKET", Gr = "FULLWIDTHLEFTPAREN", Zr = "FULLWIDTHRIGHTPAREN", Yr = "LEFTCORNERBRACKET", Xr = "RIGHTCORNERBRACKET", Qr = "LEFTWHITECORNERBRACKET", ei = "RIGHTWHITECORNERBRACKET", ti = "FULLWIDTHLESSTHAN", ni = "FULLWIDTHGREATERTHAN", ri = "AMPERSAND", ii = "APOSTROPHE", si = "ASTERISK", at = "AT", oi = "BACKSLASH", li = "BACKTICK", ai = "CARET", ut = "COLON", Vo = "COMMA", ci = "DOLLAR", Ie = "DOT", di = "EQUALS", Fo = "EXCLAMATION", Be = "HYPHEN", ui = "PERCENT", hi = "PIPE", fi = "PLUS", pi = "POUND", mi = "QUERY", Wo = "QUOTE", Uo = "SEMI", He = "SLASH", In = "TILDE", gi = "UNDERSCORE", Kd = "EMOJI", bi = "SYM";
var qd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: Xe,
  UWORD: oo,
  LOCALHOST: Yn,
  TLD: lo,
  UTLD: ao,
  SCHEME: vr,
  SLASH_SCHEME: nn,
  NUM: zo,
  WS: Ud,
  NL: jo,
  OPENBRACE: Rn,
  CLOSEBRACE: Pn,
  OPENBRACKET: Fr,
  CLOSEBRACKET: Wr,
  OPENPAREN: Ur,
  CLOSEPAREN: Kr,
  OPENANGLEBRACKET: qr,
  CLOSEANGLEBRACKET: Jr,
  FULLWIDTHLEFTPAREN: Gr,
  FULLWIDTHRIGHTPAREN: Zr,
  LEFTCORNERBRACKET: Yr,
  RIGHTCORNERBRACKET: Xr,
  LEFTWHITECORNERBRACKET: Qr,
  RIGHTWHITECORNERBRACKET: ei,
  FULLWIDTHLESSTHAN: ti,
  FULLWIDTHGREATERTHAN: ni,
  AMPERSAND: ri,
  APOSTROPHE: ii,
  ASTERISK: si,
  AT: at,
  BACKSLASH: oi,
  BACKTICK: li,
  CARET: ai,
  COLON: ut,
  COMMA: Vo,
  DOLLAR: ci,
  DOT: Ie,
  EQUALS: di,
  EXCLAMATION: Fo,
  HYPHEN: Be,
  PERCENT: ui,
  PIPE: hi,
  PLUS: fi,
  POUND: pi,
  QUERY: mi,
  QUOTE: Wo,
  SEMI: Uo,
  SLASH: He,
  TILDE: In,
  UNDERSCORE: gi,
  EMOJI: Kd,
  SYM: bi
});
const Xt = /[a-z]/, Ss = /\p{L}/u, Ms = /\p{Emoji}/u, Es = /\d/, wa = /\s/, Ca = `
`, O0 = "\uFE0F", $0 = "\u200D";
let cr = null, dr = null;
function N0(n) {
  n === void 0 && (n = []);
  const e = {};
  ue.groups = e;
  const t = new ue();
  cr == null && (cr = Sa(S0)), dr == null && (dr = Sa(M0)), x(t, "'", ii), x(t, "{", Rn), x(t, "}", Pn), x(t, "[", Fr), x(t, "]", Wr), x(t, "(", Ur), x(t, ")", Kr), x(t, "<", qr), x(t, ">", Jr), x(t, "\uFF08", Gr), x(t, "\uFF09", Zr), x(t, "\u300C", Yr), x(t, "\u300D", Xr), x(t, "\u300E", Qr), x(t, "\u300F", ei), x(t, "\uFF1C", ti), x(t, "\uFF1E", ni), x(t, "&", ri), x(t, "*", si), x(t, "@", at), x(t, "`", li), x(t, "^", ai), x(t, ":", ut), x(t, ",", Vo), x(t, "$", ci), x(t, ".", Ie), x(t, "=", di), x(t, "!", Fo), x(t, "-", Be), x(t, "%", ui), x(t, "|", hi), x(t, "+", fi), x(t, "#", pi), x(t, "?", mi), x(t, '"', Wo), x(t, "/", He), x(t, ";", Uo), x(t, "~", In), x(t, "_", gi), x(t, "\\", oi);
  const r = xe(t, Es, zo, {
    [no]: !0
  });
  xe(r, Es, r);
  const i = xe(t, Xt, Xe, {
    [ro]: !0
  });
  xe(i, Xt, i);
  const s = xe(t, Ss, oo, {
    [io]: !0
  });
  xe(s, Xt), xe(s, Ss, s);
  const o = xe(t, wa, Ud, {
    [ka]: !0
  });
  x(t, Ca, jo, {
    [ka]: !0
  }), x(o, Ca), xe(o, wa, o);
  const l = xe(t, Ms, Kd, {
    [Wd]: !0
  });
  xe(l, Ms, l), x(l, O0, l);
  const a = x(l, $0);
  xe(a, Ms, l);
  const c = [[Xt, i]], d = [[Xt, null], [Ss, s]];
  for (let u = 0; u < cr.length; u++)
    it(t, cr[u], lo, Xe, c);
  for (let u = 0; u < dr.length; u++)
    it(t, dr[u], ao, oo, d);
  Pt(lo, {
    tld: !0,
    ascii: !0
  }, e), Pt(ao, {
    utld: !0,
    alpha: !0
  }, e), it(t, "file", vr, Xe, c), it(t, "mailto", vr, Xe, c), it(t, "http", nn, Xe, c), it(t, "https", nn, Xe, c), it(t, "ftp", nn, Xe, c), it(t, "ftps", nn, Xe, c), Pt(vr, {
    scheme: !0,
    ascii: !0
  }, e), Pt(nn, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((u, h) => u[0] > h[0] ? 1 : -1);
  for (let u = 0; u < n.length; u++) {
    const h = n[u][0], p = n[u][1] ? {
      [E0]: !0
    } : {
      [T0]: !0
    };
    h.indexOf("-") >= 0 ? p[so] = !0 : Xt.test(h) ? Es.test(h) ? p[yr] = !0 : p[ro] = !0 : p[no] = !0, xa(t, h, h, p);
  }
  return xa(t, "localhost", Yn, {
    ascii: !0
  }), t.jd = new ue(bi), {
    start: t,
    tokens: xn({
      groups: e
    }, qd)
  };
}
function L0(n, e) {
  const t = D0(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
  let s = 0, o = 0;
  for (; o < r; ) {
    let l = n, a = null, c = 0, d = null, u = -1, h = -1;
    for (; o < r && (a = l.go(t[o])); )
      l = a, l.accepts() ? (u = 0, h = 0, d = l) : u >= 0 && (u += t[o].length, h++), c += t[o].length, s += t[o].length, o++;
    s -= u, o -= h, c -= u, i.push({
      t: d.t,
      v: e.slice(s - c, s),
      s: s - c,
      e: s
    });
  }
  return i;
}
function D0(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), s, o = i < 55296 || i > 56319 || r + 1 === t || (s = n.charCodeAt(r + 1)) < 56320 || s > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(o), r += o.length;
  }
  return e;
}
function it(n, e, t, r, i) {
  let s;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    n.j[a] ? s = n.j[a] : (s = new ue(r), s.jr = i.slice(), n.j[a] = s), n = s;
  }
  return s = new ue(t), s.jr = i.slice(), n.j[e[o - 1]] = s, s;
}
function Sa(n) {
  const e = [], t = [];
  let r = 0, i = "0123456789";
  for (; r < n.length; ) {
    let s = 0;
    for (; i.indexOf(n[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(t.join(""));
      for (let o = parseInt(n.substring(r, r + s), 10); o > 0; o--)
        t.pop();
      r += s;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const Xn = {
  defaultProtocol: "http",
  events: null,
  format: Ma,
  formatHref: Ma,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Ko(n, e) {
  e === void 0 && (e = null);
  let t = xn({}, Xn);
  n && (t = xn(t, n instanceof Ko ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let s = 0; s < r.length; s++)
    i.push(r[s].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
Ko.prototype = {
  o: Xn,
  ignoreTags: [],
  defaultRender(n) {
    return n;
  },
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  get(n, e, t) {
    const r = e != null;
    let i = this.o[n];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : Xn[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
  },
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function Ma(n) {
  return n;
}
function Jd(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
Jd.prototype = {
  isLink: !1,
  toString() {
    return this.v;
  },
  toHref(n) {
    return this.toString();
  },
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "\u2026" : r;
  },
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  startIndex() {
    return this.tk[0].s;
  },
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  toObject(n) {
    return n === void 0 && (n = Xn.defaultProtocol), {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), i = n.get("tagName", t, e), s = this.toFormattedString(n), o = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), d = n.getObj("attributes", t, e), u = n.getObj("events", t, e);
    return o.href = r, l && (o.class = l), a && (o.target = a), c && (o.rel = c), d && xn(o, d), {
      tagName: i,
      attributes: o,
      content: s,
      eventListeners: u
    };
  }
};
function Wi(n, e) {
  class t extends Jd {
    constructor(i, s) {
      super(i, s), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const Ea = Wi("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Ta = Wi("text"), R0 = Wi("nl"), ur = Wi("url", {
  isLink: !0,
  toHref(n) {
    return n === void 0 && (n = Xn.defaultProtocol), this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== Yn && n[1].t === ut;
  }
}), we = (n) => new ue(n);
function P0(n) {
  let {
    groups: e
  } = n;
  const t = e.domain.concat([ri, si, at, oi, li, ai, ci, di, Be, zo, ui, hi, fi, pi, He, bi, In, gi]), r = [ii, ut, Vo, Ie, Fo, mi, Wo, Uo, qr, Jr, Rn, Pn, Wr, Fr, Ur, Kr, Gr, Zr, Yr, Xr, Qr, ei, ti, ni], i = [ri, ii, si, oi, li, ai, ci, di, Be, Rn, Pn, ui, hi, fi, pi, mi, He, bi, In, gi], s = we(), o = x(s, In);
  $(o, i, o), $(o, e.domain, o);
  const l = we(), a = we(), c = we();
  $(s, e.domain, l), $(s, e.scheme, a), $(s, e.slashscheme, c), $(l, i, o), $(l, e.domain, l);
  const d = x(l, at);
  x(o, at, d), x(a, at, d), x(c, at, d);
  const u = x(o, Ie);
  $(u, i, o), $(u, e.domain, o);
  const h = we();
  $(d, e.domain, h), $(h, e.domain, h);
  const f = x(h, Ie);
  $(f, e.domain, h);
  const p = we(Ea);
  $(f, e.tld, p), $(f, e.utld, p), x(d, Yn, p);
  const m = x(h, Be);
  $(m, e.domain, h), $(p, e.domain, h), x(p, Ie, f), x(p, Be, m);
  const g = x(p, ut);
  $(g, e.numeric, Ea);
  const b = x(l, Be), v = x(l, Ie);
  $(b, e.domain, l), $(v, i, o), $(v, e.domain, l);
  const C = we(ur);
  $(v, e.tld, C), $(v, e.utld, C), $(C, e.domain, l), $(C, i, o), x(C, Ie, v), x(C, Be, b), x(C, at, d);
  const T = x(C, ut), _ = we(ur);
  $(T, e.numeric, _);
  const A = we(ur), H = we();
  $(A, t, A), $(A, r, H), $(H, t, A), $(H, r, H), x(C, He, A), x(_, He, A);
  const Z = x(a, ut), R = x(c, ut), pe = x(R, He), Ae = x(pe, He);
  $(a, e.domain, l), x(a, Ie, v), x(a, Be, b), $(c, e.domain, l), x(c, Ie, v), x(c, Be, b), $(Z, e.domain, A), x(Z, He, A), $(Ae, e.domain, A), $(Ae, t, A), x(Ae, He, A);
  const ve = [
    [Rn, Pn],
    [Fr, Wr],
    [Ur, Kr],
    [qr, Jr],
    [Gr, Zr],
    [Yr, Xr],
    [Qr, ei],
    [ti, ni]
  ];
  for (let Gt = 0; Gt < ve.length; Gt++) {
    const [rt, Re] = ve[Gt], _e = x(A, rt);
    x(H, rt, _e), x(_e, Re, A);
    const ke = we(ur);
    $(_e, t, ke);
    const At = we();
    $(_e, r), $(ke, t, ke), $(ke, r, At), $(At, t, ke), $(At, r, At), x(ke, Re, A), x(At, Re, A);
  }
  return x(s, Yn, C), x(s, jo, R0), {
    start: s,
    tokens: qd
  };
}
function I0(n, e, t) {
  let r = t.length, i = 0, s = [], o = [];
  for (; i < r; ) {
    let l = n, a = null, c = null, d = 0, u = null, h = -1;
    for (; i < r && !(a = l.go(t[i].t)); )
      o.push(t[i++]);
    for (; i < r && (c = a || l.go(t[i].t)); )
      a = null, l = c, l.accepts() ? (h = 0, u = l) : h >= 0 && h++, i++, d++;
    if (h < 0)
      i -= d, i < r && (o.push(t[i]), i++);
    else {
      o.length > 0 && (s.push(Ts(Ta, e, o)), o = []), i -= h, d -= h;
      const f = u.t, p = t.slice(i - d, i);
      s.push(Ts(f, e, p));
    }
  }
  return o.length > 0 && s.push(Ts(Ta, e, o)), s;
}
function Ts(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, s = e.slice(r, i);
  return new n(s, t);
}
const B0 = typeof console < "u" && console && console.warn || (() => {
}), H0 = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", z = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function z0() {
  ue.groups = {}, z.scanner = null, z.parser = null, z.tokenQueue = [], z.pluginQueue = [], z.customSchemes = [], z.initialized = !1;
}
function Aa(n, e) {
  if (e === void 0 && (e = !1), z.initialized && B0(`linkifyjs: already initialized - will not register custom scheme "${n}" ${H0}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  z.customSchemes.push([n, e]);
}
function j0() {
  z.scanner = N0(z.customSchemes);
  for (let n = 0; n < z.tokenQueue.length; n++)
    z.tokenQueue[n][1]({
      scanner: z.scanner
    });
  z.parser = P0(z.scanner.tokens);
  for (let n = 0; n < z.pluginQueue.length; n++)
    z.pluginQueue[n][1]({
      scanner: z.scanner,
      parser: z.parser
    });
  z.initialized = !0;
}
function V0(n) {
  return z.initialized || j0(), I0(z.parser.start, n, L0(z.scanner.start, n));
}
function qo(n, e, t) {
  if (e === void 0 && (e = null), t === void 0 && (t = null), e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new Ko(t), i = V0(n), s = [];
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    l.isLink && (!e || l.t === e) && r.check(l) && s.push(l.toFormattedObject(r));
  }
  return s;
}
function F0(n) {
  return new se({
    key: new Ee("autolink"),
    appendTransaction: (e, t, r) => {
      const i = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), s = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || s)
        return;
      const { tr: o } = r, l = $1(t.doc, [...e]);
      if (z1(l).forEach(({ newRange: c }) => {
        const d = L1(r.doc, c, (f) => f.isTextblock);
        let u, h;
        if (d.length > 1 ? (u = d[0], h = r.doc.textBetween(u.pos, u.pos + u.node.nodeSize, void 0, " ")) : d.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (u = d[0], h = r.doc.textBetween(u.pos, c.to, void 0, " ")), u && h) {
          const f = h.split(" ").filter((g) => g !== "");
          if (f.length <= 0)
            return !1;
          const p = f[f.length - 1], m = u.pos + h.lastIndexOf(p);
          if (!p)
            return !1;
          qo(p).filter((g) => g.isLink).map((g) => ({
            ...g,
            from: m + g.start + 1,
            to: m + g.end + 1
          })).filter((g) => r.schema.marks.code ? !r.doc.rangeHasMark(g.from, g.to, r.schema.marks.code) : !0).filter((g) => n.validate ? n.validate(g.value) : !0).forEach((g) => {
            Bo(g.from, g.to, r.doc).some((b) => b.mark.type === n.type) || o.addMark(g.from, g.to, n.type.create({
              href: g.href
            }));
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function W0(n) {
  return new se({
    key: new Ee("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var i, s;
        if (r.button !== 0)
          return !1;
        let o = r.target;
        const l = [];
        for (; o.nodeName !== "DIV"; )
          l.push(o), o = o.parentNode;
        if (!l.find((h) => h.nodeName === "A"))
          return !1;
        const a = Hd(e.state, n.type.name), c = r.target, d = (i = c == null ? void 0 : c.href) !== null && i !== void 0 ? i : a.href, u = (s = c == null ? void 0 : c.target) !== null && s !== void 0 ? s : a.target;
        return c && d ? (window.open(d, u), !0) : !1;
      }
    }
  });
}
function U0(n) {
  return new se({
    key: new Ee("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        const { state: i } = e, { selection: s } = i, { empty: o } = s;
        if (o)
          return !1;
        let l = "";
        r.content.forEach((c) => {
          l += c.textContent;
        });
        const a = qo(l).find((c) => c.isLink && c.value === l);
        return !l || !a ? !1 : (n.editor.commands.setMark(n.type, {
          href: a.href
        }), !0);
      }
    }
  });
}
const K0 = ye.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  onCreate() {
    this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        Aa(n);
        return;
      }
      Aa(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    z0();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
  },
  renderHTML({ HTMLAttributes: n }) {
    var e;
    return !((e = n.href) === null || e === void 0) && e.startsWith("javascript:") ? ["a", j(this.options.HTMLAttributes, { ...n, href: "" }), 0] : ["a", j(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => e().setMark(this.name, n).setMeta("preventAutolink", !0).run(),
      toggleLink: (n) => ({ chain: e }) => e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run(),
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      Ct({
        find: (n) => {
          const e = [];
          if (n) {
            const t = qo(n).filter((r) => r.isLink);
            t.length && t.forEach((r) => e.push({
              text: r.value,
              data: {
                href: r.href
              },
              index: r.start
            }));
          }
          return e;
        },
        type: this.type,
        getAttributes: (n) => {
          var e;
          return {
            href: (e = n.data) === null || e === void 0 ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const n = [];
    return this.options.autolink && n.push(F0({
      type: this.type,
      validate: this.options.validate
    })), this.options.openOnClick && n.push(W0({
      type: this.type
    })), this.options.linkOnPaste && n.push(U0({
      editor: this.editor,
      type: this.type
    })), n;
  }
});
function Gd(n) {
  return n && n.__esModule ? n.default : n;
}
function Oe(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
var Ui, M, Zd, Bn, Yd, _a, yi = {}, Xd = [], q0 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function mt(n, e) {
  for (var t in e)
    n[t] = e[t];
  return n;
}
function Qd(n) {
  var e = n.parentNode;
  e && e.removeChild(n);
}
function co(n, e, t) {
  var r, i, s, o = {};
  for (s in e)
    s == "key" ? r = e[s] : s == "ref" ? i = e[s] : o[s] = e[s];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? Ui.call(arguments, 2) : t), typeof n == "function" && n.defaultProps != null)
    for (s in n.defaultProps)
      o[s] === void 0 && (o[s] = n.defaultProps[s]);
  return kr(n, o, r, i, null);
}
function kr(n, e, t, r, i) {
  var s = {
    type: n,
    props: e,
    key: t,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: i == null ? ++Zd : i
  };
  return i == null && M.vnode != null && M.vnode(s), s;
}
function Ye() {
  return {
    current: null
  };
}
function wn(n) {
  return n.children;
}
function We(n, e) {
  this.props = n, this.context = e;
}
function Cn(n, e) {
  if (e == null)
    return n.__ ? Cn(n.__, n.__.__k.indexOf(n) + 1) : null;
  for (var t; e < n.__k.length; e++)
    if ((t = n.__k[e]) != null && t.__e != null)
      return t.__e;
  return typeof n.type == "function" ? Cn(n) : null;
}
function eu(n) {
  var e, t;
  if ((n = n.__) != null && n.__c != null) {
    for (n.__e = n.__c.base = null, e = 0; e < n.__k.length; e++)
      if ((t = n.__k[e]) != null && t.__e != null) {
        n.__e = n.__c.base = t.__e;
        break;
      }
    return eu(n);
  }
}
function Oa(n) {
  (!n.__d && (n.__d = !0) && Bn.push(n) && !vi.__r++ || _a !== M.debounceRendering) && ((_a = M.debounceRendering) || Yd)(vi);
}
function vi() {
  for (var n; vi.__r = Bn.length; )
    n = Bn.sort(function(e, t) {
      return e.__v.__b - t.__v.__b;
    }), Bn = [], n.some(function(e) {
      var t, r, i, s, o, l;
      e.__d && (o = (s = (t = e).__v).__e, (l = t.__P) && (r = [], (i = mt({}, s)).__v = s.__v + 1, Jo(l, s, i, t.__n, l.ownerSVGElement !== void 0, s.__h != null ? [
        o
      ] : null, r, o == null ? Cn(s) : o, s.__h), iu(r, s), s.__e != o && eu(s)));
    });
}
function tu(n, e, t, r, i, s, o, l, a, c) {
  var d, u, h, f, p, m, g, b = r && r.__k || Xd, v = b.length;
  for (t.__k = [], d = 0; d < e.length; d++)
    if ((f = t.__k[d] = (f = e[d]) == null || typeof f == "boolean" ? null : typeof f == "string" || typeof f == "number" || typeof f == "bigint" ? kr(null, f, null, null, f) : Array.isArray(f) ? kr(wn, {
      children: f
    }, null, null, null) : f.__b > 0 ? kr(f.type, f.props, f.key, null, f.__v) : f) != null) {
      if (f.__ = t, f.__b = t.__b + 1, (h = b[d]) === null || h && f.key == h.key && f.type === h.type)
        b[d] = void 0;
      else
        for (u = 0; u < v; u++) {
          if ((h = b[u]) && f.key == h.key && f.type === h.type) {
            b[u] = void 0;
            break;
          }
          h = null;
        }
      Jo(n, f, h = h || yi, i, s, o, l, a, c), p = f.__e, (u = f.ref) && h.ref != u && (g || (g = []), h.ref && g.push(h.ref, null, f), g.push(u, f.__c || p, f)), p != null ? (m == null && (m = p), typeof f.type == "function" && f.__k === h.__k ? f.__d = a = nu(f, a, n) : a = ru(n, f, h, b, p, a), typeof t.type == "function" && (t.__d = a)) : a && h.__e == a && a.parentNode != n && (a = Cn(h));
    }
  for (t.__e = m, d = v; d--; )
    b[d] != null && (typeof t.type == "function" && b[d].__e != null && b[d].__e == t.__d && (t.__d = Cn(r, d + 1)), ou(b[d], b[d]));
  if (g)
    for (d = 0; d < g.length; d++)
      su(g[d], g[++d], g[++d]);
}
function nu(n, e, t) {
  for (var r, i = n.__k, s = 0; i && s < i.length; s++)
    (r = i[s]) && (r.__ = n, e = typeof r.type == "function" ? nu(r, e, t) : ru(t, r, r, i, r.__e, e));
  return e;
}
function ki(n, e) {
  return e = e || [], n == null || typeof n == "boolean" || (Array.isArray(n) ? n.some(function(t) {
    ki(t, e);
  }) : e.push(n)), e;
}
function ru(n, e, t, r, i, s) {
  var o, l, a;
  if (e.__d !== void 0)
    o = e.__d, e.__d = void 0;
  else if (t == null || i != s || i.parentNode == null)
    e:
      if (s == null || s.parentNode !== n)
        n.appendChild(i), o = null;
      else {
        for (l = s, a = 0; (l = l.nextSibling) && a < r.length; a += 2)
          if (l == i)
            break e;
        n.insertBefore(i, s), o = s;
      }
  return o !== void 0 ? o : i.nextSibling;
}
function J0(n, e, t, r, i) {
  var s;
  for (s in t)
    s === "children" || s === "key" || s in e || xi(n, s, null, t[s], r);
  for (s in e)
    i && typeof e[s] != "function" || s === "children" || s === "key" || s === "value" || s === "checked" || t[s] === e[s] || xi(n, s, e[s], t[s], r);
}
function $a(n, e, t) {
  e[0] === "-" ? n.setProperty(e, t) : n[e] = t == null ? "" : typeof t != "number" || q0.test(e) ? t : t + "px";
}
function xi(n, e, t, r, i) {
  var s;
  e:
    if (e === "style")
      if (typeof t == "string")
        n.style.cssText = t;
      else {
        if (typeof r == "string" && (n.style.cssText = r = ""), r)
          for (e in r)
            t && e in t || $a(n.style, e, "");
        if (t)
          for (e in t)
            r && t[e] === r[e] || $a(n.style, e, t[e]);
      }
    else if (e[0] === "o" && e[1] === "n")
      s = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in n ? e.toLowerCase().slice(2) : e.slice(2), n.l || (n.l = {}), n.l[e + s] = t, t ? r || n.addEventListener(e, s ? La : Na, s) : n.removeEventListener(e, s ? La : Na, s);
    else if (e !== "dangerouslySetInnerHTML") {
      if (i)
        e = e.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
      else if (e !== "href" && e !== "list" && e !== "form" && e !== "tabIndex" && e !== "download" && e in n)
        try {
          n[e] = t == null ? "" : t;
          break e;
        } catch {
        }
      typeof t == "function" || (t != null && (t !== !1 || e[0] === "a" && e[1] === "r") ? n.setAttribute(e, t) : n.removeAttribute(e));
    }
}
function Na(n) {
  this.l[n.type + !1](M.event ? M.event(n) : n);
}
function La(n) {
  this.l[n.type + !0](M.event ? M.event(n) : n);
}
function Jo(n, e, t, r, i, s, o, l, a) {
  var c, d, u, h, f, p, m, g, b, v, C, T = e.type;
  if (e.constructor !== void 0)
    return null;
  t.__h != null && (a = t.__h, l = e.__e = t.__e, e.__h = null, s = [
    l
  ]), (c = M.__b) && c(e);
  try {
    e:
      if (typeof T == "function") {
        if (g = e.props, b = (c = T.contextType) && r[c.__c], v = c ? b ? b.props.value : c.__ : r, t.__c ? m = (d = e.__c = t.__c).__ = d.__E : ("prototype" in T && T.prototype.render ? e.__c = d = new T(g, v) : (e.__c = d = new We(g, v), d.constructor = T, d.render = Z0), b && b.sub(d), d.props = g, d.state || (d.state = {}), d.context = v, d.__n = r, u = d.__d = !0, d.__h = []), d.__s == null && (d.__s = d.state), T.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = mt({}, d.__s)), mt(d.__s, T.getDerivedStateFromProps(g, d.__s))), h = d.props, f = d.state, u)
          T.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), d.componentDidMount != null && d.__h.push(d.componentDidMount);
        else {
          if (T.getDerivedStateFromProps == null && g !== h && d.componentWillReceiveProps != null && d.componentWillReceiveProps(g, v), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(g, d.__s, v) === !1 || e.__v === t.__v) {
            d.props = g, d.state = d.__s, e.__v !== t.__v && (d.__d = !1), d.__v = e, e.__e = t.__e, e.__k = t.__k, e.__k.forEach(function(_) {
              _ && (_.__ = e);
            }), d.__h.length && o.push(d);
            break e;
          }
          d.componentWillUpdate != null && d.componentWillUpdate(g, d.__s, v), d.componentDidUpdate != null && d.__h.push(function() {
            d.componentDidUpdate(h, f, p);
          });
        }
        d.context = v, d.props = g, d.state = d.__s, (c = M.__r) && c(e), d.__d = !1, d.__v = e, d.__P = n, c = d.render(d.props, d.state, d.context), d.state = d.__s, d.getChildContext != null && (r = mt(mt({}, r), d.getChildContext())), u || d.getSnapshotBeforeUpdate == null || (p = d.getSnapshotBeforeUpdate(h, f)), C = c != null && c.type === wn && c.key == null ? c.props.children : c, tu(n, Array.isArray(C) ? C : [
          C
        ], e, t, r, i, s, o, l, a), d.base = e.__e, e.__h = null, d.__h.length && o.push(d), m && (d.__E = d.__ = null), d.__e = !1;
      } else
        s == null && e.__v === t.__v ? (e.__k = t.__k, e.__e = t.__e) : e.__e = G0(t.__e, e, t, r, i, s, o, a);
    (c = M.diffed) && c(e);
  } catch (_) {
    e.__v = null, (a || s != null) && (e.__e = l, e.__h = !!a, s[s.indexOf(l)] = null), M.__e(_, e, t);
  }
}
function iu(n, e) {
  M.__c && M.__c(e, n), n.some(function(t) {
    try {
      n = t.__h, t.__h = [], n.some(function(r) {
        r.call(t);
      });
    } catch (r) {
      M.__e(r, t.__v);
    }
  });
}
function G0(n, e, t, r, i, s, o, l) {
  var a, c, d, u = t.props, h = e.props, f = e.type, p = 0;
  if (f === "svg" && (i = !0), s != null) {
    for (; p < s.length; p++)
      if ((a = s[p]) && "setAttribute" in a == !!f && (f ? a.localName === f : a.nodeType === 3)) {
        n = a, s[p] = null;
        break;
      }
  }
  if (n == null) {
    if (f === null)
      return document.createTextNode(h);
    n = i ? document.createElementNS("http://www.w3.org/2000/svg", f) : document.createElement(f, h.is && h), s = null, l = !1;
  }
  if (f === null)
    u === h || l && n.data === h || (n.data = h);
  else {
    if (s = s && Ui.call(n.childNodes), c = (u = t.props || yi).dangerouslySetInnerHTML, d = h.dangerouslySetInnerHTML, !l) {
      if (s != null)
        for (u = {}, p = 0; p < n.attributes.length; p++)
          u[n.attributes[p].name] = n.attributes[p].value;
      (d || c) && (d && (c && d.__html == c.__html || d.__html === n.innerHTML) || (n.innerHTML = d && d.__html || ""));
    }
    if (J0(n, h, u, i, l), d)
      e.__k = [];
    else if (p = e.props.children, tu(n, Array.isArray(p) ? p : [
      p
    ], e, t, r, i && f !== "foreignObject", s, o, s ? s[0] : t.__k && Cn(t, 0), l), s != null)
      for (p = s.length; p--; )
        s[p] != null && Qd(s[p]);
    l || ("value" in h && (p = h.value) !== void 0 && (p !== u.value || p !== n.value || f === "progress" && !p) && xi(n, "value", p, u.value, !1), "checked" in h && (p = h.checked) !== void 0 && p !== n.checked && xi(n, "checked", p, u.checked, !1));
  }
  return n;
}
function su(n, e, t) {
  try {
    typeof n == "function" ? n(e) : n.current = e;
  } catch (r) {
    M.__e(r, t);
  }
}
function ou(n, e, t) {
  var r, i;
  if (M.unmount && M.unmount(n), (r = n.ref) && (r.current && r.current !== n.__e || su(r, null, e)), (r = n.__c) != null) {
    if (r.componentWillUnmount)
      try {
        r.componentWillUnmount();
      } catch (s) {
        M.__e(s, e);
      }
    r.base = r.__P = null;
  }
  if (r = n.__k)
    for (i = 0; i < r.length; i++)
      r[i] && ou(r[i], e, typeof n.type != "function");
  t || n.__e == null || Qd(n.__e), n.__e = n.__d = void 0;
}
function Z0(n, e, t) {
  return this.constructor(n, t);
}
function lu(n, e, t) {
  var r, i, s;
  M.__ && M.__(n, e), i = (r = typeof t == "function") ? null : t && t.__k || e.__k, s = [], Jo(e, n = (!r && t || e).__k = co(wn, null, [
    n
  ]), i || yi, yi, e.ownerSVGElement !== void 0, !r && t ? [
    t
  ] : i ? null : e.firstChild ? Ui.call(e.childNodes) : null, s, !r && t ? t : i ? i.__e : e.firstChild, r), iu(s, n);
}
Ui = Xd.slice, M = {
  __e: function(n, e) {
    for (var t, r, i; e = e.__; )
      if ((t = e.__c) && !t.__)
        try {
          if ((r = t.constructor) && r.getDerivedStateFromError != null && (t.setState(r.getDerivedStateFromError(n)), i = t.__d), t.componentDidCatch != null && (t.componentDidCatch(n), i = t.__d), i)
            return t.__E = t;
        } catch (s) {
          n = s;
        }
    throw n;
  }
}, Zd = 0, We.prototype.setState = function(n, e) {
  var t;
  t = this.__s != null && this.__s !== this.state ? this.__s : this.__s = mt({}, this.state), typeof n == "function" && (n = n(mt({}, t), this.props)), n && mt(t, n), n != null && this.__v && (e && this.__h.push(e), Oa(this));
}, We.prototype.forceUpdate = function(n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), Oa(this));
}, We.prototype.render = wn, Bn = [], Yd = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, vi.__r = 0;
var Y0 = 0;
function y(n, e, t, r, i) {
  var s, o, l = {};
  for (o in e)
    o == "ref" ? s = e[o] : l[o] = e[o];
  var a = {
    type: n,
    props: l,
    key: t,
    ref: s,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: --Y0,
    __source: r,
    __self: i
  };
  if (typeof n == "function" && (s = n.defaultProps))
    for (o in s)
      l[o] === void 0 && (l[o] = s[o]);
  return M.vnode && M.vnode(a), a;
}
function X0(n, e) {
  try {
    window.localStorage[`emoji-mart.${n}`] = JSON.stringify(e);
  } catch {
  }
}
function Q0(n) {
  try {
    const e = window.localStorage[`emoji-mart.${n}`];
    if (e)
      return JSON.parse(e);
  } catch {
  }
}
var vt = {
  set: X0,
  get: Q0
};
const As = /* @__PURE__ */ new Map(), e2 = [
  {
    v: 14,
    emoji: "\u{1FAE0}"
  },
  {
    v: 13.1,
    emoji: "\u{1F636}\u200D\u{1F32B}\uFE0F"
  },
  {
    v: 13,
    emoji: "\u{1F978}"
  },
  {
    v: 12.1,
    emoji: "\u{1F9D1}\u200D\u{1F9B0}"
  },
  {
    v: 12,
    emoji: "\u{1F971}"
  },
  {
    v: 11,
    emoji: "\u{1F970}"
  },
  {
    v: 5,
    emoji: "\u{1F929}"
  },
  {
    v: 4,
    emoji: "\u{1F471}\u200D\u2640\uFE0F"
  },
  {
    v: 3,
    emoji: "\u{1F923}"
  },
  {
    v: 2,
    emoji: "\u{1F44B}\u{1F3FB}"
  },
  {
    v: 1,
    emoji: "\u{1F643}"
  }
];
function t2() {
  for (const { v: n, emoji: e } of e2)
    if (au(e))
      return n;
}
function n2() {
  return !au("\u{1F1E8}\u{1F1E6}");
}
function au(n) {
  if (As.has(n))
    return As.get(n);
  const e = r2(n);
  return As.set(n, e), e;
}
const r2 = (() => {
  let n = null;
  try {
    navigator.userAgent.includes("jsdom") || (n = document.createElement("canvas").getContext("2d", {
      willReadFrequently: !0
    }));
  } catch {
  }
  if (!n)
    return () => !1;
  const e = 25, t = 20, r = Math.floor(e / 2);
  return n.font = r + "px Arial, Sans-Serif", n.textBaseline = "top", n.canvas.width = t * 2, n.canvas.height = e, (i) => {
    n.clearRect(0, 0, t * 2, e), n.fillStyle = "#FF0000", n.fillText(i, 0, 22), n.fillStyle = "#0000FF", n.fillText(i, t, 22);
    const s = n.getImageData(0, 0, t, e).data, o = s.length;
    let l = 0;
    for (; l < o && !s[l + 3]; l += 4)
      ;
    if (l >= o)
      return !1;
    const a = t + l / 4 % t, c = Math.floor(l / 4 / t), d = n.getImageData(a, c, 1, 1).data;
    return !(s[l] !== d[0] || s[l + 2] !== d[2] || n.measureText(i).width >= t);
  };
})();
var Da = {
  latestVersion: t2,
  noCountryFlags: n2
};
const uo = [
  "+1",
  "grinning",
  "kissing_heart",
  "heart_eyes",
  "laughing",
  "stuck_out_tongue_winking_eye",
  "sweat_smile",
  "joy",
  "scream",
  "disappointed",
  "unamused",
  "weary",
  "sob",
  "sunglasses",
  "heart"
];
let X = null;
function i2(n) {
  X || (X = vt.get("frequently") || {});
  const e = n.id || n;
  !e || (X[e] || (X[e] = 0), X[e] += 1, vt.set("last", e), vt.set("frequently", X));
}
function s2({ maxFrequentRows: n, perLine: e }) {
  if (!n)
    return [];
  X || (X = vt.get("frequently"));
  let t = [];
  if (!X) {
    X = {};
    for (let s in uo.slice(0, e)) {
      const o = uo[s];
      X[o] = e - s, t.push(o);
    }
    return t;
  }
  const r = n * e, i = vt.get("last");
  for (let s in X)
    t.push(s);
  if (t.sort((s, o) => {
    const l = X[o], a = X[s];
    return l == a ? s.localeCompare(o) : l - a;
  }), t.length > r) {
    const s = t.slice(r);
    t = t.slice(0, r);
    for (let o of s)
      o != i && delete X[o];
    i && t.indexOf(i) == -1 && (delete X[t[t.length - 1]], t.splice(-1, 1, i)), vt.set("frequently", X);
  }
  return t;
}
var cu = {
  add: i2,
  get: s2,
  DEFAULTS: uo
}, du = {};
du = JSON.parse('{"search":"Search","search_no_results_1":"Oh no!","search_no_results_2":"That emoji couldn\u2019t be found","pick":"Pick an emoji\u2026","add_custom":"Add custom emoji","categories":{"activity":"Activity","custom":"Custom","flags":"Flags","foods":"Food & Drink","frequent":"Frequently used","nature":"Animals & Nature","objects":"Objects","people":"Smileys & People","places":"Travel & Places","search":"Search Results","symbols":"Symbols"},"skins":{"1":"Default","2":"Light","3":"Medium-Light","4":"Medium","5":"Medium-Dark","6":"Dark","choose":"Choose default skin tone"}}');
var et = {
  autoFocus: {
    value: !1
  },
  dynamicWidth: {
    value: !1
  },
  emojiButtonColors: {
    value: null
  },
  emojiButtonRadius: {
    value: "100%"
  },
  emojiButtonSize: {
    value: 36
  },
  emojiSize: {
    value: 24
  },
  emojiVersion: {
    value: 14,
    choices: [
      1,
      2,
      3,
      4,
      5,
      11,
      12,
      12.1,
      13,
      13.1,
      14
    ]
  },
  exceptEmojis: {
    value: []
  },
  icons: {
    value: "auto",
    choices: [
      "auto",
      "outline",
      "solid"
    ]
  },
  locale: {
    value: "en",
    choices: [
      "en",
      "ar",
      "be",
      "cs",
      "de",
      "es",
      "fa",
      "fi",
      "fr",
      "hi",
      "it",
      "ja",
      "kr",
      "nl",
      "pl",
      "pt",
      "ru",
      "sa",
      "tr",
      "uk",
      "vi",
      "zh"
    ]
  },
  maxFrequentRows: {
    value: 4
  },
  navPosition: {
    value: "top",
    choices: [
      "top",
      "bottom",
      "none"
    ]
  },
  noCountryFlags: {
    value: !1
  },
  noResultsEmoji: {
    value: null
  },
  perLine: {
    value: 9
  },
  previewEmoji: {
    value: null
  },
  previewPosition: {
    value: "bottom",
    choices: [
      "top",
      "bottom",
      "none"
    ]
  },
  searchPosition: {
    value: "sticky",
    choices: [
      "sticky",
      "static",
      "none"
    ]
  },
  set: {
    value: "native",
    choices: [
      "native",
      "apple",
      "facebook",
      "google",
      "twitter"
    ]
  },
  skin: {
    value: 1,
    choices: [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  skinTonePosition: {
    value: "preview",
    choices: [
      "preview",
      "search",
      "none"
    ]
  },
  theme: {
    value: "auto",
    choices: [
      "auto",
      "light",
      "dark"
    ]
  },
  categories: null,
  categoryIcons: null,
  custom: null,
  data: null,
  i18n: null,
  getImageURL: null,
  getSpritesheetURL: null,
  onAddCustomEmoji: null,
  onClickOutside: null,
  onEmojiSelect: null,
  stickySearch: {
    deprecated: !0,
    value: !0
  }
};
let te = null, P = null;
const _s = {};
async function Ra(n) {
  if (_s[n])
    return _s[n];
  const t = await (await fetch(n)).json();
  return _s[n] = t, t;
}
let Os = null, uu = null, hu = !1;
function Ki(n, { caller: e } = {}) {
  return Os || (Os = new Promise((t) => {
    uu = t;
  })), n ? o2(n) : e && !hu && console.warn(`\`${e}\` requires data to be initialized first. Promise will be pending until \`init\` is called.`), Os;
}
async function o2(n) {
  hu = !0;
  let { emojiVersion: e, set: t, locale: r } = n;
  if (e || (e = et.emojiVersion.value), t || (t = et.set.value), r || (r = et.locale.value), P)
    P.categories = P.categories.filter((a) => !a.name);
  else {
    P = (typeof n.data == "function" ? await n.data() : n.data) || await Ra(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/sets/${e}/${t}.json`), P.emoticons = {}, P.natives = {}, P.categories.unshift({
      id: "frequent",
      emojis: []
    });
    for (const a in P.aliases) {
      const c = P.aliases[a], d = P.emojis[c];
      !d || (d.aliases || (d.aliases = []), d.aliases.push(a));
    }
    P.originalCategories = P.categories;
  }
  if (te = (typeof n.i18n == "function" ? await n.i18n() : n.i18n) || (r == "en" ? /* @__PURE__ */ Gd(du) : await Ra(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/i18n/${r}.json`)), n.custom)
    for (let a in n.custom) {
      a = parseInt(a);
      const c = n.custom[a], d = n.custom[a - 1];
      if (!(!c.emojis || !c.emojis.length)) {
        c.id || (c.id = `custom_${a + 1}`), c.name || (c.name = te.categories.custom), d && !c.icon && (c.target = d.target || d), P.categories.push(c);
        for (const u of c.emojis)
          P.emojis[u.id] = u;
      }
    }
  n.categories && (P.categories = P.originalCategories.filter((a) => n.categories.indexOf(a.id) != -1).sort((a, c) => {
    const d = n.categories.indexOf(a.id), u = n.categories.indexOf(c.id);
    return d - u;
  }));
  let i = null, s = null;
  t == "native" && (i = Da.latestVersion(), s = n.noCountryFlags || Da.noCountryFlags());
  let o = P.categories.length, l = !1;
  for (; o--; ) {
    const a = P.categories[o];
    if (a.id == "frequent") {
      let { maxFrequentRows: u, perLine: h } = n;
      u = u >= 0 ? u : et.maxFrequentRows.value, h || (h = et.perLine.value), a.emojis = cu.get({
        maxFrequentRows: u,
        perLine: h
      });
    }
    if (!a.emojis || !a.emojis.length) {
      P.categories.splice(o, 1);
      continue;
    }
    const { categoryIcons: c } = n;
    if (c) {
      const u = c[a.id];
      u && !a.icon && (a.icon = u);
    }
    let d = a.emojis.length;
    for (; d--; ) {
      const u = a.emojis[d], h = u.id ? u : P.emojis[u], f = () => {
        a.emojis.splice(d, 1);
      };
      if (!h || n.exceptEmojis && n.exceptEmojis.includes(h.id)) {
        f();
        continue;
      }
      if (i && h.version > i) {
        f();
        continue;
      }
      if (s && a.id == "flags" && !u2.includes(h.id)) {
        f();
        continue;
      }
      if (!h.search) {
        if (l = !0, h.search = "," + [
          [
            h.id,
            !1
          ],
          [
            h.name,
            !0
          ],
          [
            h.keywords,
            !1
          ],
          [
            h.emoticons,
            !1
          ]
        ].map(([m, g]) => {
          if (!!m)
            return (Array.isArray(m) ? m : [
              m
            ]).map((b) => (g ? b.split(/[-|_|\s]+/) : [
              b
            ]).map((v) => v.toLowerCase())).flat();
        }).flat().filter((m) => m && m.trim()).join(","), h.emoticons)
          for (const m of h.emoticons)
            P.emoticons[m] || (P.emoticons[m] = h.id);
        let p = 0;
        for (const m of h.skins) {
          if (!m)
            continue;
          p++;
          const { native: g } = m;
          g && (P.natives[g] = h.id, h.search += `,${g}`);
          const b = p == 1 ? "" : `:skin-tone-${p}:`;
          m.shortcodes = `:${h.id}:${b}`;
        }
      }
    }
  }
  l && hn.reset(), uu();
}
function fu(n, e, t) {
  n || (n = {});
  const r = {};
  for (let i in e)
    r[i] = pu(i, n, e, t);
  return r;
}
function pu(n, e, t, r) {
  const i = t[n];
  let s = r && r.getAttribute(n) || (e[n] != null && e[n] != null ? e[n] : null);
  return i && (s != null && i.value && typeof i.value != typeof s && (typeof i.value == "boolean" ? s = s != "false" : s = i.value.constructor(s)), i.transform && s && (s = i.transform(s)), (s == null || i.choices && i.choices.indexOf(s) == -1) && (s = i.value)), s;
}
const l2 = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
let ho = null;
function a2(n) {
  return n.id ? n : P.emojis[n] || P.emojis[P.aliases[n]] || P.emojis[P.natives[n]];
}
function c2() {
  ho = null;
}
async function d2(n, { maxResults: e, caller: t } = {}) {
  if (!n || !n.trim().length)
    return null;
  e || (e = 90), await Ki(null, {
    caller: t || "SearchIndex.search"
  });
  const r = n.toLowerCase().replace(/(\w)-/, "$1 ").split(/[\s|,]+/).filter((l, a, c) => l.trim() && c.indexOf(l) == a);
  if (!r.length)
    return;
  let i = ho || (ho = Object.values(P.emojis)), s, o;
  for (const l of r) {
    if (!i.length)
      break;
    s = [], o = {};
    for (const a of i) {
      if (!a.search)
        continue;
      const c = a.search.indexOf(`,${l}`);
      c != -1 && (s.push(a), o[a.id] || (o[a.id] = 0), o[a.id] += a.id == l ? 0 : c + 1);
    }
    i = s;
  }
  return s.length < 2 || (s.sort((l, a) => {
    const c = o[l.id], d = o[a.id];
    return c == d ? l.id.localeCompare(a.id) : c - d;
  }), s.length > e && (s = s.slice(0, e))), s;
}
var hn = {
  search: d2,
  get: a2,
  reset: c2,
  SHORTCODES_REGEX: l2
};
const u2 = [
  "checkered_flag",
  "crossed_flags",
  "pirate_flag",
  "rainbow-flag",
  "transgender_flag",
  "triangular_flag_on_post",
  "waving_black_flag",
  "waving_white_flag"
];
function h2(n, e) {
  return Array.isArray(n) && Array.isArray(e) && n.length === e.length && n.every((t, r) => t == e[r]);
}
async function f2(n = 1) {
  for (let e in [
    ...Array(n).keys()
  ])
    await new Promise(requestAnimationFrame);
}
function p2(n, { skinIndex: e = 0 } = {}) {
  const t = n.skins[e] || (() => (e = 0, n.skins[e]))(), r = {
    id: n.id,
    name: n.name,
    native: t.native,
    unified: t.unified,
    keywords: n.keywords,
    shortcodes: t.shortcodes || n.shortcodes
  };
  return n.skins.length > 1 && (r.skin = e + 1), t.src && (r.src = t.src), n.aliases && n.aliases.length && (r.aliases = n.aliases), n.emoticons && n.emoticons.length && (r.emoticons = n.emoticons), r;
}
const m2 = {
  activity: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ y("path", {
        d: "M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113"
      })
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ y("path", {
        d: "M16.17 337.5c0 44.98 7.565 83.54 13.98 107.9C35.22 464.3 50.46 496 174.9 496c9.566 0 19.59-.4707 29.84-1.271L17.33 307.3C16.53 317.6 16.17 327.7 16.17 337.5zM495.8 174.5c0-44.98-7.565-83.53-13.98-107.9c-4.688-17.54-18.34-31.23-36.04-35.95C435.5 27.91 392.9 16 337 16c-9.564 0-19.59 .4707-29.84 1.271l187.5 187.5C495.5 194.4 495.8 184.3 495.8 174.5zM26.77 248.8l236.3 236.3c142-36.1 203.9-150.4 222.2-221.1L248.9 26.87C106.9 62.96 45.07 177.2 26.77 248.8zM256 335.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L164.7 283.3C161.6 280.2 160 276.1 160 271.1c0-8.529 6.865-16 16-16c4.095 0 8.189 1.562 11.31 4.688l64.01 64C254.4 327.8 256 331.9 256 335.1zM304 287.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L212.7 235.3C209.6 232.2 208 228.1 208 223.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01C302.5 279.8 304 283.9 304 287.1zM256 175.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01c3.125 3.125 4.688 7.219 4.688 11.31c0 9.133-7.468 16-16 16c-4.094 0-8.189-1.562-11.31-4.688l-64.01-64.01C257.6 184.2 256 180.1 256 175.1z"
      })
    })
  },
  custom: /* @__PURE__ */ y("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    children: /* @__PURE__ */ y("path", {
      d: "M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z"
    })
  }),
  flags: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ y("path", {
        d: "M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"
      })
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ y("path", {
        d: "M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"
      })
    })
  },
  foods: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ y("path", {
        d: "M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9"
      })
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ y("path", {
        d: "M481.9 270.1C490.9 279.1 496 291.3 496 304C496 316.7 490.9 328.9 481.9 337.9C472.9 346.9 460.7 352 448 352H64C51.27 352 39.06 346.9 30.06 337.9C21.06 328.9 16 316.7 16 304C16 291.3 21.06 279.1 30.06 270.1C39.06 261.1 51.27 256 64 256H448C460.7 256 472.9 261.1 481.9 270.1zM475.3 388.7C478.3 391.7 480 395.8 480 400V416C480 432.1 473.3 449.3 461.3 461.3C449.3 473.3 432.1 480 416 480H96C79.03 480 62.75 473.3 50.75 461.3C38.74 449.3 32 432.1 32 416V400C32 395.8 33.69 391.7 36.69 388.7C39.69 385.7 43.76 384 48 384H464C468.2 384 472.3 385.7 475.3 388.7zM50.39 220.8C45.93 218.6 42.03 215.5 38.97 211.6C35.91 207.7 33.79 203.2 32.75 198.4C31.71 193.5 31.8 188.5 32.99 183.7C54.98 97.02 146.5 32 256 32C365.5 32 457 97.02 479 183.7C480.2 188.5 480.3 193.5 479.2 198.4C478.2 203.2 476.1 207.7 473 211.6C469.1 215.5 466.1 218.6 461.6 220.8C457.2 222.9 452.3 224 447.3 224H64.67C59.73 224 54.84 222.9 50.39 220.8zM372.7 116.7C369.7 119.7 368 123.8 368 128C368 131.2 368.9 134.3 370.7 136.9C372.5 139.5 374.1 141.6 377.9 142.8C380.8 143.1 384 144.3 387.1 143.7C390.2 143.1 393.1 141.6 395.3 139.3C397.6 137.1 399.1 134.2 399.7 131.1C400.3 128 399.1 124.8 398.8 121.9C397.6 118.1 395.5 116.5 392.9 114.7C390.3 112.9 387.2 111.1 384 111.1C379.8 111.1 375.7 113.7 372.7 116.7V116.7zM244.7 84.69C241.7 87.69 240 91.76 240 96C240 99.16 240.9 102.3 242.7 104.9C244.5 107.5 246.1 109.6 249.9 110.8C252.8 111.1 256 112.3 259.1 111.7C262.2 111.1 265.1 109.6 267.3 107.3C269.6 105.1 271.1 102.2 271.7 99.12C272.3 96.02 271.1 92.8 270.8 89.88C269.6 86.95 267.5 84.45 264.9 82.7C262.3 80.94 259.2 79.1 256 79.1C251.8 79.1 247.7 81.69 244.7 84.69V84.69zM116.7 116.7C113.7 119.7 112 123.8 112 128C112 131.2 112.9 134.3 114.7 136.9C116.5 139.5 118.1 141.6 121.9 142.8C124.8 143.1 128 144.3 131.1 143.7C134.2 143.1 137.1 141.6 139.3 139.3C141.6 137.1 143.1 134.2 143.7 131.1C144.3 128 143.1 124.8 142.8 121.9C141.6 118.1 139.5 116.5 136.9 114.7C134.3 112.9 131.2 111.1 128 111.1C123.8 111.1 119.7 113.7 116.7 116.7L116.7 116.7z"
      })
    })
  },
  frequent: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ y("path", {
          d: "M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z"
        }),
        /* @__PURE__ */ y("path", {
          d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
        })
      ]
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ y("path", {
        d: "M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
      })
    })
  },
  nature: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ y("path", {
          d: "M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8"
        }),
        /* @__PURE__ */ y("path", {
          d: "M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235"
        })
      ]
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 576 512",
      children: /* @__PURE__ */ y("path", {
        d: "M332.7 19.85C334.6 8.395 344.5 0 356.1 0C363.6 0 370.6 3.52 375.1 9.502L392 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H552C565.3 64 576 74.75 576 88V112C576 156.2 540.2 192 496 192H426.7L421.6 222.5L309.6 158.5L332.7 19.85zM448 64C439.2 64 432 71.16 432 80C432 88.84 439.2 96 448 96C456.8 96 464 88.84 464 80C464 71.16 456.8 64 448 64zM416 256.1V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V364.8C295.1 377.1 268.8 384 240 384C211.2 384 184 377.1 160 364.8V480C160 497.7 145.7 512 128 512H96C78.33 512 64 497.7 64 480V249.8C35.23 238.9 12.64 214.5 4.836 183.3L.9558 167.8C-3.331 150.6 7.094 133.2 24.24 128.1C41.38 124.7 58.76 135.1 63.05 152.2L66.93 167.8C70.49 182 83.29 191.1 97.97 191.1H303.8L416 256.1z"
      })
    })
  },
  objects: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ y("path", {
          d: "M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z"
        }),
        /* @__PURE__ */ y("path", {
          d: "M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789"
        })
      ]
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 384 512",
      children: /* @__PURE__ */ y("path", {
        d: "M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"
      })
    })
  },
  people: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ y("path", {
          d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
        }),
        /* @__PURE__ */ y("path", {
          d: "M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0"
        })
      ]
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ y("path", {
        d: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 432C332.1 432 396.2 382 415.2 314.1C419.1 300.4 407.8 288 393.6 288H118.4C104.2 288 92.92 300.4 96.76 314.1C115.8 382 179.9 432 256 432V432zM176.4 160C158.7 160 144.4 174.3 144.4 192C144.4 209.7 158.7 224 176.4 224C194 224 208.4 209.7 208.4 192C208.4 174.3 194 160 176.4 160zM336.4 224C354 224 368.4 209.7 368.4 192C368.4 174.3 354 160 336.4 160C318.7 160 304.4 174.3 304.4 192C304.4 209.7 318.7 224 336.4 224z"
      })
    })
  },
  places: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ y("path", {
          d: "M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5"
        }),
        /* @__PURE__ */ y("path", {
          d: "M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z"
        })
      ]
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ y("path", {
        d: "M39.61 196.8L74.8 96.29C88.27 57.78 124.6 32 165.4 32H346.6C387.4 32 423.7 57.78 437.2 96.29L472.4 196.8C495.6 206.4 512 229.3 512 256V448C512 465.7 497.7 480 480 480H448C430.3 480 416 465.7 416 448V400H96V448C96 465.7 81.67 480 64 480H32C14.33 480 0 465.7 0 448V256C0 229.3 16.36 206.4 39.61 196.8V196.8zM109.1 192H402.9L376.8 117.4C372.3 104.6 360.2 96 346.6 96H165.4C151.8 96 139.7 104.6 135.2 117.4L109.1 192zM96 256C78.33 256 64 270.3 64 288C64 305.7 78.33 320 96 320C113.7 320 128 305.7 128 288C128 270.3 113.7 256 96 256zM416 320C433.7 320 448 305.7 448 288C448 270.3 433.7 256 416 256C398.3 256 384 270.3 384 288C384 305.7 398.3 320 416 320z"
      })
    })
  },
  symbols: {
    outline: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ y("path", {
        d: "M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76"
      })
    }),
    solid: /* @__PURE__ */ y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ y("path", {
        d: "M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"
      })
    })
  }
}, g2 = {
  loupe: /* @__PURE__ */ y("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    children: /* @__PURE__ */ y("path", {
      d: "M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
    })
  }),
  delete: /* @__PURE__ */ y("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    children: /* @__PURE__ */ y("path", {
      d: "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
    })
  })
};
var wi = {
  categories: m2,
  search: g2
};
function fo(n) {
  let { id: e, skin: t, emoji: r } = n;
  if (n.shortcodes) {
    const l = n.shortcodes.match(hn.SHORTCODES_REGEX);
    l && (e = l[1], l[2] && (t = l[2]));
  }
  if (r || (r = hn.get(e || n.native)), !r)
    return n.fallback;
  const i = r.skins[t - 1] || r.skins[0], s = i.src || (n.set != "native" && !n.spritesheet ? typeof n.getImageURL == "function" ? n.getImageURL(n.set, i.unified) : `https://cdn.jsdelivr.net/npm/emoji-datasource-${n.set}@14.0.0/img/${n.set}/64/${i.unified}.png` : void 0), o = typeof n.getSpritesheetURL == "function" ? n.getSpritesheetURL(n.set) : `https://cdn.jsdelivr.net/npm/emoji-datasource-${n.set}@14.0.0/img/${n.set}/sheets-256/64.png`;
  return /* @__PURE__ */ y("span", {
    class: "emoji-mart-emoji",
    "data-emoji-set": n.set,
    children: s ? /* @__PURE__ */ y("img", {
      style: {
        maxWidth: n.size || "1em",
        maxHeight: n.size || "1em",
        display: "inline-block"
      },
      alt: i.native || i.shortcodes,
      src: s
    }) : n.set == "native" ? /* @__PURE__ */ y("span", {
      style: {
        fontSize: n.size,
        fontFamily: '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
      },
      children: i.native
    }) : /* @__PURE__ */ y("span", {
      style: {
        display: "block",
        width: n.size,
        height: n.size,
        backgroundImage: `url(${o})`,
        backgroundSize: `${100 * P.sheet.cols}% ${100 * P.sheet.rows}%`,
        backgroundPosition: `${100 / (P.sheet.cols - 1) * i.x}% ${100 / (P.sheet.rows - 1) * i.y}%`
      }
    })
  });
}
const b2 = typeof window < "u" && window.HTMLElement ? window.HTMLElement : Object;
class mu extends b2 {
  static get observedAttributes() {
    return Object.keys(this.Props);
  }
  update(e = {}) {
    for (let t in e)
      this.attributeChangedCallback(t, null, e[t]);
  }
  attributeChangedCallback(e, t, r) {
    if (!this.component)
      return;
    const i = pu(e, {
      [e]: r
    }, this.constructor.Props, this);
    this.component.componentWillReceiveProps ? this.component.componentWillReceiveProps({
      [e]: i
    }) : (this.component.props[e] = i, this.component.forceUpdate());
  }
  disconnectedCallback() {
    this.disconnected = !0, this.component && this.component.unregister && this.component.unregister();
  }
  constructor(e = {}) {
    if (super(), this.props = e, e.parent || e.ref) {
      let t = null;
      const r = e.parent || (t = e.ref && e.ref.current);
      t && (t.innerHTML = ""), r && r.appendChild(this);
    }
  }
}
class y2 extends mu {
  setShadow() {
    this.attachShadow({
      mode: "open"
    });
  }
  injectStyles(e) {
    if (!e)
      return;
    const t = document.createElement("style");
    t.textContent = e, this.shadowRoot.insertBefore(t, this.shadowRoot.firstChild);
  }
  constructor(e, { styles: t } = {}) {
    super(e), this.setShadow(), this.injectStyles(t);
  }
}
var gu = {
  fallback: "",
  id: "",
  native: "",
  shortcodes: "",
  size: {
    value: "",
    transform: (n) => /\D/.test(n) ? n : `${n}px`
  },
  set: et.set,
  skin: et.skin
};
class bu extends mu {
  async connectedCallback() {
    const e = fu(this.props, gu, this);
    e.element = this, e.ref = (t) => {
      this.component = t;
    }, await Ki(), !this.disconnected && lu(/* @__PURE__ */ y(fo, {
      ...e
    }), this);
  }
  constructor(e) {
    super(e);
  }
}
Oe(bu, "Props", gu);
typeof customElements < "u" && !customElements.get("em-emoji") && customElements.define("em-emoji", bu);
var Pa, po = [], Ia = M.__b, Ba = M.__r, Ha = M.diffed, za = M.__c, ja = M.unmount;
function v2() {
  var n;
  for (po.sort(function(e, t) {
    return e.__v.__b - t.__v.__b;
  }); n = po.pop(); )
    if (n.__P)
      try {
        n.__H.__h.forEach(xr), n.__H.__h.forEach(mo), n.__H.__h = [];
      } catch (e) {
        n.__H.__h = [], M.__e(e, n.__v);
      }
}
M.__b = function(n) {
  Ia && Ia(n);
}, M.__r = function(n) {
  Ba && Ba(n);
  var e = n.__c.__H;
  e && (e.__h.forEach(xr), e.__h.forEach(mo), e.__h = []);
}, M.diffed = function(n) {
  Ha && Ha(n);
  var e = n.__c;
  e && e.__H && e.__H.__h.length && (po.push(e) !== 1 && Pa === M.requestAnimationFrame || ((Pa = M.requestAnimationFrame) || function(t) {
    var r, i = function() {
      clearTimeout(s), Va && cancelAnimationFrame(r), setTimeout(t);
    }, s = setTimeout(i, 100);
    Va && (r = requestAnimationFrame(i));
  })(v2));
}, M.__c = function(n, e) {
  e.some(function(t) {
    try {
      t.__h.forEach(xr), t.__h = t.__h.filter(function(r) {
        return !r.__ || mo(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], M.__e(r, t.__v);
    }
  }), za && za(n, e);
}, M.unmount = function(n) {
  ja && ja(n);
  var e, t = n.__c;
  t && t.__H && (t.__H.__.forEach(function(r) {
    try {
      xr(r);
    } catch (i) {
      e = i;
    }
  }), e && M.__e(e, t.__v));
};
var Va = typeof requestAnimationFrame == "function";
function xr(n) {
  var e = n.__c;
  typeof e == "function" && (n.__c = void 0, e());
}
function mo(n) {
  n.__c = n.__();
}
function k2(n, e) {
  for (var t in e)
    n[t] = e[t];
  return n;
}
function Fa(n, e) {
  for (var t in n)
    if (t !== "__source" && !(t in e))
      return !0;
  for (var r in e)
    if (r !== "__source" && n[r] !== e[r])
      return !0;
  return !1;
}
function Ci(n) {
  this.props = n;
}
(Ci.prototype = new We()).isPureReactComponent = !0, Ci.prototype.shouldComponentUpdate = function(n, e) {
  return Fa(this.props, n) || Fa(this.state, e);
};
var Wa = M.__b;
M.__b = function(n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), Wa && Wa(n);
};
var x2 = M.__e;
M.__e = function(n, e, t) {
  if (n.then) {
    for (var r, i = e; i = i.__; )
      if ((r = i.__c) && r.__c)
        return e.__e == null && (e.__e = t.__e, e.__k = t.__k), r.__c(n, e);
  }
  x2(n, e, t);
};
var Ua = M.unmount;
function $s() {
  this.__u = 0, this.t = null, this.__b = null;
}
function yu(n) {
  var e = n.__.__c;
  return e && e.__e && e.__e(n);
}
function hr() {
  this.u = null, this.o = null;
}
M.unmount = function(n) {
  var e = n.__c;
  e && e.__R && e.__R(), e && n.__h === !0 && (n.type = null), Ua && Ua(n);
}, ($s.prototype = new We()).__c = function(n, e) {
  var t = e.__c, r = this;
  r.t == null && (r.t = []), r.t.push(t);
  var i = yu(r.__v), s = !1, o = function() {
    s || (s = !0, t.__R = null, i ? i(l) : l());
  };
  t.__R = o;
  var l = function() {
    if (!--r.__u) {
      if (r.state.__e) {
        var c = r.state.__e;
        r.__v.__k[0] = function u(h, f, p) {
          return h && (h.__v = null, h.__k = h.__k && h.__k.map(function(m) {
            return u(m, f, p);
          }), h.__c && h.__c.__P === f && (h.__e && p.insertBefore(h.__e, h.__d), h.__c.__e = !0, h.__c.__P = p)), h;
        }(c, c.__c.__P, c.__c.__O);
      }
      var d;
      for (r.setState({
        __e: r.__b = null
      }); d = r.t.pop(); )
        d.forceUpdate();
    }
  }, a = e.__h === !0;
  r.__u++ || a || r.setState({
    __e: r.__b = r.__v.__k[0]
  }), n.then(o, o);
}, $s.prototype.componentWillUnmount = function() {
  this.t = [];
}, $s.prototype.render = function(n, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = function s(o, l, a) {
        return o && (o.__c && o.__c.__H && (o.__c.__H.__.forEach(function(c) {
          typeof c.__c == "function" && c.__c();
        }), o.__c.__H = null), (o = k2({}, o)).__c != null && (o.__c.__P === a && (o.__c.__P = l), o.__c = null), o.__k = o.__k && o.__k.map(function(c) {
          return s(c, l, a);
        })), o;
      }(this.__b, t, r.__O = r.__P);
    }
    this.__b = null;
  }
  var i = e.__e && co(wn, null, n.fallback);
  return i && (i.__h = null), [
    co(wn, null, e.__e ? null : n.children),
    i
  ];
};
var Ka = function(n, e, t) {
  if (++t[1] === t[0] && n.o.delete(e), n.props.revealOrder && (n.props.revealOrder[0] !== "t" || !n.o.size))
    for (t = n.u; t; ) {
      for (; t.length > 3; )
        t.pop()();
      if (t[1] < t[0])
        break;
      n.u = t = t[2];
    }
};
(hr.prototype = new We()).__e = function(n) {
  var e = this, t = yu(e.__v), r = e.o.get(n);
  return r[0]++, function(i) {
    var s = function() {
      e.props.revealOrder ? (r.push(i), Ka(e, n, r)) : i();
    };
    t ? t(s) : s();
  };
}, hr.prototype.render = function(n) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = ki(n.children);
  n.revealOrder && n.revealOrder[0] === "b" && e.reverse();
  for (var t = e.length; t--; )
    this.o.set(e[t], this.u = [
      1,
      0,
      this.u
    ]);
  return n.children;
}, hr.prototype.componentDidUpdate = hr.prototype.componentDidMount = function() {
  var n = this;
  this.o.forEach(function(e, t) {
    Ka(n, t, e);
  });
};
var w2 = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, C2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, S2 = typeof document < "u", M2 = function(n) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(n);
};
We.prototype.isReactComponent = {}, [
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUpdate"
].forEach(function(n) {
  Object.defineProperty(We.prototype, n, {
    configurable: !0,
    get: function() {
      return this["UNSAFE_" + n];
    },
    set: function(e) {
      Object.defineProperty(this, n, {
        configurable: !0,
        writable: !0,
        value: e
      });
    }
  });
});
var qa = M.event;
function E2() {
}
function T2() {
  return this.cancelBubble;
}
function A2() {
  return this.defaultPrevented;
}
M.event = function(n) {
  return qa && (n = qa(n)), n.persist = E2, n.isPropagationStopped = T2, n.isDefaultPrevented = A2, n.nativeEvent = n;
};
var Ja = {
  configurable: !0,
  get: function() {
    return this.class;
  }
}, Ga = M.vnode;
M.vnode = function(n) {
  var e = n.type, t = n.props, r = t;
  if (typeof e == "string") {
    var i = e.indexOf("-") === -1;
    for (var s in r = {}, t) {
      var o = t[s];
      S2 && s === "children" && e === "noscript" || s === "value" && "defaultValue" in t && o == null || (s === "defaultValue" && "value" in t && t.value == null ? s = "value" : s === "download" && o === !0 ? o = "" : /ondoubleclick/i.test(s) ? s = "ondblclick" : /^onchange(textarea|input)/i.test(s + e) && !M2(t.type) ? s = "oninput" : /^onfocus$/i.test(s) ? s = "onfocusin" : /^onblur$/i.test(s) ? s = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp)/.test(s) ? s = s.toLowerCase() : i && C2.test(s) ? s = s.replace(/[A-Z0-9]/, "-$&").toLowerCase() : o === null && (o = void 0), r[s] = o);
    }
    e == "select" && r.multiple && Array.isArray(r.value) && (r.value = ki(t.children).forEach(function(l) {
      l.props.selected = r.value.indexOf(l.props.value) != -1;
    })), e == "select" && r.defaultValue != null && (r.value = ki(t.children).forEach(function(l) {
      l.props.selected = r.multiple ? r.defaultValue.indexOf(l.props.value) != -1 : r.defaultValue == l.props.value;
    })), n.props = r, t.class != t.className && (Ja.enumerable = "className" in t, t.className != null && (r.class = t.className), Object.defineProperty(r, "className", Ja));
  }
  n.$$typeof = w2, Ga && Ga(n);
};
var Za = M.__r;
M.__r = function(n) {
  Za && Za(n), n.__c;
};
const _2 = {
  light: "outline",
  dark: "solid"
};
class O2 extends Ci {
  renderIcon(e) {
    const { icon: t } = e;
    if (t) {
      if (t.svg)
        return /* @__PURE__ */ y("span", {
          class: "flex",
          dangerouslySetInnerHTML: {
            __html: t.svg
          }
        });
      if (t.src)
        return /* @__PURE__ */ y("img", {
          src: t.src
        });
    }
    const r = wi.categories[e.id] || wi.categories.custom, i = this.props.icons == "auto" ? _2[this.props.theme] : this.props.icons;
    return r[i] || r;
  }
  render() {
    let e = null;
    return /* @__PURE__ */ y("nav", {
      id: "nav",
      class: "padding",
      "data-position": this.props.position,
      dir: this.props.dir,
      children: /* @__PURE__ */ y("div", {
        class: "flex relative",
        children: [
          this.categories.map((t, r) => {
            const i = t.name || te.categories[t.id], s = !this.props.unfocused && t.id == this.state.categoryId;
            return s && (e = r), /* @__PURE__ */ y("button", {
              "aria-label": i,
              "aria-selected": s || void 0,
              title: i,
              type: "button",
              class: "flex flex-grow flex-center",
              onMouseDown: (o) => o.preventDefault(),
              onClick: () => {
                this.props.onClick({
                  category: t,
                  i: r
                });
              },
              children: this.renderIcon(t)
            });
          }),
          /* @__PURE__ */ y("div", {
            class: "bar",
            style: {
              width: `${100 / this.categories.length}%`,
              opacity: e == null ? 0 : 1,
              transform: this.props.dir === "rtl" ? `scaleX(-1) translateX(${e * 100}%)` : `translateX(${e * 100}%)`
            }
          })
        ]
      })
    });
  }
  constructor() {
    super(), this.categories = P.categories.filter((e) => !e.target), this.state = {
      categoryId: this.categories[0].id
    };
  }
}
class $2 extends Ci {
  shouldComponentUpdate(e) {
    for (let t in e)
      if (t != "children" && e[t] != this.props[t])
        return !0;
    return !1;
  }
  render() {
    return this.props.children;
  }
}
const fr = {
  rowsPerRender: 10
};
class N2 extends We {
  getInitialState(e = this.props) {
    return {
      skin: vt.get("skin") || e.skin,
      theme: this.initTheme(e.theme)
    };
  }
  componentWillMount() {
    this.dir = te.rtl ? "rtl" : "ltr", this.refs = {
      menu: Ye(),
      navigation: Ye(),
      scroll: Ye(),
      search: Ye(),
      searchInput: Ye(),
      skinToneButton: Ye(),
      skinToneRadio: Ye()
    }, this.initGrid(), this.props.stickySearch == !1 && this.props.searchPosition == "sticky" && (console.warn("[EmojiMart] Deprecation warning: `stickySearch` has been renamed `searchPosition`."), this.props.searchPosition = "static");
  }
  componentDidMount() {
    if (this.register(), this.shadowRoot = this.base.parentNode, this.props.autoFocus) {
      const { searchInput: e } = this.refs;
      e.current && e.current.focus();
    }
  }
  componentWillReceiveProps(e) {
    this.nextState || (this.nextState = {});
    for (const t in e)
      this.nextState[t] = e[t];
    clearTimeout(this.nextStateTimer), this.nextStateTimer = setTimeout(() => {
      let t = !1;
      for (const i in this.nextState)
        this.props[i] = this.nextState[i], (i === "custom" || i === "categories") && (t = !0);
      delete this.nextState;
      const r = this.getInitialState();
      if (t)
        return this.reset(r);
      this.setState(r);
    });
  }
  componentWillUnmount() {
    this.unregister();
  }
  async reset(e = {}) {
    await Ki(this.props), this.initGrid(), this.unobserve(), this.setState(e, () => {
      this.observeCategories(), this.observeRows();
    });
  }
  register() {
    document.addEventListener("click", this.handleClickOutside), this.observe();
  }
  unregister() {
    document.removeEventListener("click", this.handleClickOutside), this.unobserve();
  }
  observe() {
    this.observeCategories(), this.observeRows();
  }
  unobserve({ except: e = [] } = {}) {
    Array.isArray(e) || (e = [
      e
    ]);
    for (const t of this.observers)
      e.includes(t) || t.disconnect();
    this.observers = [].concat(e);
  }
  initGrid() {
    const { categories: e } = P;
    this.refs.categories = /* @__PURE__ */ new Map();
    const t = P.categories.map((i) => i.id).join(",");
    this.navKey && this.navKey != t && this.refs.scroll.current && (this.refs.scroll.current.scrollTop = 0), this.navKey = t, this.grid = [], this.grid.setsize = 0;
    const r = (i, s) => {
      const o = [];
      o.__categoryId = s.id, o.__index = i.length, this.grid.push(o);
      const l = this.grid.length - 1, a = l % fr.rowsPerRender ? {} : Ye();
      return a.index = l, a.posinset = this.grid.setsize + 1, i.push(a), o;
    };
    for (let i of e) {
      const s = [];
      let o = r(s, i);
      for (let l of i.emojis)
        o.length == this.getPerLine() && (o = r(s, i)), this.grid.setsize += 1, o.push(l);
      this.refs.categories.set(i.id, {
        root: Ye(),
        rows: s
      });
    }
  }
  initTheme(e) {
    if (e != "auto")
      return e;
    if (!this.darkMedia) {
      if (this.darkMedia = matchMedia("(prefers-color-scheme: dark)"), this.darkMedia.media.match(/^not/))
        return "light";
      this.darkMedia.addListener(() => {
        this.props.theme == "auto" && this.setState({
          theme: this.darkMedia.matches ? "dark" : "light"
        });
      });
    }
    return this.darkMedia.matches ? "dark" : "light";
  }
  initDynamicPerLine(e = this.props) {
    if (!e.dynamicWidth)
      return;
    const { element: t, emojiButtonSize: r } = e, i = () => {
      const { width: o } = t.getBoundingClientRect();
      return Math.floor(o / r);
    }, s = new ResizeObserver(() => {
      this.unobserve({
        except: s
      }), this.setState({
        perLine: i()
      }, () => {
        this.initGrid(), this.forceUpdate(() => {
          this.observeCategories(), this.observeRows();
        });
      });
    });
    return s.observe(t), this.observers.push(s), i();
  }
  getPerLine() {
    return this.state.perLine || this.props.perLine;
  }
  getEmojiByPos([e, t]) {
    const r = this.state.searchResults || this.grid, i = r[e] && r[e][t];
    if (!!i)
      return hn.get(i);
  }
  observeCategories() {
    const e = this.refs.navigation.current;
    if (!e)
      return;
    const t = /* @__PURE__ */ new Map(), r = (o) => {
      o != e.state.categoryId && e.setState({
        categoryId: o
      });
    }, i = {
      root: this.refs.scroll.current,
      threshold: [
        0,
        1
      ]
    }, s = new IntersectionObserver((o) => {
      for (const a of o) {
        const c = a.target.dataset.id;
        t.set(c, a.intersectionRatio);
      }
      const l = [
        ...t
      ];
      for (const [a, c] of l)
        if (c) {
          r(a);
          break;
        }
    }, i);
    for (const { root: o } of this.refs.categories.values())
      s.observe(o.current);
    this.observers.push(s);
  }
  observeRows() {
    const e = {
      ...this.state.visibleRows
    }, t = new IntersectionObserver((r) => {
      for (const i of r) {
        const s = parseInt(i.target.dataset.index);
        i.isIntersecting ? e[s] = !0 : delete e[s];
      }
      this.setState({
        visibleRows: e
      });
    }, {
      root: this.refs.scroll.current,
      rootMargin: `${this.props.emojiButtonSize * (fr.rowsPerRender + 5)}px 0px ${this.props.emojiButtonSize * fr.rowsPerRender}px`
    });
    for (const { rows: r } of this.refs.categories.values())
      for (const i of r)
        i.current && t.observe(i.current);
    this.observers.push(t);
  }
  preventDefault(e) {
    e.preventDefault();
  }
  unfocusSearch() {
    const e = this.refs.searchInput.current;
    !e || e.blur();
  }
  navigate({ e, input: t, left: r, right: i, up: s, down: o }) {
    const l = this.state.searchResults || this.grid;
    if (!l.length)
      return;
    let [a, c] = this.state.pos;
    const d = (() => {
      if (a == 0 && c == 0 && !e.repeat && (r || s))
        return null;
      if (a == -1)
        return !e.repeat && (i || o) && t.selectionStart == t.value.length ? [
          0,
          0
        ] : null;
      if (r || i) {
        let u = l[a];
        const h = r ? -1 : 1;
        if (c += h, !u[c]) {
          if (a += h, u = l[a], !u)
            return a = r ? 0 : l.length - 1, c = r ? 0 : l[a].length - 1, [
              a,
              c
            ];
          c = r ? u.length - 1 : 0;
        }
        return [
          a,
          c
        ];
      }
      if (s || o) {
        a += s ? -1 : 1;
        const u = l[a];
        return u ? (u[c] || (c = u.length - 1), [
          a,
          c
        ]) : (a = s ? 0 : l.length - 1, c = s ? 0 : l[a].length - 1, [
          a,
          c
        ]);
      }
    })();
    if (d)
      e.preventDefault();
    else {
      this.state.pos[0] > -1 && this.setState({
        pos: [
          -1,
          -1
        ]
      });
      return;
    }
    this.setState({
      pos: d,
      keyboard: !0
    }, () => {
      this.scrollTo({
        row: d[0]
      });
    });
  }
  scrollTo({ categoryId: e, row: t }) {
    const r = this.state.searchResults || this.grid;
    if (!r.length)
      return;
    const i = this.refs.scroll.current, s = i.getBoundingClientRect();
    let o = 0;
    if (t >= 0 && (e = r[t].__categoryId), e && (o = (this.refs[e] || this.refs.categories.get(e).root).current.getBoundingClientRect().top - (s.top - i.scrollTop) + 1), t >= 0)
      if (!t)
        o = 0;
      else {
        const l = r[t].__index, a = o + l * this.props.emojiButtonSize, c = a + this.props.emojiButtonSize + this.props.emojiButtonSize * 0.88;
        if (a < i.scrollTop)
          o = a;
        else if (c > i.scrollTop + s.height)
          o = c - s.height;
        else
          return;
      }
    this.ignoreMouse(), i.scrollTop = o;
  }
  ignoreMouse() {
    this.mouseIsIgnored = !0, clearTimeout(this.ignoreMouseTimer), this.ignoreMouseTimer = setTimeout(() => {
      delete this.mouseIsIgnored;
    }, 100);
  }
  handleEmojiOver(e) {
    this.mouseIsIgnored || this.state.showSkins || this.setState({
      pos: e || [
        -1,
        -1
      ],
      keyboard: !1
    });
  }
  handleEmojiClick({ e, emoji: t, pos: r }) {
    if (!!this.props.onEmojiSelect && (!t && r && (t = this.getEmojiByPos(r)), t)) {
      const i = p2(t, {
        skinIndex: this.state.skin - 1
      });
      this.props.maxFrequentRows && cu.add(i, this.props), this.props.onEmojiSelect(i, e);
    }
  }
  closeSkins() {
    !this.state.showSkins || (this.setState({
      showSkins: null,
      tempSkin: null
    }), this.base.removeEventListener("click", this.handleBaseClick), this.base.removeEventListener("keydown", this.handleBaseKeydown));
  }
  handleSkinMouseOver(e) {
    this.setState({
      tempSkin: e
    });
  }
  handleSkinClick(e) {
    this.ignoreMouse(), this.closeSkins(), this.setState({
      skin: e,
      tempSkin: null
    }), vt.set("skin", e);
  }
  renderNav() {
    return /* @__PURE__ */ y(O2, {
      ref: this.refs.navigation,
      icons: this.props.icons,
      theme: this.state.theme,
      dir: this.dir,
      unfocused: !!this.state.searchResults,
      position: this.props.navPosition,
      onClick: this.handleCategoryClick
    }, this.navKey);
  }
  renderPreview() {
    const e = this.getEmojiByPos(this.state.pos), t = this.state.searchResults && !this.state.searchResults.length;
    return /* @__PURE__ */ y("div", {
      id: "preview",
      class: "flex flex-middle",
      dir: this.dir,
      "data-position": this.props.previewPosition,
      children: [
        /* @__PURE__ */ y("div", {
          class: "flex flex-middle flex-grow",
          children: [
            /* @__PURE__ */ y("div", {
              class: "flex flex-auto flex-middle flex-center",
              style: {
                height: this.props.emojiButtonSize,
                fontSize: this.props.emojiButtonSize
              },
              children: /* @__PURE__ */ y(fo, {
                emoji: e,
                id: t ? this.props.noResultsEmoji || "cry" : this.props.previewEmoji || (this.props.previewPosition == "top" ? "point_down" : "point_up"),
                set: this.props.set,
                size: this.props.emojiButtonSize,
                skin: this.state.tempSkin || this.state.skin,
                spritesheet: !0,
                getSpritesheetURL: this.props.getSpritesheetURL
              })
            }),
            /* @__PURE__ */ y("div", {
              class: `margin-${this.dir[0]}`,
              children: e || t ? /* @__PURE__ */ y("div", {
                class: `padding-${this.dir[2]} align-${this.dir[0]}`,
                children: [
                  /* @__PURE__ */ y("div", {
                    class: "preview-title ellipsis",
                    children: e ? e.name : te.search_no_results_1
                  }),
                  /* @__PURE__ */ y("div", {
                    class: "preview-subtitle ellipsis color-c",
                    children: e ? e.skins[0].shortcodes : te.search_no_results_2
                  })
                ]
              }) : /* @__PURE__ */ y("div", {
                class: "preview-placeholder color-c",
                children: te.pick
              })
            })
          ]
        }),
        !e && this.props.skinTonePosition == "preview" && this.renderSkinToneButton()
      ]
    });
  }
  renderEmojiButton(e, { pos: t, posinset: r, grid: i }) {
    const s = this.props.emojiButtonSize, o = this.state.tempSkin || this.state.skin, a = (e.skins[o - 1] || e.skins[0]).native, c = h2(this.state.pos, t), d = t.concat(e.id).join("");
    return /* @__PURE__ */ y($2, {
      selected: c,
      skin: o,
      size: s,
      children: /* @__PURE__ */ y("button", {
        "aria-label": a,
        "aria-selected": c || void 0,
        "aria-posinset": r,
        "aria-setsize": i.setsize,
        "data-keyboard": this.state.keyboard,
        title: this.props.previewPosition == "none" ? e.name : void 0,
        type: "button",
        class: "flex flex-center flex-middle",
        tabindex: "-1",
        onClick: (u) => this.handleEmojiClick({
          e: u,
          emoji: e
        }),
        onMouseEnter: () => this.handleEmojiOver(t),
        onMouseLeave: () => this.handleEmojiOver(),
        style: {
          width: this.props.emojiButtonSize,
          height: this.props.emojiButtonSize,
          fontSize: this.props.emojiSize,
          lineHeight: 0
        },
        children: [
          /* @__PURE__ */ y("div", {
            "aria-hidden": "true",
            class: "background",
            style: {
              borderRadius: this.props.emojiButtonRadius,
              backgroundColor: this.props.emojiButtonColors ? this.props.emojiButtonColors[(r - 1) % this.props.emojiButtonColors.length] : void 0
            }
          }),
          /* @__PURE__ */ y(fo, {
            emoji: e,
            set: this.props.set,
            size: this.props.emojiSize,
            skin: o,
            spritesheet: !0,
            getSpritesheetURL: this.props.getSpritesheetURL
          })
        ]
      })
    }, d);
  }
  renderSearch() {
    const e = this.props.previewPosition == "none" || this.props.skinTonePosition == "search";
    return /* @__PURE__ */ y("div", {
      children: [
        /* @__PURE__ */ y("div", {
          class: "spacer"
        }),
        /* @__PURE__ */ y("div", {
          class: "flex flex-middle",
          children: [
            /* @__PURE__ */ y("div", {
              class: "search relative flex-grow",
              children: [
                /* @__PURE__ */ y("input", {
                  type: "search",
                  ref: this.refs.searchInput,
                  placeholder: te.search,
                  onClick: this.handleSearchClick,
                  onInput: this.handleSearchInput,
                  onKeyDown: this.handleSearchKeyDown,
                  autoComplete: "off"
                }),
                /* @__PURE__ */ y("span", {
                  class: "icon loupe flex",
                  children: wi.search.loupe
                }),
                this.state.searchResults && /* @__PURE__ */ y("button", {
                  title: "Clear",
                  "aria-label": "Clear",
                  type: "button",
                  class: "icon delete flex",
                  onClick: this.clearSearch,
                  onMouseDown: this.preventDefault,
                  children: wi.search.delete
                })
              ]
            }),
            e && this.renderSkinToneButton()
          ]
        })
      ]
    });
  }
  renderSearchResults() {
    const { searchResults: e } = this.state;
    return e ? /* @__PURE__ */ y("div", {
      class: "category",
      ref: this.refs.search,
      children: [
        /* @__PURE__ */ y("div", {
          class: `sticky padding-small align-${this.dir[0]}`,
          children: te.categories.search
        }),
        /* @__PURE__ */ y("div", {
          children: e.length ? e.map((t, r) => /* @__PURE__ */ y("div", {
            class: "flex",
            children: t.map((i, s) => this.renderEmojiButton(i, {
              pos: [
                r,
                s
              ],
              posinset: r * this.props.perLine + s + 1,
              grid: e
            }))
          })) : /* @__PURE__ */ y("div", {
            class: `padding-small align-${this.dir[0]}`,
            children: this.props.onAddCustomEmoji && /* @__PURE__ */ y("a", {
              onClick: this.props.onAddCustomEmoji,
              children: te.add_custom
            })
          })
        })
      ]
    }) : null;
  }
  renderCategories() {
    const { categories: e } = P, t = !!this.state.searchResults, r = this.getPerLine();
    return /* @__PURE__ */ y("div", {
      style: {
        visibility: t ? "hidden" : void 0,
        display: t ? "none" : void 0,
        height: "100%"
      },
      children: e.map((i) => {
        const { root: s, rows: o } = this.refs.categories.get(i.id);
        return /* @__PURE__ */ y("div", {
          "data-id": i.target ? i.target.id : i.id,
          class: "category",
          ref: s,
          children: [
            /* @__PURE__ */ y("div", {
              class: `sticky padding-small align-${this.dir[0]}`,
              children: i.name || te.categories[i.id]
            }),
            /* @__PURE__ */ y("div", {
              class: "relative",
              style: {
                height: o.length * this.props.emojiButtonSize
              },
              children: o.map((l, a) => {
                const c = l.index - l.index % fr.rowsPerRender, d = this.state.visibleRows[c], u = "current" in l ? l : void 0;
                if (!d && !u)
                  return null;
                const h = a * r, f = h + r, p = i.emojis.slice(h, f);
                return p.length < r && p.push(...new Array(r - p.length)), /* @__PURE__ */ y("div", {
                  "data-index": l.index,
                  ref: u,
                  class: "flex row",
                  style: {
                    top: a * this.props.emojiButtonSize
                  },
                  children: d && p.map((m, g) => {
                    if (!m)
                      return /* @__PURE__ */ y("div", {
                        style: {
                          width: this.props.emojiButtonSize,
                          height: this.props.emojiButtonSize
                        }
                      });
                    const b = hn.get(m);
                    return this.renderEmojiButton(b, {
                      pos: [
                        l.index,
                        g
                      ],
                      posinset: l.posinset + g,
                      grid: this.grid
                    });
                  })
                }, l.index);
              })
            })
          ]
        });
      })
    });
  }
  renderSkinToneButton() {
    return this.props.skinTonePosition == "none" ? null : /* @__PURE__ */ y("div", {
      class: "flex flex-auto flex-center flex-middle",
      style: {
        position: "relative",
        width: this.props.emojiButtonSize,
        height: this.props.emojiButtonSize
      },
      children: /* @__PURE__ */ y("button", {
        type: "button",
        ref: this.refs.skinToneButton,
        class: "skin-tone-button flex flex-auto flex-center flex-middle",
        "aria-selected": this.state.showSkins ? "" : void 0,
        "aria-label": te.skins.choose,
        title: te.skins.choose,
        onClick: this.openSkins,
        style: {
          width: this.props.emojiSize,
          height: this.props.emojiSize
        },
        children: /* @__PURE__ */ y("span", {
          class: `skin-tone skin-tone-${this.state.skin}`
        })
      })
    });
  }
  renderLiveRegion() {
    const e = this.getEmojiByPos(this.state.pos), t = e ? e.name : "";
    return /* @__PURE__ */ y("div", {
      "aria-live": "polite",
      class: "sr-only",
      children: t
    });
  }
  renderSkins() {
    const t = this.refs.skinToneButton.current.getBoundingClientRect(), r = this.base.getBoundingClientRect(), i = {};
    return this.dir == "ltr" ? i.right = r.right - t.right - 3 : i.left = t.left - r.left - 3, this.props.previewPosition == "bottom" && this.props.skinTonePosition == "preview" ? i.bottom = r.bottom - t.top + 6 : (i.top = t.bottom - r.top + 3, i.bottom = "auto"), /* @__PURE__ */ y("div", {
      ref: this.refs.menu,
      role: "radiogroup",
      dir: this.dir,
      "aria-label": te.skins.choose,
      class: "menu hidden",
      "data-position": i.top ? "top" : "bottom",
      style: i,
      children: [
        ...Array(6).keys()
      ].map((s) => {
        const o = s + 1, l = this.state.skin == o;
        return /* @__PURE__ */ y("div", {
          children: [
            /* @__PURE__ */ y("input", {
              type: "radio",
              name: "skin-tone",
              value: o,
              "aria-label": te.skins[o],
              ref: l ? this.refs.skinToneRadio : null,
              defaultChecked: l,
              onChange: () => this.handleSkinMouseOver(o),
              onKeyDown: (a) => {
                (a.code == "Enter" || a.code == "Space" || a.code == "Tab") && (a.preventDefault(), this.handleSkinClick(o));
              }
            }),
            /* @__PURE__ */ y("button", {
              "aria-hidden": "true",
              tabindex: "-1",
              onClick: () => this.handleSkinClick(o),
              onMouseEnter: () => this.handleSkinMouseOver(o),
              onMouseLeave: () => this.handleSkinMouseOver(),
              class: "option flex flex-grow flex-middle",
              children: [
                /* @__PURE__ */ y("span", {
                  class: `skin-tone skin-tone-${o}`
                }),
                /* @__PURE__ */ y("span", {
                  class: "margin-small-lr",
                  children: te.skins[o]
                })
              ]
            })
          ]
        });
      })
    });
  }
  render() {
    const e = this.props.perLine * this.props.emojiButtonSize;
    return /* @__PURE__ */ y("section", {
      id: "root",
      class: "flex flex-column",
      dir: this.dir,
      style: {
        width: this.props.dynamicWidth ? "100%" : `calc(${e}px + (var(--padding) + var(--sidebar-width)))`
      },
      "data-emoji-set": this.props.set,
      "data-theme": this.state.theme,
      "data-menu": this.state.showSkins ? "" : void 0,
      children: [
        this.props.previewPosition == "top" && this.renderPreview(),
        this.props.navPosition == "top" && this.renderNav(),
        this.props.searchPosition == "sticky" && /* @__PURE__ */ y("div", {
          class: "padding-lr",
          children: this.renderSearch()
        }),
        /* @__PURE__ */ y("div", {
          ref: this.refs.scroll,
          class: "scroll flex-grow padding-lr",
          children: /* @__PURE__ */ y("div", {
            style: {
              width: this.props.dynamicWidth ? "100%" : e,
              height: "100%"
            },
            children: [
              this.props.searchPosition == "static" && this.renderSearch(),
              this.renderSearchResults(),
              this.renderCategories()
            ]
          })
        }),
        this.props.navPosition == "bottom" && this.renderNav(),
        this.props.previewPosition == "bottom" && this.renderPreview(),
        this.state.showSkins && this.renderSkins(),
        this.renderLiveRegion()
      ]
    });
  }
  constructor(e) {
    super(), Oe(this, "handleClickOutside", (t) => {
      const { element: r } = this.props;
      t.target != r && (this.state.showSkins && this.closeSkins(), this.props.onClickOutside && this.props.onClickOutside(t));
    }), Oe(this, "handleBaseClick", (t) => {
      !this.state.showSkins || t.target.closest(".menu") || (t.preventDefault(), t.stopImmediatePropagation(), this.closeSkins());
    }), Oe(this, "handleBaseKeydown", (t) => {
      !this.state.showSkins || t.key == "Escape" && (t.preventDefault(), t.stopImmediatePropagation(), this.closeSkins());
    }), Oe(this, "handleSearchClick", () => {
      !this.getEmojiByPos(this.state.pos) || this.setState({
        pos: [
          -1,
          -1
        ]
      });
    }), Oe(this, "handleSearchInput", async () => {
      const t = this.refs.searchInput.current;
      if (!t)
        return;
      const { value: r } = t, i = await hn.search(r), s = () => {
        !this.refs.scroll.current || (this.refs.scroll.current.scrollTop = 0);
      };
      if (!i)
        return this.setState({
          searchResults: i,
          pos: [
            -1,
            -1
          ]
        }, s);
      const o = t.selectionStart == t.value.length ? [
        0,
        0
      ] : [
        -1,
        -1
      ], l = [];
      l.setsize = i.length;
      let a = null;
      for (let c of i)
        (!l.length || a.length == this.getPerLine()) && (a = [], a.__categoryId = "search", a.__index = l.length, l.push(a)), a.push(c);
      this.ignoreMouse(), this.setState({
        searchResults: l,
        pos: o
      }, s);
    }), Oe(this, "handleSearchKeyDown", (t) => {
      const r = t.currentTarget;
      switch (t.stopImmediatePropagation(), t.key) {
        case "ArrowLeft":
          this.navigate({
            e: t,
            input: r,
            left: !0
          });
          break;
        case "ArrowRight":
          this.navigate({
            e: t,
            input: r,
            right: !0
          });
          break;
        case "ArrowUp":
          this.navigate({
            e: t,
            input: r,
            up: !0
          });
          break;
        case "ArrowDown":
          this.navigate({
            e: t,
            input: r,
            down: !0
          });
          break;
        case "Enter":
          t.preventDefault(), this.handleEmojiClick({
            e: t,
            pos: this.state.pos
          });
          break;
        case "Escape":
          t.preventDefault(), this.state.searchResults ? this.clearSearch() : this.unfocusSearch();
          break;
      }
    }), Oe(this, "clearSearch", () => {
      const t = this.refs.searchInput.current;
      !t || (t.value = "", t.focus(), this.handleSearchInput());
    }), Oe(this, "handleCategoryClick", ({ category: t, i: r }) => {
      this.scrollTo(r == 0 ? {
        row: -1
      } : {
        categoryId: t.id
      });
    }), Oe(this, "openSkins", (t) => {
      const { currentTarget: r } = t, i = r.getBoundingClientRect();
      this.setState({
        showSkins: i
      }, async () => {
        await f2(2);
        const s = this.refs.menu.current;
        !s || (s.classList.remove("hidden"), this.refs.skinToneRadio.current.focus(), this.base.addEventListener("click", this.handleBaseClick, !0), this.base.addEventListener("keydown", this.handleBaseKeydown, !0));
      });
    }), this.observers = [], this.state = {
      pos: [
        -1,
        -1
      ],
      perLine: this.initDynamicPerLine(e),
      visibleRows: {
        0: !0
      },
      ...this.getInitialState(e)
    };
  }
}
class Go extends y2 {
  async connectedCallback() {
    const e = fu(this.props, et, this);
    e.element = this, e.ref = (t) => {
      this.component = t;
    }, await Ki(e), !this.disconnected && lu(/* @__PURE__ */ y(N2, {
      ...e
    }), this.shadowRoot);
  }
  constructor(e) {
    super(e, {
      styles: /* @__PURE__ */ Gd(vu)
    });
  }
}
Oe(Go, "Props", et);
typeof customElements < "u" && !customElements.get("em-emoji-picker") && customElements.define("em-emoji-picker", Go);
var vu = {};
vu = `:host {
  width: min-content;
  height: 435px;
  min-height: 230px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  --border-radius: 10px;
  --category-icon-size: 18px;
  --font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  --font-size: 15px;
  --preview-placeholder-size: 21px;
  --preview-title-size: 1.1em;
  --preview-subtitle-size: .9em;
  --shadow-color: 0deg 0% 0%;
  --shadow: .3px .5px 2.7px hsl(var(--shadow-color) / .14), .4px .8px 1px -3.2px hsl(var(--shadow-color) / .14), 1px 2px 2.5px -4.5px hsl(var(--shadow-color) / .14);
  display: flex;
}

[data-theme="light"] {
  --em-rgb-color: var(--rgb-color, 34, 36, 39);
  --em-rgb-accent: var(--rgb-accent, 34, 102, 237);
  --em-rgb-background: var(--rgb-background, 255, 255, 255);
  --em-rgb-input: var(--rgb-input, 255, 255, 255);
  --em-color-border: var(--color-border, rgba(0, 0, 0, .05));
  --em-color-border-over: var(--color-border-over, rgba(0, 0, 0, .1));
}

[data-theme="dark"] {
  --em-rgb-color: var(--rgb-color, 222, 222, 221);
  --em-rgb-accent: var(--rgb-accent, 58, 130, 247);
  --em-rgb-background: var(--rgb-background, 21, 22, 23);
  --em-rgb-input: var(--rgb-input, 0, 0, 0);
  --em-color-border: var(--color-border, rgba(255, 255, 255, .1));
  --em-color-border-over: var(--color-border-over, rgba(255, 255, 255, .2));
}

#root {
  --color-a: rgb(var(--em-rgb-color));
  --color-b: rgba(var(--em-rgb-color), .65);
  --color-c: rgba(var(--em-rgb-color), .45);
  --padding: 12px;
  --padding-small: calc(var(--padding) / 2);
  --sidebar-width: 16px;
  --duration: 225ms;
  --duration-fast: 125ms;
  --duration-instant: 50ms;
  --easing: cubic-bezier(.4, 0, .2, 1);
  width: 100%;
  text-align: left;
  border-radius: var(--border-radius);
  background-color: rgb(var(--em-rgb-background));
  position: relative;
}

@media (prefers-reduced-motion) {
  #root {
    --duration: 0;
    --duration-fast: 0;
    --duration-instant: 0;
  }
}

#root[data-menu] button {
  cursor: auto;
}

#root[data-menu] .menu button {
  cursor: pointer;
}

:host, #root, input, button {
  color: rgb(var(--em-rgb-color));
  font-family: var(--font-family);
  font-size: var(--font-size);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: normal;
}

*, :before, :after {
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.relative {
  position: relative;
}

.flex {
  display: flex;
}

.flex-auto {
  flex: none;
}

.flex-center {
  justify-content: center;
}

.flex-column {
  flex-direction: column;
}

.flex-grow {
  flex: auto;
}

.flex-middle {
  align-items: center;
}

.flex-wrap {
  flex-wrap: wrap;
}

.padding {
  padding: var(--padding);
}

.padding-t {
  padding-top: var(--padding);
}

.padding-lr {
  padding-left: var(--padding);
  padding-right: var(--padding);
}

.padding-r {
  padding-right: var(--padding);
}

.padding-small {
  padding: var(--padding-small);
}

.padding-small-b {
  padding-bottom: var(--padding-small);
}

.padding-small-lr {
  padding-left: var(--padding-small);
  padding-right: var(--padding-small);
}

.margin {
  margin: var(--padding);
}

.margin-r {
  margin-right: var(--padding);
}

.margin-l {
  margin-left: var(--padding);
}

.margin-small-l {
  margin-left: var(--padding-small);
}

.margin-small-lr {
  margin-left: var(--padding-small);
  margin-right: var(--padding-small);
}

.align-l {
  text-align: left;
}

.align-r {
  text-align: right;
}

.color-a {
  color: var(--color-a);
}

.color-b {
  color: var(--color-b);
}

.color-c {
  color: var(--color-c);
}

.ellipsis {
  white-space: nowrap;
  max-width: 100%;
  width: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}

.sr-only {
  width: 1px;
  height: 1px;
  position: absolute;
  top: auto;
  left: -10000px;
  overflow: hidden;
}

a {
  cursor: pointer;
  color: rgb(var(--em-rgb-accent));
}

a:hover {
  text-decoration: underline;
}

.spacer {
  height: 10px;
}

[dir="rtl"] .scroll {
  padding-left: 0;
  padding-right: var(--padding);
}

.scroll {
  padding-right: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.scroll::-webkit-scrollbar {
  width: var(--sidebar-width);
  height: var(--sidebar-width);
}

.scroll::-webkit-scrollbar-track {
  border: 0;
}

.scroll::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.scroll::-webkit-scrollbar-corner {
  background-color: rgba(0, 0, 0, 0);
}

.scroll::-webkit-scrollbar-thumb {
  min-height: 20%;
  min-height: 65px;
  border: 4px solid rgb(var(--em-rgb-background));
  border-radius: 8px;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--em-color-border-over) !important;
}

.scroll:hover::-webkit-scrollbar-thumb {
  background-color: var(--em-color-border);
}

.sticky {
  z-index: 1;
  background-color: rgba(var(--em-rgb-background), .9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  font-weight: 500;
  position: sticky;
  top: -1px;
}

[dir="rtl"] .search input[type="search"] {
  padding: 10px 2.2em 10px 2em;
}

[dir="rtl"] .search .loupe {
  left: auto;
  right: .7em;
}

[dir="rtl"] .search .delete {
  left: .7em;
  right: auto;
}

.search {
  z-index: 2;
  position: relative;
}

.search input, .search button {
  font-size: calc(var(--font-size)  - 1px);
}

.search input[type="search"] {
  width: 100%;
  background-color: var(--em-color-border);
  transition-duration: var(--duration);
  transition-property: background-color, box-shadow;
  transition-timing-function: var(--easing);
  border: 0;
  border-radius: 10px;
  outline: 0;
  padding: 10px 2em 10px 2.2em;
  display: block;
}

.search input[type="search"]::-ms-input-placeholder {
  color: inherit;
  opacity: .6;
}

.search input[type="search"]::placeholder {
  color: inherit;
  opacity: .6;
}

.search input[type="search"], .search input[type="search"]::-webkit-search-decoration, .search input[type="search"]::-webkit-search-cancel-button, .search input[type="search"]::-webkit-search-results-button, .search input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
}

.search input[type="search"]:focus {
  background-color: rgb(var(--em-rgb-input));
  box-shadow: inset 0 0 0 1px rgb(var(--em-rgb-accent)), 0 1px 3px rgba(65, 69, 73, .2);
}

.search .icon {
  z-index: 1;
  color: rgba(var(--em-rgb-color), .7);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.search .loupe {
  pointer-events: none;
  left: .7em;
}

.search .delete {
  right: .7em;
}

svg {
  fill: currentColor;
  width: 1em;
  height: 1em;
}

button {
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
  cursor: pointer;
  color: currentColor;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}

#nav {
  z-index: 2;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: var(--sidebar-width);
  position: relative;
}

#nav button {
  color: var(--color-b);
  transition: color var(--duration) var(--easing);
}

#nav button:hover {
  color: var(--color-a);
}

#nav svg, #nav img {
  width: var(--category-icon-size);
  height: var(--category-icon-size);
}

#nav[dir="rtl"] .bar {
  left: auto;
  right: 0;
}

#nav .bar {
  width: 100%;
  height: 3px;
  background-color: rgb(var(--em-rgb-accent));
  transition: transform var(--duration) var(--easing);
  border-radius: 3px 3px 0 0;
  position: absolute;
  bottom: -12px;
  left: 0;
}

#nav button[aria-selected] {
  color: rgb(var(--em-rgb-accent));
}

#preview {
  z-index: 2;
  padding: calc(var(--padding)  + 4px) var(--padding);
  padding-right: var(--sidebar-width);
  position: relative;
}

#preview .preview-placeholder {
  font-size: var(--preview-placeholder-size);
}

#preview .preview-title {
  font-size: var(--preview-title-size);
}

#preview .preview-subtitle {
  font-size: var(--preview-subtitle-size);
}

#nav:before, #preview:before {
  content: "";
  height: 2px;
  position: absolute;
  left: 0;
  right: 0;
}

#nav[data-position="top"]:before, #preview[data-position="top"]:before {
  background: linear-gradient(to bottom, var(--em-color-border), transparent);
  top: 100%;
}

#nav[data-position="bottom"]:before, #preview[data-position="bottom"]:before {
  background: linear-gradient(to top, var(--em-color-border), transparent);
  bottom: 100%;
}

.category:last-child {
  min-height: calc(100% + 1px);
}

.category button {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;
  position: relative;
}

.category button > * {
  position: relative;
}

.category button .background {
  opacity: 0;
  background-color: var(--em-color-border);
  transition: opacity var(--duration-fast) var(--easing) var(--duration-instant);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.category button:hover .background {
  transition-duration: var(--duration-instant);
  transition-delay: 0s;
}

.category button[aria-selected] .background {
  opacity: 1;
}

.category button[data-keyboard] .background {
  transition: none;
}

.row {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.skin-tone-button {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 100%;
}

.skin-tone-button:hover {
  border-color: var(--em-color-border);
}

.skin-tone-button:active .skin-tone {
  transform: scale(.85) !important;
}

.skin-tone-button .skin-tone {
  transition: transform var(--duration) var(--easing);
}

.skin-tone-button[aria-selected] {
  background-color: var(--em-color-border);
  border-top-color: rgba(0, 0, 0, .05);
  border-bottom-color: rgba(0, 0, 0, 0);
  border-left-width: 0;
  border-right-width: 0;
}

.skin-tone-button[aria-selected] .skin-tone {
  transform: scale(.9);
}

.menu {
  z-index: 2;
  white-space: nowrap;
  border: 1px solid var(--em-color-border);
  background-color: rgba(var(--em-rgb-background), .9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  transition-property: opacity, transform;
  transition-duration: var(--duration);
  transition-timing-function: var(--easing);
  border-radius: 10px;
  padding: 4px;
  position: absolute;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .05);
}

.menu.hidden {
  opacity: 0;
}

.menu[data-position="bottom"] {
  transform-origin: 100% 100%;
}

.menu[data-position="bottom"].hidden {
  transform: scale(.9)rotate(-3deg)translateY(5%);
}

.menu[data-position="top"] {
  transform-origin: 100% 0;
}

.menu[data-position="top"].hidden {
  transform: scale(.9)rotate(3deg)translateY(-5%);
}

.menu input[type="radio"] {
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  border: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  overflow: hidden;
}

.menu input[type="radio"]:checked + .option {
  box-shadow: 0 0 0 2px rgb(var(--em-rgb-accent));
}

.option {
  width: 100%;
  border-radius: 6px;
  padding: 4px 6px;
}

.option:hover {
  color: #fff;
  background-color: rgb(var(--em-rgb-accent));
}

.skin-tone {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.skin-tone:after {
  content: "";
  mix-blend-mode: overlay;
  background: linear-gradient(rgba(255, 255, 255, .2), rgba(0, 0, 0, 0));
  border: 1px solid rgba(0, 0, 0, .8);
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0 -2px 3px #000, inset 0 1px 2px #fff;
}

.skin-tone-1 {
  background-color: #ffc93a;
}

.skin-tone-2 {
  background-color: #ffdab7;
}

.skin-tone-3 {
  background-color: #e7b98f;
}

.skin-tone-4 {
  background-color: #c88c61;
}

.skin-tone-5 {
  background-color: #a46134;
}

.skin-tone-6 {
  background-color: #5d4437;
}

[data-index] {
  justify-content: space-between;
}

[data-emoji-set="twitter"] .skin-tone:after {
  box-shadow: none;
  border-color: rgba(0, 0, 0, .5);
}

[data-emoji-set="twitter"] .skin-tone-1 {
  background-color: #fade72;
}

[data-emoji-set="twitter"] .skin-tone-2 {
  background-color: #f3dfd0;
}

[data-emoji-set="twitter"] .skin-tone-3 {
  background-color: #eed3a8;
}

[data-emoji-set="twitter"] .skin-tone-4 {
  background-color: #cfad8d;
}

[data-emoji-set="twitter"] .skin-tone-5 {
  background-color: #a8805d;
}

[data-emoji-set="twitter"] .skin-tone-6 {
  background-color: #765542;
}

[data-emoji-set="google"] .skin-tone:after {
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, .4);
}

[data-emoji-set="google"] .skin-tone-1 {
  background-color: #f5c748;
}

[data-emoji-set="google"] .skin-tone-2 {
  background-color: #f1d5aa;
}

[data-emoji-set="google"] .skin-tone-3 {
  background-color: #d4b48d;
}

[data-emoji-set="google"] .skin-tone-4 {
  background-color: #aa876b;
}

[data-emoji-set="google"] .skin-tone-5 {
  background-color: #916544;
}

[data-emoji-set="google"] .skin-tone-6 {
  background-color: #61493f;
}

[data-emoji-set="facebook"] .skin-tone:after {
  border-color: rgba(0, 0, 0, .4);
  box-shadow: inset 0 -2px 3px #000, inset 0 1px 4px #fff;
}

[data-emoji-set="facebook"] .skin-tone-1 {
  background-color: #f5c748;
}

[data-emoji-set="facebook"] .skin-tone-2 {
  background-color: #f1d5aa;
}

[data-emoji-set="facebook"] .skin-tone-3 {
  background-color: #d4b48d;
}

[data-emoji-set="facebook"] .skin-tone-4 {
  background-color: #aa876b;
}

[data-emoji-set="facebook"] .skin-tone-5 {
  background-color: #916544;
}

[data-emoji-set="facebook"] .skin-tone-6 {
  background-color: #61493f;
}

`;
const I = /* @__PURE__ */ new Map();
I.set(
  "h1",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM21.0005 8V20H19.0005L19 10.204L17 10.74V8.67L19.5005 8H21.0005Z"
    />
  </svg>`
);
I.set(
  "h2",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 8C20.5711 8 22.25 9.67893 22.25 11.75C22.25 12.6074 21.9623 13.3976 21.4781 14.0292L21.3302 14.2102L18.0343 18H22V20H15L14.9993 18.444L19.8207 12.8981C20.0881 12.5908 20.25 12.1893 20.25 11.75C20.25 10.7835 19.4665 10 18.5 10C17.5818 10 16.8288 10.7071 16.7558 11.6065L16.75 11.75H14.75C14.75 9.67893 16.4289 8 18.5 8Z"
    />
  </svg>`
);
I.set(
  "h3",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M22 8L21.9984 10L19.4934 12.883C21.0823 13.3184 22.25 14.7728 22.25 16.5C22.25 18.5711 20.5711 20.25 18.5 20.25C16.674 20.25 15.1528 18.9449 14.8184 17.2166L16.7821 16.8352C16.9384 17.6413 17.6481 18.25 18.5 18.25C19.4665 18.25 20.25 17.4665 20.25 16.5C20.25 15.5335 19.4665 14.75 18.5 14.75C18.214 14.75 17.944 14.8186 17.7056 14.9403L16.3992 13.3932L19.3484 10H15V8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"
    />
  </svg> `
);
I.set(
  "highlight",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M15.2427 4.51138L8.50547 11.2486L7.79836 13.3699L6.7574 14.4109L9.58583 17.2393L10.6268 16.1983L12.7481 15.4912L19.4853 8.75402L15.2427 4.51138ZM21.6066 8.04692C21.9972 8.43744 21.9972 9.0706 21.6066 9.46113L13.8285 17.2393L11.7071 17.9464L10.2929 19.3606C9.90241 19.7511 9.26925 19.7511 8.87872 19.3606L4.63608 15.118C4.24556 14.7275 4.24556 14.0943 4.63608 13.7038L6.0503 12.2896L6.7574 10.1682L14.5356 2.39006C14.9261 1.99954 15.5593 1.99954 15.9498 2.39006L21.6066 8.04692ZM15.2427 7.33981L16.6569 8.75402L11.7071 13.7038L10.2929 12.2896L15.2427 7.33981ZM4.28253 16.8858L7.11096 19.7142L5.69674 21.1284L1.4541 19.7142L4.28253 16.8858Z"
    />
  </svg>`
);
I.set(
  "bold",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"
    />
  </svg>`
);
I.set(
  "italic",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"
    />
  </svg>`
);
I.set(
  "bullet-list",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
    />
  </svg>`
);
I.set(
  "list-ordered",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
    />
  </svg>`
);
I.set(
  "blockquote",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M4.58341 17.3211C3.55316 16.2275 3 15 3 13.0104C3 9.51092 5.45651 6.37372 9.03059 4.82324L9.92328 6.20085C6.58804 8.00545 5.93618 10.3461 5.67564 11.8221C6.21263 11.5444 6.91558 11.4467 7.60471 11.5106C9.40908 11.6778 10.8312 13.1591 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0096 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2275 13 15 13 13.0104C13 9.51092 15.4565 6.37372 19.0306 4.82324L19.9233 6.20085C16.588 8.00545 15.9362 10.3461 15.6756 11.8221C16.2126 11.5444 16.9156 11.4467 17.6047 11.5106C19.4091 11.6778 20.8312 13.1591 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0096 14.5834 17.3211Z"
    />
  </svg>`
);
I.set(
  "code-block",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"
    />
  </svg>`
);
I.set(
  "image",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M15 8V4H5V20H19V8H15ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5ZM17.5 17L13.5 10L8 17H17.5Z"
    />
  </svg>`
);
I.set(
  "link",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M18.3643 15.5353L16.95 14.1211L18.3643 12.7069C20.3169 10.7543 20.3169 7.58847 18.3643 5.63585C16.4116 3.68323 13.2458 3.68323 11.2932 5.63585L9.87898 7.05007L8.46477 5.63585L9.87898 4.22164C12.6127 1.48797 17.0448 1.48797 19.7785 4.22164C22.5121 6.95531 22.5121 11.3875 19.7785 14.1211L18.3643 15.5353ZM15.5358 18.3638L14.1216 19.778C11.388 22.5117 6.9558 22.5117 4.22213 19.778C1.48846 17.0443 1.48846 12.6122 4.22213 9.87849L5.63634 8.46428L7.05055 9.87849L5.63634 11.2927C3.68372 13.2453 3.68372 16.4112 5.63634 18.3638C7.58896 20.3164 10.7548 20.3164 12.7074 18.3638L14.1216 16.9496L15.5358 18.3638ZM14.8287 7.75717L16.2429 9.17139L9.17187 16.2425L7.75766 14.8282L14.8287 7.75717Z"
    />
  </svg>`
);
I.set(
  "undo",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M8 7V11L2 6L8 1V5H13C17.4183 5 21 8.58172 21 13C21 17.4183 17.4183 21 13 21H4V19H13C16.3137 19 19 16.3137 19 13C19 9.68629 16.3137 7 13 7H8Z"
    />
  </svg>`
);
I.set(
  "redo",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M16 7H11C7.68629 7 5 9.68629 5 13C5 16.3137 7.68629 19 11 19H20V21H11C6.58172 21 3 17.4183 3 13C3 8.58172 6.58172 5 11 5H16V1L22 6L16 11V7Z"
    />
  </svg>`
);
I.set(
  "emoji",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 13H16C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"
    />
  </svg>`
);
I.set(
  "attachment",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M14.8287 7.7574L9.1718 13.4143C8.78127 13.8048 8.78127 14.4379 9.1718 14.8285C9.56232 15.219 10.1955 15.219 10.586 14.8285L16.2429 9.17161C17.4144 8.00004 17.4144 6.10055 16.2429 4.92897C15.0713 3.7574 13.1718 3.7574 12.0002 4.92897L6.34337 10.5858C4.39075 12.5384 4.39075 15.7043 6.34337 17.6569C8.29599 19.6095 11.4618 19.6095 13.4144 17.6569L19.0713 12L20.4855 13.4143L14.8287 19.0711C12.095 21.8048 7.66283 21.8048 4.92916 19.0711C2.19549 16.3374 2.19549 11.9053 4.92916 9.17161L10.586 3.51476C12.5386 1.56214 15.7045 1.56214 17.6571 3.51476C19.6097 5.46738 19.6097 8.63321 17.6571 10.5858L12.0002 16.2427C10.8287 17.4143 8.92916 17.4143 7.75759 16.2427C6.58601 15.0711 6.58601 13.1716 7.75759 12L13.4144 6.34319L14.8287 7.7574Z"
    />
  </svg>`
);
I.set(
  "underline",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"
    />
  </svg>`
);
I.set(
  "strike",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11H13.076Z"
    />
  </svg>`
);
I.set(
  "horizontal-rule",
  D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 11H4V13H2V11ZM6 11H18V13H6V11ZM20 11H22V13H20V11Z" />
  </svg>`
);
const L2 = xu`
  :host {
    display: block;
    container: prose-editor-host / inline-size;

    /* Theme: light | dark */
    --theme: light;

    /* Editor wrapper */
    --border-color: #e5e7eb;
    --border-radius: 0.25rem;
    --border-width: 1px;
    --background-color: #ffffff;
    --text-color: #1f2937;

    /* Editor toolbar */
    --toolbar-button-radius: 0.375rem;
    --toolbar-button-size: 2rem;
    --toolbar-button-background: #ffffff;
    --toolbar-button-background-active: #ffffff;
    --toolbar-button-background-hover: #e5e7eb;
    --toolbar-button-fill: #030712;
    --toolbar-button-fill-active: #030712;
    --toolbar-button-fill-hover: #030712;
    --toolbar-divider-color: #d1d5db;
    --toolbar-background: #ffffff;
    --toolbar-padding: 0.5rem;
    --toolbar-gap: 0.25rem;
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    color: var(--text-color);
  }

  ::slotted([slot='editor']) {
    /* !important because of tailwindcss wildcard: border-width: 0 */
    border: var(--border-width) solid var(--border-color) !important;
    border-radius: var(--border-radius);
  }

  :host([toolbar-placement='top']) ::slotted([slot='editor']) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :host([toolbar-placement='bottom']) ::slotted([slot='editor']) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--toolbar-gap);
    flex: 0 0 auto;
    flex-wrap: wrap;
    background-color: var(--toolbar-background);
    padding: var(--toolbar-padding);
    border: 1px solid var(--border-color);
  }

  :host([toolbar-placement='top']) .toolbar {
    border-bottom: 0;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  :host([toolbar-placement='bottom']) .toolbar {
    border-top: 0;
    border-radius: 0;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    order: 1;
  }

  .toolbar-button {
    display: grid;
    place-items: center;
    height: var(--toolbar-button-size);
    width: var(--toolbar-button-size);
    cursor: pointer;
    border: 0;
    border-radius: var(--toolbar-button-radius);
    background-color: var(--toolbar-button-background);
    transition: all 0.2s;
    fill: var(--toolbar-button-fill);
  }

  .toolbar-button.is-active {
    fill: var(--toolbar-button-fill-active);
    background-color: var(--toolbar-button-background-active);
    box-shadow: 0 0 0 1px var(--border-color);
  }

  @media (hover: hover) {
    .toolbar-button:hover {
      fill: var(--toolbar-button-fill-hover);
      background-color: var(--toolbar-button-background-hover);
    }
  }

  .toolbar-button:focus {
    outline: none;
  }

  .toolbar-button svg {
    width: 80%;
    height: 80%;
  }

  .divider {
    width: 1px;
    height: calc(var(--toolbar-button-size) * 0.5);
    background-color: var(--toolbar-divider-color);
    margin-left: var(--toolbar-gap);
    margin-right: var(--toolbar-gap);
  }

  /*
    https://caniuse.com/css-container-queries-style
    https://css.oddbird.net/rwd/style/explainer/#key-scenarios
  */
  @container prose-editor-host style(--theme: dark) {
    .wrapper {
      --background-color: #fff;
      --border-width: 3px;
      --border-color: #0d0d0d;
      --border-radius: 0.75rem;

      --toolbar-background: #0d0d0d;
      --toolbar-button-background: #0d0d0d;
      --toolbar-button-background-active: #303030;
      --toolbar-button-background-hover: var(
        --toolbar-button-background-active
      );
      --toolbar-button-fill: #fff;
      --toolbar-divider-color: #ffffff40;
      --toolbar-button-fill-active: #fff;
      --toolbar-button-fill-hover: var(--toolbar-button-fill-active);
    }
  }
`;
var D2 = Object.defineProperty, R2 = Object.getOwnPropertyDescriptor, Ge = (n, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? R2(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && D2(e, t, i), i;
};
const P2 = "ElementInternals" in window && "setFormData" in window.ElementInternals;
class Te extends On {
  constructor() {
    super(), this.emojiPickerActive = !1, this.initialHtml = "", this.initialJson = "", this.editorClass = "prose", this.toolbar = [], this.toolbarPreset = "default", this.toolbarPlacement = "top", this.disabled = !1, this.loading = !1, this.placeholder = "", P2 && (this._internals = this.attachInternals()), this._onKeyDown = this._onKeyDown.bind(this), this._onFocus = this._onFocus.bind(this);
  }
  static get formAssociated() {
    return !0;
  }
  firstUpdated() {
    this.editor = new bg({
      element: this._createEditorRootElement(),
      editorProps: {
        attributes: {
          class: this.editorClass
        }
      },
      extensions: [
        C0,
        K0,
        Cg,
        wg.configure({
          placeholder: this.placeholder
        }),
        xg.configure({
          HTMLAttributes: {}
        })
      ],
      content: this.initialHtml || this.initialJson,
      autofocus: !this.disabled,
      onCreate: () => {
        this.emitChange();
      },
      onTransaction: () => {
        this.requestUpdate();
      },
      onUpdate: ({ editor: e }) => {
        this.requestUpdate(), this.emitChange();
      },
      onSelectionUpdate: () => {
        this.requestUpdate();
      }
    }), this.configureToolbar(), document.addEventListener("keydown", this._onKeyDown), this.addEventListener("focus", this._onFocus), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._onKeyDown), this.removeEventListener("focus", this._onFocus), this.editor.destroy();
  }
  configureToolbar() {
    this.toolbar.length > 0 || (this.toolbarPreset === "minimal" ? this.toolbar = ["bold", "italic", "underline"] : this.toolbar = [
      "heading-1",
      "heading-2",
      "heading-3",
      "divider",
      "bold",
      "italic",
      "underline",
      "highlight",
      "bulletlist",
      "orderedlist",
      "blockquote",
      "divider",
      "code-block",
      "horizontal-rule",
      "link",
      "emoji",
      "divider",
      "undo",
      "redo"
    ]);
  }
  updated(e) {
    (e.has("toolbar") || e.has("toolbarPreset")) && this.configureToolbar(), e.has("emojiPickerActive") && this._computePositionEmojiPicker();
  }
  get emojiButton() {
    return this.shadowRoot.querySelector("#emoji-picker-button");
  }
  _createEditorRootElement() {
    const e = document.createElement("div");
    return e.slot = "editor", this.shadowRoot.host.appendChild(e), e;
  }
  _onKeyDown({ key: e }) {
    e === "Escape" && (this.emojiPickerActive = !1);
  }
  _onFocus() {
    document.activeElement !== this.editor.view.dom && !this.disabled && this.focus();
  }
  clear() {
    this.editor.commands.clearContent(!0);
  }
  focus() {
    this.editor.commands.focus();
  }
  blur() {
    this.editor.commands.blur();
  }
  toggleBold() {
    this.editor.chain().toggleBold().focus().run();
  }
  toggleItalic() {
    this.editor.chain().toggleItalic().focus().run();
  }
  toggleUnderline() {
    this.editor.chain().toggleUnderline().focus().run();
  }
  toggleStrike() {
    this.editor.chain().toggleStrike().focus().run();
  }
  toggleHeadingLevel1() {
    this.editor.chain().toggleHeading({ level: 1 }).focus().run();
  }
  toggleHeadingLevel2() {
    this.editor.chain().toggleHeading({ level: 2 }).focus().run();
  }
  toggleHeadingLevel3() {
    this.editor.chain().toggleHeading({ level: 3 }).focus().run();
  }
  toggleBulletList() {
    this.editor.chain().toggleBulletList().focus().run();
  }
  toggleOrderedList() {
    this.editor.chain().toggleOrderedList().focus().run();
  }
  setHorizontalRule() {
    this.editor.chain().setHorizontalRule().focus().run();
  }
  toggleBlockquote() {
    this.editor.chain().toggleBlockquote().focus().run();
  }
  toggleCodeBlock() {
    this.editor.chain().toggleCodeBlock().focus().run();
  }
  toggleHighlight() {
    this.editor.chain().toggleHighlight().focus().run();
  }
  undo() {
    this.editor.chain().focus().undo().run();
  }
  redo() {
    this.editor.chain().focus().redo().run();
  }
  toggleLink() {
    if (this.editor.isActive("link"))
      this.editor.chain().focus().unsetLink().run();
    else {
      let e = window.prompt("URL");
      e != null && e.startsWith("http") || (e = `https://${e}`), this.editor.chain().focus().setLink({ href: e }).run();
    }
  }
  toggleEmojiPicker() {
    this.emojiPickerElement || (this.emojiPickerElement = new Go({
      parent: document.body,
      data: async () => (await fetch(
        "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
      )).json(),
      theme: "light",
      onEmojiSelect: ({ native: e }) => {
        this.addEmoji(e), this.emojiPickerActive = !1;
      },
      onClickOutside: (e) => {
        e.composedPath().includes(this.emojiButton) || (this.emojiPickerActive = !1);
      }
    }), Object.assign(this.emojiPickerElement.style, {
      transition: "opacity .2s",
      zIndex: "999"
    })), this.emojiPickerActive = !this.emojiPickerActive;
  }
  async _computePositionEmojiPicker() {
    const e = this.emojiButton;
    if (!!e)
      if (this.emojiPickerActive) {
        const { x: t, y: r, strategy: i } = await kh(
          e,
          this.emojiPickerElement,
          {
            placement: "bottom",
            middleware: [
              Qu(4),
              vh(),
              yh()
            ]
          }
        );
        Object.assign(this.emojiPickerElement.style, {
          position: i,
          left: `${t}px`,
          top: `${r}px`
        }), Object.assign(this.emojiPickerElement.style, {
          opacity: "1",
          visibility: "visible",
          pointerEvents: "auto"
        });
      } else
        Object.assign(this.emojiPickerElement.style, {
          opacity: "0",
          visibility: "hidden",
          pointerEvents: "none"
        });
  }
  addEmoji(e) {
    this.editor.commands.insertContent(e);
  }
  addFile() {
    this.emit("add-file");
  }
  getHTML() {
    const e = this.editor.getHTML();
    return e === "<p></p>" ? "" : e;
  }
  emitChange() {
    if (this._internals) {
      const e = new FormData();
      e.append("html", this.getHTML()), e.append("json", this.editor.getJSON().text || ""), this._internals.setFormValue(e);
    }
    this.emit("change", {
      html: this.getHTML(),
      json: this.editor.getJSON()
    });
  }
  emit(e, t = {}) {
    this.dispatchEvent(
      new CustomEvent(e, {
        detail: t,
        bubbles: !0,
        composed: !0
      })
    );
  }
  renderToolbarButton(e) {
    var r;
    return !this.editor || !((r = this.toolbar) != null && r.length) ? "" : new Map(
      Object.entries({
        divider: D`<div class="divider" part="divider"></div>`,
        "heading-1": D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("heading", { level: 1 })
        })}"
          @click="${this.toggleHeadingLevel1}"
        >
          ${I.get("h1")}
        </button>`,
        "heading-2": D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("heading", { level: 2 })
        })}"
          @click="${this.toggleHeadingLevel2}"
        >
          ${I.get("h2")}
        </button>`,
        "heading-3": D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("heading", { level: 3 })
        })}"
          @click="${this.toggleHeadingLevel3}"
        >
          ${I.get("h3")}
        </button>`,
        highlight: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("highlight")
        })}"
          @click="${this.toggleHighlight}"
        >
          ${I.get("highlight")}
        </button>`,
        "horizontal-rule": D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("horizontal-rule")
        })}"
          @click="${this.setHorizontalRule}"
        >
          ${I.get("horizontal-rule")}
        </button>`,
        bold: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("bold")
        })}"
          @click="${this.toggleBold}"
        >
          ${I.get("bold")}
        </button>`,
        italic: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("italic")
        })}"
          @click="${this.toggleItalic}"
        >
          ${I.get("italic")}
        </button>`,
        underline: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("underline")
        })}"
          @click="${this.toggleUnderline}"
        >
          ${I.get("underline")}
        </button>`,
        strike: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("strike")
        })}"
          @click="${this.toggleStrike}"
        >
          ${I.get("strike")}
        </button>`,
        bulletlist: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("bulletList")
        })}"
          @click="${this.toggleBulletList}"
        >
          ${I.get("bullet-list")}
        </button>`,
        orderedlist: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("orderedlist")
        })}"
          @click="${this.toggleOrderedList}"
        >
          ${I.get("list-ordered")}
        </button>`,
        blockquote: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("blockquote")
        })}"
          @click="${this.toggleBlockquote}"
        >
          ${I.get("blockquote")}
        </button>`,
        "code-block": D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("codeBlock")
        })}"
          @click="${this.toggleCodeBlock}"
        >
          ${I.get("code-block")}
        </button>`,
        link: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${de({
          "is-active": this.editor.isActive("link")
        })}"
          @click="${this.toggleLink}"
        >
          ${I.get("link")}
        </button>`,
        undo: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.undo}"
        >
          ${I.get("undo")}
        </button>`,
        redo: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.redo}"
        >
          ${I.get("redo")}
        </button>`,
        emoji: D`<button
          id="emoji-picker-button"
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.toggleEmojiPicker}"
        >
          ${I.get("emoji")}
        </button>`,
        attachment: D`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.addFile}"
        >
          ${I.get("attachment")}
        </button>`
      })
    ).get(e);
  }
  render() {
    return D`<div class="wrapper" part="wrapper">
      <div class="toolbar" part="toolbar">
        <slot name="toolbar-start"></slot>
        ${ju(this.toolbar, (e) => this.renderToolbarButton(e))}
        <slot name="toolbar-end"></slot>
        <slot></slot>
      </div>
      <slot name="editor"></slot>
    </div>`;
  }
}
Te.styles = L2;
Ge([
  Iu()
], Te.prototype, "emojiPickerActive", 2);
Ge([
  Je({ attribute: "initial-html" })
], Te.prototype, "initialHtml", 2);
Ge([
  Je({ attribute: "initial-json" })
], Te.prototype, "initialJson", 2);
Ge([
  Je({ attribute: "editor-class" })
], Te.prototype, "editorClass", 2);
Ge([
  Je({
    attribute: "toolbar",
    converter: {
      fromAttribute: (n) => n.split(",").map((e) => e.trim()),
      toAttribute: (n) => n.join(",")
    }
  })
], Te.prototype, "toolbar", 2);
Ge([
  Je({ attribute: "toolbar-preset" })
], Te.prototype, "toolbarPreset", 2);
Ge([
  Je({ attribute: "toolbar-placement" })
], Te.prototype, "toolbarPlacement", 2);
Ge([
  Je({ type: Boolean, reflect: !0 })
], Te.prototype, "disabled", 2);
Ge([
  Je({ type: Boolean, reflect: !0 })
], Te.prototype, "loading", 2);
Ge([
  Je()
], Te.prototype, "placeholder", 2);
customElements.define("zx-prose-editor", Te);
export {
  Te as default
};
