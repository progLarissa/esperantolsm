
/* ---------- voĉo (sintezo de la retumilo) ---------- */
const canSpeak = (()=>{ try{ return 'speechSynthesis' in window && typeof SpeechSynthesisUtterance!=='undefined'; }catch(e){ return false; } })();
let speakingId=null;
function speakBtnHTML(id){ return canSpeak?`<button class="btn speak" id="${id}" type="button" aria-pressed="false">▶ Aŭskulti</button>`:''; }
function textOf(el,skip){ if(!el) return ''; const c=el.cloneNode(true); c.querySelectorAll(skip||'.speak').forEach(x=>x.remove()); c.querySelectorAll('p,li,h2,h3').forEach(x=>x.append('. ')); return c.textContent.replace(/\s+/g,' ').replace(/(\.\s*){2,}/g,'. ').trim(); }
const ONES=['','unu','du','tri','kvar','kvin','ses','sep','ok','naŭ'];
function eoNum(n){ n=Math.floor(Math.abs(+n)||0); if(n===0) return 'nul';
  const part=x=>{ const c=Math.floor(x/100), d=Math.floor(x%100/10), u=x%10, o=[]; if(c) o.push(c===1?'cent':ONES[c]+'cent'); if(d) o.push(d===1?'dek':ONES[d]+'dek'); if(u) o.push(ONES[u]); return o.join(' '); };
  const out=[], mi=Math.floor(n/1e6), th=Math.floor(n/1000)%1000, r=n%1000;
  if(mi) out.push(mi===1?'unu miliono':part(mi%1000)+' milionoj'); if(th) out.push(th===1?'mil':part(th)+' mil'); if(r) out.push(part(r)); return out.join(' '); }
function allVoices(){ try{ return speechSynthesis.getVoices()||[]; }catch(e){ return []; } }
const VLAB={eo:'esperanto',pl:'pola (proksimuma)',it:'itala (proksimuma)',es:'hispana (proksimuma)'};
function vLang(){ const vs=allVoices(), m=S.vmode||'auto', has=l=>vs.some(v=>new RegExp('^'+l,'i').test(v.lang));
  if(m!=='auto'&&has(m)) return m; for(const l of ['eo','pl','it','es']) if(has(l)) return l; return 'eo'; }
const LTAG={eo:'eo',pl:'pl-PL',it:'it-IT',es:'es-ES'};
function langVoices(){ const l=vLang(), re=new RegExp('^'+l,'i'), good=v=>/natural|neural|premium|enhanced|google|online/i.test(v.name); return allVoices().filter(v=>re.test(v.lang)).sort((a,b)=>(good(b)?1:0)-(good(a)?1:0)); }
function mainVoice(){ return langVoices()[0]||null; }
/* Sem voz de esperanto, a pronúncia é aproximada com a ortografia polonesa (acento na penúltima, como em esperanto) ou italiana. */
function translit(t){
  const l=vLang(); t=String(t).replace(/\d+/g,m=>eoNum(m)).replace(/[«»]/g,'');
  if(l==='eo') return t;
  let s=t.toLowerCase();
  if(l==='pl'){
    s=s.replace(/([csz])i(?=[aeiouŭ])/g,'$1y').replace(/([csz])i/g,'$1y').replace(/i(?=[aeou])/g,'ij')
     .replace(/ĉ/g,'cz').replace(/ĝ/g,'dż').replace(/ĥ/g,'ch').replace(/ĵ/g,'ż').replace(/ŝ/g,'sz').replace(/ŭ/g,'ł').replace(/v/g,'w');
    return s;
  }
  if(l==='it'){
    s=s.replace(/c/g,'z').replace(/k(?=[ei])/g,'ch').replace(/g(?=[ei])/g,'gh')
     .replace(/ĉ(?=[ei])/g,'c').replace(/ĉ/g,'ci').replace(/[ĝĵ](?=[ei])/g,'g').replace(/[ĝĵ]/g,'gi').replace(/ŝ(?=[ei])/g,'sc').replace(/ŝ/g,'sci')
     .replace(/ĥ/g,'k').replace(/h/g,'').replace(/j/g,'i').replace(/ŭ/g,'u');
    return s;
  }
  return s.replace(/c/g,'ts').replace(/ĉ/g,'ch').replace(/[ĝĵ]/g,'y').replace(/ŝ/g,'sh').replace(/ĥ/g,'j').replace(/h/g,'j').replace(/j(?![aeiou])/g,'i').replace(/ŭ/g,'u').replace(/z/g,'s');
}
function stopSpeak(){ try{ if(canSpeak) speechSynthesis.cancel(); }catch(e){} if(speakingId){ const b=document.getElementById(speakingId); if(b){ b.textContent=b.dataset.label||'▶ Aŭskulti'; b.setAttribute('aria-pressed','false'); } } speakingId=null; }
function speak(text,id,rate){
  if(!canSpeak||!text) return;
  stopSpeak();
  try{
    const parts=text.match(/[^.!?»]+[.!?»]*/g)||[text];
    const v=mainVoice();
    speakingId=id||null;
    parts.forEach((p,i)=>{ const u=new SpeechSynthesisUtterance(translit(p.trim())); u.lang=LTAG[vLang()]; if(v) u.voice=v; u.rate=rate||S.rate||0.9; if(i===parts.length-1) u.onend=()=>{ if(speakingId===id) stopSpeak(); }; speechSynthesis.speak(u); });
    if(id){ const b=document.getElementById(id); if(b){ b.dataset.label=b.dataset.label||b.textContent; b.textContent='■ Halti'; b.setAttribute('aria-pressed','true'); } }
  }catch(e){ stopSpeak(); }
}
function bindSpeak(id,getText){ const b=document.getElementById(id); if(!b) return; b.onclick=()=>{ if(speakingId===id) stopSpeak(); else speak(getText(),id); }; }


/* ---------- cultura ---------- */
function homeCultura(){
  const read=k=>S.cult[k]&&S.cult[k].read;
  const next=CULTURA.findIndex((_,i)=>!read(i));
  return `<h2 class="sec">Kulturo kaj historio</h2>
   <p>${CULTURA.length} cartões curtos sobre a história, os símbolos e a vida do movimento, em esperanto simples, com tradução em português e um quiz. Uma língua sem país tem, sim, uma cultura.</p>
   <div class="cultrow">${CULTURA.map((c,i)=>`<a class="cultchip ${read(i)?'done':''}" href="#culture-${i}"><span class="lab">${esc(c.tag)}</span><b>${esc(c.t)}</b>${read(i)?'<em>✓ legita</em>':''}</a>`).join('')}</div>
   ${next>=0?`<div class="btnrow" style="margin:12px 0 30px"><a class="btn" href="#culture-${next}">Legi la sekvan: ${esc(CULTURA[next].t)} →</a></div>`:'<p class="note" style="margin-bottom:30px">Vi legis ĉiujn kartojn. Bonege!</p>'}`;
}
let cultTrans=false;
function renderCultura(id){
  if(id===undefined){
    const tags=[...new Set(CULTURA.map(c=>c.tag))];
    $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ĉiutage · kulturo</div><h1 class="title">Kulturo kaj historio</h1>
     <p class="subtitle">História, símbolos e costumes do Esperantujo. Leia cada cartão sozinha primeiro, depois confira a tradução parágrafo por parágrafo.</p></header>
     ${tags.map(t=>`<h3>${esc(t)}</h3><div class="lexgrid">${CULTURA.map((c,i)=>c.tag!==t?'':`<a class="card lexcard" href="#culture-${i}"><span class="lab">${esc(c.tag)}${S.cult[i]&&S.cult[i].read?' · ✓ legita':''}</span><h3>${esc(c.t)}</h3><span class="note">${esc(c.pt)}</span>${S.cult[i]&&S.cult[i].q?`<span class="note">kvizo: ${S.cult[i].q}</span>`:''}</a>`).join('')}</div>`).join('')}`;
    return;
  }
  const C=CULTURA[id], st=S.cult[id]||{};
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#culture">Kulturo kaj historio</a> · ${esc(C.tag)}</div><h1 class="title">${esc(C.t)}</h1><p class="subtitle">${esc(C.pt)}</p></header>
   <div class="btnrow" style="margin-bottom:18px">${speakBtnHTML('cspeak')}<button class="btn" id="ctrans" aria-pressed="${cultTrans}">${cultTrans?'Kaŝi la tradukon':'Montri la tutan tradukon'}</button></div>
   <article class="reading cult" id="cultart">${C.p.map((p,i)=>`<div class="cpar"><p>${gloss(p[0])}</p><button class="btn ghost ptbtn" data-i="${i}" type="button">${cultTrans?'kaŝi':'traduko'}</button><p class="pt" ${cultTrans?'':'hidden'}>${esc(p[1])}</p></div>`).join('')}</article>
   <p class="note">Vortoj kun punktita substreko: tuŝu ilin por vidi la signifon.</p>
   <section class="card sapevi"><div class="card-h"><h3><span class="pen">Ĉu vi sciis?</span></h3></div><ul class="dots">${C.curio.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
   <section class="card"><div class="card-h"><div><span class="lab">Ŝlosilvortoj</span><h3>Vortoj el la karto</h3></div></div>
    <div class="tw"><table class="tbl lextbl">${C.w.map(w=>`<tr><td><b>${esc(w[0])}</b></td><td class="pt">${esc(w[1])}</td></tr>`).join('')}</table></div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Kvizo</span><h3>Ĉu vi komprenis?</h3></div><span class="score" id="cscore">${st.q||''}</span></div><ol class="items" id="cq"></ol>
    <div class="btnrow"><button class="btn" id="creset">Refari la kvizon</button><button class="btn ${st.read?'':'primary'}" id="cread">${st.read?'✓ Karto legita':'Marki kiel legita'}</button></div></section>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#culture-${id-1}">← ${esc(CULTURA[id-1].t)}</a>`:'<span></span>'}${id<CULTURA.length-1?`<a class="btn ghost" href="#culture-${id+1}">${esc(CULTURA[id+1].t)} →</a>`:''}</div>`;
  $('#ctrans').onclick=()=>{ cultTrans=!cultTrans; renderCultura(id); };
  $('#cultart').querySelectorAll('.ptbtn').forEach(b=>b.onclick=()=>{ const p=b.nextElementSibling; p.hidden=!p.hidden; b.textContent=p.hidden?'traduko':'kaŝi'; });
  bindSpeak('cspeak',()=>C.p.map(p=>p[0].replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g,'$1').replace(/<[^>]+>/g,'')).join(' '));
  const markRead=()=>{ S.cult[id]=Object.assign({},S.cult[id]||{},{read:true}); save(); renderNav(route()); const b=$('#cread'); if(b){ b.textContent='✓ Karto legita'; b.classList.remove('primary'); } };
  $('#cread').onclick=()=>{ if(S.cult[id]&&S.cult[id].read){ S.cult[id].read=false; save(); renderNav(route()); renderCultura(id); } else markRead(); };
  $('#creset').onclick=()=>renderCultura(id);
  mcList($('#cq'),C.q,(s,t)=>{ S.cult[id]=Object.assign({},S.cult[id]||{},{q:s+'/'+t}); showScore($('#cscore'),s,t); markRead(); },i=>[`c${id}-q${i}`,'mc',{q:C.q[i][0],o:C.q[i][1],c:C.q[i][2],e:''},'Kulturo · '+C.t]);
  if(st.q){ const [a,b]=st.q.split('/').map(Number); showScore($('#cscore'),a,b); }
}

/* ═════════ AŬSKULTI KAJ PAROLI ═════════ */
const LVLS=['A1','A2','B1','B2'];
function rateSel(){ const r=S.rate||0.9, have=['eo','pl','it','es'].filter(l=>allVoices().some(v=>new RegExp('^'+l,'i').test(v.lang))), m=S.vmode||'auto';
  return `<div class="rate" role="group" aria-label="Voĉo"><span class="note">Rapido:</span>${[[0.7,'malrapide'],[0.9,'normale'],[1.1,'rapide']].map(([v,l])=>`<button type="button" data-rate="${v}" aria-pressed="${Math.abs(r-v)<.01}">${l}</button>`).join('')}${have.length>1?`<span class="note" style="margin-left:6px">Voĉo:</span><button type="button" data-vm="auto" aria-pressed="${m==='auto'}">aŭtomata</button>${have.map(l=>`<button type="button" data-vm="${l}" aria-pressed="${m===l}">${l}</button>`).join('')}`:''}</div>`; }
function bindRate(root){ (root||document).querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ S.rate=+b.dataset.rate; save(); document.querySelectorAll('[data-rate]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.rate===S.rate)); });
  (root||document).querySelectorAll('[data-vm]').forEach(b=>b.onclick=()=>{ S.vmode=b.dataset.vm; save(); document.querySelectorAll('[data-vm]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.vm===S.vmode)); const vn=document.querySelector('.voicenote b'); if(vn) vn.textContent=VLAB[vLang()]; speakSeq([{text:'Saluton! Ĉu vi aŭdas min bone? Ĉi tio estas la voĉo de la kajero.'}]); }); }
function voiceNote(){
  if(!canSpeak) return `<p class="callout small">Este navegador não tem síntese de voz, então os exercícios de escuta mostram o texto. Tente outro navegador ou o celular.</p>`;
  return `<p class="note voicenote">Voz em uso: <b>${VLAB[vLang()]}</b>. Quase nenhum aparelho traz uma voz de esperanto; sem ela, o caderno lê com uma voz polonesa ou italiana, adaptando a ortografia. O ritmo e o acento ficam certos, mas alguns sons são aproximados: confie mais no texto e nas dicas de pronúncia, e ouça esperantistas de verdade nos vídeos sugeridos.</p>`;
}
function speakSeq(parts,id,opts){
  opts=opts||{};
  if(!canSpeak||!parts.length) return false;
  stopSpeak();
  try{
    const vs=langVoices(), v=vs[0]||null, key=id||'_seq'; speakingId=key;
    parts.forEach((p,i)=>{
      const u=new SpeechSynthesisUtterance(translit(p.text)); u.lang=LTAG[vLang()]; const vv=(p.vi!=null&&vs[p.vi])||v; if(vv) u.voice=vv; u.rate=opts.rate||S.rate||0.9; u.pitch=p.pitch||1;
      if(p.onstart) u.onstart=p.onstart;
      if(i===parts.length-1) u.onend=()=>{ if(speakingId===key){ stopSpeak(); opts.onend&&opts.onend(); } };
      speechSynthesis.speak(u);
    });
    if(id){ const b=document.getElementById(id); if(b){ b.dataset.label=b.dataset.label||b.textContent; b.textContent='■ Halti'; b.setAttribute('aria-pressed','true'); } }
    return true;
  }catch(e){ stopSpeak(); return false; }
}
try{ if(canSpeak) speechSynthesis.onvoiceschanged=()=>{ const vn=document.querySelector('.voicenote b'); if(vn) vn.textContent=VLAB[vLang()]; }; }catch(e){}

const plain=t=>String(t).replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g,'$1');
function sentencesOf(raw){ return (plain(raw).replace(/\n+/g,' ').match(/[^.!?…]+[.!?…»"]*\s*/g)||[]).map(s=>s.trim()).filter(s=>s.length>1); }
function wordsOf(t){ return plain(t).split(/\s+/).filter(w=>/[a-z]/i.test(w)).length; }

/* blocco «leggi ad alta voce»: frasi cliccabili, shadowing, cronometro */
function readAloudBlock(raw,key,{withTitle}={}){
  const paras=String(raw).split(/\n\s*\n/);
  let si=0;
  const html=paras.map(p=>{ const lines=p.split('\n'); return `<p>${lines.map(line=>{ const ss=(line.match(/[^.!?…]+[.!?…»"]*\s*/g)||[line]).filter(x=>x.trim()); return ss.map(s=>`<span class="snt" data-s="${si++}" tabindex="0" role="button">${gloss(esc(s.trim()).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,'[[$1|$2]]'))}</span>`).join(' '); }).join('<br>')}</p>`; }).join('');
  return `<div class="ra" data-key="${esc(key)}">
    <div class="btnrow ractl">${canSpeak?`<button class="btn" type="button" data-act="all" id="ra-all-${esc(key)}">▶ Aŭskulti ĉion</button><button class="btn" type="button" data-act="shadow" id="ra-sh-${esc(key)}">⟲ Ombrado</button>`:''}<button class="btn" type="button" data-act="timer">⏱ Mezuri la legadon</button>${rateSel()}</div>
    <p class="note">${canSpeak?'Toque numa frase para ouvi-la. No <b>ombrado</b> (shadowing) a voz lê uma frase e faz uma pausa: repita em voz alta, copiando o ritmo e o acento na penúltima sílaba.':''} O cronômetro mede a sua leitura em palavras por minuto.</p>
    <div class="ratext reading">${html}</div>
    <div class="ratimer" hidden><b class="big" data-t>0:00</b><button class="btn primary" type="button" data-act="stop">Mi finis</button></div>
    <div class="rawpm"></div></div>`;
}
function bindReadAloud(root,raw,key){
  const box=root.querySelector(`.ra[data-key="${key}"]`); if(!box) return;
  bindRate(box);
  const spans=[...box.querySelectorAll('.snt')], texts=spans.map(s=>s.textContent.trim());
  const clear=()=>spans.forEach(s=>s.classList.remove('on'));
  spans.forEach((s,i)=>{ const go=()=>{ clear(); s.classList.add('on'); speakSeq([{text:texts[i]}],null,{onend:clear}); }; s.onclick=go; s.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); go(); } }; });
  const all=box.querySelector('[data-act="all"]'); if(all) all.onclick=()=>{ if(speakingId===all.id){ stopSpeak(); clear(); return; } speakSeq(texts.map((t,i)=>({text:t,onstart:()=>{ clear(); spans[i].classList.add('on'); }})),all.id,{onend:clear}); };
  const sh=box.querySelector('[data-act="shadow"]');
  if(sh){ let tmr=null, active=false;
    const end=()=>{ active=false; clearTimeout(tmr); clear(); sh.textContent='⟲ Ombrado'; sh.setAttribute('aria-pressed','false'); };
    const step=i=>{ if(!active) return; if(i>=texts.length){ end(); tick(5); toast('<span class="pen">Bonege!</span> Ombrado finita.'); return; }
      clear(); spans[i].classList.add('on'); spans[i].scrollIntoView({block:'nearest',behavior:'smooth'});
      speakSeq([{text:texts[i]}],null,{onend:()=>{ if(!active) return; spans[i].classList.add('you'); const wait=Math.max(1600,wordsOf(texts[i])*620/(S.rate||0.9)); tmr=setTimeout(()=>{ spans[i].classList.remove('you'); step(i+1); },wait); }});
      sh.textContent='■ Haltigi la ombradon'; sh.setAttribute('aria-pressed','true'); active=true; };
    sh.onclick=()=>{ if(active){ stopSpeak(); end(); } else { active=true; step(0); } };
  }
  let t0=0, iv=null; const tb=box.querySelector('.ratimer'), tt=box.querySelector('[data-t]'), out=box.querySelector('.rawpm');
  const showWpm=()=>{ const h=(S.wpm[key]||[]); if(!h.length){ out.innerHTML=''; return; } const last=h[h.length-1], best=Math.max(...h.map(x=>x.w)); out.innerHTML=`<p class="wpm"><b>${last.w}</b> vortoj minute · rekordo <b>${best}</b> · ${h.length} ${h.length===1?'legado':'legadoj'} <span class="note">· uma leitura fluente em voz alta em esperanto fica em torno de 110–140 palavras por minuto (as palavras são longas!)</span></p>`; };
  showWpm();
  box.querySelector('[data-act="timer"]').onclick=()=>{ stopSpeak(); tb.hidden=false; t0=Date.now(); clearInterval(iv); iv=setInterval(()=>{ const s=Math.floor((Date.now()-t0)/1000); tt.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; if(!document.body.contains(tt)) clearInterval(iv); },500); tb.scrollIntoView({block:'nearest'}); };
  box.querySelector('[data-act="stop"]').onclick=()=>{ clearInterval(iv); tb.hidden=true; const min=(Date.now()-t0)/60000; if(min<0.08) return; const w=Math.round(wordsOf(raw)/min); S.wpm[key]=(S.wpm[key]||[]).concat([{w,d:Date.now()}]).slice(-15); tick(Math.max(3,Math.round(min*2))); save(); showWpm(); };
}

/* ---------- pagina: Leggere ad alta voce ---------- */
function renderLeggere(id){
  if(id===undefined){
    $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Aŭskulti kaj paroli · laŭtlegado</div><h1 class="title">Laŭtlegado</h1>
     <p class="subtitle">${TESTI.length} textos do A1 ao B2 para treinar pronúncia e fluência. Ouça, faça o ombrado e depois leia sozinha com o cronômetro. Falar sozinha primeiro é o jeito mais fácil de perder o medo.</p></header>
     ${voiceNote()}
     ${LVLS.map(l=>{ const items=TESTI.map((t,i)=>[t,i]).filter(([t])=>t.lvl===l); return items.length?`<h3>${l}</h3><div class="lexgrid">${items.map(([t,i])=>{ const h=S.wpm['t'+i]||[]; return `<a class="card lexcard" href="#read-aloud-${i}"><span class="lab">${l} · ${wordsOf(t.text)} vortoj</span><h3>${esc(t.t)}</h3>${h.length?`<span class="note">rekordo: ${Math.max(...h.map(x=>x.w))} vortoj/min</span>`:'<span class="note">ankoraŭ ne legita</span>'}</a>`; }).join('')}</div>`:''; }).join('')}
     <h3>Langorompiloj · trava-línguas</h3>
     <section class="card"><p class="note">Diga devagar primeiro, depois cada vez mais rápido. Cada um treina um som do esperanto que o português escreve de outro jeito.</p>${rateSel()}
      <ul class="phr">${SCIOGLI.map((s,i)=>`<li><button class="btn ghost play" type="button" data-sc="${i}" aria-label="Aŭskulti">▶</button><div><div class="phr-it">${esc(s[0])}</div><div class="note">${esc(s[1])}</div></div></li>`).join('')}</ul></section>`;
    bindRate($('#main'));
    $('#main').querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>speakSeq([{text:SCIOGLI[+b.dataset.sc][0]}]));
    return;
  }
  const T=TESTI[id];
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#read-aloud">Laŭtlegado</a> · ${T.lvl}</div><h1 class="title">${esc(T.t)}</h1><p class="subtitle">${wordsOf(T.text)} vortoj</p></header>
   ${voiceNote()}
   ${readAloudBlock(T.text,'t'+id)}
   <section class="card"><div class="card-h"><div><span class="lab">Atentu la prononcon</span><h3>Acento e sons difíceis</h3></div></div><p class="note">As maiúsculas marcam a sílaba tônica: sempre a penúltima.</p><div class="chips">${T.pron.map(esc).join(' · ')}</div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Parolu</span><h3>Respondu laŭte</h3></div></div>
    <ul class="phr">${T.ask.map((q,i)=>`<li><button class="btn ghost play" type="button" data-q="${i}" aria-label="Aŭskulti">▶</button><div class="phr-it">${esc(q)}</div></li>`).join('')}</ul>
    <p class="note">Fale pelo menos um minuto por pergunta. Depois, se quiser, dite a resposta em <a href="#beyond">Rakontu al mi</a> para ser corrigida.</p></section>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#read-aloud-${id-1}">← ${esc(TESTI[id-1].t)}</a>`:'<span></span>'}${id<TESTI.length-1?`<a class="btn ghost" href="#read-aloud-${id+1}">${esc(TESTI[id+1].t)} →</a>`:''}</div>`;
  bindReadAloud($('#main'),T.text,'t'+id);
  $('#main').querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>speakSeq([{text:T.ask[+b.dataset.q]}]));
}

/* ---------- dettato ---------- */
function lcsMatch(a,b){ const n=a.length,m=b.length,dp=Array.from({length:n+1},()=>new Array(m+1).fill(0)); for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]); const hit=new Array(n).fill(false); let i=0,j=0; while(i<n&&j<m){ if(a[i]===b[j]){ hit[i]=true; i++; j++; } else if(dp[i+1][j]>=dp[i][j+1]) i++; else j++; } return hit; }
function dictCheck(target,input){
  const tw=target.split(/\s+/), key=w=>canon(w), loose=w=>canon(w).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
  const iw=input.split(/\s+/).map(canon).filter(Boolean);
  const exact=lcsMatch(tw.map(key),iw), soft=lcsMatch(tw.map(loose),iw.map(loose));
  const html=tw.map((w,i)=>exact[i]?`<span class="dw ok">${esc(w)}</span>`:soft[i]?`<span class="dw acc">${esc(w)}</span>`:`<span class="dw no">${esc(w)}</span>`).join(' ');
  const ok=exact.every(Boolean)&&iw.length===tw.length, acc=!ok&&soft.every(Boolean)&&iw.length===tw.length;
  return {ok,acc,html,miss:tw.length-soft.filter(Boolean).length};
}
function dictCard(box,sentence,src,onDone){
  let plays=0;
  box.innerHTML=`<div class="dict"><div class="btnrow">${canSpeak?`<button class="btn primary" type="button" data-d="play">▶ Aŭskulti</button><button class="btn" type="button" data-d="slow">▶ Pli malrapide</button>`:`<span class="note">Sem voz: leia a frase por três segundos e depois escreva de memória.</span><button class="btn" type="button" data-d="peek">Montri dum 3 sekundoj</button>`}<span class="note" data-d="cnt"></span></div>
    <div class="peek" hidden></div>
    <textarea class="labin" rows="2" spellcheck="false" autocapitalize="off" placeholder="Skribu tion, kion vi aŭdas… (cx → ĉ)" lang="eo"></textarea>
    <div class="btnrow" style="margin-top:8px"><button class="btn" type="button" data-d="check">Kontroli</button></div><div class="fb dres"></div></div>`;
  const ta=box.querySelector('textarea'), cnt=box.querySelector('[data-d="cnt"]');
  const play=r=>{ plays++; cnt.textContent=`aŭdita ${plays}-foje`; speakSeq([{text:sentence}],null,{rate:r}); ta.focus({preventScroll:true}); };
  const pb=box.querySelector('[data-d="play"]'); if(pb) pb.onclick=()=>play();
  const sb=box.querySelector('[data-d="slow"]'); if(sb) sb.onclick=()=>play(0.6);
  const pk=box.querySelector('[data-d="peek"]'); if(pk) pk.onclick=()=>{ const p=box.querySelector('.peek'); p.textContent=sentence; p.hidden=false; setTimeout(()=>{ p.hidden=true; },3000); };
  let done=false;
  const check=()=>{ if(done||!ta.value.trim()) return; done=true; const r=dictCheck(sentence,ta.value);
    box.querySelector('.dres').innerHTML=`<div class="dline">${r.html}</div>${r.ok?'<span class="mark ok">Perfekte! ✓</span>':r.acc?'<span class="mark acc">Preskaŭ: atenção aos acentos.</span>':`<span class="mark no">${r.miss?`${r.miss} ${r.miss===1?'vorto':'vortoj'} por kontroli`:'kontrolu la frazon'}</span>`}`;
    tick(); if(!r.ok&&!r.acc) addErr('dict-'+hashStr(sentence),'dict',{s:sentence},src); onDone&&onDone(r.ok||r.acc); };
  box.querySelector('[data-d="check"]').onclick=check;
  ta.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); check(); } });
  return {play};
}
function orderSentences(u){ const s=u.ex.find(x=>x.t==='order'); return s?s.items.map(i=>i[0]):[]; }

/* ---------- pagina: Ascolto ---------- */
let ascMode='dialoghi', ascLvl=0;
function renderAscolto(id){
  if(id!==undefined) return renderDialogo(id);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Aŭskulti kaj paroli · aŭskultado</div><h1 class="title">Aŭskultado</h1>
   <p class="subtitle">Treine o ouvido: escreva o que ouve, acompanhe cenas entre duas pessoas sem ler e pegue números, preços e horas no ritmo normal.</p></header>
   ${voiceNote()}
   <div class="seg" role="group">${[['dialoghi','Scenoj'],['dettato','Dikto'],['numeri','Nombroj kaj horoj']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${ascMode===k}">${l}</button>`).join('')}</div>
   <div id="ascbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ ascMode=b.dataset.m; renderAscolto(); });
  const ab=$('#ascbody');
  if(ascMode==='dettato'){
    ab.innerHTML=`<div class="chipsel" style="margin-bottom:14px">${BANDS.map((b,i)=>`<button data-l="${i}" aria-pressed="${ascLvl===i}">${b}</button>`).join('')}</div>${rateSel()}<section class="card" id="dcard"></section><p class="note" id="dstat"></p>`;
    bindRate(ab);
    ab.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{ ascLvl=+b.dataset.l; renderAscolto(); });
    const pool=[].concat(...UNITS.filter(u=>u.band===ascLvl).map(u=>orderSentences(u).map(s=>[s,u])));
    let last=null;
    const next=()=>{ let it; do{ it=pool[Math.floor(Math.random()*pool.length)]; }while(pool.length>1&&it===last); last=it;
      const c=$('#dcard'); c.innerHTML=`<div class="card-h"><span class="lab">${esc(uName(it[1]))} · dikto</span></div><div id="dbox"></div><div class="btnrow" style="margin-top:10px"><button class="btn" id="dnext">Sekva →</button></div>`;
      const ctl=dictCard($('#dbox'),it[0],'Aŭskultado · dikto',ok=>{ S.lab.dict=S.lab.dict||{ok:0,tot:0}; S.lab.dict.tot++; if(ok) S.lab.dict.ok++; save(); stat(); });
      $('#dnext').onclick=next; if(canSpeak) setTimeout(()=>ctl.play(),250); };
    const stat=()=>{ const d=(S.lab.dict)||{ok:0,tot:0}; $('#dstat').textContent=`Diktoj: ${d.ok} ĝustaj el ${d.tot}.`; };
    stat(); next();
  } else if(ascMode==='dialoghi'){
    ab.innerHTML=`<div class="lexgrid">${ASCOLTI.map((a,i)=>`<a class="card lexcard" href="#listening-${i}"><span class="lab">${a.lvl}${S.asc[i]?' · '+S.asc[i]:''}</span><h3>${esc(a.t)}</h3><span class="note">${a.lines.length} replikoj · ${a.q.length} demandoj</span></a>`).join('')}</div>`;
  } else numDrill(ab);
}
function renderDialogo(id){
  const A=ASCOLTI[id]; let shown=false;
  const voices={A:1.12,B:0.82,N:1,C:1.0};
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#listening">Aŭskultado</a> · ${A.lvl}${A.where?' · '+esc(A.where):''}</div><h1 class="title">${esc(A.t)}</h1><p class="subtitle">Ouça sem ler, duas vezes se precisar. Responda às perguntas, depois leia a transcrição e as notas sobre o que você pode ter perdido.</p></header>
   ${voiceNote()}
   <div class="btnrow">${canSpeak?'<button class="btn primary" id="dplay" type="button">▶ Aŭskulti la scenon</button>':''}<button class="btn" id="dshow" type="button">${canSpeak?'Montri la transskribon':'Legi la transskribon'}</button>${rateSel()}</div>
   <div class="transcript reading" id="dtext" hidden>${A.lines.map(l=>`<p class="tl tl-${l[0]}"><b>${l[0]==='N'?'':(A.names&&A.names[l[0]]?esc(A.names[l[0]])+': ':'— ')}</b>${esc(l[1])}</p>`).join('')}${A.notes?`<div class="callout small"><span class="pen">Kion vi eble ne aŭdis</span><ul class="dots">${A.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></div>`:''}</div>
   <section class="card" style="margin-top:18px"><div class="card-h"><div><span class="lab">Kompreno</span><h3>Demandoj</h3></div><span class="score" id="dscore"></span></div><ol class="items" id="dq"></ol><div class="btnrow"><button class="btn" id="dreset">Reprovi</button></div></section>
   <div class="btnrow" style="justify-content:space-between;margin-top:24px">${id>0?`<a class="btn ghost" href="#listening-${id-1}">← ${esc(ASCOLTI[id-1].t)}</a>`:'<span></span>'}${id<ASCOLTI.length-1?`<a class="btn ghost" href="#listening-${id+1}">${esc(ASCOLTI[id+1].t)} →</a>`:''}</div>`;
  bindRate($('#main'));
  const dp=$('#dplay'); if(dp) dp.onclick=()=>{ if(speakingId==='dplay'){ stopSpeak(); return; } speakSeq(A.lines.map(l=>({text:l[1],pitch:voices[l[0]],vi:{A:0,B:1,C:2,N:0}[l[0]]})),'dplay'); tick(2); };
  $('#dshow').onclick=()=>{ shown=!shown; $('#dtext').hidden=!shown; $('#dshow').textContent=shown?'Kaŝi la transskribon':(canSpeak?'Montri la transskribon':'Legi la transskribon'); };
  $('#dreset').onclick=()=>renderDialogo(id);
  mcList($('#dq'),A.q,(s,t)=>{ S.asc[id]=s+'/'+t; save(); showScore($('#dscore'),s,t); },i=>[`asc${id}-${i}`,'mc',{q:A.q[i][0],o:A.q[i][1],c:A.q[i][2],e:''},'Aŭskultado · '+A.t]);
  if(S.asc[id]){ const [a,b]=S.asc[id].split('/').map(Number); showScore($('#dscore'),a,b); }
}
let numType='numeri';
function numDrill(ab){
  const types=[['numeri','Nombroj'],['prezzi','Prezoj'],['orari','Horoj'],['anni','Jaroj'],['telefono','Telefonnumeroj']];
  ab.innerHTML=`<div class="chipsel" style="margin-bottom:14px">${types.map(([k,l])=>`<button data-t="${k}" aria-pressed="${numType===k}">${l}</button>`).join('')}</div>${rateSel()}<section class="card drill" id="ncard"></section><p class="note">Escreva com algarismos: 27 · 12,40 · 3:15 · 1987 · 0207 946 0321. As horas usam o relógio de 12 horas. Atenção aos pares que confundem: <i>dek ses</i> (16) × <i>sesdek</i> (60).</p>`;
  bindRate(ab);
  ab.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ numType=b.dataset.t; numDrill(ab); });
  const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const ORD=['','unua','dua','tria','kvara','kvina','sesa','sepa','oka','naŭa','deka','dek-unua','dek-dua'];
  const next=()=>{
    let say,ans,show;
    if(numType==='numeri'){ const pick=R(0,3); const n=pick===0?[16,60,17,70,18,80,19,90,12,20,13,30][R(0,11)]:pick===1?R(0,100):pick===2?R(100,9999):R(10000,999999); say=eoNum(n); ans=String(n); show=n.toLocaleString('pt-BR'); }
    else if(numType==='prezzi'){ const e=R(1,199), c=[0,5,10,20,25,40,50,75,90,95,99][R(0,10)]; say=`${eoNum(e)} ${e===1?'eŭro':'eŭroj'}${c?` kaj ${eoNum(c)} ${c===1?'cendo':'cendoj'}`:''}`; ans=(e+c/100).toFixed(2); show=ans.replace('.',',')+' €'; }
    else if(numType==='orari'){ const h=R(1,12), m=[0,5,10,15,20,25,30,35,40,45,50,55][R(0,11)], nh=ORD[h%12+1];
      if(m===0) say=`Estas la ${ORD[h]}.`; else if(m===15) say=`Estas la ${ORD[h]} kaj kvarono.`; else if(m===30) say=`Estas la ${ORD[h]} kaj duono.`; else if(m===45) say=`Estas kvarono antaŭ la ${nh}.`;
      else if(m>30&&Math.random()<.5) say=`Estas ${eoNum(60-m)} antaŭ la ${nh}.`; else say=`Estas la ${ORD[h]} kaj ${eoNum(m)}.`;
      ans=`${h}:${String(m).padStart(2,'0')}`; show=ans; }
    else if(numType==='anni'){ const y=R(1850,2030); say=`en ${eoNum(y)}`; ans=String(y); show=String(y); }
    else { const d=()=>R(0,9); const p=[0,d(),d(),d(),' ',d(),d(),d(),' ',d(),d(),d(),d()]; show=p.join(''); ans=show.replace(/\s/g,''); say=show.split(' ').map(g=>g.split('').map(x=>eoNum(x)).join(' ')).join(', '); }
    const c=$('#ncard'); c.innerHTML=`${canSpeak?'<button class="btn primary" id="nplay" type="button">▶ Aŭskulti</button>':`<div class="verb" style="font-size:32px">${esc(say)}</div>`}<div style="margin-top:14px"><input id="nin" inputmode="decimal" autocomplete="off" aria-label="respondo" data-nox="1"></div><div class="fb" id="nfb"></div><div class="btnrow" style="justify-content:center"><button class="btn" id="nnext" type="button">Sekva →</button></div>`;
    const inp=$('#nin'); let done=false;
    const play=()=>speakSeq([{text:say}]); const pb=$('#nplay'); if(pb){ pb.onclick=play; setTimeout(play,250); }
    const normN=v=>{ v=String(v).replace(/[€\s]/g,''); if(numType==='orari'){ const m=v.match(/^(\d{1,2})[:.h]?(\d{2})?$/); return m?`${(+m[1]%12)||12}:${m[2]||'00'}`:v; } if(numType==='prezzi'){ const f=parseFloat(v.replace(/\.(?=\d{3}(\D|$))/g,'').replace(',','.')); return isNaN(f)?v:f.toFixed(2); } return v.replace(/\D/g,''); };
    const check=()=>{ if(done) { next(); return; } if(!inp.value.trim()) return; done=true; const ok=normN(inp.value)===ans; tick(); $('#nfb').innerHTML=(ok?'<span class="mark ok">Ĝuste! ✓</span>':`<span class="mark no">${esc(show)}</span>`)+`<p class="note">«${esc(say)}»</p>`; inp.style.color=ok?'var(--verde)':'var(--rosso)'; };
    inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); check(); } }); inp.focus({preventScroll:true});
    $('#nnext').onclick=next;
  };
  next();
}
