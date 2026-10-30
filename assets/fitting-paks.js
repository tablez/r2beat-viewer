// Read only the footer/index and requested entry; never load multi-GB packs into RAM.
export class LocalPaks {
 constructor(decode){this.decode=decode;this.entries=new Map()}
 get count(){return this.entries.size}
 paths(){return this.entries.keys()}
 has(path){return this.entries.has(path.toLowerCase())}
 async load(files,onProgress=()=>{}){const next=new Map(this.entries);let valid=0;
  for(const file of files){if(!/^rnr_char.*\.pak$/i.test(file.name))continue;onProgress('读取 '+file.name+' 的索引…');if(file.size<23)throw Error(file.name+' 不是有效资源包');const footer=new DataView(await file.slice(-9).arrayBuffer()),offset=footer.getUint32(0,true),version=footer.getUint8(8);if(version!==18||offset>=file.size-9)throw Error(file.name+' 的包格式不受支持');const bytes=new Uint8Array(await file.slice(offset,file.size-9).arrayBuffer()),view=new DataView(bytes.buffer),decoder=new TextDecoder('gb18030');let found=0;
   // Some client updates leave stale footer counts; validate each indexed path.
   for(let i=14;i+9<bytes.length;i++){if(bytes[i]!==114||bytes[i+1]!==110||bytes[i+2]!==114||bytes[i+3]!==95||bytes[i+4]!==99||bytes[i+5]!==104||bytes[i+6]!==97||bytes[i+7]!==114||bytes[i+8]!==47)continue;const start=i-14,length=bytes[start],type=bytes[start+1];if(!length||i+length>=bytes.length||bytes[i+length]!==0||type>3)continue;const dataOffset=view.getUint32(start+2,true),encodedSize=view.getUint32(start+6,true),originalSize=view.getUint32(start+10,true);if(!encodedSize||type===2||dataOffset+encodedSize>offset||originalSize>100000000)continue;const path=decoder.decode(bytes.subarray(i,i+length)).replaceAll('\\','/').toLowerCase();next.set(path,{file,type,dataOffset,encodedSize,originalSize});found++;i+=length;}
   if(found)valid++;
  }
  if(!valid)throw Error('请选择游戏目录中的 rnr_char1.pak～rnr_char9.pak、rnr_charR.pak 等角色包。');this.entries=next;
 }
 async read(path){const entry=this.entries.get(path.toLowerCase());if(!entry)throw Error('本地资源包中没有 '+path);const bytes=new Uint8Array(await entry.file.slice(entry.dataOffset,entry.dataOffset+entry.encodedSize).arrayBuffer());const data=this.decode(bytes,{...entry,dataOffset:0});if(!data||data.byteLength!==entry.originalSize)throw Error('资源解码失败：'+path);return data}
}
