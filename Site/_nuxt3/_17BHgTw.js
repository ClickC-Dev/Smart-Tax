import{C as v,D as w,l as _}from"./BPhOmExG.js";import{u as m}from"./BI7_RvYE.js";const f={ORIGINAL:0,NEW_VERSION:1},E=()=>{const o=async e=>typeof window>"u"?{ID:e,VARIANT:f.ORIGINAL}:(window.VWO=window.VWO||[],window.VWO.push(["activate",!1,[e],!0]),r(e)),r=e=>new Promise(n=>{if(typeof window>"u"){n({ID:e,VARIANT:f.ORIGINAL});return}window.VWO=window.VWO||[],window.VWO.push(["onEventReceive","vA",function(i){const s=i[1],l=+i[2]-1;if(+e==+s){const t={ID:s,VARIANT:l};console.log(`@ Experimento VWO
`,t),n(t)}}])});return{executeExperiment:o,getVariant:r,vwoRedirectTo:(e,n)=>{typeof window>"u"||(localStorage.setItem(`vwo-redirect-${n}`,"true"),window.location.href=e+window.location.search)},vwoCheckRedirect:e=>{if(typeof window>"u")return;const n=`vwo-redirect-${e}`;localStorage.getItem(n)&&(o(e),localStorage.removeItem(n))},loadVwoScript:e=>{if(typeof window>"u"||window.VWO||document.getElementById("vwoCode"))return;const h=`
      window._vwo_code || (function() {
        var account_id=619861,
          version=${2.1},
          settings_tolerance=2000,
          hide_element='body',
          hide_element_style='${e?"opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important;":"opacity:inherit;"}',
          f=false,w=window,d=document,v=d.querySelector('#vwoCode'),cK='vwo'+account_id+'settings',cc={};
        try {
          var c=JSON.parse(localStorage.getItem('_vwo'+account_id+'_config'));
          cc=c&&typeof c==='object'?c:{};
        } catch(e) {}
        var stT=cc.stT==='session'?w.sessionStorage:w.localStorage;
        code={
          nonce:v&&v.nonce,
          library_tolerance:function(){return typeof library_tolerance!=='undefined'?library_tolerance:undefined},
          settings_tolerance:function(){return cc.sT||settings_tolerance},
          hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},
          hide_element:function(){
            if(performance.getEntriesByName('first-contentful-paint')[0]){return''}
            return typeof cc.hE==='string'?cc.hE:hide_element
          },
          getVersion:function(){return version},
          finish:function(e){
            if(!f){
              f=true;
              var t=d.getElementById('_vis_opt_path_hides');
              if(t) t.parentNode.removeChild(t);
              if(e)(new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e
            }
          },
          finished:function(){return f},
          addScript:function(e){
            var t=d.createElement('script');
            t.type='text/javascript';
            if(e.src){t.src=e.src}else{t.text=e.text}
            v&&t.setAttribute('nonce',v.nonce);
            d.getElementsByTagName('head')[0].appendChild(t)
          },
          load:function(e,t){
            var n=this.getSettings(),i=d.createElement('script'),r=this;
            t=t||{};
            if(n){
              i.textContent=n;
              d.getElementsByTagName('head')[0].appendChild(i);
              if(!w.VWO||VWO.caE){
                stT.removeItem(cK);
                r.load(e)
              }
            } else {
              var o=new XMLHttpRequest;
              o.open('GET',e,true);
              o.withCredentials=!t.dSC;
              o.responseType=t.responseType||'text';
              o.onload=function(){
                if(t.onloadCb){return t.onloadCb(o,e)}
                if(o.status===200||o.status===304){
                  _vwo_code.addScript({text:o.responseText})
                } else{
                  _vwo_code.finish('&e=loading_failure:'+e)
                }
              };
              o.onerror=function(){
                if(t.onerrorCb){return t.onerrorCb(e)}
                _vwo_code.finish('&e=loading_failure:'+e)
              };
              o.send()
            }
          },
          getSettings:function(){
            try{
              var e=stT.getItem(cK);
              if(!e){return}
              e=JSON.parse(e);
              if(Date.now()>e.e){stT.removeItem(cK);return}
              return e.s
            }catch(e){return}
          },
          init:function(){
            if(d.URL.indexOf('__vwo_disable__')>-1) return;
            var e=this.settings_tolerance();
            w._vwo_settings_timer=setTimeout(function(){
              _vwo_code.finish();
              stT.removeItem(cK)
            }, e);
            var t;
            if(this.hide_element()!=='body'){
              t=d.createElement('style');
              var n=this.hide_element(),
              i=n?n+this.hide_element_style():'',r=d.getElementsByTagName('head')[0];
              t.setAttribute('id','_vis_opt_path_hides');
              v&&t.setAttribute('nonce',v.nonce);
              t.setAttribute('type','text/css');
              if(t.styleSheet) t.styleSheet.cssText=i;
              else t.appendChild(d.createTextNode(i));
              r.appendChild(t)
            } else {
              t=d.getElementsByTagName('head')[0];
              var i=d.createElement('div');
              i.style.cssText='z-index: 2147483647 !important;position: fixed !important;' +
                'left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;' +
                'background: white !important;display: block !important;';
              i.setAttribute('id','_vis_opt_path_hides');
              i.classList.add('_vis_hide_layer');
              t.parentNode.insertBefore(i,t.nextSibling)
            }
            var o=window._vis_opt_url||d.URL,
              s='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(o)+'&vn='+version;
            if(w.location.search.indexOf('_vwo_xhr')!==-1){this.addScript({src:s})}else{this.load(s+'&x=true')}
          }
        };
        w._vwo_code=code;
        code.init();
      })();
    `;try{const c=document.getElementsByTagName("head")[0];if(!c)return;const d=document.createElement("script");d.type="text/javascript",d.id="vwoCode",d.textContent=h,c.appendChild(d)}catch(c){console.error("Falha ao carregar o script do VWO:",c)}}}};function y(o){return[{path:"/abrir-empresa/sao-paulo/",experimentId:Number(o.experimentIdAbrirEmpresaSp)||0,blocking:!0,type:"ab"},{path:"/abrir-empresa/br/",experimentId:Number(o.experimentIdAbrirEmpresaBr)||0,blocking:!1,type:"split-url"}]}const T=()=>{const o=w(),r=v(),u=t=>t.endsWith("/")?t:`${t}/`,p=y(r.public).some(t=>t.type==="ab"&&t.path===u(o.path)),a=m("layout-meta-overrides",()=>({})),e=m("layout-ready",()=>!p);return{mergedMeta:_(()=>({...o.meta,...a.value})),isReady:e,setLayoutMetaOverrides:t=>{a.value={...t}},clearLayoutMetaOverrides:()=>{a.value={}},setLayoutReady:t=>{e.value=t}}};export{f as V,E as a,y as g,T as u};
