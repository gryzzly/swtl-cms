/* esm.sh - esbuild bundle(prosemirror-history@1.4.0) es2022 production */
import b from"rope-sequence";import{Mapping as k}from"prosemirror-transform";import{PluginKey as O,Plugin as H}from"prosemirror-state";var x=500,w=class t{constructor(n,e){this.items=n,this.eventCount=e}popEvent(n,e){if(this.eventCount==0)return null;let i=this.items.length;for(;;i--)if(this.items.get(i-1).selection){--i;break}let s,p;e&&(s=this.remapping(i,this.items.length),p=s.maps.length);let l=n.tr,r,u,m=[],f=[];return this.items.forEach((o,a)=>{if(!o.step){s||(s=this.remapping(i,a+1),p=s.maps.length),p--,f.push(o);return}if(s){f.push(new c(o.map));let d=o.step.map(s.slice(p)),v;d&&l.maybeStep(d).doc&&(v=l.mapping.maps[l.mapping.maps.length-1],m.push(new c(v,void 0,void 0,m.length+f.length))),p--,v&&s.appendMap(v,p)}else l.maybeStep(o.step);if(o.selection)return r=s?o.selection.map(s.slice(p)):o.selection,u=new t(this.items.slice(0,i).append(f.reverse().concat(m)),this.eventCount-1),!1},this.items.length,0),{remaining:u,transform:l,selection:r}}addTransform(n,e,i,s){let p=[],l=this.eventCount,r=this.items,u=!s&&r.length?r.get(r.length-1):null;for(let f=0;f<n.steps.length;f++){let o=n.steps[f].invert(n.docs[f]),a=new c(n.mapping.maps[f],o,e),d;(d=u&&u.merge(a))&&(a=d,f?p.pop():r=r.slice(0,r.length-1)),p.push(a),e&&(l++,e=void 0),s||(u=a)}let m=l-i.depth;return m>G&&(r=F(r,m),l-=m),new t(r.append(p),l)}remapping(n,e){let i=new k;return this.items.forEach((s,p)=>{let l=s.mirrorOffset!=null&&p-s.mirrorOffset>=n?i.maps.length-s.mirrorOffset:void 0;i.appendMap(s.map,l)},n,e),i}addMaps(n){return this.eventCount==0?this:new t(this.items.append(n.map(e=>new c(e))),this.eventCount)}rebased(n,e){if(!this.eventCount)return this;let i=[],s=Math.max(0,this.items.length-e),p=n.mapping,l=n.steps.length,r=this.eventCount;this.items.forEach(a=>{a.selection&&r--},s);let u=e;this.items.forEach(a=>{let d=p.getMirror(--u);if(d==null)return;l=Math.min(l,d);let v=p.maps[d];if(a.step){let R=n.steps[d].invert(n.docs[d]),I=a.selection&&a.selection.map(p.slice(u+1,d));I&&r++,i.push(new c(v,R,I))}else i.push(new c(v))},s);let m=[];for(let a=e;a<l;a++)m.push(new c(p.maps[a]));let f=this.items.slice(0,s).append(m).append(i),o=new t(f,r);return o.emptyItemCount()>x&&(o=o.compress(this.items.length-i.length)),o}emptyItemCount(){let n=0;return this.items.forEach(e=>{e.step||n++}),n}compress(n=this.items.length){let e=this.remapping(0,n),i=e.maps.length,s=[],p=0;return this.items.forEach((l,r)=>{if(r>=n)s.push(l),l.selection&&p++;else if(l.step){let u=l.step.map(e.slice(i)),m=u&&u.getMap();if(i--,m&&e.appendMap(m,i),u){let f=l.selection&&l.selection.map(e.slice(i));f&&p++;let o=new c(m.invert(),u,f),a,d=s.length-1;(a=s.length&&s[d].merge(o))?s[d]=a:s.push(o)}}else l.map&&i--},this.items.length,0),new t(b.from(s.reverse()),p)}};w.empty=new w(b.empty,0);function F(t,n){let e;return t.forEach((i,s)=>{if(i.selection&&n--==0)return e=s,!1}),t.slice(e)}var c=class t{constructor(n,e,i,s){this.map=n,this.step=e,this.selection=i,this.mirrorOffset=s}merge(n){if(this.step&&n.step&&!n.selection){let e=n.step.merge(this.step);if(e)return new t(e.getMap().invert(),e,this.selection)}}},h=class{constructor(n,e,i,s,p){this.done=n,this.undone=e,this.prevRanges=i,this.prevTime=s,this.prevComposition=p}},G=20;function y(t,n,e,i){let s=e.getMeta(g),p;if(s)return s.historyState;e.getMeta(D)&&(t=new h(t.done,t.undone,null,0,-1));let l=e.getMeta("appendedTransaction");if(e.steps.length==0)return t;if(l&&l.getMeta(g))return l.getMeta(g).redo?new h(t.done.addTransform(e,void 0,i,M(n)),t.undone,P(e.mapping.maps[e.steps.length-1]),t.prevTime,t.prevComposition):new h(t.done,t.undone.addTransform(e,void 0,i,M(n)),null,t.prevTime,t.prevComposition);if(e.getMeta("addToHistory")!==!1&&!(l&&l.getMeta("addToHistory")===!1)){let r=e.getMeta("composition"),u=t.prevTime==0||!l&&t.prevComposition!=r&&(t.prevTime<(e.time||0)-i.newGroupDelay||!K(e,t.prevRanges)),m=l?T(t.prevRanges,e.mapping):P(e.mapping.maps[e.steps.length-1]);return new h(t.done.addTransform(e,u?n.selection.getBookmark():void 0,i,M(n)),w.empty,m,e.time,r??t.prevComposition)}else return(p=e.getMeta("rebased"))?new h(t.done.rebased(e,p),t.undone.rebased(e,p),T(t.prevRanges,e.mapping),t.prevTime,t.prevComposition):new h(t.done.addMaps(e.mapping.maps),t.undone.addMaps(e.mapping.maps),T(t.prevRanges,e.mapping),t.prevTime,t.prevComposition)}function K(t,n){if(!n)return!1;if(!t.docChanged)return!0;let e=!1;return t.mapping.maps[0].forEach((i,s)=>{for(let p=0;p<n.length;p+=2)i<=n[p+1]&&s>=n[p]&&(e=!0)}),e}function P(t){let n=[];return t.forEach((e,i,s,p)=>n.push(s,p)),n}function T(t,n){if(!t)return null;let e=[];for(let i=0;i<t.length;i+=2){let s=n.map(t[i],1),p=n.map(t[i+1],-1);s<=p&&e.push(s,p)}return e}function j(t,n,e){let i=M(n),s=g.get(n).spec.config,p=(e?t.undone:t.done).popEvent(n,i);if(!p)return null;let l=p.selection.resolve(p.transform.doc),r=(e?t.done:t.undone).addTransform(p.transform,n.selection.getBookmark(),s,i),u=new h(e?r:p.remaining,e?p.remaining:r,null,0,-1);return p.transform.setSelection(l).setMeta(g,{redo:e,historyState:u})}var E=!1,S=null;function M(t){let n=t.plugins;if(S!=n){E=!1,S=n;for(let e=0;e<n.length;e++)if(n[e].spec.historyPreserveItems){E=!0;break}}return E}function q(t){return t.setMeta(D,!0)}var g=new O("history"),D=new O("closeHistory");function L(t={}){return t={depth:t.depth||100,newGroupDelay:t.newGroupDelay||500},new H({key:g,state:{init(){return new h(w.empty,w.empty,null,0,-1)},apply(n,e,i){return y(e,i,n,t)}},config:t,props:{handleDOMEvents:{beforeinput(n,e){let i=e.inputType,s=i=="historyUndo"?A:i=="historyRedo"?B:null;return s?(e.preventDefault(),s(n.state,n.dispatch)):!1}}}})}function C(t,n){return(e,i)=>{let s=g.getState(e);if(!s||(t?s.undone:s.done).eventCount==0)return!1;if(i){let p=j(s,e,t);p&&i(n?p.scrollIntoView():p)}return!0}}var A=C(!1,!0),B=C(!0,!0),W=C(!1,!1),z=C(!0,!1);function J(t){let n=g.getState(t);return n?n.done.eventCount:0}function Q(t){let n=g.getState(t);return n?n.undone.eventCount:0}export{q as closeHistory,L as history,B as redo,Q as redoDepth,z as redoNoScroll,A as undo,J as undoDepth,W as undoNoScroll};
//# sourceMappingURL=prosemirror-history.mjs.map