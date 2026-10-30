(() => {
  const root=document.documentElement;
  const themes={day:'白天',line:'极简线条',work:'摸鱼',night:'黑夜'};
  const scenes={
    excel:{name:'Excel 表格',title:'运营数据分析.xlsx · Excel',tabs:['开始','插入','页面布局','公式','数据','审阅','视图'],tools:['粘贴  ▾','字体  等线 · 11','对齐方式  ≡','数字  常规 ▾','筛选  ▾'],formula:'=SUM(数据明细!B2:B1104)',status:'就绪 · Sheet1',right:'普通视图   ▦   100%'},
    ppt:{name:'PPT 演示',title:'项目分析报告.pptx · PowerPoint',tabs:['开始','插入','设计','切换','动画','幻灯片放映','审阅'],tools:['新建幻灯片  ▾','版式  ▾','字体  等线 · 18','排列  ▾','形状样式'],formula:'分析图表 / 当前页面',status:'项目分析 · 演示文稿',right:'备注   □   100%'},
    photoshop:{name:'Photoshop',title:'数据可视化.psd · Adobe Photoshop',tabs:['文件','编辑','图像','图层','文字','选择','滤镜','视图'],tools:['移动工具  ↗','自动选择  ▣','图层  ▾','显示变换控件  □','工作区：基本功能'],formula:'数据可视化.psd @ 100% (图层 1, RGB/8)',status:'文档：数据可视化.psd',right:'RGB / 8 位   100%'},
    vscode:{name:'VS Code',title:'analytics.ts — workspace — Visual Studio Code',tabs:['文件','编辑','选择','查看','转到','运行','终端','帮助'],tools:['资源管理器','analytics.ts','预览 · 数据视图','输出','终端'],formula:'workspace / src / analytics.ts',status:'main ⑂ · 分析视图',right:'UTF-8   TypeScript   Ln 1, Col 1'},
    commerce:{name:'生意参谋仪表盘',title:'生意参谋 · 数据分析工作台',tabs:['首页','经营分析','流量','品类','交易','服务','市场'],tools:['店铺概况','数据趋势','指标对比','统计周期：今日','数据明细'],formula:'经营分析 / 数据趋势 / 明细视图',status:'数据工作台 · 经营分析',right:'本地分析视图'}
  };
  let theme='day',scene='excel';
  try {const saved=JSON.parse(localStorage.getItem('r2beat-appearance-v1')||'{}');if(themes[saved.theme])theme=saved.theme;if(scenes[saved.scene])scene=saved.scene;} catch {}
  function apply(){
    root.dataset.theme=theme;root.dataset.appearance=theme==='night'?'dark':'light';root.dataset.scene=scene;
    try{localStorage.setItem('r2beat-appearance-v1',JSON.stringify({theme,scene}));}catch{}
    if(!document.getElementById('appearance-bar'))return;
    document.getElementById('appearance-theme').value=theme;
    document.getElementById('appearance-scene').value=scene;
    document.getElementById('appearance-scene-label').hidden=theme!=='work';
    document.getElementById('work-chrome').hidden=theme!=='work';document.getElementById('work-status').hidden=theme!=='work';
    const view=scenes[scene];
    document.getElementById('work-title').textContent=view.title;
    const tabs=document.getElementById('work-tabs');tabs.replaceChildren(...view.tabs.map(t=>{const e=document.createElement('span');e.textContent=t;return e;}));
    const tools=document.getElementById('work-tools');tools.replaceChildren(...view.tools.map(t=>{const e=document.createElement('span');e.className='work-tool-group';e.textContent=t;return e;}));
    document.getElementById('work-formula-value').textContent=view.formula;
    document.getElementById('work-status-left').textContent=view.status;document.getElementById('work-status-right').textContent=view.right;
    document.title=theme==='work'?view.title:'R2Beat 谱面预览器';
    window.dispatchEvent(new Event('resize'));
  }
  apply();
  function mount(){
    const bar=document.createElement('div');bar.id='appearance-bar';
    bar.innerHTML='<label>主题 <select id="appearance-theme" aria-label="主题"></select></label><label id="appearance-scene-label" hidden>场景 <select id="appearance-scene" aria-label="摸鱼场景"></select></label><a class="r2-practice-link" href="./practice.html?v=sidebar-rhythm-20261021">专项练习</a><a class="r2-practice-link" href="./fitting.html">试衣间</a><a class="r2-practice-link" href="./shop.html">商城图鉴</a><span class="appearance-note">外观选择自动保存</span><span class="deployment-credit">原作者：<a href="http://47.108.209.178/" target="_blank" rel="noopener noreferrer">[AG.M]夜明</a> · 修改部署版（非原作者发布）</span>';
    const chrome=document.createElement('div');chrome.id='work-chrome';chrome.hidden=true;
    chrome.innerHTML='<div class="work-title"><strong id="work-title"></strong><span class="window-actions" aria-hidden="true">− □ ×</span></div><div class="work-tabs" id="work-tabs" aria-hidden="true"></div><div class="work-tools" id="work-tools" aria-hidden="true"></div><div class="work-formula"><strong>A1</strong><span>fx</span><span id="work-formula-value"></span></div>';
    document.body.prepend(bar,chrome);
    for(const [value,label] of Object.entries(themes))document.getElementById('appearance-theme').add(new Option(label,value));
    for(const [value,view] of Object.entries(scenes))document.getElementById('appearance-scene').add(new Option(view.name,value));
    const status=document.createElement('div');status.id='work-status';status.hidden=true;status.innerHTML='<span id="work-status-left"></span><span id="work-status-right"></span>';document.body.append(status);
    document.getElementById('appearance-theme').addEventListener('change',e=>{theme=e.target.value;apply();});
    document.getElementById('appearance-scene').addEventListener('change',e=>{scene=e.target.value;apply();});
    apply();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
