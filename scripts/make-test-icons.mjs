// Test-site icons: the normal paw icons with a "TEST" band, so the test site and its installed app are easy to tell
// apart from the live one. Writes icons/test/; scripts/deploy-test.sh swaps them in for the test build only.
//
//   node scripts/make-test-icons.mjs        (macOS: renders with qlmanage)
import {readFileSync,writeFileSync,mkdirSync,renameSync,rmSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const font=readFileSync('assets/fonts/jersey10-latin.woff2').toString('base64');
const out='icons/test',tmp=join(tmpdir(),'purrsuade-test-icons');
mkdirSync(out,{recursive:true});rmSync(tmp,{recursive:true,force:true});mkdirSync(tmp,{recursive:true});

// The band, in a 100 × 100 box: [top, height, side inset, font size].
const band={normal:[60,27,6,25],maskable:[58,22,17,20],tiny:[52,46,0,46]};
const svg=(png,b,size)=>{const [y,h,x,fs]=band[b],w=100-2*x;return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
<style>@font-face{font-family:J;src:url(data:font/woff2;base64,${font}) format('woff2')}</style>
<image href="data:image/png;base64,${readFileSync(png).toString('base64')}" width="100" height="100"/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${b==='tiny'?3:4}" fill="#ff8fa3" stroke="#3b2229" stroke-width="${b==='tiny'?3:2.5}"/>
<text x="50" y="${y+h/2}" dy=".36em" text-anchor="middle" font-family="J" font-size="${fs}" fill="#1d1830" letter-spacing="${b==='tiny'?0:1}">TEST</text>
</svg>`;};

const icons=[['icon-512.png',512,'normal'],['icon-192.png',192,'normal'],['apple-touch-icon.png',180,'normal'],
  ['icon-maskable-512.png',512,'maskable'],['favicon-32.png',32,'tiny']];
for(const [name,size,b] of icons){
  const src=join(tmp,name.replace('.png','.svg'));
  writeFileSync(src,svg(name==='favicon-32.png'?'icons/icon-192.png':`icons/${name}`,b,512));
  // qlmanage draws small sizes badly: render at 512 px, then scale down with sips.
  const big=512;
  execFileSync('qlmanage',['-t','-s',String(big),'-o',tmp,src],{stdio:'ignore'});
  if(big!==size)execFileSync('sips',['-z',String(size),String(size),src+'.png'],{stdio:'ignore'});
  renameSync(src+'.png',join(out,name));
}
// The SVG favicon: the paw with the band, the font embedded.
const paw=readFileSync('icons/paw.svg','utf8'),[y,h,x,fs]=band.tiny;
writeFileSync(join(out,'paw.svg'),paw.replace(/<\/svg>\s*$/,`<style>@font-face{font-family:J;src:url(data:font/woff2;base64,${font}) format('woff2')}</style>
<rect x="${x-1}" y="${y+1}" width="${102-2*x}" height="${h}" rx="3" fill="#ff8fa3" stroke="#3b2229" stroke-width="3"/>
<text x="50" y="${y+1+h/2}" dy=".36em" text-anchor="middle" font-family="J" font-size="${fs}" fill="#1d1830">TEST</text>
</svg>
`));
console.log('Test icons written to',out);
