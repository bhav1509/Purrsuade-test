// Pixel-art night background for the Cognito sign-in page: node scripts/make-login-background.mjs cloud/branding/background.svg
import {writeFileSync} from 'node:fs';
const W=240,H=135,P=8;               // 240x135 "pixels", each 8 px -> 1920x1080
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const r=[];const px=(x,y,c,w=1,h=1)=>r.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`);
// sky bands (dithered look without gradients)
const bands=['#120e1b','#15121e','#181424','#1b1527','#1e182c','#221c32'];
bands.forEach((c,i)=>px(0,Math.floor(i*H/bands.length),c,W,Math.ceil(H/bands.length)+1));
// stars
const starC=['#b4a2ff','#d6c9ff','#ffe39a','#ff9ec4','#f3eefc'];
for(let i=0;i<120;i++){const x=Math.floor(rnd()*W),y=Math.floor(rnd()*(H*0.68)),c=starC[Math.floor(rnd()*starC.length)];
  px(x,y,c);if(rnd()<0.12){px(x-1,y,c);px(x+1,y,c);px(x,y-1,c);px(x,y+1,c);}}
// moon
const mx=196,my=18;for(let y=-7;y<=7;y++)for(let x=-7;x<=7;x++){const d=x*x+y*y;if(d<=49){const s=(x+3)*(x+3)+(y-2)*(y-2);px(mx+x,my+y,d>36?'#e8d98a':'#ffe39a');if(s<=4)px(mx+x,my+y,'#e8d98a');}}
// hills
const hill=(base,amp,freq,ph,c)=>{for(let x=0;x<W;x++){const top=Math.round(base-amp*Math.sin(x*freq+ph)-amp*0.4*Math.sin(x*freq*2.3+ph*1.7));px(x,top,c,1,H-top);}};
hill(108,6,0.035,1,'#2b3f4a');hill(116,5,0.05,3,'#3f7a63');hill(124,3,0.08,5,'#5fae8d');
// grass tufts and flowers on the front hill
for(let i=0;i<70;i++){const x=Math.floor(rnd()*W),y=124+Math.floor(rnd()*10);px(x,y,'#8fe0bc');if(rnd()<0.4)px(x,y-1,'#8fe0bc');}
const flC=['#ff9ec4','#ffe39a','#f3eefc','#b4a2ff'];
for(let i=0;i<26;i++){const x=Math.floor(rnd()*W),y=126+Math.floor(rnd()*8),c=flC[Math.floor(rnd()*flC.length)];px(x,y,c);px(x,y+1,'#3f7a63');}
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W*P}" height="${H*P}" preserveAspectRatio="xMidYMid slice" shape-rendering="crispEdges">\n${r.join('')}\n</svg>\n`;
writeFileSync(process.argv[2],svg);console.log('bytes',svg.length);
