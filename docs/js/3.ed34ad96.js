(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{8488:function(e,t,o){var s={"./":["a6d8",3],"./ar":["13ef",9,0],"./ar.js":["13ef",9,0],"./bg":["a6b2",9,0],"./bg.js":["a6b2",9,0],"./ca":["8378",9,0],"./ca.js":["8378",9,0],"./cs":["5ddc",9,0],"./cs.js":["5ddc",9,0],"./da":["d3e4",9,0],"./da.js":["d3e4",9,0],"./de":["215a",9,0],"./de.js":["215a",9,0],"./el":["83bc",9,0],"./el.js":["83bc",9,0],"./en-gb":["17f5",9,0],"./en-gb.js":["17f5",9,0],"./en-us":["1f91",9],"./en-us.js":["1f91",9],"./eo":["b25b",9,0],"./eo.js":["b25b",9,0],"./es":["df1a",9,0],"./es.js":["df1a",9,0],"./fa-ir":["b67a",9,0],"./fa-ir.js":["b67a",9,0],"./fi":["10c0",9,0],"./fi.js":["10c0",9,0],"./fr":["34fe",9,0],"./fr.js":["34fe",9,0],"./gn":["3c87",9,0],"./gn.js":["3c87",9,0],"./he":["36eb",9,0],"./he.js":["36eb",9,0],"./hr":["007f",9,0],"./hr.js":["007f",9,0],"./hu":["a9af",9,0],"./hu.js":["a9af",9,0],"./id":["7e40",9,0],"./id.js":["7e40",9,0],"./index":["a6d8",3],"./index.json":["a6d8",3],"./it":["a745",9,0],"./it.js":["a745",9,0],"./ja":["5521",9,0],"./ja.js":["5521",9,0],"./km":["726e",9,0],"./km.js":["726e",9,0],"./ko-kr":["187f",9,0],"./ko-kr.js":["187f",9,0],"./lu":["1ee2",9,0],"./lu.js":["1ee2",9,0],"./lv":["004e",9,0],"./lv.js":["004e",9,0],"./ml":["c454",9,0],"./ml.js":["c454",9,0],"./ms":["bf26",9,0],"./ms.js":["bf26",9,0],"./nb-no":["dacc",9,0],"./nb-no.js":["dacc",9,0],"./nl":["8cf4",9,0],"./nl.js":["8cf4",9,0],"./pl":["700f",9,0],"./pl.js":["700f",9,0],"./pt":["37ed",9,0],"./pt-br":["f476",9,0],"./pt-br.js":["f476",9,0],"./pt.js":["37ed",9,0],"./ro":["fecf",9,0],"./ro.js":["fecf",9,0],"./ru":["14c0",9,0],"./ru.js":["14c0",9,0],"./sk":["15e6",9,0],"./sk.js":["15e6",9,0],"./sl":["5e5a",9,0],"./sl.js":["5e5a",9,0],"./sr":["78dc",9,0],"./sr.js":["78dc",9,0],"./sv":["7107",9,0],"./sv.js":["7107",9,0],"./ta":["3572",9,0],"./ta.js":["3572",9,0],"./th":["c9b0",9,0],"./th.js":["c9b0",9,0],"./tr":["c1a5",9,0],"./tr.js":["c1a5",9,0],"./uk":["6464",9,0],"./uk.js":["6464",9,0],"./vi":["1fb0",9,0],"./vi.js":["1fb0",9,0],"./zh-hans":["bf69",9,0],"./zh-hans.js":["bf69",9,0],"./zh-hant":["db10",9,0],"./zh-hant.js":["db10",9,0]};function l(e){if(!o.o(s,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=s[e],l=t[0];return Promise.all(t.slice(2).map(o.e)).then((function(){return o.t(l,t[1])}))}l.keys=function(){return Object.keys(s)},l.id="8488",e.exports=l},"8b24":function(e,t,o){"use strict";o.r(t);var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-page",{attrs:{padding:""}},[o("q-expansion-item",e._b({},"q-expansion-item",e.expansionProps,!1),[o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("q-item-label",{attrs:{header:""}},[e._v("Feature")]),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("No dense counter")])],1),o("q-item-section",{attrs:{side:""}},[o("q-checkbox",{attrs:{color:e.config.color},model:{value:e.config.noDenseCounter,callback:function(t){e.$set(e.config,"noDenseCounter",t)},expression:"config.noDenseCounter"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("No clear")])],1),o("q-item-section",{attrs:{side:""}},[o("q-checkbox",{attrs:{color:e.config.color},model:{value:e.config.noClear,callback:function(t){e.$set(e.config,"noClear",t)},expression:"config.noClear"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("No select all")])],1),o("q-item-section",{attrs:{side:""}},[o("q-checkbox",{attrs:{color:e.config.color},model:{value:e.config.noSelectAll,callback:function(t){e.$set(e.config,"noSelectAll",t)},expression:"config.noSelectAll"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("No reverse")])],1),o("q-item-section",{attrs:{side:""}},[o("q-checkbox",{attrs:{color:e.config.color},model:{value:e.config.noReverse,callback:function(t){e.$set(e.config,"noReverse",t)},expression:"config.noReverse"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("No only")])],1),o("q-item-section",{attrs:{side:""}},[o("q-checkbox",{attrs:{color:e.config.color},model:{value:e.config.noOnly,callback:function(t){e.$set(e.config,"noOnly",t)},expression:"config.noOnly"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("No client search")])],1),o("q-item-section",{attrs:{side:""}},[o("q-checkbox",{attrs:{color:e.config.color},model:{value:e.config.noClientSearch,callback:function(t){e.$set(e.config,"noClientSearch",t)},expression:"config.noClientSearch"}})],1)],1),o("q-item",{attrs:{dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Custom request search field")])],1),o("q-item-section",{attrs:{side:""}},[o("q-input",{attrs:{dense:"","input-class":"text-right",color:e.config.color},model:{value:e.filterParam,callback:function(t){e.filterParam=t},expression:"filterParam"}})],1)],1)],1),o("q-separator",{attrs:{vertical:"",spaced:""}}),o("div",{staticClass:"col"},[o("q-item-label",{attrs:{header:""}},[e._v("Style")]),o("q-item",{attrs:{dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Color")])],1),o("q-item-section",[o("q-select",{attrs:{options:e.colors,color:e.config.color,filled:"",dense:"","options-dense":""},model:{value:e.config.color,callback:function(t){e.$set(e.config,"color",t)},expression:"config.color"}})],1)],1),o("q-item",{attrs:{dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Hightlight Color")])],1),o("q-item-section",[o("q-select",{attrs:{options:e.colors,color:e.config.color,filled:"",dense:"","options-dense":""},model:{value:e.config.highlightColor,callback:function(t){e.$set(e.config,"highlightColor",t)},expression:"config.highlightColor"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Dense")])],1),o("q-item-section",{attrs:{side:""}},[o("q-checkbox",{attrs:{color:e.config.color},model:{value:e.config.dense,callback:function(t){e.$set(e.config,"dense",t)},expression:"config.dense"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Filled")])],1),o("q-item-section",{attrs:{side:""}},[o("q-radio",{attrs:{val:"filled",color:e.config.color},model:{value:e.style,callback:function(t){e.style=t},expression:"style"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Borderless")])],1),o("q-item-section",{attrs:{side:""}},[o("q-radio",{attrs:{val:"borderless",color:e.config.color},model:{value:e.style,callback:function(t){e.style=t},expression:"style"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Standout")])],1),o("q-item-section",{attrs:{side:""}},[o("q-radio",{attrs:{val:"standout",color:e.config.color},model:{value:e.style,callback:function(t){e.style=t},expression:"style"}})],1)],1),o("q-item",{attrs:{tag:"label",dense:""}},[o("q-item-section",[o("q-item-label",[e._v("Outlined")])],1),o("q-item-section",{attrs:{side:""}},[o("q-radio",{attrs:{val:"outlined",color:e.config.color},model:{value:e.style,callback:function(t){e.style=t},expression:"style"}})],1)],1)],1)],1)]),o("q-list",{staticClass:"rounded-borders q-mb-md",attrs:{dense:"",padding:"",bordered:""}},[o("q-item-label",{attrs:{header:""}},[e._v("Examples")]),e._l(e.model,(function(t,s){return o("q-item",{key:s},[o("q-item-section",[o("qs-select",e._b({on:{item:e.notify},scopedSlots:e._u([{key:"default",fn:function(){return[o("q-tooltip",{attrs:{anchor:"center left",self:"center right","transition-show":"jump-left","transition-hide":"jump-right"}},[o("q-markdown",[e._v("\n```js\n"+e._s(e.props(s))+"\n```\n                ")])],1)]},proxy:!0}],null,!0),model:{value:e.model[s],callback:function(t){e.$set(e.model,s,t)},expression:"model[key]"}},"qs-select",Object.assign({},e.props(s),e.options(s)),!1))],1),o("q-item-section",[o("q-badge",{attrs:{"multi-line":"",outline:e.$q.dark.isActive,color:e.config.color}},[e._v(e._s(e.model[s]))])],1)],1)}))],2)],1)},l=[],a=o("a6d8"),i={name:"Index",data(){return{model:{single_array:null,single_objects:null,multiple_array:null,multiple_objects:null,lazy_single_array:null,lazy_single_objects:null,lazy_multiple_array:null,lazy_multiple_objects:null},array:[],objects:[],config:{dense:!0,noDenseCounter:!1,noSelectAll:!1,noClientSearch:!1,noReverse:!1,noOnly:!1,noClear:!1,color:"blue"},filterParam:"filter",style:"filled",locale:this.$q.lang.isoName,langOptions:[],colors:["blue","green","purple","orange","red","brown","blue-grey","teal","amber","yellow","cyan","black","grey"]}},async created(){this.langOptions=a.map(e=>({label:e.nativeName,value:e.isoName})),this.array=(await this.$axios.get("array.json")).data,this.objects=(await this.$axios.get("objects.json")).data},computed:{props(){return e=>({[this.style]:!0,multiple:e.includes("multiple"),label:e.replaceAll("_"," "),...this.config})},options(){return e=>e.includes("lazy")?{url:{route:e.includes("array")?"array.json":"objects.json",filterParam:this.filterParam,instance:this.$axios.get}}:{options:e.includes("array")?this.array:this.objects}},expansionProps(){return{icon:"mdi-cog",class:"overflow-hidden q-mb-md"+(this.$q.dark.isActive?"":" shadow-1"),style:"border-radius: 30px",label:"Configuration",headerClass:this.$q.dark.isActive?"bg-grey-9":`bg-${this.config.color} text-white`,expandIconClass:"text-white"}}},watch:{locale(e){o("8488")("./"+e).then(e=>{this.$q.lang.set(e.default)})}},methods:{notify(e){this.$q.notify({message:JSON.stringify(e),caption:"event emitted: @item"})}}},n=i,c=o("2877"),r=o("9989"),d=o("3b73"),f=o("0170"),m=o("66e5"),b=o("4074"),u=o("8f8e"),g=o("27f9"),q=o("eb85"),p=o("ddd8"),h=o("3786"),j=o("1c1c"),v=o("05c0"),y=o("58a8"),k=o("eebe"),x=o.n(k),_=Object(c["a"])(n,s,l,!1,null,null,null);t["default"]=_.exports;x()(_,"components",{QPage:r["a"],QExpansionItem:d["a"],QItemLabel:f["a"],QItem:m["a"],QItemSection:b["a"],QCheckbox:u["a"],QInput:g["a"],QSeparator:q["a"],QSelect:p["a"],QRadio:h["a"],QList:j["a"],QTooltip:v["a"],QBadge:y["a"]})}}]);