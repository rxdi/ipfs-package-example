parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({4:[function(require,module,exports) {
"use strict";var e=this&&this.__decorate||function(e,t,r,o){var c,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(s=(i<3?c(s):i>3?c(t,r,s):c(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@rxdi/core");let r=class{omg(){return"it works!"}};r=e([t.Service()],r),exports.TestService=r;
},{}],5:[function(require,module,exports) {
"use strict";function e(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0}),e(require("./test.service"));
},{"./test.service":4}],1:[function(require,module,exports) {
"use strict";var e=this&&this.__decorate||function(e,r,t,o){var s,c=arguments.length,i=c<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,r,t,o);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(i=(c<3?s(i):c>3?s(r,t,i):s(r,t))||i);return c>3&&i&&Object.defineProperty(r,t,i),i};function r(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@rxdi/core"),o=require("./services/test.service");let s=class{};s=e([t.Module({services:[o.TestService]})],s),exports.TestModule=s,r(require("./services/index"));
},{"./services/test.service":4,"./services/index":5}]},{},[1], null)
//# sourceMappingURL=/index.map