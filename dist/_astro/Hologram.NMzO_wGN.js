import{j as z}from"./jsx-runtime.BCPyM5IQ.js";import{r as E}from"./index.OztxiM9T.js";import{m as G,n as T,F as k,o as C,S as F,P as j,W as L,I as _,k as P,C as S,M,G as R,B as q,E as B,L as H,a as O}from"./three.module.19Lf9L0J.js";class U extends G{constructor(t,e={}){const o=e.font;if(o===void 0)super();else{const a=o.generateShapes(t,e.size);e.depth=e.height!==void 0?e.height:50,e.bevelThickness===void 0&&(e.bevelThickness=10),e.bevelSize===void 0&&(e.bevelSize=8),e.bevelEnabled===void 0&&(e.bevelEnabled=!1),super(a,e)}this.type="TextGeometry"}}class W extends T{constructor(t){super(t)}load(t,e,o,a){const s=this,r=new k(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(t,function(c){const d=s.parse(JSON.parse(c));e&&e(d)},o,a)}parse(t){return new A(t)}}class A{constructor(t){this.isFont=!0,this.type="Font",this.data=t}generateShapes(t,e=100){const o=[],a=I(t,e,this.data);for(let s=0,r=a.length;s<r;s++)o.push(...a[s].toShapes());return o}}function I(l,t,e){const o=Array.from(l),a=t/e.resolution,s=(e.boundingBox.yMax-e.boundingBox.yMin+e.underlineThickness)*a,r=[];let c=0,d=0;for(let v=0;v<o.length;v++){const h=o[v];if(h===`
`)c=0,d-=s;else{const m=N(h,a,c,d,e);c+=m.offsetX,r.push(m.path)}}return r}function N(l,t,e,o,a){const s=a.glyphs[l]||a.glyphs["?"];if(!s){console.error('THREE.Font: character "'+l+'" does not exists in font family '+a.familyName+".");return}const r=new C;let c,d,v,h,m,p,f,u;if(s.o){const n=s._cachedOutline||(s._cachedOutline=s.o.split(" "));for(let i=0,y=n.length;i<y;)switch(n[i++]){case"m":c=n[i++]*t+e,d=n[i++]*t+o,r.moveTo(c,d);break;case"l":c=n[i++]*t+e,d=n[i++]*t+o,r.lineTo(c,d);break;case"q":v=n[i++]*t+e,h=n[i++]*t+o,m=n[i++]*t+e,p=n[i++]*t+o,r.quadraticCurveTo(m,p,v,h);break;case"b":v=n[i++]*t+e,h=n[i++]*t+o,m=n[i++]*t+e,p=n[i++]*t+o,f=n[i++]*t+e,u=n[i++]*t+o,r.bezierCurveTo(m,p,f,u,v,h);break}}return{offsetX:s.ha*t,path:r}}function Q(){const l=E.useRef(null);return E.useEffect(()=>{if(!l.current)return;const t=new F,e=new j(85,1,.1,1e3),o=new L({alpha:!0,antialias:!0});o.setSize(800,800),l.current.appendChild(o.domElement);const a=new W,s=x=>{const w=new U("",{font:x,size:6,height:2,curveSegments:12,bevelEnabled:!0,bevelThickness:.25,bevelSize:.15,bevelOffset:0,bevelSegments:5});w.center();const b=new P({uniforms:{time:{value:0},color:{value:new S(65535)}},vertexShader:`
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            float elevation = sin(modelPosition.x * 2.0 + time) * 0.05;
            elevation += sin(modelPosition.y * 2.0 + time) * 0.05;
            
            modelPosition.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * viewMatrix * modelPosition;
          }
        `,fragmentShader:`
          uniform vec3 color;
          varying float vElevation;
          
          void main() {
            float alpha = 0.8 + sin(vElevation * 20.0) * 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `,transparent:!0}),g=new M(w,b);return g.rotation.x=.1,t.add(g),{mesh:g,material:b}},r=new _(45,1),c=new P({uniforms:{time:{value:0},color:{value:new S(65535)}},vertexShader:`
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        
        void main() {
          vUv = uv;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          float elevation = sin(modelPosition.x * 5.0 + time) * 0.1;
          elevation += sin(modelPosition.y * 6.0 + time) * 0.1;
          
          modelPosition.z += elevation;
          vElevation = elevation;
          
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `,fragmentShader:`
        uniform vec3 color;
        varying float vElevation;
        
        void main() {
          float alpha = 0.7 + sin(vElevation * 20.0) * 0.3;
          gl_FragColor = vec4(color, alpha);
        }
      `,transparent:!0,wireframe:!0}),d=new M(r,c);t.add(d);const v=new R,h=new q(12,12,12),m=new B(h),p=new H({color:16711935,transparent:!0,opacity:.9}),f=new O(m,p);f.position.set(65,0,0),v.add(f),t.add(v),e.position.set(0,20,120),e.lookAt(0,0,0);let u=null;a.load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",x=>{u=s(x)});let n=0;const i=()=>{requestAnimationFrame(i),n+=.01,d.rotation.x+=.005,d.rotation.y+=.005,v.rotation.y=n,v.rotation.x=Math.PI*.1,f.rotation.y+=.02,f.rotation.x+=.01,p.opacity=.7+Math.sin(n*2)*.3,u&&(u.mesh.rotation.y=d.rotation.y,u.material.uniforms.time.value+=.05),c.uniforms.time.value+=.05,o.render(t,e)};i();const y=()=>{if(!l.current)return;const x=l.current.offsetWidth;o.setSize(x,x),e.aspect=1,e.updateProjectionMatrix()};return window.addEventListener("resize",y),y(),()=>{window.removeEventListener("resize",y),l.current?.removeChild(o.domElement),r.dispose(),c.dispose(),h.dispose(),m.dispose(),p.dispose(),u&&(u.mesh.geometry.dispose(),u.material.dispose())}},[]),z.jsx("div",{ref:l,className:"w-full h-full"})}export{Q as H};
