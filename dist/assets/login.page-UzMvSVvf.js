import{e as g,b as f,r as c,bN as h,aG as y,bO as b,o as e,n as u,aH as w,B as x,bP as M}from"./index-C5pmOVQu.js";import{F as m}from"./index-CWB-lWAu.js";import{I as d}from"./index-NgJme-oF.js";import{u as z,M as I}from"./message-Cp_yF0ML.js";function v(...s){const n=g(t=>{const o=t.apiMessage.box;return s.map(r=>o[r])}),a=f(),i=c.useMemo(()=>s,[...s]);return c.useEffect(()=>()=>{a(h(i))},[a,i]),c.useMemo(()=>{const t=[],o=[];for(const{type:r,messages:l}of n.filter(Boolean))r==="error"?t.push(...l):o.push(...l);return{errors:t,successes:o}},[...n])}function E(){const{formatMessage:s}=y(),{login:n}=b(),[a]=z(["login-loading",!1]),{errors:i}=v("login-message"),t=o=>{const{username:r,password:l}=o;n(r,l)};return e(c.Fragment,{children:e("div",{css:C,children:u("div",{css:S,children:[e(w,{type:"logo",width:90,height:90}),e("h3",{css:L,children:s({id:"title.form.login"})}),u(m,{name:"login",layout:"vertical",initialValues:{remember:!0},onFinish:t,autoComplete:"off",css:F,children:[e(m.Item,{label:e("span",{css:p,children:s({id:"form.auth.username"})}),name:"username",rules:[{required:!0,message:s({id:"form.input.require.username"})}],children:e(d,{size:"large",autoComplete:"email"})}),e(m.Item,{label:e("span",{css:p,children:s({id:"form.auth.password"})}),name:"password",rules:[{required:!0,message:s({id:"form.input.require.password"})}],children:e(d.Password,{size:"large",autoComplete:"current-password"})}),e(I,{type:"error",children:i[0]}),e(m.Item,{children:e(x,{loading:a,size:"large",css:k,type:"primary",htmlType:"submit",children:s({id:"title.form.login"})})}),e(M,{to:"/auth/forgot-password",css:P,children:s({id:"title.form.forgotPassword"})})]})]})})})}const C={name:"zl1inp",styles:"display:flex;justify-content:center"},S={name:"n18zge",styles:"display:flex;justify-content:center;align-items:center;flex-direction:column;border-radius:0.8rem;padding:2rem;box-shadow:0.04px 0.1px 6px #d9dadb;background:#fff"},p={name:"vu4egt",styles:"font-size:1.4rem;line-height:1.6rem;font-weight:500"},k={name:"552l5",styles:"margin-top:2rem;width:100%;background:#0070b8;&:hover{background:#0070b8!important;opacity:0.9;}"},F={name:"iow05i",styles:"margin-top:2rem;min-width:34rem"},L={name:"1o3lmxs",styles:"font-weight:500;font-size:2.6rem;line-height:2.8rem;margin-top:2rem"},P={name:"1yscxfe",styles:"width:100%;display:block;text-align:center;color:#0070b8;&:hover{color:#0070b8;opacity:0.85;}"};export{E as default};
//# sourceMappingURL=login.page-UzMvSVvf.js.map
