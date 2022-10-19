!function(){"use strict";var e,t={3648:function(){function e(e,n){var a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return t(e,n)}(e))||n&&e&&"number"==typeof e.length){a&&(e=a);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,i=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return c=e.done,e},e:function(e){i=!0,l=e},f:function(){try{c||null==a.return||a.return()}finally{if(i)throw l}}}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var n="http://localhost:5000",a=document.querySelector(".container");function r(){var t=document.querySelectorAll(".content"),n=document.createElement("button");n.className="timetable__btn",n.textContent="еще...";var a,r=e(t);try{for(r.s();!(a=r.n()).done;){var o=a.value;o.querySelector(".timetable__list")&&function(){for(var e=o.querySelector(".timetable__list"),t=o.querySelectorAll(".timetable__item"),n=e.querySelector(".timetable__more"),a=0,r=0;r<t.length;r++){var l=t[r];l.style.display="block",l.getBoundingClientRect().y>e.getBoundingClientRect().y&&(l.style.display="none",!a&&r>0&&(a=r-1))}a&&a>0&&n&&(t[a].style.display="none",n.style.display="block",n.getBoundingClientRect().y>e.getBoundingClientRect().y+t[a].offsetHeight&&a-1>0&&(t[a-1].style.display="none")),n.addEventListener("click",(function(e){e.preventDefault();for(var a=0;a<t.length;a++){t[a].style.display="block",n.style.display="none"}}))}()}}catch(e){r.e(e)}finally{r.f()}}document.querySelector(".onCode").addEventListener("click",(function(){a.innerHTML="",fetch(n+"/").then((function(e){return e.json()})).then((function(t){!function(t){t.map((function(t){var n=document.createElement("article"),o=document.createElement("div"),l=document.createElement("div"),c=document.createElement("a"),i=document.createElement("img"),d=document.createElement("div"),m=document.createElement("div"),s=document.createElement("div"),u=document.createElement("div"),p=document.createElement("p"),f=document.createElement("img"),h=document.createElement("a"),v=document.createElement("h2"),_=document.createElement("ul"),g=document.createElement("div"),y=document.createElement("div"),C=document.createElement("div"),b=document.createElement("p"),E=document.createElement("img"),x=document.createElement("a");n.className="card",o.className="card__img",m.className="content__desc",l.className="card__img-adv",s.className="content__title-block",u.className="content__time",p.className="content__time-text",d.className="card__content content",h.className="content__title",_.className="content__list",g.className="content__control",y.className="content__control-desc",C.className="content__sum",b.className="content__sum-numb",x.className="content__btn",f.src="./clock-circular-outline.svg",f.alt="clock-icon",i.src=t.image,i.alt=t.title,E.src="./valute.svg",E.alt="rub",h.href="./tour.html?id="+t.id,h.target="_self",c.href="./tour.html?id="+t.id,c.target="_self",x.href="./tour.html?id="+t.id,x.target="_self";var N=t.duration.split(":"),S="",w="";1===parseInt(N[0])||(parseInt(N[0])-1)%10==0?S=" час ":(/[2-4]$/.test(N[0])||/[5-90]$/.test(N[0]))&&(S=" часа "),1===parseInt(N[1])||(parseInt(N[1])-1)%10==0?w=" минута":/[2-4]$/.test(N[1])?w=" минуты":/[5-90]$/.test(N[1])&&(w=" минут");var D=parseInt(N[0])?parseInt(N[0])+S:"",O=parseInt(N[1])?N[1]+w:"";if(x.textContent="Подробнее",v.textContent=t.title,p.textContent=D+O,b.textContent=t.action_price,l.textContent=t.adv,h.appendChild(v),c.appendChild(i),o.appendChild(l),o.appendChild(c),u.appendChild(f),u.appendChild(p),s.appendChild(u),s.appendChild(h),t.puncts.map((function(n,a){var r=document.createElement("li"),o=document.createElement("div"),l=document.createElement("img");if(l.src="./arrow.svg",l.alt="arrow-icon",r.className="content__item",o.className="content__arr-icon",o.appendChild(l),a<t.puncts.length-1){var c=document.createElement("p");c.className="content__item-text",c.textContent=n,r.appendChild(o),r.appendChild(c)}else if(a===t.puncts.length-1){var i=document.createElement("div"),d=document.createElement("p"),m=document.createElement("div"),s=document.createElement("span");i.className="content__item-timetable",m.className="timetable__list",d.className="content__item-text-timetable timetable",s.textContent=n,d.appendChild(s),i.appendChild(d);var u=t.flight_dates[0];console.log(u);var p=new Date,f=u.date+" "+u.times[0].time.slice(0,5),h=6e4*-p.getTimezoneOffset(),v=6e4*t.time_zone,g=new Date(p.toISOString().slice(0,10)),y=new Date(f).getTime(),C=new Date(y-v+h);console.log(C.toLocaleTimeString());var b=document.createElement("span");if(b.className="timetable__date",g.toLocaleDateString()===C.toLocaleDateString())b.textContent="сегодня";else if(g.toLocaleDateString()<C.toLocaleDateString())b.textContent=C.toLocaleDateString();else{var E,x,N=e(t.flight_dates);try{for(N.s();!(x=N.n()).done;){var S=x.value;f=S.date+" "+S.times[0].time;var w=new Date(f);y=w.getTime(),(C=new Date(y-v+h)).toLocaleDateString()==g.toLocaleDateString()&&(E=S)}}catch(e){N.e(e)}finally{N.f()}E&&(b.textContent="сегодня",u=E)}if(d.appendChild(b),b.textContent){u.times.map((function(e){f=u.date+" "+e.time;var n=new Date(f);y=n.getTime();var a=(C=new Date(y-v+h)).toLocaleTimeString().slice(0,5),r=document.createElement("a");r.href="./tour.html?id="+t.id,r.target="_self",r.className="timetable__item",r.textContent=a,e&&m.appendChild(r)}));var D=document.createElement("a");D.href="",D.target="_self",D.className="timetable__item timetable__more",D.textContent="...ещё",D.style.display="none",m.appendChild(D),i.appendChild(m)}r.appendChild(o),r.appendChild(i)}_.appendChild(r)})),C.appendChild(b),C.appendChild(E),y.appendChild(C),t.norm_price){var L=document.createElement("div");L.className="content__sum-hint",L.textContent=t.norm_price+" ₽ "+t.place_norm_price,y.appendChild(L)}g.appendChild(y),g.appendChild(x),m.appendChild(s),m.appendChild(_),d.appendChild(m),d.appendChild(g),n.appendChild(o),n.appendChild(d),a.appendChild(n),r()})),function(){var t,n=e(document.getElementsByTagName("a"));try{var a=function(){var e=t.value;e.addEventListener("click",(function(t){t.preventDefault(),e.classList.contains("timetable__more")||(location.href=e.href)}))};for(n.s();!(t=n.n()).done;)a()}catch(e){n.e(e)}finally{n.f()}}()}(t)})).catch((function(e){console.log(e)}))})),r(),window.addEventListener("resize",(function(t){!function(){var t,n=document.querySelectorAll(".card"),a=document.querySelectorAll(".content__title > h2"),r=e(n);try{for(r.s();!(t=r.n()).done;){t.value.scrollWidth>=500?a.forEach((function(e){e.style.fontSize="24px",e.style.lineHeight="34px"})):a.forEach((function(e){e.style.fontSize="14px",e.style.lineHeight="22px"}))}}catch(e){r.e(e)}finally{r.f()}}(),r()}))},3634:function(e,t,n){n(3648)}},n={};function a(e){var r=n[e];if(void 0!==r)return r.exports;var o=n[e]={id:e,loaded:!1,exports:{}};return t[e](o,o.exports,a),o.loaded=!0,o.exports}a.m=t,e=[],a.O=function(t,n,r,o){if(!n){var l=1/0;for(m=0;m<e.length;m++){n=e[m][0],r=e[m][1],o=e[m][2];for(var c=!0,i=0;i<n.length;i++)(!1&o||l>=o)&&Object.keys(a.O).every((function(e){return a.O[e](n[i])}))?n.splice(i--,1):(c=!1,o<l&&(l=o));if(c){e.splice(m--,1);var d=r();void 0!==d&&(t=d)}}return t}o=o||0;for(var m=e.length;m>0&&e[m-1][2]>o;m--)e[m]=e[m-1];e[m]=[n,r,o]},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={826:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,l=n[0],c=n[1],i=n[2],d=0;if(l.some((function(t){return 0!==e[t]}))){for(r in c)a.o(c,r)&&(a.m[r]=c[r]);if(i)var m=i(a)}for(t&&t(n);d<l.length;d++)o=l[d],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(m)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}(),a.O(void 0,[866],(function(){return a(6005)})),a.O(void 0,[866],(function(){return a(7216)}));var r=a.O(void 0,[866],(function(){return a(3634)}));r=a.O(r)}();