/**
 * Scroll reveals without a JS animation library (~1 KB, runs before hydration).
 *
 * Every [data-reveal] element gets a *paused* Web Animation whose backwards
 * fill hides it; an IntersectionObserver plays it once on entry. Nothing is
 * written to the DOM (no classes/styles), so React hydration never sees a
 * mismatch, and when the animation ends the element falls back to its own
 * CSS — hover transforms keep working. No JS, no IO, or reduced motion → the
 * script bails and content is simply visible.
 *
 * Variants (data-reveal="…"): up (default) · fade · tilt · grow.
 * Optional: data-delay="0.16" (seconds), data-y="40" (px, for up/tilt).
 */
const source = `(function(){
var w=window,d=document,motion=w.matchMedia("(prefers-reduced-motion: reduce)");
if(!("IntersectionObserver" in w)||!Element.prototype.animate||motion.matches)return;
var ease="cubic-bezier(.16,1,.3,1)",seen=new WeakSet();
function frames(el){var y=+(el.dataset.y||28);switch(el.dataset.reveal){
case"fade":return[{opacity:0},{opacity:1}];
case"grow":return[{transform:"scaleX(0)"},{transform:"scaleX(1)"}];
case"tilt":return[{opacity:0,transform:"perspective(1200px) translateY("+y*2+"px) rotateX(22deg) scale(.88)"},{opacity:1,transform:"perspective(1200px) translateY(0) rotateX(0deg) scale(1)"}];
default:return[{opacity:0,transform:"translateY("+y+"px)"},{opacity:1,transform:"translateY(0)"}]}}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var a=e.target.__rv;a&&a.play()})},{rootMargin:"0px 0px -6% 0px"});
function add(el){if(seen.has(el))return;seen.add(el);
var a=el.animate(frames(el),{duration:el.dataset.reveal==="grow"?1100:900,delay:(+el.dataset.delay||0)*1e3,easing:ease,fill:"backwards"});
a.pause();el.__rv=a;io.observe(el)}
function scan(root){if(root.nodeType!==1)return;if(root.hasAttribute("data-reveal"))add(root);root.querySelectorAll("[data-reveal]").forEach(add)}
var mo=new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(scan)})});
mo.observe(d.documentElement,{childList:true,subtree:true});
motion.addEventListener("change",function(e){if(!e.matches)return;io.disconnect();mo.disconnect();d.querySelectorAll("[data-reveal]").forEach(function(el){el.__rv&&el.__rv.cancel()})});
scan(d.documentElement)})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
