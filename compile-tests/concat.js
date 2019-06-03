// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);





// tween.js - http://github.com/sole/tween.js
var TWEEN=TWEEN||function(){var n=[];return{getAll:function(){return n},removeAll:function(){n=[]},add:function(t){n.push(t)},remove:function(t){var r=n.indexOf(t);-1!==r&&n.splice(r,1)},update:function(t,r){if(0===n.length)return!1;var i=0;for(t=void 0!==t?t:TWEEN.now();i<n.length;)n[i].update(t)||r?i++:n.splice(i,1);return!0}}}();!function(){void 0===this.window&&void 0!==this.process?TWEEN.now=function(){var n=process.hrtime();return 1e3*n[0]+n[1]/1e3}:void 0!==this.window&&void 0!==window.performance&&void 0!==window.performance.now?TWEEN.now=window.performance.now.bind(window.performance):void 0!==Date.now?TWEEN.now=Date.now:TWEEN.now=function(){return(new Date).getTime()}}(),TWEEN.Tween=function(n){var t=n,r={},i={},o={},u=1e3,e=0,a=!1,f=!1,c=!1,s=0,h=null,l=TWEEN.Easing.Linear.None,E=TWEEN.Interpolation.Linear,p=[],d=null,v=!1,w=null,I=null,M=null;for(var T in n)r[T]=parseFloat(n[T],10);this.to=function(n,t){return void 0!==t&&(u=t),i=n,this},this.start=function(n){TWEEN.add(this),f=!0,v=!1,h=void 0!==n?n:TWEEN.now(),h+=s;for(var u in i){if(i[u]instanceof Array){if(0===i[u].length)continue;i[u]=[t[u]].concat(i[u])}void 0!==r[u]&&(r[u]=t[u],r[u]instanceof Array==!1&&(r[u]*=1),o[u]=r[u]||0)}return this},this.stop=function(){return f?(TWEEN.remove(this),f=!1,null!==M&&M.call(t),this.stopChainedTweens(),this):this},this.stopChainedTweens=function(){for(var n=0,t=p.length;t>n;n++)p[n].stop()},this.delay=function(n){return s=n,this},this.repeat=function(n){return e=n,this},this.yoyo=function(n){return a=n,this},this.easing=function(n){return l=n,this},this.interpolation=function(n){return E=n,this},this.chain=function(){return p=arguments,this},this.onStart=function(n){return d=n,this},this.onUpdate=function(n){return w=n,this},this.onComplete=function(n){return I=n,this},this.onStop=function(n){return M=n,this},this.update=function(n){var f,M,T;if(h>n)return!0;v===!1&&(null!==d&&d.call(t),v=!0),M=(n-h)/u,M=M>1?1:M,T=l(M);for(f in i)if(void 0!==r[f]){var N=r[f]||0,W=i[f];W instanceof Array?t[f]=E(W,T):("string"==typeof W&&(W="+"===W.charAt(0)||"-"===W.charAt(0)?N+parseFloat(W,10):parseFloat(W,10)),"number"==typeof W&&(t[f]=N+(W-N)*T))}if(null!==w&&w.call(t,T),1===M){if(e>0){isFinite(e)&&e--;for(f in o){if("string"==typeof i[f]&&(o[f]=o[f]+parseFloat(i[f],10)),a){var O=o[f];o[f]=i[f],i[f]=O}r[f]=o[f]}return a&&(c=!c),h=n+s,!0}null!==I&&I.call(t);for(var m=0,g=p.length;g>m;m++)p[m].start(h+u);return!1}return!0}},TWEEN.Easing={Linear:{None:function(n){return n}},Quadratic:{In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}},Cubic:{In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}},Quartic:{In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}},Quintic:{In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}},Sinusoidal:{In:function(n){return 1-Math.cos(n*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return.5*(1-Math.cos(Math.PI*n))}},Exponential:{In:function(n){return 0===n?0:Math.pow(1024,n-1)},Out:function(n){return 1===n?1:1-Math.pow(2,-10*n)},InOut:function(n){return 0===n?0:1===n?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}},Circular:{In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}},Elastic:{In:function(n){return 0===n?0:1===n?1:-Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)},Out:function(n){return 0===n?0:1===n?1:Math.pow(2,-10*n)*Math.sin(5*(n-.1)*Math.PI)+1},InOut:function(n){return 0===n?0:1===n?1:(n*=2,1>n?-.5*Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)+1)}},Back:{In:function(n){var t=1.70158;return n*n*((t+1)*n-t)},Out:function(n){var t=1.70158;return--n*n*((t+1)*n+t)+1},InOut:function(n){var t=2.5949095;return(n*=2)<1?.5*(n*n*((t+1)*n-t)):.5*((n-=2)*n*((t+1)*n+t)+2)}},Bounce:{In:function(n){return 1-TWEEN.Easing.Bounce.Out(1-n)},Out:function(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return.5>n?.5*TWEEN.Easing.Bounce.In(2*n):.5*TWEEN.Easing.Bounce.Out(2*n-1)+.5}}},TWEEN.Interpolation={Linear:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.Linear;return 0>t?u(n[0],n[1],i):t>1?u(n[r],n[r-1],r-i):u(n[o],n[o+1>r?r:o+1],i-o)},Bezier:function(n,t){for(var r=0,i=n.length-1,o=Math.pow,u=TWEEN.Interpolation.Utils.Bernstein,e=0;i>=e;e++)r+=o(1-t,i-e)*o(t,e)*n[e]*u(i,e);return r},CatmullRom:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.CatmullRom;return n[0]===n[r]?(0>t&&(o=Math.floor(i=r*(1+t))),u(n[(o-1+r)%r],n[o],n[(o+1)%r],n[(o+2)%r],i-o)):0>t?n[0]-(u(n[0],n[0],n[1],n[1],-i)-n[0]):t>1?n[r]-(u(n[r],n[r],n[r-1],n[r-1],i-r)-n[r]):u(n[o?o-1:0],n[o],n[o+1>r?r:o+1],n[o+2>r?r:o+2],i-o)},Utils:{Linear:function(n,t,r){return(t-n)*r+n},Bernstein:function(n,t){var r=TWEEN.Interpolation.Utils.Factorial;return r(n)/r(t)/r(n-t)},Factorial:function(){var n=[1];return function(t){var r=1;if(n[t])return n[t];for(var i=t;i>1;i--)r*=i;return n[t]=r,r}}(),CatmullRom:function(n,t,r,i,o){var u=.5*(r-n),e=.5*(i-t),a=o*o,f=o*a;return(2*t-2*r+u+e)*f+(-3*t+3*r-2*u-e)*a+u*o+t}}},function(n){"function"==typeof define&&define.amd?define([],function(){return TWEEN}):"undefined"!=typeof module&&"object"==typeof exports?module.exports=TWEEN:void 0!==n&&(n.TWEEN=TWEEN)}(this);
//# sourceMappingURL=Tween.min.js.map




/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.dat=t():e.dat=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";t.__esModule=!0,t["default"]=n(1),e.exports=t["default"]},function(e,t,n){"use strict";t.__esModule=!0,t["default"]={color:{Color:n(2),math:n(6),interpret:n(3)},controllers:{Controller:n(7),BooleanController:n(8),OptionController:n(10),StringController:n(11),NumberController:n(12),NumberControllerBox:n(13),NumberControllerSlider:n(14),FunctionController:n(15),ColorController:n(16)},dom:{dom:n(9)},gui:{GUI:n(17)},GUI:n(17)},e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t,n){Object.defineProperty(e,t,{get:function(){return"RGB"===this.__state.space?this.__state[t]:(p.recalculateRGB(this,t,n),this.__state[t])},set:function(e){"RGB"!==this.__state.space&&(p.recalculateRGB(this,t,n),this.__state.space="RGB"),this.__state[t]=e}})}function r(e,t){Object.defineProperty(e,t,{get:function(){return"HSV"===this.__state.space?this.__state[t]:(p.recalculateHSV(this),this.__state[t])},set:function(e){"HSV"!==this.__state.space&&(p.recalculateHSV(this),this.__state.space="HSV"),this.__state[t]=e}})}t.__esModule=!0;var s=n(3),l=o(s),d=n(6),u=o(d),c=n(4),f=o(c),h=n(5),_=o(h),p=function(){function e(){if(i(this,e),this.__state=l["default"].apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return e.prototype.toString=function(){return f["default"](this)},e.prototype.toOriginal=function(){return this.__state.conversion.write(this)},e}();p.recalculateRGB=function(e,t,n){if("HEX"===e.__state.space)e.__state[t]=u["default"].component_from_hex(e.__state.hex,n);else{if("HSV"!==e.__state.space)throw new Error("Corrupted color state");_["default"].extend(e.__state,u["default"].hsv_to_rgb(e.__state.h,e.__state.s,e.__state.v))}},p.recalculateHSV=function(e){var t=u["default"].rgb_to_hsv(e.r,e.g,e.b);_["default"].extend(e.__state,{s:t.s,v:t.v}),_["default"].isNaN(t.h)?_["default"].isUndefined(e.__state.h)&&(e.__state.h=0):e.__state.h=t.h},p.COMPONENTS=["r","g","b","h","s","v","hex","a"],a(p.prototype,"r",2),a(p.prototype,"g",1),a(p.prototype,"b",0),r(p.prototype,"h"),r(p.prototype,"s"),r(p.prototype,"v"),Object.defineProperty(p.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}}),Object.defineProperty(p.prototype,"hex",{get:function(){return"HEX"!==!this.__state.space&&(this.__state.hex=u["default"].rgb_to_hex(this.r,this.g,this.b)),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}}),t["default"]=p,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(4),a=o(i),r=n(5),s=o(r),l=[{litmus:s["default"].isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:a["default"]},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:a["default"]},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:a["default"]},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:a["default"]}}},{litmus:s["default"].isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:s["default"].isArray,conversions:{RGB_ARRAY:{read:function(e){return 3===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return 4===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:s["default"].isObject,conversions:{RGBA_OBJ:{read:function(e){return!!(s["default"].isNumber(e.r)&&s["default"].isNumber(e.g)&&s["default"].isNumber(e.b)&&s["default"].isNumber(e.a))&&{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return!!(s["default"].isNumber(e.r)&&s["default"].isNumber(e.g)&&s["default"].isNumber(e.b))&&{space:"RGB",r:e.r,g:e.g,b:e.b}},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return!!(s["default"].isNumber(e.h)&&s["default"].isNumber(e.s)&&s["default"].isNumber(e.v)&&s["default"].isNumber(e.a))&&{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return!!(s["default"].isNumber(e.h)&&s["default"].isNumber(e.s)&&s["default"].isNumber(e.v))&&{space:"HSV",h:e.h,s:e.s,v:e.v}},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],d=void 0,u=void 0,c=function(){u=!1;var e=arguments.length>1?s["default"].toArray(arguments):arguments[0];return s["default"].each(l,function(t){if(t.litmus(e))return s["default"].each(t.conversions,function(t,n){if(d=t.read(e),u===!1&&d!==!1)return u=d,d.conversionName=n,d.conversion=t,s["default"].BREAK}),s["default"].BREAK}),u};t["default"]=c,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(5),a=o(i);t["default"]=function(e){if(1===e.a||a["default"].isUndefined(e.a)){for(var t=e.hex.toString(16);t.length<6;)t="0"+t;return"#"+t}return"rgba("+Math.round(e.r)+","+Math.round(e.g)+","+Math.round(e.b)+","+e.a+")"},e.exports=t["default"]},function(e,t){"use strict";t.__esModule=!0;var n=Array.prototype.forEach,o=Array.prototype.slice,i={BREAK:{},extend:function(e){return this.each(o.call(arguments,1),function(t){if(!this.isUndefined(t)){var n=Object.keys(t);n.forEach(function(n){this.isUndefined(t[n])||(e[n]=t[n])}.bind(this))}},this),e},defaults:function(e){return this.each(o.call(arguments,1),function(t){if(!this.isUndefined(t)){var n=Object.keys(t);n.forEach(function(n){this.isUndefined(e[n])&&(e[n]=t[n])}.bind(this))}},this),e},compose:function(){var e=o.call(arguments);return function(){for(var t=o.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,o){if(e)if(n&&e.forEach&&e.forEach===n)e.forEach(t,o);else if(e.length===e.length+0){var i=void 0,a=void 0;for(i=0,a=e.length;i<a;i++)if(i in e&&t.call(o,e[i],i)===this.BREAK)return}else{if(this.isUndefined(e))return;var r=Object.keys(e);r.forEach(function(n){t.call(o,e[n],n)===this.BREAK}.bind(this))}},defer:function(e){setTimeout(e,0)},debounce:function(e,t){var n=void 0;return function(){function o(){n=null}var i=this,a=arguments,r=!n;clearTimeout(n),n=setTimeout(o,t),r&&e.apply(i,a)}},toArray:function(e){return e.toArray?e.toArray():o.call(e)},isUndefined:function(e){return void 0===e},isNull:function(e){return null===e},isNaN:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){return isNaN(e)}),isArray:Array.isArray||function(e){return e.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)}};t["default"]=i,e.exports=t["default"]},function(e,t){"use strict";t.__esModule=!0;var n=void 0,o={hsv_to_rgb:function(e,t,n){var o=Math.floor(e/60)%6,i=e/60-Math.floor(e/60),a=n*(1-t),r=n*(1-i*t),s=n*(1-(1-i)*t),l=[[n,s,a],[r,n,a],[a,n,s],[a,r,n],[s,a,n],[n,a,r]][o];return{r:255*l[0],g:255*l[1],b:255*l[2]}},rgb_to_hsv:function(e,t,n){var o=Math.min(e,t,n),i=Math.max(e,t,n),a=i-o,r=void 0,s=void 0;return 0===i?{h:NaN,s:0,v:0}:(s=a/i,r=e===i?(t-n)/a:t===i?2+(n-e)/a:4+(e-t)/a,r/=6,r<0&&(r+=1),{h:360*r,s:s,v:i/255})},rgb_to_hex:function(e,t,n){var o=this.hex_with_component(0,2,e);return o=this.hex_with_component(o,1,t),o=this.hex_with_component(o,0,n)},component_from_hex:function(e,t){return e>>8*t&255},hex_with_component:function(e,t,o){return o<<(n=8*t)|e&~(255<<n)}};t["default"]=o,e.exports=t["default"]},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(t,o){n(this,e),this.initialValue=t[o],this.domElement=document.createElement("div"),this.object=t,this.property=o,this.__onChange=void 0,this.__onFinishChange=void 0}return e.prototype.onChange=function(e){return this.__onChange=e,this},e.prototype.onFinishChange=function(e){return this.__onFinishChange=e,this},e.prototype.setValue=function(e){return this.object[this.property]=e,this.__onChange&&this.__onChange.call(this,e),this.updateDisplay(),this},e.prototype.getValue=function(){return this.object[this.property]},e.prototype.updateDisplay=function(){return this},e.prototype.isModified=function(){return this.initialValue!==this.getValue()},e}();t["default"]=o,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var r=n(7),s=o(r),l=n(9),d=o(l),u=function(e){function t(n,o){function a(){r.setValue(!r.__prev)}i(this,t),e.call(this,n,o);var r=this;this.__prev=this.getValue(),this.__checkbox=document.createElement("input"),this.__checkbox.setAttribute("type","checkbox"),d["default"].bind(this.__checkbox,"change",a,!1),this.domElement.appendChild(this.__checkbox),this.updateDisplay()}return a(t,e),t.prototype.setValue=function(t){var n=e.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),n},t.prototype.updateDisplay=function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0):this.__checkbox.checked=!1,e.prototype.updateDisplay.call(this)},t}(s["default"]);t["default"]=u,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e){if("0"===e||r["default"].isUndefined(e))return 0;var t=e.match(d);return r["default"].isNull(t)?0:parseFloat(t[1])}t.__esModule=!0;var a=n(5),r=o(a),s={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},l={};r["default"].each(s,function(e,t){r["default"].each(e,function(e){l[e]=t})});var d=/(\d+(\.\d+)?)px/,u={makeSelectable:function(e,t){void 0!==e&&void 0!==e.style&&(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var o=n,i=t;r["default"].isUndefined(i)&&(i=!0),r["default"].isUndefined(o)&&(o=!0),e.style.position="absolute",i&&(e.style.left=0,e.style.right=0),o&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,o){var i=n||{},a=l[t];if(!a)throw new Error("Event type "+t+" not supported.");var s=document.createEvent(a);switch(a){case"MouseEvents":var d=i.x||i.clientX||0,u=i.y||i.clientY||0;s.initMouseEvent(t,i.bubbles||!1,i.cancelable||!0,window,i.clickCount||1,0,0,d,u,!1,!1,!1,!1,0,null);break;case"KeyboardEvents":var c=s.initKeyboardEvent||s.initKeyEvent;r["default"].defaults(i,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),c(t,i.bubbles||!1,i.cancelable,window,i.ctrlKey,i.altKey,i.shiftKey,i.metaKey,i.keyCode,i.charCode);break;default:s.initEvent(t,i.bubbles||!1,i.cancelable||!0)}r["default"].defaults(s,o),e.dispatchEvent(s)},bind:function(e,t,n,o){var i=o||!1;return e.addEventListener?e.addEventListener(t,n,i):e.attachEvent&&e.attachEvent("on"+t,n),u},unbind:function(e,t,n,o){var i=o||!1;return e.removeEventListener?e.removeEventListener(t,n,i):e.detachEvent&&e.detachEvent("on"+t,n),u},addClass:function(e,t){if(void 0===e.className)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return u},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),o=n.indexOf(t);o!==-1&&(n.splice(o,1),e.className=n.join(" "))}else e.className=void 0;return u},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return i(t["border-left-width"])+i(t["border-right-width"])+i(t["padding-left"])+i(t["padding-right"])+i(t.width)},getHeight:function(e){var t=getComputedStyle(e);return i(t["border-top-width"])+i(t["border-bottom-width"])+i(t["padding-top"])+i(t["padding-bottom"])+i(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}};t["default"]=u,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var r=n(7),s=o(r),l=n(9),d=o(l),u=n(5),c=o(u),f=function(e){function t(n,o,a){i(this,t),e.call(this,n,o);var r=a,s=this;this.__select=document.createElement("select"),c["default"].isArray(r)&&!function(){var e={};c["default"].each(r,function(t){e[t]=t}),r=e}(),c["default"].each(r,function(e,t){var n=document.createElement("option");n.innerHTML=t,n.setAttribute("value",e),s.__select.appendChild(n)}),this.updateDisplay(),d["default"].bind(this.__select,"change",function(){var e=this.options[this.selectedIndex].value;s.setValue(e)}),this.domElement.appendChild(this.__select)}return a(t,e),t.prototype.setValue=function(t){var n=e.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),n},t.prototype.updateDisplay=function(){return d["default"].isActive(this.__select)?this:(this.__select.value=this.getValue(),e.prototype.updateDisplay.call(this))},t}(s["default"]);t["default"]=f,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var r=n(7),s=o(r),l=n(9),d=o(l),u=function(e){function t(n,o){function a(){s.setValue(s.__input.value)}function r(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}i(this,t),e.call(this,n,o);var s=this;this.__input=document.createElement("input"),this.__input.setAttribute("type","text"),d["default"].bind(this.__input,"keyup",a),d["default"].bind(this.__input,"change",a),d["default"].bind(this.__input,"blur",r),d["default"].bind(this.__input,"keydown",function(e){13===e.keyCode&&this.blur()}),this.updateDisplay(),this.domElement.appendChild(this.__input)}return a(t,e),t.prototype.updateDisplay=function(){return d["default"].isActive(this.__input)||(this.__input.value=this.getValue()),e.prototype.updateDisplay.call(this)},t}(s["default"]);t["default"]=u,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function r(e){var t=e.toString();return t.indexOf(".")>-1?t.length-t.indexOf(".")-1:0}t.__esModule=!0;var s=n(7),l=o(s),d=n(5),u=o(d),c=function(e){function t(n,o,a){i(this,t),e.call(this,n,o);var s=a||{};this.__min=s.min,this.__max=s.max,this.__step=s.step,u["default"].isUndefined(this.__step)?0===this.initialValue?this.__impliedStep=1:this.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(this.initialValue))/Math.LN10))/10:this.__impliedStep=this.__step,this.__precision=r(this.__impliedStep)}return a(t,e),t.prototype.setValue=function(t){var n=t;return void 0!==this.__min&&n<this.__min?n=this.__min:void 0!==this.__max&&n>this.__max&&(n=this.__max),void 0!==this.__step&&n%this.__step!==0&&(n=Math.round(n/this.__step)*this.__step),e.prototype.setValue.call(this,n)},t.prototype.min=function(e){return this.__min=e,this},t.prototype.max=function(e){return this.__max=e,this},t.prototype.step=function(e){return this.__step=e,this.__impliedStep=e,this.__precision=r(e),this},t}(l["default"]);t["default"]=c,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function r(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n}t.__esModule=!0;var s=n(12),l=o(s),d=n(9),u=o(d),c=n(5),f=o(c),h=function(e){function t(n,o,a){function r(){var e=parseFloat(h.__input.value);f["default"].isNaN(e)||h.setValue(e)}function s(){r(),h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())}function l(e){document.activeElement.blur();var t=_-e.clientY;h.setValue(h.getValue()+t*h.__impliedStep),_=e.clientY}function d(){u["default"].unbind(window,"mousemove",l),u["default"].unbind(window,"mouseup",d)}function c(e){u["default"].bind(window,"mousemove",l),u["default"].bind(window,"mouseup",d),_=e.clientY}i(this,t),e.call(this,n,o,a),this.__truncationSuspended=!1;var h=this,_=void 0;this.__input=document.createElement("input"),this.__input.setAttribute("type","text"),u["default"].bind(this.__input,"change",r),u["default"].bind(this.__input,"blur",s),u["default"].bind(this.__input,"mousedown",c),u["default"].bind(this.__input,"keydown",function(e){13===e.keyCode&&(h.__truncationSuspended=!0,this.blur(),h.__truncationSuspended=!1)}),this.updateDisplay(),this.domElement.appendChild(this.__input)}return a(t,e),t.prototype.updateDisplay=function(){return u["default"].isActive(this.__input)?this:(this.__input.value=this.__truncationSuspended?this.getValue():r(this.getValue(),this.__precision),e.prototype.updateDisplay.call(this))},t}(l["default"]);t["default"]=h,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function r(e,t,n,o,i){return o+(i-o)*((e-t)/(n-t))}t.__esModule=!0;var s=n(12),l=o(s),d=n(9),u=o(d),c=function(e){function t(n,o,a,s,l){function d(e){document.activeElement.blur(),u["default"].bind(window,"mousemove",c),u["default"].bind(window,"mouseup",f),c(e)}function c(e){e.preventDefault();var t=u["default"].getOffset(h.__background),n=u["default"].getWidth(h.__background);return h.setValue(r(e.clientX,t.left,t.left+n,h.__min,h.__max)),!1}function f(){u["default"].unbind(window,"mousemove",c),u["default"].unbind(window,"mouseup",f),h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())}i(this,t),e.call(this,n,o,{min:a,max:s,step:l});var h=this;this.__background=document.createElement("div"),this.__foreground=document.createElement("div"),u["default"].bind(this.__background,"mousedown",d),u["default"].addClass(this.__background,"slider"),u["default"].addClass(this.__foreground,"slider-fg"),this.updateDisplay(),this.__background.appendChild(this.__foreground),this.domElement.appendChild(this.__background)}return a(t,e),t.prototype.updateDisplay=function(){var t=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=100*t+"%",e.prototype.updateDisplay.call(this)},t}(l["default"]);t["default"]=c,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var r=n(7),s=o(r),l=n(9),d=o(l),u=function(e){function t(n,o,a){i(this,t),e.call(this,n,o);var r=this;this.__button=document.createElement("div"),this.__button.innerHTML=void 0===a?"Fire":a,d["default"].bind(this.__button,"click",function(e){return e.preventDefault(),r.fire(),!1}),d["default"].addClass(this.__button,"button"),this.domElement.appendChild(this.__button)}return a(t,e),t.prototype.fire=function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())},t}(s["default"]);t["default"]=u,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function r(e,t,n,o){e.style.background="",b["default"].each(v,function(i){e.style.cssText+="background: "+i+"linear-gradient("+t+", "+n+" 0%, "+o+" 100%); "})}function s(e){e.style.background="",e.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",e.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}t.__esModule=!0;var l=n(7),d=o(l),u=n(9),c=o(u),f=n(2),h=o(f),_=n(3),p=o(_),m=n(5),b=o(m),g=function(e){function t(n,o){function a(e){_(e),c["default"].bind(window,"mousemove",_),c["default"].bind(window,"mouseup",l)}function l(){c["default"].unbind(window,"mousemove",_),c["default"].unbind(window,"mouseup",l),f()}function d(){var e=p["default"](this.value);e!==!1?(g.__color.__state=e,g.setValue(g.__color.toOriginal())):this.value=g.__color.toString()}function u(){c["default"].unbind(window,"mousemove",m),c["default"].unbind(window,"mouseup",u),f()}function f(){g.__onFinishChange&&g.__onFinishChange.call(g,g.__color.toString())}function _(e){e.preventDefault();var t=c["default"].getWidth(g.__saturation_field),n=c["default"].getOffset(g.__saturation_field),o=(e.clientX-n.left+document.body.scrollLeft)/t,i=1-(e.clientY-n.top+document.body.scrollTop)/t;return i>1?i=1:i<0&&(i=0),o>1?o=1:o<0&&(o=0),g.__color.v=i,g.__color.s=o,g.setValue(g.__color.toOriginal()),!1}function m(e){e.preventDefault();var t=c["default"].getHeight(g.__hue_field),n=c["default"].getOffset(g.__hue_field),o=1-(e.clientY-n.top+document.body.scrollTop)/t;return o>1?o=1:o<0&&(o=0),g.__color.h=360*o,g.setValue(g.__color.toOriginal()),!1}i(this,t),e.call(this,n,o),this.__color=new h["default"](this.getValue()),this.__temp=new h["default"](0);var g=this;this.domElement=document.createElement("div"),c["default"].makeSelectable(this.domElement,!1),this.__selector=document.createElement("div"),this.__selector.className="selector",this.__saturation_field=document.createElement("div"),this.__saturation_field.className="saturation-field",this.__field_knob=document.createElement("div"),this.__field_knob.className="field-knob",this.__field_knob_border="2px solid ",this.__hue_knob=document.createElement("div"),this.__hue_knob.className="hue-knob",this.__hue_field=document.createElement("div"),this.__hue_field.className="hue-field",this.__input=document.createElement("input"),this.__input.type="text",this.__input_textShadow="0 1px 1px ",c["default"].bind(this.__input,"keydown",function(e){13===e.keyCode&&d.call(this)}),c["default"].bind(this.__input,"blur",d),c["default"].bind(this.__selector,"mousedown",function(){c["default"].addClass(this,"drag").bind(window,"mouseup",function(){c["default"].removeClass(g.__selector,"drag")})});var v=document.createElement("div");b["default"].extend(this.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),b["default"].extend(this.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:this.__field_knob_border+(this.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),b["default"].extend(this.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),b["default"].extend(this.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),b["default"].extend(v.style,{width:"100%",height:"100%",background:"none"}),r(v,"top","rgba(0,0,0,0)","#000"),b["default"].extend(this.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),s(this.__hue_field),b["default"].extend(this.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:this.__input_textShadow+"rgba(0,0,0,0.7)"}),c["default"].bind(this.__saturation_field,"mousedown",a),c["default"].bind(this.__field_knob,"mousedown",a),c["default"].bind(this.__hue_field,"mousedown",function(e){m(e),c["default"].bind(window,"mousemove",m),c["default"].bind(window,"mouseup",u)}),this.__saturation_field.appendChild(v),this.__selector.appendChild(this.__field_knob),this.__selector.appendChild(this.__saturation_field),this.__selector.appendChild(this.__hue_field),this.__hue_field.appendChild(this.__hue_knob),this.domElement.appendChild(this.__input),this.domElement.appendChild(this.__selector),this.updateDisplay()}return a(t,e),t.prototype.updateDisplay=function(){var e=p["default"](this.getValue());if(e!==!1){var t=!1;b["default"].each(h["default"].COMPONENTS,function(n){if(!b["default"].isUndefined(e[n])&&!b["default"].isUndefined(this.__color.__state[n])&&e[n]!==this.__color.__state[n])return t=!0,{}},this),t&&b["default"].extend(this.__color.__state,e)}b["default"].extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var n=this.__color.v<.5||this.__color.s>.5?255:0,o=255-n;b["default"].extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toString(),border:this.__field_knob_border+"rgb("+n+","+n+","+n+")"}),this.__hue_knob.style.marginTop=100*(1-this.__color.h/360)+"px",this.__temp.s=1,this.__temp.v=1,r(this.__saturation_field,"left","#fff",this.__temp.toString()),b["default"].extend(this.__input.style,{backgroundColor:this.__input.value=this.__color.toString(),color:"rgb("+n+","+n+","+n+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})},t}(d["default"]),v=["-moz-","-o-","-webkit-","-ms-",""];t["default"]=g,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var o=document.createElement("li");return t&&o.appendChild(t),n?e.__ul.insertBefore(o,n):e.__ul.appendChild(o),e.onResize(),o}function a(e,t){var n=e.__preset_select[e.__preset_select.selectedIndex];t?n.innerHTML=n.value+"*":n.innerHTML=n.value}function r(e,t,n){if(n.__li=t,n.__gui=e,U["default"].extend(n,{options:function(t){if(arguments.length>1){var o=n.__li.nextElementSibling;return n.remove(),l(e,n.object,n.property,{before:o,factoryArgs:[U["default"].toArray(arguments)]})}if(U["default"].isArray(t)||U["default"].isObject(t)){var o=n.__li.nextElementSibling;return n.remove(),l(e,n.object,n.property,{before:o,factoryArgs:[t]})}},name:function(e){return n.__li.firstElementChild.firstElementChild.innerHTML=e,n},listen:function(){return n.__gui.listen(n),n},remove:function(){return n.__gui.remove(n),n}}),n instanceof R["default"])!function(){var e=new N["default"](n.object,n.property,{min:n.__min,max:n.__max,step:n.__step});U["default"].each(["updateDisplay","onChange","onFinishChange","step"],function(t){var o=n[t],i=e[t];n[t]=e[t]=function(){var t=Array.prototype.slice.call(arguments);return i.apply(e,t),o.apply(n,t)}}),I["default"].addClass(t,"has-slider"),n.domElement.insertBefore(e.domElement,n.domElement.firstElementChild)}();else if(n instanceof N["default"]){var o=function(t){return U["default"].isNumber(n.__min)&&U["default"].isNumber(n.__max)?(n.remove(),l(e,n.object,n.property,{before:n.__li.nextElementSibling,factoryArgs:[n.__min,n.__max,n.__step]})):t};n.min=U["default"].compose(o,n.min),n.max=U["default"].compose(o,n.max)}else n instanceof S["default"]?(I["default"].bind(t,"click",function(){I["default"].fakeEvent(n.__checkbox,"click")}),I["default"].bind(n.__checkbox,"click",function(e){e.stopPropagation()})):n instanceof T["default"]?(I["default"].bind(t,"click",function(){I["default"].fakeEvent(n.__button,"click")}),I["default"].bind(t,"mouseover",function(){I["default"].addClass(n.__button,"hover")}),I["default"].bind(t,"mouseout",function(){I["default"].removeClass(n.__button,"hover")})):n instanceof j["default"]&&(I["default"].addClass(t,"color"),n.updateDisplay=U["default"].compose(function(e){return t.style.borderLeftColor=n.__color.toString(),
e},n.updateDisplay),n.updateDisplay());n.setValue=U["default"].compose(function(t){return e.getRoot().__preset_select&&n.isModified()&&a(e.getRoot(),!0),t},n.setValue)}function s(e,t){var n=e.getRoot(),o=n.__rememberedObjects.indexOf(t.object);if(o!==-1){var i=n.__rememberedObjectIndecesToControllers[o];if(void 0===i&&(i={},n.__rememberedObjectIndecesToControllers[o]=i),i[t.property]=t,n.load&&n.load.remembered){var a=n.load.remembered,r=void 0;if(a[e.preset])r=a[e.preset];else{if(!a[Q])return;r=a[Q]}if(r[o]&&void 0!==r[o][t.property]){var s=r[o][t.property];t.initialValue=s,t.setValue(s)}}}}function l(e,t,n,o){if(void 0===t[n])throw new Error('Object "'+t+'" has no property "'+n+'"');var a=void 0;if(o.color)a=new j["default"](t,n);else{var l=[t,n].concat(o.factoryArgs);a=E["default"].apply(e,l)}o.before instanceof A["default"]&&(o.before=o.before.__li),s(e,a),I["default"].addClass(a.domElement,"c");var d=document.createElement("span");I["default"].addClass(d,"property-name"),d.innerHTML=a.property;var u=document.createElement("div");u.appendChild(d),u.appendChild(a.domElement);var c=i(e,u,o.before);return I["default"].addClass(c,ne.CLASS_CONTROLLER_ROW),a instanceof j["default"]?I["default"].addClass(c,"color"):I["default"].addClass(c,typeof a.getValue()),r(e,c,a),e.__controllers.push(a),a}function d(e,t){return document.location.href+"."+t}function u(e,t,n){var o=document.createElement("option");o.innerHTML=t,o.value=t,e.__preset_select.appendChild(o),n&&(e.__preset_select.selectedIndex=e.__preset_select.length-1)}function c(e,t){t.style.display=e.useLocalStorage?"block":"none"}function f(e){var t=e.__save_row=document.createElement("li");I["default"].addClass(e.domElement,"has-save"),e.__ul.insertBefore(t,e.__ul.firstChild),I["default"].addClass(t,"save-row");var n=document.createElement("span");n.innerHTML="&nbsp;",I["default"].addClass(n,"button gears");var o=document.createElement("span");o.innerHTML="Save",I["default"].addClass(o,"button"),I["default"].addClass(o,"save");var i=document.createElement("span");i.innerHTML="New",I["default"].addClass(i,"button"),I["default"].addClass(i,"save-as");var a=document.createElement("span");a.innerHTML="Revert",I["default"].addClass(a,"button"),I["default"].addClass(a,"revert");var r=e.__preset_select=document.createElement("select");e.load&&e.load.remembered?U["default"].each(e.load.remembered,function(t,n){u(e,n,n===e.preset)}):u(e,Q,!1),I["default"].bind(r,"change",function(){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].innerHTML=e.__preset_select[t].value;e.preset=this.value}),t.appendChild(r),t.appendChild(n),t.appendChild(o),t.appendChild(i),t.appendChild(a),J&&!function(){var t=document.getElementById("dg-local-explain"),n=document.getElementById("dg-local-storage"),o=document.getElementById("dg-save-locally");o.style.display="block","true"===localStorage.getItem(d(e,"isLocal"))&&n.setAttribute("checked","checked"),c(e,t),I["default"].bind(n,"change",function(){e.useLocalStorage=!e.useLocalStorage,c(e,t)})}();var s=document.getElementById("dg-new-constructor");I["default"].bind(s,"keydown",function(e){!e.metaKey||67!==e.which&&67!==e.keyCode||q.hide()}),I["default"].bind(n,"click",function(){s.innerHTML=JSON.stringify(e.getSaveObject(),void 0,2),q.show(),s.focus(),s.select()}),I["default"].bind(o,"click",function(){e.save()}),I["default"].bind(i,"click",function(){var t=prompt("Enter a new preset name.");t&&e.saveAs(t)}),I["default"].bind(a,"click",function(){e.revert()})}function h(e){function t(t){return t.preventDefault(),e.width+=i-t.clientX,e.onResize(),i=t.clientX,!1}function n(){I["default"].removeClass(e.__closeButton,ne.CLASS_DRAG),I["default"].unbind(window,"mousemove",t),I["default"].unbind(window,"mouseup",n)}function o(o){return o.preventDefault(),i=o.clientX,I["default"].addClass(e.__closeButton,ne.CLASS_DRAG),I["default"].bind(window,"mousemove",t),I["default"].bind(window,"mouseup",n),!1}var i=void 0;e.__resize_handle=document.createElement("div"),U["default"].extend(e.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"}),I["default"].bind(e.__resize_handle,"mousedown",o),I["default"].bind(e.__closeButton,"mousedown",o),e.domElement.insertBefore(e.__resize_handle,e.domElement.firstElementChild)}function _(e,t){e.domElement.style.width=t+"px",e.__save_row&&e.autoPlace&&(e.__save_row.style.width=t+"px"),e.__closeButton&&(e.__closeButton.style.width=t+"px")}function p(e,t){var n={};return U["default"].each(e.__rememberedObjects,function(o,i){var a={},r=e.__rememberedObjectIndecesToControllers[i];U["default"].each(r,function(e,n){a[n]=t?e.initialValue:e.getValue()}),n[i]=a}),n}function m(e){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].value===e.preset&&(e.__preset_select.selectedIndex=t)}function b(e){0!==e.length&&P["default"].call(window,function(){b(e)}),U["default"].each(e,function(e){e.updateDisplay()})}var g=n(18),v=o(g),y=n(19),w=o(y),x=n(20),E=o(x),C=n(7),A=o(C),k=n(8),S=o(k),O=n(15),T=o(O),L=n(13),N=o(L),M=n(14),R=o(M),B=n(16),j=o(B),H=n(21),P=o(H),D=n(22),V=o(D),F=n(9),I=o(F),z=n(5),U=o(z),G=n(23),X=o(G);v["default"].inject(X["default"]);var K="dg",W=72,Y=20,Q="Default",J=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}(),q=void 0,Z=!0,$=void 0,ee=!1,te=[],ne=function oe(e){function t(){var e=n.getRoot();e.width+=1,U["default"].defer(function(){e.width-=1})}var n=this,o=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),I["default"].addClass(this.domElement,K),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],o=U["default"].defaults(o,{autoPlace:!0,width:oe.DEFAULT_WIDTH}),o=U["default"].defaults(o,{resizable:o.autoPlace,hideable:o.autoPlace}),U["default"].isUndefined(o.load)?o.load={preset:Q}:o.preset&&(o.load.preset=o.preset),U["default"].isUndefined(o.parent)&&o.hideable&&te.push(this),o.resizable=U["default"].isUndefined(o.parent)&&o.resizable,o.autoPlace&&U["default"].isUndefined(o.scrollable)&&(o.scrollable=!0);var a=J&&"true"===localStorage.getItem(d(this,"isLocal")),r=void 0;if(Object.defineProperties(this,{parent:{get:function(){return o.parent}},scrollable:{get:function(){return o.scrollable}},autoPlace:{get:function(){return o.autoPlace}},preset:{get:function(){return n.parent?n.getRoot().preset:o.load.preset},set:function(e){n.parent?n.getRoot().preset=e:o.load.preset=e,m(this),n.revert()}},width:{get:function(){return o.width},set:function(e){o.width=e,_(n,e)}},name:{get:function(){return o.name},set:function(e){o.name=e,titleRowName&&(titleRowName.innerHTML=o.name)}},closed:{get:function(){return o.closed},set:function(e){o.closed=e,o.closed?I["default"].addClass(n.__ul,oe.CLASS_CLOSED):I["default"].removeClass(n.__ul,oe.CLASS_CLOSED),this.onResize(),n.__closeButton&&(n.__closeButton.innerHTML=e?oe.TEXT_OPEN:oe.TEXT_CLOSED)}},load:{get:function(){return o.load}},useLocalStorage:{get:function(){return a},set:function(e){J&&(a=e,e?I["default"].bind(window,"unload",r):I["default"].unbind(window,"unload",r),localStorage.setItem(d(n,"isLocal"),e))}}}),U["default"].isUndefined(o.parent)){if(o.closed=!1,I["default"].addClass(this.domElement,oe.CLASS_MAIN),I["default"].makeSelectable(this.domElement,!1),J&&a){n.useLocalStorage=!0;var s=localStorage.getItem(d(this,"gui"));s&&(o.load=JSON.parse(s))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=oe.TEXT_CLOSED,I["default"].addClass(this.__closeButton,oe.CLASS_CLOSE_BUTTON),this.domElement.appendChild(this.__closeButton),I["default"].bind(this.__closeButton,"click",function(){n.closed=!n.closed})}else{void 0===o.closed&&(o.closed=!0);var l=document.createTextNode(o.name);I["default"].addClass(l,"controller-name");var u=i(n,l),c=function(e){return e.preventDefault(),n.closed=!n.closed,!1};I["default"].addClass(this.__ul,oe.CLASS_CLOSED),I["default"].addClass(u,"title"),I["default"].bind(u,"click",c),o.closed||(this.closed=!1)}o.autoPlace&&(U["default"].isUndefined(o.parent)&&(Z&&($=document.createElement("div"),I["default"].addClass($,K),I["default"].addClass($,oe.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild($),Z=!1),$.appendChild(this.domElement),I["default"].addClass(this.domElement,oe.CLASS_AUTO_PLACE)),this.parent||_(n,o.width)),this.__resizeHandler=function(){n.onResize()},I["default"].bind(window,"resize",this.__resizeHandler),I["default"].bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),I["default"].bind(this.__ul,"transitionend",this.__resizeHandler),I["default"].bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),o.resizable&&h(this),r=function(){J&&"true"===localStorage.getItem(d(n,"isLocal"))&&localStorage.setItem(d(n,"gui"),JSON.stringify(n.getSaveObject()))},this.saveToLocalStorageIfPossible=r,o.parent||t()};ne.toggleHide=function(){ee=!ee,U["default"].each(te,function(e){e.domElement.style.display=ee?"none":""})},ne.CLASS_AUTO_PLACE="a",ne.CLASS_AUTO_PLACE_CONTAINER="ac",ne.CLASS_MAIN="main",ne.CLASS_CONTROLLER_ROW="cr",ne.CLASS_TOO_TALL="taller-than-window",ne.CLASS_CLOSED="closed",ne.CLASS_CLOSE_BUTTON="close-button",ne.CLASS_DRAG="drag",ne.DEFAULT_WIDTH=245,ne.TEXT_CLOSED="Close Controls",ne.TEXT_OPEN="Open Controls",ne._keydownHandler=function(e){"text"===document.activeElement.type||e.which!==W&&e.keyCode!==W||ne.toggleHide()},I["default"].bind(window,"keydown",ne._keydownHandler,!1),U["default"].extend(ne.prototype,{add:function(e,t){return l(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return l(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;U["default"].defer(function(){t.onResize()})},destroy:function(){this.autoPlace&&$.removeChild(this.domElement),I["default"].unbind(window,"keydown",ne._keydownHandler,!1),I["default"].unbind(window,"resize",this.__resizeHandler),this.saveToLocalStorageIfPossible&&I["default"].unbind(window,"unload",this.saveToLocalStorageIfPossible)},addFolder:function(e){if(void 0!==this.__folders[e])throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new ne(t);this.__folders[e]=n;var o=i(this,n.domElement);return I["default"].addClass(o,"folder"),n},open:function(){this.closed=!1},close:function(){this.closed=!0},onResize:U["default"].debounce(function(){var e=this.getRoot();if(e.scrollable){var t=I["default"].getOffset(e.__ul).top,n=0;U["default"].each(e.__ul.childNodes,function(t){e.autoPlace&&t===e.__save_row||(n+=I["default"].getHeight(t))}),window.innerHeight-t-Y<n?(I["default"].addClass(e.domElement,ne.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-Y+"px"):(I["default"].removeClass(e.domElement,ne.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&U["default"].defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},200),remember:function(){if(U["default"].isUndefined(q)&&(q=new V["default"],q.domElement.innerHTML=w["default"]),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;U["default"].each(Array.prototype.slice.call(arguments),function(t){0===e.__rememberedObjects.length&&f(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&_(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=p(this)),e.folders={},U["default"].each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=p(this),a(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Q]=p(this,!0)),this.load.remembered[e]=p(this),this.preset=e,u(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){U["default"].each(this.__controllers,function(t){this.getRoot().load.remembered?s(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),U["default"].each(this.__folders,function(e){e.revert(e)}),e||a(this.getRoot(),!1)},listen:function(e){var t=0===this.__listening.length;this.__listening.push(e),t&&b(this.__listening)},updateDisplay:function(){U["default"].each(this.__controllers,function(e){e.updateDisplay()}),U["default"].each(this.__folders,function(e){e.updateDisplay()})}}),e.exports=ne},function(e,t){"use strict";e.exports={load:function(e,t){var n=t||document,o=n.createElement("link");o.type="text/css",o.rel="stylesheet",o.href=e,n.getElementsByTagName("head")[0].appendChild(o)},inject:function(e,t){var n=t||document,o=document.createElement("style");o.type="text/css",o.innerHTML=e;var i=n.getElementsByTagName("head")[0];try{i.appendChild(o)}catch(a){}}}},function(e,t){e.exports='<div id=dg-save class="dg dialogue">Here\'s the new load parameter for your <code>GUI</code>\'s constructor:<textarea id=dg-new-constructor></textarea><div id=dg-save-locally><input id=dg-local-storage type="checkbox"> Automatically save values to <code>localStorage</code> on exit.<div id=dg-local-explain>The values saved to <code>localStorage</code> will override those passed to <code>dat.GUI</code>\'s constructor. This makes it easier to work incrementally, but <code>localStorage</code> is fragile, and your friends may not see the same values you do.</div></div></div>'},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(10),a=o(i),r=n(13),s=o(r),l=n(14),d=o(l),u=n(11),c=o(u),f=n(15),h=o(f),_=n(8),p=o(_),m=n(5),b=o(m),g=function(e,t){var n=e[t];return b["default"].isArray(arguments[2])||b["default"].isObject(arguments[2])?new a["default"](e,t,arguments[2]):b["default"].isNumber(n)?b["default"].isNumber(arguments[2])&&b["default"].isNumber(arguments[3])?b["default"].isNumber(arguments[4])?new d["default"](e,t,arguments[2],arguments[3],arguments[4]):new d["default"](e,t,arguments[2],arguments[3]):b["default"].isNumber(arguments[4])?new s["default"](e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new s["default"](e,t,{min:arguments[2],max:arguments[3]}):b["default"].isString(n)?new c["default"](e,t):b["default"].isFunction(n)?new h["default"](e,t,""):b["default"].isBoolean(n)?new p["default"](e,t):null};t["default"]=g,e.exports=t["default"]},function(e,t){"use strict";function n(e){setTimeout(e,1e3/60)}t.__esModule=!0,t["default"]=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||n,e.exports=t["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var a=n(9),r=o(a),s=n(5),l=o(s),d=function(){function e(){i(this,e),this.backgroundElement=document.createElement("div"),l["default"].extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),r["default"].makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),l["default"].extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var t=this;r["default"].bind(this.backgroundElement,"click",function(){t.hide()})}return e.prototype.show=function(){var e=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),l["default"].defer(function(){e.backgroundElement.style.opacity=1,e.domElement.style.opacity=1,e.domElement.style.webkitTransform="scale(1)"})},e.prototype.hide=function t(){var e=this,t=function n(){e.domElement.style.display="none",e.backgroundElement.style.display="none",r["default"].unbind(e.domElement,"webkitTransitionEnd",n),r["default"].unbind(e.domElement,"transitionend",n),r["default"].unbind(e.domElement,"oTransitionEnd",n)};r["default"].bind(this.domElement,"webkitTransitionEnd",t),r["default"].bind(this.domElement,"transitionend",t),r["default"].bind(this.domElement,"oTransitionEnd",t),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"},e.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-r["default"].getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-r["default"].getHeight(this.domElement)/2+"px"},e}();t["default"]=d,e.exports=t["default"]},function(e,t,n){t=e.exports=n(24)(),t.push([e.id,".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1!important}.dg.main .close-button.drag,.dg.main:hover .close-button{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;transition:opacity .1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save>ul{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height .1s ease-out;transition:height .1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid transparent}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.boolean,.dg .cr.boolean *,.dg .cr.function,.dg .cr.function *,.dg .cr.function .property-name{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco,monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:9pt 0;display:block;width:440px;overflow-y:scroll;height:75pt;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande',sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:81pt}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:1pc;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid hsla(0,0%,100%,.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.boolean:hover,.dg .cr.function:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:0}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(o[a]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&o[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}}])});





//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const PI = Math.PI;
const TWO_PI = PI*2;
const HALF_PI = PI/2;
const MODE_MENU = 0;
const MODE_ENDLESS = 1;
const MODE_SCORECARD = 2;

function PuzzleGame(){

	this.renderer = new THREE.WebGLRenderer( { antialias: false ,alpha: true} );
	this.renderer.setClearColor(0x000000,0);
	this.windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	this.windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.setSize(this.windowWidth,this.windowHeight);
	document.body.appendChild( this.renderer.domElement );

	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 100, 850);
	this.camera.position.z = 500;

	this.resetGameVariables();


	//Timer Objects
	this.pushTimeoutObj = null;
	this.difficultyTimeoutObj = null;

	this.initLoaders();

	this.tube = this.generateTube();
	this.scene.add(this.tube);
	this.scene.add(this.generateCylinderDepthFilter());
}

PuzzleGame.prototype.preloadComplete = function(){

	this.gameBoard = new THREE.Object3D();
	this.nextRow = new THREE.Object3D();
	this.cursorObj = new THREE.Object3D();
	this.makeMenuText();

	this.closeAndSetGameMode(MODE_MENU);

	//setTimeout(this.resetGame.bind(this),2000);

	this.stats = new Stats();
	document.body.appendChild( this.stats.dom );

	this.debugMapNumber = 1;

	window.addEventListener('resize', this.onWindowResize.bind(this),false);
	document.addEventListener('keydown', this.keyPress.bind(this));

	this.initTouch();
	this.initDatGui();

	this.animate();
};

PuzzleGame.prototype.closeAndSetGameMode = function(newMode){
	this.closeTube(this.setGameMode.bind(this,newMode));
};

PuzzleGame.prototype.setGameMode = function(newMode){
	this.menuObj.visible = false;
	this.menuLogo.visible = false;
	this.menuScore.visible = false;
	this.gameBoard.visible = false;
	this.cursorObj.visible = false;
	this.nextRow.visible = false;

	this.gameMode = newMode;
	switch(newMode){
		case MODE_MENU:
			this.menuSelection = 0;
			this.menuOptions = ["Play Endless","Options","Credits"];
			this.menuObj.visible = true;
			this.menuLogo.visible = true;
			this.openTube();

			//TEMP BEFORE MENU IS FINISHED
			setTimeout(this.closeAndSetGameMode.bind(this,MODE_ENDLESS),2000);

			break;
		case MODE_ENDLESS:
			this.gameBoard.visible = true;
			this.cursorObj.visible = true;
			this.nextRow.visible = true;
			this.resetGame();
			this.openTube();
			break;
		case MODE_SCORECARD:
			this.menuObj.visible = true;
			this.menuLogo.visible = true;
			this.menuScore.visible = true;
			this.setScoreCardText();
			this.openTube();
			break;
	}
};

PuzzleGame.prototype.setScoreCardText = function(){
	var textGeometry1 = new THREE.TextGeometry("Score: "+this.score,{
		font: this.font,
		size:20,
		height :2
	});

	var material = new THREE.MeshBasicMaterial({color: this.blockColors.heart});
	var score = new THREE.Mesh(textGeometry1, material);
	textGeometry1.computeBoundingBox();
	score.position.x =  -(textGeometry1.boundingBox.max.x - textGeometry1.boundingBox.min.x)/2;

	sThis = this;
	this.menuScore.traverseVisible(function(obj){
		sThis.menuScore.remove(obj);
	});

	this.menuScore.add(score);
};

PuzzleGame.prototype.makeMenuText = function(){
	this.menuObj = new THREE.Group();
	this.menuOptionsObj = new THREE.Group();
	this.menuLogo = new THREE.Group();
	this.menuScore = new THREE.Group();

	var textGeometry1 = new THREE.TextGeometry("Puzzle",{
		font: this.font,
		size:40,
		height :2
	});

	var textGeometry2 = new THREE.TextGeometry("Cylinder",{
		font: this.font,
		size:40,
		height :2
	});

	var material = new THREE.MeshBasicMaterial({color: this.blockColors.diamond});

	this.title1 = new THREE.Mesh(textGeometry1, material);
	this.title2 = new THREE.Mesh(textGeometry2, material);

	textGeometry1.computeBoundingBox();
	var textWidth1 = textGeometry1.boundingBox.max.x - textGeometry1.boundingBox.min.x;
	this.title1.position.x =  -textWidth1/2;

	textGeometry2.computeBoundingBox();
	var textWidth2 = textGeometry2.boundingBox.max.x - textGeometry2.boundingBox.min.x;
	this.title2.position.x =  -textWidth2/2;

	this.title1.position.y = 30;
	this.title2.position.y = -30;

	this.menuLogo.add(this.title1);
	this.menuLogo.add(this.title2);

	this.menuLogo.position.y = 100;

	this.menuObj.add(this.menuLogo);
	this.menuObj.add(this.menuScore);

	this.menuObj.position.z = 15;
	this.scene.add(this.menuObj);
};


PuzzleGame.prototype.makeHarder = function(){
	if(this.pushDelay > 0){
		this.pushDelay = 100 - this.matches/5;
		if(this.pushDelay < 0){
			this.pushDelay = 0;
		}
		if(this.pushDelay <= 90){
			this.handicap = 3;
		}
		if(this.pushDelay <= 70){
			this.handicap = 2;
		}
		if(this.pushDelay <= 50){
			this.handicap = 1;
		}
		if(this.pushDelay <= 30){
			this.handicap = 0;
		}
	}
};

PuzzleGame.prototype.initLoaders = function(){

	var loaderDom = document.getElementById("loader");
	var loaderTextDom = document.getElementById("loaderText");

	var manager = new THREE.LoadingManager();
	console.log('New LoadingManager');
	var sThis = this;
	manager.onLoad = function ( ) {
		console.log( 'Loading complete!');
		sThis.preloadComplete();
		loaderDom.className = "hideLoader";
		setTimeout(function(){
			loaderDom.className = "hideLoaderDisplayNone";
		},1000);
	};
	manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
		console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
		loaderTextDom.innerHTML = Math.floor((itemsLoaded/itemsTotal)*100);
	};
	manager.onError = function ( url ) {
		console.log( 'There was an error loading ' + url );
	};

    this.fileLoader = new THREE.FileLoader(manager);
	var textureLoader =  new THREE.TextureLoader(manager);
	var fontLoader = new THREE.FontLoader(manager);

	this.blankTexture = textureLoader.load('img/block.png');
	this.explodeTexture = textureLoader.load('img/block_explode.png');
	this.lockTexture = textureLoader.load('img/block_locked.png');
	this.tubeTexture = textureLoader.load('img/block.png');
	this.tubeTexture.wrapS = THREE.RepeatWrapping;
	this.tubeTexture.wrapT = THREE.RepeatWrapping;
	this.tubeTexture.repeat.set( this.boardWidth, this.boardHeight );

	//Font loader is weird.... It doesn't return the loaded value.
	fontLoader.load('fonts/Righteous_Regular.json',function(response){
		sThis.font = response;
	});

	this.cursorTexture = textureLoader.load('img/cursor.png');
	this.cursorTexture.magFilter = THREE.NearestFilter;
	this.cursorTexture.minFilter = THREE.NearestFilter;

	this.blockTextures = {
		circle:textureLoader.load('img/block_circle.png'),
		diamond:textureLoader.load('img/block_diamond.png'),
		heart:textureLoader.load('img/block_heart.png'),
        star:textureLoader.load('img/block_star.png'),
		triangle:textureLoader.load('img/block_triangle.png'),
		triangle2:textureLoader.load('img/block_triangle2.png'),
		penta:textureLoader.load('img/block_penta.png')
	};

	//Sharpen out textures - prevent scale blurring
	//var maxAnisotropy = this.renderer.getMaxAnisotropy();
	//for(var i in this.blockTextures){
		//this.blockTextures[i].magFilter = THREE.NearestFilter;
		//this.blockTextures[i].minFilter = THREE.NearestFilter;
		//this.blockTextures[i].anisotropy = maxAnisotropy;
	//}

	this.blockColors = {
		circle:0x4CAF50,
		diamond:0x9C27B0,
		heart:0xF44336,
		star:0xFFEB3B,
		triangle:0x00BCD4,
		triangle2:0x3F51B5,
		penta:0x607D8B
	};

};

PuzzleGame.prototype.resetGameVariables = function(){
	//TODO:Sort these!
	this.animationQueue = 0;
	this.score = 0;
	this.gameGrid = [];
	this.boardHeight = 13;
	this.boardWidth = 30;
	this.circlePieceSize = (TWO_PI/this.boardWidth);
	this.stackHeights = [];
	this.blockWidth = 35;
	this.blockHeight = 35;
	this.blockDepth = 10;
	this.boardPixelHeight = (this.boardHeight)*this.blockHeight;
	this.halfBoardPixelHeight = this.boardPixelHeight/2;
	this.boardRadius = ((this.blockWidth-1)*this.boardWidth)/(2*PI);
	this.hasControl = false;
	this.gameActive = false;
	this.upOffset = 0;
	this.pushDelay = 100;
	this.dropDelay = 150;
	this.handicap = 4;
	this.matches = 0;
	this.rowsCreated = 0;
	this.piTimer = 0;
	this.debugSelection = false;
	this.chainCount = 0;
	this.chainTimer = null
};

PuzzleGame.prototype.startGame = function(){
	this.closeAndSetGameMode(MODE_ENDLESS);
};

PuzzleGame.prototype.resetGame = function(){

    TWEEN.removeAll();

    this.resetGameVariables();

    if(this.hasOwnProperty('gameBoard')){
        this.scene.remove(this.gameBoard);
    }
    this.gameBoard = this.cylinder();
    this.scene.add(this.gameBoard);

    this.generateNextRow();

    if(this.pushTimeoutObj !== null){
        clearTimeout(this.pushTimeoutObj);
    }
    this.pushTimeoutObj = setTimeout(this.checkToPushBlocks.bind(this),2000);

	if(this.difficultyTimeoutObj !== null){
		clearInterval(this.difficultyTimeoutObj);
	}
	this.difficultyTimeoutObj = setInterval(this.makeHarder.bind(this),1000);

    if(this.hasOwnProperty('cursorObj')){
        this.scene.remove(this.cursorObj);
    }
    this.cursorObj = this.generateCursor();
    this.scene.add(this.cursorObj);

    this.selectorY = Math.floor(this.boardHeight/2);
    this.selectorX = 0;//Math.floor(this.boardWidth/2);

    var startingTowerAngle = this.circlePieceSize * this.selectorX-HALF_PI-(this.circlePieceSize/2);
    this.gameBoard.rotation.y = startingTowerAngle-PI;
    this.nextRow.rotation.y = startingTowerAngle;

    var startingTowerPosition = this.updateTowerPos();
    this.gameBoard.position.y = startingTowerPosition - this.boardPixelHeight;

	this.openTube();

    new TWEEN.Tween(this.gameBoard.position).to({
        y:startingTowerPosition
    },1200).easing(TWEEN.Easing.Quintic.Out).delay(400).start();

    var sThis = this;
    new TWEEN.Tween(this.gameBoard.rotation).to({
        y:startingTowerAngle
    },1200).easing(TWEEN.Easing.Quintic.Out).delay(400).start().onComplete(function(){
        sThis.hasControl = true;
        sThis.gameActive = true;
        sThis.checkForMatches();
        //sThis.animationQueue = 1;
    });
};

PuzzleGame.prototype.loseAnimation = function(){
    for(var x = 0;x<this.boardWidth;x++){
        for(var y=0;y<this.boardHeight;y++){
            if(this.gameGrid[x][y] != null){
                this.gameGrid[x][y].material.map = this.blankTexture;
                var delay = 500;
                if(this.gameGrid[x][this.boardHeight-1] != null){
                    delay = 2000;
                }
                new TWEEN.Tween(this.gameGrid[x][y].position).to({
                    y:-this.boardPixelHeight*2
                },4000).easing(TWEEN.Easing.Exponential.Out).delay(delay).start();
            }
        }
    }
	setTimeout(this.closeAndSetGameMode.bind(this,MODE_SCORECARD),2500);
};

PuzzleGame.prototype.checkToPushBlocks = function(){
    if(this.animationQueue !== 0){
    //if(TWEEN.getAll().length != 0){
        this.pushTimeoutObj = setTimeout(this.checkToPushBlocks.bind(this),this.pushDelay);
        return;
    }
    for(var tx = 0;tx<this.boardWidth;tx++){
        if(this.gameGrid[tx][this.boardHeight-1] !== null){
            //YOU LOSE
            this.hasControl = false;
	        this.gameActive = false;
            this.loseAnimation();
            return;
        }
    }

    this.pushTowerUp();
    this.pushTimeoutObj = setTimeout(this.checkToPushBlocks.bind(this),this.pushDelay);
};

PuzzleGame.prototype.pushTowerUp = function(){
    this.upOffset += this.blockHeight/100;
    if(this.upOffset>this.blockHeight){

    	for(var x=0;x<this.boardWidth;x++){
            for(var y=this.boardHeight-1;y>=0;y--){
                if(this.gameGrid[x][y] != null) {
                    this.gameGrid[x][y].position.y = this.calcYBlockPos(y + 1);
                    this.gameGrid[x][y + 1] = this.gameGrid[x][y];
                    //this.gameGrid[x][y] = null;
                }
            }
        }
        for(var nx = 0;nx<this.boardWidth;nx++){
            var block = this.generateBlockMesh(this.nextRow.children[nx].userData.blockType,nx,0);
            this.gameBoard.add(block);
            this.gameGrid[nx][0] = block;
        }
        this.checkForMatches();
        this.generateNextRow();
        this.upOffset = 0;
        this.selectorY++;


	    //this.upOffset = 0;
    }
    this.updateTowerPos();
    this.updateCursorPos();
    this.updateNextRowPos();
};

PuzzleGame.prototype.generateCursor = function(){
    var obj = new THREE.Object3D();
    var geometry = new THREE.PlaneGeometry(this.blockWidth,this.blockHeight);

    var material = new THREE.MeshBasicMaterial({color:0xffffff,side: THREE.DoubleSide,map:this.cursorTexture,transparent: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.x = -this.blockWidth/2;
    obj.add(mesh);
    var mesh2 = new THREE.Mesh(geometry,material);
    mesh2.position.x = this.blockWidth/2;
    obj.add(mesh2);

    obj.position.z = this.boardRadius+this.blockDepth;
    return obj;
};

PuzzleGame.prototype.closeTube = function(completeFn){
	var closeDelay = 1000;
	var closeEase = TWEEN.Easing.Cubic.Out;

	//new TWEEN.Tween(this.title1.position).to({y:30},closeDelay).easing(closeEase).start();
	//new TWEEN.Tween(this.title2.position).to({y:-30},closeDelay).easing(closeEase).start();

	new TWEEN.Tween(this.tube.children[0].position).to({y:-this.boardPixelHeight/2},closeDelay).easing(closeEase).start();
	new TWEEN.Tween(this.tube.children[0].rotation).to({y:-HALF_PI},closeDelay).easing(closeEase).start();

	new TWEEN.Tween(this.tube.children[1].position).to({y:this.boardPixelHeight/2},closeDelay).easing(closeEase).start();
	new TWEEN.Tween(this.tube.children[1].rotation).to({y:HALF_PI},closeDelay).easing(closeEase).start();

	setTimeout(completeFn,closeDelay);
};

PuzzleGame.prototype.openTube = function(completeFn){
	var openDelay = 1000;
	var openEase = TWEEN.Easing.Cubic.Out;

	//new TWEEN.Tween(this.title1.position).to({y:this.boardPixelHeight},openDelay).easing(openEase).start();
	//new TWEEN.Tween(this.title2.position).to({y:-this.boardPixelHeight},openDelay).easing(openEase).start();

	new TWEEN.Tween(this.tube.children[0].position).to({y:-this.boardPixelHeight+1},openDelay).easing(openEase).start();
	new TWEEN.Tween(this.tube.children[0].rotation).to({y:0},openDelay).easing(openEase).start();

	new TWEEN.Tween(this.tube.children[1].position).to({y:this.boardPixelHeight-1},openDelay).easing(openEase).start();
	new TWEEN.Tween(this.tube.children[1].rotation).to({y:0},openDelay).easing(openEase).start();

	setTimeout(completeFn,openDelay);
};

PuzzleGame.prototype.generateTube = function(){
    var obj = new THREE.Object3D();
    var r = this.boardRadius+this.blockDepth/2+5;
    var material = new THREE.MeshBasicMaterial({color:0x222222,side:THREE.DoubleSide,map:this.tubeTexture});
    var geometry = new THREE.CylinderGeometry(r,r,this.boardPixelHeight,this.boardWidth,1,false);
    var tube = new THREE.Mesh( geometry, material);
    tube.position.y = -(this.boardPixelHeight/2);
	tube.rotation.y = - HALF_PI;

    var tube2 = new THREE.Mesh( geometry, material );
    tube2.position.y = (this.boardPixelHeight/2);
	tube2.rotation.y = HALF_PI;

    obj.add(tube);
    obj.add(tube2);
    return obj;
};

PuzzleGame.prototype.generateCylinderDepthFilter = function(){
	var obj = new THREE.Object3D();
	var material =  new THREE.MeshBasicMaterial({color:0x000000,side:THREE.DoubleSide,transparent:true,opacity:0.6});
	var geometry = new THREE.PlaneGeometry((this.boardRadius+this.blockDepth)*2, this.boardPixelHeight );
	var plane = new THREE.Mesh(geometry,material);

	var r = this.boardRadius+this.blockDepth;
	material = new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide,transparent:true,opacity:0.1,depthWrite: false, depthTest: false});
	geometry = new THREE.CylinderGeometry(r,r,this.boardPixelHeight,this.boardWidth,1,true,-HALF_PI,PI);
	var tube = new THREE.Mesh( geometry, material );

	obj.add(plane);
	//obj.add(tube);
	return obj;
};

PuzzleGame.prototype.keyPress = function(event){
    event.preventDefault();

    if(!this.hasControl){
        return;
    }

    //console.log(event.keyCode);
    switch(event.keyCode){
        case 88: //X
            //this.destroyBlock(this.selectorX,this.selectorY);
            break;
        case 90: //Z

            break;
        case 32: //Space
            this.swapSelectedBlocks();
            break;
        case 38: //up
            this.adjustSelector('up');
            break;
        case 40: //down
            this.adjustSelector('down');
            break;
        case 37: //left
            this.adjustSelector('left');
            break;
        case 39: //right
            this.adjustSelector('right');
            break;
    }
};

PuzzleGame.prototype.swapSelectedBlocks = function(){
	this.swapBlocks(this.selectorX,this.selectorY,this.selectorX-1);
};

PuzzleGame.prototype.checkForMatches = function(){

    if(!this.hasControl){
        return;
    }

    //combo being number of matches that happened in the same check
    var comboCount = 0;

    var blocksToBeDestroyed = [];
    for(var y = 0; y < this.boardHeight;y++){
	    for(var x = 0; x < this.boardWidth;x++){
			if(this.gameGrid[x][y] == null || this.gameGrid[x][y].userData.locked){
				continue;
			}

		    var typeToMatch = this.gameGrid[x][y].userData.blockType;
		    var matchChainX = [x];
			var xToTest = x+1;
		    if(xToTest == this.boardWidth){
			    xToTest = 0;
		    }

		    while(xToTest != x && this.gameGrid[xToTest][y] != null && !this.gameGrid[xToTest][y].userData.locked && !this.gameGrid[xToTest][y].userData.alreadyMatchedX){
				var nextType = this.gameGrid[xToTest][y].userData.blockType;
				if (nextType != typeToMatch) {
					//no more matches!
					break;
				}
				matchChainX.push(xToTest);
				xToTest++;
			    if(xToTest == this.boardWidth){
				    xToTest = 0;
			    }
			}

            if(matchChainX.length>=3){
	            this.matches++;
	            comboCount++;
                for(var i=0;i<matchChainX.length;i++){
	                this.gameGrid[matchChainX[i]][y].userData.alreadyMatchedX = true;
                    blocksToBeDestroyed.push({x:matchChainX[i],y:y});
                }
            }
            matchChainX = [];

		    var matchChainY = [y];
		    var yToTest = y+1;
		    if(yToTest == this.boardHeight){
                continue; // No Y rollover!
		    }

		    while(yToTest != y && this.gameGrid[x][yToTest] != null && !this.gameGrid[x][yToTest].userData.locked && !this.gameGrid[x][yToTest].userData.alreadyMatchedY){
			    var nextType = this.gameGrid[x][yToTest].userData.blockType;
			    if (nextType != typeToMatch) {
				    //no more matches!
				    break;
			    }
			    matchChainY.push(yToTest);
			    yToTest++;
			    if(yToTest == this.boardHeight){
                    break; // No Y rollover!
			    }
		    }

		    if(matchChainY.length>=3){
			    this.matches++;
			    comboCount++;
			    for(var i=0;i<matchChainY.length;i++){
				    this.gameGrid[x][matchChainY[i]].userData.alreadyMatchedY = true;
                    blocksToBeDestroyed.push({x:x,y:matchChainY[i]});
			    }
		    }
		    matchChainY = [];
	    }
    }

    if(comboCount > 1){
    	//console.log("x"+comboCount+"!");
    }


    if (blocksToBeDestroyed.length > 0) {
	    this.chainCount++;

	    if(this.chainTimer !== null){
		    clearTimeout(this.chainTimer);
	    }
	    this.chainTimer = setTimeout(this.resetChain.bind(this),this.dropDelay+600);

	    if (this.chainCount > 1) {
		    console.log('CHAIN ' + this.chainCount);
	    }
    }

    for(var d = 0;d<blocksToBeDestroyed.length;d++){
    	this.score+=comboCount*this.chainCount;
        this.destroyBlock(blocksToBeDestroyed[d].x,blocksToBeDestroyed[d].y);
    }
};

PuzzleGame.prototype.resetChain = function(){
	this.chainCount = 0;
	this.chainTimer = null;
};

PuzzleGame.prototype.swapBlocks = function(x,y,x2){

    if(x2==-1){
        x2=this.boardWidth-1;
    }

    var block1 = this.gameGrid[x][y];
    var block2 = this.gameGrid[x2][y];

    if((block1 != null && block1.userData.locked )|| (block2 != null && block2.userData.locked)){
        return;
    }

	var sThis = this;
    if(block1 !== null){
	    this.animationQueue++;
        new TWEEN.Tween(block1.position).to({
            x:this.calcXBlockPos(x2),
            z:this.calcZBlockPos(x2)
        },50).easing( TWEEN.Easing.Bounce.Out).start().onComplete(function(){
            sThis.animationQueue--;
        });
        block1.rotation.y = this.calcRBlockPos(x2);
    }

    if(block2 !== null) {
	    this.animationQueue++;
        new TWEEN.Tween(block2.position).to({
            x:this.calcXBlockPos(x),
            z:this.calcZBlockPos(x)
        },50).easing( TWEEN.Easing.Bounce.Out).start().onComplete(function(){
	        sThis.animationQueue--;
        });
        block2.rotation.y = this.calcRBlockPos(x);
    }

    this.gameGrid[x][y] = block2;
    this.gameGrid[x2][y] = block1;

    if(block1 !=  null && block2 == null){
        if(y-1>=0 && this.gameGrid[x2][y-1] == null){
            this.lockBlocksStartingAtPoint(x2,y);
	        this.animationQueue++;
            setTimeout(this.dropBlocksStartingAtPoint.bind(this,x2,y),this.dropDelay);
        }
        this.lockBlocksStartingAtPoint(x,y+1);
	    this.animationQueue++;
        setTimeout(this.dropBlocksStartingAtPoint.bind(this,x,y+1),this.dropDelay);
    }

    else if(block2 !=  null && block1 == null){
        if(y-1>=0 && this.gameGrid[x][y-1] == null){
            this.lockBlocksStartingAtPoint(x,y);
	        this.animationQueue++;
            setTimeout(this.dropBlocksStartingAtPoint.bind(this,x,y),this.dropDelay);
        }
        this.lockBlocksStartingAtPoint(x2,y+1);
	    this.animationQueue++;
        setTimeout(this.dropBlocksStartingAtPoint.bind(this,x2,y+1),this.dropDelay);
    }

	this.checkForMatches();

    //this.checkDropBlocks();
};

PuzzleGame.prototype.destroyBlock = function(x,y){
    if(this.gameGrid[x][y] == null || this.gameGrid[x][y].userData.locked){
        return;
    }
    this.animationQueue++;

    this.gameGrid[x][y].userData.locked = true;
    this.gameGrid[x][y].userData.exploding = true;
    //this.gameGrid[x][y].material.map = this.explodeTexture;

	/*
	new TWEEN.Tween(this.gameGrid[x][y].scale).to({
		x:0.7,
		y:0.7
	},800).easing( TWEEN.Easing.Elastic.Out).start();
	*/

    setTimeout(this.deleteBlock.bind(this,x,y),500);
};

PuzzleGame.prototype.lockBlocksStartingAtPoint = function(x,y){
    for(var i = y;i<this.boardHeight;i++){
        if(this.gameGrid[x][i] !== null && !this.gameGrid[x][i].userData.exploding){
            this.gameGrid[x][i].userData.locked = true;
	        //Set texture to a debug "lock/dropping" texture.
            //this.gameGrid[x][i].material.map = this.lockTexture;
        }else{
            return;
        }
    }
};

PuzzleGame.prototype.deleteBlock = function(x,y){
    this.gameGrid[x][y].userData.exploding = false;
    this.gameBoard.remove(this.gameGrid[x][y]);
    this.gameGrid[x][y] = null;
	this.animationQueue--;

    this.lockBlocksStartingAtPoint(x,y+1);
	this.animationQueue++;
    setTimeout(this.dropBlocksStartingAtPoint.bind(this,x,y+1),this.dropDelay);
};

PuzzleGame.prototype.dropBlocksStartingAtPoint = function(x,y){
	this.animationQueue--;
    var stillGottaFall = true;
    for(var i = y;i<this.boardHeight;i++) {
        if (this.gameGrid[x][i] !== null && !this.gameGrid[x][i].userData.exploding){
            //You moved a block under this block about to fall.
            if(this.gameGrid[x][i-1] !== null){
                this.gameGrid[x][i].userData.locked = false;
                //Set texture back to normal, non debug texture.
                //this.gameGrid[x][i].material.map = this.blockTextures[this.gameGrid[x][i].userData.blockType];
                stillGottaFall = false;
                continue;
            }
            sThis = this;
            this.animationQueue++;
            new TWEEN.Tween(this.gameGrid[x][i].position).to({y:this.calcYBlockPos(i-1)},200).easing( TWEEN.Easing.Bounce.Out).start().onComplete(function(){
                sThis.animationQueue--;
            });
            this.gameGrid[x][i-1] = this.gameGrid[x][i];
            this.gameGrid[x][i] = null;
        }else{
            ///stoooop!
            break;
        }
    }
    if(stillGottaFall){
        if(y-1>=0){
	        this.animationQueue++;
            this.dropBlocksStartingAtPoint(x,y-1);
        }
    }else{
	    this.checkForMatches();
    }
};

PuzzleGame.prototype.adjustSelector = function(direction){
    switch(direction){
        case 'up':
            this.selectorY++;
            break;
        case 'down':
            this.selectorY--;
            break;
        case 'left':
            this.selectorX++;
            if(this.selectorX >= this.boardWidth){
                this.gameBoard.rotation.y = this.nextRow.rotation.y = this.circlePieceSize*-1-HALF_PI-(this.circlePieceSize/2)
            }
            break;
        case 'right':
            this.selectorX--;
            if(this.selectorX < 0){
                this.gameBoard.rotation.y = this.nextRow.rotation.y =  this.circlePieceSize*this.boardWidth-HALF_PI-(this.circlePieceSize/2);
            }
            break;
    }
    if(this.selectorY>=this.boardHeight){
        this.selectorY = this.boardHeight-1;
    }
    if(this.selectorY<0){
        this.selectorY = 0
    }
    if(this.selectorX>=this.boardWidth){
        this.selectorX = 0;
    }
    if(this.selectorX<0){
        this.selectorX = this.boardWidth-1;
    }
    this.focusCameraOnSelection();
};

PuzzleGame.prototype.focusCameraOnSelection = function(){
    var newAngle = this.circlePieceSize * this.selectorX-HALF_PI-(this.circlePieceSize/2);

    new TWEEN.Tween( this.gameBoard.rotation ).to({
        //x: this.circlePieceSize * this.selectorY,
        y: newAngle
        //z: 0
    },200).easing( TWEEN.Easing.Exponential.Out).start();

    new TWEEN.Tween( this.nextRow.rotation ).to({
        //x: this.circlePieceSize * this.selectorY,
        y: newAngle
        //z: 0
    },200).easing( TWEEN.Easing.Exponential.Out).start();

    this.updateCursorPos();
};

PuzzleGame.prototype.calcYBlockPos = function(y){
	return (y*this.blockHeight)+(this.blockHeight/2)
};

PuzzleGame.prototype.calcXBlockPos = function(x){
    return Math.cos(this.circlePieceSize*x)*this.boardRadius;
};

PuzzleGame.prototype.calcZBlockPos = function(x){
    return Math.sin(this.circlePieceSize*x)*this.boardRadius;
};

PuzzleGame.prototype.calcRBlockPos = function(x){
    return -this.circlePieceSize*x+HALF_PI;
};

PuzzleGame.prototype.loadMap = function(mapFile){
	var sThis = this;
	this.fileLoader.load('maps/'+mapFile+'.txt',function(map){
        map = map.replace(/\r\n/g, "\r");
		var rows = map.split("\r");
		var botRow = rows.length-1;
        var mapArray = [];
		for(var y = botRow;y>=0;y--){
            var row = [];
            var items = rows[y].split("");
            for(var x = items.length-1;x>=0;x--){
                row.push(items[x]);
            }
            mapArray.push(row);
		}
		sThis.resetGame(mapArray);
	});
};

PuzzleGame.prototype.generateNextRow = function(){
    if(this.hasOwnProperty('nextRow')){
        this.scene.remove(this.nextRow);
    }

    var colorPool = [];
	var allColors = Object.keys(this.blockColors);
	for(var c=0;c<allColors.length - this.handicap;c++){
		colorPool.push(allColors[c]);
	}

    this.nextRow = new THREE.Object3D();
    var meshes = this.generateNextRowMeshArray(colorPool);
    for(var i in meshes){
        this.nextRow.add(meshes[i]);
    }
    this.scene.add(this.nextRow);
    this.updateNextRowPos();
    this.nextRow.rotation.y = this.circlePieceSize * this.selectorX-HALF_PI-(this.circlePieceSize/2);
	this.rowsCreated++;
};

PuzzleGame.prototype.generateNextRowMeshArray = function(colorPoolIn){
    var meshes = [];
    var geometry = new THREE.BoxGeometry(this.blockWidth,this.blockHeight,this.blockDepth );
    //var keys = Object.keys(this.blockTextures);

    //Preload the array with nulls
	for(var x1 = 0; x1 < this.boardWidth; x1++) {
		meshes[x1] = null;
	}

    for(var x = 0; x < this.boardWidth; x++) {

	    var colorPool = colorPoolIn.slice(0);
	    var lastXType = '';
	    var lastYType = '';

	    for(var i=-2;i<=2;i++) {

		    if(i == 0){
			    continue;
		    }

		    var nextXBlock = meshes[(x-i+this.boardWidth)%this.boardWidth];

		    if(nextXBlock !== null){
			    var xType = nextXBlock.userData.blockType;
			    var xPos = colorPool.indexOf(xType);
			    if(xType == lastXType && xPos !== -1 && colorPool.length > 1){
				    colorPool.splice(xPos, 1);
			    }
			    lastXType = xType;
		    }

		    if(i < 0){
		    	continue;
		    }

		    var nextYBlock = this.gameGrid[x][i-1];
		    if(nextYBlock !== null){
			    var yType = nextYBlock.userData.blockType;
			    var yPos = colorPool.indexOf(yType);
			    if(yType == lastYType && yPos !== -1 && colorPool.length > 1){
				    colorPool.splice(yPos,1);
			    }
			    lastYType = yType;
		    }

	    }

	    var blockType = colorPool[Math.floor(Math.random()*colorPool.length)];

        var adjustedColor = new THREE.Color(this.blockColors[blockType]);
        adjustedColor.add( new THREE.Color(0x505050));
        var material = new THREE.MeshBasicMaterial( { color: adjustedColor,map:this.blockTextures[blockType],transparent:true,opacity:1});
        var mesh = new THREE.Mesh(geometry,material);
        //mesh.userData.color = mesh.material.color.getHex();
        mesh.userData.blockType = blockType;
        mesh.position.x = this.calcXBlockPos(x);
        mesh.position.y = this.calcYBlockPos(0);
        mesh.position.z = this.calcZBlockPos(x);
        mesh.rotation.y = this.calcRBlockPos(x);
        meshes[x] = mesh;
    }
    return meshes;
};

PuzzleGame.prototype.generateBlockMesh = function(blockType,x,y){
    var geometry = new THREE.BoxGeometry(this.blockWidth,this.blockHeight,this.blockDepth);
    var material = new THREE.MeshBasicMaterial({color: this.blockColors[blockType],map:this.blockTextures[blockType]});
    var mesh = new THREE.Mesh(geometry,material);
    //mesh.userData.color = mesh.material.color.getHex();

    mesh.userData.blockType = blockType;
    mesh.userData.locked = false;
    mesh.userData.exploding = false;
    //Used to prevent double counting when finding matches.
    mesh.userData.alreadyMatchedX = false;
	mesh.userData.alreadyMatchedY = false;

    mesh.position.x = this.calcXBlockPos(x);
    mesh.position.y = this.calcYBlockPos(y);
    mesh.position.z = this.calcZBlockPos(x);

    mesh.rotation.y = this.calcRBlockPos(x);

    return mesh;
};

PuzzleGame.prototype.getBlockAt = function(x,y){
	x = (x+this.boardWidth)%this.boardWidth;
	y = (y+this.boardHeight)%this.boardHeight;
	if(x in this.gameGrid === false  || y in this.gameGrid[x] === false || this.gameGrid[x][y] === null){
		return false;
	}
	return this.gameGrid[x][y];
};

PuzzleGame.prototype.generateMap = function(colorPoolIn,heightPercent){
	var grid = [];
	for(var gx =0;gx<this.boardWidth;gx++){
		var column = [];
		for(var gy =0;gy<this.boardHeight;gy++) {
			column.push(null);
		}
		grid.push(column);
	}

	for(var x =0;x<this.boardWidth;x++){
		for(var y =0;y<this.boardHeight;y++) {

			if(y > this.boardHeight*heightPercent){
				grid[x][y] = null;
				continue;
			}

			var colorPool = colorPoolIn.slice(0);
			var lastXType = '';
			var lastYType = '';

			for(var i=-2;i<=2;i++){
				if(i == 0){
					continue;
				}

				var nextXBlock = grid[(x-i+this.boardWidth)%this.boardWidth][y];

				if(nextXBlock !== null){
					var xType = nextXBlock;
					var xPos = colorPool.indexOf(xType);
					if(xType == lastXType && xPos !== -1 && colorPool.length > 1){
						colorPool.splice(xPos, 1);
					}
					lastXType = xType;
				}
				var nextYBlock = grid[x][(y-i+this.boardHeight)%this.boardHeight];

				if(nextYBlock !== null){
					var yType = nextYBlock;
					var yPos = colorPool.indexOf(yType);
					if(yType == lastYType && yPos !== -1 && colorPool.length > 1){
						colorPool.splice(yPos,1);
					}
					lastYType = yType;
				}
			}
			grid[x][y] = colorPool[Math.floor(Math.random()*colorPool.length)];
		}
	}
	return grid;
};

PuzzleGame.prototype.cylinder = function(mapArray){
    var blocks = new THREE.Object3D();
	var colorPool = [];
    var allColors = Object.keys(this.blockColors);
	for(var i=0;i<allColors.length - this.handicap;i++){
		colorPool.push(allColors[i]);
	}

	var goodMap = this.generateMap(colorPool,0.3);

    for(var x = 0; x < this.boardWidth; x++) {
        var column = [];
        this.stackHeights[x] = this.boardHeight;
        for (var y = 0; y < this.boardHeight; y++) {

        	//var invalidBlockTypes = array();

            var blockType = goodMap[x][y];//colorPool[Math.floor(Math.random()*colorPool.length)];
			//console.log('chose '+blockType);
	        //console.log('==========================');

	        /*
            if(mapArray){
                if(!mapArray[y] || !mapArray[y][x] || mapArray[y][x] == '-'){
                    column.push(null);
                    continue;
                }
                if(mapArray[y][x] != '?') {
                    blockType = allColors[mapArray[y][x]];
                }
            }else if(y>Math.floor(this.boardHeight*0.40)){
                column.push(null);
                continue;
            }
            */
	        if(blockType == null){
	        	column.push(null);
	        }else{
		        var mesh = this.generateBlockMesh(blockType,x,y);
		        column.push(mesh);
		        blocks.add(mesh);
	        }
        }
        this.gameGrid.push(column);
    }
    return blocks;
};

PuzzleGame.prototype.onWindowResize = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( width, height );
};

PuzzleGame.prototype.updateTowerPos = function(){
    this.gameBoard.position.y = -this.halfBoardPixelHeight+this.upOffset;
    return this.gameBoard.position.y;
};
PuzzleGame.prototype.updateCursorPos = function(){
    this.cursorObj.position.y = this.calcYBlockPos(this.selectorY)-this.halfBoardPixelHeight+this.upOffset;
    this.debugSelectionUpdate();
};
PuzzleGame.prototype.updateNextRowPos = function(){
    this.nextRow.position.y = this.calcYBlockPos(-1)-this.halfBoardPixelHeight-(this.blockHeight/2)+this.upOffset;
};

PuzzleGame.prototype.animate = function(){
    requestAnimationFrame(this.animate.bind(this));
    this.stats.begin();
    this.render();
    this.stats.end();
};

PuzzleGame.prototype.gameAnimations = function(){

	var timer = performance.now();

	this.menuObj.rotation.y = Math.sin(this.piTimer)*(HALF_PI/10);
	//this.menuObj.rotation.x = Math.cos(this.piTimer*2)*(HALF_PI/10);

	if(!this.gameActive){
		return;
	}

	var almostDead = {};
	for(var tx = 0;tx<this.boardWidth;tx++){
		almostDead[tx] = false;
		if(this.gameGrid[tx][this.boardHeight-3] !== null){
			almostDead[tx] = true;
		}
	}

	for(var x=0;x<this.boardWidth;x++){
		for(var y=0;y<this.boardHeight;y++) {
			var block = this.gameGrid[x][y];
			if(block !== null && block.userData.exploding){
				block.scale.x = block.scale.y =  (0.1*Math.sin(this.piTimer*16)+0.8);
			}

			if(block !== null) {
				if(almostDead[x]){
					block.rotation.z = Math.cos(this.piTimer*3)*PI/32
				}else{
					block.rotation.z = 0;
				}
			}
		}
	}

	for(var i =0; i< this.nextRow.children.length;i++){
		if(almostDead[i]){
			this.nextRow.children[i].rotation.z = Math.cos(this.piTimer*3)*PI/32
		}else{
			this.nextRow.children[i].rotation.z = 0;
		}
	}

	for(var c =0; c< this.cursorObj.children.length;c++) {
		this.cursorObj.children[c].scale.x = this.cursorObj.children[c].scale.y = (0.05*Math.sin(this.piTimer)+1);
	}

};

PuzzleGame.prototype.render = function() {
    TWEEN.update();
	this.gameAnimations();
	this.renderer.render(this.scene,this.camera);
    this.piTimer+=0.05;
    if(this.piTimer > TWO_PI){
        this.piTimer = 0;
    }
};




PuzzleGame.prototype.debugLoadMap = function(){
	this.loadMap('map'+this.debugMapNumber);
};

PuzzleGame.prototype.debugDelete10 = function(){
	for(var i=0;i<10;i++){
		var x = Math.floor(Math.random()*this.boardWidth);
		var y = Math.floor(Math.random()*this.boardHeight);
		this.destroyBlock(x,y);
	}
};

PuzzleGame.prototype.debugSelectionUpdate = function(){
	if(this.debugSelection) {
		for(var x=0;x<this.boardWidth;x++) {
			for(var y=0;y<this.boardHeight;y++) {
				if (this.gameGrid[x][y] !== null){
					this.gameGrid[x][y].material.color.setHex(this.gameGrid[x][y].userData.color);
				}
			}
		}

		if (this.gameGrid[this.selectorX][this.selectorY] !== null) {
			this.gameGrid[this.selectorX][this.selectorY].material.color.setHex(0x00ff00);
		}

		var otherX = this.selectorX-1;
		if(otherX<0){
			otherX = this.boardWidth-1;
		}

		if (this.gameGrid[otherX][this.selectorY] !== null) {
			this.gameGrid[otherX][this.selectorY].material.color.setHex(0x00ff00);
		}
	}
};

PuzzleGame.prototype.initDatGui = function(){
	var gui = new dat.GUI();

	/*
	var f1 = gui.addFolder('SELECTION');
	f1.add(this,"selectorX",0,this.boardWidth-1).step(1).onChange(this.focusCameraOnSelection.bind(this)).listen();
	f1.add(this,"selectorY",0,this.boardHeight-1).step(1).onChange(this.focusCameraOnSelection.bind(this)).listen();
	f1.add(this,"debugSelection").listen();
	f1.open();

	var f2 = gui.addFolder('BLOCKS');
	f2.add(this,"dropDelay",100,1000).step(10).listen();
	f2.add(this,"debugDelete10");
	f2.add(this,"checkForMatches");
	f2.add(this,"stopQueue").listen();
	f2.add(this,'pushTowerUp');
	//f2.open();

	var f3 = gui.addFolder('CUSTOM MAPS');
	f3.add(this,"debugMapNumber",1,2).step(1);
	f3.add(this,"debugLoadMap");
	//f3.open();
	*/

	var f4 = gui.addFolder('GAMEPLAY');
	f4.add(this,"handicap",0,4).step(1).listen();
	f4.add(this,"pushDelay",0,200).step(1).listen();
	f4.add(this,"matches").listen();
	f4.add(this,"score").listen();
	f4.add(this,"chainCount").listen();
	f4.add(this,"rowsCreated").listen();
	f4.add(this,"startGame");
	f4.open();

	var f5 = gui.addFolder('VB13');

	//gui.close();
};




PuzzleGame.prototype.initTouch = function(){
	this.touchTimer = null;
	this.xTouchChain = 0;
	this.yTouchChain = 0;
	this.renderer.domElement.addEventListener( 'touchstart', this.onDocumentTouchStart.bind(this), false );
	this.renderer.domElement.addEventListener( 'touchmove', this.onDocumentTouchMove.bind(this), false );
};

PuzzleGame.prototype.onDocumentTouchStart = function( event ){
	var sThis = this;
	if ( event.touches.length === 1 ) {
		if (this.touchTimer == null) {
			this.touchTimer = setTimeout(function () {
				sThis.touchTimer = null;
			}, 200)
		} else {
			clearTimeout(this.touchTimer);
			this.touchTimer = null;
			if(Math.abs(this.xTouchChain) < 10 &&  Math.abs(this.yTouchChain) < 10) {
				this.swapSelectedBlocks();
			}
		}
		event.preventDefault();
		this.lastXTouch = event.touches[ 0 ].pageX;
		this.lastYTouch = event.touches[ 0 ].pageY;
		this.xTouchChain = 0;
		this.yTouchChain = 0;
	}
};

PuzzleGame.prototype.onDocumentTouchMove = function( event ){
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		var mouseX = event.touches[ 0 ].pageX;
		var mouseY = event.touches[ 0 ].pageY;
		var xDelta = ( mouseX - this.lastXTouch );
		var yDelta = ( mouseY - this.lastYTouch );
		this.lastXTouch = mouseX;
		this.lastYTouch = mouseY;
		this.xTouchChain += xDelta;
		this.yTouchChain += yDelta;
		if(this.xTouchChain < -30){
			this.adjustSelector('left');
			this.xTouchChain = 0;
		}else if(this.xTouchChain > 30){
			this.adjustSelector('right');
			this.xTouchChain = 0;
		}
		if(this.yTouchChain < -30){
			this.adjustSelector('up');
			this.yTouchChain = 0;
		}else if(this.yTouchChain > 30){
			this.adjustSelector('down');
			this.yTouchChain = 0;
		}
	}
};




new PuzzleGame();




