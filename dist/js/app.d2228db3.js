(function(r){function n(n){for(var e,i,u=n[0],c=n[1],l=n[2],d=0,s=[];d<u.length;d++)i=u[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&s.push(a[i][0]),a[i]=0;for(e in c)Object.prototype.hasOwnProperty.call(c,e)&&(r[e]=c[e]);f&&f(n);while(s.length)s.shift()();return o.push.apply(o,l||[]),t()}function t(){for(var r,n=0;n<o.length;n++){for(var t=o[n],e=!0,u=1;u<t.length;u++){var c=t[u];0!==a[c]&&(e=!1)}e&&(o.splice(n--,1),r=i(i.s=t[0]))}return r}var e={},a={app:0},o=[];function i(n){if(e[n])return e[n].exports;var t=e[n]={i:n,l:!1,exports:{}};return r[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=r,i.c=e,i.d=function(r,n,t){i.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:t})},i.r=function(r){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},i.t=function(r,n){if(1&n&&(r=i(r)),8&n)return r;if(4&n&&"object"===typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&n&&"string"!=typeof r)for(var e in r)i.d(t,e,function(n){return r[n]}.bind(null,e));return t},i.n=function(r){var n=r&&r.__esModule?function(){return r["default"]}:function(){return r};return i.d(n,"a",n),n},i.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=n,u=u.slice();for(var l=0;l<u.length;l++)n(u[l]);var f=c;o.push([0,"chunk-vendors"]),t()})({0:function(r,n,t){r.exports=t("56d7")},"034f":function(r,n,t){"use strict";var e=t("64a9"),a=t.n(e);a.a},"56d7":function(r,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var e=t("2b0e"),a=function(){var r=this,n=r.$createElement;r._self._c;return r._m(0)},o=[function(){var r=this,n=r.$createElement,t=r._self._c||n;return t("div",{attrs:{id:"game"}},[t("div",{staticClass:"grid-container",attrs:{id:"board1"}}),t("p",[r._v("P1 P2")]),t("div",{staticClass:"grid-container",attrs:{id:"board2"}})])}],i=t("dfab");function u(){for(var r=5,n=[],t=[],e=0;e<3;e++)n.push(i["Ship"](r)),t.push(i["Ship"](r));var a=i["Gameboard"](n,[10,10]),o=i["Gameboard"](t,[10,10]),u=i["Player"](a),c=i["Player"](o),l=u.Gameboard.shipsAllSunk();while(0==l)u.Gameboard.renderBoard("board1"),c.Gameboard.renderBoard("board2"),l=!0}u();var c={name:"app"},l=c,f=(t("034f"),t("2877")),d=Object(f["a"])(l,a,o,!1,null,null,null),s=d.exports;e["a"].config.productionTip=!1,new e["a"]({render:function(r){return r(s)}}).$mount("#app")},"64a9":function(r,n,t){},dfab:function(r,n,t){"use strict";t.r(n),t.d(n,"Ship",(function(){return e})),t.d(n,"Gameboard",(function(){return a})),t.d(n,"Player",(function(){return o}));t("6b54"),t("6c7b");var e=function(r){var n=new Array(r).fill(null),t=function(r){return n[r]="X",this},e=function(){var r=!0;for(var t in n)"X"!==n[t]&&(r=!1);return r};return{positions:n,hit:t,isSunk:e}},a=function(r,n){var t=new Array(n[0]).fill(null);for(var e in t)t[e]=new Array(n[1]).fill(null);var a=function(r,t,e){return t<n[0]&&e+r<n[1]},o=function(r,n,e){if(n=parseInt(n),e=parseInt(e),a(r.positions.length,n,e)){t[n][e]=r;for(var o=1;o<r.positions.length;o++)t[n][e+o]=[n,e]}};for(var i in r)o(r[i],i,i);var u=function(r,n){if(null==t[r][n])return[r,n];if(2==t[r][n].length){var e=t[r][n][0],a=t[r][n][1];return t[e][a].hit(n-a)}return t[r][n].hit(0)},c=function(){for(var n in r)if(0==r[n].isSunk())return!1;return!0},l=function(r){var n,e=document.getElementById(r);for(var a in t)for(var o in t[a])n=document.createElement("div"),n.className="grid-item",n.addEventListener("click",(function(){n.innerHTML="X"})),null!=t[a][o]?n.innerHTML=a.toString()+o.toString():n.innerHTML="_",e.appendChild(n)};return{rows:t,receiveAttack:u,shipsAllSunk:c,renderBoard:l}},o=function(r){var n=function(r,n,t){return r.Gameboard.receiveAttack(n,t)},t=function(r){var n=Math.floor(Math.random()*r.Gameboard.rows.length),t=r.Gameboard.receiveAttack(n,Math.floor(Math.random()*r.Gameboard.rows[n].length));return t};return{Gameboard:r,userAttack:n,computerAttack:t}}}});
//# sourceMappingURL=app.d2228db3.js.map