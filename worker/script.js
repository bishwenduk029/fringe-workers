!function(e){var n={};function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(i,r,function(n){return e[n]}.bind(null,r));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(e,n,t){var i={"./space/index.graphql":1};function r(e){var n=a(e);return t(n)}function a(e){if(!t.o(i,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return i[e]}r.keys=function(){return Object.keys(i)},r.resolve=a,e.exports=r,r.id=0},function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"launchesPast"},arguments:[{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"4"}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"mission_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"launch_date_local"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"launch_site"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"site_name_long"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:157}};t.loc.source={body:"query {\n  launchesPast(limit: 4) {\n    __typename\n    mission_name\n    launch_date_local\n    launch_site {\n      __typename\n      site_name_long\n    }\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var i={};t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var i=n.type;"NamedType"===i.kind&&t.add(i.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),i[e.name.value]=n}})),e.exports=t},function(e,n,t){"use strict";function i(e,n){try{const t=function(e,n){const t=n.map(e=>{let n=e;return n=n.replace("/","\\/").replace(/^\./,"").replace(/\.(graphql)$/,""),{graphql:e,graphqlPath:e.replace(/^\./,"").replace(/\.(graphql)$/,""),test:new RegExp("^"+n+"$","")}});if(!t.length)return null;let i=t.find(n=>e==="/graphql"+n.graphqlPath);return i||(t.sort(e=>e.graphql.includes("schema")?-1:1),i=t.find(n=>n.test.test(e))),i||(i=t.find(n=>n.test.test(e+"/schema"))),i||(console.log("I am wrong"),null)}(e,n.keys());if(t){return n(t.graphql)}}catch(e){console.log(e)}return null}t.r(n);Error;async function r(e,n,t){const r=new URL(e.request.url),{pathname:a,searchParams:o}=r,s=Object.fromEntries(o.entries());try{const e=function(e){return"/"===e||/graphql$/.test(e)?"/index":e}(a);if(/^\/graphql\/.+/.test(e)){const t=i(e,n),r=await async function(e,n={}){try{const t=await fetch("https://api.spacex.land/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:e.loc.source.body,variables:n})}),i=await t.json();return console.log(JSON.stringify(i)),JSON.stringify(i.data)}catch(e){logger.error(e)}}(t,s);return r instanceof Object&&!(r instanceof Response)?new Response(JSON.stringify(r),{headers:{"content-type":"application/json"}}):r instanceof Response?r:new Response(r)}}catch(e){console.log(e)}}addEventListener("fetch",async e=>{try{e.respondWith(async function(e,n,t){return await r(e,n)}(e,t(0)))}catch(n){return e.respondWith(new Response(n,{status:502}))}})}]);