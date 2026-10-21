export const UP=1,DOWN=2,LEFT=4,RIGHT=8;
export const TYPES=[{id:'basic',label:'基础适应',description:'等间隔随机；单方向占 90% 以上，少量组合键'},{id:'cloud',label:'浮云',description:'左右左 / 右左右，穿插上、下'},{id:'shield',label:'盾',description:'连续上上 / 下下，穿插左右'},{id:'bullet',label:'子弹',description:'左左右右，穿插左右左'},{id:'ladder',label:'梯子',description:'连续左右交替'},{id:'gun',label:'枪',description:'同一方向连续四次或更多'}];
const one=(items,random)=>items[Math.floor(random()*items.length)];
const shuffle=(items,random)=>{for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;};
export function generatePattern(selected,length=32,random=Math.random){
 const ids=[...new Set(selected)].filter(id=>TYPES.some(t=>t.id===id));if(!ids.length)throw Error('请选择至少一种障碍');
 length=Math.max(16,Math.min(128,Math.round(length)));
 const basic=count=>{const diagonalCount=Math.floor(count*.08),arr=Array.from({length:count-diagonalCount},()=>one([UP,DOWN,LEFT,RIGHT],random));for(let i=0;i<diagonalCount;i++)arr.push(one([UP|LEFT,UP|RIGHT,DOWN|LEFT,DOWN|RIGHT],random));return shuffle(arr,random);};
 const block=id=>{const horizontal=one([[LEFT,RIGHT],[RIGHT,LEFT]],random),[a,b]=horizontal,v=one([UP,DOWN],random);switch(id){case'basic':return basic(16);case'cloud':return [v,a,b,a,one([UP,DOWN],random),b,a,b];case'shield':return [v,v,a,b,a,v===UP?DOWN:UP,v===UP?DOWN:UP,b,a,b];case'bullet':return [a,a,b,b,a,a,b,b,a,b,a];case'ladder':return [a,b,a,b,a,b,a,b];case'gun':return Array(4+Math.floor(random()*3)).fill(one([UP,DOWN,LEFT,RIGHT],random));}};
 if(ids.length===1&&ids[0]==='basic')return basic(length);
 // Include every selected pattern once before choosing the following mixed blocks.
 const result=[];for(const id of shuffle([...ids],random))result.push(...block(id));
 const weights={basic:2,cloud:4,shield:4,bullet:3,ladder:1,gun:1};const pool=ids.flatMap(id=>Array(weights[id]).fill(id));while(result.length<length)result.push(...block(one(pool,random)));
 // Keep complete groups rather than cutting the final shield / bullet / gun in half.
 return result;
}
export function judge(deltaMs){const delta=Math.abs(deltaMs);return delta<=42?{label:'Perfect',points:1}:delta<=84?{label:'Great',points:.8}:delta<=144?{label:'Cool',points:.5}:delta<=200?{label:'Poor',points:.2}:{label:'Miss',points:0};}
export function score(notes){return notes.length?Math.round(notes.reduce((total,n)=>total+(n.points||0),0)/notes.length*10000)/100:0;}
export function compare(current,previous){if(previous==null)return{symbol:'—',className:'same',delta:0};const delta=Math.round((current-previous)*100)/100;return{symbol:delta>0?'↑':delta<0?'↓':'→',className:delta>0?'up':delta<0?'down':'same',delta};}
export function physicalMask(event){const keys={ArrowUp:UP,ArrowDown:DOWN,ArrowLeft:LEFT,ArrowRight:RIGHT,Numpad8:UP,Numpad2:DOWN,Numpad4:LEFT,Numpad6:RIGHT,Numpad7:UP|LEFT,Numpad9:UP|RIGHT,Numpad1:DOWN|LEFT,Numpad3:DOWN|RIGHT};const fallback={'8':UP,'2':DOWN,'4':LEFT,'6':RIGHT,'7':UP|LEFT,'9':UP|RIGHT,'1':DOWN|LEFT,'3':DOWN|RIGHT,Home:UP|LEFT,PageUp:UP|RIGHT,End:DOWN|LEFT,PageDown:DOWN|RIGHT};return keys[event.code]??keys[event.key]??((!event.code||event.code==='Unidentified')?fallback[event.key]??0:0);}
export function keyToken(event){return event.code&&event.code!=='Unidentified'?event.code:event.key;}
