!function(){var e,t={5316:function(){function e(e,n){var a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return t(e,n)}(e))||n&&e&&"number"==typeof e.length){a&&(e=a);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==a.return||a.return()}finally{if(l)throw o}}}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var n=new URL(location.href),a=new URLSearchParams(n.search).get("id"),i=document.querySelector(".container");function r(t){var n,a,i,r,o,c="",l=document.querySelector(".form__date"),d=document.querySelector(".form__route"),u=document.querySelector(".form__time"),m=document.querySelector(".form__back-time"),s=document.querySelector(".adult"),p=document.querySelector(".kid"),_=document.querySelector(".preferential"),f=document.querySelector(".group"),v=document.createElement("option");v.value="",v.textContent="Выберите дату",s.textContent=t.action_price,p.textContent=t.ticket_kid_price,_.textContent=t.ticket_preferential_price,f.textContent=t.ticket_group_price,l.appendChild(v);var y,h=e(t.flight_dates);try{for(h.s();!(y=h.n()).done;){item=y.value;var g=new Date;r=6e4*-g.getTimezoneOffset(),o=6e4*t.time_zone;var C=item.date+" "+item.times[0].time,k=new Date(C),b=k.getTime(),x=new Date(b-o+r).toLocaleDateString();if(k.toLocaleDateString()>=g.toLocaleDateString()){var S=document.createElement("option");S.value=item.date,S.textContent=x,l.appendChild(S)}}}catch(e){h.e(e)}finally{h.f()}for(var D=0,T=["Из A в B","Из В в А","Из A в B и обратно в А"];D<T.length;D++){item=T[D];var q=document.createElement("option");q.value=item,q.textContent=item,d.appendChild(q)}l.addEventListener("change",(function(){n=this.value})),d.addEventListener("change",(function(){var l=document.createElement("option");if(l.value="",l.textContent="Выберите время",u.appendChild(l),"Из A в B"===this.value){a=t.flight_dates.find((function(e){return e.date===n})),console.log(a,t.flight_dates,n),times=a.times,u.innerHTML="",u.appendChild(l),m.style.display="none",u.style.display="block",s.textContent=t.action_price,p.textContent=t.ticket_kid_price,_.textContent=t.ticket_preferential_price,f.textContent=t.ticket_group_price;var d,v=e(a.times);try{for(v.s();!(d=v.n()).done;){var y=d.value;firstTimetable=n+" "+y.time.slice(0,5);var h=new Date(firstTimetable);DateTime=h.getTime(),UTCDate=new Date(DateTime-o+r);var g=UTCDate.toLocaleTimeString().slice(0,5),C=document.createElement("option");C.value=y.time+"("+this.value+")",C.textContent=g+"("+this.value+")",u.appendChild(C)}}catch(e){v.e(e)}finally{v.f()}}else if("Из В в А"===this.value){a=t.back_flight_dates.find((function(e){return e.date===n})),m.innerHTML="",m.appendChild(l),m.style.display="block",u.style.display="none",s.textContent=t.action_price,p.textContent=t.ticket_kid_price,_.textContent=t.ticket_preferential_price,f.textContent=t.ticket_group_price;var k,b=e(a.times);try{for(b.s();!(k=b.n()).done;){var x=k.value,S=document.createElement("option");firstTimetable=n+" "+x.time.slice(0,5);var D=new Date(firstTimetable);DateTime=D.getTime(),UTCDate=new Date(DateTime-o+r);var T=UTCDate.toLocaleTimeString().slice(0,5);S.value=x.time+"("+this.value+")",S.textContent=T+"("+this.value+")",m.appendChild(S)}}catch(e){b.e(e)}finally{b.f()}}else if("Из A в B и обратно в А"===this.value){a=t.flight_dates.find((function(e){return e.date===n})),i=t.back_flight_dates.find((function(e){return e.date===n})),u.innerHTML="",m.style.display="block",u.style.display="block",u.appendChild(l),s.textContent=t.round_trip_price,p.textContent=t.round_trip_kid_price,_.textContent=t.round_trip_preferential_price,f.textContent=t.round_trip_group_price;var q,E=e(a.times);try{for(E.s();!(q=E.n()).done;){var w=q.value;firstTimetable=n+" "+w.time.slice(0,5);var L=new Date(firstTimetable);DateTime=L.getTime(),UTCDate=new Date(DateTime-o+r);var I=UTCDate.toLocaleTimeString().slice(0,5),N=document.createElement("option");N.value=w.time+"(Из A в B)",N.textContent=I+"(Из A в B)",u.appendChild(N)}}catch(e){E.e(e)}finally{E.f()}u.addEventListener("change",(function(d){c=d.target.selectedOptions[0].value,m.textContent="",m.appendChild(l);var u,s=e(i.times);try{for(s.s();!(u=s.n()).done;){var p=u.value;if(c){var _=new Date(a.date+" "+c.slice(0,5)),f=t.duration.split(":"),v=6e4*(60*parseInt(f[0])+parseInt(f[1])),y=new Date(_.getTime()+v),h=new Date(n+" "+p.time.slice(0,5));firstTimetable=h>y?n+" "+p.time.slice(0,5):""}else firstTimetable=n+" "+p.time.slice(0,5);if(firstTimetable){var g=new Date(firstTimetable);DateTime=g.getTime(),UTCDate=new Date(DateTime-o+r);var C=UTCDate.toLocaleTimeString().slice(0,5),k=document.createElement("option");k.value=p.time+"(Из B в A)",k.textContent=C+"(Из B в A)",m.appendChild(k)}}}catch(e){s.e(e)}finally{s.f()}}));var A,O=e(i.times);try{for(O.s();!(A=O.n()).done;){var U=A.value;firstTimetable=n+" "+U.time.slice(0,5);var B=new Date(firstTimetable);DateTime=B.getTime(),UTCDate=new Date(DateTime-o+r);var M=UTCDate.toLocaleTimeString().slice(0,5),j=document.createElement("option");j.value=U.time+"(Из B в A)",j.textContent=M+"(Из B в A)",m.appendChild(j)}}catch(e){O.e(e)}finally{O.f()}}else u.innerHTML="",u.appendChild(l)}))}function o(e){var t=Math.trunc(e/60),n=e%60,a="",i="";return 1===t||(t-1)%10==0?i=" час ":/[2-4]$/.test(String(t))?i=" часа ":/[5-90]$/.test(String(t))&&(i=" часов "),1===n||(n-1)%10==0?a=" минута":/[2-4]$/.test(String(n))?a=" минуты":/[5-90]$/.test(String(n))&&(a=" минут"),(t?t+i:"")+(n?n+a:"")}function c(e){var t="";return 1===e||(e-1)%10==0?t=" билет":/[2-4]$/.test(String(e))?t=" билета":/[5-90]$/.test(String(e))&&(hourText=" билетов"),e+t}fetch("http://localhost:5000/tour"+String(a),{method:"GET",headers:{"Content-type":"application/json"}}).then((function(e){return e.json()})).then((function(t){!function(t){i.innerHTML="";var n=document.createElement("div"),a=document.createElement("div"),l=document.createElement("h1"),d=document.createElement("a"),u=document.createElement("div"),m=document.createElement("img"),s=document.createElement("div"),p=document.createElement("div"),_=document.createElement("img"),f=document.createElement("p"),v=document.createElement("span"),y=document.createElement("span"),h=document.createElement("div"),g=document.createElement("h3"),C=document.createElement("p"),k=document.createElement("button"),b=document.createElement("div"),x=document.createElement("h3"),S=document.createElement("div"),D=document.createElement("p"),T=t.duration.split(":"),q=o(60*T[0]+parseInt(T[1])),E=t.flight_dates[0],w=new Date,L=E.date+" "+E.times[0].time,I=6e4*-w.getTimezoneOffset(),N=6e4*t.time_zone,A=new Date(w.toISOString().slice(0,10)),O=new Date(L).getTime(),U=new Date(O-N+I);if(console.log(L,O,I,new Date(O-N+I)),document.createElement("span").className="timetable__date",A.toLocaleDateString()===U.toLocaleDateString())D.textContent="сегодня";else if(A.toLocaleDateString()<U.toLocaleDateString())D.textContent=U.toLocaleDateString();else{var B,M,j=e(t.flight_dates);try{for(j.s();!(M=j.n()).done;){var $=M.value;L=$.date+" "+$.times[0].time;var H=new Date(L);O=H.getTime(),(U=new Date(O-N+I)).toLocaleDateString()==A.toLocaleDateString()&&(B=$)}}catch(e){j.e(e)}finally{j.f()}B&&(D.textContent="сегодня",E=B)}d.textContent="Назад к списку экскурсий",l.textContent=t.title,v.textContent="Продолжительность: ",y.textContent=q,g.textContent="Подробнее об экскурсии",C.textContent=t.description,k.textContent="Забронировать",x.textContent="Ближайший рейс:",d.className="container__link",n.className="tour",a.className="tour__title-block",l.className="tour__title",u.className="tour__img-block",m.className="tour__img",s.className="tour__time-block",p.className="tour__time-icon-block",f.className="tour__time-text",y.className="tour__time-duration",v.className="tour__time-desc",h.className="tour__desc-block",g.className="tour__desc-title",C.className="tour__desc",k.className="tour__btn btn",b.className="tour__timetable timetable",x.className="timetable__title",S.className="timetable__date",D.className="timetable__date-text",m.src=t.image,m.alt=t.title,_.src="./clock-circular-outline.svg",_.alt=" clock-icon",d.href="./index.html",d.target="_self",D.textContent&&(S.appendChild(D),E.times.map((function(e){L=E.date+" "+e.time.slice(0,5);var t=new Date(L);O=t.getTime();var n=(U=new Date(O-N+I)).toLocaleTimeString().slice(0,5),a=document.createElement("button");a.className="timetable__item btn",a.textContent=n,e.time&&S.appendChild(a)}))),a.appendChild(l),u.appendChild(m),p.appendChild(_),s.appendChild(p),f.appendChild(v),f.appendChild(y),s.appendChild(f),h.appendChild(g),h.appendChild(C),b.appendChild(x),b.appendChild(S),n.appendChild(a),n.appendChild(u),n.appendChild(s),n.appendChild(h),n.appendChild(b),n.appendChild(k),i.appendChild(d),i.appendChild(n),function(){var t,n=document.querySelectorAll(".btn"),a=document.querySelector(".modal"),i=document.querySelector(".modal__close"),r=e(n);try{for(r.s();!(t=r.n()).done;)t.value.addEventListener("click",(function(){a.classList.add("visible")}))}catch(e){r.e(e)}finally{r.f()}a.addEventListener("click",(function(e){e.target.classList.contains("modal__background")&&a.classList.remove("visible")})),i.addEventListener("click",(function(e){a.classList.remove("visible")}))}(),r(t),function(){var t,n=e(document.querySelectorAll(".form__checkbox"));try{var a=function(){var e=t.value;e.addEventListener("click",(function(t){e.getElementsByTagName("input")[0].checked?e.nextElementSibling.style.display="flex":e.nextElementSibling.style.display="none"}))};for(n.s();!(t=n.n()).done;)a()}catch(e){n.e(e)}finally{n.f()}}(),function(e){document.querySelector(".form__total-sum-btn").addEventListener("click",(function(t){t.preventDefault();var n,a,i=document.querySelector(".total"),r=document.querySelector(".total__forward"),l=document.querySelector(".total__back"),d=document.querySelector(".total__transfer-text"),u=document.querySelector(".total__tickets"),m=document.querySelector(".total__route"),s=document.querySelector(".total__duration"),p=document.querySelector(".total__time"),_=document.querySelector(".total__time-arrival"),f=document.querySelector(".total__back-time"),v=document.querySelector(".total__back-time-arrival"),y=document.querySelector(".total__transfer"),h=document.querySelector(".total__price"),g=document.querySelector(".adult"),C=document.querySelector(".kid"),k=document.querySelector(".preferential"),b=document.querySelector(".group"),x=new FormData(tourForm),S=document.querySelector(".form__time"),D=document.querySelector(".form__back-time"),T=new Date(x.get("date")),q={date:x.get("date"),duration:e.duration,route:x.get("route"),time:x.get("time"),back_time:x.get("back_time"),ticket_adult_quantity:x.get("ticket_adult_quantity"),action_price:g.textContent,ticket_kid_quantity:x.get("ticket_kid_quantity"),ticket_kid_price:C.textContent,ticket_preferential_quantity:x.get("ticket_preferential_quantity"),ticket_preferential_price:k.textContent,ticket_group_quantity:x.get("ticket_grop_quantity"),ticket_group_price:b.textContent};if("Из A в B и обратно в А"===q.route){var E=new Date(q.date+" "+q.time.match(/\d\d:\d\d/)[0]),w=new Date(q.date+" "+q.back_time.match(/\d\d:\d\d/)[0]),L=q.duration.split(":"),I=(w.getTime()-(E.getTime()+6e4*(60*parseInt(L[0])+parseInt(L[1]))))/6e4,N=60*parseInt(L[0])*2+2*parseInt(L[1]);console.log(I),a=o(I),n=o(N)}else{var A=q.duration.split(":");n=o(60*parseInt(A[0])+parseInt(A[1]))}var O={duration:n,totalPrice:+q.action_price*+q.ticket_adult_quantity+ +q.ticket_kid_quantity*+q.ticket_kid_price+ +q.ticket_preferential_quantity*+q.ticket_preferential_price+ +q.ticket_group_quantity*+q.ticket_group_price||0,date:T.toLocaleDateString(),time:S.value?S.value.match(/\d\d:\d\d/)[0]:"",back_time:D.value?D.value.match(/\d\d:\d\d/)[0]:"",route:q.route,tickets:c(parseInt(+q.ticket_adult_quantity+ +q.ticket_kid_quantity+ +q.ticket_preferential_quantity+ +q.ticket_group_quantity)||0),transfer:a},U=O.time.split(":"),B=q.duration.split(":"),M=60*parseInt(U[0])+parseInt(U[1])+60*parseInt(B[0])+parseInt(B[1]),j=String(Math.trunc(M/60))+":"+String(M%60),$=O.back_time.split(":"),H=60*parseInt($[0])+parseInt($[1])+60*parseInt(B[0])+parseInt(B[1]),P=String(Math.trunc(H/60))+":"+String(H%60);u.textContent=O.tickets,m.textContent=O.route,s.textContent=O.duration,y.textContent=O.transfer,h.textContent=O.totalPrice,O.time&&O.back_time?(p.textContent=O.date+" в "+O.time,_.textContent=O.date+" в "+j,f.textContent=O.date+" в "+O.back_time,v.textContent=O.date+" в "+P,r.style.display="block",l.style.display="block",d.style.display="block"):O.time&&!O.back_time?(p.textContent=O.date+" в "+O.time,_.textContent=O.date+" в "+j,r.style.display="block",l.style.display="none",d.style.display="none"):!O.time&&O.back_time&&(f.textContent=O.date+" в "+O.back_time,v.textContent=O.date+" в "+P,r.style.display="none",l.style.display="block",d.style.display="none"),i.style.display="flex"}))}(t)}(t)})).catch((function(e){console.log(e)}))},1400:function(e,t,n){"use strict";n(5316)}},n={};function a(e){var i=n[e];if(void 0!==i)return i.exports;var r=n[e]={id:e,loaded:!1,exports:{}};return t[e](r,r.exports,a),r.loaded=!0,r.exports}a.m=t,e=[],a.O=function(t,n,i,r){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],i=e[u][1],r=e[u][2];for(var c=!0,l=0;l<n.length;l++)(!1&r||o>=r)&&Object.keys(a.O).every((function(e){return a.O[e](n[l])}))?n.splice(l--,1):(c=!1,r<o&&(o=r));if(c){e.splice(u--,1);var d=i();void 0!==d&&(t=d)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,i,r]},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={851:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,r,o=n[0],c=n[1],l=n[2],d=0;if(o.some((function(t){return 0!==e[t]}))){for(i in c)a.o(c,i)&&(a.m[i]=c[i]);if(l)var u=l(a)}for(t&&t(n);d<o.length;d++)r=o[d],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}(),a.O(void 0,[866],(function(){return a(6005)})),a.O(void 0,[866],(function(){return a(7216)}));var i=a.O(void 0,[866],(function(){return a(1400)}));i=a.O(i)}();