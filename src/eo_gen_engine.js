
/* ---------- LEGOĈAMBRO: novaj tekstoj verkitaj de la AI ---------- */
function ltDefLvl(){ const u=[...UNITS].reverse().find(x=>uPct(x)>=50); return u?(u.band===0?'A1':u.band===1?'A2':(u.id>=11?'B2':'B1')):'A1'; }
let ltLvl=null, ltLen='meza';
function ltForm(box){
  ltLvl=ltLvl||ltDefLvl();
  const list=Object.values(S.lt||{}).sort((a,b)=>b.d-a.d);
  box.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Nova teksto ✦</span><h3>Um texto novo, no seu nível, sobre o que você quiser</h3></div></div>
   <p class="note">A IA escreve um texto original com glossário nas palavras novas, cinco perguntas e uma tarefa de escrita. Os textos ficam guardados aqui embaixo.</p>
   <div class="radset">
    <label><span class="lab">Nível</span><select id="lt-lvl" class="vsel">${LVLS.map(l=>`<option ${ltLvl===l?'selected':''}>${l}</option>`).join('')}</select></label>
    <label><span class="lab">Tamanho</span><select id="lt-len" class="vsel">${[['mallonga','curto (≈5 min)'],['meza','médio (≈10 min)'],['longa','longo (≈15 min)']].map(([k,l])=>`<option value="${k}" ${ltLen===k?'selected':''}>${l}</option>`).join('')}</select></label>
    <label><span class="lab">Tema (opcional)</span><input id="lt-topic" class="vsel" placeholder="ex.: inteligência artificial, Lisboa, café, futebol" autocomplete="off" data-nox="1"></label>
   </div>
   <div class="chipsel" style="margin-bottom:12px">${['vivo en Madrido','teknologio','vojaĝoj','historio','scienco','manĝaĵo','Esperanto-movado','misterrakonto'].map(t=>`<button type="button" data-tp="${esc(t)}">${esc(t)}</button>`).join('')}</div>
   <div class="btnrow"><button class="btn primary" id="lt-go" type="button">Verki la tekston</button><span class="note" id="lt-msg"></span></div></section>
   ${list.length?`<h3 style="margin-top:24px">Viaj tekstoj</h3><div class="lexgrid">${list.map(T=>`<a class="card lexcard" href="#reading-room-g-${T.id}"><span class="lab">${T.lvl} · ${T.words} vortoj${T.topic?' · '+esc(T.topic):''}</span><h3>${esc(T.title)}</h3><span class="note">${T.score?'demandoj '+T.score:'nova'}${T.done?' · ✓ farita':''}</span></a>`).join('')}</div>`:''}`;
  box.querySelectorAll('[data-tp]').forEach(b=>b.onclick=()=>{ $('#lt-topic').value=b.dataset.tp; });
  $('#lt-lvl').onchange=e=>{ ltLvl=e.target.value; };
  $('#lt-len').onchange=e=>{ ltLen=e.target.value; };
  $('#lt-go').onclick=()=>genText();
}
async function genText(){
  const btn=$('#lt-go'), msg=$('#lt-msg'), lvl=$('#lt-lvl').value, len=$('#lt-len').value, topic=$('#lt-topic').value.trim();
  const sample=await getSample(); if(!sample){ msg.textContent='Gerar textos só funciona com esta página aberta dentro do Claude.'; return; }
  const W={A1:[90,140,190],A2:[140,220,300],B1:[200,320,420],B2:[260,400,550]}[lvl]||[150,250,350];
  const words=W[['mallonga','meza','longa'].indexOf(len)];
  const grammar={A1:'present, past and future (-as, -is, -os), the accusative, basic vocabulary, short simple sentences, no participles, no conditional',
    A2:'everything from A1 plus prepositions and direction, common affixes (mal-, -ej-, -ist-, -in-, -et-, -eg-, re-, ek-), correlatives, comparisons, -ig-/-iĝ-, si/sia; still no participle adverbs',
    B1:'everything from A2 plus the conditional (-us) and volitive (-u, ke…-u), active participles (-ante, -inte, -anta), more varied vocabulary',
    B2:'natural, rich Esperanto: passive participles, reported speech, particles (ja, eĉ, tamen, do, ajn), nuance and opinion, richer vocabulary'}[lvl];
  btn.disabled=true; msg.textContent='Mi verkas la tekston… (cerca de meio minuto)';
  const prompt=`You write graded reading material in Esperanto for a Brazilian adult learner (native Portuguese, fluent Spanish, works as a programmer, lives in Madrid). Level: ${lvl} (CEFR).
${topic?`Topic: ${topic}.`:'Choose an engaging, original topic (daily life, travel, science, technology, history, culture or the Esperanto community).'}
Write an ORIGINAL text of about ${words} words in correct, natural Esperanto that follows the Fundamento (use ĉ ĝ ĥ ĵ ŝ ŭ, never the x-system), in ${words<160?3:words<300?4:5} paragraphs. It can be a short story, a blog post, a news-style article or a letter. Grammar allowed at this level: ${grammar}.
Mark 8 to 12 words that are probably new at this level with double brackets and a Portuguese gloss: [[vorto|tradução]]. Never mark easy words or words that look the same in Portuguese.
Then write 5 multiple-choice comprehension questions in Esperanto (4 options, exactly one correct, plausible distractors, in text order; mix detail, inference and meaning in context), each with a short explanation in Portuguese.
Finally write one short writing task in Portuguese (one sentence) that makes the learner reuse words from the text and the grammar of the level.
Answer only with JSON: {"title":"short title in Esperanto","paragraphs":["…","…"],"q":[["question",["A","B","C","D"],index_of_correct_0_to_3,"explanation in Portuguese"]],"task":"writing task in Portuguese"}`;
  try{
    const d=await sample.json(prompt,{cache:false,modelTier:'complex'});
    const paras=(Array.isArray(d.paragraphs)?d.paragraphs:[]).map(p=>String(p||'').replace(/<[^>]*>/g,'').trim()).filter(Boolean);
    const q=(d.q||[]).filter(x=>Array.isArray(x)&&Array.isArray(x[1])&&x[1].length===4&&+x[2]>=0&&+x[2]<4).map(x=>[String(x[0]),x[1].map(String),+x[2],String(x[3]||'')]);
    if(paras.length<2||q.length<3) throw {code:'invalid_json'};
    const id='t'+Date.now().toString(36), plain=paras.join(' ').replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g,'$1');
    S.lt=S.lt||{}; S.lt[id]={id,d:Date.now(),lvl,topic,title:String(d.title||'Nova teksto').slice(0,80),p:paras,q,task:String(d.task||'Resuma o texto com as suas palavras em cinco frases.').slice(0,300),words:plain.split(/\s+/).length};
    const ks=Object.keys(S.lt).sort((a,b)=>S.lt[a].d-S.lt[b].d); while(ks.length>20) delete S.lt[ks.shift()];
    save(); tick(3); location.hash='reading-room-g-'+id;
  }catch(e){ msg.textContent=e&&e.code==='invalid_json'?'O texto veio incompleto. Tente de novo.':errMsg(e); btn.disabled=false; }
}
function renderGenLeg(id){
  const T=(S.lt||{})[id]; if(!T){ location.hash='reading-room'; return; }
  const set=(k,v)=>{ T[k]=v; save(); };
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#reading-room">Legoĉambro</a> · nova teksto · ${T.lvl}${T.topic?' · '+esc(T.topic):''}</div><h1 class="title">${esc(T.title)}</h1><p class="subtitle">${T.words} vortoj · verkita de la AI la ${esc(fmtDay(dayKey(new Date(T.d))))}</p></header>
   <article class="reading">${T.p.map(p=>`<p>${gloss(esc(p))}</p>`).join('')}</article>
   <p class="note">Toque nas palavras sublinhadas para ver a tradução. Texto gerado por IA: se algo parecer estranho, confira no <a href="https://vortaro.net" target="_blank" rel="noopener">vortaro.net</a>.</p>
   <section class="card"><div class="card-h"><div><span class="lab">Kompreno</span><h3>Demandoj</h3></div><span class="score" id="ltsc"></span></div><ol class="items" id="ltq"></ol><div class="btnrow"><button class="btn" id="ltreset" type="button">Reprovi</button></div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Skribu</span><h3>Tasko</h3></div><span class="note" id="ltwc"></span></div><p class="task">${esc(T.task)}</p>
    <textarea class="paper" id="ltw" style="min-height:170px" lang="eo" spellcheck="false" placeholder="Skribu ĉi tie… (cx → ĉ)">${esc(T.w||'')}</textarea>
    <div class="btnrow" style="margin-top:10px"><button class="btn red" id="ltcorr" type="button">Korekti per la ruĝa plumo</button><button class="btn ${T.done?'':'primary'}" id="ltdone" type="button">${T.done?'✓ Farita':'Marki kiel farita'}</button></div><div id="ltout"></div></section>
   <div class="done-row"><button class="btn ghost" id="ltdel" type="button">Forigi ĉi tiun tekston</button><a class="btn" href="#reading-room">← Legoĉambro</a></div>`;
  const draw=()=>mcList($('#ltq'),T.q,(s,t)=>{ set('score',s+'/'+t); showScore($('#ltsc'),s,t); },i=>[`lt${id}-${i}`,'mc',{q:T.q[i][0],o:T.q[i][1],c:T.q[i][2],e:T.q[i][3]||''},'Legoĉambro · '+T.title]);
  draw(); $('#ltreset').onclick=draw;
  if(T.score){ const [a,b]=T.score.split('/').map(Number); showScore($('#ltsc'),a,b); }
  const ta=$('#ltw'), wcf=()=>{ $('#ltwc').textContent=(ta.value.trim()?ta.value.trim().split(/\s+/).length:0)+' vortoj'; }; wcf();
  ta.oninput=()=>{ set('w',ta.value); wcf(); };
  $('#ltcorr').onclick=()=>quickCorr($('#ltout'),ta.value,T.task,T.lvl);
  $('#ltdone').onclick=()=>{ set('done',!T.done); if(T.done) tick(5); const b=$('#ltdone'); b.textContent=T.done?'✓ Farita':'Marki kiel farita'; b.classList.toggle('primary',!T.done); };
  let arm=0; $('#ltdel').onclick=()=>{ const n=Date.now(); if(n-arm>4000){ arm=n; toast('Toque de novo para apagar este texto.'); return; } delete S.lt[id]; save(); location.hash='reading-room'; };
}
