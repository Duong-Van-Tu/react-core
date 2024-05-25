import{e as B,f as H,g as U,h as O,b as V,r as o,i as W,bv as J,P as f,k as F,bw as Q,bx as Y,by as ee,j as d,c as e,t as z,B as y,R as k,v as $,u as te,C as N,D as ne,z as re}from"./index-D7kYuqtd.js";import{M as ae}from"./index-DbvvMLWa.js";import{F as v}from"./index-Cxldnjy_.js";import{I as b}from"./index-DAOf7p35.js";import{u as x}from"./loading.hook-B4xO64Zi.js";import{d as se}from"./dayjs.min-SzvlDAgD.js";import{T as ie}from"./table-CK0VyuD-.js";import{S as ce}from"./search-8bG-27XG.js";import{L as D}from"./locale-formatter-FZ-3y9Y2.js";import"./ExclamationCircleFilled-Bz7bDzj1.js";import"./InfoCircleFilled-CK2dnJYF.js";import"./index-DGwjM0Al.js";import"./index-DMzhYhmi.js";import"./index-BuPIgzdn.js";var w=(t=>(t.EditService="Edit Service",t.DeleteService="Delete Service",t.AddService="Add Service",t))(w||{});const C=()=>{const t=B(""),n=H(),s=U(),c=O(),a=V(i=>i.auth.user),l=o.useCallback(async({pageIndex:i=f.PAGEINDEX,pageSize:m=f.PAGESIZE,textSearch:h,statusId:p,time:P=se().year().toString(),roleType:g})=>{const I={PageIndex:i.toString(),PageSize:m.toString(),UserId:a==null?void 0:a.id,RoleId:a==null?void 0:a.applicationRoles[0].id,StatusId:p,Time:`1-1-${P}`,TextSearch:h,tenant:c,roleType:g},A=W(I),{data:G,succeeded:K}=await n(()=>t.post(`/Service/get-list-with-pagination?${A}`),{loadingKey:"get-service"});if(K){const{items:L,totalRecords:M,pageIndex:X,totalPages:_,totalExtend:Z}=G;s(J({data:L,pagination:{pageIndex:X,totalRecords:M,totalPages:_},totalExtend:Z}))}},[n,t]),r=o.useCallback(async i=>{const m=F({...i});console.log("Payload for API: ",[{data:m}]);const{data:h,succeeded:p}=await n(()=>t.post(`/Service/add-or-update?tenant=${c}`,[{data:m}]),{loadingKey:"add-service"});return p?(s(Q(h[0])),p):!1},[t,n]),u=o.useCallback(async i=>{const m=i.join(","),h=`${a==null?void 0:a.id}?tenant=${c}`,{succeeded:p}=await n(()=>t.del(`/Service/delete-by-ids/${m}/${h}`),{loadingKey:"delete-service"});return p!==null&&p?(s(Y(i)),!0):!1},[t,n]),S=o.useCallback(async i=>{const m=F({...i}),{data:h,succeeded:p}=await n(()=>t.post(`/Service/add-or-update?tenant=${c}`,[{id:i.id,data:m}]),{loadingKey:"edit-service"});return p?(s(ee(h[0])),p):!1},[t,n]);return{getAllService:l,deleteService:u,addKService:r,updateService:S}},oe=({closeModal:t})=>{const[n]=v.useForm(),{addKService:s}=C(),[c]=x(["add-service",!1]),a=async r=>{const u={...r};await s(u)&&(n.resetFields(),t())},l=()=>{t(),n.resetFields()};return d(o.Fragment,{children:[e("h3",{css:de,children:"Thêm mảng dịch vụ"}),d(v,{form:n,css:le,name:"add-service",onFinish:a,layout:"vertical",children:[e(v.Item,{label:e("span",{css:E,children:"Mã mảng DV"}),name:"code",rules:[{required:!0,message:"Vui lòng nhập mảng DV!"}],children:e(b,{placeholder:"Nhập mã mảng DV"})}),e(v.Item,{label:e("span",{css:E,children:"Tên mảng DV"}),name:"name",rules:[{required:!0,message:"Vui lòng nhập tên mảng DV!"}],children:e(b,{placeholder:"Nhập tên mảng DV"})}),e(v.Item,{label:e("span",{css:E,children:"Tên viết tắt"}),name:"shortName",rules:[{required:!0,message:"Vui lòng nhập tên viết tắt!"}],children:e(b,{placeholder:"Nhập tên viết tắt"})}),e(k,{justify:"end",children:d(z,{children:[e(y,{onClick:l,children:"Huỷ"}),e(y,{loading:c,type:"primary",htmlType:"submit",children:"Xác nhận"})]})})]})]})},de={name:"x2l4rd",styles:"font-weight:500;font-size:2rem;line-height:2.2rem;margin-top:2rem"},le={name:"1mnl6b",styles:".ant-form-item-required::before{display:none!important;}margin-top:2rem;padding:1rem"},E={name:"vu4egt",styles:"font-size:1.4rem;line-height:1.6rem;font-weight:500"},me=({closeModal:t,serviceIds:n})=>{const{deleteService:s,getAllService:c}=C(),a=V(m=>{var h;return(h=m.category.sevice.pagination)==null?void 0:h.pageIndex})??0,[l]=x(["delete-service",!1]),r=$(),S=new URLSearchParams(r.search).get("tab");return d("div",{css:he,children:[e("h3",{css:pe,children:"Đồng ý xoá các mục tiêu đã chọn?"}),e(k,{justify:"center",children:d(z,{children:[e(y,{onClick:()=>t(),children:"Huỷ"}),e(y,{loading:l,type:"primary",danger:!0,onClick:async()=>{await s(n)?(c({pageIndex:a||1,pageSize:f.PAGESIZE,roleType:S}),t()):console.error("Failed to delete service")},children:"Xoá"})]})})]})},he={name:"mjs9a",styles:"margin-top:2rem;padding:0 2rem"},pe={name:"bmm6zl",styles:"font-size:1.8rem;line-height:2rem;text-align:center;margin-bottom:2.4rem;font-weight:500"},ge=({closeModal:t,data:n})=>{const[s]=v.useForm(),{updateService:c}=C(),[a]=x(["edit-service",!1]),l=async u=>{const S={...u,id:n.id};await c(S)&&(s.resetFields(),t())},r=()=>{t()};return o.useEffect(()=>{s.setFieldsValue(n)},[n]),d(o.Fragment,{children:[e("h3",{css:ue,children:"Chỉnh sửa mảng dịch vụ"}),d(v,{form:s,css:ve,name:"add-service",onFinish:l,layout:"vertical",children:[e(v.Item,{label:e("span",{css:T,children:"Mã mảng DV"}),name:"code",rules:[{required:!0,message:"Vui lòng nhập mảng DV!"}],children:e(b,{placeholder:"Nhập mã mảng DV"})}),e(v.Item,{label:e("span",{css:T,children:"Tên mảng DV"}),name:"name",rules:[{required:!0,message:"Vui lòng nhập tên mảng DV!"}],children:e(b,{placeholder:"Nhập tên mảng DV"})}),e(v.Item,{label:e("span",{css:T,children:"Tên viết tắt"}),name:"shortName",rules:[{required:!0,message:"Vui lòng nhập tên viết tắt!"}],children:e(b,{placeholder:"Nhập tên viết tắt"})}),e(k,{justify:"end",children:d(z,{children:[e(y,{onClick:r,children:"Huỷ"}),e(y,{loading:a,type:"primary",htmlType:"submit",children:"Xác nhận"})]})})]})]})},ue={name:"x2l4rd",styles:"font-weight:500;font-size:2rem;line-height:2.2rem;margin-top:2rem"},ve={name:"1mnl6b",styles:".ant-form-item-required::before{display:none!important;}margin-top:2rem;padding:1rem"},T={name:"vu4egt",styles:"font-size:1.4rem;line-height:1.6rem;font-weight:500"},R=o.createContext(void 0),q=()=>{const t=o.useContext(R);if(!t)throw new Error("useModalService must be used within a ModalServiceProvider");return t},Se=({children:t})=>{const[n,s]=o.useState(),[c,a]=o.useState(!1),l=(u,S,i)=>{s({modalName:u,data:S,serviceIds:i}),a(!0)},r=()=>{s(void 0),a(!1)};return d(R.Provider,{value:{openModal:l,closeModal:r},children:[t,d(ae,{open:c,onCancel:r,footer:null,children:[(n==null?void 0:n.modalName)===w.EditService&&e(ge,{closeModal:r,data:n.data}),(n==null?void 0:n.modalName)===w.DeleteService&&e(me,{closeModal:r,data:n.data,serviceIds:n.serviceIds}),(n==null?void 0:n.modalName)===w.AddService&&e(oe,{closeModal:r})]})]})};function fe({data:t}){const{openModal:n}=q(),{formatMessage:s}=te(),c=l=>{switch(l){case 1:n(w.EditService,t);break}},a=[{key:"1",label:e("span",{children:s({id:"dropdown.edit"})}),onClick:()=>c(1)}];return e(ne,{menu:{items:a},placement:"bottomRight",children:e(y,{css:ye,children:e(N,{type:"three-dot",width:16,height:18})})})}const ye={name:"l2srbf",styles:"background:none;border:none;box-shadow:unset;padding:0"},be=[{title:e(D,{id:"table.column.serviceCode"}),dataIndex:"code",render:t=>t},{title:e(D,{id:"table.column.serviceName"}),dataIndex:"name",render:t=>t},{title:e(D,{id:"table.column.serviceShortName"}),dataIndex:"shortName",render:t=>t},{title:"",dataIndex:"calculationMethod",fixed:"right",width:"6%",render:(t,n)=>e(fe,{data:n})}];function Ie(){const[t,n]=o.useState(),{openModal:s}=q(),{getAllService:c}=C(),[a]=x(["get-service",!0]),{data:l,pagination:r}=V(g=>g.category.sevice),u=$(),i=new URLSearchParams(u.search).get("tab"),m=({textSearch:g,time:I})=>{c({pageIndex:(r==null?void 0:r.pageIndex)??f.PAGEINDEX,pageSize:f.PAGESIZE,textSearch:g,time:I,roleType:i})},h=g=>{c({pageIndex:g,pageSize:f.PAGESIZE,roleType:i})},p={onChange:(g,I)=>{n(I.map(A=>A.id))}},P=()=>{s("Delete Service",void 0,t)};return o.useEffect(()=>{c({pageIndex:f.PAGEINDEX,pageSize:f.PAGESIZE,roleType:i})},[c,i]),d("div",{css:we,children:[d(y,{onClick:()=>s("Add Service"),type:"primary",css:xe,iconPosition:"start",size:"large",children:[e(N,{color:"#fff",width:16,height:16,type:"circle-plus"}),e("span",{children:"Thêm mảng dịch vụ"})]}),e("div",{css:Ce,children:e(ce,{onSearch:m})}),e("div",{css:Pe,children:e(y,{disabled:!t,onClick:()=>P(),size:"large",danger:!0,children:"Xoá mục tiêu đã chọn"})}),e(ie,{rowSelection:p,columns:be,dataSource:l,loading:a,rowKey:g=>g.id,onTableChange:g=>h(g),pagination:{current:r==null?void 0:r.pageIndex,pageSize:f.PAGESIZE,total:r==null?void 0:r.totalRecords,position:["bottomCenter"]},scroll:{x:1450}})]})}const we={name:"bjn8wh",styles:"position:relative"},xe={name:"1vjzj34",styles:"position:absolute;right:0;top:-9rem;background:#0070b8;display:flex;align-items:center;gap:0.2rem;&:hover{background:#0070b8!important;opacity:0.9;}"},Ce={name:"f2f29z",styles:"margin-top:2.6rem"},Pe={name:"vj2mbl",styles:"margin:1.1rem 0"};function Ke(){const t=U();return o.useEffect(()=>{t(re([{title:{vi_VN:"Danh mục",en_US:"Category"}},{title:{vi_VN:"Mảng dịch vụ",en_US:"Service category"}}]))},[t]),d(Se,{children:[e("h3",{css:Ae,children:"Mảng dịch vụ"}),d("div",{css:j,children:[e(N,{width:8,height:8,type:"dot"}),e("span",{children:e("span",{css:j,children:"10 mảng dịch vụ"})})]}),e(Ie,{})]})}const Ae={name:"9czw1u",styles:"font-size:2.4rem;line-height:2.8rem;font-weight:600;color:rgba(16, 24, 40, 1);margin-bottom:0.5rem"},j={name:"q29gn3",styles:"font-size:1.2rem;font-weight:500;line-height:1.8rem;color:rgba(84, 104, 129, 1)"};export{Ke as default};
//# sourceMappingURL=index-CwinAcH6.js.map
