
/* ---------- VERBOJ KAJ PARTICIPOJ ---------- */
const VKEYS=Object.keys(VERBI).sort((a,b)=>a.localeCompare(b,'eo'));
const PRON=['mi','vi','li','ŝi','ni','ili','oni'];
const VFORMS=[
 {k:'as',g:'fin',lab:'prezenco · -as',pt:'presente'},
 {k:'is',g:'fin',lab:'pasinteco · -is',pt:'passado'},
 {k:'os',g:'fin',lab:'futuro · -os',pt:'futuro'},
 {k:'us',g:'fin',lab:'kondicionalo · -us',pt:'condicional («eu faria»)'},
 {k:'u',g:'fin',lab:'volitivo · -u',pt:'volitivo («que eu faça», ordem)'},
 {k:'anta',g:'pa',lab:'aktiva participo · -anta',pt:'adjetivo: «que está fazendo» (agora)'},
 {k:'inta',g:'pa',lab:'aktiva participo · -inta',pt:'adjetivo: «que fez» (antes)'},
 {k:'onta',g:'pa',lab:'aktiva participo · -onta',pt:'adjetivo: «que vai fazer» (depois)'},
 {k:'ante',g:'pe',lab:'adverba participo · -ante',pt:'gerúndio: «fazendo»'},
 {k:'inte',g:'pe',lab:'adverba participo · -inte',pt:'«tendo feito», «depois de fazer»'},
 {k:'onte',g:'pe',lab:'adverba participo · -onte',pt:'«prestes a fazer», «antes de fazer»'},
 {k:'anto',g:'po',lab:'substantivo · -anto',pt:'pessoa que faz (agora)'},
 {k:'into',g:'po',lab:'substantivo · -into',pt:'pessoa que fez'},
 {k:'ata',g:'pp',tr:1,lab:'pasiva participo · -ata',pt:'«que está sendo feito»'},
 {k:'ita',g:'pp',tr:1,lab:'pasiva participo · -ita',pt:'«feito» (já)'},
 {k:'ota',g:'pp',tr:1,lab:'pasiva participo · -ota',pt:'«que vai ser feito»'}
];
const VGROUPS={fin:'tempoj',pa:'aktivaj participoj',pe:'adverbaj participoj (-e)',po:'substantivoj (-anto)',pp:'pasivaj participoj'};
const vroot=v=>v.slice(0,-1);
function vform(v,f,p){ const r=vroot(v); return f.g==='fin'? `${p} ${r}${f.k}` : r+f.k; }
let vSel={g:['fin']};
try{ const v=JSON.parse(localStorage.getItem(KEY+'-v2')||'null'); if(v&&Array.isArray(v.g)) vSel.g=v.g.filter(g=>VGROUPS[g]); if(!vSel.g.length) vSel.g=['fin']; }catch(e){}
let streak=0, cur=null, vMode='drill', vTab=VKEYS.includes('lerni')?'lerni':VKEYS[0];
function saveVSel(){ try{localStorage.setItem(KEY+'-v2',JSON.stringify(vSel));}catch(e){} }
function renderVerbi(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Iloj · verboj</div><h1 class="title">Verboj kaj participoj</h1><p class="subtitle">Em esperanto não existe verbo irregular: o desafio é escolher a terminação certa, sobretudo nos particípios. Escreva a forma pedida, Enter para conferir e Enter de novo para o próximo.</p></header>
   <div class="seg" role="group"><button data-m="drill" aria-pressed="${vMode==='drill'}">Ekzerco</button><button data-m="table" aria-pressed="${vMode==='table'}">Tabelo</button></div>
   <div id="vbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ vMode=b.dataset.m; renderVerbi(); });
  if(vMode==='table') return verbTable();
  $('#vbody').innerHTML=`<section class="card drill" id="drill"></section>
   <section class="card"><div class="card-h"><div><span class="lab">Agordoj</span><h3>Kion ekzerci</h3></div><span class="note" id="vstats"></span></div>
   <div class="chipsel" id="selG">${Object.entries(VGROUPS).map(([k,l])=>`<button data-g="${k}" aria-pressed="${vSel.g.includes(k)}">${l}</button>`).join('')}</div>
   <p class="note" style="margin-top:14px">Comece só com os <b>tempoj</b>. Depois da Unuo 10, acrescente os particípios ativos e adverbiais; depois da Unuo 11, os passivos (só aparecem com verbos transitivos). Nos tempos, escreva o pronome e o verbo: <i>ili lernus</i>.</p></section>
   <section class="card"><div class="card-h"><div><span class="lab">Resumo</span><h3>A fórmula inteira</h3></div></div>
    <div class="tw"><table class="tbl c"><tr><th></th><th>agora</th><th>antes</th><th>depois</th></tr><tr><th>tempo</th><td>-as</td><td>-is</td><td>-os</td></tr><tr><th>ativo</th><td>-ant-</td><td>-int-</td><td>-ont-</td></tr><tr><th>passivo</th><td>-at-</td><td>-it-</td><td>-ot-</td></tr></table></div>
    <p class="note">E ainda <b>-us</b> (condicional), <b>-u</b> (volitivo) e <b>-i</b> (infinitivo). Os particípios recebem <b>-a</b> (adjetivo), <b>-o</b> (pessoa ou coisa) ou <b>-e</b> (advérbio).</p></section>`;
  $('#selG').querySelectorAll('button').forEach(b=>b.onclick=()=>{ const g=b.dataset.g, i=vSel.g.indexOf(g); if(i>=0){ if(vSel.g.length>1) vSel.g.splice(i,1); } else vSel.g.push(g); $('#selG').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',vSel.g.includes(x.dataset.g))); saveVSel(); nextVerb(); });
  nextVerb();
}
function verbTable(){
  $('#vbody').innerHTML=`<section class="card"><div class="btnrow" style="margin-bottom:12px"><select id="vsel" class="vsel" aria-label="verbo">${VKEYS.map(k=>`<option value="${k}" ${k===vTab?'selected':''}>${k} · ${esc(VERBI[k].pt)}</option>`).join('')}</select>${canSpeak?'<button class="btn" id="vsay" type="button">▶ Aŭskulti</button>':''}</div><div id="vtab"></div></section>`;
  const forms=()=>{ const v=vTab, r=vroot(v); return {fin:[['-i',v],['-as','mi '+r+'as'],['-is','mi '+r+'is'],['-os','mi '+r+'os'],['-us','mi '+r+'us'],['-u',r+'u!']],act:[['-anta',r+'anta'],['-inta',r+'inta'],['-onta',r+'onta']],adv:[['-ante',r+'ante'],['-inte',r+'inte'],['-onte',r+'onte']],noun:[['-anto',r+'anto'],['-into',r+'into'],['-onto',r+'onto']],pas:[['-ata',r+'ata'],['-ita',r+'ita'],['-ota',r+'ota']]}; };
  const draw=()=>{ const v=vTab, d=VERBI[v], F=forms();
    const grp=(t,rows)=>`<div class="vt"><h4>${t}</h4>${rows.map(([a,b])=>`<div><span>${a}</span>${esc(b)}</div>`).join('')}</div>`;
    $('#vtab').innerHTML=`<div class="vhead"><div class="verbname">${v}</div><div class="vfacts"><span><b>pt</b>${esc(d.pt)}</span><span><b>tipo</b>${d.tr?'transitivo: aceita objeto com -n':'intransitivo: sem objeto direto'}</span></div></div>
     <div class="vgrid">${grp('tempoj',F.fin)}${grp('aktivaj (-a)',F.act)}${grp('adverbaj (-e)',F.adv)}${grp('substantivoj (-o)',F.noun)}${d.tr?grp('pasivaj (-a)',F.pas):''}</div>`; };
  draw();
  $('#vsel').onchange=e=>{ vTab=e.target.value; draw(); };
  const vs=$('#vsay'); if(vs) vs.onclick=()=>{ const F=forms(); speakSeq([{text:[...F.fin,...F.act,...F.adv].map(x=>x[1].replace('!','')).join(', ')}],'vsay'); };
}
function vstats(){ const v=S.verbi; const el=$('#vstats'); if(el) el.textContent=`${v.ok}/${v.tot} ĝustaj · serio ${streak} · rekordo ${v.best}`; }
function nextVerb(){
  const pool=VFORMS.filter(f=>vSel.g.includes(f.g)); if(!pool.length) return;
  let v,f,n=0; do{ v=VKEYS[Math.floor(Math.random()*VKEYS.length)]; f=pool[Math.floor(Math.random()*pool.length)]; n++; }while(f.tr&&!VERBI[v].tr&&n<50);
  const p=f.g==='fin'?PRON[Math.floor(Math.random()*PRON.length)]:'';
  cur={v,f,p,done:false};
  const d=$('#drill'); if(!d) return;
  d.innerHTML=`<div class="verb">${v}</div><div class="note" style="margin-top:4px">${esc(VERBI[v].pt)}</div>
   <div class="meta"><b>${esc(f.lab)}</b>${p?` · ${p}`:''}</div><div class="pers">${esc(f.pt)}</div>
   <input id="vin" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="respondo" placeholder="${p?p+' …':'…'}"><div class="fb" id="vfb"></div><div id="vtab2"></div>`;
  vstats();
  const a=$('#vin'); a.focus({preventScroll:true});
  a.addEventListener('keydown',e=>{ if(e.key!=='Enter') return; e.preventDefault(); if(cur.done){ nextVerb(); return; } checkVerb(); });
}
function checkVerb(){
  const a=$('#vin'); if(!a.value.trim()) return;
  const ans=vform(cur.v,cur.f,cur.p);
  const alts=[ans]; if(cur.f.g==='fin') alts.push(ans.split(' ')[1]);
  const r=judge(a.value,alts);
  cur.done=true; S.verbi.tot++; tick();
  a.style.color=r==='no'?'var(--rosso)':'var(--verde)'; if(r==='no') a.style.textDecoration='line-through';
  if(r==='ok'){ S.verbi.ok++; streak++; S.verbi.best=Math.max(S.verbi.best,streak); $('#vfb').innerHTML='<span class="mark ok">Perfekte! ✓</span>'; }
  else if(r==='acc'){ S.verbi.ok++; $('#vfb').innerHTML=`<span class="mark acc">Quase: atenção às letras com acento · ${esc(ans)}</span>`; }
  else { streak=0; addErr(`v-${cur.v}-${cur.f.k}`,'verb',{v:cur.v,k:cur.f.k,p:cur.p},'Verboj kaj participoj'); $('#vfb').innerHTML=`<span class="mark no">${esc(ans)}</span>`; }
  save(); vstats();
  $('#vtab2').innerHTML=`<p class="note" style="margin-top:14px">radiko <b>${esc(vroot(cur.v))}-</b> + <b>${esc(cur.f.k)}</b> · Enter por la sekva verbo</p>`;
  if(canSpeak) speakSeq([{text:ans}]);
}

/* ---------- TABELVORTOJ ---------- */
let tbMode='tabelo', tbShow=true, tbStreak=0, tbLast=null;
const TB_ALL=[].concat(...TB_BEG.map(([b],bi)=>TB_END.map(([e],ei)=>({w:b+e,pt:TB_PT[b][ei],b,e,bi,ei}))));
function renderTabel(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Iloj · tabelvortoj</div><h1 class="title">Tabelvortoj</h1><p class="subtitle">45 palavras feitas de 5 começos e 9 finais: quem, algo, nunca, em toda parte, por isso… Estude a tabela, depois treine nos dois sentidos.</p></header>
   <div class="seg" role="group">${[['tabelo','Tabelo'],['pt','PT → Esperanto'],['eo','Esperanto → PT']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${tbMode===k}">${l}</button>`).join('')}</div>
   <div id="tbbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ tbMode=b.dataset.m; renderTabel(); });
  const box=$('#tbbody');
  if(tbMode==='tabelo'){
    box.innerHTML=`<div class="btnrow" style="margin-bottom:12px"><button class="btn" id="tbtog" type="button">${tbShow?'Kaŝi la signifojn':'Montri la signifojn'}</button><span class="note">Toque numa palavra para ouvi-la.</span></div>
     <div class="tw"><table class="tbl tbx"><tr><th></th>${TB_BEG.map(([b,l])=>`<th>${b}-<br><small class="note">${esc(l)}</small></th>`).join('')}</tr>${TB_END.map(([e,l],ei)=>`<tr><th>-${e}<br><small class="note">${esc(l)}</small></th>${TB_BEG.map(([b])=>`<td data-w="${b+e}"><b>${b+e}</b>${tbShow?`<small>${esc(TB_PT[b][ei])}</small>`:''}</td>`).join('')}</tr>`).join('')}</table></div>
     <div class="plus"><span class="pen">Lembre</span> As de <b>-u</b> e <b>-a</b> recebem -j e -n (<i>ĉiuj, kiun, tiajn</i>); as de <b>-o</b> recebem -n (<i>kion, nenion</i>); as de <b>-e</b> recebem -n de direção (<i>kien, tien</i>). E só uma negação por frase: <i>Mi vidis neniun.</i></div>`;
    $('#tbtog').onclick=()=>{ tbShow=!tbShow; renderTabel(); };
    box.querySelectorAll('[data-w]').forEach(td=>td.onclick=()=>{ box.querySelectorAll('td.hl').forEach(x=>x.classList.remove('hl')); td.classList.add('hl'); speakSeq([{text:td.dataset.w}]); });
    return;
  }
  box.innerHTML=`<section class="card drill" id="tbcard"></section><p class="note" id="tbstat"></p>`;
  const stat=()=>{ const s=S.lab.tabel; $('#tbstat').textContent=`${s.ok} ĝustaj el ${s.tot} · serio ${tbStreak}`; };
  const next=()=>{ let it; do{ it=TB_ALL[Math.floor(Math.random()*TB_ALL.length)]; }while(it===tbLast); tbLast=it; stat();
    const c=$('#tbcard');
    if(tbMode==='pt'){
      c.innerHTML=`<span class="lab">Kiel oni diras en Esperanto?</span><div class="verb" style="font-size:clamp(30px,5vw,44px)">${esc(it.pt)}</div><div style="margin-top:14px"><input id="tbin" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="respondo"></div><div class="fb" id="tbfb"></div><div class="btnrow" style="justify-content:center"><button class="btn" id="tbnext" type="button">Sekva →</button></div>`;
      const inp=$('#tbin'); let done=false; inp.focus({preventScroll:true});
      const go=()=>{ if(done){ next(); return; } if(!inp.value.trim()) return; done=true; const r=judge(inp.value,[it.w]); S.lab.tabel.tot++; tick(); if(r!=='no'){ S.lab.tabel.ok++; tbStreak++; } else { tbStreak=0; addErr('tb-'+it.w,'lab',{q:it.pt,s:'Tabelvortoj · traduku al Esperanto',a:[it.w],n:`${it.b}- (${TB_BEG[it.bi][1]}) + -${it.e} (${TB_END[it.ei][1]})`},'Tabelvortoj'); }
        save(); stat(); inp.style.color=r==='no'?'var(--rosso)':'var(--verde)';
        $('#tbfb').innerHTML=(r==='ok'?'<span class="mark ok">Ĝuste! ✓</span>':r==='acc'?`<span class="mark acc">Quase: ${esc(it.w)}</span>`:`<span class="mark no">${esc(it.w)}</span>`)+`<p class="note">${it.b}- · ${esc(TB_BEG[it.bi][1])} + -${it.e} · ${esc(TB_END[it.ei][1])} · Enter por la sekva</p>`;
        if(canSpeak) speakSeq([{text:it.w}]); };
      inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); go(); } });
    } else {
      const opts=shuffle([it.pt,...shuffle(TB_ALL.filter(x=>x!==it&&(x.bi===it.bi||x.ei===it.ei))).slice(0,3).map(x=>x.pt)]);
      c.innerHTML=`<span class="lab">Kion signifas?</span><div class="verb">${esc(it.w)}</div><div class="opts" style="justify-content:center;margin-top:16px">${opts.map((o,j)=>`<button class="opt" data-j="${j}" type="button">${esc(o)}</button>`).join('')}</div><div class="fb" id="tbfb"></div><div class="btnrow" style="justify-content:center"><button class="btn" id="tbnext" type="button">Sekva →</button></div>`;
      if(canSpeak) speakSeq([{text:it.w}]);
      c.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ const ok=opts[+b.dataset.j]===it.pt; c.querySelectorAll('.opt').forEach(x=>{ x.disabled=true; if(x.textContent===it.pt) x.classList.add('ok'); }); if(!ok){ b.classList.add('no'); tbStreak=0; addErr('tbe-'+it.w,'mc',{q:`Kion signifas «${it.w}»?`,o:opts,c:opts.indexOf(it.pt),e:`${it.b}- + -${it.e}`},'Tabelvortoj'); } else tbStreak++; S.lab.tabel.tot++; if(ok) S.lab.tabel.ok++; tick(); save(); stat(); });
    }
    $('#tbnext').onclick=next;
  };
  next();
}

/* ---------- VORTFARADO ---------- */
let vfMode='afiksoj', vfLast=null;
const PREF=['mal','re','ek','ge','eks','bo','dis','mis','pra','fi'];
function vfRoot(w){ const parts=w[2].split('·'); const r=parts.find(p=>!PREF.includes(p.toLowerCase())); return r||parts[0]; }
function renderVortfarado(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Iloj · vortfarado</div><h1 class="title">Vortfarado</h1><p class="subtitle">Raiz + afixos + terminação = palavras novas. Veja os afixos, adivinhe o sentido de palavras compostas e depois construa as suas.</p></header>
   <div class="seg" role="group">${[['afiksoj','Afiksoj'],['kio','Kion ĝi signifas?'],['konstruu','Konstruu la vorton!']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${vfMode===k}">${l}</button>`).join('')}</div>
   <div id="vfbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ vfMode=b.dataset.m; renderVortfarado(); });
  const box=$('#vfbody');
  if(vfMode==='afiksoj'){
    const blk=(t,arr)=>`<h3>${t}</h3><div class="afx">${arr.map(a=>`<div class="card"><b>${esc(a[0])}</b><div class="note" style="color:var(--ink);font-weight:600">${esc(a[2])}</div><div class="note">${esc(a[3])}</div></div>`).join('')}</div>`;
    box.innerHTML=blk('Prefiksoj',AFIKSOJ.filter(a=>a[1]==='pre'))+blk('Sufiksoj',AFIKSOJ.filter(a=>a[1]==='suf'))+`<div class="plus"><span class="pen">Como ler</span> Leia de trás para a frente: <i>mal·san·ul·ej·o</i> = substantivo (-o) · lugar (-ej-) · de pessoas (-ul-) · doentes (mal-san). Hospital!</div>`;
    return;
  }
  box.innerHTML=`<section class="card drill" id="vfcard"></section><p class="note" id="vfstat"></p>`;
  const stat=()=>{ const s=S.lab.vort; $('#vfstat').textContent=`${s.ok} ĝustaj el ${s.tot}`; };
  const next=()=>{ let w; do{ w=VORTOJ[Math.floor(Math.random()*VORTOJ.length)]; }while(w===vfLast); vfLast=w; stat();
    const c=$('#vfcard');
    if(vfMode==='kio'){
      const opts=shuffle([w[1],...shuffle(VORTOJ.filter(x=>x!==w)).slice(0,3).map(x=>x[1])]);
      c.innerHTML=`<span class="lab">Kion signifas?</span><div class="verb">${esc(w[0])}</div><div class="opts" style="justify-content:center;margin-top:16px">${opts.map((o,j)=>`<button class="opt" data-j="${j}" type="button">${esc(o)}</button>`).join('')}</div><div class="fb" id="vffb"></div><div class="btnrow" style="justify-content:center"><button class="btn" id="vfnext" type="button">Sekva →</button></div>`;
      c.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ const ok=opts[+b.dataset.j]===w[1]; c.querySelectorAll('.opt').forEach(x=>{ x.disabled=true; if(x.textContent===w[1]) x.classList.add('ok'); }); if(!ok){ b.classList.add('no'); addErr('vf-'+w[0],'mc',{q:`Kion signifas «${w[0]}»?`,o:opts,c:opts.indexOf(w[1]),e:w[2]},'Vortfarado'); } S.lab.vort.tot++; if(ok) S.lab.vort.ok++; tick(); save(); stat(); $('#vffb').innerHTML=`<p class="morf">${esc(w[2])}</p>`; if(canSpeak) speakSeq([{text:w[0]}]); });
    } else {
      const parts=w[2].split('·').length;
      c.innerHTML=`<span class="lab">Konstruu la vorton</span><div class="verb" style="font-size:clamp(28px,5vw,42px)">${esc(w[1])}</div><p class="note">radiko: <b>${esc(vfRoot(w))}-</b> · ${parts} partoj</p><div style="margin-top:10px"><input id="vfin" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="respondo"></div><div class="fb" id="vffb"></div><div class="btnrow" style="justify-content:center"><button class="btn" id="vfnext" type="button">Sekva →</button></div>`;
      const inp=$('#vfin'); let done=false; inp.focus({preventScroll:true});
      const go=()=>{ if(done){ next(); return; } if(!inp.value.trim()) return; done=true; const r=judge(inp.value,[w[0]]); S.lab.vort.tot++; tick(); if(r!=='no') S.lab.vort.ok++; else addErr('vfb-'+w[0],'lab',{q:w[1],s:'Vortfarado · konstruu la vorton',a:[w[0]],n:w[2]},'Vortfarado'); save(); stat(); inp.style.color=r==='no'?'var(--rosso)':'var(--verde)';
        $('#vffb').innerHTML=(r==='ok'?'<span class="mark ok">Ĝuste! ✓</span>':r==='acc'?`<span class="mark acc">Quase: ${esc(w[0])}</span>`:`<span class="mark no">${esc(w[0])}</span>`)+`<p class="morf">${esc(w[2])}</p>`; if(canSpeak) speakSeq([{text:w[0]}]); };
      inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); go(); } });
    }
    $('#vfnext').onclick=next;
  };
  next();
}

/* ---------- MONTA A FRASE ---------- */
const canon=s=>norm(s).replace(/[.,!?;:«»"—–-]/g,' ').replace(/\s+/g,' ').trim();
function shuffleTokens(toks){ let s; let n=0; do{ s=shuffle(toks); n++; }while(n<8 && s.join(' ')===toks.join(' ')); return s; }
function makeOrder(box,item){
  const sentence=item[0], alts=item[1]||[];
  const toks=sentence.split(' ');
  box.innerHTML=`<div class="build" aria-label="via frazo"><span class="ph">Tuŝu la vortojn en la ĝusta ordo</span></div><div class="pool"></div><div class="fb"></div>`;
  const build=box.querySelector('.build'), pool=box.querySelector('.pool');
  shuffleTokens(toks).forEach(t=>{ const b=document.createElement('button'); b.className='tok'; b.type='button'; b.textContent=t; pool.appendChild(b); });
  const ph=build.querySelector('.ph');
  box.addEventListener('click',e=>{
    const b=e.target.closest('.tok'); if(!b||box.dataset.locked) return;
    (b.parentElement===pool?build:pool).appendChild(b);
    ph.hidden=build.querySelectorAll('.tok').length>0;
  });
  return {
    check(){
      const built=[...build.querySelectorAll('.tok')].map(x=>x.textContent).join(' ');
      const fb=box.querySelector('.fb');
      if(pool.children.length){ fb.innerHTML='<span class="mark no">mankas vortoj</span>'; return false; }
      const ok=[sentence,...alts].some(a=>canon(a)===canon(built));
      fb.innerHTML= ok?'<span class="mark ok">✓ perfekte</span>':`<span class="mark no">✗</span> <span class="corrected">${esc(sentence)}</span>`;
      build.classList.toggle('ok',ok); build.classList.toggle('no',!ok);
      return ok;
    },
    incomplete(){ return pool.children.length>0; },
    reveal(){ box.dataset.locked='1'; box.querySelector('.fb').innerHTML=`<span class="corrected">${esc(sentence)}</span>`; }
  };
}
function orderList(ol,items,sec,record,ekey,src){
  ol.innerHTML=items.map(()=>`<li><div class="ordbox"></div></li>`).join('');
  const ctrls=[...ol.querySelectorAll('.ordbox')].map((b,i)=>makeOrder(b,items[i]));
  const done=new Array(items.length).fill(false);
  sec.querySelector('[data-a="check"]').onclick=()=>{ const r=ctrls.map((c,i)=>{ const ok=c.check(); const complete=!c.incomplete(); if(complete&&!done[i]){ done[i]=true; tick(); } if(complete&&!ok&&ekey) addErr(ekey(i),'order',{s:items[i][0],al:items[i][1]||[]},src); return ok; }); record(r.filter(Boolean).length,r.length); };
  sec.querySelector('[data-a="show"]').onclick=()=>ctrls.forEach(c=>c.reveal());
}
/* ---------- LABORATORIO DI FRASI ---------- */

let labMode='trad', labLvl=-1, labCur=null;
const LV=['A1','A2','B1–B2'];
const ALL_ORDER=[].concat(...Object.entries(ORDER).map(([u,arr])=>arr.map(x=>x.concat([+u]))));
function renderLab(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Iloj · frazoj</div><h1 class="title">Frazlaboratorio</h1><p class="subtitle">Frases inteiras, uma de cada vez: traduza do português, transforme seguindo uma instrução e reconstrua frases embaralhadas. Enter confere, Enter de novo passa para a próxima. Como a ordem das palavras é livre, outras versões podem estar certas: peça a opinião da IA.</p></header>
   <div class="seg" role="group"><button data-m="trad" aria-pressed="${labMode==='trad'}">Traduki</button><button data-m="trasf" aria-pressed="${labMode==='trasf'}">Transformi</button><button data-m="ord" aria-pressed="${labMode==='ord'}">Ordigi</button></div>
   ${labMode==='trad'?`<div class="chipsel" id="lvl" style="margin:-6px 0 16px"><button data-l="-1" aria-pressed="${labLvl===-1}">ĉiuj niveloj</button>${LV.map((l,i)=>`<button data-l="${i}" aria-pressed="${labLvl===i}">${l}</button>`).join('')}</div>`:''}
   <section class="card labcard" id="labcard"></section>
   <p class="note" id="labstats"></p>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ labMode=b.dataset.m; renderLab(); });
  const lv=$('#lvl'); if(lv) lv.querySelectorAll('button').forEach(b=>b.onclick=()=>{ labLvl=+b.dataset.l; renderLab(); });
  nextLab();
}
function labStats(){ const s=S.lab[labMode]; $('#labstats').textContent=`En ĉi tiu reĝimo: ${s.ok} ĝustaj el ${s.tot}.`; }
function pick(arr,prev){ if(arr.length<2) return arr[0]; let x; do{ x=arr[Math.floor(Math.random()*arr.length)]; }while(x===prev); return x; }
function nextLab(){
  const card=$('#labcard'); labStats();
  if(labMode==='ord'){
    const it=pick(ALL_ORDER,labCur&&labCur.it); labCur={it,done:false};
    card.innerHTML=`<div class="card-h"><span class="lab">${esc(uName(UNITS.find(u=>u.id===it[2])||{id:it[2]}))} · ordigo</span></div><div class="ordbox big"></div><div class="btnrow" style="margin-top:14px"><button class="btn primary" id="lcheck">Kontroli</button><button class="btn" id="lnext">Sekva →</button></div>`;
    const ctl=makeOrder(card.querySelector('.ordbox'),it);
    $('#lcheck').onclick=()=>{ if(labCur.done) return; const ok=ctl.check(); if(card.querySelector('.pool').children.length) return; labCur.done=true; S.lab.ord.tot++; tick(); if(ok) S.lab.ord.ok++; else addErr('lab-ord-'+hashStr(it[0]),'order',{s:it[0],al:it[1]||[]},'Frazlaboratorio · ordigo'); save(); labStats(); };
    $('#lnext').onclick=nextLab;
    return;
  }
  let it,prompt,sub;
  if(labMode==='trad'){ const pool=TRAD.filter(x=>labLvl<0||x[2]===labLvl); it=pick(pool,labCur&&labCur.it); prompt=it[0]; sub=`Traduku al Esperanto · ${LV[it[2]]}`; }
  else { it=pick(TRASF,labCur&&labCur.it); prompt=it[1]; sub=it[0]; }
  labCur={it,done:false};
  const answers = labMode==='trad'? it[1] : it[2];
  card.innerHTML=`<div class="card-h"><span class="lab">${esc(sub)}</span></div>
   <p class="labq">${esc(prompt)}</p>
   <textarea id="lin" class="labin" rows="2" spellcheck="false" autocapitalize="off" placeholder="Skribu en Esperanto… (cx → ĉ)" lang="eo"></textarea>
   <div id="lfb" class="fb"></div>
   <div class="btnrow" style="margin-top:12px"><button class="btn primary" id="lcheck">Kontroli</button><button class="btn" id="lnext">Sekva →</button></div>
   <div id="lai"></div>`;
  const inp=$('#lin'); inp.focus({preventScroll:true});
  const doCheck=()=>{
    if(labCur.done || !inp.value.trim()) return;
    labCur.done=true;
    const v=canon(inp.value);
    const r = answers.some(a=>canon(a)===v)?'ok': answers.some(a=>canon(a).normalize('NFD').replace(/[̀-ͯ]/g,'')===v.normalize('NFD').replace(/[̀-ͯ]/g,''))?'acc':'no';
    S.lab[labMode].tot++; tick(); if(r!=='no') S.lab[labMode].ok++; save(); labStats();
    labCur.ekey='lab-'+labMode+'-'+hashStr(prompt);
    if(r==='no') addErr(labCur.ekey,'lab',{q:prompt,s:sub,a:answers,n:labMode==='trad'?(it[3]||''):''},'Frazlaboratorio · '+(labMode==='trad'?'traduko':'transformo'));
    const note = labMode==='trad'&&it[3] ? `<p class="expl">${esc(it[3])}</p>`:'';
    const sols = `<div class="sols"><span class="note">Akceptitaj respondoj:</span><ul>${answers.map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div>`;
    if(r==='ok') $('#lfb').innerHTML=`<span class="mark ok">Perfekte! ✓</span>${note}${answers.length>1?sols:''}`;
    else if(r==='acc') $('#lfb').innerHTML=`<span class="mark acc">Preskaŭ: atenção às letras com acento.</span>${note}${sols}`;
    else {
      $('#lfb').innerHTML=`<span class="mark no">Ne kongruas kun la atenditaj respondoj.</span>${note}${sols}
        <p class="note">Em esperanto a ordem das palavras é livre, então outras versões podem estar certas. Se acha que a sua funciona, peça uma segunda opinião:</p>
        <div class="btnrow"><button class="btn red" id="laibtn">Kontroli mian frazon per AI</button><button class="btn ghost" id="lself">Ĝi estis ĝusta: kalkulu ĝin</button></div>`;
      $('#lself').onclick=()=>{ if(labCur.credited) return; labCur.credited=true; removeErr(labCur.ekey); S.lab[labMode].ok++; save(); labStats(); $('#lself').remove(); };
      $('#laibtn').onclick=()=>labAI(prompt,sub,answers,inp.value);
    }
  };
  $('#lcheck').onclick=doCheck;
  $('#lnext').onclick=nextLab;
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); labCur.done?nextLab():doCheck(); } });
}
async function labAI(prompt,task,answers,mine){
  const box=$('#lai'); const btn=$('#laibtn'); if(btn) btn.disabled=true;
  box.innerHTML=`<div class="ai-out"><div class="stamp">La instruisto legas…</div></div>`;
  const sample=await getSample();
  if(!sample){ box.innerHTML=`<div class="ai-out"><p>A verificação com IA só funciona com esta página aberta dentro do Claude.</p></div>`; if(btn) btn.disabled=false; return; }
  const q=`You are an Esperanto teacher. Assess the Esperanto answer of a Brazilian student who also speaks Spanish.
Task: ${task}
Starting sentence: ${prompt}
Reference answers: ${answers.join(' | ')}
Student's answer: ${mine}
The answer can be right even if it differs from the references, as long as it is grammatically correct Esperanto (Fundamento, PMEG), natural and faithful to the meaning; remember that Esperanto word order is free. Accept x-system spelling (cx = ĉ) but write your corrected version with ĉ ĝ ĥ ĵ ŝ ŭ.
Answer only with JSON: {"corretta": true or false, "versione_corretta": "her sentence corrected with as few changes as possible", "spiegazione": "in ${aiLang()==='pt'?'Portuguese':'simple Esperanto'}, max 35 words, pointing out any PT/ES interference"}`;
  try{
    const r=await sample.json(q);
    const ok=!!(r&&r.corretta);
    if(ok && !labCur.credited){ labCur.credited=true; removeErr(labCur.ekey); S.lab[labMode].ok++; save(); labStats(); } if(ok){ const s=$('#lself'); s&&s.remove(); }
    box.innerHTML=`<div class="ai-out"><div class="stamp">${ok?'Tio funkcias! ✓':'Korekto'}</div>${r&&r.versione_corretta?`<p class="corrected" style="font-size:17px">${esc(r.versione_corretta)}</p>`:''}<p>${esc((r&&r.spiegazione)||'')}</p></div>`;
  }catch(e){ box.innerHTML=`<div class="ai-out"><p>${esc(errMsg(e))}</p></div>`; if(btn) btn.disabled=false; }
}
/* ---------- utilità ---------- */
function hashStr(t){ let h=5381; t=String(t); for(let i=0;i<t.length;i++) h=((h<<5)+h+t.charCodeAt(i))|0; return (h>>>0).toString(36); }
let toastT;
function toast(msg){ const t=$('#toast'); if(!t) return; t.innerHTML=msg; t.hidden=false; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>{ t.hidden=true; },300); },3200); }

/* ---------- ritmo quotidiano ---------- */
const dayKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const addDays=n=>{ const d=new Date(); d.setDate(d.getDate()+n); return dayKey(d); };
const todayN=()=>S.days[dayKey()]||0;
function tick(n=1){
  const k=dayKey(); S.days[k]=(S.days[k]||0)+n; save();
  updRhythm();
}

function streaks(){
  const met=k=>(S.days[k]||0)>0;
  let cur=0; const d=new Date(); if(!met(dayKey(d))) d.setDate(d.getDate()-1);
  while(met(dayKey(d))){ cur++; d.setDate(d.getDate()-1); }
  const keys=Object.keys(S.days).filter(met).sort(); let best=0,run=0,prev=null;
  keys.forEach(k=>{ if(prev){ const p=new Date(prev+'T12:00:00'); p.setDate(p.getDate()+1); run= dayKey(p)===k? run+1 : 1; } else run=1; best=Math.max(best,run); prev=k; });
  return {cur, best:Math.max(best,cur), total:keys.length};
}

function todaySess(){
  const p=planStatus(); if(p.nextIdx<0) return null;
  const i = p.todayIdx>=0 ? p.todayIdx : p.nextIdx; const s=p.ss[i];
  const n=s.tasks.filter((_,j)=>taskDone(s,j)).length;
  return {s,n,tot:s.tasks.length,isToday:p.todayIdx===i,late:p.late};
}
function rhythmText(){
  const t=todaySess(), st=streaks();
  if(!t) return {top:'Plano finita!',sub:'',pct:100,mini:'✓',met:true};
  const short=t.s.label.replace(/ el \d+$/,'');
  const met=t.n===t.tot;
  return {top:met&&t.isToday?'Hodiaŭ ✓':(t.isToday?'Hodiaŭ':'Sekva'), sub:`${short} · ${t.n} el ${t.tot} taskoj`, pct:Math.round(100*t.n/t.tot), mini:met&&t.isToday?'✓':`${t.n}/${t.tot}`, met:met&&t.isToday, streak:st.cur};
}
function rhythmWidget(){
  const r=rhythmText();
  return `<a class="rhythm ${r.met?'met':''}" href="#plan" id="rhythm" title="Mia plano"><span class="rw-top"><span><b id="rw-n">${esc(r.top)}</b></span><span class="rw-streak" id="rw-s">${r.streak?`${r.streak} ${r.streak===1?'tago':'tagoj'} sinsekve`:''}</span></span><span class="note" id="rw-sub" style="color:inherit;opacity:.8">${esc(r.sub)}</span><span class="rw-bar"><i id="rw-bar" style="width:${r.pct}%"></i></span></a>`;
}

function updRhythm(){
  const e=$('#rw-n'); const r=rhythmText(); const top=$('#rw-top'); if(top){ top.textContent=r.mini; top.setAttribute('href','#plan'); }
  if(!e) return;
  e.textContent=r.top; $('#rw-sub').textContent=r.sub; $('#rw-bar').style.width=r.pct+'%';
  $('#rw-s').textContent=r.streak?`${r.streak} ${r.streak===1?'tago':'tagoj'} sinsekve`:'';
  $('#rhythm').classList.toggle('met',r.met);
}

function heatmap(){
  const end=new Date(); const start=new Date(); start.setDate(start.getDate()-7*17+1);
  while(start.getDay()!==1) start.setDate(start.getDate()-1);
  let cells=''; const d=new Date(start); const months=[];
  let col=0;
  while(d<=end){
    if(d.getDay()===1){ col++; if(d.getDate()<=7) months.push([col,EO_MS[d.getMonth()]]); }
    const k=dayKey(d), n=S.days[k]||0, r=n/S.goal;
    const lv = n===0?0 : r<.34?1 : r<.67?2 : r<1?3 : 4;
    cells+=`<i class="hm l${lv}" style="grid-column:${col};grid-row:${((d.getDay()+6)%7)+1}" title="${eoDate(d)}: ${n} poentoj"></i>`;
    d.setDate(d.getDate()+1);
  }
  return `<div class="hmwrap"><div class="hmmonths" style="grid-template-columns:repeat(${col},14px)">${months.map(([c,m])=>`<span style="grid-column:${c}">${m}</span>`).join('')}</div><div class="hmgrid" style="grid-template-columns:repeat(${col},14px)">${cells}</div>
   <div class="hmleg"><span>malpli</span><i class="hm l0"></i><i class="hm l1"></i><i class="hm l2"></i><i class="hm l3"></i><i class="hm l4"></i><span>celo atingita</span></div></div>`;
}
function homeRhythm(){
  const st=streaks(), due=errDue().length;
  return `<section class="rhythm-sec">
   <div class="rgrid">
    <div class="card"><span class="lab">Studa serio</span><b class="big">${st.cur}<small> ${st.cur===1?'tago':'tagoj'}</small></b><span class="note">rekordo: ${st.best} · ${st.total} studtagoj entute</span></div>
    <div class="card ${due?'due':''}"><span class="lab">Eraroj por ripeti hodiaŭ</span><b class="big">${due}</b><a class="btn ${due?'primary':''}" href="#review">${due?'Ripeti nun →':'Malfermi la kajeron'}</a></div>
    <div class="card"><span class="lab">Vortoj, kiujn vi lernis</span><b class="big">${Object.keys(S.voc).filter(k=>S.voc[k]).length}</b><a class="btn" href="#vocabulary">Vortaro →</a></div>
   </div>
   <div class="testrow">${TESTS.map(t=>{ const r=S.tests[t.id]; return `<a class="testchip ${r&&r.passed?'passed':''}" href="#test-${t.id}"><b>${t.title}</b><span>unuoj ${tRange(t)} · ${t.lvl}</span><em>${r?(r.passed?'sukcesis · ':'')+r.best+'/20':'farenda'}</em></a>`; }).join('')}<a class="testchip lex" href="#exams"><b>Legaj ekzamenoj</b><span>${EXAMS.length} ekzercoj</span><em>${Object.keys(S.exam).length} faritaj</em></a></div>
  </section>`;
}

function bindHome(){ const hp=$('#hplan'); if(hp) bindSession(hp,()=>renderHome()); const g=$('#goalsel'); if(g) g.querySelectorAll('button').forEach(b=>b.onclick=()=>{ S.goal=+b.dataset.g; save(); renderHome(); renderNav(route()); }); }

/* ---------- quaderno degli errori ---------- */
const INT=[1,3,7,15];
const BOXLAB=['post 1 tago','post 3 tagoj','post 7 tagoj','post 15 tagoj'];
function addErr(key,k,d,src){
  if(!key) return;
  const e=S.err[key];
  S.err[key]={k,d,src:src||(e&&e.src)||'',b:0,due:addDays(1),u:Date.now(),w:((e&&e.w)||0)+1};
  const ks=Object.keys(S.err); if(ks.length>600) ks.sort((a,b)=>S.err[a].u-S.err[b].u).slice(0,ks.length-600).forEach(x=>delErr(x));
  save(); refreshErrBadge();
}
function delErr(key){ if(!S.err[key]) return; delete S.err[key]; S.errDel[key]=Date.now(); }
function removeErr(key){ if(key&&S.err[key]){ delErr(key); save(); refreshErrBadge(); } }
function errDue(){ const t=dayKey(); return Object.keys(S.err).filter(k=>S.err[k].due<=t); }
function refreshErrBadge(){ const r=route(); if(r.type!=='unit') return; renderNav(r); }
function reviewResult(key,ok){
  const e=S.err[key]; if(!e) return;
  if(ok){ if(e.b>=3){ delErr(key); S.mastered=(S.mastered||0)+1; } else { e.b++; e.due=addDays(INT[e.b]); e.u=Date.now(); } }
  else { e.b=0; e.due=addDays(1); e.u=Date.now(); e.w=(e.w||0)+1; }
  save();
}
function errLabel(e){
  const d=e.d;
  switch(e.k){
    case 'fill': case 'fix': return d.p.replace(/[{}]/g,'');
    case 'mc': return d.q;
    case 'order': return d.s;
    case 'verb': return `Verbo: ${d.v}${d.k?' · -'+d.k:''}`;
    case 'lab': return d.q;
    case 'falso': return `Falsa amiko: ${d.w}`;
    case 'dict': return `Dikto: ${d.s}`;
    case 'myvoc': { const w=S.myvoc[d.k]; return w?`Miaj vortoj: ${w.it}`:'Miaj vortoj'; }
    case 'vocab': { const w=LESSICO[d.t]&&LESSICO[d.t].w[d.i]; return w?`Vortaro: ${w[0]}`:'Vortaro'; }
  }
  return '';
}
let rvQueue=[], rvPos=0, rvOk=0, rvMode='list';
function renderRipasso(){
  const all=Object.keys(S.err), due=errDue();
  const boxes=[0,0,0,0]; all.forEach(k=>boxes[Math.min(3,S.err[k].b)]++);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ĉiutage · ripeto</div><h1 class="title">Kajero de eraroj</h1>
   <p class="subtitle">Toda resposta errada vem para cá e volta depois de 1, 3, 7 e 15 dias. Acertou quatro vezes seguidas, conta como dominada.</p></header>
   <div class="rgrid">
    <div class="card ${due.length?'due':''}"><span class="lab">Por ripeti hodiaŭ</span><b class="big">${due.length}</b><div class="btnrow"><button class="btn primary" id="rvstart" ${due.length?'':'disabled'}>Komenci la ripeton</button></div></div>
    <div class="card"><span class="lab">Atendantaj</span><b class="big">${all.length-due.length}</b><button class="btn" id="rvall" ${all.length?'':'disabled'}>Ripeti ĉion nun</button></div>
    <div class="card"><span class="lab">Regitaj</span><b class="big">${S.mastered}</b><span class="note">eraroj, kiujn vi ne plu faras</span></div>
   </div>
   <div class="boxes">${boxes.map((n,i)=>`<div class="box"><span class="lab">Skatolo ${i+1}</span><b>${n}</b><span class="note">revenas ${BOXLAB[i]}</span></div>`).join('')}</div>
   <section class="card" id="rvcard" hidden></section>
   <section class="card"><div class="card-h"><div><span class="lab">Listo</span><h3>Ĉiuj konservitaj eraroj</h3></div><span class="note">${all.length} entute</span></div>
    ${all.length?`<ul class="errlist">${all.sort((a,b)=>S.err[a].due.localeCompare(S.err[b].due)).slice(0,300).map(k=>{ const e=S.err[k]; return `<li><div><div class="el-t">${esc(errLabel(e))}</div><div class="note">${esc(e.src)} · skatolo ${e.b+1} · ${e.due<=dayKey()?'<b class="due-t">hodiaŭ</b>':eoDate(new Date(e.due+'T12:00:00'),'short')}${e.w>1?` · eraris ${e.w}-foje`:''}</div></div><button class="btn ghost" data-del="${esc(k)}" title="Forigi">Forigi</button></li>`; }).join('')}</ul>`:`<p>Ankoraŭ neniu eraro. Quando você errar um exercício, uma frase, um verbo ou uma palavra, ele aparece aqui.</p>`}
   </section>`;
  $('#rvstart').onclick=()=>startReview(errDue());
  $('#rvall').onclick=()=>startReview(Object.keys(S.err));
  $('#main').querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ removeErr(b.dataset.del); renderNav(route()); renderRipasso(); });
}
function startReview(keys){
  rvQueue=shuffle(keys); rvPos=0; rvOk=0;
  const c=$('#rvcard'); c.hidden=false; c.scrollIntoView({block:'start',behavior:'smooth'});
  nextReview();
}
function nextReview(){
  const c=$('#rvcard');
  if(rvPos>=rvQueue.length){
    c.innerHTML=`<div class="drill"><div class="pen" style="font-size:40px">Farite!</div><p class="lead" style="margin:10px auto">${rvOk} ĝustaj el ${rvQueue.length}. As certas sobem de caixa; as erradas voltam amanhã.</p><div class="btnrow" style="justify-content:center"><button class="btn primary" id="rvback">Reen al la kajero</button></div></div>`;
    $('#rvback').onclick=()=>{ renderNav(route()); renderRipasso(); };
    return;
  }
  const key=rvQueue[rvPos], e=S.err[key];
  if(!e){ rvPos++; return nextReview(); }
  c.innerHTML=`<div class="card-h"><span class="lab">${esc(e.src)} · skatolo ${e.b+1}</span><span class="note">${rvPos+1} / ${rvQueue.length}</span></div><div id="rvbody"></div><div class="fb" id="rvfb"></div><div class="btnrow" style="margin-top:14px"><button class="btn primary" id="rvcheck">Kontroli</button><button class="btn" id="rvnext" hidden>Sekva →</button></div>`;
  let answered=false;
  const finish=(ok,html)=>{
    if(answered) return; answered=true;
    reviewResult(key,ok); tick(); if(ok) rvOk++;
    $('#rvfb').innerHTML=(ok?'<span class="mark ok">Ĝuste! ✓</span>':'<span class="mark no">Ankoraŭ ne…</span>')+(html||'');
    $('#rvcheck').hidden=true; const nx=$('#rvnext'); nx.hidden=false; nx.focus();
  };
  $('#rvnext').onclick=()=>{ rvPos++; nextReview(); };
  reviewCard($('#rvbody'),e,finish);
}
function reviewCard(box,e,finish){
  if(reviewExtra(box,e,finish)) return;
  const d=e.d, chk=$('#rvcheck');
  const enterTo=(el,fn)=>el.addEventListener('keydown',ev=>{ if(ev.key==='Enter'&&!ev.shiftKey){ ev.preventDefault(); if(!$('#rvnext').hidden) $('#rvnext').click(); else fn(); } });
  if(e.k==='fill'){
    const multi=Array.isArray(d.a[0]); const answers=multi?d.a:[d.a];
    let txt=d.p, hint=''; const m=txt.match(/\s*(\([^()]*\))\s*$/); if(m){ hint=m[1]; txt=txt.slice(0,m.index); }
    let bi=0; box.innerHTML=`<div class="sent rvsent">${esc(txt).replace(/___/g,()=>{ const a=answers[bi]||['']; const w=Math.max(4,...a.map(x=>x.length))+2; return `<input class="blank" data-b="${bi++}" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false">`; })}${hint?`<span class="hint">${esc(hint)}</span>`:''}</div>`;
    const ins=[...box.querySelectorAll('.blank')]; ins[0]&&ins[0].focus({preventScroll:true});
    const go=()=>{ let ok=true; ins.forEach(inp=>{ const r=judge(inp.value,answers[+inp.dataset.b]); inp.classList.add(r); if(r==='no') ok=false; }); finish(ok, `<p class="corrected">${esc(answers.map(a=>a[0]).join(' · '))}</p>${d.e?`<p class="expl">${esc(d.e)}</p>`:''}`); };
    ins.forEach(i=>enterTo(i,go)); chk.onclick=go;
  } else if(e.k==='fix'){
    box.innerHTML=`<div class="sent rvsent">${esc(d.p).replace(/\{([^}]*)\}/,'<span class="err">$1</span>')}</div><div class="fixline">Korekto: <input class="blank" style="width:${Math.max(12,...d.a.map(x=>x.length))+2}ch" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    const inp=box.querySelector('.blank'); inp.focus({preventScroll:true});
    const go=()=>{ const r=judge(inp.value,d.a); inp.classList.add(r); finish(r!=='no',`<p class="corrected">✓ ${esc(d.c)}</p>`); };
    enterTo(inp,go); chk.onclick=go;
  } else if(e.k==='mc' || e.k==='falso' || e.k==='vocab'){
    let q,o,c,ex='';
    if(e.k==='mc'){ q=d.q; o=d.o; c=d.c; ex=d.e; }
    else if(e.k==='falso'){ const f=FALSI.find(x=>x[0]===d.w)||FALSI[0]; o=shuffle([f[1],...shuffle(FALSI.filter(x=>x!==f)).slice(0,3).map(x=>x[1])]); q=`Kion signifas «${f[0]}»?`; c=o.indexOf(f[1]); ex=`Atentu: ${f[2]}. Ekz.: ${f[3]}`; }
    else { const th=LESSICO[d.t], w=th.w[d.i]; o=shuffle([w[0],...shuffle(th.w.filter(x=>x!==w)).slice(0,3).map(x=>x[0])]); q=`Kiel oni diras «${w[1]}» en Esperanto?`; c=o.indexOf(w[0]); ex=w[2]; }
    box.innerHTML=`<div class="q rvsent">${esc(q)}</div><div class="opts">${o.map((x,j)=>`<button class="opt" data-j="${j}">${esc(x)}</button>`).join('')}</div>`;
    chk.hidden=true;
    box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ const j=+b.dataset.j; box.querySelectorAll('.opt').forEach((x,k)=>{ x.disabled=true; if(k===c) x.classList.add('ok'); }); if(j!==c) b.classList.add('no'); finish(j===c, ex?`<p class="expl">${esc(ex)}</p>`:''); });
  } else if(e.k==='order'){
    const ctl=makeOrder(box,[d.s,d.al||[]]); box.querySelector('.ordbox')||box.classList.add('ordbox');
    chk.onclick=()=>{ const ok=ctl.check(); if(ctl.incomplete()) return; finish(ok,''); };
  } else if(e.k==='verb'){
    const f=VFORMS.find(x=>x.k===d.k)||VFORMS[0], V=VERBI[d.v]||{pt:''}, ans=vform(d.v,f,d.p||'mi');
    box.innerHTML=`<div class="drill" style="padding:6px 0"><div class="verb" style="font-size:40px">${esc(d.v)}</div><div class="note">${esc(V.pt||'')}</div><div class="meta"><b>${esc(f.lab)}</b>${f.g==='fin'?` · ${esc(d.p||'mi')}`:''}</div><div class="pers">${esc(f.pt)}</div><input id="rvin" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    const inp=$('#rvin'); inp.focus({preventScroll:true});
    const go=()=>{ if(!inp.value.trim()) return; const ok=judge(inp.value,[ans,ans.split(' ').pop()])!=='no'; finish(ok,`<p class="corrected">${esc(ans)}</p>`); };
    enterTo(inp,go); chk.onclick=go;
  } else if(e.k==='lab'){
    box.innerHTML=`<span class="lab note">${esc(d.s)}</span><p class="labq">${esc(d.q)}</p><textarea class="labin" rows="2" id="rvin" spellcheck="false" autocapitalize="off"></textarea>`;
    const inp=$('#rvin'); inp.focus({preventScroll:true});
    const strip2=x=>canon(x).normalize('NFD').replace(/[̀-ͯ]/g,'');
    const go=()=>{ if(!inp.value.trim()) return; const ok=d.a.some(a=>strip2(a)===strip2(inp.value)); finish(ok,`<div class="sols"><span class="note">Respondoj:</span><ul>${d.a.map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div>${d.n?`<p class="expl">${esc(d.n)}</p>`:''}`); };
    enterTo(inp,go); chk.onclick=go;
  }
}

/* ---------- verifiche ---------- */
let testTimer=null, testState=null;
function stopTestTimer(){ if(testTimer){ clearInterval(testTimer); testTimer=null; } }
function renderTest(id){
  const T=TESTS.find(t=>t.id===id), r=S.tests[id];
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Testo · unuoj ${tRange(T)} · nivelo ${T.lvl}</div><h1 class="title">${T.title}</h1>
   <p class="subtitle">Um teste no estilo da prova de leitura do KER: leitura, lacunas e gramática. 30 minutos, sem dicas, 20 pontos. Passa com 12; 17 ou mais é aprovação «kun laŭdo» (com distinção).</p></header>
   <div id="tbody"></div>`;
  if(testState&&testState.id===id&&testState.result) return showTestResult(T);
  const tb=$('#tbody');
  tb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Antaŭ ol komenci</span><h3>Kiel ĝi funkcias</h3></div>${r?`<span class="score ${r.passed?'good':''}">${r.best}/20</span>`:''}</div>
   <ul class="dots"><li><b>Parto A · Legado</b>: um texto e 5 perguntas (5 pontos).</li><li><b>Parto B · Kompletigo</b>: 8 lacunas, uma palavra cada (8 pontos). A ortografia conta, inclusive os acentos.</li><li><b>Parto C · Gramatiko kaj vortprovizo</b>: 7 perguntas de múltipla escolha (7 pontos).</li></ul>
   <p>O relógio começa quando você aperta «Komenci». Quando o tempo acaba, o teste é entregue sozinho. Não saia da página durante o teste, senão terá de recomeçar. Os erros vão para o Kajero de eraroj.</p>
   ${r?`<p class="note">Lasta provo: ${r.last}/20 · plej bone: ${r.best}/20${r.passed?' · sukcesis '+eoDate(new Date(r.pdate),'full'):''}</p>`:''}
   <div class="btnrow"><button class="btn primary" id="tstart">Komenci la teston</button>${r&&r.passed?'<button class="btn" id="tcert">Vidi vian atestilon</button>':''}</div></section><div id="certbox"></div>`;
  $('#tstart').onclick=()=>startTest(T);
  const cb=$('#tcert'); if(cb) cb.onclick=()=>{ $('#certbox').innerHTML=certHTML(T,S.tests[id]); bindCert(T); };
}
function startTest(T){
  testState={id:T.id,end:Date.now()+30*60000,ans:{read:[],mc:[]},result:null};
  const R=T.reading;
  let bi=0;
  const cloze=esc(T.cloze.text).replace(/\[(\d)\]\s*(\([^)]*\))?/g,(m,n,h)=>`<span class="tblank"><sup>${n}</sup><input class="blank" data-c="${+n-1}" style="width:${Math.max(6,...T.cloze.a[+n-1].map(x=>x.length))+2}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="truo ${n}">${h?`<span class="hint">${h}</span>`:''}</span>`);
  $('#tbody').innerHTML=`<div class="timer" id="timer"><span>Restas <b id="tleft">30:00</b></span><button class="btn primary" id="tsend">Transdoni</button></div>
   <section class="card"><div class="card-h"><div><span class="lab">Parto A · 5 poentoj</span><h3>Legado: ${esc(R.title)}</h3></div></div><article class="reading" style="font-size:17px">${R.text}</article>
    <ol class="items">${R.q.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="opts" data-g="read" data-i="${i}">${q[1].map((o,j)=>`<button class="opt" data-j="${j}">${esc(o)}</button>`).join('')}</div></div></li>`).join('')}</ol></section>
   <section class="card"><div class="card-h"><div><span class="lab">Parto B · 8 poentoj</span><h3>Kompletigo: ${esc(T.cloze.title)}</h3></div></div><p class="sent cloze">${cloze}</p></section>
   <section class="card"><div class="card-h"><div><span class="lab">Parto C · 7 poentoj</span><h3>Gramatiko kaj vortprovizo</h3></div></div>
    <ol class="items">${T.mc.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="opts" data-g="mc" data-i="${i}">${q[1].map((o,j)=>`<button class="opt" data-j="${j}">${esc(o)}</button>`).join('')}</div></div></li>`).join('')}</ol></section>
   <div class="btnrow" style="justify-content:flex-end"><button class="btn primary" id="tsend2">Transdoni la teston</button></div>`;
  $('#tbody').querySelectorAll('.opts').forEach(g=>g.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ g.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); testState.ans[g.dataset.g][+g.dataset.i]=+b.dataset.j; }));
  $('#tsend').onclick=$('#tsend2').onclick=()=>gradeTest(T);
  stopTestTimer();
  const upd=()=>{ const left=Math.max(0,testState.end-Date.now()); const m=Math.floor(left/60000), s=Math.floor(left%60000/1000); const el=$('#tleft'); if(!el){ stopTestTimer(); return; } el.textContent=`${m}:${String(s).padStart(2,'0')}`; $('#timer').classList.toggle('low',left<5*60000); if(left<=0){ stopTestTimer(); gradeTest(T); } };
  upd(); testTimer=setInterval(upd,1000);
  window.scrollTo(0,0);
}
function gradeTest(T){
  if(!testState||testState.result) return;
  stopTestTimer();
  const src=`${T.title}`;
  const read=T.reading.q.map((q,i)=>{ const ok=testState.ans.read[i]===q[2]; if(!ok) addErr(`t${T.id}-r-${i}`,'mc',{q:q[0],o:q[1],c:q[2],e:''},src+' · legado'); return ok; });
  const clozeVals=[...$('#tbody').querySelectorAll('[data-c]')].sort((a,b)=>a.dataset.c-b.dataset.c).map(x=>x.value);
  const cloze=T.cloze.a.map((a,i)=>{ const ok=judge(clozeVals[i]||'',a)==='ok'; if(!ok) addErr(`t${T.id}-c-${i}`,'fill',{p:clozeSentence(T,i),a:a,e:''},src+' · kompletigo'); return ok; });
  const mc=T.mc.map((q,i)=>{ const ok=testState.ans.mc[i]===q[2]; if(!ok) addErr(`t${T.id}-m-${i}`,'mc',{q:q[0],o:q[1],c:q[2],e:''},src+' · gramatiko'); return ok; });
  const score=[...read,...cloze,...mc].filter(Boolean).length;
  const passed=score>=12;
  const prev=S.tests[T.id]||{};
  S.tests[T.id]={best:Math.max(prev.best||0,score),last:score,date:Date.now(),passed:prev.passed||passed,pdate:prev.passed?prev.pdate:(passed?Date.now():null),dist:(prev.dist||score>=17)};
  tick(20);
  save();
  testState.result={score,read,cloze,mc,clozeVals,passed};
  renderNav(route());
  showTestResult(T);
}
function clozeSentence(T,i){
  const plain=T.cloze.text.replace(/\[(\d)\]\s*(\([^)]*\))?/g,(m,n,h)=>+n-1===i?`___ ${h||''}`:T.cloze.a[+n-1][0]);
  const parts=plain.split(/(?<=[.!?»])\s+/); const p=parts.find(x=>x.includes('___'))||plain;
  const hm=p.match(/___ (\([^)]*\))/); return (hm? p.replace(hm[0],'___')+' '+hm[1] : p).trim();
}
function showTestResult(T){
  const R=testState.result, sc=R.score, lab=sc>=17?'Sukcesis kun laŭdo':sc>=12?'Sukcesis':'Ankoraŭ ne sukcesis';
  const sec=(name,arr,max)=>`<div class="box"><span class="lab">${name}</span><b>${arr.filter(Boolean).length}/${max}</b></div>`;
  $('#tbody').innerHTML=`<section class="card result ${R.passed?'pass':''}"><div class="drill"><span class="lab">Rezulto</span><div class="verb">${sc}<small style="font-size:.45em">/20</small></div><div class="pen" style="font-size:30px">${lab}</div>
    <p class="note">${R.passed?'Bonege! Os seus erros estão no Kajero de eraroj: revise-os nos próximos dias.':'São precisos 12 pontos. Revise os erros no Kajero de eraroj e tente de novo daqui a alguns dias.'}</p></div>
    <div class="boxes">${sec('Legado',R.read,5)}${sec('Kompletigo',R.cloze,8)}${sec('Gramatiko',R.mc,7)}</div>
    <div class="btnrow" style="justify-content:center"><a class="btn" href="#review">Al la kajero de eraroj</a><button class="btn" id="tagain">Refari la teston</button></div></section>
   <section class="card"><div class="card-h"><h3>Respondoj</h3></div>
    <ol class="items">
     ${T.reading.q.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="${R.read[i]?'corrected':'expl'}">${R.read[i]?'✓':'✗ ĝusta respondo:'} ${esc(q[1][q[2]])}</div></div></li>`).join('')}
     ${T.cloze.a.map((a,i)=>`<li><div><div class="q">Truo ${i+1}: <i>${esc(R.clozeVals[i]||'—')}</i></div><div class="${R.cloze[i]?'corrected':'expl'}">${R.cloze[i]?'✓':'✗ respondo:'} ${esc(a.join(' / '))}</div></div></li>`).join('')}
     ${T.mc.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="${R.mc[i]?'corrected':'expl'}">${R.mc[i]?'✓':'✗ ĝusta respondo:'} ${esc(q[1][q[2]])}</div></div></li>`).join('')}
    </ol></section>
   <div id="certbox">${R.passed?certHTML(T,S.tests[T.id]):''}</div>`;
  $('#tagain').onclick=()=>{ testState=null; renderTest(T.id); };
  if(R.passed) bindCert(T);
  window.scrollTo(0,0);
}
function certHTML(T,r){
  return `<section class="cert"><div class="cert-in">
   <div class="eyebrow">Kajero de Esperanto</div>
   <div class="cert-t">Atestilo</div>
   <p>Ĉi tio atestas, ke</p>
   <input class="cert-name" id="certname" value="${esc(S.name||'')}" placeholder="skribu vian nomon ĉi tie" aria-label="nomo sur la atestilo">
   <p>sukcesis en la <b>${T.title}</b> (unuoj ${tRange(T)}) je la nivelo <b>${T.lvl}</b><br>kun la poentaro <b>${r.best}/20</b>${r.dist||r.best>=17?', <i>kun laŭdo</i>':''}.</p>
   <div class="cert-foot"><span>${eoDate(new Date(r.pdate||Date.now()),'full')}</span><span class="seal">${T.lvl}</span></div>
  </div></section>`;
}
function bindCert(T){ const n=$('#certname'); if(n) n.addEventListener('input',()=>{ S.name=n.value; save(); }); }

/* ---------- lessico tematico ---------- */
let lexMode='lista', lexCard=null;
function renderLessico(id){
  if(id===undefined){
    $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ĉiutage · vortaro</div><h1 class="title">Vortaro laŭ temoj</h1>
     <p class="subtitle">${LESSICO.reduce((a,t)=>a+t.w.length,0)} palavras e expressões em ${LESSICO.length} temas, do «Saluton!» ao vocabulário do movimento. Estude a lista, revise com as cartas e teste-se no quiz.</p></header>
     <div class="lexgrid">${LESSICO.map((t,i)=>{ const k=t.w.filter(w=>S.voc[w[0]]).length; return `<a class="card lexcard" href="#vocabulary-${i}"><span class="lab">${t.lvl}</span><h3>${esc(t.t)}</h3><span class="rw-bar"><i style="width:${Math.round(100*k/t.w.length)}%"></i></span><span class="note">${k}/${t.w.length} lernitaj</span></a>`; }).join('')}</div>`;
    return;
  }
  const T=LESSICO[id]; const known=T.w.filter(w=>S.voc[w[0]]).length;
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#vocabulary">Vortaro laŭ temoj</a> · ${T.lvl}</div><h1 class="title">${esc(T.t)}</h1>
   <div class="uprog"><span class="track"><i style="width:${Math.round(100*known/T.w.length)}%"></i></span><span>${known}/${T.w.length} lernitaj</span></div></header>
   <div class="seg" role="group">${[['lista','Listo'],['carte','Kartoj'],['quiz','Kvizo']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${lexMode===k}">${l}</button>`).join('')}</div>
   <div id="lexbody"></div>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#vocabulary-${id-1}">← ${esc(LESSICO[id-1].t)}</a>`:'<span></span>'}${id<LESSICO.length-1?`<a class="btn ghost" href="#vocabulary-${id+1}">${esc(LESSICO[id+1].t)} →</a>`:''}</div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ lexMode=b.dataset.m; renderLessico(id); });
  const lb=$('#lexbody');
  if(lexMode==='lista'){
    lb.innerHTML=`<div class="tw"><table class="tbl lextbl">${T.w.map((w,i)=>`<tr><td>${canSpeak?`<button class="btn ghost play" type="button" data-say="${i}" aria-label="Aŭskulti">▶</button>`:''}<b>${esc(w[0])}</b></td><td class="pt">${esc(w[1])}</td><td><i>${esc(w[2])}</i></td><td><button class="btn ghost ${S.voc[w[0]]?'kn':''}" data-k="${i}">${S.voc[w[0]]?'✓ mi scias':'ĉu vi scias?'}</button></td></tr>`).join('')}</table></div>`;
    lb.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ const w=T.w[+b.dataset.k]; S.voc[w[0]]=!S.voc[w[0]]; save(); renderLessico(id); });
    lb.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>{ const w=T.w[+b.dataset.say]; speakSeq([{text:w[0]},{text:w[2]}]); });
  } else if(lexMode==='carte'){
    const order=[...T.w.keys()].sort((a,b)=>(S.voc[T.w[a][0]]?1:0)-(S.voc[T.w[b][0]]?1:0));
    let pos=0;
    const show=()=>{
      if(pos>=order.length){ lb.innerHTML=`<section class="card drill"><div class="pen" style="font-size:36px">Farite!</div><p>Você viu todas as cartas deste tema. As marcadas com «Ripeti» estão no Kajero de eraroj.</p><button class="btn primary" id="lxagain">Rekomenci</button></section>`; $('#lxagain').onclick=()=>{ pos=0; show(); }; return; }
      const w=T.w[order[pos]];
      lb.innerHTML=`<p class="note">${pos+1} / ${order.length} · tuŝu la karton por turni ĝin</p><button class="flip lexflip" id="lxcard"><div class="in"><div class="f"><b>${esc(w[0])}</b><small>${S.voc[w[0]]?'jam lernita':'kion ĝi signifas portugale?'}</small></div><div class="b"><span class="m">${esc(w[1])}</span><span class="ex">${esc(w[2])}</span></div></div></button>
       <div class="btnrow" style="justify-content:center;margin-top:16px"><button class="btn" id="lxno">Ripeti</button><button class="btn primary" id="lxyes">Mi scias ✓</button></div>`;
      $('#lxcard').onclick=()=>{ $('#lxcard').classList.toggle('on'); };
      if(canSpeak) speakSeq([{text:w[0]}]);
      $('#lxyes').onclick=()=>{ S.voc[w[0]]=true; tick(); save(); pos++; show(); };
      $('#lxno').onclick=()=>{ S.voc[w[0]]=false; addErr('voc-'+hashStr(w[0]),'vocab',{t:id,i:order[pos]},'Vortaro · '+T.t); tick(); pos++; show(); };
    };
    show();
  } else {
    const qs=shuffle([...T.w.keys()]).slice(0,10).map(i=>{
      const w=T.w[i];
      if(Math.random()<.5){ const o=shuffle([w[0],...shuffle(T.w.filter(x=>x!==w)).slice(0,3).map(x=>x[0])]); const q=[`Kiel oni diras «${w[1]}» en Esperanto?`,o,o.indexOf(w[0]),w[2]]; q.ix=i; return q; }
      const o=shuffle([w[1],...shuffle(T.w.filter(x=>x!==w)).slice(0,3).map(x=>x[1])]); const q=[`Kion signifas «${w[0]}»?`,o,o.indexOf(w[1]),w[2]]; q.ix=i; return q;
    });
    lb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">10 demandoj</span><h3>Kvizo: ${esc(T.t)}</h3></div><span class="score" id="lxscore"></span></div><ol class="items" id="lxq"></ol><div class="btnrow"><button class="btn primary" id="lxnew">Nova kvizo</button></div></section>`;
    mcList($('#lxq'),qs,(s,t)=>{ showScore($('#lxscore'),s,t); },i=>['voc-'+hashStr(T.w[qs[i].ix][0]),'vocab',{t:id,i:qs[i].ix},'Vortaro · '+T.t]);
    $('#lxnew').onclick=()=>renderLessico(id);
  }
}

/* ---------- sincronizzazione ---------- */
let syncSt='local', dbRefs=null, pushing=false, pushAgain=false, pushT=null, lastPush=['',''];
function syncText(){ return {local:'○ Progreso konservita nur en ĉi tiu aparato',sync:'◌ Sinkronigado…',ok:'● Progreso sinkronigita kun via konto',err:'○ Sinkronigo malsukcesis: nova provo ĉe la sekva konservo',full:'○ Memoro plena: la progreso restas en ĉi tiu aparato'}[syncSt]; }
function setSync(st){ syncSt=st; const el=$('#syncline'); if(el){ el.textContent=syncText(); el.className='syncline '+st; } }
function splitState(){ const o=JSON.parse(JSON.stringify(S)); const texts={write:o.write,corr:o.corr,gen:o.gen,examGen:o.examGen}; delete o.write; delete o.corr; delete o.gen; delete o.examGen; return [JSON.stringify(o),JSON.stringify(texts)]; }
function schedulePush(){ if(!dbRefs) return; clearTimeout(pushT); pushT=setTimeout(push,2500); }
async function push(){
  if(!dbRefs) return; if(pushing){ pushAgain=true; return; }
  pushing=true;
  try{
    const [c,t]=splitState();
    if(c!==lastPush[0]){ await dbRefs.core.set({json:c,at:S.at||0}); lastPush[0]=c; }
    if(t!==lastPush[1]){ await dbRefs.texts.set({json:t,at:S.at||0}); lastPush[1]=t; }
    setSync('ok');
  }catch(e){ setSync(e&&e.code==='quota_exceeded'?'full':'err'); }
  pushing=false;
  if(pushAgain){ pushAgain=false; push(); }
}
function mergeState(a,b){
  const [n,o]=(a.at||0)>=(b.at||0)?[a,b]:[b,a];
  const r=JSON.parse(JSON.stringify(n)), O=JSON.parse(JSON.stringify(o));
  ['ex','read','corr','gen','lesson','voc','tab','cult','spk','myvoc','orale','wpm','asc','exam','examGen','plan'].forEach(f=>{ r[f]=Object.assign({},O[f]||{},r[f]||{}); });
  r.write=Object.assign({},O.write||{},r.write||{});
  Object.keys(O.write||{}).forEach(k=>{ if(O.write[k]&&O.write[k].done&&r.write[k]) r.write[k].done=true; });
  r.days=Object.assign({},O.days||{}); Object.entries(n.days||{}).forEach(([k,v])=>{ r.days[k]=Math.max(v,r.days[k]||0); });
  r.errDel=Object.assign({},O.errDel||{}); Object.entries(n.errDel||{}).forEach(([k,v])=>{ r.errDel[k]=Math.max(v,r.errDel[k]||0); });
  r.err=Object.assign({},O.err||{}); Object.entries(n.err||{}).forEach(([k,v])=>{ if(!r.err[k]||v.u>=r.err[k].u) r.err[k]=v; });
  Object.keys(r.err).forEach(k=>{ if(r.errDel[k]&&r.err[k].u<=r.errDel[k]) delete r.err[k]; });
  const cut=Date.now()-60*864e5; Object.keys(r.errDel).forEach(k=>{ if(r.errDel[k]<cut) delete r.errDel[k]; });
  r.log=Object.assign({},O.log||{}); Object.entries(n.log||{}).forEach(([k,v])=>{ if(!r.log[k]||v.length>=r.log[k].length) r.log[k]=v; });
  r.mastered=Math.max(n.mastered||0,o.mastered||0);
  ['verbi','falsi'].forEach(f=>{ r[f]=r[f]||{}; const x=O[f]||{}; ['ok','tot','best'].forEach(z=>{ r[f][z]=Math.max(r[f][z]||0,x[z]||0); }); });
  r.lab=r.lab||{}; Object.keys(O.lab||{}).forEach(m=>{ r.lab[m]=r.lab[m]||{ok:0,tot:0}; r.lab[m].ok=Math.max(r.lab[m].ok,O.lab[m].ok||0); r.lab[m].tot=Math.max(r.lab[m].tot,O.lab[m].tot||0); });
  r.tests=Object.assign({},O.tests||{}); Object.entries(n.tests||{}).forEach(([k,v])=>{ const p=r.tests[k]; r.tests[k]=!p?v:{...v,best:Math.max(v.best||0,p.best||0),passed:!!(v.passed||p.passed),pdate:v.pdate||p.pdate,dist:!!(v.dist||p.dist)}; });
  r.plan=Object.assign({},(O.plan||{}),(n.plan||{})); r.plan.tick=Object.assign({},(O.plan&&O.plan.tick)||{},(n.plan&&n.plan.tick)||{});
  r.name=n.name||o.name; r.at=Math.max(a.at||0,b.at||0);
  return r;
}
async function pullMerge(){
  const [a,b]=await Promise.all([dbRefs.core.get(),dbRefs.texts.get()]);
  if(a.exists){
    let remote=null;
    try{ remote=JSON.parse(a.data().json); if(b.exists) Object.assign(remote,JSON.parse(b.data().json)); }catch(e){ remote=null; }
    if(remote){
      const before=JSON.stringify(S);
      const merged=mergeState(S,remote);
      Object.keys(S).forEach(k=>delete S[k]); Object.assign(S,merged); ensureDefaults();
      try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){}
      if(JSON.stringify(S)!==before){ const r=route(); renderNav(r); if(r.type==='home') renderHome(); else if(r.type==='ripasso') renderRipasso(); }
    }
  }
  await push();
}
async function initSync(){
  if(!window.claude||!window.claude.use){ setSync('local'); return; }
  setSync('sync');
  try{
    const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    const uid=user? await user.id() : null;
    if(!db||!uid){ setSync('local'); return; }
    const col=db.collection('data/users/'+uid);
    dbRefs={core:col.doc('esperanto'),texts:col.doc('esperanto-texts')};
    await pullMerge();
    document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible' && dbRefs) pullMerge().catch(()=>{}); });
  }catch(e){ dbRefs=null; setSync('local'); }
}