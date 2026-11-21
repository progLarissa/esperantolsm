#!/usr/bin/env python3
import os
HERE=os.path.dirname(os.path.abspath(__file__))
# Remove every voice / listening activity; add La rakonto + Legoĉambro.
import re
def rep(text, pairs):
    for old, new in pairs:
        if old not in text:
            raise SystemExit('PATCH NOT FOUND: ' + old[:110])
        text = text.replace(old, new)
    return text

def patch(eng):
    eng = rep(eng, [
    ("const canSpeak = (()=>{ try{ return 'speechSynthesis' in window && typeof SpeechSynthesisUtterance!=='undefined'; }catch(e){ return false; } })();", "const canSpeak = false; /* sem voz: o caderno é só de leitura e escrita */"),
    ("function voiceNote(){\n", "function voiceNote(){ return '';\n"),
    ("function rateSel(){ const r=", "function rateSel(){ return ''; const r="),
    ("'myvoc','log','orale','wpm','asc','exam','examGen','plan']", "'myvoc','log','orale','wpm','asc','exam','examGen','plan','story','rt','rad','radLog','lt']"),
    ("  parts.push(!!(S.spk[u.id]&&S.spk[u.id].done));", "  parts.push(!!(S.story[u.id]&&S.story[u.id].read));"),
    ("['parla','Aŭskultu kaj parolu']", "['rakonto','Rakonto']"),
    ("parla:!!(S.spk[u.id]&&S.spk[u.id].done)}", "rakonto:!!(S.story[u.id]&&S.story[u.id].read)}"),
    ("  else if(tab==='parla') tabParla(u,c);", "  else if(tab==='rakonto') tabRakonto(u,c);"),
    # routes
    ("""  if(h==='read-aloud') return {type:'leggere'};
  if((m=h.match(/^read-aloud-(\\d+)$/)) && TESTI[+m[1]]) return {type:'leggere',id:+m[1]};
  if(h==='listening') return {type:'ascolto'};
  if((m=h.match(/^listening-(\\d+)$/)) && ASCOLTI[+m[1]]) return {type:'ascolto',id:+m[1]};""",
     """  if(h==='reading-room'||h==='read-aloud'||h==='listening') return {type:'legejo'};
  if((m=h.match(/^reading-room-g-(\\w+)$/))) return {type:'legejo',g:m[1]};
  if((m=h.match(/^reading-room-d-(\\d+)$/)) && ASCOLTI[+m[1]]) return {type:'legejo',d:+m[1]};
  if((m=h.match(/^reading-room-t-(\\d+)$/)) && TESTI[+m[1]]) return {type:'legejo',t:+m[1]};
  if(h==='story') return {type:'story'};
  if(h==='roots') return {type:'roots'};
  if((m=h.match(/^story-(\\d+)$/)) && RAKONTO.find(c=>c.u==m[1])) return {type:'story',id:+m[1]};"""),
    ("  else if(r.type==='leggere') renderLeggere(r.id);\n  else if(r.type==='ascolto') renderAscolto(r.id);", "  else if(r.type==='legejo') renderLegejo(r);\n  else if(r.type==='story') renderStory(r.id);\n  else if(r.type==='roots') renderRoots();"),
    # home
    ("<a class=\"btn\" href=\"#listening\">Trejni la orelon</a>", "<a class=\"btn\" href=\"#story\">${RAKONTO_T} →</a>"),
    ("O exame real também avalia compreensão oral, escrita e fala: as páginas de Aŭskultado e Parolado preparam para isso.", "O exame real também tem compreensão oral e prova falada, que este caderno deixa de fora: aqui o foco é ler e escrever bem."),
    ("Uma redação por unidade com metas contadas enquanto você escreve, correção com caneta vermelha e um parceiro de conversa com IA.", "Uma redação por unidade com metas contadas enquanto você escreve, correção com caneta vermelha e um parceiro de conversa por escrito com IA."),
    # tabelvortoj
    ("<span class=\"note\">Toque numa palavra para ouvi-la.</span>", "<span class=\"note\">Toque numa palavra para destacá-la.</span>"),
    # speaking page → written conversation
    ("<div class=\"eyebrow\">Aŭskulti kaj paroli · parolado</div><h1 class=\"title\">Parolado</h1>\n   <p class=\"subtitle\">Um lugar seguro para perder o medo: um parceiro de IA que nunca julga, frases prontas para ganhar tempo e uma prova oral cronometrada.</p>", "<div class=\"eyebrow\">Legi kaj skribi · konversacio</div><h1 class=\"title\">Skriba konversacio</h1>\n   <p class=\"subtitle\">Converse por escrito com um parceiro de IA que nunca julga e corrige com gentileza, e tenha à mão as frases prontas que mantêm qualquer conversa viva.</p>"),
    ("${[['ia','Konversacio'],['frasi','Utilaj frazoj'],['orale','Parola ekzameno']]", "${[['ia','Konversacio'],['frasi','Utilaj frazoj']]"),
    ("if(parMode==='ia') return chat?renderChat(pb):chatPick(pb);", "if(parMode!=='frasi') return chat?renderChat(pb):chatPick(pb);"),
    ("pb.innerHTML=`${voiceNote()}${rateSel()}<p class=\"note\">Ouça, repita em voz alta e depois tente dizer sem olhar. Aprenda primeiro as frases para «ganhar tempo»: são elas que mantêm a conversa viva quando as palavras não vêm.</p>", "pb.innerHTML=`<p class=\"note\">Leia, copie e depois tente escrever sem olhar. Comece pelas frases para «ganhar tempo»: são elas que mantêm a conversa viva quando as palavras não vêm. Use-as na conversa com a IA e nas redações.</p>"),
    ("<ul class=\"phr\">${s.f.map((f,fi)=>`<li><button class=\"btn ghost play\" type=\"button\" data-f=\"${si}-${fi}\" aria-label=\"Aŭskulti\">▶</button><div>", "<ul class=\"phr nop\">${s.f.map((f,fi)=>`<li><div>"),
    ("<section class=\"card tipcard\"><span class=\"pen\">Como «falar» aqui</span><p>Use o <b>microfone</b> do teclado do celular (ou o ditado do computador: Win+H no Windows, Ditado nos ajustes de teclado do Mac) e diga a resposta em voz alta. O ditado não conhece o esperanto, então escolha o idioma português ou italiano e confira o texto antes de enviar; se ele escrever algo estranho, é um retorno grátis sobre a pronúncia. A IA responde, lê a resposta em voz alta e corrige você com gentileza; as correções vão para o Kajero de eraroj. Errar aqui é esperado: o único objetivo é continuar falando.</p></section>", "<section class=\"card tipcard\"><span class=\"pen\">Como funciona</span><p>Escolha uma cena e responda por escrito, como num chat. A IA continua a conversa no seu nível, corrige só os erros de verdade e sugere respostas quando você trava; as correções vão para o Kajero de eraroj. Escreva <b>cx</b>, <b>sx</b>, <b>ux</b> para ĉ, ŝ, ŭ. Errar aqui é esperado: o único objetivo é continuar escrevendo.</p></section>"),
    ("<label class=\"note chk\"><input type=\"checkbox\" id=\"autosp\" ${S.autoSpeak!==false?'checked':''}> laŭtlegi la respondojn</label>", ""),
    ("  $('#autosp').onchange=e=>{ S.autoSpeak=e.target.checked; save(); };\n", ""),
    ("placeholder=\"Skribu aŭ diktu vian respondon… (cx → ĉ)\"", "placeholder=\"Skribu vian respondon… (cx → ĉ)\""),
    # beyond
    ("<div class=\"eyebrow\">Aŭskulti kaj paroli · vera vivo</div><h1 class=\"title\">Legaĵoj, muziko kaj mi</h1>\n   <p class=\"subtitle\">Livros, músicas, vídeos e conversas: guarde aqui as palavras novas, registre o seu tempo e conte o que leu ou ouviu.</p>", "<div class=\"eyebrow\">Legi kaj skribi · vera vivo</div><h1 class=\"title\">Legaĵoj kaj mi</h1>\n   <p class=\"subtitle\">Livros, revistas, artigos e a Vikipedio: guarde aqui as palavras novas, registre o seu tempo de leitura e resuma o que leu.</p>"),
    ("const SRC=['libro','muziko','podkasto','video','filmo','konversacio','kurso','alia'];", "const SRC=['libro','revuo','artikolo','Vikipedio','rakonto','konversacio','kurso','alia'];"),
    ("<p>Resuma em esperanto o capítulo que leu, a música que ouviu ou o vídeo que viu, ou diga o que achou. Também pode ditar com o microfone do teclado: isso também é treino de fala.</p>", "<p>Resuma em esperanto o capítulo ou o artigo que leu, ou diga o que achou dele. Cinco frases bastam.</p>"),
    ("<span class=\"lab\">Rakontu al mi</span><h3>Kion vi legis aŭ aŭskultis hodiaŭ?</h3>", "<span class=\"lab\">Rakontu al mi</span><h3>Kion vi legis hodiaŭ?</h3>"),
    ("<span class=\"lab\">Registri</span><h3>Kion vi legis, aŭskultis aŭ ekzercis hodiaŭ?</h3>", "<span class=\"lab\">Registri</span><h3>Kion vi legis aŭ ekzercis hodiaŭ?</h3>"),
    ("<li><b>Leia essa página em voz alta</b> e cronometre em <a href=\"#read-aloud\">Laŭtlegado</a>.</li>", "<li><b>Reescreva três frases</b> da página mudando o tempo verbal ou trocando palavras por derivados (<i>bona → boneco</i>).</li>"),
    ("Guarde as palavras e expressões que você encontra em livros, músicas e vídeos", "Guarde as palavras e expressões que você encontra em livros, revistas e artigos"),
    ])
    # remove listening resources and per-unit videos from risorse
    a = eng.index('   <section class="card"><div class="card-h"><div><span class="lab">Por aŭskulti</span>')
    b = eng.index("  fb.querySelectorAll('[data-go]')")
    eng = eng[:a] + "`;\n" + eng[b:]
    # nav group
    a = eng.index('<div class="navgroup"><h4><span>Aŭskulti kaj paroli</span></h4><ul>')
    b = eng.index('</ul></div>', a) + len('</ul></div>')
    eng = eng[:a] + r"""<div class="navgroup"><h4><span>Legi kaj skribi</span></h4><ul>
   <li><a class="navlink tool" href="#story" ${route.type==='story'?'aria-current="page"':''}><span class="n">❦</span><span class="t">La rakonto<br><small class="note">${RAKONTO.filter(c=>S.story[c.u]&&S.story[c.u].read).length}/${RAKONTO.length} ĉapitroj legitaj</small></span></a></li>
   <li><a class="navlink tool" href="#reading-room" ${route.type==='legejo'?'aria-current="page"':''}><span class="n">❝</span><span class="t">Legoĉambro<br><small class="note">dialogoj · tekstoj · nombroj</small></span></a></li>
   <li><a class="navlink tool" href="#speaking" ${route.type==='parlare'?'aria-current="page"':''}><span class="n">✉</span><span class="t">Skriba konversacio<br><small class="note">babilado kun AI · utilaj frazoj</small></span></a></li>
   <li><a class="navlink tool" href="#beyond" ${route.type==='fuori'?'aria-current="page"':''}><span class="n">✚</span><span class="t">Legaĵoj kaj mi<br><small class="note">${Object.keys(S.myvoc).length} miaj vortoj · legtaglibro</small></span></a></li>
  </ul></div>""" + eng[b:]
    # home: listening section → reading & writing section
    a = eng.index('  <h2 class="sec">Aŭskulti kaj paroli</h2>')
    b = eng.index('  ${homeCultura()}')
    eng = eng[:a] + r"""  <a class="story-banner" href="#story"><span class="lab">Novelo en 12 ĉapitroj</span><b>${RAKONTO_T}</b><span>Um livro antigo desaparece num congresso em Lisboa, e Marina, uma programadora brasileira, decide descobrir por quê. Um capítulo por unidade, escrito só com a gramática que você já viu.</span><em>${(()=>{ const n=RAKONTO.filter(c=>S.story[c.u]&&S.story[c.u].read).length; return n?`${n}/${RAKONTO.length} ĉapitroj legitaj · daŭrigi →`:'Komenci la legadon →'; })()}</em></a>
  <h2 class="sec">Legi kaj skribi</h2>
  <div class="cols4">
   <a class="card lexcard" href="#story"><span class="lab">Novelo</span><h3>La rakonto</h3><span class="note">12 capítulos com glossário, perguntas e uma tarefa de escrita cada.</span></a>
   <a class="card lexcard" href="#reading-room"><span class="lab">Legoĉambro</span><h3>Dialogoj kaj tekstoj</h3><span class="note">${ASCOLTI.length} diálogos do dia a dia, ${TESTI.length} textos para responder por escrito e números por extenso.</span></a>
   <a class="card lexcard" href="#speaking"><span class="lab">Babilado</span><h3>Skriba konversacio</h3><span class="note">${ROLEPLAY.length} cenas para conversar por escrito com a IA, e as frases que salvam a conversa.</span></a>
   <a class="card lexcard" href="#beyond"><span class="lab">Vera vivo</span><h3>Legaĵoj kaj mi</h3><span class="note">Guarde palavras do que você lê, registre o tempo, resuma e seja corrigida.</span></a>
  </div>
""" + eng[b:]
    a = eng.index('  <h3>Para ouvir</h3>')
    b = eng.index('  <p class="note">Leia com lápis', a)
    eng = eng[:a] + eng[b:]
    # plan: listening tasks → story chapters; scenes → reading room
    eng = eng.replace("L(u,'parla','Aŭskultu kaj parolu: laŭtlegado kaj dikto',10,()=>!!(S.spk[u.id]&&S.spk[u.id].done))",
                      "L(u,'rakonto',`La rakonto, ĉapitro ${u.id}: «${(RAKONTO.find(c=>c.u===u.id)||{t:''}).t}»`,12,()=>!!(S.story[u.id]&&S.story[u.id].read))")
    eng = rep(eng, [
    ("  const scenes=ASCOLTI.map((a,i)=>({k:'scene',i,m:10,t:`Aŭskultado: «${a.t}»`,href:'#listening-'+i,auto:()=>!!S.asc[i]}));",
     "  const dlg=ASCOLTI.map((a,i)=>({k:'scene',i,m:10,t:`Legoĉambro: dialogo «${a.t}»`,href:'#reading-room-d-'+i,auto:()=>!!S.asc[i]})), txt=TESTI.map((a,i)=>({k:'text',i,m:12,t:`Legoĉambro: teksto «${a.t}»`,href:'#reading-room-t-'+i,auto:()=>!!(S.rt[i]&&S.rt[i].done)}));\n  const scenes=[]; dlg.forEach((d,i)=>{ scenes.push(d); if(txt[i]) scenes.push(txt[i]); });"),
    ("<li>Um capítulo de <i>Gerda malaperis!</i> ou uma música com a letra, registrados em <a href=\"#beyond\">Legaĵoj, muziko kaj mi</a>.</li>", "<li>Um capítulo de <i>Gerda malaperis!</i> ou um artigo da Vikipedio, registrado em <a href=\"#beyond\">Legaĵoj kaj mi</a>.</li>"),
    ])
    # new pages, before the x-system listener
    i = eng.index('/* ---------- sistemo x')
    eng = eng[:i] + NEW + open(os.path.join(HERE,'eo_rad_engine.js')).read() + open(os.path.join(HERE,'eo_gen_engine.js')).read() + eng[i:]
    eng = rep(eng, [
    ("<li><a class=\"navlink tool\" href=\"#review\"", "<li><a class=\"navlink tool\" href=\"#roots\" ${route.type==='roots'?'aria-current=\"page\"':''}><span class=\"n\">√</span><span class=\"t\">Radikoj ${(()=>{ const s=radStats(); return s.due+s.newLeft&&!s.done?`<span class=\"badge\">${s.due+s.newLeft}</span>`:''; })()}<br><small class=\"note\">${radStats().known} konataj · ${RADS.length} radikoj</small></span></a></li>\n   <li><a class=\"navlink tool\" href=\"#review\""),
    ("  <h2 class=\"sec\">Legi kaj skribi</h2>", "  ${(()=>{ const s=radStats(); return `<a class=\"rad-strip\" href=\"#roots\"><span class=\"rw big\"><b>√</b></span><span><b>Radikoj</b> · ${s.due+s.newLeft?`${s.due+s.newLeft} kartoj por hodiaŭ (${s.due} ${s.due===1?'revisão':'revisões'}, ${s.newLeft} ${s.newLeft===1?'nova':'novas'})`:'nada pendente hoje ✓'}<br><small class=\"note\">${s.known} raízes conhecidas de ${RADS.length}. Cinco minutos por dia.</small></span><em>${s.due+s.newLeft?'Komenci →':'Vidi la liston →'}</em></a>`; })()}\n  <h2 class=\"sec\">Legi kaj skribi</h2>"),
    ("  let band=0; out.forEach((s,i)=>{ s.idx=i;", "  while(examI<EXAMS.length){ const E=EXAMS[examI++]; push('exam','Ekzerco por la ekzameno',null,[{t:`Lega ekzameno: «${E.title}» (${EXAM_TYPES[E.type].exam}, ${E.lvl}, kun horloĝo)`,m:E.minutes,href:'#exam-'+E.id,auto:()=>!!S.exam[E.id]}]); }\n  out.forEach(s=>{ if(s.kind==='unit'){ const m=s.tasks.reduce((a,t)=>a+t.m,0); if(m<=24) s.tasks.push({t:'Radikoj: la ripeto de la tago (5 minutoj)',m:5,href:'#roots',rad:true}); } });\n  let band=0; out.forEach((s,i)=>{ s.idx=i;"),
    ("['ex','read','corr','gen','lesson','voc','tab','cult','spk','myvoc','orale','wpm','asc','exam','examGen','plan'].forEach(f=>", "['ex','read','corr','gen','lesson','voc','tab','cult','spk','myvoc','orale','wpm','asc','exam','examGen','plan','story','rt','rad','radLog','lt'].forEach(f=>"),
    ("const texts={write:o.write,corr:o.corr,gen:o.gen,examGen:o.examGen}; delete o.write; delete o.corr; delete o.gen; delete o.examGen;", "const texts={write:o.write,corr:o.corr,gen:o.gen,examGen:o.examGen,lt:o.lt}; delete o.write; delete o.corr; delete o.gen; delete o.examGen; delete o.lt;"),
    ("  PLAN=out; return out;", "  out.forEach(s=>s.tasks.forEach(t=>{ if(t.rad){ const idx=s.idx; t.auto=()=>{ const d=planDates()[idx]; return Object.keys(S.radLog||{}).some(k=>k>=d); }; } }));\n  PLAN=out; return out;"),
    ])
    return eng

NEW = r'''
/* ---------- korekto per AI por mallongaj skribaĵoj ---------- */
async function quickCorr(out,text,task,lvl){
  if(text.trim().split(/\s+/).length<15){ out.innerHTML='<p class="note">Escreva pelo menos 15 palavras antes de pedir a correção.</p>'; return; }
  const sample=await getSample(); if(!sample){ out.innerHTML='<p class="note">A correção só funciona com esta página aberta dentro do Claude.</p>'; return; }
  const lang=aiLang({band:bandOf(lvl)})==='pt'?'PORTUGUESE':'simple ESPERANTO';
  out.innerHTML='<div class="ai-out"><div class="stamp">La instruisto legas…</div><div class="qcb"></div></div>';
  try{ const r=await sample(`You are an encouraging Esperanto teacher. Correct this short text in Esperanto by a Brazilian student (native Portuguese, fluent Spanish), level ${lvl}. It may be typed with the x-system (cx = ĉ). Task: «${task}». Answer in ${lang} with these markdown sections (write Esperanto with ĉ ĝ ĥ ĵ ŝ ŭ):
## Komento
(2 sentences: level and what works)
## Erros
(format: ~~wrong~~ → **right**: explanation; mark [PT] or [ES] for interference; if there are none, say so)
## Texto corrigido
## Uma frase mais natural
(one sentence of hers rewritten the way a fluent speaker would say it)

TEXT:
"""${xsys(text)}"""`,{cache:false,onText:({text})=>{ const b=out.querySelector('.qcb'); if(b) b.innerHTML=md(text); }});
    out.querySelector('.qcb').innerHTML=md(r.text); out.querySelector('.stamp').textContent='Korektita ✓'; tick(5);
  }catch(e){ out.innerHTML=`<p class="note">${esc(errMsg(e))}</p>`; }
}

/* ---------- LA RAKONTO ---------- */
function storyChapter(c,box,inUnit){
  const st=S.story[c.u]||{}, i=RAKONTO.indexOf(c), prev=RAKONTO[i-1], next=RAKONTO[i+1], U=UNITS.find(u=>u.id===c.u)||{lvl:'A1'};
  const set=(k,v)=>{ S.story[c.u]=Object.assign({},S.story[c.u]||{},{[k]:v}); save(); };
  box.innerHTML=`<div class="reading storytext"><span class="lab note">Ĉapitro ${c.u} el ${RAKONTO.length} · ${U.lvl}</span><h2>${esc(c.t)}</h2>${gloss(c.text)}</div>
   <p class="note">Vortoj kun punktita substreko: tuŝu ilin por vidi la signifon. Tente entender o resto pelo contexto e pelos afixos.</p>
   <section class="card"><div class="card-h"><div><span class="lab">Kompreno</span><h3>Demandoj pri la ĉapitro</h3></div><span class="score" id="stsc"></span></div><ol class="items" id="stq"></ol><div class="btnrow"><button class="btn" id="streset" type="button">Reprovi</button></div></section>
   <section class="card"><div class="card-h"><div><span class="lab">Skribu</span><h3>Tasko de la ĉapitro</h3></div><span class="note" id="stwc"></span></div><p class="task">${esc(c.w)}</p>
    <textarea class="paper" id="stw" style="min-height:170px" lang="eo" spellcheck="false" placeholder="Skribu ĉi tie… (cx → ĉ, sx → ŝ, ux → ŭ)">${esc(st.w||'')}</textarea>
    <div class="btnrow" style="margin-top:10px"><button class="btn red" id="stcorr" type="button">Korekti per la ruĝa plumo</button></div><div id="stout"></div></section>
   <div class="done-row"><button class="btn ${st.read?'':'primary'}" id="stdone" type="button">${st.read?'✓ Ĉapitro legita':'Marki kiel legita'}</button>${inUnit?'':`${prev?`<a class="btn ghost" href="#story-${prev.u}">← ${esc(prev.t)}</a>`:''}${next?`<a class="btn ghost" href="#story-${next.u}">${esc(next.t)} →</a>`:''}`}</div>`;
  const draw=()=>{ mcList($('#stq'),c.q,(s,t)=>{ set('q',s+'/'+t); showScore($('#stsc'),s,t); if(!(S.story[c.u]||{}).read&&s>=Math.ceil(t*.75)){ set('read',true); refresh(); } },k=>[`st${c.u}-${k}`,'mc',{q:c.q[k][0],o:c.q[k][1],c:c.q[k][2],e:c.q[k][3]||''},`Rakonto · ${c.t}`]); };
  draw(); if(st.q){ const [a,b]=st.q.split('/').map(Number); showScore($('#stsc'),a,b); }
  $('#streset').onclick=draw;
  const ta=$('#stw'), wcf=()=>{ $('#stwc').textContent=(ta.value.trim()?ta.value.trim().split(/\s+/).length:0)+' vortoj'; }; wcf();
  ta.oninput=()=>{ set('w',ta.value); wcf(); };
  $('#stcorr').onclick=()=>quickCorr($('#stout'),ta.value,c.w,U.lvl.split('→').pop().trim());
  const refresh=()=>{ const b=$('#stdone'), r=!!(S.story[c.u]||{}).read; b.textContent=r?'✓ Ĉapitro legita':'Marki kiel legita'; b.classList.toggle('primary',!r); if(inUnit) refreshProgress(inUnit); renderNav(route()); };
  $('#stdone').onclick=()=>{ set('read',!(S.story[c.u]||{}).read); if(S.story[c.u].read) tick(5); refresh(); };
}
function tabRakonto(u,c){
  const ch=RAKONTO.find(x=>x.u===u.id); if(!ch){ c.innerHTML='<p class="note">Neniu ĉapitro por ĉi tiu unuo.</p>'; return; }
  c.innerHTML=`<p class="note">Capítulo ${u.id} da novela <a href="#story">${RAKONTO_T}</a>, escrito com a gramática desta unidade e das anteriores.</p><div id="stbox"></div>`;
  storyChapter(ch,$('#stbox'),u);
}
function renderStory(id){
  if(id){ const c=RAKONTO.find(x=>x.u===id); $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#story">${RAKONTO_T}</a> · ĉapitro ${id}</div></header><div id="stbox"></div>`; storyChapter(c,$('#stbox')); return; }
  const n=RAKONTO.filter(c=>S.story[c.u]&&S.story[c.u].read).length, next=RAKONTO.find(c=>!(S.story[c.u]&&S.story[c.u].read));
  $('#main').innerHTML=`<header class="uhead story-hero"><div class="eyebrow">Legi kaj skribi · novelo</div><h1 class="title">${RAKONTO_T}</h1>
   <p class="subtitle">Um livro antigo com uma estrela verde desaparece durante um congresso de esperanto em Lisboa. Marina, uma programadora brasileira, decide descobrir quem o levou e por quê. Doze capítulos, um por unidade, escritos só com a gramática que você já viu.</p>
   <div class="uprog"><span class="track"><i style="width:${Math.round(100*n/RAKONTO.length)}%"></i></span><span>${n}/${RAKONTO.length} ĉapitroj legitaj</span></div></header>
   ${next?`<div class="btnrow" style="margin-bottom:18px"><a class="btn primary" href="#story-${next.u}">${n?'Daŭrigi':'Komenci'}: ĉapitro ${next.u} →</a></div>`:'<p class="lead">Você leu a novela inteira. Gratulon!</p>'}
   <ol class="chapters">${RAKONTO.map(c=>{ const st=S.story[c.u]||{}, U=UNITS.find(u=>u.id===c.u); return `<li class="${st.read?'read':''}"><a href="#story-${c.u}"><span class="cn">${c.u}</span><span class="ct"><b>${esc(c.t)}</b><small>${U.lvl} · post la ${esc(uName(U))}${st.q?' · demandoj '+st.q:''}</small></span><span class="note">${st.read?'✓':''}</span></a></li>`; }).join('')}</ol>
   <div class="plus"><span class="pen">Dica</span> Leia cada capítulo duas vezes: a primeira sem parar, só pela história; a segunda devagar, olhando o glossário. Depois responda às perguntas e faça a tarefa de escrita: ela usa a gramática da unidade.</div>`;
}

/* ---------- LEGOĈAMBRO ---------- */
let legMode='dialogoj', legLvl='ĉiuj', numDir='w2d';
function renderLegejo(r){
  if(r.g!=null) return renderGenLeg(r.g);
  if(r.d!=null) return renderDialogLeg(r.d);
  if(r.t!=null) return renderTekstoLeg(r.t);
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow">Legi kaj skribi · legoĉambro</div><h1 class="title">Legoĉambro</h1>
   <p class="subtitle">Leitura curta para os dias corridos: diálogos do dia a dia com perguntas, textos do A1 ao B2 para responder por escrito e um treino de números por extenso.</p></header>
   <div class="seg" role="group">${[['dialogoj','Dialogoj'],['tekstoj','Tekstoj'],['nova','Nova teksto ✦'],['nombroj','Nombroj']].map(([k,l])=>`<button data-m="${k}" aria-pressed="${legMode===k}">${l}</button>`).join('')}</div><div id="lgbody"></div>`;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ legMode=b.dataset.m; renderLegejo({}); });
  const box=$('#lgbody');
  if(legMode==='nombroj') return numDrillW(box);
  if(legMode==='nova') return ltForm(box);
  const lv=['ĉiuj',...LVLS], arr=legMode==='dialogoj'?ASCOLTI:TESTI;
  box.innerHTML=`<div class="chipsel" style="margin-bottom:14px">${lv.map(l=>`<button data-l="${l}" aria-pressed="${legLvl===l}">${l}</button>`).join('')}</div>
   <div class="lexgrid">${arr.map((a,i)=>[a,i]).filter(([a])=>legLvl==='ĉiuj'||a.lvl===legLvl).map(([a,i])=>legMode==='dialogoj'
     ?`<a class="card lexcard" href="#reading-room-d-${i}"><span class="lab">${a.lvl} · ${esc(a.where)}</span><h3>${esc(a.t)}</h3><span class="note">${a.lines.length} replikoj · ${a.q.length} demandoj${S.asc[i]?' · '+S.asc[i]:''}</span></a>`
     :`<a class="card lexcard" href="#reading-room-t-${i}"><span class="lab">${a.lvl} · ${wordsOf(a.text)} vortoj</span><h3>${esc(a.t)}</h3><span class="note">${S.rt[i]&&S.rt[i].done?'✓ farita':a.ask.length+' demandoj por respondi skribe'}</span></a>`).join('')}</div>`;
  box.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{ legLvl=b.dataset.l; renderLegejo({}); });
}
function renderDialogLeg(id){
  const A=ASCOLTI[id];
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#reading-room">Legoĉambro</a> · ${A.lvl} · ${esc(A.where)}</div><h1 class="title">${esc(A.t)}</h1>
   <p class="subtitle">Leia o diálogo, responda às perguntas e depois veja as notas sobre as expressões mais úteis.</p></header>
   <div class="transcript reading">${A.lines.map(([w,t])=>`<p class="tl tl-${w}"><b>${w==='N'?'':(A.names&&A.names[w]?esc(A.names[w])+': ':'— ')}</b>${w==='N'?`<i>${esc(t)}</i>`:esc(t)}</p>`).join('')}</div>
   <section class="card"><div class="card-h"><div><span class="lab">Kompreno</span><h3>Demandoj</h3></div><span class="score" id="dscore"></span></div><ol class="items" id="dq"></ol><div class="btnrow"><button class="btn" id="dreset" type="button">Reprovi</button></div></section>
   ${A.notes?`<div class="plus"><span class="pen">Utilaj esprimoj</span><ul class="dots">${A.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></div>`:''}
   <div class="done-row">${id>0?`<a class="btn ghost" href="#reading-room-d-${id-1}">← ${esc(ASCOLTI[id-1].t)}</a>`:''}${ASCOLTI[id+1]?`<a class="btn ghost" href="#reading-room-d-${id+1}">${esc(ASCOLTI[id+1].t)} →</a>`:''}</div>`;
  const draw=()=>mcList($('#dq'),A.q,(s,t)=>{ S.asc[id]=s+'/'+t; save(); showScore($('#dscore'),s,t); },i=>[`asc${id}-${i}`,'mc',{q:A.q[i][0],o:A.q[i][1],c:A.q[i][2],e:''},'Legoĉambro · '+A.t]);
  draw(); $('#dreset').onclick=draw;
  if(S.asc[id]){ const [a,b]=S.asc[id].split('/').map(Number); showScore($('#dscore'),a,b); }
}
function renderTekstoLeg(id){
  const T=TESTI[id], st=S.rt[id]||{};
  const set=(k,v)=>{ S.rt[id]=Object.assign({},S.rt[id]||{},{[k]:v}); save(); };
  $('#main').innerHTML=`<header class="uhead"><div class="eyebrow"><a href="#reading-room">Legoĉambro</a> · ${T.lvl}</div><h1 class="title">${esc(T.t)}</h1><p class="subtitle">${wordsOf(T.text)} vortoj</p></header>
   <div class="reading">${T.text.split(/\n\s*\n/).map(p=>`<p>${esc(p.trim())}</p>`).join('')}</div>
   <section class="card"><div class="card-h"><div><span class="lab">Skribu</span><h3>Respondu skribe</h3></div><span class="note" id="rtwc"></span></div>
    <ol class="dots">${T.ask.map(q=>`<li class="q">${esc(q)}</li>`).join('')}</ol>
    <p class="note">Responda às perguntas num texto só, com 3 a 5 frases para cada uma. Use palavras do texto.</p>
    <textarea class="paper" id="rtw" style="min-height:200px" lang="eo" spellcheck="false" placeholder="Skribu viajn respondojn ĉi tie… (cx → ĉ)">${esc(st.txt||'')}</textarea>
    <div class="btnrow" style="margin-top:10px"><button class="btn red" id="rtcorr" type="button">Korekti per la ruĝa plumo</button><button class="btn ${st.done?'':'primary'}" id="rtdone" type="button">${st.done?'✓ Farita':'Marki kiel farita'}</button></div><div id="rtout"></div></section>
   <div class="done-row">${id>0?`<a class="btn ghost" href="#reading-room-t-${id-1}">← ${esc(TESTI[id-1].t)}</a>`:''}${TESTI[id+1]?`<a class="btn ghost" href="#reading-room-t-${id+1}">${esc(TESTI[id+1].t)} →</a>`:''}</div>`;
  const ta=$('#rtw'), wcf=()=>{ $('#rtwc').textContent=(ta.value.trim()?ta.value.trim().split(/\s+/).length:0)+' vortoj'; }; wcf();
  ta.oninput=()=>{ set('txt',ta.value); wcf(); };
  $('#rtcorr').onclick=()=>quickCorr($('#rtout'),ta.value,'Answer these questions about the text «'+T.t+'»: '+T.ask.join(' / '),T.lvl);
  $('#rtdone').onclick=()=>{ set('done',!(S.rt[id]||{}).done); if(S.rt[id].done) tick(5); const b=$('#rtdone'); b.textContent=S.rt[id].done?'✓ Farita':'Marki kiel farita'; b.classList.toggle('primary',!S.rt[id].done); };
}
function numDrillW(ab){
  const types=[['numeri','Nombroj'],['prezzi','Prezoj'],['orari','Horoj'],['anni','Jaroj']];
  const two=numType==='numeri'||numType==='anni';
  ab.innerHTML=`<div class="chipsel" style="margin-bottom:10px">${types.map(([k,l])=>`<button data-t="${k}" aria-pressed="${numType===k}">${l}</button>`).join('')}</div>
   ${two?`<div class="seg" role="group" style="margin-bottom:14px"><button data-dir="w2d" aria-pressed="${numDir==='w2d'}">vortoj → ciferoj</button><button data-dir="d2w" aria-pressed="${numDir==='d2w'}">ciferoj → vortoj</button></div>`:''}
   <section class="card drill" id="ncard"></section><p class="note">${two&&numDir==='d2w'?'Escreva o número por extenso: <i>dudek sep</i>, <i>mil naŭcent okdek sep</i>.':'Escreva com algarismos: 27 · 12,40 · 3:15 · 1987. As horas usam o relógio de 12 horas. Atenção aos pares que confundem: <i>dek ses</i> (16) × <i>sesdek</i> (60).'}</p>`;
  ab.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ numType=b.dataset.t; numDrillW(ab); });
  ab.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>{ numDir=b.dataset.dir; numDrillW(ab); });
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
    else { const y=R(1850,2030); say=eoNum(y); ans=String(y); show=String(y); }
    const d2w=two&&numDir==='d2w';
    const c=$('#ncard'); c.innerHTML=`<span class="lab">${d2w?'Skribu per vortoj':'Skribu per ciferoj'}</span><div class="verb" style="font-size:${d2w?'48px':'30px'}">${esc(d2w?show:say)}</div><div style="margin-top:14px"><input id="nin" ${d2w?'':'inputmode="decimal" data-nox="1"'} autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="respondo"></div><div class="fb" id="nfb"></div><div class="btnrow" style="justify-content:center"><button class="btn" id="nnext" type="button">Sekva →</button></div>`;
    const inp=$('#nin'); let done=false;
    const normN=v=>{ v=String(v).replace(/[€\s]/g,''); if(numType==='orari'){ const m=v.match(/^(\d{1,2})[:.h]?(\d{2})?$/); return m?`${(+m[1]%12)||12}:${m[2]||'00'}`:v; } if(numType==='prezzi'){ const f=parseFloat(v.replace(/\.(?=\d{3}(\D|$))/g,'').replace(',','.')); return isNaN(f)?v:f.toFixed(2); } return v.replace(/\D/g,''); };
    const normW=v=>canon(xsys(v)).replace(/-/g,' ').replace(/\s+/g,' ').trim();
    const check=()=>{ if(done){ next(); return; } if(!inp.value.trim()) return; done=true;
      const ok=d2w?normW(inp.value)===normW(say):normN(inp.value)===ans; tick();
      $('#nfb').innerHTML=(ok?'<span class="mark ok">Ĝuste! ✓</span>':`<span class="mark no">${esc(d2w?say:show)}</span>`)+`<p class="note">${esc(d2w?show:say)} = ${esc(d2w?say:show)}</p>`; inp.style.color=ok?'var(--verde)':'var(--rosso)'; };
    inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); check(); } }); inp.focus({preventScroll:true});
    $('#nnext').onclick=next;
  };
  next();
}
'''

CSS = r'''
/* radikoj */
.rad4{grid-template-columns:repeat(4,minmax(0,1fr))}
@media (max-width:760px){.rad4{grid-template-columns:repeat(2,minmax(0,1fr))}}
.rw{font-family:var(--f-read);font-size:inherit}
.rw b{font-weight:700;color:var(--blu)}
.rw .end{color:var(--muted)}
.rw.big{font-family:var(--f-display);font-style:italic;font-size:clamp(44px,8vw,64px);line-height:1.05}
.radcard{min-height:300px;display:grid;align-content:start;gap:14px}
.radmeta{display:flex;justify-content:space-between;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.radmeta b{color:var(--rosso)}
.radfront{display:grid;gap:12px;justify-items:center}
.radpt{font-family:var(--f-read);font-size:26px;line-height:1.25}
.radback{display:grid;gap:10px;justify-items:center;padding-top:12px;border-top:1px dashed var(--line)}
.radder{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:6px 14px;font-family:var(--f-read);font-size:16px}
.radder b{color:var(--ink)}
.radder span{color:var(--muted)}
.radgrade{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:14px}
.radgrade .btn{display:grid;gap:2px;min-width:120px}
.radgrade .btn small{font-size:11.5px;font-weight:500;opacity:.75}
.radgrade .btn.sugg{outline:3px solid var(--ambra);outline-offset:2px}
.radcard input#rin{font-family:var(--f-read);font-size:26px;text-align:center;width:min(100%,360px);border:0;border-bottom:2px dashed var(--blu);background:transparent;color:var(--blu);padding:4px}
.radcard input#rin:focus{outline:none;background:var(--blu-soft)}
.radset{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:12px}
.radset label{display:grid;gap:6px}
.rpill{display:inline-block;margin-left:8px;padding:1px 8px;border-radius:999px;font-size:11px;font-weight:600;vertical-align:middle}
.rpill.k{background:var(--verde-soft);color:var(--verde)}
.rpill.l{background:var(--blu-soft);color:var(--blu)}
.radtbl td:first-child{white-space:nowrap;font-size:17px}
.rad-strip{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:16px;align-items:center;text-decoration:none;color:var(--ink);background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 18px;margin:-10px 0 30px;box-shadow:var(--shadow)}
.rad-strip .rw.big{font-size:40px}
.rad-strip em{font-style:normal;font-weight:600;color:var(--blu);white-space:nowrap}
.rad-strip:hover{border-color:var(--blu)}

/* novelo kaj legoĉambro */
.story-banner{display:grid;gap:6px;text-decoration:none;color:var(--ink);background:var(--card);border:1px solid var(--line);border-left:5px solid var(--blu);border-radius:14px;padding:18px 20px;margin:0 0 30px;box-shadow:var(--shadow)}
.story-banner b{font-family:var(--f-display);font-style:italic;font-size:32px;font-weight:600;line-height:1.05}
.story-banner span:not(.lab){font-family:var(--f-read);font-size:16px;color:var(--muted);max-width:62ch}
.story-banner em{font-style:normal;font-weight:600;color:var(--blu)}
.story-banner:hover{border-color:var(--blu)}
.story-hero{padding:6px 0 22px;border-bottom:1px solid var(--line);margin-bottom:20px}
.chapters{list-style:none;margin:0 0 18px;padding:0;display:grid;gap:6px}
.chapters a{display:grid;grid-template-columns:40px minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:var(--card);text-decoration:none;color:var(--ink)}
.chapters a:hover{border-color:var(--blu)}
.chapters .cn{font-family:var(--f-display);font-size:24px;font-weight:600;color:var(--blu);text-align:center}
.chapters .ct{display:grid;min-width:0}
.chapters .ct b{font-family:var(--f-read);font-size:17px;font-weight:600}
.chapters .ct small{font-size:12.5px;color:var(--muted)}
.chapters li.read a{border-color:var(--verde);background:var(--verde-soft)}
.storytext{margin-bottom:6px}
.storytext h2{margin-top:4px}
.transcript.reading{max-width:64ch;margin-bottom:22px}
.transcript .tl b{font-family:var(--f-ui);font-size:14px;color:var(--muted)}
.phr.nop li{grid-template-columns:minmax(0,1fr)}
'''

CONTENT = [
("<li><b>Depois da Unuo 4:</b>", "<li><b>Junto com o caderno:</b> a novela <a href=\"#story\">La libro kun la verda stelo</a>, um capítulo por unidade.</li>\n   <li><b>Depois da Unuo 4:</b>"),
("  <h2 class=\"sec\">Legi kaj aŭskulti</h2>", "  <h2 class=\"sec\">Legi pli</h2>"),
("placeholder=\"Hodiaŭ mi legis / aŭskultis…\"", "placeholder=\"Hodiaŭ mi legis…\""),
("tells you in Esperanto what she read, listened to or studied today. The text may be dictated or typed", "tells you in Esperanto what she read or studied today. The text may be typed"),
("com as mesmas ferramentas dos seus cadernos de italiano e de inglês, mais algumas que só o esperanto tem.", "com a mesma estrutura dos seus cadernos de italiano e de inglês, mais algumas ferramentas que só o esperanto tem. Aqui o foco é ler e escrever: sem áudio, com uma novela em 12 capítulos para acompanhar o curso."),
]
