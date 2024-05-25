import{r as l,K as Ye,_ as Ge,V as Ke,X as Qe,cR as Ve,Y as Te,M as le,W as Ue,cS as be,b2 as ye,ap as Ie,a4 as D,an as Ze,a7 as Q,aq as Je,cT as et,at as tt,ai as Ce,b5 as nt,cU as rt,cV as ot,bY as lt,cW as at,cX as _e,cY as U,cZ as it,cg as st,b4 as ue,a$ as Ee,b0 as ct,c3 as ut,q as Le,av as dt,ah as mt,aw as ft,ak as gt,as as pt,cj as ht,aZ as bt,R as yt,aj as Ct,c_ as We,c$ as vt,d0 as xt,bQ as $t,d1 as St,cb as wt,ar as It,cm as Et,d2 as Ft,d3 as Ot}from"./index-D7kYuqtd.js";import{R as Mt,a as Nt}from"./ExclamationCircleFilled-Bz7bDzj1.js";var Pt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"},jt=function(t,n){return l.createElement(Ye,Ge({},t,{ref:n,icon:Pt}))},Rt=l.forwardRef(jt);const Vt=e=>{const{componentCls:t}=e,n=`${t}-show-help`,r=`${t}-show-help-item`;return{[n]:{transition:`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[r]:{overflow:"hidden",transition:`height ${e.motionDurationSlow} ${e.motionEaseInOut},
                     opacity ${e.motionDurationSlow} ${e.motionEaseInOut},
                     transform ${e.motionDurationSlow} ${e.motionEaseInOut} !important`,[`&${r}-appear, &${r}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${r}-leave-active`]:{transform:"translateY(-5px)"}}}}},Tt=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${le(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${le(e.controlOutlineWidth)} ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Fe=(e,t)=>{const{formItemCls:n}=e;return{[n]:{[`${n}-label > label`]:{height:t},[`${n}-control-input`]:{minHeight:t}}}},_t=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},Te(e)),Tt(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},Fe(e,e.controlHeightSM)),"&-large":Object.assign({},Fe(e,e.controlHeightLG))})}},Lt=e=>{const{formItemCls:t,iconCls:n,componentCls:r,rootPrefixCls:o,labelRequiredMarkColor:a,labelColor:i,labelFontSize:c,labelHeight:u,labelColonMarginInlineStart:d,labelColonMarginInlineEnd:y,itemMarginBottom:p}=e;return{[t]:Object.assign(Object.assign({},Te(e)),{marginBottom:p,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden.${o}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:e.lineHeight,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:u,color:i,fontSize:c,[`> ${n}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:a,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:d,marginInlineEnd:y},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{"--ant-display":"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${o}-col-'"]):not([class*="' ${o}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:Ve,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},Wt=e=>{const{componentCls:t,formItemCls:n}=e;return{[`${t}-horizontal`]:{[`${n}-label`]:{flexGrow:0},[`${n}-control`]:{flex:"1 1 0",minWidth:0},[`${n}-label[class$='-24'], ${n}-label[class*='-24 ']`]:{[`& + ${n}-control`]:{minWidth:"unset"}}}}},Ht=e=>{const{componentCls:t,formItemCls:n,inlineItemMarginBottom:r}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[n]:{flex:"none",marginInlineEnd:e.margin,marginBottom:r,"&-row":{flexWrap:"nowrap"},[`> ${n}-label,
        > ${n}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${n}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${n}-has-feedback`]:{display:"inline-block"}}}}},oe=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),qt=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${n} ${n}-label`]:oe(e),[`${t}:not(${t}-inline)`]:{[n]:{flexWrap:"wrap",[`${n}-label, ${n}-control`]:{[`&:not([class*=" ${r}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},zt=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${t}-vertical`]:{[n]:{"&-row":{flexDirection:"column"},"&-label > label":{height:"auto"},[`${t}-item-control`]:{width:"100%"}}},[`${t}-vertical ${n}-label,
      .${r}-col-24${n}-label,
      .${r}-col-xl-24${n}-label`]:oe(e),[`@media (max-width: ${le(e.screenXSMax)})`]:[qt(e),{[t]:{[`.${r}-col-xs-24${n}-label`]:oe(e)}}],[`@media (max-width: ${le(e.screenSMMax)})`]:{[t]:{[`.${r}-col-sm-24${n}-label`]:oe(e)}},[`@media (max-width: ${le(e.screenMDMax)})`]:{[t]:{[`.${r}-col-md-24${n}-label`]:oe(e)}},[`@media (max-width: ${le(e.screenLGMax)})`]:{[t]:{[`.${r}-col-lg-24${n}-label`]:oe(e)}}}},Dt=e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0,inlineItemMarginBottom:0}),He=(e,t)=>Ue(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t}),ve=Ke("Form",(e,t)=>{let{rootPrefixCls:n}=t;const r=He(e,n);return[_t(r),Lt(r),Vt(r),Wt(r),Ht(r),zt(r),Qe(r),Ve]},Dt,{order:-1e3});function de(e){const[t,n]=l.useState(e);return l.useEffect(()=>{const r=setTimeout(()=>{n(e)},e.length?0:10);return()=>{clearTimeout(r)}},[e]),t}const Oe=[];function pe(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${r}`,error:e,errorStatus:n}}const qe=e=>{let{help:t,helpStatus:n,errors:r=Oe,warnings:o=Oe,className:a,fieldId:i,onVisibleChanged:c}=e;const{prefixCls:u}=l.useContext(be),d=`${u}-item-explain`,y=ye(u),[p,P,S]=ve(u,y),C=l.useMemo(()=>Ie(u),[u]),w=de(r),M=de(o),$=l.useMemo(()=>t!=null?[pe(t,"help",n)]:[].concat(D(w.map((f,g)=>pe(f,"error","error",g))),D(M.map((f,g)=>pe(f,"warning","warning",g)))),[t,n,w,M]),s={};return i&&(s.id=`${i}_help`),p(l.createElement(Ze,{motionDeadline:C.motionDeadline,motionName:`${u}-show-help`,visible:!!$.length,onVisibleChanged:c},f=>{const{className:g,style:b}=f;return l.createElement("div",Object.assign({},s,{className:Q(d,g,S,y,a,P),style:b,role:"alert"}),l.createElement(Je,Object.assign({keys:$},Ie(u),{motionName:`${u}-show-help-item`,component:!1}),v=>{const{key:j,error:N,errorStatus:H,className:_,style:q}=v;return l.createElement("div",{key:j,className:Q(_,{[`${d}-${H}`]:H}),style:q},N)}))}))},Me=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Ne=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",he=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const n=getComputedStyle(e,null);return Ne(n.overflowY,t)||Ne(n.overflowX,t)||(r=>{const o=(a=>{if(!a.ownerDocument||!a.ownerDocument.defaultView)return null;try{return a.ownerDocument.defaultView.frameElement}catch{return null}})(r);return!!o&&(o.clientHeight<r.scrollHeight||o.clientWidth<r.scrollWidth)})(e)}return!1},ce=(e,t,n,r,o,a,i,c)=>a<e&&i>t||a>e&&i<t?0:a<=e&&c<=n||i>=t&&c>=n?a-e-r:i>t&&c<n||a<e&&c>n?i-t+o:0,At=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Pe=(e,t)=>{var n,r,o,a;if(typeof document>"u")return[];const{scrollMode:i,block:c,inline:u,boundary:d,skipOverflowHiddenElements:y}=t,p=typeof d=="function"?d:R=>R!==d;if(!Me(e))throw new TypeError("Invalid target");const P=document.scrollingElement||document.documentElement,S=[];let C=e;for(;Me(C)&&p(C);){if(C=At(C),C===P){S.push(C);break}C!=null&&C===document.body&&he(C)&&!he(document.documentElement)||C!=null&&he(C,y)&&S.push(C)}const w=(r=(n=window.visualViewport)==null?void 0:n.width)!=null?r:innerWidth,M=(a=(o=window.visualViewport)==null?void 0:o.height)!=null?a:innerHeight,{scrollX:$,scrollY:s}=window,{height:f,width:g,top:b,right:v,bottom:j,left:N}=e.getBoundingClientRect(),{top:H,right:_,bottom:q,left:A}=(R=>{const m=window.getComputedStyle(R);return{top:parseFloat(m.scrollMarginTop)||0,right:parseFloat(m.scrollMarginRight)||0,bottom:parseFloat(m.scrollMarginBottom)||0,left:parseFloat(m.scrollMarginLeft)||0}})(e);let F=c==="start"||c==="nearest"?b-H:c==="end"?j+q:b+f/2-H+q,x=u==="center"?N+g/2-A+_:u==="end"?v+_:N-A;const V=[];for(let R=0;R<S.length;R++){const m=S[R],{height:B,width:Z,top:J,right:L,bottom:X,left:ee}=m.getBoundingClientRect();if(i==="if-needed"&&b>=0&&N>=0&&j<=M&&v<=w&&b>=J&&j<=X&&N>=ee&&v<=L)return V;const k=getComputedStyle(m),z=parseInt(k.borderLeftWidth,10),h=parseInt(k.borderTopWidth,10),I=parseInt(k.borderRightWidth,10),E=parseInt(k.borderBottomWidth,10);let T=0,W=0;const Y="offsetWidth"in m?m.offsetWidth-m.clientWidth-z-I:0,G="offsetHeight"in m?m.offsetHeight-m.clientHeight-h-E:0,K="offsetWidth"in m?m.offsetWidth===0?0:Z/m.offsetWidth:0,O="offsetHeight"in m?m.offsetHeight===0?0:B/m.offsetHeight:0;if(P===m)T=c==="start"?F:c==="end"?F-M:c==="nearest"?ce(s,s+M,M,h,E,s+F,s+F+f,f):F-M/2,W=u==="start"?x:u==="center"?x-w/2:u==="end"?x-w:ce($,$+w,w,z,I,$+x,$+x+g,g),T=Math.max(0,T+s),W=Math.max(0,W+$);else{T=c==="start"?F-J-h:c==="end"?F-X+E+G:c==="nearest"?ce(J,X,B,h,E+G,F,F+f,f):F-(J+B/2)+G/2,W=u==="start"?x-ee-z:u==="center"?x-(ee+Z/2)+Y/2:u==="end"?x-L+I+Y:ce(ee,L,Z,z,I+Y,x,x+g,g);const{scrollLeft:ne,scrollTop:ie}=m;T=O===0?0:Math.max(0,Math.min(ie+T/O,m.scrollHeight-B/O+G)),W=K===0?0:Math.max(0,Math.min(ne+W/K,m.scrollWidth-Z/K+Y)),F+=ie-T,x+=ne-W}V.push({el:m,top:T,left:W})}return V},Bt=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function Xt(e,t){if(!e.isConnected||!(o=>{let a=o;for(;a&&a.parentNode;){if(a.parentNode===document)return!0;a=a.parentNode instanceof ShadowRoot?a.parentNode.host:a.parentNode}return!1})(e))return;const n=(o=>{const a=window.getComputedStyle(o);return{top:parseFloat(a.scrollMarginTop)||0,right:parseFloat(a.scrollMarginRight)||0,bottom:parseFloat(a.scrollMarginBottom)||0,left:parseFloat(a.scrollMarginLeft)||0}})(e);if((o=>typeof o=="object"&&typeof o.behavior=="function")(t))return t.behavior(Pe(e,t));const r=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:o,top:a,left:i}of Pe(e,Bt(t))){const c=a-n.top+n.bottom,u=i-n.left+n.right;o.scroll({top:c,left:u,behavior:r})}}const kt=["parentNode"],Yt="form_item";function ae(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function ze(e,t){if(!e.length)return;const n=e.join("_");return t?`${t}_${n}`:kt.includes(n)?`${Yt}_${n}`:n}function De(e,t,n,r,o,a){let i=r;return a!==void 0?i=a:n.validating?i="validating":e.length?i="error":t.length?i="warning":(n.touched||o&&n.validated)&&(i="success"),i}function je(e){return ae(e).join("_")}function Gt(e,t){const n=t.getFieldInstance(e);if(n instanceof HTMLElement)return n;if((n==null?void 0:n.nativeElement)instanceof HTMLElement)return n.nativeElement;const r=ze(ae(e),t.__INTERNAL__.name);if(r)return document.getElementById(r)}function Ae(e){const[t]=et(),n=l.useRef({}),r=l.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:o=>a=>{const i=je(o);a?n.current[i]=a:delete n.current[i]}},scrollToField:function(o){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const i=Gt(o,r);i&&Xt(i,Object.assign({scrollMode:"if-needed",block:"nearest"},a))},getFieldInstance:o=>{const a=je(o);return n.current[a]}}),[e,t]);return[r]}var Kt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const Qt=(e,t)=>{const n=l.useContext(tt),{getPrefixCls:r,direction:o,form:a}=l.useContext(Ce),{prefixCls:i,className:c,rootClassName:u,size:d,disabled:y=n,form:p,colon:P,labelAlign:S,labelWrap:C,labelCol:w,wrapperCol:M,hideRequiredMark:$,layout:s="horizontal",scrollToFirstError:f,requiredMark:g,onFinishFailed:b,name:v,style:j,feedbackIcons:N,variant:H}=e,_=Kt(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style","feedbackIcons","variant"]),q=nt(d),A=l.useContext(rt),F=l.useMemo(()=>g!==void 0?g:$?!1:a&&a.requiredMark!==void 0?a.requiredMark:!0,[$,g,a]),x=P??(a==null?void 0:a.colon),V=r("form",i),R=ye(V),[m,B,Z]=ve(V,R),J=Q(V,`${V}-${s}`,{[`${V}-hide-required-mark`]:F===!1,[`${V}-rtl`]:o==="rtl",[`${V}-${q}`]:q},Z,R,B,a==null?void 0:a.className,c,u),[L]=Ae(p),{__INTERNAL__:X}=L;X.name=v;const ee=l.useMemo(()=>({name:v,labelAlign:S,labelCol:w,labelWrap:C,wrapperCol:M,vertical:s==="vertical",colon:x,requiredMark:F,itemRef:X.itemRef,form:L,feedbackIcons:N}),[v,S,w,M,s,x,F,L,N]);l.useImperativeHandle(t,()=>L);const k=(h,I)=>{if(h){let E={block:"nearest"};typeof h=="object"&&(E=h),L.scrollToField(I,E)}},z=h=>{if(b==null||b(h),h.errorFields.length){const I=h.errorFields[0].name;if(f!==void 0){k(f,I);return}a&&a.scrollToFirstError!==void 0&&k(a.scrollToFirstError,I)}};return m(l.createElement(ot.Provider,{value:H},l.createElement(lt,{disabled:y},l.createElement(at.Provider,{value:q},l.createElement(_e,{validateMessages:A},l.createElement(U.Provider,{value:ee},l.createElement(it,Object.assign({id:v},_,{name:v,onFinishFailed:z,form:L,style:Object.assign(Object.assign({},a==null?void 0:a.style),j),className:J}))))))))},Ut=l.forwardRef(Qt);function Zt(e){if(typeof e=="function")return e;const t=st(e);return t.length<=1?t[0]:t}const Be=()=>{const{status:e,errors:t=[],warnings:n=[]}=l.useContext(ue);return{status:e,errors:t,warnings:n}};Be.Context=ue;function Jt(e){const[t,n]=l.useState(e),r=l.useRef(null),o=l.useRef([]),a=l.useRef(!1);l.useEffect(()=>(a.current=!1,()=>{a.current=!0,Ee.cancel(r.current),r.current=null}),[]);function i(c){a.current||(r.current===null&&(o.current=[],r.current=Ee(()=>{r.current=null,n(u=>{let d=u;return o.current.forEach(y=>{d=y(d)}),d})})),o.current.push(c))}return[t,i]}function en(){const{itemRef:e}=l.useContext(U),t=l.useRef({});function n(r,o){const a=o&&typeof o=="object"&&o.ref,i=r.join("_");return(t.current.name!==i||t.current.originRef!==a)&&(t.current.name=i,t.current.originRef=a,t.current.ref=ct(e(r),a)),t.current.ref}return n}const tn=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}},nn=ut(["Form","item-item"],(e,t)=>{let{rootPrefixCls:n}=t;const r=He(e,n);return[tn(r)]}),rn=e=>{const{prefixCls:t,status:n,wrapperCol:r,children:o,errors:a,warnings:i,_internalItemRender:c,extra:u,help:d,fieldId:y,marginBottom:p,onErrorVisibleChanged:P}=e,S=`${t}-item`,C=l.useContext(U),w=r||C.wrapperCol||{},M=Q(`${S}-control`,w.className),$=l.useMemo(()=>Object.assign({},C),[C]);delete $.labelCol,delete $.wrapperCol;const s=l.createElement("div",{className:`${S}-control-input`},l.createElement("div",{className:`${S}-control-input-content`},o)),f=l.useMemo(()=>({prefixCls:t,status:n}),[t,n]),g=p!==null||a.length||i.length?l.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},l.createElement(be.Provider,{value:f},l.createElement(qe,{fieldId:y,errors:a,warnings:i,help:d,helpStatus:n,className:`${S}-explain-connected`,onVisibleChanged:P})),!!p&&l.createElement("div",{style:{width:0,height:p}})):null,b={};y&&(b.id=`${y}_extra`);const v=u?l.createElement("div",Object.assign({},b,{className:`${S}-extra`}),u):null,j=c&&c.mark==="pro_table_render"&&c.render?c.render(e,{input:s,errorList:g,extra:v}):l.createElement(l.Fragment,null,s,g,v);return l.createElement(U.Provider,{value:$},l.createElement(Le,Object.assign({},w,{className:M}),j),l.createElement(nn,{prefixCls:t}))};var on=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function ln(e){return e?typeof e=="object"&&!l.isValidElement(e)?e:{title:e}:null}const an=e=>{let{prefixCls:t,label:n,htmlFor:r,labelCol:o,labelAlign:a,colon:i,required:c,requiredMark:u,tooltip:d}=e;var y;const[p]=dt("Form"),{vertical:P,labelAlign:S,labelCol:C,labelWrap:w,colon:M}=l.useContext(U);if(!n)return null;const $=o||C||{},s=a||S,f=`${t}-item-label`,g=Q(f,s==="left"&&`${f}-left`,$.className,{[`${f}-wrap`]:!!w});let b=n;const v=i===!0||M!==!1&&i!==!1;v&&!P&&typeof n=="string"&&n.trim()!==""&&(b=n.replace(/[:|：]\s*$/,""));const N=ln(d);if(N){const{icon:A=l.createElement(Rt,null)}=N,F=on(N,["icon"]),x=l.createElement(mt,Object.assign({},F),l.cloneElement(A,{className:`${t}-item-tooltip`,title:"",onClick:V=>{V.preventDefault()},tabIndex:null}));b=l.createElement(l.Fragment,null,b,x)}const H=u==="optional",_=typeof u=="function";_?b=u(b,{required:!!c}):H&&!c&&(b=l.createElement(l.Fragment,null,b,l.createElement("span",{className:`${t}-item-optional`,title:""},(p==null?void 0:p.optional)||((y=ft.Form)===null||y===void 0?void 0:y.optional))));const q=Q({[`${t}-item-required`]:c,[`${t}-item-required-mark-optional`]:H||_,[`${t}-item-no-colon`]:!v});return l.createElement(Le,Object.assign({},$,{className:g}),l.createElement("label",{htmlFor:r,className:q,title:typeof n=="string"?n:""},b))},sn={success:Mt,warning:Nt,error:gt,validating:pt};function Xe(e){let{children:t,errors:n,warnings:r,hasFeedback:o,validateStatus:a,prefixCls:i,meta:c,noStyle:u}=e;const d=`${i}-item`,{feedbackIcons:y}=l.useContext(U),p=De(n,r,c,null,!!o,a),{isFormItemInput:P,status:S,hasFeedback:C,feedbackIcon:w}=l.useContext(ue),M=l.useMemo(()=>{var $;let s;if(o){const g=o!==!0&&o.icons||y,b=p&&(($=g==null?void 0:g({status:p,errors:n,warnings:r}))===null||$===void 0?void 0:$[p]),v=p&&sn[p];s=b!==!1&&v?l.createElement("span",{className:Q(`${d}-feedback-icon`,`${d}-feedback-icon-${p}`)},b||l.createElement(v,null)):null}const f={status:p||"",errors:n,warnings:r,hasFeedback:!!o,feedbackIcon:s,isFormItemInput:!0};return u&&(f.status=(p??S)||"",f.isFormItemInput=P,f.hasFeedback=!!(o??C),f.feedbackIcon=o!==void 0?f.feedbackIcon:w),f},[p,o,u,P,S]);return l.createElement(ue.Provider,{value:M},t)}var cn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function un(e){const{prefixCls:t,className:n,rootClassName:r,style:o,help:a,errors:i,warnings:c,validateStatus:u,meta:d,hasFeedback:y,hidden:p,children:P,fieldId:S,required:C,isRequired:w,onSubItemMetaChange:M}=e,$=cn(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange"]),s=`${t}-item`,{requiredMark:f}=l.useContext(U),g=l.useRef(null),b=de(i),v=de(c),j=a!=null,N=!!(j||i.length||c.length),H=!!g.current&&ht(g.current),[_,q]=l.useState(null);bt(()=>{if(N&&g.current){const R=getComputedStyle(g.current);q(parseInt(R.marginBottom,10))}},[N,H]);const A=R=>{R||q(null)},x=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const m=R?b:d.errors,B=R?v:d.warnings;return De(m,B,d,"",!!y,u)}(),V=Q(s,n,r,{[`${s}-with-help`]:j||b.length||v.length,[`${s}-has-feedback`]:x&&y,[`${s}-has-success`]:x==="success",[`${s}-has-warning`]:x==="warning",[`${s}-has-error`]:x==="error",[`${s}-is-validating`]:x==="validating",[`${s}-hidden`]:p});return l.createElement("div",{className:V,style:o,ref:g},l.createElement(yt,Object.assign({className:`${s}-row`},Ct($,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])),l.createElement(an,Object.assign({htmlFor:S},e,{requiredMark:f,required:C??w,prefixCls:t})),l.createElement(rn,Object.assign({},e,d,{errors:b,warnings:v,prefixCls:t,status:x,help:a,marginBottom:_,onErrorVisibleChanged:A}),l.createElement(We.Provider,{value:M},l.createElement(Xe,{prefixCls:t,meta:d,errors:d.errors,warnings:d.warnings,hasFeedback:y,validateStatus:x},P)))),!!_&&l.createElement("div",{className:`${s}-margin-offset`,style:{marginBottom:-_}}))}const dn="__SPLIT__";function mn(e,t){const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(o=>{const a=e[o],i=t[o];return a===i||typeof a=="function"||typeof i=="function"})}const fn=l.memo(e=>{let{children:t}=e;return t},(e,t)=>mn(e.control,t.control)&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((n,r)=>n===t.childProps[r]));function Re(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function gn(e){const{name:t,noStyle:n,className:r,dependencies:o,prefixCls:a,shouldUpdate:i,rules:c,children:u,required:d,label:y,messageVariables:p,trigger:P="onChange",validateTrigger:S,hidden:C,help:w}=e,{getPrefixCls:M}=l.useContext(Ce),{name:$}=l.useContext(U),s=Zt(u),f=typeof s=="function",g=l.useContext(We),{validateTrigger:b}=l.useContext(vt),v=S!==void 0?S:b,j=t!=null,N=M("form",a),H=ye(N),[_,q,A]=ve(N,H);Et();const F=l.useContext(xt),x=l.useRef(),[V,R]=Jt({}),[m,B]=$t(()=>Re()),Z=h=>{const I=F==null?void 0:F.getKey(h.name);if(B(h.destroy?Re():h,!0),n&&w!==!1&&g){let E=h.name;if(h.destroy)E=x.current||E;else if(I!==void 0){const[T,W]=I;E=[T].concat(D(W)),x.current=E}g(h,E)}},J=(h,I)=>{R(E=>{const T=Object.assign({},E),Y=[].concat(D(h.name.slice(0,-1)),D(I)).join(dn);return h.destroy?delete T[Y]:T[Y]=h,T})},[L,X]=l.useMemo(()=>{const h=D(m.errors),I=D(m.warnings);return Object.values(V).forEach(E=>{h.push.apply(h,D(E.errors||[])),I.push.apply(I,D(E.warnings||[]))}),[h,I]},[V,m.errors,m.warnings]),ee=en();function k(h,I,E){return n&&!C?l.createElement(Xe,{prefixCls:N,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:m,errors:L,warnings:X,noStyle:!0},h):l.createElement(un,Object.assign({key:"row"},e,{className:Q(r,A,H,q),prefixCls:N,fieldId:I,isRequired:E,errors:L,warnings:X,meta:m,onSubItemMetaChange:J}),h)}if(!j&&!f&&!o)return _(k(s));let z={};return typeof y=="string"?z.label=y:t&&(z.label=String(t)),p&&(z=Object.assign(Object.assign({},z),p)),_(l.createElement(St,Object.assign({},e,{messageVariables:z,trigger:P,validateTrigger:v,onMetaChange:Z}),(h,I,E)=>{const T=ae(t).length&&I?I.name:[],W=ze(T,$),Y=d!==void 0?d:!!(c&&c.some(O=>{if(O&&typeof O=="object"&&O.required&&!O.warningOnly)return!0;if(typeof O=="function"){const ne=O(E);return ne&&ne.required&&!ne.warningOnly}return!1})),G=Object.assign({},h);let K=null;if(Array.isArray(s)&&j)K=s;else if(!(f&&(!(i||o)||j))){if(!(o&&!f&&!j))if(l.isValidElement(s)){const O=Object.assign(Object.assign({},s.props),G);if(O.id||(O.id=W),w||L.length>0||X.length>0||e.extra){const re=[];(w||L.length>0)&&re.push(`${W}_help`),e.extra&&re.push(`${W}_extra`),O["aria-describedby"]=re.join(" ")}L.length>0&&(O["aria-invalid"]="true"),Y&&(O["aria-required"]="true"),wt(s)&&(O.ref=ee(T,s)),new Set([].concat(D(ae(P)),D(ae(v)))).forEach(re=>{O[re]=function(){for(var xe,$e,me,Se,fe,we=arguments.length,ge=new Array(we),se=0;se<we;se++)ge[se]=arguments[se];(me=G[re])===null||me===void 0||(xe=me).call.apply(xe,[G].concat(ge)),(fe=(Se=s.props)[re])===null||fe===void 0||($e=fe).call.apply($e,[Se].concat(ge))}});const ie=[O["aria-required"],O["aria-invalid"],O["aria-describedby"]];K=l.createElement(fn,{control:G,update:s,childProps:ie},It(s,O))}else f&&(i||o)&&!j?K=s(E):K=s}return k(K,W,Y)}))}const ke=gn;ke.useStatus=Be;var pn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const hn=e=>{var{prefixCls:t,children:n}=e,r=pn(e,["prefixCls","children"]);const{getPrefixCls:o}=l.useContext(Ce),a=o("form",t),i=l.useMemo(()=>({prefixCls:a,status:"error"}),[a]);return l.createElement(Ft,Object.assign({},r),(c,u,d)=>l.createElement(be.Provider,{value:i},n(c.map(y=>Object.assign(Object.assign({},y),{fieldKey:y.key})),u,{errors:d.errors,warnings:d.warnings})))};function bn(){const{form:e}=l.useContext(U);return e}const te=Ut;te.Item=ke;te.List=hn;te.ErrorList=qe;te.useForm=Ae;te.useFormInstance=bn;te.useWatch=Ot;te.Provider=_e;te.create=()=>{};export{te as F};
//# sourceMappingURL=index-Cxldnjy_.js.map
