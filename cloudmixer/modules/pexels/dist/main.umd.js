!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).pexels={})}(this,function(e){var t={photo:"https://api.pexels.com/v1/",video:"https://api.pexels.com/videos/",collections:"https://api.pexels.com/v1/collections/"};function n(e,n){var r={method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","User-Agent":"Pexels/JavaScript",Authorization:e}},o=t[n];return function(e,t){return fetch(""+o+e+"?"+function(e){return Object.keys(e).map(function(t){return t+"="+e[t]}).join("&")}(t||{}),r).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.json()})}}function r(e){var t=n(e,"collections");return{all:function(e){return void 0===e&&(e={}),t("",e)},media:function(e){var n=e.id,r=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(o[n]=e[n]);return o}(e,["id"]);return t(""+n,r)},featured:function(e){return void 0===e&&(e={}),t("featured",e)}}}function o(e){return!(!e||!e.photos)}var i={__proto__:null,isPhotos:o,isVideos:function(e){return!(!e||!e.videos)},isError:function(e){return!!e.error}};function u(e){var t=n(e,"photo");return{search:function(e){return t("/search",e)},curated:function(e){return void 0===e&&(e={}),t("/curated",e)},show:function(e){return t("/photos/"+e.id)},random:function(){try{var e=Math.floor(1e3*Math.random());return Promise.resolve(this.curated({page:e,per_page:1})).then(function(e){return o(e)?e.photos[0]:e})}catch(e){return Promise.reject(e)}}}}function c(e){var t=n(e,"video");return{search:function(e){return t("/search",e)},popular:function(e){return void 0===e&&(e={}),t("/popular",e)},show:function(e){return t("/videos/"+e.id)}}}require("isomorphic-fetch"),e.createClient=function(e){if(!e||"string"!=typeof e)throw new TypeError("An ApiKey must be provided when initiating the Pexel's client.");return{typeCheckers:i,photos:u(e),videos:c(e),collections:r(e)}}});
//# sourceMappingURL=main.umd.js.map