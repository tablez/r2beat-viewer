// Match the original viewer Kind → bitmap/lane mapping; lanes describe the obstacle position, not the input direction.
export const PRACTICE_VISUALS={
  "1": {
    "file": "up-Bnk8qQE9.png",
    "src": "./assets/up-Bnk8qQE9.png?v=cbc000359622",
    "lane": 0,
    "kind": 16,
    "label": "跳跃"
  },
  "2": {
    "file": "door-znEa3O55.png",
    "src": "./assets/door-znEa3O55.png?v=d90355360eda",
    "lane": 0,
    "kind": 17,
    "label": "下蹲"
  },
  "4": {
    "file": "vlc-0Kp6rhIC.png",
    "src": "./assets/vlc-0Kp6rhIC.png?v=d044e293c54c",
    "lane": 1,
    "kind": 18,
    "label": "右钉子（按左）"
  },
  "8": {
    "file": "vlc-0Kp6rhIC.png",
    "src": "./assets/vlc-0Kp6rhIC.png?v=d044e293c54c",
    "lane": -1,
    "kind": 19,
    "label": "左钉子（按右）"
  },
  "5": {
    "file": "leftup-BewkGSa2.png",
    "src": "./assets/leftup-BewkGSa2.png?v=c75b7579f6b7",
    "lane": -1,
    "kind": 20,
    "label": "左上组合"
  },
  "9": {
    "file": "rightup-5QEk9Oxf.png",
    "src": "./assets/rightup-5QEk9Oxf.png?v=0ba4de8c905a",
    "lane": 1,
    "kind": 21,
    "label": "右上组合"
  },
  "6": {
    "file": "leftskate-BRkFBN9L.png",
    "src": "./assets/leftskate-BRkFBN9L.png?v=a2d243147af5",
    "lane": -1,
    "kind": 22,
    "label": "左下组合"
  },
  "10": {
    "file": "rightskate-p50UbzSU.png",
    "src": "./assets/rightskate-p50UbzSU.png?v=d6a7198b053d",
    "lane": 1,
    "kind": 23,
    "label": "右下组合"
  }
};
export function visualForMask(mask){return PRACTICE_VISUALS[mask]??null;}
// At 100%, spike centers align with the visible door edges (x=5 and x=59 in its 64px sprite).
export function laneGeometry(width,spread=1){const available=Math.min(270,Math.max(60,width-48)),size=Math.min(64,available/3*.78),factor=Math.max(.5,Math.min(3.5,Number(spread)||1)),cell=size*27/64*factor,trackWidth=cell*3,left=(width-trackWidth)/2;return{left,width:trackWidth,cell,centers:[width/2-cell,width/2,width/2+cell],size};}
