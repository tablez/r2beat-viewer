export const UP=1,DOWN=2,LEFT=4,RIGHT=8;
export const TYPES=[{id:'basic',label:'基础适应',description:'等间隔随机上下左右；不生成任何斜向组合键'},{id:'cloud',label:'浮云',description:'左右左 / 右左右为小组，组间夹上、下或上下'},{id:'shield',label:'盾',description:'上上 / 下下为核心，组间夹左右变化'},{id:'bullet',label:'子弹',description:'左左右右 / 右右左左为核心，穿插不规则左右左'},{id:'ladder',label:'梯子',description:'密集、连续的一长串左右交替'},{id:'gun',label:'枪',description:'同一方向连续 4–8 次，换方向继续连打'}];
const one=(items,random)=>items[Math.floor(random()*items.length)];
const shuffle=(items,random)=>{for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;};
const sizes={basic:[1,4,8],cloud:[4,5],shield:[4,5,6],bullet:[4,7,9],ladder:[16,20,24],gun:[4,6,8]};
const alternate=(a,b,n)=>Array.from({length:n},(_,i)=>i%2?b:a);
export function generatePattern(selected,length=32,random=Math.random){
 const ids=[...new Set(selected)].filter(id=>TYPES.some(t=>t.id===id));if(!ids.length)throw Error('请选择至少一种障碍');
 length=Math.max(16,Math.min(128,Math.round(length)));length=Math.ceil(length/4)*4;
 if(ids.length===1&&ids[0]==='basic')return shuffle(Array.from({length},(_,i)=>[UP,DOWN,LEFT,RIGHT][i%4]),random);
 if(ids.length===1&&ids[0]==='ladder'){const a=one([LEFT,RIGHT],random);return alternate(a,a===LEFT?RIGHT:LEFT,length);}
 const allowed=[...new Set(ids.flatMap(id=>sizes[id]))],memo=new Map;
 function fill(n){if(n===0)return true;if(n<0)return false;const key='f:'+n;if(memo.has(key))return memo.get(key);const ok=allowed.some(size=>size<=n&&fill(n-size));memo.set(key,ok);return ok;}
 function complete(n,required){if(n<0)return false;if(!required.length)return fill(n);const key=n+':'+required.join(',');if(memo.has(key))return memo.get(key);const [id,...rest]=required,ok=sizes[id].some(size=>complete(n-size,rest));memo.set(key,ok);return ok;}
 // Preserve complete pattern groups and guarantee every selected category in each round.
 while(!complete(length,ids))length+=4;
 const result=[];
 function block(id,n){const a=one([LEFT,RIGHT],random),b=a===LEFT?RIGHT:LEFT,v=one([UP,DOWN],random);switch(id){
 case'basic':return Array.from({length:n},()=>one([UP,DOWN,LEFT,RIGHT],random));
 case'cloud':return [...(n===5?[v,v===UP?DOWN:UP]:[v]),a,b,a];
 case'shield':return [v,v,...alternate(a,b,n-2)];
 case'bullet':return [a,a,b,b,...(n===4?[]:n===7?[a,b,a]:[a,b,a,b,b])];
 case'ladder':return alternate(a,b,n);
 case'gun':return Array(n).fill(one([UP,DOWN,LEFT,RIGHT].filter(bit=>bit!==result.at(-1)),random));}}
 const required=shuffle([...ids],random);
 while(required.length){const id=required.shift(),available=sizes[id].filter(size=>complete(length-result.length-size,required)),n=one(available,random);result.push(...block(id,n));}
 const weights={basic:1,cloud:5,shield:5,bullet:3,ladder:1,gun:1};
 while(result.length<length){const remain=length-result.length,candidates=ids.flatMap(id=>sizes[id].filter(n=>fill(remain-n)).flatMap(n=>Array(weights[id]).fill({id,n}))),item=one(candidates,random);result.push(...block(item.id,item.n));}
 return result;
}
export function judge(deltaMs){const delta=Math.abs(deltaMs);return delta<=42?{label:'Perfect',points:1}:delta<=84?{label:'Great',points:.9}:delta<=144?{label:'Cool',points:.8}:delta<=200?{label:'Poor',points:.5}:{label:'Miss',points:0};}
export function score(notes){return notes.length?Math.round(notes.reduce((total,n)=>total+(n.points||0),0)/notes.length*10000)/100:0;}
export function compare(current,previous){if(previous==null)return{symbol:'—',className:'same',delta:0};const delta=Math.round((current-previous)*100)/100;return{symbol:delta>0?'↑':delta<0?'↓':'→',className:delta>0?'up':delta<0?'down':'same',delta};}
export function physicalMask(event){const keys={ArrowUp:UP,ArrowDown:DOWN,ArrowLeft:LEFT,ArrowRight:RIGHT,Numpad8:UP,Numpad2:DOWN,Numpad4:LEFT,Numpad6:RIGHT,Numpad7:UP|LEFT,Numpad9:UP|RIGHT,Numpad1:DOWN|LEFT,Numpad3:DOWN|RIGHT};const fallback={'8':UP,'2':DOWN,'4':LEFT,'6':RIGHT,'7':UP|LEFT,'9':UP|RIGHT,'1':DOWN|LEFT,'3':DOWN|RIGHT,Home:UP|LEFT,PageUp:UP|RIGHT,End:DOWN|LEFT,PageDown:DOWN|RIGHT};return keys[event.code]??keys[event.key]??((!event.code||event.code==='Unidentified')?fallback[event.key]??0:0);}
export function keyToken(event){return event.code&&event.code!=='Unidentified'?event.code:event.key;}
