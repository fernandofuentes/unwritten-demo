import{j as i}from"./jsx-runtime.BCPyM5IQ.js";import{r}from"./index.OztxiM9T.js";function d(){const a=r.useRef(null);return r.useEffect(()=>{const e=a.current;if(!e)return;const n=()=>{const t=document.createElement("div");t.className="glitch-line";const s=Math.random()*2+1,o=Math.random()*.4+.2,l=Math.random()*2;return t.style.cssText=`
        position: absolute;
        left: 0;
        width: 100%;
        height: ${s}px;
        background: #00ffff;
        opacity: 0;
        transform: translateX(-100%);
        animation: glitch ${o}s ${l}s infinite linear;
      `,t};for(let t=0;t<10;t++)e.appendChild(n());return()=>{for(;e.firstChild;)e.removeChild(e.firstChild)}},[]),i.jsxs("div",{className:"relative w-full h-[2px] bg-[#00ffff]/10",children:[i.jsx("div",{ref:a,className:"absolute inset-0 overflow-hidden",children:i.jsx("style",{children:`
            @keyframes glitch {
              0% {
                transform: translateX(-100%);
                opacity: 0;
              }
              10% {
                opacity: 0.8;
              }
              40% {
                opacity: 0.4;
              }
              70% {
                opacity: 0.6;
              }
              90% {
                opacity: 0.2;
              }
              100% {
                transform: translateX(100%);
                opacity: 0;
              }
            }
          `})}),i.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-body via-transparent to-body"})]})}export{d as default};
