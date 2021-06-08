(this["webpackJsonpdynamic-form-example"]=this["webpackJsonpdynamic-form-example"]||[]).push([[0],{15:function(e,a,t){},16:function(e,a,t){"use strict";t.r(a);t(8);var n=t(0),c=t.n(n),l=t(6),r=t.n(l),o=t(1),m=t(4),i=t(5),s="TextyFormType.text",u="TextyFormType.number",d=function(e){var a=e.schema,t=e.onChange,n=void 0===t?function(){}:t;return c.a.createElement(f,{type:s,schema:a,onChange:n})},b=function(e){var a=e.schema,t=e.onChange;return c.a.createElement(f,{type:u,schema:a,onChange:t})},f=function(e){var a=e.type,t=e.schema,l=e.onChange,r=Object(n.useState)(t.defaultValue),m=Object(o.a)(r,2),i=m[0],u=m[1];return Object(n.useEffect)((function(){void 0!==i&&l(i)}),[i]),c.a.createElement("div",{className:"input-group flex-nowrap"},c.a.createElement("span",{className:"input-group-text"}," ",t.label," "),c.a.createElement("input",{type:a===s?"text":"number",className:"form-control",placeholder:t.placeholder,value:i,onChange:function(e){u(e.target.value)},"aria-label":"Username","aria-describedby":"addon-wrapping"}))},p=0,h=function(e){var a=e.schema,t=e.onChange,l=void 0===t?function(){}:t,r=Object(n.useState)([]),s=Object(o.a)(r,2),u=s[0],d=s[1],b=Object(n.useState)({}),f=Object(o.a)(b,2),h=f[0],E=f[1],v=function(){var e="".concat(a.label,"_").concat(p++);d([].concat(Object(i.a)(u),[c.a.createElement(y,{key:e,schema:a.schema,onChange:function(a){g(e,a)},onDelete:function(){var a;a=e,d((function(e){return e.filter((function(e){return e.key!==a}))})),g(e,null)}})]))},g=function(e,a){E((function(t){return a?t[e]=a:delete t[e],Object(m.a)({},t)}))};return Object(n.useEffect)((function(){l(Object(i.a)(Object.values(h)))}),[h]),c.a.createElement("div",{className:"card border-secondary"},c.a.createElement("div",{className:"card-header"},a.label),c.a.createElement("div",{className:"card-body p-1"},u,c.a.createElement("div",{className:"d-grid"},c.a.createElement("button",{className:"btn btn-outline-secondary mx-1 w-auto",onClick:function(){v()}},"Add"))))},E=function(e){var a=e.schema,t=e.onChange,l=void 0===t?function(){}:t,r=Object(n.useState)({}),m=Object(o.a)(r,2),i=m[0],s=m[1];return Object(n.useEffect)((function(){l(i)}),[i]),c.a.createElement("div",{className:"card border-info"},c.a.createElement("div",{className:"card-header"},a.label),c.a.createElement("div",{className:"card-body p-1 d-grid gap-1"},c.a.createElement(y,{schema:a.schema,onChange:function(e){s(e)}})))},y=function(e){var a=e.schema,t=e.onChange,l=void 0===t?function(){}:t,r=e.onDelete,i=Object(n.useState)({}),s=Object(o.a)(i,2),u=s[0],f=s[1],p=function(e,a){f((function(t){return t[e]=a,Object(m.a)({},t)}))};Object(n.useEffect)((function(){"function"===typeof l&&l(u)}),[u]);for(var y,v=[],N=function(){var e=Object(o.a)(j[O],2),a=e[0],t=e[1];t.type===g.text?v.push(c.a.createElement(d,{key:a,schema:t,onChange:function(e){p(a,e)}})):t.type===g.number?v.push(c.a.createElement(b,{key:a,schema:t,onChange:function(e){p(a,e)}})):t.type===g.nested?v.push(c.a.createElement(E,{key:a,schema:t,onChange:function(e){p(a,e)}})):t.type===g.repeatable&&v.push(c.a.createElement(h,{key:a,schema:t,onChange:function(e){p(a,e)}}))},O=0,j=Object.entries(a);O<j.length;O++)N();return r&&(y=c.a.createElement("div",{className:""},c.a.createElement("button",{className:"btn btn-outline-danger w-20",onClick:function(){r()}},"Delete"))),c.a.createElement("div",{className:"card border-light"},c.a.createElement("div",{className:"card-body p-1 d-grid gap-1"},v,y))},v=function(e){var a,t=e.schema,l=void 0===t?{}:t,r=e.onChange,i=void 0===r?function(){}:r,s=e.onSubmit,u=Object(n.useState)({}),d=Object(o.a)(u,2),b=d[0],f=d[1];return Object(n.useEffect)((function(){i(b)}),[b]),s&&(a=c.a.createElement("button",{className:"btn btn-success mx-1 w-auto ",onClick:function(){"function"===typeof s&&s(Object(m.a)({},b))}},"Submit")),c.a.createElement("div",{className:"d-grid gap-1"},c.a.createElement(y,{schema:l,onChange:function(e){!function(e){f(e)}(e)}}),a)},g={text:"DynamicFormType.Text",number:"DynamicFormType.Number",nested:"DynamicFormType.Nested",repeatable:"DynamicFormType.Repeatable"},N=(t(15),function(){var e=Object(n.useState)({}),a=Object(o.a)(e,2),t=a[0],l=a[1],r={presonalName:{label:"Name",type:g.text,placeholder:"Full name"},personalEmail:{label:"Email",type:g.text,placeholder:"Email address"},age:{label:"Age",type:g.number,placeholder:"Age"}},m={skillName:{label:"Skill",type:g.text,placeholder:"Skill"},skillLevel:{label:"Skill lavel",type:g.number,defaultValue:0}},i={personal:{label:"Personal information",type:g.nested,schema:r},skills:{label:"Skills",type:g.repeatable,schema:m}};return c.a.createElement("div",{className:"card border-light"},c.a.createElement("div",{className:"row card-body"},c.a.createElement("div",{className:"col p-1"},c.a.createElement("div",{className:"rounded text-white-50 bg-dark p-2"},c.a.createElement("pre",null,c.a.createElement("code",null,"schema = ",JSON.stringify(i,null,2))))),c.a.createElement("div",{className:"col"},c.a.createElement(v,{schema:i,onChange:function(e){return l(e)}})),c.a.createElement("div",{className:"col p-1"},c.a.createElement("pre",null,c.a.createElement("code",{className:"fw-bold"},"onChange = ",JSON.stringify(t,null,2))))))}),O=function(){return c.a.createElement("div",{className:"container my-4"},c.a.createElement(N,null))};r.a.render(c.a.createElement(O,null),document.getElementById("root"))},7:function(e,a,t){e.exports=t(16)},8:function(e,a,t){}},[[7,1,2]]]);
//# sourceMappingURL=main.e03c28ac.chunk.js.map