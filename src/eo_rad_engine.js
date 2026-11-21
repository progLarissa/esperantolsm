
/* ---------- RADIKOJ: ripetado laŭ intervaloj ---------- */
const RADS=[]; RAD_GROUPS.forEach((g,gi)=>g.s.trim().split('\n').forEach(l=>{ const [w,pt,d]=l.split('|'); const word=w.trim();
  RADS.push({id:word.replace('/',''), w:word, root:word.split('/')[0], h:word.replace('/',''), pt:(pt||'').trim(), d:(d||'').split(';').map(x=>x.trim()).filter(Boolean).map(x=>x.split('=').map(y=>y.trim())), g:gi}); }));
const RADIX={}; RADS.forEach(r=>RADIX[r.id]=r);
const RIV=[0,1,2,4,8,16,35,80,180];
const radToday=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/86400000);
function radCfg(){ S.radCfg=Object.assign({n:10,dir:'eo',from:0},S.radCfg||{}); return S.radCfg; }
function radNewToday(){ const t=radToday(); if(!S.radDay||S.radDay.d!==t) S.radDay={d:t,n:0,extra:0}; return S.radDay; }
function radStats(){
  const t=radToday(); let due=0,learn=0,known=0;
  for(const id in S.rad){ const [b,d]=S.rad[id]; if(!RADIX[id]) continue; if(d<=t) due++; if(b>=4) known++; else learn++; }
  const nd=radNewToday(), newLeft=Math.max(0,radCfg().n+nd.extra-nd.n), unseen=RADS.length-learn-known;
  return {due,learn,known,unseen,newLeft:Math.min(newLeft,unseen),done:!!S.radLog[dayKey()]};
}
function radWord(r,cls){ const p=r.w.split('/'); return `<span class="${cls||'rw'}"><b>${esc(p[0])}</b>${p[1]?`<span class="end">${esc(p[1])}</span>`:''}</span>`; }
function radNewIds(k){
  const from=radCfg().from, order=RADS.filter(r=>r.g>=from).concat(RADS.filter(r=>r.g<from));
  const out=[]; for(const r of order){ if(out.length>=k) break; if(!S.rad[r.id]) out.push(r.id); } return out;
}
let radQ=null, radIdx=0, radShown=false, radMode='ripeto', radGrp=-1, radSearch='', radSess={ok:0,no:0};
function radBuildQueue(){
  const t=radToday();
  const due=Object.keys(S.rad).filter(id=>RADIX[id]&&S.rad[id][1]<=t).sort((a,b)=>S.rad[a][1]-S.rad[b][1]||S.rad[a][0]-S.rad[b][0]);
  const nw=radNewIds(radStats().newLeft);
  const q=[]; let i=0,j=0; while(i<due.length||j<nw.length){ for(let k=0;k<3&&i<due.length;k++) q.push(due[i++]); if(j<nw.length) q.push(nw[j++]); }
  radQ=q; radIdx=0; radShown=false; radSess={ok:0,no:0};
}
function radGrade(id,g){
  const t=radToday(), cur=S.rad[id], isNew=!cur;
  let b=cur?cur[0]:0;
  if(isNew){ const nd=radNewToday(); nd.n++; }
  if(g==='know'){ b=5; }
  else if(g==='no'){ b=0; }
  else if(g==='hard'){ b=Math.max(1,b); }
  else { b=Math.min(b+1,RIV.length-1); }
  S.rad[id]=[b,t+(b===0?0:RIV[b])];
  if(g==='no'){ radQ.splice(Math.min(radIdx+4,radQ.length),0,id); radSess.no++; } else radSess.ok++;
  save(); tick();
}
function radIvl(id,g){ const cur=S.rad[id]; let b=cur?cur[0]:0; if(g==='know') b=5; else if(g==='no') b=0; else if(g==='hard') b=Math.max(1,b); else b=Math.min(b+1,RIV.length-1); const d=b===0?0:RIV[b]; return d===0?'hoje de novo':d===1?'amanhã':d<30?`em ${d} dias`:d<60?'em 1 mês':`em ${Math.round(d/30)} meses`; }
function renderRoots(){
  const st=radStats(), C=radCfg();
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ĉiutage · radikoj</div><h1 class="title">Radikoj</h1>
   <p class="subtitle">${RADS.length} raízes em ordem de utilidade, de «kaj» a «verŝajna», cada uma com os derivados mais comuns. Com os afixos que você já conhece, elas formam dezenas de milhares de palavras. Cinco minutos por dia: o caderno decide o que volta e quando.</p></header>
   <div class="rgrid rad4">
    <div class="card ${st.due+st.newLeft?'due':''}"><span class="lab">Hodiaŭ</span><b class="big">${st.due+st.newLeft}<small> kartoj</small></b><span class="note">${st.due} por revisar · ${st.newLeft} novas</span></div>
    <div class="card"><span class="lab">Lernataj</span><b class="big">${st.learn}</b><span class="note">ainda no começo</span></div>
    <div class="card"><span class="lab">Konataj</span><b class="big">${st.known}</b><span class="note">voltam em 16 dias ou mais</span></div>
    <div class="card"><span class="lab">Ankoraŭ ne viditaj</span><b class="big">${st.unseen}</b><span class="note">de ${RADS.length}</span></div>
   </div>
   <div class="seg" role="group">${[['ripeto','Ripeto'],['listo','Listo'],['agordoj','Agordoj']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${radMode===k}">${l}</button>`).join('')}</div>
   <div id="radbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ radMode=b.dataset.m; radQ=null; renderRoots(); });
  const box=$('#radbody');
  if(radMode==='listo') return radList(box);
  if(radMode==='agordoj') return radSettings(box);
  if(!radQ) radBuildQueue();
  radCard(box);
}
function radSettings(box){
  const C=radCfg();
  box.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Agordoj</span><h3>Como o treino funciona</h3></div></div>
   <div class="radset">
    <label><span class="lab">Raízes novas por dia</span><select id="rn" class="vsel">${[5,10,15,20,30].map(n=>`<option value="${n}" ${C.n===n?'selected':''}>${n}</option>`).join('')}</select></label>
    <label><span class="lab">Direção</span><select id="rd" class="vsel"><option value="eo" ${C.dir==='eo'?'selected':''}>esperanto → português (reconhecer)</option><option value="pt" ${C.dir==='pt'?'selected':''}>português → esperanto (escrever)</option><option value="mix" ${C.dir==='mix'?'selected':''}>misturado</option></select></label>
    <label><span class="lab">Novas a partir do grupo</span><select id="rf" class="vsel">${RAD_GROUPS.map((g,i)=>`<option value="${i}" ${C.from===i?'selected':''}>${i+1} · ${g.t} (${g.lvl})</option>`).join('')}</select></label>
   </div>
   <p class="note">10 novas por dia é um bom ritmo para 5 a 8 minutos. As revisões crescem nas primeiras semanas e depois se estabilizam. Se um dia passar de 60 cartas, reduza as novas por alguns dias.</p>
   <p class="note">A ordem dos intervalos: errou → volta hoje; acertou → 1, 2, 4, 8, 16, 35, 80 e 180 dias. «Jam konas» manda a carta direto para 16 dias: use nas palavras que você já reconhece do português ou do espanhol. Quem já estudou as unidades 1 a 4 pode começar as novas pelo grupo 2.</p>
   <div class="btnrow"><button class="btn ghost" id="rreset" type="button">Recomeçar do zero</button></div></section>`;
  $('#rn').onchange=e=>{ C.n=+e.target.value; save(); };
  $('#rd').onchange=e=>{ C.dir=e.target.value; save(); };
  $('#rf').onchange=e=>{ C.from=+e.target.value; save(); };
  $('#rreset').onclick=()=>{ if(!confirmReset()) return; S.rad={}; S.radDay=null; S.radLog={}; save(); radQ=null; renderRoots(); };
}
let radResetArm=0;
function confirmReset(){ const now=Date.now(); if(now-radResetArm<4000){ radResetArm=0; return true; } radResetArm=now; toast('Toque de novo em «Recomeçar do zero» para confirmar: todo o progresso das raízes será apagado.'); return false; }
function radCard(box){
  if(radIdx>=radQ.length){
    if(radQ.length){ S.radLog[dayKey()]=true; save(); }
    const st=radStats();
    box.innerHTML=`<section class="card drill radfin"><span class="pen" style="font-size:30px">${radQ.length?'Farite por hodiaŭ!':'Nenio por hodiaŭ'}</span>
     <p class="lead" style="margin:10px 0">${radQ.length?`${radSess.ok} acertos e ${radSess.no} erros nesta sessão. As cartas voltam sozinhas quando for a hora.`:'Não há revisões pendentes e as novas de hoje já foram vistas.'}</p>
     <div class="btnrow" style="justify-content:center"><button class="btn primary" id="rmore" type="button">+5 raízes novas</button><a class="btn" href="#plan">Voltar ao plano</a></div></section>`;
    $('#rmore').onclick=()=>{ radNewToday().extra+=5; save(); radQ=null; renderRoots(); };
    renderNav(route()); return;
  }
  const id=radQ[radIdx], r=RADIX[id], isNew=!S.rad[id], C=radCfg();
  const dir=C.dir==='mix'?(id.length%2?'eo':'pt'):C.dir;
  const left=radQ.length-radIdx;
  const back=`<div class="radback"><div class="radpt">${esc(r.pt)}</div>${r.d.length?`<ul class="radder">${r.d.map(([e,p])=>`<li><b>${esc(e)}</b>${p?` <span>${esc(p)}</span>`:''}</li>`).join('')}</ul>`:''}</div>`;
  const btns=isNew?[['no','Ne sciis'],['ok','Sciis'],['know','Jam konas ✓✓']]:[['no','Ne sciis'],['hard','Malfacile'],['ok','Sciis']];
  const gradeRow=`<div class="radgrade">${btns.map(([g,l],i)=>`<button class="btn ${g==='ok'?'primary':g==='no'?'':'ghost'}" type="button" data-g="${g}">${l}<small>${i+1} · ${radIvl(id,g)}</small></button>`).join('')}</div>`;
  box.innerHTML=`<section class="card drill radcard">
    <div class="radmeta"><span>${isNew?'<b>nova</b>':'revisão'} · grupo ${r.g+1} · ${RAD_GROUPS[r.g].lvl}</span><span>${left} ${left===1?'carta':'cartas'}</span></div>
    ${dir==='eo'?`<div class="radfront">${radWord(r,'rw big')}</div>`:`<div class="radfront"><div class="radpt">${esc(r.pt)}</div><input id="rin" autocomplete="off" autocapitalize="off" spellcheck="false" lang="eo" placeholder="em esperanto… (cx → ĉ)" aria-label="resposta"><div class="fb" id="rfb"></div></div>`}
    <div id="rback" hidden>${dir==='eo'?back:`<div class="radback"><div class="radfront">${radWord(r,'rw big')}</div>${r.d.length?`<ul class="radder">${r.d.map(([e,p])=>`<li><b>${esc(e)}</b>${p?` <span>${esc(p)}</span>`:''}</li>`).join('')}</ul>`:''}</div>`}${gradeRow}</div>
    <div class="btnrow" id="rshowrow" style="justify-content:center"><button class="btn primary" id="rshow" type="button">${dir==='eo'?'Montri':'Kontroli'} <small style="opacity:.7">(espaço)</small></button></div>
   </section>
   <p class="note">Tente lembrar o significado antes de virar a carta. Seja honesta na nota: «Ne sciis» não é castigo, só faz a carta voltar mais cedo.</p>`;
  radShown=false;
  const show=()=>{ if(radShown) return; radShown=true;
    if(dir==='pt'){ const v=canon(xsys($('#rin').value)), h=canon(r.h), rt=canon(r.root); const ok=v&&(v===h||(r.w.includes('/')&&v.replace(/(oj|aj|on|an|ojn|ajn|as|is|os|us|o|a|e|i|u)$/,'')===rt));
      $('#rfb').innerHTML=ok?'<span class="mark ok">Ĝuste! ✓</span>':`<span class="mark no">${v?esc($('#rin').value):'—'}</span>`; $('#rin').disabled=true;
      box.querySelectorAll('[data-g]').forEach(b=>b.classList.toggle('sugg',(ok&&b.dataset.g==='ok')||(!ok&&b.dataset.g==='no'))); }
    $('#rback').hidden=false; $('#rshowrow').hidden=true; };
  $('#rshow').onclick=show;
  const inp=$('#rin'); if(inp){ inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); if(!radShown) show(); else { const s=box.querySelector('.sugg'); if(s) s.click(); } } }); inp.focus({preventScroll:true}); }
  box.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{ radGrade(id,b.dataset.g); radIdx++; radCard(box); const n=$('#main .rad4 .big'); if(n){ const s=radStats(); n.innerHTML=`${s.due+s.newLeft}<small> kartoj</small>`; } });
}
document.addEventListener('keydown',e=>{
  if(route().type!=='roots'||radMode!=='ripeto'||!$('.radcard')) return;
  if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)&&!e.target.disabled) return;
  if(e.key===' '||e.key==='Enter'){ if(!radShown){ e.preventDefault(); $('#rshow')&&$('#rshow').click(); } return; }
  if(radShown&&/^[123]$/.test(e.key)){ const b=document.querySelectorAll('.radgrade [data-g]')[+e.key-1]; if(b){ e.preventDefault(); b.click(); } }
});
function radList(box){
  const st=r=>{ const c=S.rad[r.id]; return !c?'':c[0]>=4?'<span class="rpill k">konata</span>':'<span class="rpill l">lernata</span>'; };
  const draw=()=>{ const q=canon(xsys(radSearch));
    const rows=RADS.filter(r=>(radGrp<0||r.g===radGrp)&&(!q||canon(r.h).includes(q)||canon(r.pt).includes(q)||r.d.some(([e,p])=>canon(e).includes(q)||canon(p||'').includes(q))));
    $('#rlist').innerHTML=rows.length?`<div class="tw"><table class="tbl lextbl radtbl">${rows.slice(0,400).map(r=>`<tr><td>${radWord(r)}</td><td class="pt">${esc(r.pt)}${st(r)}</td><td class="pt">${r.d.map(([e,p])=>`<b>${esc(e)}</b> ${esc(p||'')}`).join(' · ')}</td></tr>`).join('')}</table></div>${rows.length>400?`<p class="note">Mostrando 400 de ${rows.length}. Use a busca ou escolha um grupo.</p>`:''}`:'<p class="note">Nenhuma raiz encontrada.</p>'; };
  box.innerHTML=`<div class="chipsel" style="margin-bottom:12px"><button data-g="-1" aria-pressed="${radGrp<0}">ĉiuj</button>${RAD_GROUPS.map((g,i)=>`<button data-g="${i}" aria-pressed="${radGrp===i}">${i+1} · ${g.t} <small>${g.lvl}</small></button>`).join('')}</div>
   <input id="rsearch" class="vsel" style="width:min(100%,360px);margin-bottom:12px" placeholder="Serĉi en Esperanto aŭ en la portugala…" value="${esc(radSearch)}" autocomplete="off">
   <div id="rlist"></div>`;
  box.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{ radGrp=+b.dataset.g; radList(box); });
  $('#rsearch').oninput=e=>{ radSearch=e.target.value; draw(); };
  draw();
}
