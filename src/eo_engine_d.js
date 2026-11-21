
/* ---------- paĝo: Parolado ---------- */
let parMode='ia', orLvl='A1', chat=null, orTimer=null;
function stopOral(){ if(orTimer){ clearInterval(orTimer); orTimer=null; } }
const bandOf=l=>/^A1/.test(l)?0:/^A2/.test(l)?1:2;
function renderParlare(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Aŭskulti kaj paroli · parolado</div><h1 class="title">Parolado</h1>
   <p class="subtitle">Um lugar seguro para perder o medo: um parceiro de IA que nunca julga, frases prontas para ganhar tempo e uma prova oral cronometrada.</p></header>
   <div class="seg" role="group">${[['ia','Konversacio'],['frasi','Utilaj frazoj'],['orale','Parola ekzameno']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${parMode===k}">${l}</button>`).join('')}</div>
   <div id="pbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ parMode=b.dataset.m; stopOral(); renderParlare(); });
  const pb=$('#pbody');
  if(parMode==='ia') return chat?renderChat(pb):chatPick(pb);
  if(parMode==='frasi'){
    pb.innerHTML=`${voiceNote()}${rateSel()}<p class="note">Ouça, repita em voz alta e depois tente dizer sem olhar. Aprenda primeiro as frases para «ganhar tempo»: são elas que mantêm a conversa viva quando as palavras não vêm.</p>${FRASARIO.map((s,si)=>`<section class="card"><div class="card-h"><div><span class="lab">${s.lvl}</span><h3>${esc(s.t)}</h3></div>${canSpeak?`<button class="btn" type="button" data-all="${si}" id="fa-${si}">▶ Ĉiuj</button>`:''}</div><ul class="phr">${s.f.map((f,fi)=>`<li><button class="btn ghost play" type="button" data-f="${si}-${fi}" aria-label="Aŭskulti">▶</button><div><div class="phr-it">${esc(f[0])}</div><div class="note">${esc(f[1])}</div></div></li>`).join('')}</ul></section>`).join('')}`;
    bindRate(pb);
    pb.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{ const [a,c]=b.dataset.f.split('-').map(Number); speakSeq([{text:FRASARIO[a].f[c][0]}]); });
    pb.querySelectorAll('[data-all]').forEach(b=>b.onclick=()=>{ if(speakingId===b.id){ stopSpeak(); return; } speakSeq(FRASARIO[+b.dataset.all].f.map(f=>({text:f[0]})),b.id); });
    return;
  }
  orale(pb);
}
function chatPick(pb){
  pb.innerHTML=`<section class="card tipcard"><span class="pen">Como «falar» aqui</span><p>Use o <b>microfone</b> do teclado do celular (ou o ditado do computador: Win+H no Windows, Ditado nos ajustes de teclado do Mac) e diga a resposta em voz alta. O ditado não conhece o esperanto, então escolha o idioma português ou italiano e confira o texto antes de enviar; se ele escrever algo estranho, é um retorno grátis sobre a pronúncia. A IA responde, lê a resposta em voz alta e corrige você com gentileza; as correções vão para o Kajero de eraroj. Errar aqui é esperado: o único objetivo é continuar falando.</p></section>
   <div class="lexgrid">${ROLEPLAY.map((r,i)=>`<button class="card lexcard rpc" type="button" data-r="${i}"><span class="lab">${r.lvl}</span><h3>${esc(r.t)}</h3><span class="note">${esc(r.goal)}</span></button>`).join('')}</div>`;
  pb.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{ chat={sc:ROLEPLAY[+b.dataset.r],turns:[],msgs:[]}; renderChat(pb); chatSend(null); });
}
const LVLHINT={A1:'very short simple sentences, present/past/future in -as/-is/-os, very common words',A2:'simple sentences with the accusative, prepositions, correlatives and common affixes',B1:'natural sentences with the conditional, the volitive and participles',B2:'rich, idiomatic Esperanto with particles, affixes and participles, at normal speed'};
function chatRules(sc){ const lang=aiLang({band:bandOf(sc.lvl)})==='pt'?'Portuguese':'simple Esperanto';
  return `You are ${sc.role}. You are having a practice conversation IN ESPERANTO with a Brazilian student (native Portuguese, fluent Spanish) at level ${sc.lvl}. Be warm, patient and encouraging; never lecture. Goal of the conversation: ${sc.goal}.
Rules: always stay in character and always write in correct, natural Esperanto suited to level ${sc.lvl} (${LVLHINT[sc.lvl]||LVLHINT.A2}), with the letters ĉ ĝ ĥ ĵ ŝ ŭ and natural spoken touches ("nu", "do", "ja", "ĉu vere?"); answer in 1-3 short sentences and almost always ask a question to keep the conversation going; if she writes in Portuguese or Spanish, answer in Esperanto and give her the Esperanto words. Correct only real mistakes (accusative, agreement, verb endings, -ig/-iĝ, prepositions, false friends), not style; accept the x-system (cx = ĉ) without correcting it.
ALWAYS answer only with a JSON object: {"risposta":"your line in character, in Esperanto","correzione":"her message corrected with as few changes as possible, or an empty string if it was correct or she has not written yet","nota":"a very short explanation of the mistake in ${lang}, or an empty string","suggerimenti":["two possible short replies she could give, in Esperanto, at level ${sc.lvl}"]}`; }
function renderChat(pb){
  const sc=chat.sc;
  pb.innerHTML=`<div class="btnrow" style="justify-content:space-between;margin-bottom:12px"><div><span class="lab note">${sc.lvl} · celo</span><div><b>${esc(sc.t)}</b>: ${esc(sc.goal)}</div></div><div class="btnrow"><label class="note chk"><input type="checkbox" id="autosp" ${S.autoSpeak!==false?'checked':''}> laŭtlegi la respondojn</label><button class="btn" id="cend" type="button">Taksi la konversacion</button><button class="btn ghost" id="cnew" type="button">Ŝanĝi la scenon</button></div></div>
   <div class="chatbox" id="chatbox"></div>
   <div class="sugg" id="sugg"></div>
   <div class="chatin"><textarea id="cin" rows="2" class="labin" placeholder="Skribu aŭ diktu vian respondon… (cx → ĉ)" spellcheck="false" lang="eo"></textarea><button class="btn primary" id="csend" type="button">Sendi</button></div>
   <p class="note">Enter para enviar · Shift+Enter para nova linha.</p>
   <div id="ceval"></div>`;
  $('#autosp').onchange=e=>{ S.autoSpeak=e.target.checked; save(); };
  $('#cnew').onclick=()=>{ stopSpeak(); chat=null; renderParlare(); };
  $('#csend').onclick=()=>{ const t=$('#cin').value.trim(); if(t) chatSend(t); };
  $('#cin').addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); const t=e.target.value.trim(); if(t) chatSend(t); } });
  $('#cend').onclick=chatEval;
  drawChat();
}
function drawChat(){
  const box=$('#chatbox'); if(!box) return;
  box.innerHTML=chat.msgs.map((m,i)=>m.who==='ai'?`<div class="bub ai"><div>${esc(m.text)}</div>${canSpeak?`<button class="btn ghost play" type="button" data-say="${i}" aria-label="Aŭskulti">▶</button>`:''}</div>`:m.who==='me'?`<div class="bub me"><div>${esc(m.text)}</div>${m.corr?`<div class="corr"><span class="pen">✎</span> ${esc(m.corr)}${m.nota?`<div class="note">${esc(m.nota)}</div>`:''}</div>`:''}</div>`:`<div class="bub sys">${esc(m.text)}</div>`).join('');
  box.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>speakSeq([{text:chat.msgs[+b.dataset.say].text}]));
  box.scrollTop=box.scrollHeight;
}
async function chatSend(text){
  const sample=await getSample();
  if(!sample){ chat.msgs.push({who:'sys',text:'A conversa com IA só funciona com esta página aberta dentro do Claude.'}); drawChat(); return; }
  if(text){ text=xsys(text); chat.msgs.push({who:'me',text}); chat.turns.push({role:'user',content:`Student's message: «${text}»\n(Answer only with the requested JSON.)`}); $('#cin').value=''; tick(2); }
  chat.msgs.push({who:'sys',text:'…'}); drawChat();
  const btn=$('#csend'); if(btn) btn.disabled=true;
  try{
    const turns=[{role:'user',content:chatRules(chat.sc)+'\n\nYou start the conversation, setting the scene naturally, in Esperanto.'}].concat(chat.turns);
    const r=await sample.json(turns,{cache:false});
    chat.msgs.pop();
    const reply=String((r&&r.risposta)||'…');
    chat.turns.push({role:'assistant',content:JSON.stringify(r)});
    if(text && r && r.correzione && canon(r.correzione)!==canon(text)){ const me=[...chat.msgs].reverse().find(m=>m.who==='me'); if(me){ me.corr=String(r.correzione); me.nota=String(r.nota||''); } addErr('chat-'+hashStr(text),'lab',{q:text,s:'Korektu la frazon (konversacio)',a:[String(r.correzione)],n:String(r.nota||'')},'Konversacio · '+chat.sc.t); }
    chat.msgs.push({who:'ai',text:reply}); drawChat();
    const sg=$('#sugg'); if(sg){ const ss=(r&&Array.isArray(r.suggerimenti))?r.suggerimenti.slice(0,3).map(String):[]; sg.innerHTML=ss.length?`<span class="note">Ideoj:</span> ${ss.map((s,i)=>`<button class="chip" type="button" data-sg="${i}">${esc(s)}</button>`).join('')}`:''; sg.querySelectorAll('[data-sg]').forEach(b=>b.onclick=()=>{ $('#cin').value=ss[+b.dataset.sg]; $('#cin').focus(); }); }
    if(S.autoSpeak!==false) speakSeq([{text:reply}]);
  }catch(e){ chat.msgs.pop(); chat.msgs.push({who:'sys',text:errMsg(e)}); if(text) chat.turns.pop(); drawChat(); }
  if(btn) btn.disabled=false;
}
async function chatEval(){
  const out=$('#ceval'); const mine=chat.msgs.filter(m=>m.who==='me');
  if(mine.length<3){ out.innerHTML='<div class="ai-out"><p>Escreva pelo menos três mensagens antes de pedir a avaliação.</p></div>'; return; }
  const sample=await getSample(); if(!sample) return;
  const lang=aiLang({band:bandOf(chat.sc.lvl)})==='pt'?'PORTUGUESE':'simple ESPERANTO';
  const tr=chat.msgs.filter(m=>m.who!=='sys').map(m=>(m.who==='me'?'STUDENT: ':'PARTNER: ')+m.text).join('\n');
  out.innerHTML='<div class="ai-out"><div class="stamp">La instruisto legas…</div><div id="cevb"></div></div>';
  try{ const r=await sample(`You are an encouraging Esperanto teacher. Assess this practice conversation in Esperanto by a Brazilian student (she also speaks Spanish and is building her confidence), scenario «${chat.sc.t}», level ${chat.sc.lvl}. Answer in ${lang} with these markdown sections (write any Esperanto with ĉ ĝ ĥ ĵ ŝ ŭ):
## Nível e impressão geral
## O que você fez bem
## 3 erros para corrigir
(format: ~~wrong~~ → **right**: explanation; mark [PT] or [ES] for interference)
## 5 expressões úteis para a próxima vez

CONVERSATION:
${tr}`,{cache:false,onText:({text})=>{ const b=$('#cevb'); if(b) b.innerHTML=md(text); }});
    $('#cevb').innerHTML=md(r.text); out.querySelector('.stamp').textContent='Takso'; tick(5);
  }catch(e){ out.innerHTML=`<div class="ai-out"><p>${esc(errMsg(e))}</p></div>`; }
}
function orale(pb){
  const items=ORALE.map((o,i)=>[o,i]).filter(([o])=>o.lvl===orLvl);
  pb.innerHTML=`<p class="note">Prática no estilo da prova oral do KER: um tempo para se preparar e depois você fala sozinha pelo tempo indicado. Fale para a parede, para o gravador do celular ou para o gato: o que importa é não parar. Depois se avalie e, se quiser, dite o que disse para receber um retorno.</p>
   <div class="chipsel" style="margin-bottom:14px">${LVLS.map(l=>`<button data-l="${l}" aria-pressed="${orLvl===l}">${l}</button>`).join('')}</div>
   ${items.map(([o,i])=>`<section class="card oral" data-o="${i}"><div class="card-h"><div><span class="lab">${o.lvl} · ${esc(o.t)}</span><h3 class="oq">${esc(o.p)}</h3></div>${S.orale[i]?`<span class="score">${S.orale[i]}</span>`:''}</div>
    <div class="btnrow">${canSpeak?`<button class="btn ghost" type="button" data-act="say">▶ Aŭskulti la taskon</button>`:''}<button class="btn primary" type="button" data-act="go">Komenci: ${o.prep} s por prepari, ${Math.round(o.talk/60*10)/10} min por paroli</button></div><div class="otimer"></div><div class="oafter"></div></section>`).join('')}`;
  pb.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{ orLvl=b.dataset.l; stopOral(); orale(pb); });
  pb.querySelectorAll('.oral').forEach(sec=>{ const i=+sec.dataset.o, o=ORALE[i];
    const say=sec.querySelector('[data-act="say"]'); if(say) say.onclick=()=>speakSeq([{text:o.p}]);
    sec.querySelector('[data-act="go"]').onclick=()=>{ stopOral(); stopSpeak(); const tbox=sec.querySelector('.otimer'); let phase='prep', left=o.prep;
      const draw=()=>{ tbox.innerHTML=`<div class="drill"><span class="lab">${phase==='prep'?'Preparado: notu ideojn':'Parolu laŭte!'}</span><div class="verb ${phase==='talk'?'talk':''}">${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}</div><button class="btn" type="button" data-act="skip">${phase==='prep'?'Mi pretas: komenci paroli':'Mi finis'}</button></div>`; tbox.querySelector('[data-act="skip"]').onclick=()=>{ left=0; tickT(); }; };
      const tickT=()=>{ if(left>0){ left--; draw(); return; } if(phase==='prep'){ phase='talk'; left=o.talk; draw(); } else { stopOral(); tbox.innerHTML=''; afterOral(sec,i,o); } };
      draw(); orTimer=setInterval(tickT,1000); };
  });
}
function afterOral(sec,i,o){
  const crit=['Flueco','Gramatiko','Vortprovizo','Prononco','Kohereco'];
  const box=sec.querySelector('.oafter');
  box.innerHTML=`<div class="selfev"><span class="lab">Memtakso · de 1 ĝis 4</span>${crit.map((c,ci)=>`<div class="evrow"><span>${c}</span><span class="chipsel">${[1,2,3,4].map(n=>`<button type="button" data-c="${ci}" data-n="${n}">${n}</button>`).join('')}</span></div>`).join('')}</div>
   <p class="note" style="margin-top:12px">Quer um retorno? Dite ou digite o que você disse (mais ou menos já basta) e receba uma correção.</p>
   <textarea class="labin" rows="4" placeholder="Diktu aŭ skribu vian respondon ĉi tie…" lang="eo"></textarea><div class="btnrow" style="margin-top:8px"><button class="btn red" type="button" data-act="fb">Korekti mian respondon</button></div><div class="ofb"></div>`;
  const sc={}; box.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{ const c=b.dataset.c; sc[c]=+b.dataset.n; box.querySelectorAll(`[data-c="${c}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b)); if(Object.keys(sc).length===crit.length){ const tot=Object.values(sc).reduce((a,b)=>a+b,0); S.orale[i]=tot+'/20'; save(); tick(10); toast(`<span class="pen">Konservita:</span> ${tot}/20`); } });
  box.querySelector('[data-act="fb"]').onclick=async()=>{ const t=box.querySelector('textarea').value.trim(), out=box.querySelector('.ofb'); if(t.split(/\s+/).length<15){ out.innerHTML='<p class="note">Escreva pelo menos 15 palavras.</p>'; return; }
    const sample=await getSample(); if(!sample){ out.innerHTML='<p class="note">A correção só funciona com esta página aberta dentro do Claude.</p>'; return; }
    const lang=aiLang({band:bandOf(o.lvl)})==='pt'?'PORTUGUESE':'simple ESPERANTO';
    out.innerHTML='<div class="ai-out"><div class="stamp">La ekzamenanto aŭskultas…</div><div class="ofbb"></div></div>';
    try{ const r=await sample(`You are a friendly KER oral examiner (the CEFR-based Esperanto exam). This is a transcript of a spoken answer in Esperanto by a Brazilian student who also speaks Spanish and is building her confidence; it may be dictated or typed with the x-system (cx = ĉ). Level: ${o.lvl}. Task: «${o.p}». Ignore punctuation and small speech-to-text errors (but if a word looks like a mispronunciation, say so).
Answer in ${lang} with these markdown sections (write Esperanto with ĉ ĝ ĥ ĵ ŝ ŭ):
## Nível estimado e comentário geral
## Pontos fortes
## Erros principais
(format: ~~wrong~~ → **right**: explanation)
## Versão melhorada
(a short, natural version of what she wanted to say, at level ${o.lvl})
## Da próxima vez
3 concrete tips

TRANSCRIPT:
"""${t}"""`,{cache:false,onText:({text})=>{ const b=out.querySelector('.ofbb'); if(b) b.innerHTML=md(text); }});
      out.querySelector('.ofbb').innerHTML=md(r.text); out.querySelector('.stamp').textContent='Komentoj'; tick(5);
    }catch(e){ out.innerHTML=`<p class="note">${esc(errMsg(e))}</p>`; } };
}

/* ---------- paĝo: Legaĵoj, muziko kaj mi ---------- */
let fuoriMode='parole';
const SRC=['libro','muziko','podkasto','video','filmo','konversacio','kurso','alia'];
function renderFuori(){
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Aŭskulti kaj paroli · vera vivo</div><h1 class="title">Legaĵoj, muziko kaj mi</h1>
   <p class="subtitle">Livros, músicas, vídeos e conversas: guarde aqui as palavras novas, registre o seu tempo e conte o que leu ou ouviu.</p></header>
   <div class="seg" role="group">${[['parole','Miaj vortoj'],['registro','Studtaglibro'],['racconta','Rakontu al mi'],['risorse','Kie trovi Esperanton']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${fuoriMode===k}">${l}</button>`).join('')}</div><div id="fbody2"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ fuoriMode=b.dataset.m; renderFuori(); });
  const fb=$('#fbody2');
  if(fuoriMode==='parole') return myWords(fb);
  if(fuoriMode==='registro') return studyLog(fb);
  if(fuoriMode==='racconta') return racconta(fb);
  risorse(fb);
}
function myWords(fb){
  const ids=Object.keys(S.myvoc).sort((a,b)=>(S.myvoc[b].d||0)-(S.myvoc[a].d||0));
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Aldoni</span><h3>Nova vorto aŭ esprimo</h3></div><span class="note">${ids.length} vortoj</span></div>
    <form id="mvf" class="mvform"><input id="mv-it" placeholder="Esperanto (ekz. ĝui)" required autocomplete="off" lang="eo"><input id="mv-pt" placeholder="português (aproveitar)" required autocomplete="off" data-nox="1"><input id="mv-ex" placeholder="a frase onde você achou (opcional)" autocomplete="off" lang="eo"><select id="mv-src">${SRC.map(s=>`<option value="${s}">${s}</option>`).join('')}</select><button class="btn primary" type="submit">Aldoni</button></form></section>
   ${ids.length?`<div class="btnrow" style="margin-bottom:12px"><button class="btn primary" id="mvrev" type="button">Ripeti miajn vortojn</button><input id="mvq" class="vsel" placeholder="Serĉi…" autocomplete="off"></div><section class="card" id="mvcard" hidden></section>
   <div class="tw"><table class="tbl lextbl" id="mvtbl">${ids.map(k=>{ const w=S.myvoc[k]; return `<tr data-k="${k}"><td>${canSpeak?`<button class="btn ghost play" type="button" data-say="${k}">▶</button>`:''}<b>${esc(w.it)}</b></td><td class="pt">${esc(w.pt)}</td><td><i>${esc(w.ex||'')}</i></td><td class="note">${esc(w.src||'')}</td><td><button class="btn ghost" type="button" data-del="${k}">Forigi</button></td></tr>`; }).join('')}</table></div>`:'<p class="note">Ainda não há palavras. Guarde as palavras e expressões que você encontra em livros, músicas e vídeos (cinco por capítulo é um bom hábito): você as revisa aqui e, se errar, elas voltam no Kajero de eraroj.</p>'}`;
  $('#mvf').onsubmit=e=>{ e.preventDefault(); const it=xsys($('#mv-it').value.trim()), pt=$('#mv-pt').value.trim(); if(!it||!pt) return; const k='w'+Date.now().toString(36); S.myvoc[k]={it,pt,ex:xsys($('#mv-ex').value.trim()),src:$('#mv-src').value,d:Date.now()}; tick(); save(); myWords(fb); setTimeout(()=>$('#mv-it')&&$('#mv-it').focus(),0); };
  fb.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ const k=b.dataset.del; delete S.myvoc[k]; removeErr('my-'+k); save(); myWords(fb); });
  fb.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>speakSeq([{text:S.myvoc[b.dataset.say].it}]));
  const q=$('#mvq'); if(q) q.oninput=()=>{ const v=q.value.toLowerCase(); fb.querySelectorAll('#mvtbl tr').forEach(tr=>{ tr.hidden=v&&!tr.textContent.toLowerCase().includes(v); }); };
  const rv=$('#mvrev'); if(rv) rv.onclick=()=>{ const order=shuffle(ids).slice(0,20); let pos=0, ok=0; const card=$('#mvcard'); card.hidden=false;
    const show=()=>{ if(pos>=order.length){ card.innerHTML=`<div class="drill"><div class="pen" style="font-size:34px">Farite!</div><p>${ok} ĝustaj el ${order.length}.</p></div>`; return; }
      const w=S.myvoc[order[pos]]; card.innerHTML=`<div class="drill"><span class="lab">${pos+1}/${order.length} · kiel oni diras en Esperanto?</span><div class="verb" style="font-size:34px">${esc(w.pt)}</div><input id="mvin" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="fb" id="mvfb"></div></div>`;
      const inp=$('#mvin'); inp.focus({preventScroll:true}); let done=false;
      inp.onkeydown=e=>{ if(e.key!=='Enter') return; e.preventDefault(); if(done){ pos++; show(); return; } if(!inp.value.trim()) return; done=true; const r=judge(inp.value,[w.it,w.it.replace(/^la\s+/i,'')]); tick(); if(r!=='no') ok++; else addErr('my-'+order[pos],'myvoc',{k:order[pos]},'Miaj vortoj'); $('#mvfb').innerHTML=(r==='ok'?'<span class="mark ok">Ĝuste! ✓</span>':r==='acc'?`<span class="mark acc">Preskaŭ: ${esc(w.it)}</span>`:`<span class="mark no">${esc(w.it)}</span>`)+(w.ex?`<p class="expl">${esc(w.ex)}</p>`:'')+'<p class="note">Enter por daŭrigi</p>'; if(canSpeak) speakSeq([{text:w.it}]); };
    };
    show(); card.scrollIntoView({block:'nearest'}); };
}
function studyLog(fb){
  const days=Object.keys(S.log).sort().reverse();
  const week=[...Array(7)].map((_,i)=>addDays(-i));
  const tot={}; week.forEach(d=>(S.log[d]||[]).forEach(e=>{ tot[e.t]=(tot[e.t]||0)+e.m; }));
  const all=Object.values(S.log).flat().reduce((a,e)=>a+e.m,0);
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Registri</span><h3>Kion vi legis, aŭskultis aŭ ekzercis hodiaŭ?</h3></div></div>
    <form id="lgf" class="mvform"><select id="lg-t">${SRC.map(s=>`<option value="${s}">${s}</option>`).join('')}</select><input id="lg-m" type="number" min="1" max="600" placeholder="minutoj" required data-nox="1"><input id="lg-n" placeholder="noto (ekz. Gerda malaperis!, ĉap. 3; Kajto)" autocomplete="off"><button class="btn primary" type="submit">Registri</button></form>
    <p class="note">Todo dia registrado conta para a sua sequência de estudo.</p></section>
   <div class="rgrid"><div class="card"><span class="lab">Lastaj 7 tagoj</span><b class="big">${Object.values(tot).reduce((a,b)=>a+b,0)}<small> min</small></b><span class="note">${Object.entries(tot).map(([k,v])=>`${k}: ${v}`).join(' · ')||'—'}</span></div><div class="card"><span class="lab">Entute</span><b class="big">${Math.round(all/6)/10}<small> horoj</small></b><span class="note">da vera Esperanto</span></div><div class="card"><span class="lab">Hodiaŭ</span><b class="big">${(S.log[dayKey()]||[]).reduce((a,e)=>a+e.m,0)}<small> min</small></b></div></div>
   ${days.length?`<section class="card"><ul class="errlist">${days.slice(0,30).map(d=>`<li><div><div class="el-t">${eoDate(new Date(d+'T12:00:00'),'wd')}</div><div class="note">${S.log[d].map(e=>`${esc(e.t)} ${e.m} min${e.n?' ('+esc(e.n)+')':''}`).join(' · ')}</div></div></li>`).join('')}</ul></section>`:''}`;
  $('#lgf').onsubmit=e=>{ e.preventDefault(); const m=Math.max(1,Math.min(600,parseInt($('#lg-m').value,10)||0)); if(!m) return; const d=dayKey(); S.log[d]=(S.log[d]||[]).concat([{t:$('#lg-t').value,m,n:$('#lg-n').value.trim()}]); tick(m); save(); toast(`<span class="pen">Registrita:</span> ${m} minutoj`); studyLog(fb); };
}
function racconta(fb){
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Rakontu al mi</span><h3>Kion vi legis aŭ aŭskultis hodiaŭ?</h3></div></div>
   <p>Resuma em esperanto o capítulo que leu, a música que ouviu ou o vídeo que viu, ou diga o que achou. Também pode ditar com o microfone do teclado: isso também é treino de fala.</p>
   <textarea class="paper" id="rctext" style="min-height:200px" placeholder="Hodiaŭ mi legis / aŭskultis…" lang="eo">${esc(S.racconta||'')}</textarea>
   <div class="btnrow" style="margin-top:10px"><button class="btn red" id="rcgo" type="button">Korekti per la ruĝa plumo</button><span class="note" id="rcwc"></span></div><div id="rcout"></div></section>`;
  const ta=$('#rctext'), wc=()=>{ $('#rcwc').textContent=(ta.value.trim()?ta.value.trim().split(/\s+/).length:0)+' vortoj'; }; wc();
  ta.oninput=()=>{ S.racconta=ta.value; save(); wc(); };
  $('#rcgo').onclick=async()=>{ const t=ta.value.trim(), out=$('#rcout'); if(t.split(/\s+/).length<20){ out.innerHTML='<p class="note">Escreva pelo menos 20 palavras.</p>'; return; }
    const sample=await getSample(); if(!sample){ out.innerHTML='<p class="note">A correção só funciona com esta página aberta dentro do Claude.</p>'; return; }
    const lang=aiLang({band:1})==='pt'?'PORTUGUESE':'simple ESPERANTO';
    out.innerHTML='<div class="ai-out"><div class="stamp">La instruisto legas…</div><div id="rcb"></div></div>';
    try{ const r=await sample(`You are an Esperanto teacher. A Brazilian student (she also speaks Spanish) tells you in Esperanto what she read, listened to or studied today. The text may be dictated or typed with the x-system (cx = ĉ): ignore missing punctuation. Answer in ${lang} with these markdown sections (write Esperanto with ĉ ĝ ĥ ĵ ŝ ŭ):
## Nível estimado
## Erros
(format: ~~wrong~~ → **right**: explanation; mark [PT] or [ES] for interference)
## Texto corrigido
## 5 palavras ou expressões novas para aprender
(useful for this topic, with Portuguese translation; include affix-built words and expressions a fluent speaker would use)

TEXT:
"""${t}"""`,{cache:false,onText:({text})=>{ const b=$('#rcb'); if(b) b.innerHTML=md(text); }});
      $('#rcb').innerHTML=md(r.text); out.querySelector('.stamp').textContent='Korektita ✓'; tick(10);
    }catch(e){ out.innerHTML=`<p class="note">${esc(errMsg(e))}</p>`; } };
}
const yt=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
function risorse(fb){
  const L=(h,t)=>`<a href="${h}" target="_blank" rel="noopener">${t}</a>`;
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Metodo</span><h3>Um capítulo, três passadas</h3></div></div>
   <ol class="dots"><li><b>Leia o capítulo inteiro</b> sem parar e sem dicionário, só para entender a história.</li><li><b>Releia uma página</b> devagar, sublinhando as palavras novas. Muitas você vai deduzir decompondo os afixos (<i>mal·san·ul·ej·o</i>).</li><li><b>Leia essa página em voz alta</b> e cronometre em <a href="#read-aloud">Laŭtlegado</a>.</li><li><b>Guarde cinco palavras</b> em <a href="#beyond" data-go="parole">Miaj vortoj</a>, com a frase onde as achou.</li><li><b>Resuma</b> o capítulo em cinco frases em <a href="#beyond" data-go="racconta">Rakontu al mi</a> e <b>registre</b> os minutos no <a href="#beyond" data-go="registro">Studtaglibro</a>.</li></ol></section>
   <section class="card"><div class="card-h"><div><span class="lab">Por lerni</span><h3>Cursos e ferramentas gratuitos</h3></div></div>
   <ul class="dots">
    <li><b>Cursos</b> · ${L('https://lernu.net','lernu.net')} (cursos e dicionário, em português) · ${L('https://www.duolingo.com','Duolingo')} (curso de esperanto para falantes de português) · ${L('https://kurso.com.br','Kurso de Esperanto')} (programa gratuito feito no Brasil)</li>
    <li><b>Gramática e dicionários</b> · ${L('https://bertilow.com/pmeg/','PMEG')} (a gramática de referência, em esperanto) · ${L('https://reta-vortaro.de','Reta Vortaro')} · ${L('https://vortaro.net','PIV, vortaro.net')}</li>
    <li><b>Conhecer pessoas</b> · ${L('https://amikumu.com','Amikumu')} (aplicativo para achar falantes perto de você) · ${L('https://www.pasportaservo.org','Pasporta Servo')} · ${L('https://esperanto.org.br','Brazila Esperanto-Ligo')}</li>
    <li><b>Ler</b> · ${L('https://eo.wikipedia.org','Vikipedio')} · ${L('https://www.liberafolio.org','Libera Folio')} (notícias do movimento) · a revista <i>Monato</i></li>
   </ul></section>
   <section class="card"><div class="card-h"><div><span class="lab">Por aŭskulti</span><h3>Vídeos, podcasts e música</h3></div></div>
   <ul class="dots">
    <li><b>Cursos em vídeo</b> · ${L(yt('Pasporto al la tuta mondo'),'Pasporto al la tuta mondo')} · ${L(yt('Mazi en Gondolando esperanto'),'Mazi en Gondolando')}</li>
    <li><b>Canais e podcasts</b> · ${L(yt('Evildea esperanto'),'Evildea')} · ${L(yt('Esperanto podkasto'),'podcasts em esperanto')} · ${L(yt('Esperanta Retradio'),'Esperanta Retradio')}</li>
    <li><b>Música</b> · ${L(yt('Kajto esperanto'),'Kajto')} · ${L(yt('JoMo esperanto'),'JoMo')} · ${L(yt('Dolchamar esperanto'),'Dolchamar')} · ${L(yt('Persone esperanto'),'Persone')} · ${L(yt('Jonny M esperanto'),'Jonny M')}</li>
   </ul></section>
   <section class="card"><div class="card-h"><div><span class="lab">Laŭ temo</span><h3>Vídeos para cada unidade</h3></div></div><p class="note">Em cada unidade, na aba «Aŭskultu kaj parolu», estão as buscas certas para o tema.</p>
    <div class="vlinks">${UNITS.map(u=>{ const s=USPEAK[u.id]; return s?`<div><b>${esc(uName(u))}</b> · ${s.v.map(q=>`<a href="${yt(q)}" target="_blank" rel="noopener">${esc(q)}</a>`).join(' · ')}</div>`:''; }).join('')}</div></section>`;
  fb.querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{ e.preventDefault(); fuoriMode=a.dataset.go; renderFuori(); });
}

/* ---------- langeto de la unuo: Aŭskultu kaj parolu ---------- */
function tabParla(u,c){
  const st=S.spk[u.id]||{}, sp=USPEAK[u.id]||{p:[],v:[]};
  const raw=u.reading.text.replace(/<b>[^<]*:<\/b>\s*/g,'— ').replace(/<\/p>\s*<p>/g,'\n\n').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim();
  const sents=orderSentences(u);
  c.innerHTML=`${voiceNote()}
   <section class="card"><div class="card-h"><div><span class="lab">1 · Laŭtlegado</span><h3>${esc(u.reading.title)}</h3></div></div>${readAloudBlock(raw,'u'+u.id)}</section>
   <section class="card"><div class="card-h"><div><span class="lab">2 · Dikto</span><h3>Skribu tion, kion vi aŭdas</h3></div><span class="score" id="pdscore">${st.dict||''}</span></div><div id="pdbox"></div><p class="note" id="pdpos"></p></section>
   <section class="card"><div class="card-h"><div><span class="lab">3 · Respondu laŭte</span><h3>Parolu dum unu minuto</h3></div></div>
    <p class="note">Leia ou ouça a pergunta e responda em voz alta, sem escrever. Use a gramática da unidade. Depois marque a pergunta.</p>
    <ul class="phr">${sp.p.map((q,i)=>`<li><button class="btn ghost play" type="button" data-q="${i}" aria-label="Aŭskulti">▶</button><div class="phr-it">${esc(q)}</div><button class="btn ghost said ${st.said&&st.said[i]?'kn':''}" type="button" data-said="${i}">${st.said&&st.said[i]?'✓ farite':'ĉu farite?'}</button></li>`).join('')}</ul>
    <p class="note">Quer correção? Dite uma resposta em <a href="#beyond" id="pracc">Rakontu al mi</a> ou pratique na <a href="#speaking" id="pconv">konversacio kun AI</a>.</p></section>
   <section class="card"><div class="card-h"><div><span class="lab">4 · Spektu kaj aŭskultu</span><h3>Vídeos sobre o tema</h3></div></div>
    <ul class="dots">${sp.v.map(q=>`<li><a href="${yt(q)}" target="_blank" rel="noopener">${esc(q)}</a> <span class="note">(busca no YouTube)</span></li>`).join('')}</ul>
    <p class="note">Depois de assistir, registre os minutos no seu <a href="#beyond" id="preg">Studtaglibro</a>.</p></section>
   <div class="done-row"><button class="btn ${st.done?'':'primary'}" id="pdone" type="button">${st.done?'✓ Aŭskultado kaj parolado faritaj':'Marki kiel farita'}</button></div>`;
  bindReadAloud(c,raw,'u'+u.id);
  const set=(k,v)=>{ S.spk[u.id]=Object.assign({},S.spk[u.id]||{},{[k]:v}); save(); };
  c.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>speakSeq([{text:sp.p[+b.dataset.q]}]));
  c.querySelectorAll('[data-said]').forEach(b=>b.onclick=()=>{ const said=Object.assign({},(S.spk[u.id]||{}).said||{}); const i=b.dataset.said; said[i]=!said[i]; if(said[i]) tick(3); set('said',said); b.textContent=said[i]?'✓ farite':'ĉu farite?'; b.classList.toggle('kn',!!said[i]); });
  [['pracc','racconta'],['preg','registro']].forEach(([id,m])=>{ const a=$('#'+id); if(a) a.onclick=()=>{ fuoriMode=m; }; });
  const pc=$('#pconv'); if(pc) pc.onclick=()=>{ parMode='ia'; };
  $('#pdone').onclick=()=>{ set('done',!(S.spk[u.id]||{}).done); tabParla(u,c); refreshProgress(u); };
  let pos=0, ok=0;
  const next=()=>{ if(pos>=sents.length){ $('#pdbox').innerHTML=`<p><span class="mark ok">Dikto finita: ${ok}/${sents.length}</span></p><button class="btn" type="button" id="pdagain">Refari</button>`; set('dict',ok+'/'+sents.length); showScore($('#pdscore'),ok,sents.length); if(!(S.spk[u.id]||{}).done){ set('done',true); refreshProgress(u); const b=$('#pdone'); if(b){ b.textContent='✓ Aŭskultado kaj parolado faritaj'; b.classList.remove('primary'); } } $('#pdagain').onclick=()=>{ pos=0; ok=0; next(); }; $('#pdpos').textContent=''; return; }
    $('#pdpos').textContent=`Frazo ${pos+1} el ${sents.length}`;
    dictCard($('#pdbox'),sents[pos],uName(u)+' · dikto',good=>{ if(good) ok++; const b=document.createElement('button'); b.className='btn'; b.type='button'; b.textContent=pos+1<sents.length?'Sekva frazo →':'Vidi la rezulton'; b.style.marginTop='8px'; b.onclick=()=>{ pos++; next(); }; $('#pdbox').appendChild(b); b.focus(); });
  };
  if(sents.length) next(); else $('#pdbox').innerHTML='<p class="note">Neniu frazo por ĉi tiu unuo.</p>';
  if(st.dict){ const [a,b]=st.dict.split('/').map(Number); showScore($('#pdscore'),a,b); }
}

/* ---------- ripasso: nuovi tipi ---------- */
function reviewExtra(box,e,finish){
  const d=e.d, chk=$('#rvcheck');
  if(e.k==='dict'){
    box.innerHTML='<div id="rvd"></div>'; chk.hidden=true;
    const ctl=dictCard($('#rvd'),d.s,e.src,ok=>{ finish(ok,''); });
    if(canSpeak) setTimeout(()=>ctl.play(),250);
    return true;
  }
  if(e.k==='myvoc'){
    const w=S.myvoc[d.k]; if(!w){ box.innerHTML='<p class="note">Vorto forigita.</p>'; chk.onclick=()=>finish(true,''); return true; }
    box.innerHTML=`<div class="drill" style="padding:6px 0"> <span class="lab">kiel oni diras en Esperanto?</span><div class="verb" style="font-size:34px">${esc(w.pt)}</div><input id="rvin" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    const inp=$('#rvin'); inp.focus({preventScroll:true});
    const go=()=>{ if(!inp.value.trim()) return; const r=judge(inp.value,[w.it,w.it.replace(/^la\s+/i,'')]); finish(r!=='no',`<p class="corrected">${esc(w.it)}</p>${w.ex?`<p class="expl">${esc(w.ex)}</p>`:''}`); };
    inp.addEventListener('keydown',ev=>{ if(ev.key==='Enter'){ ev.preventDefault(); if(!$('#rvnext').hidden) $('#rvnext').click(); else go(); } }); chk.onclick=go;
    return true;
  }
  return false;
}
/* ---------- READING EXAMS ---------- */
let examTimer=null, examRun=null, examFilter='all';
function stopExamTimer(){ if(examTimer){ clearInterval(examTimer); examTimer=null; } }
const LETTERS='ABCDEFG';
function examById(id){ return EXAMS.find(e=>e.id===id) || (S.examGen&&S.examGen[id]) || null; }
function examTotal(E){ return E.type==='gapped'?E.a.length:E.q.length; }
function examScoreLabel(r,E){ return r?`${r.best}/${examTotal(E)}`:''; }
function renderExams(id){
  if(id) return renderExam(id);
  const gen=Object.values(S.examGen||{}).sort((a,b)=>(b.d||0)-(a.d||0));
  const card=E=>{ const r=S.exam[E.id]; const T=EXAM_TYPES[E.type]; return `<a class="card lexcard" href="#exam-${E.id}"><span class="lab">${E.lvl} · ${T.exam}</span><h3>${esc(E.title)}</h3><span class="note">${T.name} · ${examTotal(E)} demandoj · ${E.minutes} min</span>${r?`<span class="note"><b>plej bone ${r.best}/${examTotal(E)}</b> · ${r.n} ${r.n===1?'provo':'provoj'}</span>`:'<span class="note">ankoraŭ ne farita</span>'}</a>`; };
  const types=Object.keys(EXAM_TYPES);
  const list=EXAMS.filter(E=>examFilter==='all'||E.type===examFilter);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Testoj · legado por ekzamenoj</div><h1 class="title">Legaj ekzamenoj</h1>
   <p class="subtitle">Práticas cronometradas no estilo da prova de leitura do KER (B1 e B2): textos longos, três tipos de pergunta e uma explicação para cada resposta. Gere quantas práticas novas quiser ou use os seus próprios textos.</p></header>
   <div class="chipsel" id="exfilter" style="margin-bottom:16px"><button data-f="all" aria-pressed="${examFilter==='all'}">ĉiuj</button>${types.map(t=>`<button data-f="${t}" aria-pressed="${examFilter===t}">${EXAM_TYPES[t].name}</button>`).join('')}</div>
   <div class="lexgrid">${list.map(card).join('')}</div>
   ${gen.length?`<h3>Viaj generitaj ekzercoj</h3><div class="lexgrid">${gen.filter(E=>examFilter==='all'||E.type===examFilter).map(card).join('')}</div>`:''}
   <section class="card" style="margin-top:24px"><div class="card-h"><div><span class="lab">Senlima ekzercado</span><h3>Generi novan ekzercon</h3></div></div>
    <p>O Claude escreve um texto novo e original em esperanto, no estilo do exame, com perguntas e explicações. Escolha o formato, o nível e, se quiser, um tema. Ou cole um texto em esperanto que você quer ler e receba perguntas sobre ele.</p>
    <div class="genform">
     <label><span class="lab">Formato</span><select id="gx-type" class="vsel">${types.map(t=>`<option value="${t}">${EXAM_TYPES[t].name} (${EXAM_TYPES[t].exam})</option>`).join('')}</select></label>
     <label><span class="lab">Nivelo</span><select id="gx-lvl" class="vsel"><option>A2</option><option selected>B1</option><option>B2</option></select></label>
     <label><span class="lab">Temo (nedeviga)</span><input id="gx-topic" class="vsel" placeholder="ekz. teknologio, vojaĝoj, historio, muziko" autocomplete="off"></label>
    </div>
    <details class="gxown"><summary>Uzi mian propran tekston (plurelekta aŭ vera/malvera/ne dirite)</summary><textarea id="gx-text" class="labin" rows="6" placeholder="Algluu artikolon aŭ paĝon el libro en Esperanto (150 ĝis 900 vortoj)…" lang="eo"></textarea></details>
    <div class="btnrow" style="margin-top:12px"><button class="btn red" id="gx-go" type="button">Generi la ekzercon</button><span class="note" id="gx-msg"></span></div></section>
   <h2 class="sec" style="margin-top:30px">Kiel trakti ĉiun formaton</h2>
   ${types.map(t=>`<section class="card"><div class="card-h"><div><span class="lab">${EXAM_TYPES[t].exam}</span><h3>${EXAM_TYPES[t].name}</h3></div></div><p>${EXAM_TYPES[t].how}</p></section>`).join('')}
   <section class="card"><div class="card-h"><div><span class="lab">Ĝenerala strategio</span><h3>Ler mais rápido sem perder o sentido</h3></div></div>
    <ul class="dots"><li><b>Passe os olhos primeiro</b> (1–2 minutos): título, primeiro e último parágrafo, a primeira frase de cada parágrafo.</li><li><b>A paráfrase é a chave.</b> As respostas raramente repetem as palavras do texto: em esperanto, muitas vezes trocam a palavra por um derivado (<i>helpi → helpema</i>) ou por um correlativo.</li><li><b>Palavras que mudam tudo:</b> <i>nur, ĉiuj, neniam, kelkaj, plejparte, krom, tamen, malgraŭ</i>. Uma delas costuma ser a armadilha.</li><li><b>Leia os afixos.</b> <i>mal-</i> inverte o sentido; <i>-ebl-</i>, <i>-ind-</i>, <i>-ig-</i> mudam a frase toda. Uma letra pode ser a resposta.</li><li><b>Tempo:</b> cerca de 1,5 minuto por pergunta. Aqui o relógio mostra.</li></ul></section>`;
  $('#exfilter').querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{ examFilter=b.dataset.f; renderExams(); });
  $('#gx-go').onclick=generateExam;
}
function renderExam(id){
  const E=examById(id); if(!E){ location.hash='exams'; return; }
  const T=EXAM_TYPES[E.type], r=S.exam[E.id];
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#exams">Legaj ekzamenoj</a> · ${E.lvl} · ${T.exam}${E.gen?' · generita':''}</div><h1 class="title">${esc(E.title)}</h1>
   <p class="subtitle">${T.name} · ${examTotal(E)} demandoj · ${E.minutes} minutoj${r?` · plej bone ${r.best}/${examTotal(E)}`:''}</p></header>
   <div id="exbody"></div>`;
  if(examRun&&examRun.id===E.id&&examRun.result) return examResult(E);
  $('#exbody').innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">Kiel fari</span><h3>${T.name}</h3></div></div><p>${T.how}</p>
   <p class="note">O relógio começa quando você aperta «Komenci». Dá para entregar antes. As respostas erradas vão para o Kajero de eraroj com a explicação.</p>
   <div class="btnrow"><button class="btn primary" id="exstart" type="button">Komenci · ${E.minutes} min</button><button class="btn" id="exnotime" type="button">Ekzerci sen horloĝo</button>${E.gen?'<button class="btn ghost" id="exdel" type="button">Forigi ĉi tiun ekzercon</button>':''}</div></section>`;
  $('#exstart').onclick=()=>startExam(E,true);
  $('#exnotime').onclick=()=>startExam(E,false);
  const d=$('#exdel'); if(d) d.onclick=()=>{ delete S.examGen[E.id]; delete S.exam[E.id]; save(); location.hash='exams'; };
}
function examTextHTML(E){
  if(E.type==='gapped'){
    return `<article class="reading exread">${E.parts.map((p,i)=>p+(i<E.a.length?`<div class="gapbox"><span class="gapn">${i+1}</span><select class="vsel gapsel" data-g="${i}" aria-label="Truo ${i+1}"><option value="">elektu A–G</option>${E.opts.map((_,k)=>`<option value="${k}">${LETTERS[k]}</option>`).join('')}</select></div>`:'')).join('')}</article>
     <section class="card"><div class="card-h"><div><span class="lab">La mankantaj alineoj</span><h3>A–G (unu estas superflua)</h3></div></div><ol class="optlist">${E.opts.map((o,k)=>`<li><b>${LETTERS[k]}</b><span>${esc(o)}</span></li>`).join('')}</ol></section>`;
  }
  if(E.type==='match') return `<div class="mtexts">${E.sections.map(s=>`<article class="card reading exread"><div class="card-h"><h3><span class="mletter">${s[0]}</span> ${esc(s[1])}</h3></div>${s[2]}</article>`).join('')}</div>`;
  return `<article class="reading exread">${E.text}</article>`;
}
function startExam(E,timed){
  stopExamTimer();
  examRun={id:E.id,ans:{},result:null,timed,end:Date.now()+E.minutes*60000};
  const qs = E.type==='gapped'?'' : E.type==='match'
    ? E.q.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="opts" data-i="${i}">${E.sections.map((s,j)=>`<button class="opt" type="button" data-j="${j}">${s[0]}</button>`).join('')}</div></div></li>`).join('')
    : E.type==='tfng'
    ? E.q.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="opts" data-i="${i}">${['Vera','Malvera','Ne dirite'].map((o,j)=>`<button class="opt" type="button" data-j="${j}">${o}</button>`).join('')}</div></div></li>`).join('')
    : E.q.map((q,i)=>`<li><div><div class="q">${esc(q[0])}</div><div class="opts" data-i="${i}">${q[1].map((o,j)=>`<button class="opt" type="button" data-j="${j}">${LETTERS[j]} · ${esc(o)}</button>`).join('')}</div></div></li>`).join('');
  $('#exbody').innerHTML=`${timed?`<div class="timer" id="extimer"><span>Restas <b id="exleft">${E.minutes}:00</b></span><button class="btn primary" id="exsend" type="button">Transdoni</button></div>`:''}
   <div class="exgrid ${E.type==='mc'||E.type==='tfng'?'two':''}"><div class="extext">${examTextHTML(E)}</div>
   ${qs?`<section class="card exq"><div class="card-h"><div><span class="lab">Demandoj</span><h3>${E.type==='match'?'Kiu persono aŭ teksto…?':'Respondu la demandojn'}</h3></div></div><ol class="items">${qs}</ol></section>`:''}</div>
   <div class="btnrow" style="justify-content:flex-end"><button class="btn primary" id="exsend2" type="button">Transdoni kaj kontroli</button></div>`;
  $('#exbody').querySelectorAll('.opts').forEach(g=>g.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ g.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); examRun.ans[+g.dataset.i]=+b.dataset.j; }));
  $('#exbody').querySelectorAll('.gapsel').forEach(s=>s.onchange=()=>{ examRun.ans[+s.dataset.g]=s.value===''?undefined:+s.value; });
  const send=()=>gradeExam(E); const s1=$('#exsend'); if(s1) s1.onclick=send; $('#exsend2').onclick=send;
  if(timed){ const upd=()=>{ const el=$('#exleft'); if(!el){ stopExamTimer(); return; } const left=Math.max(0,examRun.end-Date.now()); el.textContent=`${Math.floor(left/60000)}:${String(Math.floor(left%60000/1000)).padStart(2,'0')}`; $('#extimer').classList.toggle('low',left<3*60000); if(left<=0){ stopExamTimer(); gradeExam(E); } }; upd(); examTimer=setInterval(upd,1000); }
  window.scrollTo(0,0);
}
function examKey(E){ return E.type==='mc'?'c':E.type==='tfng'?'tf':'m'; }
function gradeExam(E){
  if(!examRun||examRun.result) return; stopExamTimer();
  const src='Legaj ekzamenoj · '+E.title, A=examRun.ans;
  let ok=[];
  if(E.type==='gapped'){
    ok=E.a.map((c,i)=>{ const good=A[i]===c; if(!good) addErr(`ex-${E.id}-${i}`,'mc',{q:`Truo ${i+1} en «${E.title}»: kiu alineo taŭgas? (antaŭ ĝi: «${plain(E.parts[i]).replace(/<[^>]+>/g,'').trim().slice(-90)}»)`,o:E.opts.map((o,k)=>LETTERS[k]+' · '+o.slice(0,90)+(o.length>90?'…':'')),c,e:E.e[i]||''},src); return good; });
  } else {
    ok=E.q.map((q,i)=>{ let c,o; if(E.type==='mc'){ c=q[2]; o=q[1]; } else if(E.type==='tfng'){ c={T:0,F:1,NG:2}[q[1]]; o=['Vera','Malvera','Ne dirite']; } else { c=q[1]; o=E.sections.map(s=>s[0]+' · '+s[1]); }
      const good=A[i]===c; if(!good) addErr(`ex-${E.id}-${i}`,'mc',{q:(E.type==='match'?'Kiu… ':'')+q[0],o,c,e:(E.type==='mc'?q[3]:q[2])||''},src); return good; });
  }
  const score=ok.filter(Boolean).length, tot=ok.length;
  const prev=S.exam[E.id]||{best:0,n:0};
  S.exam[E.id]={best:Math.max(prev.best,score),last:score,n:(prev.n||0)+1,d:Date.now()};
  tick(10+score); save();
  examRun.result={ok,score,tot};
  renderNav(route()); examResult(E);
}
function examResult(E){
  const R=examRun.result, A=examRun.ans, pct=Math.round(100*R.score/R.tot);
  const verdict=pct>=80?'Preta por la ekzameno':pct>=60?'Sukceso: daŭrigu!':'Ankoraŭ ne';
  let rows='';
  if(E.type==='gapped') rows=E.a.map((c,i)=>`<li><div><div class="q">Truo ${i+1}: via respondo <b>${A[i]==null?'—':LETTERS[A[i]]}</b></div><div class="${R.ok[i]?'corrected':'expl'}">${R.ok[i]?'✓':'✗ ĝusta respondo: '+LETTERS[c]} · ${esc(E.e[i]||'')}</div></div></li>`).join('')+`<li><div><div class="q">Superflua alineo (ne uzita): <b>${LETTERS[[...E.opts.keys()].find(k=>!E.a.includes(k))]}</b></div></div></li>`;
  else rows=E.q.map((q,i)=>{ let right,mine,ex; if(E.type==='mc'){ right=LETTERS[q[2]]+' · '+q[1][q[2]]; mine=A[i]==null?'—':LETTERS[A[i]]; ex=q[3]; } else if(E.type==='tfng'){ const L=['Vera','Malvera','Ne dirite']; right={T:'Vera',F:'Malvera',NG:'Ne dirite'}[q[1]]; mine=A[i]==null?'—':L[A[i]]; ex=q[2]; } else { right=E.sections[q[1]][0]+' · '+E.sections[q[1]][1]; mine=A[i]==null?'—':E.sections[A[i]][0]; ex=q[2]; }
    return `<li><div><div class="q">${esc(q[0])} <span class="note">· vi: ${esc(mine)}</span></div><div class="${R.ok[i]?'corrected':'expl'}">${R.ok[i]?'✓':'✗ '+esc(right)} · ${esc(ex||'')}</div></div></li>`; }).join('');
  $('#exbody').innerHTML=`<section class="card result ${pct>=60?'pass':''}"><div class="drill"><span class="lab">Rezulto</span><div class="verb">${R.score}<small style="font-size:.45em">/${R.tot}</small></div><div class="pen" style="font-size:30px">${verdict}</div>
    <p class="note">${pct}% · No KER, cerca de 60% é aprovação no nível; 80% sugere que você está pronta para o nível seguinte. Os erros estão no Kajero de eraroj, com explicações.</p></div>
    <div class="btnrow" style="justify-content:center"><button class="btn" id="exagain" type="button">Reprovi</button><a class="btn" href="#exams">Pliaj ekzercoj</a><a class="btn" href="#review">Kajero de eraroj</a></div></section>
   <section class="card"><div class="card-h"><h3>Respondoj kaj klarigoj</h3></div><ol class="items">${rows}</ol></section>
   <details class="card"><summary><b>Relegi la tekston</b></summary>${examTextHTML(E).replace(/<select[\s\S]*?<\/select>/g,'')}</details>`;
  $('#exagain').onclick=()=>{ examRun=null; renderExam(E.id); };
  window.scrollTo(0,0);
}
async function generateExam(){
  const btn=$('#gx-go'), msg=$('#gx-msg'), type=$('#gx-type').value, lvl=$('#gx-lvl').value, topic=$('#gx-topic').value.trim(), own=xsys(($('#gx-text').value||'').trim());
  if(own && !(type==='mc'||type==='tfng')){ msg.textContent='Via propra teksto funkcias kun «Plurelekta legado» aŭ «Vera / Malvera / Ne dirite».'; return; }
  if(own && own.split(/\s+/).length<150){ msg.textContent='Algluu almenaŭ 150 vortojn.'; return; }
  const sample=await getSample(); if(!sample){ msg.textContent='Generi ekzercojn eblas nur kun ĉi tiu paĝo malfermita en Claude.'; return; }
  btn.disabled=true; msg.textContent='Mi verkas la tekston kaj la demandojn… (ĉirkaŭ unu minuto)';
  const lang=aiLang({band:lvl==='B2'?2:1})==='pt'?'Portuguese':'simple Esperanto';
  const base=`You are an experienced writer of reading papers for the KER exams (the CEFR-based international Esperanto exams). Level: ${lvl}. The candidate is a Brazilian adult who speaks Portuguese and Spanish. Everything (text and questions) must be in correct, natural Esperanto with ĉ ĝ ĥ ĵ ŝ ŭ, following the Fundamento and PMEG, with vocabulary suited to ${lvl}. Explanations must be in ${lang}, max 30 words each, quoting or pointing to the key words in the text.`;
  const topicLine= topic?`Topic: ${topic}.`:'Choose an interesting topic of general interest (science, work, culture, travel, technology, society, the Esperanto community). Write an ORIGINAL text, not a known article.';
  const words={A2:['250-320','90-110'],B1:['380-460','110-130'],B2:['500-600','130-160']}[lvl]||['400-480','110-130'];
  const specs={
    mc: own?`Use ONLY the text below, unchanged. Write 6 multiple-choice questions in Esperanto (detail, opinion, purpose, meaning of a word or phrase in context, reference), in text order, 4 options each, only one correct; wrong options must be plausible (use words from the text with the wrong meaning).
Answer only with JSON: {"title":"short title in Esperanto","text":"<p>…</p> paragraphs of the text as HTML","q":[["question",["A","B","C","D"],index_of_correct_0_to_3,"explanation"]]}
TEXT:\n"""${own}"""` : `${topicLine} Write a ${words[0]} word magazine-style article in Esperanto in 4-6 paragraphs with opinions and nuance, then 6 multiple-choice questions in Esperanto (detail, opinion, purpose, meaning in context, reference), in text order, 4 options each, one correct; wrong options plausible.
Answer only with JSON: {"title":"short title in Esperanto","text":"<p>…</p><p>…</p>","q":[["question",["A","B","C","D"],index_of_correct_0_to_3,"explanation"]]}`,
    tfng: own?`Use ONLY the text below, unchanged. Write 8 statements in Esperanto to be judged Vera (T) / Malvera (F) / Ne dirite (NG), in text order: about 3 T, 3 F, 2 NG. NG statements must be plausible but impossible to confirm from the text. Paraphrase; don't copy sentences.
Answer only with JSON: {"title":"short title in Esperanto","text":"<p>…</p> paragraphs of the text as HTML","q":[["statement","T or F or NG","explanation"]]}
TEXT:\n"""${own}"""` : `${topicLine} Write a ${words[0]} word factual, informative text in Esperanto in 4-6 paragraphs, then 8 statements in Esperanto to be judged Vera (T) / Malvera (F) / Ne dirite (NG), in text order: about 3 T, 3 F, 2 NG. NG statements must be plausible but not confirmable. Paraphrase.
Answer only with JSON: {"title":"short title in Esperanto","text":"<p>…</p><p>…</p>","q":[["statement","T or F or NG","explanation"]]}`,
    match: `${topicLine} Write a multiple-matching task in Esperanto: 4 short texts (A-D, ${words[1]} words each) by four different people or about four different things on the same theme, each with a short heading like «Nomo, aĝo, profesio». Then 10 statements in Esperanto; each matches exactly one text; use paraphrase, include some distractors where two texts mention the same idea but only one matches.
Answer only with JSON: {"title":"short title in Esperanto","sections":[["A","heading","<p>text</p>"],["B","heading","<p>…</p>"],["C","…","…"],["D","…","…"]],"q":[["statement",index_0_to_3,"explanation"]]}`
  };
  try{
    const d=await sample.json(base+'\n'+specs[type],{cache:false,modelTier:'complex'});
    const id='g'+Date.now().toString(36);
    const E={id,type,lvl,gen:true,d:Date.now(),title:String(d.title||'Generita ekzerco').slice(0,80),minutes:type==='match'?15:type==='tfng'?12:lvl==='B2'?18:15};
    const clean=h=>String(h||'').replace(/<(?!\/?(p|b|i|em|strong|br)\b)[^>]*>/gi,'');
    if(type==='mc'){ E.text=clean(d.text); E.q=(d.q||[]).filter(q=>Array.isArray(q)&&Array.isArray(q[1])&&q[1].length===4&&q[2]>=0&&q[2]<4).map(q=>[String(q[0]),q[1].map(String),+q[2],String(q[3]||'')]); if(E.q.length<4||!E.text) throw {code:'invalid_json'}; }
    else if(type==='tfng'){ E.text=clean(d.text); E.q=(d.q||[]).filter(q=>Array.isArray(q)&&['T','F','NG'].includes(String(q[1]).toUpperCase())).map(q=>[String(q[0]),String(q[1]).toUpperCase(),String(q[2]||'')]); if(E.q.length<6||!E.text) throw {code:'invalid_json'}; }
    else { E.sections=(d.sections||[]).slice(0,4).map((s,i)=>[LETTERS[i],String(s[1]||''),clean(s[2])]); E.q=(d.q||[]).filter(q=>Array.isArray(q)&&q[1]>=0&&q[1]<4).map(q=>[String(q[0]),+q[1],String(q[2]||'')]); if(E.sections.length!==4||E.q.length<6) throw {code:'invalid_json'}; }
    S.examGen=S.examGen||{}; S.examGen[id]=E;
    const ks=Object.keys(S.examGen).sort((a,b)=>S.examGen[a].d-S.examGen[b].d); while(ks.length>12) delete S.examGen[ks.shift()];
    save(); location.hash='exam-'+id;
  }catch(e){ msg.textContent=errMsg(e); btn.disabled=false; }
}


/* ---------- MIA PLANO: datitaj ĉiutagaj sesioj de ĉirkaŭ 20–25 minutoj ---------- */
const WD=['lu','ma','me','ĵa','ve','sa','di'];
const fromKey=k=>new Date(k+'T12:00:00');
const fmtDay=(k,kind)=>eoDate(fromKey(k),kind||'wd');
function planCfg(){ S.plan=S.plan||{}; const P=S.plan; if(!P.start) P.start=dayKey(); if(!Array.isArray(P.days)||!P.days.length) P.days=[0,1,2,3,4]; if(P.anchor==null) P.anchor=P.start; if(P.anchorIdx==null) P.anchorIdx=0; P.frozen=P.frozen||{}; P.tick=P.tick||{}; return P; }
let PLAN=null;
function wc(t){ return String(t||'').trim()?String(t).trim().split(/\s+/).length:0; }
function buildPlan(){
  if(PLAN) return PLAN;
  const out=[], SET_MIN={fill:8,mc:5,fix:5,order:5};
  const scenes=ASCOLTI.map((a,i)=>({k:'scene',i,m:10,t:`Aŭskultado: «${a.t}»`,href:'#listening-'+i,auto:()=>!!S.asc[i]}));
  const cult=CULTURA.map((c,i)=>({k:'cult',i,m:10,t:`Kulturo: «${c.t}»`,href:'#culture-'+i,auto:()=>!!(S.cult[i]&&S.cult[i].read)}));
  const extras=[]; for(let i=0;i<Math.max(scenes.length,cult.length);i++){ if(cult[i]) extras.push(cult[i]); if(scenes[i]) extras.push(scenes[i]); }
  let ex=0, lexI=0, examI=0, toolI=0;
  const nextExtra=()=>extras[ex++%extras.length];
  const L=(u,tab,t,m,auto)=>({t,m,href:'#unit-'+u.id,tab,u:u.id,auto});
  const review={t:'Kajero de eraroj: ripetu la hodiaŭajn erarojn',m:5,href:'#review'};
  const TOOLS=[{t:'Verboj kaj participoj: 5 minutoj da ekzercado',m:5,href:'#verbs'},{t:'Tabelvortoj: 5 minutoj da ekzercado',m:5,href:'#tabelvortoj'},{t:'Vortfarado: 5 minutoj da ekzercado',m:5,href:'#vortfarado'}];
  const tool=u=>u.id<6?TOOLS[0]:u.id===6?TOOLS[2]:u.id===7?TOOLS[1]:TOOLS[toolI++%3];
  const setTask=(u,i)=>{ const s=u.ex[i]; return L(u,'esercizi',`Ekzercoj, aro ${String.fromCharCode(65+i)}: ${s.title}`,SET_MIN[s.t]||6,()=>!!S.ex[u.id+'-'+i]); };
  const push=(kind,label,unit,tasks)=>out.push({kind,label,unit,tasks});
  UNITS.forEach(u=>{
    const n=uName(u), last=u.ex.length-1;
    if(u.band===0){
      push('unit',`${n} · tago 1 el 4`,u,[L(u,'lezione',`Leciono: ${u.title}`,15,()=>!!S.lesson[u.id]),setTask(u,0)]);
      push('unit',`${n} · tago 2 el 4`,u,u.ex.slice(1).map((_,k)=>setTask(u,k+1)).concat([tool(u)]));
      push('unit',`${n} · tago 3 el 4`,u,[L(u,'lettura',`Legado: «${u.reading.title}» + demandoj`,12,()=>!!S.read[u.id]),L(u,'parla','Aŭskultu kaj parolu: laŭtlegado kaj dikto',10,()=>!!(S.spk[u.id]&&S.spk[u.id].done))]);
      push('unit',`${n} · tago 4 el 4`,u,[L(u,'scrittura','Skribado: skribu, korektu per la ruĝa plumo, marku kiel farita',18,()=>!!(S.write[u.id]&&S.write[u.id].done)),review]);
    } else {
      const lex=LESSICO[(lexI++)%LESSICO.length];
      push('unit',`${n} · tago 1 el 6`,u,[L(u,'lezione',`Leciono: ${u.title}`,18,()=>!!S.lesson[u.id]),review]);
      push('unit',`${n} · tago 2 el 6`,u,u.ex.slice(0,last).map((_,i)=>setTask(u,i)).concat([tool(u)]));
      push('unit',`${n} · tago 3 el 6`,u,[setTask(u,last),{t:`Vortaro: «${lex.t}» (kartoj)`,m:8,href:'#vocabulary-'+LESSICO.indexOf(lex)},nextExtra()]);
      push('unit',`${n} · tago 4 el 6`,u,[L(u,'lettura',`Legado: «${u.reading.title}» + demandoj`,12,()=>!!S.read[u.id]),L(u,'parla','Aŭskultu kaj parolu: laŭtlegado kaj dikto',10,()=>!!(S.spk[u.id]&&S.spk[u.id].done))]);
      push('unit',`${n} · tago 5 el 6`,u,[L(u,'scrittura','Skribado: unua versio, sen vortaro',20,()=>wc(S.write[u.id]&&S.write[u.id].text)>=Math.round(u.write.words[0]*.7))]);
      push('unit',`${n} · tago 6 el 6`,u,[L(u,'scrittura','Skribado: korekto per la ruĝa plumo, reskribo, marku kiel farita',12,()=>!!(S.write[u.id]&&S.write[u.id].done)),nextExtra()]);
      if(u.band===2){ const E=EXAMS[examI++]; push('exam','Ekzerco por la ekzameno',null,[E?{t:`Lega ekzameno: «${E.title}» (${EXAM_TYPES[E.type].exam}, kun horloĝo)`,m:E.minutes,href:'#exam-'+E.id,auto:()=>!!S.exam[E.id]}:{t:'Lega ekzameno: generu novan ekzercon (B1–B2) kaj faru ĝin kun horloĝo',m:15,href:'#exams'},review]); }
    }
    const T=TESTS.find(t=>t.units[1]===u.id); if(T) push('test',T.title,null,[{t:`${T.title}: legado, kompletigo kaj gramatiko (30 minutoj)`,m:30,href:'#test-'+T.id,auto:()=>!!S.tests[T.id]}]);
  });
  let band=0; out.forEach((s,i)=>{ s.idx=i; s.min=s.tasks.reduce((a,t)=>a+t.m,0); if(s.unit) band=s.unit.band; s.band=band; });
  PLAN=out; return out;
}
const tKey=(s,j)=>s.idx+'-'+j;
function taskDone(s,j){ const t=s.tasks[j]; return !!(planCfg().tick[tKey(s,j)] || (t.auto&&t.auto())); }
function sessState(s){ const n=s.tasks.filter((_,j)=>taskDone(s,j)).length; return n===s.tasks.length?'done':n?'part':'todo'; }
function nextDay(k,days){ const d=fromKey(k); for(let i=0;i<8;i++){ if(days.includes((d.getDay()+6)%7)) return dayKey(d); d.setDate(d.getDate()+1); } return dayKey(d); }
function planDates(){
  const P=planCfg(), ss=buildPlan(), dates=[];
  let cur=P.anchor;
  ss.forEach((s,i)=>{ if(i<P.anchorIdx&&P.frozen[i]){ dates.push(P.frozen[i]); return; } const k=nextDay(cur,P.days); dates.push(k); const d=fromKey(k); d.setDate(d.getDate()+1); cur=dayKey(d); });
  return dates;
}
function planStatus(){
  const ss=buildPlan(), dates=planDates(), today=dayKey();
  const st=ss.map(sessState);
  const done=st.filter(x=>x==='done').length;
  const late=ss.filter((s,i)=>st[i]!=='done'&&dates[i]<today).length;
  const nextIdx=st.findIndex(x=>x!=='done');
  const todayIdx=dates.findIndex((d,i)=>d===today);
  return {ss,dates,st,done,late,nextIdx,todayIdx,today};
}
function reschedule(fromKeyDate){
  const P=planCfg(), {dates,st}=planStatus();
  const first=st.findIndex(x=>x!=='done'); if(first<0) return;
  const frozen={}; for(let i=0;i<first;i++) frozen[i]=dates[i];
  P.frozen=frozen; P.anchorIdx=first; P.anchor=fromKeyDate||dayKey(); save();
}
let planView=null, planSel=null;
function sessionHTML(s,date,opts){
  opts=opts||{};
  const stt=sessState(s), today=dayKey();
  const tag = stt==='done'?'<span class="pstate done">✓ farita</span>': date<today?'<span class="pstate late">malfrua</span>': date===today?'<span class="pstate today">hodiaŭ</span>':'<span class="pstate">planita</span>';
  return `<div class="psess ${stt}"><div class="card-h"><div><span class="lab">${esc(fmtDay(date))} · sesio ${s.idx+1} el ${buildPlan().length}</span><h3>${esc(s.label)}</h3></div><div class="btnrow">${tag}<span class="note">≈ ${s.min} min</span></div></div>
   <ul class="ptasks">${s.tasks.map((t,j)=>{ const d=taskDone(s,j); return `<li class="${d?'on':''}"><button class="pchk" type="button" data-s="${s.idx}" data-j="${j}" aria-pressed="${d}" aria-label="Marki kiel farita">${d?'✓':''}</button><div class="pt"><span>${esc(t.t)}</span><span class="note">${t.m} min${t.auto?' · marcada sozinha quando você termina':''}</span></div><a class="btn ghost" href="${t.href}" data-tab="${t.tab||''}" data-u="${t.u||''}">Malfermi →</a></li>`; }).join('')}</ul>
   ${opts.cta&&stt==='done'?`<p class="note" style="margin:6px 0 0"><span class="pen" style="font-size:22px">Bonege!</span> A sessão de hoje está completa. O resto é bônus.</p>`:''}</div>`;
}
function bindSession(root,rerender){
  root.querySelectorAll('.pchk').forEach(b=>b.onclick=()=>{ const s=buildPlan()[+b.dataset.s], j=+b.dataset.j, P=planCfg(), k=tKey(s,j);
    const was=taskDone(s,j); if(was&&!P.tick[k]){ toast('Esta tarefa se marca sozinha pelo seu progresso.'); return; }
    if(P.tick[k]) delete P.tick[k]; else { P.tick[k]=dayKey(); tick(2); }
    save(); if(sessState(s)==='done'&&!was) toast(`<span class="pen">Sesio farita!</span> ${esc(s.label)}`); rerender(); renderNav(route()); });
  root.querySelectorAll('a[data-u]').forEach(a=>a.addEventListener('click',()=>{ if(a.dataset.u&&a.dataset.tab){ S.tab[a.dataset.u]=a.dataset.tab; save(); } }));
}
function planNavNote(){ const p=planStatus(); if(p.nextIdx<0) return 'ĉiuj sesioj faritaj!'; return `${p.done}/${p.ss.length} sesioj${p.late?` · ${p.late} malfruaj`:''}${p.todayIdx>=0&&p.st[p.todayIdx]==='done'?' · hodiaŭ ✓':''}`; }
function homePlan(){
  const p=planStatus(), pct=Math.round(100*p.done/p.ss.length);
  const show = p.todayIdx>=0 && p.st[p.todayIdx]!=='done' ? p.todayIdx : p.nextIdx;
  const end=p.dates[p.dates.length-1];
  return `<h2 class="sec">Via plano</h2>
   <div class="rgrid" style="margin-bottom:14px">
    <div class="card"><span class="lab">Progreso</span><b class="big">${p.done}<small>/${p.ss.length} sesioj</small></b><span class="rw-bar"><i style="width:${pct}%"></i></span><span class="note">${pct}% · ĉirkaŭ 20–25 minutoj tage</span></div>
    <div class="card ${p.late?'due':''}"><span class="lab">Kalendaro</span><b class="big">${p.late?p.late:'✓'}<small>${p.late?' malfruaj':' ĝustatempe'}</small></b><span class="note">${p.late?'Faça a próxima hoje, ou mova o plano para a frente.':'Você está em dia.'}</span></div>
    <div class="card"><span class="lab">Celo</span><b class="big" style="font-size:24px">${esc(fmtDay(end,'full'))}</b><span class="note">B2, tri testoj kaj legaj ekzamenoj</span></div>
   </div>
   ${show>=0?`<section class="card" id="hplan">${sessionHTML(p.ss[show],p.dates[show],{cta:true})}</section>`:'<p class="lead">Você terminou o plano inteiro. Gratulon!</p>'}
   <div class="btnrow" style="margin:-8px 0 30px"><a class="btn primary" href="#plan">Malfermi la kalendaron →</a></div>`;
}
function renderPlan(){
  const P=planCfg(), p=planStatus(), today=p.today;
  if(!planView){ const d=fromKey(today); planView=[d.getFullYear(),d.getMonth()]; }
  const [Y,M]=planView;
  const byDate={}; p.dates.forEach((d,i)=>{ (byDate[d]=byDate[d]||[]).push(i); });
  if(planSel==null) planSel = p.todayIdx>=0 ? p.todayIdx : (p.nextIdx>=0?p.nextIdx:0);
  const first=new Date(Y,M,1), lead=(first.getDay()+6)%7, dim=new Date(Y,M+1,0).getDate();
  let cells=''; for(let i=0;i<lead;i++) cells+='<div class="cday empty"></div>';
  for(let d=1;d<=dim;d++){ const k=dayKey(new Date(Y,M,d)); const ids=byDate[k]||[];
    const cls=ids.map(i=>p.st[i]==='done'?'done':(k<today?'late':p.st[i]==='part'?'part':'plan'))[0]||'';
    const s=ids.length?p.ss[ids[0]]:null;
    const short=s?(s.kind==='test'?'Testo':s.kind==='exam'?'Ekzameno':'U'+s.unit.id+'·'+((s.label.match(/tago (\d)/)||[,''])[1])):'';
    cells+=`<button class="cday ${cls} ${k===today?'today':''} ${ids.includes(planSel)?'sel':''}" type="button" ${ids.length?`data-i="${ids[0]}"`:'disabled'}><span class="cd">${d}</span>${short?`<span class="cs">${esc(short)}</span>`:''}${cls==='done'?'<span class="ck">✓</span>':''}</button>`; }
  const pct=Math.round(100*p.done/p.ss.length);
  const wk=[...Array(7)].map((_,i)=>{ const d=fromKey(today); d.setDate(d.getDate()-((d.getDay()+6)%7)+i); return dayKey(d); });
  const weekDone=wk.filter(k=>(byDate[k]||[]).some(i=>p.st[i]==='done')).length, weekPlanned=wk.filter(k=>(byDate[k]||[]).length).length;
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Ĉiutage · mia plano</div><h1 class="title">Mia plano</h1>
   <p class="subtitle">${p.ss.length} sessões de cerca de 20–25 minutos, nos dias que você escolher. Cada dia mostra exatamente o que fazer; a maioria das tarefas se marca sozinha quando você as termina no caderno.</p></header>
   <div class="rgrid">
    <div class="card"><span class="lab">Progreso de la kurso</span><b class="big">${pct}%</b><span class="rw-bar"><i style="width:${pct}%"></i></span><span class="note">${p.done} el ${p.ss.length} sesioj faritaj</span></div>
    <div class="card"><span class="lab">Ĉi-semajne</span><b class="big">${weekDone}<small>/${weekPlanned} tagoj</small></b><span class="note">sesioj faritaj ĉi-semajne</span></div>
    <div class="card ${p.late?'due':''}"><span class="lab">Kalendaro</span><b class="big">${p.late||'✓'}<small>${p.late?' malfruaj':' ĝustatempe'}</small></b>${p.late?'<button class="btn primary" id="presched" type="button">Rekomenci la planon ekde hodiaŭ</button>':`<span class="note">fino: ${esc(fmtDay(p.dates[p.dates.length-1],'full'))}</span>`}</div>
   </div>
   <div class="phasebar">${BANDS.map((name,bi)=>{ const idx=p.ss.filter(s=>s.band===bi).map(s=>s.idx); const dn=idx.filter(i=>p.st[i]==='done').length; return `<div class="ph"><span class="lab">${name}</span><span class="rw-bar"><i style="width:${idx.length?Math.round(100*dn/idx.length):0}%"></i></span><span class="note">${dn}/${idx.length}</span></div>`; }).join('')}</div>
   <section class="card" id="psel">${sessionHTML(p.ss[planSel],p.dates[planSel])}</section>
   <section class="card cal"><div class="card-h"><div class="btnrow"><button class="btn ghost" id="cprev" type="button" aria-label="Antaŭa monato">←</button><h3 style="margin:0">${eoDate(new Date(Y,M,1),'monthyear')}</h3><button class="btn ghost" id="cnext" type="button" aria-label="Sekva monato">→</button></div><button class="btn" id="ctoday" type="button">Hodiaŭ</button></div>
    <div class="cgrid">${WD.map(w=>`<div class="cwd">${w}</div>`).join('')}${cells}</div>
    <div class="cleg"><span><i class="lg done"></i>farita</span><span><i class="lg part"></i>komencita</span><span><i class="lg late"></i>malfrua</span><span><i class="lg plan"></i>planita</span><span><i class="lg today"></i>hodiaŭ</span></div>
    <p class="note">Toque num dia para ver a sessão. Os dias sem número são de descanso.</p></section>
   <section class="card"><div class="card-h"><div><span class="lab">Agordoj</span><h3>Kiam vi studas?</h3></div></div>
    <p class="note" style="margin-top:0">Escolha os seus dias de estudo. Cada sessão leva cerca de 20–25 minutos (as de teste, 30). Se o italiano e o inglês já ocupam alguns dias, deixe o esperanto nos outros.</p>
    <div class="chipsel" id="pdays">${WD.map((w,i)=>`<button type="button" data-d="${i}" aria-pressed="${P.days.includes(i)}">${w}</button>`).join('')}</div>
    <div class="btnrow" style="margin-top:12px"><label class="note" for="pstart">Komenci (aŭ rekomenci) je</label><input type="date" id="pstart" class="vsel" value="${p.done?today:P.start}" data-nox="1"><button class="btn primary" id="psave" type="button">Ĝisdatigi mian kalendaron</button></div>
    <p class="note">Atualizar mantém as sessões já feitas e distribui o resto a partir da data escolhida. É também o jeito de retomar depois de férias ou de uma semana cheia.</p></section>
   <section class="card"><div class="card-h"><div><span class="lab">Ĉiutage, ekster la plano</span><h3>Os 10 minutos extras que fazem diferença</h3></div></div>
    <ul class="dots"><li>Um capítulo de <i>Gerda malaperis!</i> ou uma música com a letra, registrados em <a href="#beyond">Legaĵoj, muziko kaj mi</a>.</li><li>Cinco minutos de <a href="#tabelvortoj">Tabelvortoj</a> ou de <a href="#verbs">participoj</a> no ônibus.</li><li>Nada disso é obrigatório: é a parte divertida. Nos dias cheios, a sessão do plano basta.</li></ul></section>`;
  bindSession($('#psel'),renderPlan);
  $('#main').querySelectorAll('.cday[data-i]').forEach(b=>b.onclick=()=>{ planSel=+b.dataset.i; renderPlan(); $('#psel').scrollIntoView({block:'nearest',behavior:'smooth'}); });
  $('#cprev').onclick=()=>{ planView=M?[Y,M-1]:[Y-1,11]; renderPlan(); };
  $('#cnext').onclick=()=>{ planView=M<11?[Y,M+1]:[Y+1,0]; renderPlan(); };
  $('#ctoday').onclick=()=>{ planView=null; planSel=null; renderPlan(); };
  const rs=$('#presched'); if(rs) rs.onclick=()=>{ reschedule(dayKey()); planSel=null; renderPlan(); renderNav(route()); toast('<span class="pen">Farite:</span> o plano agora continua a partir de hoje.'); };
  $('#pdays').querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{ const d=+b.dataset.d, i=P.days.indexOf(d); if(i>=0){ if(P.days.length>1) P.days.splice(i,1); } else P.days.push(d); P.days.sort(); $('#pdays').querySelectorAll('[data-d]').forEach(x=>x.setAttribute('aria-pressed',P.days.includes(+x.dataset.d))); });
  $('#psave').onclick=()=>{ const v=$('#pstart').value||today; if(!p.done){ P.start=v; P.anchor=v; P.anchorIdx=0; P.frozen={}; save(); } else reschedule(v); planSel=null; planView=null; renderPlan(); renderNav(route()); toast('<span class="pen">Kalendaro ĝisdatigita.</span>'); };
}

/* ---------- sistemo x: cx → ĉ dum oni tajpas ---------- */
document.addEventListener('input',e=>{
  const el=e.target; if(!el||el.dataset.nox) return;
  const ok = el.tagName==='TEXTAREA' || (el.tagName==='INPUT' && /^(text|search|)$/.test(el.type||''));
  if(!ok) return;
  const v=el.value; if(!/[cghjsuCGHJSU][xX]/.test(v)) return;
  const pos=el.selectionStart, before=v.slice(0,pos), after=v.slice(pos);
  const nb=xsys(before), na=xsys(after);
  el.value=nb+na; try{ el.setSelectionRange(nb.length,nb.length); }catch(_){}
});

render();
initSync();
})();
</script>

</body></html>