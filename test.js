
(function(){
'use strict';
let DB={};
fetch("https://gh-proxy.org/https://raw.githubusercontent.com/89156/userjs/refs/heads/main/quiz_db.json")
.then(r=>r.json()).then(j=>{
    DB=j;

    const tryHighlight=()=>{
        if(document.querySelector('.option')) highlight();
        else setTimeout(tryHighlight,100);
    };
    tryHighlight();
});

const buildOptKey=o=>{
    let k=o.innerText.trim();
    const img=o.querySelector('img'), aud=o.querySelector('audio');
    if(img) k+=`|img:${img.src}`;
    if(aud) k+=`|audio:${aud.src}`;
    return k;
};



const highlight=()=>{
    const q=document.querySelector('.question-text');
    if(!q) return;
    let key=q.innerText.trim();
    if(key.includes('请找出与题目语音同角色的选项')) return;
    const box=q.closest('.question-container');
    if(box){
        const s=box.querySelector('audio source'), i=box.querySelector('img');
        if(s) key+=`|audio:${s.src}`;
        if(i) key+=`|img:${i.src}`;
    }
    const ops=[...document.querySelectorAll('.option')];
    ops.forEach(o=>{o.style.border=''});
    const ans=DB[key];
    if(ans){
        const hit=ops.find(o=>buildOptKey(o)===ans);
        if(hit) hit.style.border='5px solid lime';
    }
};

new MutationObserver(highlight).observe(document.body,{childList:true,subtree:true});
})();
