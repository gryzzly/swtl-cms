/* esm.sh - esbuild bundle(prosemirror-transform@1.8.0) es2022 production */
import{ReplaceError as ie,Slice as g,Fragment as w,MarkType as se,Mark as oe}from"prosemirror-model";var U=65535,V=Math.pow(2,16);function le(i,e){return i+e*V}function H(i){return i&U}function ae(i){return(i-(i&U))/V}var X=1,Y=2,F=4,Z=8,E=class{constructor(e,t,r){this.pos=e,this.delInfo=t,this.recover=r}get deleted(){return(this.delInfo&Z)>0}get deletedBefore(){return(this.delInfo&(X|F))>0}get deletedAfter(){return(this.delInfo&(Y|F))>0}get deletedAcross(){return(this.delInfo&F)>0}},x=class i{constructor(e,t=!1){if(this.ranges=e,this.inverted=t,!e.length&&i.empty)return i.empty}recover(e){let t=0,r=H(e);if(!this.inverted)for(let n=0;n<r;n++)t+=this.ranges[n*3+2]-this.ranges[n*3+1];return this.ranges[r*3]+t+ae(e)}mapResult(e,t=1){return this._map(e,t,!1)}map(e,t=1){return this._map(e,t,!0)}_map(e,t,r){let n=0,s=this.inverted?2:1,o=this.inverted?1:2;for(let l=0;l<this.ranges.length;l+=3){let a=this.ranges[l]-(this.inverted?n:0);if(a>e)break;let h=this.ranges[l+s],p=this.ranges[l+o],f=a+h;if(e<=f){let c=h?e==a?-1:e==f?1:t:t,d=a+n+(c<0?0:p);if(r)return d;let u=e==(t<0?a:f)?null:le(l/3,e-a),m=e==a?Y:e==f?X:F;return(t<0?e!=a:e!=f)&&(m|=Z),new E(d,m,u)}n+=p-h}return r?e+n:new E(e+n,0,null)}touches(e,t){let r=0,n=H(t),s=this.inverted?2:1,o=this.inverted?1:2;for(let l=0;l<this.ranges.length;l+=3){let a=this.ranges[l]-(this.inverted?r:0);if(a>e)break;let h=this.ranges[l+s],p=a+h;if(e<=p&&l==n*3)return!0;r+=this.ranges[l+o]-h}return!1}forEach(e){let t=this.inverted?2:1,r=this.inverted?1:2;for(let n=0,s=0;n<this.ranges.length;n+=3){let o=this.ranges[n],l=o-(this.inverted?s:0),a=o+(this.inverted?0:s),h=this.ranges[n+t],p=this.ranges[n+r];e(l,l+h,a,a+p),s+=p-h}}invert(){return new i(this.ranges,!this.inverted)}toString(){return(this.inverted?"-":"")+JSON.stringify(this.ranges)}static offset(e){return e==0?i.empty:new i(e<0?[0,-e,0]:[0,0,e])}};x.empty=new x([]);var L=class i{constructor(e=[],t,r=0,n=e.length){this.maps=e,this.mirror=t,this.from=r,this.to=n}slice(e=0,t=this.maps.length){return new i(this.maps,this.mirror,e,t)}copy(){return new i(this.maps.slice(),this.mirror&&this.mirror.slice(),this.from,this.to)}appendMap(e,t){this.to=this.maps.push(e),t!=null&&this.setMirror(this.maps.length-1,t)}appendMapping(e){for(let t=0,r=this.maps.length;t<e.maps.length;t++){let n=e.getMirror(t);this.appendMap(e.maps[t],n!=null&&n<t?r+n:void 0)}}getMirror(e){if(this.mirror){for(let t=0;t<this.mirror.length;t++)if(this.mirror[t]==e)return this.mirror[t+(t%2?-1:1)]}}setMirror(e,t){this.mirror||(this.mirror=[]),this.mirror.push(e,t)}appendMappingInverted(e){for(let t=e.maps.length-1,r=this.maps.length+e.maps.length;t>=0;t--){let n=e.getMirror(t);this.appendMap(e.maps[t].invert(),n!=null&&n>t?r-n-1:void 0)}}invert(){let e=new i;return e.appendMappingInverted(this),e}map(e,t=1){if(this.mirror)return this._map(e,t,!0);for(let r=this.from;r<this.to;r++)e=this.maps[r].map(e,t);return e}mapResult(e,t=1){return this._map(e,t,!1)}_map(e,t,r){let n=0;for(let s=this.from;s<this.to;s++){let o=this.maps[s],l=o.mapResult(e,t);if(l.recover!=null){let a=this.getMirror(s);if(a!=null&&a>s&&a<this.to){s=a,e=this.maps[a].recover(l.recover);continue}}n|=l.delInfo,e=l.pos}return r?e:new E(e,n,null)}},B=Object.create(null),y=class{getMap(){return x.empty}merge(e){return null}static fromJSON(e,t){if(!t||!t.stepType)throw new RangeError("Invalid input for Step.fromJSON");let r=B[t.stepType];if(!r)throw new RangeError(`No step type ${t.stepType} defined`);return r.fromJSON(e,t)}static jsonID(e,t){if(e in B)throw new RangeError("Duplicate use of step JSON ID "+e);return B[e]=t,t.prototype.jsonID=e,t}},k=class i{constructor(e,t){this.doc=e,this.failed=t}static ok(e){return new i(e,null)}static fail(e){return new i(null,e)}static fromReplace(e,t,r,n){try{return i.ok(e.replace(t,r,n))}catch(s){if(s instanceof ie)return i.fail(s.message);throw s}}};function G(i,e,t){let r=[];for(let n=0;n<i.childCount;n++){let s=i.child(n);s.content.size&&(s=s.copy(G(s.content,e,s))),s.isInline&&(s=e(s,t,n)),r.push(s)}return w.fromArray(r)}var T=class i extends y{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=e.resolve(this.from),n=r.node(r.sharedDepth(this.to)),s=new g(G(t.content,(o,l)=>!o.isAtom||!l.type.allowsMarkType(this.mark.type)?o:o.mark(this.mark.addToSet(o.marks)),n),t.openStart,t.openEnd);return k.fromReplace(e,this.from,this.to,s)}invert(){return new b(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new i(t.pos,r.pos,this.mark)}merge(e){return e instanceof i&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new i(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"addMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for AddMarkStep.fromJSON");return new i(t.from,t.to,e.markFromJSON(t.mark))}};y.jsonID("addMark",T);var b=class i extends y{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=new g(G(t.content,n=>n.mark(this.mark.removeFromSet(n.marks)),e),t.openStart,t.openEnd);return k.fromReplace(e,this.from,this.to,r)}invert(){return new T(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new i(t.pos,r.pos,this.mark)}merge(e){return e instanceof i&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new i(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"removeMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");return new i(t.from,t.to,e.markFromJSON(t.mark))}};y.jsonID("removeMark",b);var O=class i extends y{constructor(e,t){super(),this.pos=e,this.mark=t}apply(e){let t=e.nodeAt(this.pos);if(!t)return k.fail("No node at mark step's position");let r=t.type.create(t.attrs,null,this.mark.addToSet(t.marks));return k.fromReplace(e,this.pos,this.pos+1,new g(w.from(r),0,t.isLeaf?0:1))}invert(e){let t=e.nodeAt(this.pos);if(t){let r=this.mark.addToSet(t.marks);if(r.length==t.marks.length){for(let n=0;n<t.marks.length;n++)if(!t.marks[n].isInSet(r))return new i(this.pos,t.marks[n]);return new i(this.pos,this.mark)}}return new z(this.pos,this.mark)}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new i(t.pos,this.mark)}toJSON(){return{stepType:"addNodeMark",pos:this.pos,mark:this.mark.toJSON()}}static fromJSON(e,t){if(typeof t.pos!="number")throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");return new i(t.pos,e.markFromJSON(t.mark))}};y.jsonID("addNodeMark",O);var z=class i extends y{constructor(e,t){super(),this.pos=e,this.mark=t}apply(e){let t=e.nodeAt(this.pos);if(!t)return k.fail("No node at mark step's position");let r=t.type.create(t.attrs,null,this.mark.removeFromSet(t.marks));return k.fromReplace(e,this.pos,this.pos+1,new g(w.from(r),0,t.isLeaf?0:1))}invert(e){let t=e.nodeAt(this.pos);return!t||!this.mark.isInSet(t.marks)?this:new O(this.pos,this.mark)}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new i(t.pos,this.mark)}toJSON(){return{stepType:"removeNodeMark",pos:this.pos,mark:this.mark.toJSON()}}static fromJSON(e,t){if(typeof t.pos!="number")throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");return new i(t.pos,e.markFromJSON(t.mark))}};y.jsonID("removeNodeMark",z);var S=class i extends y{constructor(e,t,r,n=!1){super(),this.from=e,this.to=t,this.slice=r,this.structure=n}apply(e){return this.structure&&q(e,this.from,this.to)?k.fail("Structure replace would overwrite content"):k.fromReplace(e,this.from,this.to,this.slice)}getMap(){return new x([this.from,this.to-this.from,this.slice.size])}invert(e){return new i(this.from,this.from+this.slice.size,e.slice(this.from,this.to))}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deletedAcross&&r.deletedAcross?null:new i(t.pos,Math.max(t.pos,r.pos),this.slice)}merge(e){if(!(e instanceof i)||e.structure||this.structure)return null;if(this.from+this.slice.size==e.from&&!this.slice.openEnd&&!e.slice.openStart){let t=this.slice.size+e.slice.size==0?g.empty:new g(this.slice.content.append(e.slice.content),this.slice.openStart,e.slice.openEnd);return new i(this.from,this.to+(e.to-e.from),t,this.structure)}else if(e.to==this.from&&!this.slice.openStart&&!e.slice.openEnd){let t=this.slice.size+e.slice.size==0?g.empty:new g(e.slice.content.append(this.slice.content),e.slice.openStart,this.slice.openEnd);return new i(e.from,this.to,t,this.structure)}else return null}toJSON(){let e={stepType:"replace",from:this.from,to:this.to};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for ReplaceStep.fromJSON");return new i(t.from,t.to,g.fromJSON(e,t.slice),!!t.structure)}};y.jsonID("replace",S);var M=class i extends y{constructor(e,t,r,n,s,o,l=!1){super(),this.from=e,this.to=t,this.gapFrom=r,this.gapTo=n,this.slice=s,this.insert=o,this.structure=l}apply(e){if(this.structure&&(q(e,this.from,this.gapFrom)||q(e,this.gapTo,this.to)))return k.fail("Structure gap-replace would overwrite content");let t=e.slice(this.gapFrom,this.gapTo);if(t.openStart||t.openEnd)return k.fail("Gap is not a flat range");let r=this.slice.insertAt(this.insert,t.content);return r?k.fromReplace(e,this.from,this.to,r):k.fail("Content does not fit in gap")}getMap(){return new x([this.from,this.gapFrom-this.from,this.insert,this.gapTo,this.to-this.gapTo,this.slice.size-this.insert])}invert(e){let t=this.gapTo-this.gapFrom;return new i(this.from,this.from+this.slice.size+t,this.from+this.insert,this.from+this.insert+t,e.slice(this.from,this.to).removeBetween(this.gapFrom-this.from,this.gapTo-this.from),this.gapFrom-this.from,this.structure)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1),n=e.map(this.gapFrom,-1),s=e.map(this.gapTo,1);return t.deletedAcross&&r.deletedAcross||n<t.pos||s>r.pos?null:new i(t.pos,r.pos,n,s,this.slice,this.insert,this.structure)}toJSON(){let e={stepType:"replaceAround",from:this.from,to:this.to,gapFrom:this.gapFrom,gapTo:this.gapTo,insert:this.insert};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number"||typeof t.gapFrom!="number"||typeof t.gapTo!="number"||typeof t.insert!="number")throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");return new i(t.from,t.to,t.gapFrom,t.gapTo,g.fromJSON(e,t.slice),t.insert,!!t.structure)}};y.jsonID("replaceAround",M);function q(i,e,t){let r=i.resolve(e),n=t-e,s=r.depth;for(;n>0&&s>0&&r.indexAfter(s)==r.node(s).childCount;)s--,n--;if(n>0){let o=r.node(s).maybeChild(r.indexAfter(s));for(;n>0;){if(!o||o.isLeaf)return!0;o=o.firstChild,n--}}return!1}function he(i,e,t,r){let n=[],s=[],o,l;i.doc.nodesBetween(e,t,(a,h,p)=>{if(!a.isInline)return;let f=a.marks;if(!r.isInSet(f)&&p.type.allowsMarkType(r.type)){let c=Math.max(h,e),d=Math.min(h+a.nodeSize,t),u=r.addToSet(f);for(let m=0;m<f.length;m++)f[m].isInSet(u)||(o&&o.to==c&&o.mark.eq(f[m])?o.to=d:n.push(o=new b(c,d,f[m])));l&&l.to==c?l.to=d:s.push(l=new T(c,d,r))}}),n.forEach(a=>i.step(a)),s.forEach(a=>i.step(a))}function pe(i,e,t,r){let n=[],s=0;i.doc.nodesBetween(e,t,(o,l)=>{if(!o.isInline)return;s++;let a=null;if(r instanceof se){let h=o.marks,p;for(;p=r.isInSet(h);)(a||(a=[])).push(p),h=p.removeFromSet(h)}else r?r.isInSet(o.marks)&&(a=[r]):a=o.marks;if(a&&a.length){let h=Math.min(l+o.nodeSize,t);for(let p=0;p<a.length;p++){let f=a[p],c;for(let d=0;d<n.length;d++){let u=n[d];u.step==s-1&&f.eq(n[d].style)&&(c=u)}c?(c.to=h,c.step=s):n.push({style:f,from:Math.max(l,e),to:h,step:s})}}}),n.forEach(o=>i.step(new b(o.from,o.to,o.style)))}function fe(i,e,t,r=t.contentMatch){let n=i.doc.nodeAt(e),s=[],o=e+1;for(let l=0;l<n.childCount;l++){let a=n.child(l),h=o+a.nodeSize,p=r.matchType(a.type);if(!p)s.push(new S(o,h,g.empty));else{r=p;for(let f=0;f<a.marks.length;f++)t.allowsMarkType(a.marks[f].type)||i.step(new b(o,h,a.marks[f]));if(a.isText&&!t.spec.code){let f,c=/\r?\n|\r/g,d;for(;f=c.exec(a.text);)d||(d=new g(w.from(t.schema.text(" ",t.allowedMarks(a.marks))),0,0)),s.push(new S(o+f.index,o+f.index+f[0].length,d))}}o=h}if(!r.validEnd){let l=r.fillBefore(w.empty,!0);i.replace(o,o,new g(l,0,0))}for(let l=s.length-1;l>=0;l--)i.step(s[l])}function de(i,e,t){return(e==0||i.canReplace(e,i.childCount))&&(t==i.childCount||i.canReplace(0,t))}function Te(i){let t=i.parent.content.cutByIndex(i.startIndex,i.endIndex);for(let r=i.depth;;--r){let n=i.$from.node(r),s=i.$from.index(r),o=i.$to.indexAfter(r);if(r<i.depth&&n.canReplace(s,o,t))return r;if(r==0||n.type.spec.isolating||!de(n,s,o))break}return null}function ce(i,e,t){let{$from:r,$to:n,depth:s}=e,o=r.before(s+1),l=n.after(s+1),a=o,h=l,p=w.empty,f=0;for(let u=s,m=!1;u>t;u--)m||r.index(u)>0?(m=!0,p=w.from(r.node(u).copy(p)),f++):a--;let c=w.empty,d=0;for(let u=s,m=!1;u>t;u--)m||n.after(u+1)<n.end(u)?(m=!0,c=w.from(n.node(u).copy(c)),d++):h++;i.step(new M(a,h,o,l,new g(p.append(c),f,d),p.size-f,!0))}function Oe(i,e,t=null,r=i){let n=ue(i,e),s=n&&me(r,e);return s?n.map(K).concat({type:e,attrs:t}).concat(s.map(K)):null}function K(i){return{type:i,attrs:null}}function ue(i,e){let{parent:t,startIndex:r,endIndex:n}=i,s=t.contentMatchAt(r).findWrapping(e);if(!s)return null;let o=s.length?s[0]:e;return t.canReplaceWith(r,n,o)?s:null}function me(i,e){let{parent:t,startIndex:r,endIndex:n}=i,s=t.child(r),o=e.contentMatch.findWrapping(s.type);if(!o)return null;let a=(o.length?o[o.length-1]:e).contentMatch;for(let h=r;a&&h<n;h++)a=a.matchType(t.child(h).type);return!a||!a.validEnd?null:o}function ge(i,e,t){let r=w.empty;for(let o=t.length-1;o>=0;o--){if(r.size){let l=t[o].type.contentMatch.matchFragment(r);if(!l||!l.validEnd)throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper")}r=w.from(t[o].type.create(t[o].attrs,r))}let n=e.start,s=e.end;i.step(new M(n,s,n,s,new g(r,0,0),t.length,!0))}function we(i,e,t,r,n){if(!r.isTextblock)throw new RangeError("Type given to setBlockType should be a textblock");let s=i.steps.length;i.doc.nodesBetween(e,t,(o,l)=>{if(o.isTextblock&&!o.hasMarkup(r,n)&&ye(i.doc,i.mapping.slice(s).map(l),r)){i.clearIncompatible(i.mapping.slice(s).map(l,1),r);let a=i.mapping.slice(s),h=a.map(l,1),p=a.map(l+o.nodeSize,1);return i.step(new M(h,p,h+1,p-1,new g(w.from(r.create(n,null,o.marks)),0,0),1,!0)),!1}})}function ye(i,e,t){let r=i.resolve(e),n=r.index();return r.parent.canReplaceWith(n,n+1,t)}function ke(i,e,t,r,n){let s=i.doc.nodeAt(e);if(!s)throw new RangeError("No node at given position");t||(t=s.type);let o=t.create(r,null,n||s.marks);if(s.isLeaf)return i.replaceWith(e,e+s.nodeSize,o);if(!t.validContent(s.content))throw new RangeError("Invalid content for node type "+t.name);i.step(new M(e,e+s.nodeSize,e+1,e+s.nodeSize-1,new g(w.from(o),0,0),1,!0))}function ze(i,e,t=1,r){let n=i.resolve(e),s=n.depth-t,o=r&&r[r.length-1]||n.parent;if(s<0||n.parent.type.spec.isolating||!n.parent.canReplace(n.index(),n.parent.childCount)||!o.type.validContent(n.parent.content.cutByIndex(n.index(),n.parent.childCount)))return!1;for(let h=n.depth-1,p=t-2;h>s;h--,p--){let f=n.node(h),c=n.index(h);if(f.type.spec.isolating)return!1;let d=f.content.cutByIndex(c,f.childCount),u=r&&r[p+1];u&&(d=d.replaceChild(0,u.type.create(u.attrs)));let m=r&&r[p]||f;if(!f.canReplace(c+1,f.childCount)||!m.type.validContent(d))return!1}let l=n.indexAfter(s),a=r&&r[0];return n.node(s).canReplaceWith(l,l,a?a.type:n.node(s+1).type)}function ve(i,e,t=1,r){let n=i.doc.resolve(e),s=w.empty,o=w.empty;for(let l=n.depth,a=n.depth-t,h=t-1;l>a;l--,h--){s=w.from(n.node(l).copy(s));let p=r&&r[h];o=w.from(p?p.type.create(p.attrs,o):n.node(l).copy(o))}i.step(new S(e,e,new g(s.append(o),t,t),!0))}function Fe(i,e){let t=i.resolve(e),r=t.index();return j(t.nodeBefore,t.nodeAfter)&&t.parent.canReplace(r,r+1)}function j(i,e){return!!(i&&e&&!i.isLeaf&&i.canAppend(e))}function Ae(i,e,t=-1){let r=i.resolve(e);for(let n=r.depth;;n--){let s,o,l=r.index(n);if(n==r.depth?(s=r.nodeBefore,o=r.nodeAfter):t>0?(s=r.node(n+1),l++,o=r.node(n).maybeChild(l)):(s=r.node(n).maybeChild(l-1),o=r.node(n+1)),s&&!s.isTextblock&&j(s,o)&&r.node(n).canReplace(l,l+1))return e;if(n==0)break;e=t<0?r.before(n):r.after(n)}}function Se(i,e,t){let r=new S(e-t,e+t,g.empty,!0);i.step(r)}function xe(i,e,t){let r=i.resolve(e);if(r.parent.canReplaceWith(r.index(),r.index(),t))return e;if(r.parentOffset==0)for(let n=r.depth-1;n>=0;n--){let s=r.index(n);if(r.node(n).canReplaceWith(s,s,t))return r.before(n+1);if(s>0)return null}if(r.parentOffset==r.parent.content.size)for(let n=r.depth-1;n>=0;n--){let s=r.indexAfter(n);if(r.node(n).canReplaceWith(s,s,t))return r.after(n+1);if(s<r.node(n).childCount)return null}return null}function Je(i,e,t){let r=i.resolve(e);if(!t.content.size)return e;let n=t.content;for(let s=0;s<t.openStart;s++)n=n.firstChild.content;for(let s=1;s<=(t.openStart==0&&t.size?2:1);s++)for(let o=r.depth;o>=0;o--){let l=o==r.depth?0:r.pos<=(r.start(o+1)+r.end(o+1))/2?-1:1,a=r.index(o)+(l>0?1:0),h=r.node(o),p=!1;if(s==1)p=h.canReplace(a,a,n);else{let f=h.contentMatchAt(a).findWrapping(n.firstChild.type);p=f&&h.canReplaceWith(a,a,f[0])}if(p)return l==0?r.pos:l<0?r.before(o+1):r.after(o+1)}return null}function Me(i,e,t=e,r=g.empty){if(e==t&&!r.size)return null;let n=i.resolve(e),s=i.resolve(t);return _(n,s,r)?new S(e,t,r):new P(n,s,r).fit()}function _(i,e,t){return!t.openStart&&!t.openEnd&&i.start()==e.start()&&i.parent.canReplace(i.index(),e.index(),t.content)}var P=class{constructor(e,t,r){this.$from=e,this.$to=t,this.unplaced=r,this.frontier=[],this.placed=w.empty;for(let n=0;n<=e.depth;n++){let s=e.node(n);this.frontier.push({type:s.type,match:s.contentMatchAt(e.indexAfter(n))})}for(let n=e.depth;n>0;n--)this.placed=w.from(e.node(n).copy(this.placed))}get depth(){return this.frontier.length-1}fit(){for(;this.unplaced.size;){let h=this.findFittable();h?this.placeNodes(h):this.openMore()||this.dropNode()}let e=this.mustMoveInline(),t=this.placed.size-this.depth-this.$from.depth,r=this.$from,n=this.close(e<0?this.$to:r.doc.resolve(e));if(!n)return null;let s=this.placed,o=r.depth,l=n.depth;for(;o&&l&&s.childCount==1;)s=s.firstChild.content,o--,l--;let a=new g(s,o,l);return e>-1?new M(r.pos,e,this.$to.pos,this.$to.end(),a,t):a.size||r.pos!=this.$to.pos?new S(r.pos,n.pos,a):null}findFittable(){let e=this.unplaced.openStart;for(let t=this.unplaced.content,r=0,n=this.unplaced.openEnd;r<e;r++){let s=t.firstChild;if(t.childCount>1&&(n=0),s.type.spec.isolating&&n<=r){e=r;break}t=s.content}for(let t=1;t<=2;t++)for(let r=t==1?e:this.unplaced.openStart;r>=0;r--){let n,s=null;r?(s=W(this.unplaced.content,r-1).firstChild,n=s.content):n=this.unplaced.content;let o=n.firstChild;for(let l=this.depth;l>=0;l--){let{type:a,match:h}=this.frontier[l],p,f=null;if(t==1&&(o?h.matchType(o.type)||(f=h.fillBefore(w.from(o),!1)):s&&a.compatibleContent(s.type)))return{sliceDepth:r,frontierDepth:l,parent:s,inject:f};if(t==2&&o&&(p=h.findWrapping(o.type)))return{sliceDepth:r,frontierDepth:l,parent:s,wrap:p};if(s&&h.matchType(s.type))break}}}openMore(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=W(e,t);return!n.childCount||n.firstChild.isLeaf?!1:(this.unplaced=new g(e,t+1,Math.max(r,n.size+t>=e.size-r?t+1:0)),!0)}dropNode(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=W(e,t);if(n.childCount<=1&&t>0){let s=e.size-t<=t+n.size;this.unplaced=new g(I(e,t-1,1),t-1,s?t-1:r)}else this.unplaced=new g(I(e,t,1),t,r)}placeNodes({sliceDepth:e,frontierDepth:t,parent:r,inject:n,wrap:s}){for(;this.depth>t;)this.closeFrontierNode();if(s)for(let m=0;m<s.length;m++)this.openFrontierNode(s[m]);let o=this.unplaced,l=r?r.content:o.content,a=o.openStart-e,h=0,p=[],{match:f,type:c}=this.frontier[t];if(n){for(let m=0;m<n.childCount;m++)p.push(n.child(m));f=f.matchFragment(n)}let d=l.size+e-(o.content.size-o.openEnd);for(;h<l.childCount;){let m=l.child(h),v=f.matchType(m.type);if(!v)break;h++,(h>1||a==0||m.content.size)&&(f=v,p.push(ee(m.mark(c.allowedMarks(m.marks)),h==1?a:0,h==l.childCount?d:-1)))}let u=h==l.childCount;u||(d=-1),this.placed=R(this.placed,t,w.from(p)),this.frontier[t].match=f,u&&d<0&&r&&r.type==this.frontier[this.depth].type&&this.frontier.length>1&&this.closeFrontierNode();for(let m=0,v=l;m<d;m++){let N=v.lastChild;this.frontier.push({type:N.type,match:N.contentMatchAt(N.childCount)}),v=N.content}this.unplaced=u?e==0?g.empty:new g(I(o.content,e-1,1),e-1,d<0?o.openEnd:e-1):new g(I(o.content,e,h),o.openStart,o.openEnd)}mustMoveInline(){if(!this.$to.parent.isTextblock)return-1;let e=this.frontier[this.depth],t;if(!e.type.isTextblock||!D(this.$to,this.$to.depth,e.type,e.match,!1)||this.$to.depth==this.depth&&(t=this.findCloseLevel(this.$to))&&t.depth==this.depth)return-1;let{depth:r}=this.$to,n=this.$to.after(r);for(;r>1&&n==this.$to.end(--r);)++n;return n}findCloseLevel(e){e:for(let t=Math.min(this.depth,e.depth);t>=0;t--){let{match:r,type:n}=this.frontier[t],s=t<e.depth&&e.end(t+1)==e.pos+(e.depth-(t+1)),o=D(e,t,n,r,s);if(o){for(let l=t-1;l>=0;l--){let{match:a,type:h}=this.frontier[l],p=D(e,l,h,a,!0);if(!p||p.childCount)continue e}return{depth:t,fit:o,move:s?e.doc.resolve(e.after(t+1)):e}}}}close(e){let t=this.findCloseLevel(e);if(!t)return null;for(;this.depth>t.depth;)this.closeFrontierNode();t.fit.childCount&&(this.placed=R(this.placed,t.depth,t.fit)),e=t.move;for(let r=t.depth+1;r<=e.depth;r++){let n=e.node(r),s=n.type.contentMatch.fillBefore(n.content,!0,e.index(r));this.openFrontierNode(n.type,n.attrs,s)}return e}openFrontierNode(e,t=null,r){let n=this.frontier[this.depth];n.match=n.match.matchType(e),this.placed=R(this.placed,this.depth,w.from(e.create(t,r))),this.frontier.push({type:e,match:e.contentMatch})}closeFrontierNode(){let t=this.frontier.pop().match.fillBefore(w.empty,!0);t.childCount&&(this.placed=R(this.placed,this.frontier.length,t))}};function I(i,e,t){return e==0?i.cutByIndex(t,i.childCount):i.replaceChild(0,i.firstChild.copy(I(i.firstChild.content,e-1,t)))}function R(i,e,t){return e==0?i.append(t):i.replaceChild(i.childCount-1,i.lastChild.copy(R(i.lastChild.content,e-1,t)))}function W(i,e){for(let t=0;t<e;t++)i=i.firstChild.content;return i}function ee(i,e,t){if(e<=0)return i;let r=i.content;return e>1&&(r=r.replaceChild(0,ee(r.firstChild,e-1,r.childCount==1?t-1:0))),e>0&&(r=i.type.contentMatch.fillBefore(r).append(r),t<=0&&(r=r.append(i.type.contentMatch.matchFragment(r).fillBefore(w.empty,!0)))),i.copy(r)}function D(i,e,t,r,n){let s=i.node(e),o=n?i.indexAfter(e):i.index(e);if(o==s.childCount&&!t.compatibleContent(s.type))return null;let l=r.fillBefore(s.content,!0,o);return l&&!Ne(t,s.content,o)?l:null}function Ne(i,e,t){for(let r=t;r<e.childCount;r++)if(!i.allowsMarks(e.child(r).marks))return!0;return!1}function be(i){return i.spec.defining||i.spec.definingForContent}function Ce(i,e,t,r){if(!r.size)return i.deleteRange(e,t);let n=i.doc.resolve(e),s=i.doc.resolve(t);if(_(n,s,r))return i.step(new S(e,t,r));let o=re(n,i.doc.resolve(t));o[o.length-1]==0&&o.pop();let l=-(n.depth+1);o.unshift(l);for(let c=n.depth,d=n.pos-1;c>0;c--,d--){let u=n.node(c).type.spec;if(u.defining||u.definingAsContext||u.isolating)break;o.indexOf(c)>-1?l=c:n.before(c)==d&&o.splice(1,0,-c)}let a=o.indexOf(l),h=[],p=r.openStart;for(let c=r.content,d=0;;d++){let u=c.firstChild;if(h.push(u),d==r.openStart)break;c=u.content}for(let c=p-1;c>=0;c--){let d=h[c],u=be(d.type);if(u&&!d.sameMarkup(n.node(Math.abs(l)-1)))p=c;else if(u||!d.type.isTextblock)break}for(let c=r.openStart;c>=0;c--){let d=(c+p+1)%(r.openStart+1),u=h[d];if(u)for(let m=0;m<o.length;m++){let v=o[(m+a)%o.length],N=!0;v<0&&(N=!1,v=-v);let ne=n.node(v-1),$=n.index(v-1);if(ne.canReplaceWith($,$,u.type,u.marks))return i.replace(n.before(v),N?s.after(v):t,new g(te(r.content,0,r.openStart,d),d,r.openEnd))}}let f=i.steps.length;for(let c=o.length-1;c>=0&&(i.replace(e,t,r),!(i.steps.length>f));c--){let d=o[c];d<0||(e=n.before(d),t=s.after(d))}}function te(i,e,t,r,n){if(e<t){let s=i.firstChild;i=i.replaceChild(0,s.copy(te(s.content,e+1,t,r,s)))}if(e>r){let s=n.contentMatchAt(0),o=s.fillBefore(i).append(i);i=o.append(s.matchFragment(o).fillBefore(w.empty,!0))}return i}function Ie(i,e,t,r){if(!r.isInline&&e==t&&i.doc.resolve(e).parent.content.size){let n=xe(i.doc,e,r.type);n!=null&&(e=t=n)}i.replaceRange(e,t,new g(w.from(r),0,0))}function Re(i,e,t){let r=i.doc.resolve(e),n=i.doc.resolve(t),s=re(r,n);for(let o=0;o<s.length;o++){let l=s[o],a=o==s.length-1;if(a&&l==0||r.node(l).type.contentMatch.validEnd)return i.delete(r.start(l),n.end(l));if(l>0&&(a||r.node(l-1).canReplace(r.index(l-1),n.indexAfter(l-1))))return i.delete(r.before(l),n.after(l))}for(let o=1;o<=r.depth&&o<=n.depth;o++)if(e-r.start(o)==r.depth-o&&t>r.end(o)&&n.end(o)-t!=n.depth-o)return i.delete(r.before(o),t);i.delete(e,t)}function re(i,e){let t=[],r=Math.min(i.depth,e.depth);for(let n=r;n>=0;n--){let s=i.start(n);if(s<i.pos-(i.depth-n)||e.end(n)>e.pos+(e.depth-n)||i.node(n).type.spec.isolating||e.node(n).type.spec.isolating)break;(s==e.start(n)||n==i.depth&&n==e.depth&&i.parent.inlineContent&&e.parent.inlineContent&&n&&e.start(n-1)==s-1)&&t.push(n)}return t}var A=class i extends y{constructor(e,t,r){super(),this.pos=e,this.attr=t,this.value=r}apply(e){let t=e.nodeAt(this.pos);if(!t)return k.fail("No node at attribute step's position");let r=Object.create(null);for(let s in t.attrs)r[s]=t.attrs[s];r[this.attr]=this.value;let n=t.type.create(r,null,t.marks);return k.fromReplace(e,this.pos,this.pos+1,new g(w.from(n),0,t.isLeaf?0:1))}getMap(){return x.empty}invert(e){return new i(this.pos,this.attr,e.nodeAt(this.pos).attrs[this.attr])}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new i(t.pos,this.attr,this.value)}toJSON(){return{stepType:"attr",pos:this.pos,attr:this.attr,value:this.value}}static fromJSON(e,t){if(typeof t.pos!="number"||typeof t.attr!="string")throw new RangeError("Invalid input for AttrStep.fromJSON");return new i(t.pos,t.attr,t.value)}};y.jsonID("attr",A);var J=class i extends y{constructor(e,t){super(),this.attr=e,this.value=t}apply(e){let t=Object.create(null);for(let n in e.attrs)t[n]=e.attrs[n];t[this.attr]=this.value;let r=e.type.create(t,e.content,e.marks);return k.ok(r)}getMap(){return x.empty}invert(e){return new i(this.attr,e.attrs[this.attr])}map(e){return this}toJSON(){return{stepType:"docAttr",attr:this.attr,value:this.value}}static fromJSON(e,t){if(typeof t.attr!="string")throw new RangeError("Invalid input for DocAttrStep.fromJSON");return new i(t.attr,t.value)}};y.jsonID("docAttr",J);var C=class extends Error{};C=function i(e){let t=Error.call(this,e);return t.__proto__=i.prototype,t};C.prototype=Object.create(Error.prototype);C.prototype.constructor=C;C.prototype.name="TransformError";var Q=class{constructor(e){this.doc=e,this.steps=[],this.docs=[],this.mapping=new L}get before(){return this.docs.length?this.docs[0]:this.doc}step(e){let t=this.maybeStep(e);if(t.failed)throw new C(t.failed);return this}maybeStep(e){let t=e.apply(this.doc);return t.failed||this.addStep(e,t.doc),t}get docChanged(){return this.steps.length>0}addStep(e,t){this.docs.push(this.doc),this.steps.push(e),this.mapping.appendMap(e.getMap()),this.doc=t}replace(e,t=e,r=g.empty){let n=Me(this.doc,e,t,r);return n&&this.step(n),this}replaceWith(e,t,r){return this.replace(e,t,new g(w.from(r),0,0))}delete(e,t){return this.replace(e,t,g.empty)}insert(e,t){return this.replaceWith(e,e,t)}replaceRange(e,t,r){return Ce(this,e,t,r),this}replaceRangeWith(e,t,r){return Ie(this,e,t,r),this}deleteRange(e,t){return Re(this,e,t),this}lift(e,t){return ce(this,e,t),this}join(e,t=1){return Se(this,e,t),this}wrap(e,t){return ge(this,e,t),this}setBlockType(e,t=e,r,n=null){return we(this,e,t,r,n),this}setNodeMarkup(e,t,r=null,n){return ke(this,e,t,r,n),this}setNodeAttribute(e,t,r){return this.step(new A(e,t,r)),this}setDocAttribute(e,t){return this.step(new J(e,t)),this}addNodeMark(e,t){return this.step(new O(e,t)),this}removeNodeMark(e,t){if(!(t instanceof oe)){let r=this.doc.nodeAt(e);if(!r)throw new RangeError("No node at position "+e);if(t=t.isInSet(r.marks),!t)return this}return this.step(new z(e,t)),this}split(e,t=1,r){return ve(this,e,t,r),this}addMark(e,t,r){return he(this,e,t,r),this}removeMark(e,t,r){return pe(this,e,t,r),this}clearIncompatible(e,t,r){return fe(this,e,t,r),this}};export{T as AddMarkStep,O as AddNodeMarkStep,A as AttrStep,J as DocAttrStep,E as MapResult,L as Mapping,b as RemoveMarkStep,z as RemoveNodeMarkStep,M as ReplaceAroundStep,S as ReplaceStep,y as Step,x as StepMap,k as StepResult,Q as Transform,C as TransformError,Fe as canJoin,ze as canSplit,Je as dropPoint,Oe as findWrapping,xe as insertPoint,Ae as joinPoint,Te as liftTarget,Me as replaceStep};
//# sourceMappingURL=prosemirror-transform.mjs.map