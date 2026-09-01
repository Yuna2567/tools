(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64033,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(13590),a=e.i(45910);let s="gacha.items",o="拉麵\n咖哩\n炒飯\n壽司\n漢堡\n吃土",i=[[120,170,18],[86,160,15],[154,158,16],[64,140,13],[176,138,13],[104,138,15],[138,142,14],[120,112,13],[88,114,12],[152,112,12],[110,84,11],[148,80,10],[80,86,10],[120,56,9],[170,104,10],[70,110,10]],l=[[150,340,10],[178,346,7]];function c({cx:e,cy:r,r:n}){return(0,t.jsxs)("g",{children:[(0,t.jsx)("circle",{cx:e,cy:r,r:n,fill:"#fff",stroke:"#14130f",strokeWidth:1.7}),(0,t.jsx)("circle",{cx:e-.33*n,cy:r-.1*n,r:1.4,fill:"#14130f"}),(0,t.jsx)("circle",{cx:e+.33*n,cy:r-.1*n,r:1.4,fill:"#14130f"}),(0,t.jsx)("path",{d:`M${e-.3*n} ${r+.18*n} Q${e} ${r+.46*n} ${e+.3*n} ${r+.18*n}`,fill:"none",stroke:"#14130f",strokeWidth:1.4,strokeLinecap:"round"})]})}e.s(["default",0,function(){let[e,f]=(0,r.useState)(o),[u,d]=(0,r.useState)("idle"),[p,h]=(0,r.useState)(null),[g,x]=(0,r.useState)(0),[m,b]=(0,r.useState)([]),y=(0,r.useRef)([]);(0,r.useEffect)(()=>{let e=localStorage.getItem(s);null!==e&&f(e);let t=y.current;return()=>t.forEach(clearTimeout)},[]),(0,r.useEffect)(()=>{localStorage.setItem(s,e)},[e]);let j=(0,r.useMemo)(()=>e.split(/[\n,，、]/).map(e=>e.trim()).filter(Boolean),[e]);return(0,t.jsxs)("main",{className:"mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-9 px-5 py-12 sm:px-8",children:[(0,t.jsx)(n.default,{eyebrow:"Gachapon",title:"扭蛋機",children:"左側輸入項目，轉動旋鈕，蛋殼「喀」一聲彈開，隨機抽出一個結果。適合決定午餐吃什麼、換誰報告。"}),(0,t.jsxs)("div",{className:"grid gap-8 md:grid-cols-[300px_1fr]",children:[(0,t.jsxs)("section",{className:"flex flex-col gap-3",children:[(0,t.jsxs)("label",{htmlFor:"items",className:"tb-eyebrow text-tb-ink-soft",children:["項目（",j.length,"）"]}),(0,t.jsx)("textarea",{id:"items",value:e,onChange:e=>f(e.target.value),disabled:"rolling"===u,rows:11,placeholder:"項目一\n項目二\n項目三",className:"tb-input w-full resize-y font-mono text-sm leading-6 disabled:opacity-60"}),(0,t.jsx)("button",{onClick:()=>{f(o),b([]),h(null),d("idle")},disabled:"rolling"===u,className:"self-start text-xs text-tb-ink-soft underline underline-offset-2 hover:text-tb-ink disabled:opacity-50",children:"重設範例"}),m.length>0&&(0,t.jsxs)("div",{className:"mt-2 border-t border-tb-line pt-3",children:[(0,t.jsx)("p",{className:"tb-eyebrow text-tb-ink-soft",children:"剛剛轉到"}),(0,t.jsx)("ol",{className:"mt-2 flex flex-col gap-1 text-sm text-tb-ink-soft",children:m.map((e,r)=>(0,t.jsxs)("li",{className:"tabular-nums",children:[(0,t.jsx)("span",{className:"mr-2 text-tb-line",children:String(m.length-r).padStart(2,"0")}),e]},`${e}-${r}`))})]})]}),(0,t.jsxs)("section",{className:"flex flex-col items-center gap-6",children:[(0,t.jsxs)("div",{className:"tb-card w-full max-w-[380px] p-6",children:[(0,t.jsxs)("div",{className:"mb-1 flex items-center justify-between",children:[(0,t.jsx)("span",{className:"tb-eyebrow text-tb-ink-soft",children:"Gachapon"}),(0,t.jsxs)("span",{className:"text-xs text-tb-ink-soft",children:[j.length," 顆"]})]}),(0,t.jsxs)("svg",{viewBox:"0 0 240 356",className:`gacha-machine block w-full ${"rolling"===u?"is-rolling":""}`,children:[(0,t.jsx)("circle",{cx:"120",cy:"100",r:"88",fill:"#cfe6ec",stroke:"#14130f",strokeWidth:"2.6"}),(0,t.jsx)("path",{d:"M62 58 Q78 40 106 38",fill:"none",stroke:"#fff",strokeWidth:"6.5",strokeLinecap:"round"}),(0,t.jsx)("path",{d:"M56 80 Q60 68 74 61",fill:"none",stroke:"#fff",strokeWidth:"5",strokeLinecap:"round"}),(0,t.jsx)("g",{className:"gacha-balls",children:i.map(([e,r,n],a)=>(0,t.jsx)(c,{cx:e,cy:r,r:n},a))}),l.map(([e,r,n],a)=>(0,t.jsx)(c,{cx:e,cy:r,r:n},`g${a}`)),"idle"!==u&&(0,t.jsx)("g",{className:"gacha-drop",children:(0,t.jsx)(c,{cx:78,cy:344,r:11})}),(0,t.jsx)("rect",{x:"38",y:"176",width:"164",height:"150",rx:"14",fill:"#c0512c",stroke:"#14130f",strokeWidth:"2.6"}),(0,t.jsx)("rect",{x:"54",y:"192",width:"58",height:"34",rx:"4",fill:"#f4efe2",stroke:"#14130f",strokeWidth:"2"}),(0,t.jsx)("circle",{cx:"83",cy:"209",r:"9",fill:"#fff",stroke:"#14130f",strokeWidth:"1.6"}),(0,t.jsx)("rect",{x:"150",y:"196",width:"18",height:"5",rx:"2.5",fill:"#14130f"}),(0,t.jsx)("rect",{x:"176",y:"206",width:"10",height:"46",rx:"5",fill:"#14130f"}),(0,t.jsx)("text",{x:"181",y:"266",textAnchor:"middle",fontSize:"9",fontWeight:"800",fill:"#f4efe2",children:"PULL"}),(0,t.jsxs)("g",{style:{transform:`rotate(${g}deg)`,transformOrigin:"104px 262px",transition:"transform 1.2s cubic-bezier(.28,.9,.3,1)"},children:[(0,t.jsx)("circle",{cx:"104",cy:"262",r:"30",fill:"#dca42b",stroke:"#14130f",strokeWidth:"2.6"}),(0,t.jsx)("rect",{x:"99",y:"234",width:"10",height:"56",rx:"5",fill:"#14130f"}),(0,t.jsx)("path",{d:"M126 250 a24 24 0 0 1 3 12",fill:"none",stroke:"#14130f",strokeWidth:"2.4",strokeLinecap:"round"}),(0,t.jsx)("path",{d:"M129 262 l-3.5 -3 l4.5 -1 z",fill:"#14130f"})]}),(0,t.jsx)("circle",{cx:"150",cy:"298",r:"6",fill:"#5c7150",stroke:"#14130f",strokeWidth:"2"}),(0,t.jsx)("circle",{cx:"170",cy:"298",r:"6",fill:"#5c7150",stroke:"#14130f",strokeWidth:"2"}),(0,t.jsx)("path",{d:"M96 311 h48",stroke:"#14130f",strokeWidth:"1.3",strokeDasharray:"3 3"}),(0,t.jsx)("g",{className:"gacha-flap",children:(0,t.jsx)("rect",{x:"96",y:"300",width:"48",height:"22",rx:"4",fill:"#f4efe2",stroke:"#14130f",strokeWidth:"2"})})]})]}),(0,t.jsx)("button",{onClick:function(){if("rolling"===u||j.length<1)return;let e=j[Math.floor(Math.random()*j.length)];h(null),d("rolling"),x(e=>e+540),y.current.push(setTimeout(()=>{h(e),d("done"),b(t=>[e,...t].slice(0,12))},1300))},disabled:"rolling"===u||j.length<1,className:"tb-btn tb-btn-primary",children:"rolling"===u?"轉動中…":"done"===u?"再扭一顆":"扭一下！"}),j.length<1&&(0,t.jsx)("p",{className:"text-sm text-tb-clay",children:"先在左邊輸入至少一個項目。"}),(0,t.jsx)("div",{className:"flex min-h-[168px] flex-col items-center justify-center gap-4",children:p&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:`gacha-egg ${"done"===u?"is-open":""}`,children:[(0,t.jsx)("span",{className:"egg-half egg-top"}),(0,t.jsx)("span",{className:"egg-half egg-bot"}),(0,t.jsx)("span",{className:"egg-item",children:p})]}),(0,t.jsxs)("p",{className:"flex items-center gap-2 text-sm text-tb-ink",children:["抽到了",(0,t.jsx)(a.CircleArrow,{size:20,className:"text-tb-ink"})]})]})})]})]}),(0,t.jsx)("style",{children:`
        @keyframes gacha-wobble {
          0%   { transform: rotate(0) translateY(0) scale(1); }
          8%   { transform: rotate(-3deg) scale(1.015); }
          20%  { transform: rotate(4.5deg) translateY(-3px) scaleY(0.96); }
          32%  { transform: rotate(-3.5deg) translateY(0) scaleY(1.03); }
          46%  { transform: rotate(3deg) translateY(-2px); }
          60%  { transform: rotate(-2deg) translateY(0); }
          74%  { transform: rotate(1.3deg); }
          88%  { transform: rotate(-0.6deg); }
          100% { transform: rotate(0) translateY(0) scale(1); }
        }
        .gacha-machine {
          transform-origin: 50% 92%;
          transition: transform 0.2s ease;
        }
        .gacha-machine.is-rolling {
          animation: gacha-wobble 1.3s cubic-bezier(.32,.5,.35,1);
        }

        @keyframes gacha-balls-jiggle {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(-2px, -2px) rotate(-1deg); }
          65% { transform: translate(2px, -1px) rotate(1deg); }
        }
        .gacha-balls { transform-origin: 120px 120px; }
        .gacha-machine.is-rolling .gacha-balls {
          animation: gacha-balls-jiggle 0.13s ease-in-out 9;
        }

        @keyframes gacha-flap-open {
          0%, 100% { transform: rotate(0); }
          35% { transform: rotate(-30deg); }
          70% { transform: rotate(-6deg); }
        }
        .gacha-flap { transform-origin: 96px 300px; }
        .gacha-machine.is-rolling .gacha-flap {
          animation: gacha-flap-open 0.6s ease 0.55s;
        }

        @keyframes gacha-drop {
          0% { transform: translate(28px, -60px) scale(0.7); opacity: 0; }
          45% { opacity: 0; }
          58% { transform: translate(14px, -60px) scale(0.9); opacity: 1; }
          80% { transform: translate(0, 8px) scale(1); }
          92% { transform: translate(0, -4px); }
          100% { transform: translate(0, 0); }
        }
        .gacha-drop { opacity: 0; }
        .gacha-machine.is-rolling .gacha-drop {
          animation: gacha-drop 0.85s cubic-bezier(.3,1.3,.5,1) 0.5s forwards;
        }
        .gacha-machine:not(.is-rolling) .gacha-drop { opacity: 1; }

        @keyframes gacha-pop {
          0% { opacity: 0; transform: translateY(-28px) scale(0.3) rotate(-14deg); }
          55% { opacity: 1; transform: translateY(0) scale(1.14) rotate(5deg); }
          75% { transform: scale(0.95) rotate(-2deg); }
          100% { transform: scale(1) rotate(0); }
        }
        .gacha-egg {
          position: relative;
          width: 120px;
          height: 120px;
          animation: gacha-pop 0.5s cubic-bezier(.3,1.2,.5,1) both;
        }
        .egg-half {
          position: absolute;
          left: 0;
          width: 120px;
          height: 60px;
          border: 1.8px solid #14130f;
          transition: transform 0.5s cubic-bezier(.2,.85,.25,1);
        }
        .egg-top {
          top: 0;
          border-radius: 60px 60px 0 0;
          border-bottom: none;
          background: #dca42b;
        }
        .egg-bot {
          bottom: 0;
          border-radius: 0 0 60px 60px;
          background: #fff;
        }
        .gacha-egg.is-open .egg-top {
          transform: translate(-14px, -18px) rotate(-16deg);
        }
        .gacha-egg.is-open .egg-bot {
          transform: translateY(14px);
        }
        .egg-item {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
          text-align: center;
          font-weight: 800;
          font-size: 17px;
          color: #14130f;
          opacity: 0;
          transition: opacity 0.35s ease 0.2s;
        }
        .gacha-egg.is-open .egg-item { opacity: 1; }
      `})]})}])},13590,45910,e=>{"use strict";var t=e.i(43476),r=e.i(22016);function n({className:e=""}){return(0,t.jsx)("div",{className:`tb-rule ${e}`})}e.s(["CircleArrow",0,function({className:e="",size:r=26}){return(0,t.jsxs)("svg",{width:r,height:r,viewBox:"0 0 26 26",fill:"none",className:e,"aria-hidden":"true",children:[(0,t.jsx)("circle",{cx:"13",cy:"13",r:"12",stroke:"currentColor",strokeWidth:"1"}),(0,t.jsx)("path",{d:"M10 13h6m-2.4-2.6L16.2 13l-2.6 2.6",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"})]})},"Kicker",0,function({label:e,sub:r}){return(0,t.jsxs)("span",{className:"flex items-center gap-2 text-[11px] tracking-wide text-tb-ink-soft",children:[(0,t.jsx)("span",{className:"font-display font-semibold uppercase tracking-[0.18em]",children:e}),null!=r&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{className:"text-tb-line",children:"｜"}),(0,t.jsx)("span",{children:r})]})]})},"Rule",0,n],45910),e.s(["default",0,function({eyebrow:e,title:a,children:s}){return(0,t.jsxs)("header",{className:"flex w-full flex-col gap-4",children:[(0,t.jsx)(r.default,{href:"/",className:"text-[12px] tracking-wide text-tb-ink-soft transition-colors hover:text-tb-ink",children:"← 回工具箱"}),(0,t.jsx)(n,{}),(0,t.jsxs)("div",{className:"flex flex-col gap-2 pt-3",children:[(0,t.jsx)("span",{className:"tb-eyebrow text-tb-ink-soft",children:e}),(0,t.jsx)("h1",{className:"text-[2rem] font-extrabold leading-tight tracking-tight text-tb-ink sm:text-[2.6rem]",children:a})]}),s&&(0,t.jsx)("p",{className:"max-w-2xl text-sm leading-7 text-tb-ink-soft",children:s})]})}],13590)},22016,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return m},useLinkStatus:function(){return y}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=e.r(90809),o=e.r(43476),i=s._(e.r(71645)),l=e.r(95057),c=e.r(8372),f=e.r(18581),u=e.r(18967),d=e.r(5550),p=e.r(88540),h=e.r(91949),g=e.r(73668),x=e.r(9396);function m(t){var r;let n,a,s,[m,y]=(0,i.useOptimistic)(h.IDLE_LINK_STATUS),j=(0,i.useRef)(null),{href:k,as:v,children:N,prefetch:w=null,passHref:P,replace:S,shallow:E,scroll:_,onClick:C,onMouseEnter:O,onTouchStart:T,legacyBehavior:$=!1,onNavigate:L,transitionTypes:M,ref:R,unstable_dynamicOnHover:A,...U}=t;n=N,$&&("string"==typeof n||"number"==typeof n)&&(n=(0,o.jsx)("a",{children:n}));let W=i.default.useContext(c.AppRouterContext),I=!1!==w,z=!1===w?"none":!0===w?"full":"auto",B="none"!==z?"auto"===z?x.FetchStrategy.PPR:x.FetchStrategy.Full:x.FetchStrategy.PPR,F="string"==typeof(r=v||k)?r:(0,l.formatUrl)(r);if($){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=i.default.Children.only(n)}let D=$?a&&"object"==typeof a&&a.ref:R,Y,K=i.default.useCallback(e=>(null!==W&&(j.current=(0,h.mountLinkInstance)(e,F,W,B,I,y,Y)),()=>{j.current&&((0,h.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,h.unmountPrefetchableInstance)(e)}),[I,F,W,B,y,Y]),Q={ref:(0,f.useMergedRef)(K,D),onClick(t){$||"function"!=typeof C||C(t),$&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!W||t.defaultPrevented||function(t,r,n,a,s,o,l,c="none"){if("u">typeof window){let f,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((f=t.currentTarget.getAttribute("target"))&&"_self"!==f||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);i.default.startTransition(()=>{d(r,a?"replace":"push",!1===s?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,n.current,l,c)})}}(t,F,j,S,_,L,M,z)},onMouseEnter(e){$||"function"!=typeof O||O(e),$&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),W&&I&&(0,h.onNavigationIntent)(e.currentTarget,!0===A)},onTouchStart:function(e){$||"function"!=typeof T||T(e),$&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),W&&I&&(0,h.onNavigationIntent)(e.currentTarget,!0===A)}};return(0,u.isAbsoluteUrl)(F)?Q.href=F:$&&!P&&("a"!==a.type||"href"in a.props)||(Q.href=(0,d.addBasePath)(F)),s=$?i.default.cloneElement(a,Q):(0,o.jsx)("a",{...U,...Q,children:n}),(0,o.jsx)(b.Provider,{value:m,children:s})}let b=(0,i.createContext)(h.IDLE_LINK_STATUS),y=()=>(0,i.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let n=e.r(71645);function a(e,t){let r=(0,n.useRef)(null),a=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=s(e,n)),t&&(a.current=s(t,n))},[e,t])}function s(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return m},MiddlewareNotFoundError:function(){return k},MissingStaticPage:function(){return j},NormalizeError:function(){return b},PageNotFoundError:function(){return y},SP:function(){return g},ST:function(){return x},WEB_VITALS:function(){return s},execOnce:function(){return o},getDisplayName:function(){return u},getLocationOrigin:function(){return c},getURL:function(){return f},isAbsoluteUrl:function(){return l},isResSent:function(){return d},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return v}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let i=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&i.test(e)};function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function f(){let{href:e}=window.location,t=c();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function d(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&d(r))return n;if(!n)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let g="u">typeof performance,x=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class m extends Error{}class b extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class k extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return s}});let n=e.r(18967),a=e.r(52817);function s(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return s},urlQueryToSearchParams:function(){return i}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});function s(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function o(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function i(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,o(e));else t.set(r,o(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return i},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=e.r(90809)._(e.r(98183)),o=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,n=e.protocol||"",a=e.pathname||"",i=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(s.urlQueryToSearchParams(l)));let f=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||o.test(n))&&!1!==c?(c="//"+(c||""),a&&"/"!==a[0]&&(a="/"+a)):c||(c=""),i&&"#"!==i[0]&&(i="#"+i),f&&"?"!==f[0]&&(f="?"+f),a=a.replace(/[?#]/g,encodeURIComponent),f=f.replace("#","%23"),`${n}${c}${a}${f}${i}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return i(e)}}]);