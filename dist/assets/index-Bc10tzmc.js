import{aF as d,o as e,B as u,aG as c,aH as p,d as b,r as n,aK as g,n as r,aL as h}from"./index-BW2778Vf.js";import{T as o}from"./table-Boa1gm9R.js";import{L as i}from"./locale-formatter-BRoUTN1f.js";import"./index-BWQGLStq.js";function f(){const{formatMessage:a}=d(),t=[{key:"1",label:e("span",{children:a({id:"title.dropdown.edit"})})},{key:"2",label:e("span",{children:a({id:"title.dropdown.delete"})})}];return e(p,{menu:{items:t},placement:"bottomRight",children:e(u,{css:S,children:e(c,{type:"three-dot",width:16,height:18})})})}const S={name:"l2srbf",styles:"background:none;border:none;box-shadow:unset;padding:0"},s=[{title:e(i,{id:"table.column.privileges.beneficiaryName"}),dataIndex:"beneficiaryName",render:a=>a},{title:e(i,{id:"table.column.privileges.fixedMonthlySalary"}),dataIndex:"fixedMonthlySalary",render:a=>a},{title:e(i,{id:"table.column.privileges.totalTargetVariableSalary"}),dataIndex:"totalTargetVariableSalary",render:a=>a},{title:e(i,{id:"table.column.privileges.actualVariableSalary"}),dataIndex:"actualVariableSalary",render:a=>a},{title:e(i,{id:"table.column.status"}),dataIndex:"status",render:a=>a},{title:"",dataIndex:"calculationMethod",fixed:"right",width:"6%",render:()=>e(f,{})}],x=[{key:1,beneficiaryName:"beneficiaryName",fixedMonthlySalary:"fixedMonthlySalary",totalTargetVariableSalary:"totalTargetVariableSalary",actualVariableSalary:"actualVariableSalary",status:"status"}],v=[{key:1,beneficiaryName:"beneficiaryName employee",fixedMonthlySalary:"fixedMonthlySalary employee",totalTargetVariableSalary:"totalTargetVariableSalary employee",actualVariableSalary:"actualVariableSalary employee",status:"status employee"}];function N(){const a=b(),{formatMessage:t}=d(),m=[{key:"1",label:t({id:"title.tab.privileges.my"}),children:e(o,{columns:s,dataSource:x,loading:!1,rowKey:l=>l.key,pagination:{current:1,pageSize:7},scroll:{x:1450}})},{key:"2",label:t({id:"title.tab.privileges.employee"}),children:e(o,{columns:s,dataSource:v,loading:!1,rowKey:l=>l.key,pagination:{current:1,pageSize:7},scroll:{x:1450}})}],y=l=>{console.log(l)};return n.useEffect(()=>{a(g([{title:{vi_VN:"Sale",en_US:"Sale"}},{title:{vi_VN:"Cơ hội",en_US:"Privileges"}}]))},[a]),r(n.Fragment,{children:[e("h3",{css:w,children:t({id:"title.document.privileges"})}),r("div",{css:V,children:[e("span",{children:t({id:"title.document.privileges"})}),e(c,{width:8,height:8,type:"dot"}),r("span",{children:["10 ",t({id:"title.document.privileges"})]})]}),e(h,{defaultActiveKey:"1",items:m,onChange:y})]})}const V={name:"19qu8x5",styles:"display:flex;align-items:center;margin-top:0.4rem;gap:4px;font-size:1.4rem"},w={name:"156m3vd",styles:"font-size:1.8rem;line-height:2.3rem;font-weight:600"};export{N as default};
//# sourceMappingURL=index-Bc10tzmc.js.map
