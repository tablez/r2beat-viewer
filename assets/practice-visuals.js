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
export function laneGeometry(width){const trackWidth=Math.min(270,Math.max(120,width-48)),cell=trackWidth/3,left=(width-trackWidth)/2;return{left,width:trackWidth,cell,centers:[left+cell*.5,left+cell*1.5,left+cell*2.5],size:Math.min(64,cell*.78)};}
