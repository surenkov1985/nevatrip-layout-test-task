!function(){var e,t={3648:function(){var e=document.querySelector(".container");function t(){var e=document.querySelectorAll(".content"),t=document.createElement("button");t.className="timetable__btn",t.textContent="еще...",e.forEach((function(e){var t=e.querySelector(".timetable__list");e.querySelectorAll(".timetable__item").forEach((function(e){e.getBoundingClientRect().y>t.getBoundingClientRect().y?e.classList.remove("visible"):e.classList.add("visible")})),e.querySelectorAll(".visible")}))}function n(){var e=document.querySelectorAll(".card"),t=document.querySelectorAll(".content__title > h2");e.forEach((function(e){e.scrollWidth>=500?t.forEach((function(e){e.style.fontSize="24px",e.style.lineHeight="34px"})):t.forEach((function(e){e.style.fontSize="14px",e.style.lineHeight="22px"}))}))}fetch("./data.json").then((function(e){return e.json()})).then((function(n){!function(n){n.map((function(n){var a=document.createElement("article"),c=document.createElement("div"),i=document.createElement("div"),l=document.createElement("a"),r=document.createElement("img"),o=document.createElement("div"),d=document.createElement("div"),m=document.createElement("div"),u=document.createElement("div"),s=document.createElement("p"),p=document.createElement("img"),f=document.createElement("a"),h=document.createElement("h2"),v=document.createElement("ul");p.src="./assets/img/clock-circular-outline.svg",p.alt="clock-icon",a.className="card",c.className="card__img",d.className="content__desc",i.className="card__img-adv",l.href="",l.target="_self",r.src=n.image,r.alt=n.title,m.className="content__title-block",u.className="content__time",s.className="content__time-text",o.className="card__content content",f.className="content__title",f.href="",f.target="_self",h.textContent=n.title,v.className="content__list",f.appendChild(h),s.textContent=n.duration,i.textContent=n.adv,c.appendChild(i),c.appendChild(l),l.appendChild(r),u.appendChild(p),u.appendChild(s),m.appendChild(u),m.appendChild(f),n.puncts.map((function(e,t){var a=document.createElement("li"),c=document.createElement("div"),i=document.createElement("img");if(i.src="./assets/img/arrow.svg",i.alt="arrow-icon",a.className="content__item",c.className="content__arr-icon",c.appendChild(i),t<n.puncts.length-1){var l=document.createElement("p");l.className="content__item-text",l.textContent=e,a.appendChild(c),a.appendChild(l)}else if(t===n.puncts.length-1){var r=document.createElement("div"),o=document.createElement("p"),d=document.createElement("div"),m=document.createElement("span");r.className="content__item-timetable",d.className="timetable__list",o.className="content__item-text-timetable timetable",m.textContent=e,o.appendChild(m),r.appendChild(o);var u=n.flightDates[0],s=(new Date).toLocaleDateString(),p=u.date,f=document.createElement("span");f.className="timetable__date",f.textContent=s===p?"сегодня":p,o.appendChild(f),u.times.map((function(e){var t=document.createElement("a");t.href="",t.target="_self",t.className="timetable__item",t.textContent=e,e&&d.appendChild(t)})),r.appendChild(d),a.appendChild(c),a.appendChild(r)}v.appendChild(a)})),d.appendChild(m),d.appendChild(v),o.appendChild(d),a.appendChild(c),a.appendChild(o),e.appendChild(a),t()}))}(n)})).catch((function(e){return e})),n(),t(),window.addEventListener("resize",(function(e){n(),t()}))},3634:function(e,t,n){"use strict";n(3648)}},n={};function a(e){var c=n[e];if(void 0!==c)return c.exports;var i=n[e]={id:e,loaded:!1,exports:{}};return t[e](i,i.exports,a),i.loaded=!0,i.exports}a.m=t,e=[],a.O=function(t,n,c,i){if(!n){var l=1/0;for(m=0;m<e.length;m++){n=e[m][0],c=e[m][1],i=e[m][2];for(var r=!0,o=0;o<n.length;o++)(!1&i||l>=i)&&Object.keys(a.O).every((function(e){return a.O[e](n[o])}))?n.splice(o--,1):(r=!1,i<l&&(l=i));if(r){e.splice(m--,1);var d=c();void 0!==d&&(t=d)}}return t}i=i||0;for(var m=e.length;m>0&&e[m-1][2]>i;m--)e[m]=e[m-1];e[m]=[n,c,i]},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={179:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var c,i,l=n[0],r=n[1],o=n[2],d=0;if(l.some((function(t){return 0!==e[t]}))){for(c in r)a.o(r,c)&&(a.m[c]=r[c]);if(o)var m=o(a)}for(t&&t(n);d<l.length;d++)i=l[d],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(m)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}(),a.O(void 0,[866],(function(){return a(6005)})),a.O(void 0,[866],(function(){return a(7216)}));var c=a.O(void 0,[866],(function(){return a(3634)}));c=a.O(c)}();