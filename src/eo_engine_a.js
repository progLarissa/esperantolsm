(function(){
'use strict';
const $ = (s,el=document)=>el.querySelector(s);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BANDS = ['A1','A2','B1 → B2'];
const uNum = u=>u.n||String(u.id);
const uName = u=>`Unuo ${u.id}`;
const tRange = t=>t.range||`${t.units[0]}–${t.units[1]}`;

/* ---------- estado ---------- */
const KEY='esperanto-kajero-v1';
const EO_M=['januaro','februaro','marto','aprilo','majo','junio','julio','aŭgusto','septembro','oktobro','novembro','decembro'];
const EO_MS=['jan','feb','mar','apr','maj','jun','jul','aŭg','sep','okt','nov','dec'];
const EO_WD=['dimanĉo','lundo','mardo','merkredo','ĵaŭdo','vendredo','sabato'];
function eoDate(d,kind){ d=d instanceof Date?d:new Date(d); const D=d.getDate(),M=d.getMonth(),Y=d.getFullYear();
  if(kind==='short') return `${D} ${EO_MS[M]}`; if(kind==='month') return EO_MS[M]; if(kind==='monthyear') return `${EO_M[M]} ${Y}`;
  if(kind==='full') return `la ${D}-a de ${EO_M[M]} ${Y}`; if(kind==='wd') return `${EO_WD[d.getDay()]}, la ${D}-a de ${EO_M[M]}`; return `la ${D}-a de ${EO_M[M]}`; }
let S;
try{ S = JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ S = {}; }
function ensureDefaults(){
  ['lesson','ex','read','write','tab','gen','corr','days','err','errDel','voc','tests','cult','spk','myvoc','log','orale','wpm','asc','exam','examGen','plan'].forEach(k=>{ if(!S[k]||typeof S[k]!=='object') S[k]={}; });
  S.verbi=S.verbi||{ok:0,tot:0,best:0}; S.falsi=S.falsi||{best:0};
  S.lab=S.lab||{}; ['trad','trasf','ord','tabel','vort','dict'].forEach(k=>{ if(!S.lab[k]) S.lab[k]={ok:0,tot:0}; });
  S.goal=S.goal||30; S.mastered=S.mastered||0;
}
ensureDefaults();
let saveT;
function save(){ S.at=Date.now(); clearTimeout(saveT); saveT=setTimeout(()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} schedulePush(); },150); }

/* ---------- correção ---------- */
const XMAP={c:'ĉ',g:'ĝ',h:'ĥ',j:'ĵ',s:'ŝ',u:'ŭ',C:'Ĉ',G:'Ĝ',H:'Ĥ',J:'Ĵ',S:'Ŝ',U:'Ŭ'};
const xsys = s=>String(s).replace(/([cghjsuCGHJSU])[xX]/g,(m,c)=>XMAP[c]);
const unc = s=>xsys(s);
const norm = s=>unc(String(s).toLowerCase().replace(/[’`´‘]/g,"'").replace(/\s*'\s*/g,"'").replace(/\s+/g,' ').trim().replace(/[.!?,;:»«"“”]+$/,'').replace(/^[«"“]+/,''));
const strip = s=>norm(s).normalize('NFD').replace(/[̀-ͯ]/g,'');
function expand(a){
  if(!a.includes('/')) return [a];
  const toks=a.split(' ').map(t=>t.split('/'));
  let out=[''];
  toks.forEach(opts=>{ const n=[]; out.forEach(p=>opts.forEach(o=>n.push((p?p+' ':'')+o))); out=n; });
  return out;
}
function judge(val, answers){
  const all=[].concat(...answers.map(expand));
  const v=norm(val);
  if(!v) return 'no';
  if(all.some(a=>norm(a)===v)) return 'ok';
  if(all.some(a=>strip(a)===strip(val))) return 'acc';
  return 'no';
}
function rx(src){
  const C='[a-zĉĝĥĵŝŭ]';
  return new RegExp(src.replace(/</g,'(?<!'+C+')').replace(/>/g,'(?!'+C+')').replace(/W/g,C),'gi');
}

/* ---------- progresso ---------- */
function uParts(u){
  const parts=[!!S.lesson[u.id], !!S.read[u.id]];
  u.ex.forEach((_,i)=>parts.push(!!S.ex[u.id+'-'+i]));
  parts.push(!!(S.write[u.id]&&S.write[u.id].done));
  parts.push(!!(S.spk[u.id]&&S.spk[u.id].done));
  return parts;
}
function uPct(u){ const p=uParts(u); return Math.round(100*p.filter(Boolean).length/p.length); }


/* ---------- navegação ---------- */
const FLAG='<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" rx="1.5" fill="#0B8A3E"/><rect width="10.4" height="10.4" fill="#fff"/><polygon fill="#0B8A3E" points="5.00,1.30 5.91,3.95 8.71,3.99 6.47,5.68 7.29,8.36 5.00,6.75 2.71,8.36 3.53,5.68 1.29,3.99 4.09,3.95"/></svg>';
function renderNav(route){
  const nav=$('#nav');
  let h=`<a class="brand" href="#">${FLAG}<b>Kajero de Esperanto</b><span>A1 → B2 · la internacia lingvo</span></a>${rhythmWidget()}`;
  BANDS.forEach((b,bi)=>{
    const us=UNITS.filter(u=>u.band===bi);
    h+=`<div class="navgroup"><h4><span>${['A1 · unuaj paŝoj','A2 · konstrui frazojn','B1 → B2 · nuancoj'][bi]}</span></h4><ul>`;
    us.forEach(u=>{
      const cur = route.type==='unit'&&route.id===u.id;
      h+=`<li><a class="navlink" href="#unit-${u.id}" ${cur?'aria-current="page"':''}><span class="n">${uNum(u)}</span><span class="t">${esc(u.title)}<span class="bar"><i style="width:${uPct(u)}%"></i></span></span></a></li>`;
    });
    h+=`</ul></div>`;
  });
  const due=errDue().length;
  h+=`<div class="navgroup"><h4><span>Ĉiutage</span></h4><ul>
   <li><a class="navlink tool" href="#plan" ${route.type==='plan'?'aria-current="page"':''}><span class="n">▦</span><span class="t">Mia plano<br><small class="note">${planNavNote()}</small></span></a></li>
   <li><a class="navlink tool" href="#review" ${route.type==='ripasso'?'aria-current="page"':''}><span class="n">✎</span><span class="t">Kajero de eraroj ${due?`<span class="badge">${due}</span>`:''}<br><small class="note">${Object.keys(S.err).length} por ripeti · ${S.mastered} regitaj</small></span></a></li>
   <li><a class="navlink tool" href="#vocabulary" ${route.type==='lessico'?'aria-current="page"':''}><span class="n">Aa</span><span class="t">Vortaro laŭ temoj<br><small class="note">${LESSICO.reduce((a,t)=>a+t.w.length,0)} vortoj · ${LESSICO.length} temoj</small></span></a></li>
   <li><a class="navlink tool" href="#culture" ${route.type==='cultura'?'aria-current="page"':''}><span class="n">★</span><span class="t">Kulturo kaj historio<br><small class="note">${Object.keys(S.cult).filter(k=>S.cult[k]&&S.cult[k].read).length}/${CULTURA.length} kartoj legitaj</small></span></a></li>
  </ul></div>
  <div class="navgroup"><h4><span>Aŭskulti kaj paroli</span></h4><ul>
   <li><a class="navlink tool" href="#listening" ${route.type==='ascolto'?'aria-current="page"':''}><span class="n">♪</span><span class="t">Aŭskultado<br><small class="note">dikto · scenoj · nombroj</small></span></a></li>
   <li><a class="navlink tool" href="#read-aloud" ${route.type==='leggere'?'aria-current="page"':''}><span class="n">❝</span><span class="t">Laŭtlegado<br><small class="note">${TESTI.length} tekstoj · langorompiloj</small></span></a></li>
   <li><a class="navlink tool" href="#speaking" ${route.type==='parlare'?'aria-current="page"':''}><span class="n">☏</span><span class="t">Parolado<br><small class="note">konversacio kun AI · parola ekzameno</small></span></a></li>
   <li><a class="navlink tool" href="#beyond" ${route.type==='fuori'?'aria-current="page"':''}><span class="n">✚</span><span class="t">Legaĵoj, muziko kaj mi<br><small class="note">${Object.keys(S.myvoc).length} miaj vortoj · studtaglibro</small></span></a></li>
  </ul></div>
  <div class="navgroup"><h4><span>Testoj</span></h4><ul><li><a class="navlink tool" href="#exams" ${route.type==='exams'?'aria-current="page"':''}><span class="n">§</span><span class="t">Legaj ekzamenoj<br><small class="note">${EXAMS.length} ekzercoj · KER-stilo</small></span></a></li>${TESTS.map(t=>{ const r=S.tests[t.id]; return `<li><a class="navlink tool" href="#test-${t.id}" ${route.type==='test'&&route.id===t.id?'aria-current="page"':''}><span class="n">${r&&r.passed?'✓':t.lvl}</span><span class="t">${t.title} · unuoj ${tRange(t)}<br><small class="note">${r?'plej bone: '+r.best+'/20':'ankoraŭ ne farita'}</small></span></a></li>`; }).join('')}</ul></div>`;
  h+=`<div class="navgroup"><h4><span>Iloj</span></h4><ul>
   <li><a class="navlink tool" href="#verbs" ${route.type==='verbi'?'aria-current="page"':''}><span class="n">→</span><span class="t">Verboj kaj participoj<br><small class="note">${VKEYS.length} verboj · 6 tempoj · 9 participoj</small></span></a></li>
   <li><a class="navlink tool" href="#tabelvortoj" ${route.type==='tabel'?'aria-current="page"':''}><span class="n">▤</span><span class="t">Tabelvortoj<br><small class="note">45 vortoj · ki-, ti-, i-, ĉi-, neni-</small></span></a></li>
   <li><a class="navlink tool" href="#vortfarado" ${route.type==='vort'?'aria-current="page"':''}><span class="n">⚙</span><span class="t">Vortfarado<br><small class="note">${AFIKSOJ.length} afiksoj · ${VORTOJ.length} vortoj</small></span></a></li>
   <li><a class="navlink tool" href="#false-friends" ${route.type==='falsi'?'aria-current="page"':''}><span class="n">≠</span><span class="t">Falsaj amikoj<br><small class="note">${FALSI.length} kaptiloj PT/ES</small></span></a></li>
   <li><a class="navlink tool" href="#sentences" ${route.type==='frasi'?'aria-current="page"':''}><span class="n">¶</span><span class="t">Frazlaboratorio<br><small class="note">${TRAD.length} tradukoj · ${TRASF.length} transformoj</small></span></a></li>
  </ul></div><p class="syncline" id="syncline">${syncText()}</p>`;
  nav.innerHTML=h;
  updRhythm();
}
function route(){
  const h=decodeURIComponent(location.hash.slice(1));
  let m;
  if((m=h.match(/^unit-(\d+)$/)) && UNITS.find(u=>u.id==m[1])) return {type:'unit',id:+m[1]};
  if(h==='false-friends') return {type:'falsi'};
  if(h==='verbs') return {type:'verbi'};
  if(h==='tabelvortoj') return {type:'tabel'};
  if(h==='vortfarado') return {type:'vort'};
  if(h==='sentences') return {type:'frasi'};
  if(h==='review') return {type:'ripasso'};
  if(h==='vocabulary') return {type:'lessico'};
  if(h==='culture') return {type:'cultura'};
  if(h==='read-aloud') return {type:'leggere'};
  if((m=h.match(/^read-aloud-(\d+)$/)) && TESTI[+m[1]]) return {type:'leggere',id:+m[1]};
  if(h==='listening') return {type:'ascolto'};
  if((m=h.match(/^listening-(\d+)$/)) && ASCOLTI[+m[1]]) return {type:'ascolto',id:+m[1]};
  if(h==='speaking') return {type:'parlare'};
  if(h==='exams') return {type:'exams'};
  if(h==='plan') return {type:'plan'};
  if((m=h.match(/^exam-([a-z0-9-]+)$/))) return {type:'exams',id:m[1]};
  if(h==='beyond') return {type:'fuori'};
  if((m=h.match(/^culture-(\d+)$/)) && CULTURA[+m[1]]) return {type:'cultura',id:+m[1]};
  if((m=h.match(/^vocabulary-(\d+)$/)) && LESSICO[+m[1]]) return {type:'lessico',id:+m[1]};
  if((m=h.match(/^test-(\d+)$/)) && TESTS.find(t=>t.id==m[1])) return {type:'test',id:+m[1]};
  return {type:'home'};
}
function render(){
  const r=route();
  stopTestTimer(); stopExamTimer(); stopSpeak(); stopOral();
  renderNav(r);
  closeNav();
  if(r.type==='unit') renderUnit(UNITS.find(u=>u.id===r.id));
  else if(r.type==='falsi') renderFalsi();
  else if(r.type==='verbi') renderVerbi();
  else if(r.type==='tabel') renderTabel();
  else if(r.type==='vort') renderVortfarado();
  else if(r.type==='frasi') renderLab();
  else if(r.type==='ripasso') renderRipasso();
  else if(r.type==='lessico') renderLessico(r.id);
  else if(r.type==='cultura') renderCultura(r.id);
  else if(r.type==='leggere') renderLeggere(r.id);
  else if(r.type==='ascolto') renderAscolto(r.id);
  else if(r.type==='parlare') renderParlare();
  else if(r.type==='fuori') renderFuori();
  else if(r.type==='test') renderTest(r.id);
  else if(r.type==='exams') renderExams(r.id);
  else if(r.type==='plan') renderPlan();
  else renderHome();
  window.scrollTo(0,0);
}
function openNav(){ $('#nav').classList.add('open'); $('#scrim').classList.add('open'); $('#menuBtn').setAttribute('aria-expanded','true'); }
function closeNav(){ $('#nav').classList.remove('open'); $('#scrim').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false'); }
$('#menuBtn').addEventListener('click',()=>$('#nav').classList.contains('open')?closeNav():openNav());
$('#scrim').addEventListener('click',closeNav);
window.addEventListener('hashchange',render);


/* ---------- HOME ---------- */
function renderHome(){
  const total=UNITS.reduce((a,u)=>a+uPct(u),0)/UNITS.length;
  const doneU=UNITS.filter(u=>uPct(u)===100).length;
  const next=UNITS.find(u=>uPct(u)<100)||UNITS[0];
  const exDone=Object.keys(S.ex).length;
  let h=`<section class="hero">
   <div class="eyebrow">La internacia lingvo · de nul ĝis B2</div>
   <h1>De «Saluton!» al <em>via unua kongreso.</em></h1>
   <p class="lead">O esperanto é a língua que mais recompensa quem já fala português e espanhol: pronúncia sem surpresas, gramática sem exceções e um vocabulário que você reconhece. Este caderno leva você do zero ao B2 com as mesmas ferramentas dos seus cadernos de italiano e de inglês, mais algumas que só o esperanto tem.</p>
   <p class="note">Comece pela <a href="#unit-1">Unuo 1</a>. Para digitar <b>ĉ ĝ ĥ ĵ ŝ ŭ</b>, escreva <b>cx gx hx jx sx ux</b>: o caderno converte enquanto você digita.</p>
   <div class="stats">
     <div class="stat"><b>${Math.round(total)}%</b><span>de la kurso</span></div>
     <div class="stat"><b>${doneU}/${UNITS.length}</b><span>unuoj finitaj</span></div>
     <div class="stat"><b>${exDone}</b><span>ekzercaroj</span></div>
     <div class="stat"><b>${S.verbi.best||0}</b><span>rekordo de verboj</span></div>
   </div>
   <div class="btnrow" style="margin-top:20px"><a class="btn primary" href="#unit-${next.id}">${uPct(next)>0?'Daŭrigi':'Komenci'}: ${uName(next)} →</a><a class="btn" href="#tabelvortoj">Tabelvortoj</a><a class="btn" href="#listening">Trejni la orelon</a></div>
  </section>`;
  h+=homePlan()+homeRhythm();
  h+=`<h2 class="sec">La kurso</h2><div class="levelmap">`;
  BANDS.forEach((b,bi)=>{
    const us=UNITS.filter(u=>u.band===bi);
    const desc=['Pronúncia, -o -a -j, os verbos -as -is -os, o acusativo, possessivos, números e horas.','Preposições e direção, formação de palavras, os 45 correlativos, comparações, -ig-/-iĝ- e sia.','Condicional e volitivo, particípios ativos e passivos, discurso indireto e as partículas que dão cor.'][bi];
    h+=`<div class="lv"><b>${b}</b><small>${desc}</small><div class="units">${us.map(u=>{const p=uPct(u);return `<a href="#unit-${u.id}" class="${p===100?'full':p>0?'part':''}" title="${esc(u.title)} · ${p}%">${uNum(u)}</a>`}).join('')}</div></div>`;
  });
  h+=`</div>
  <div class="cols3">
   <div class="card"><div class="card-h"><span class="lab">1 · Kontrasto</span></div><h3>O que o português e o espanhol escondem</h3><p>Cada lição compara o esperanto com as duas línguas que você já tem e marca em vermelho as armadilhas: <i>tamen</i> não é «também», <i>por</i> não é «por causa de», <i>mi</i> não é «meu». As explicações são em português, para ler depressa.</p></div>
   <div class="card"><div class="card-h"><span class="lab">2 · Kvanto</span></div><h3>Praticar até ficar automático</h3><p>Quatro séries por unidade, um laboratório de tradução e transformação, três ferramentas próprias do esperanto (verbos e particípios, tabelvortoj, vortfarado) e um botão que escreve novos exercícios quando você quiser.</p></div>
   <div class="card"><div class="card-h"><span class="lab">3 · Produktado</span></div><h3>Escrever, falar e ser corrigida</h3><p>Uma redação por unidade com metas contadas enquanto você escreve, correção com caneta vermelha e um parceiro de conversa com IA. No esperanto todo mundo é estrangeiro: errar aqui não custa nada.</p></div>
  </div>
  <section class="card examcta"><div><span class="lab">Celo · la ekzameno KER</span><h3>Legaj ekzamenoj</h3><p>Práticas cronometradas no estilo da prova de leitura do exame internacional KER (B1 e B2): múltipla escolha, «vera / malvera / ne dirite» e associação, com explicação para cada resposta e novas práticas ilimitadas.</p></div><a class="btn primary" href="#exams">Ekzerci nun →</a></section>
  <h2 class="sec">Aŭskulti kaj paroli</h2>
  <div class="cols4">
   <a class="card lexcard" href="#listening"><span class="lab">La orelo</span><h3>Aŭskultado</h3><span class="note">Ditado por nível, ${ASCOLTI.length} cenas com diálogos, números, preços e horas.</span></a>
   <a class="card lexcard" href="#read-aloud"><span class="lab">Prononco</span><h3>Laŭtlegado</h3><span class="note">${TESTI.length} textos, shadowing, trava-línguas e cronômetro de palavras por minuto.</span></a>
   <a class="card lexcard" href="#speaking"><span class="lab">Kuraĝo</span><h3>Parolado</h3><span class="note">${ROLEPLAY.length} conversas com IA, frases para ganhar tempo, prova oral.</span></a>
   <a class="card lexcard" href="#beyond"><span class="lab">Vera vivo</span><h3>Legaĵoj, muziko kaj mi</h3><span class="note">Guarde palavras do que você lê e ouve, registre o tempo, resuma e seja corrigida.</span></a>
  </div>
  ${homeCultura()}
  <h2 class="sec">Legi kaj aŭskulti</h2>
  <h3>Livros, em ordem de dificuldade</h3>
  <ul class="dots">
   <li><b>Depois da Unuo 4:</b> Claude Piron, <i>Gerda malaperis!</i>, o romance policial clássico para iniciantes, escrito com vocabulário crescente capítulo a capítulo.</li>
   <li><b>Depois da Unuo 8:</b> Tibor Sekelj, <i>Kumeŭaŭa, la filo de la ĝangalo</i>; Antoine de Saint-Exupéry, <i>La Eta Princo</i> (tradução).</li>
   <li><b>B1:</b> Edmond Privat, <i>Vivo de Zamenhof</i>; Cezaro Rossetti, <i>Kredu min, sinjorino!</i>, um romance cômico original.</li>
   <li><b>B2:</b> Anna Löwenstein, <i>La ŝtona urbo</i> (romance histórico original); J. R. R. Tolkien, <i>La Hobito</i>, na tradução de William Auld; as revistas <i>Monato</i> e <i>Libera Folio</i>.</li>
  </ul>
  <h3>Para ouvir</h3>
  <ul class="dots">
   <li><b>Cursos em vídeo:</b> <i>Pasporto al la tuta mondo</i> e o desenho animado <i>Mazi en Gondolando</i>, ambos feitos para aprender só com o esperanto.</li>
   <li><b>Música:</b> Kajto, JoMo, Dolchamar, Persone, La Perdita Generacio, Jonny M. Procure as letras e cante junto.</li>
   <li><b>Textos com áudio:</b> a <i>Esperanta Retradio</i> publica textos curtos lidos em voz alta, ótimos para ditado.</li>
  </ul>
  <p class="note">Leia com lápis, não com dicionário: sublinhe, adivinhe pelo contexto e consulte só as palavras que voltam três vezes. Depois guarde-as em «Miaj vortoj».</p>
  <p class="note">Os testes deste caderno seguem a prova de leitura do KER (o exame de esperanto alinhado ao Quadro Europeu). O exame real também avalia compreensão oral, escrita e fala: as páginas de Aŭskultado e Parolado preparam para isso.</p>`;
  $('#main').innerHTML=h;
  bindHome();
}


/* ---------- UNIDADE ---------- */
const TABS=[['lezione','Leciono'],['lettura','Legado'],['esercizi','Ekzercoj'],['scrittura','Skribado'],['parla','Aŭskultu kaj parolu']];
function renderUnit(u){
  const tab=S.tab[u.id]||'lezione';
  const p=uPct(u);
  const parts=uParts(u);
  const tabDone={lezione:parts[0],lettura:parts[1],esercizi:u.ex.every((_,i)=>S.ex[u.id+'-'+i]),scrittura:!!(S.write[u.id]&&S.write[u.id].done),parla:!!(S.spk[u.id]&&S.spk[u.id].done)};
  let h=`<header class="uhead"><div class="eyebrow">Unuo ${String(u.id).padStart(2,'0')} · ${u.lvl}</div>
   <h1 class="title">${esc(u.title)}</h1><p class="subtitle">${esc(u.sub)}</p>
   <div class="uprog"><span class="track"><i style="width:${p}%"></i></span><span>${p}% farita</span></div></header>
   <nav class="tabs" role="tablist">${TABS.map(([k,l])=>`<button role="tab" data-tab="${k}" aria-selected="${k===tab}">${l}${tabDone[k]?'<span class="tick">✓</span>':''}</button>`).join('')}</nav>
   <div id="tabc"></div>
   ${(()=>{ const t=TESTS.find(x=>x.units[1]===u.id); return t?`<div class="callout"><span class="pen">Fino de la bloko!</span> Terminou as unidades ${tRange(t)}? Faça o <a href="#test-${t.id}">${t.title}</a> (nível ${t.lvl}, 30 minutos).</div>`:''; })()}
   <div class="btnrow" style="justify-content:space-between;margin-top:34px">
    ${(()=>{ const i=UNITS.indexOf(u), p=UNITS[i-1]; return p?`<a class="btn ghost" href="#unit-${p.id}">← ${uName(p)}</a>`:'<span></span>'; })()}
    ${(()=>{ const i=UNITS.indexOf(u), n=UNITS[i+1]; return n?`<a class="btn ghost" href="#unit-${n.id}">${uName(n)} →</a>`:'<a class="btn ghost" href="#verbs">Verboj kaj participoj →</a>'; })()}
   </div>`;
  $('#main').innerHTML=h;
  $('#main').querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{ S.tab[u.id]=b.dataset.tab; save(); renderUnit(u); $('.tabs').scrollIntoView({block:'start'}); }));
  const c=$('#tabc');
  if(tab==='lezione') tabLesson(u,c);
  else if(tab==='lettura') tabReading(u,c);
  else if(tab==='esercizi') tabEx(u,c);
  else if(tab==='parla') tabParla(u,c);
  else tabWrite(u,c);
}
function refreshProgress(u){
  renderNav(route());
  const p=uPct(u);
  const tr=$('.uprog'); if(tr){ tr.querySelector('i').style.width=p+'%'; tr.lastElementChild.textContent=p+'% farita'; }
}
function goTab(u,t){ S.tab[u.id]=t; save(); renderUnit(u); $('.tabs').scrollIntoView({block:'start'}); }

/* lição */
function tabLesson(u,c){
  const d=!!S.lesson[u.id];
  c.innerHTML=`<div class="lesson">${u.lesson}</div>
   <div class="done-row"><button class="btn ${d?'':'primary'}" id="ldone">${d?'✓ Leciono lernita':'Marki kiel lernita'}</button>
   <button class="btn" id="lnext">Al la legado →</button></div>`;
  $('#ldone').onclick=()=>{ S.lesson[u.id]=!S.lesson[u.id]; save(); tabLesson(u,c); refreshProgress(u); };
  $('#lnext').onclick=()=>{ if(!S.lesson[u.id]){S.lesson[u.id]=true;save();} goTab(u,'lettura'); };
}

/* leitura */
function gloss(t){ return t.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,(m,a,b)=>`<span class="g" tabindex="0" data-t="${esc(b)}">${a}</span>`); }
function tabReading(u,c){
  const R=u.reading;
  c.innerHTML=`<article class="reading" id="readart"><h2>${esc(R.title)}</h2>${speakBtnHTML('rspeak')}${gloss(R.text)}</article>
   <p class="note">Vortoj kun punktita substreko: tuŝu ilin (aŭ metu la muson sur ilin) por vidi la signifon.</p>
   <section class="card" style="margin-top:24px"><div class="card-h"><div><span class="lab">Legokompreno</span><h3>Demandoj pri la teksto</h3></div><span class="score" id="rscore"></span></div>
   <ol class="items" id="rq"></ol><div class="btnrow"><button class="btn" id="rreset">Reprovi</button></div></section>`;
  mcList($('#rq'),R.q,(score,tot)=>{ S.read[u.id]={s:score,t:tot}; save(); showScore($('#rscore'),score,tot); refreshProgress(u); }, i=>['u'+u.id+'-r-'+i,'mc',{q:R.q[i][0],o:R.q[i][1],c:R.q[i][2],e:R.q[i][3]||''},uName(u)+' · legado']);
  if(S.read[u.id]) showScore($('#rscore'),S.read[u.id].s,S.read[u.id].t);
  bindSpeak('rspeak',()=>textOf($('#readart'),'h2,.speak'));
  $('#rreset').onclick=()=>tabReading(u,c);
}
function showScore(el,s,t){ el.textContent=s+'/'+t; el.classList.toggle('good',s/t>=.8); }

/* múltipla escolha */
function mcList(ol,items,onDone,errFn){
  let answered=0,score=0;
  ol.innerHTML=items.map((it,i)=>`<li><div><div class="q">${esc(it[0])}</div><div class="opts">${it[1].map((o,j)=>`<button class="opt" data-i="${i}" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="expl" hidden></div></div></li>`).join('');
  ol.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{
    const i=+b.dataset.i,j=+b.dataset.j,it=items[i];
    const li=ol.children[i];
    li.querySelectorAll('.opt').forEach((x,k)=>{ x.disabled=true; if(k===it[2]) x.classList.add('ok'); });
    if(j!==it[2]){ b.classList.add('no'); if(errFn){ const e=errFn(i); if(e) addErr(...e); } } else score++;
    tick();
    const ex=li.querySelector('.expl');
    const mark = j===it[2]?'<span class="mark ok">ĝuste!</span>':'<span class="mark no">ne tute…</span>';
    ex.innerHTML=mark+(it[3]?' '+esc(it[3]):''); ex.hidden=false;
    if(++answered===items.length) onDone(score,items.length);
  }));
}

/* exercícios */
const TYPE_LAB={fill:'Kompletigu',mc:'Plurelekto',fix:'Korektu',order:'Ordigu'};
function tabEx(u,c){
  c.innerHTML=`<p class="note" style="margin-bottom:18px">Digite e aperte <b>Enter</b> para seguir. «Kontroli» corrige a série inteira. Escreva <b>cx gx hx jx sx ux</b> para ĉ ĝ ĥ ĵ ŝ ŭ; uma resposta só sem o acento aparece em amarelo.</p><div id="sets"></div>
   <section class="card" id="gencard"><div class="card-h"><div><span class="lab">Plia ekzercado</span><h3>Pli da ekzercoj pri ĉi tiu unuo</h3></div></div>
   <p>Gere 6 frases novas sobre <i>${esc(u.title)}</i>, pensadas para as armadilhas de quem fala português e espanhol. Repita quantas vezes quiser.</p>
   <div class="btnrow"><button class="btn red" id="genbtn">Generi 6 novajn ekzercojn</button><span class="note" id="genmsg"></span></div>
   <div id="gensets"></div></section>`;
  const box=$('#sets');
  u.ex.forEach((set,i)=>{
    const sec=document.createElement('section'); sec.className='card'; box.appendChild(sec);
    buildSet(sec,set,String.fromCharCode(65+i),u.id+'-'+i,()=>refreshProgress(u),uName(u)+' · aro '+String.fromCharCode(65+i));
  });
  (S.gen[u.id]||[]).forEach((set,k)=>addGenSet(u,set,k));
  $('#genbtn').onclick=()=>generate(u);
}
function addGenSet(u,set,k){
  const sec=document.createElement('div'); sec.style.marginTop='18px';
  $('#gensets').prepend(sec);
  const inner=document.createElement('section'); inner.className='card'; inner.style.boxShadow='none'; sec.appendChild(inner);
  buildSet(inner,{t:'fill',title:'Generitaj · aro '+(k+1),items:set},'AI',null,null,uName(u)+' · generitaj ekzercoj');
}
function buildSet(sec,set,letter,key,onSave,src){
  const ekey=i=>(key||('g'+hashStr(set.items[i][0])))+'-'+i;
  const prev=key&&S.ex[key];
  sec.innerHTML=`<div class="card-h"><div><span class="lab">${letter} · ${TYPE_LAB[set.t]}</span><h3>${esc(set.title)}</h3></div><span class="score">${prev?prev.s+'/'+prev.t:''}</span></div><ol class="items"></ol>
   ${set.t!=='mc'?'<div class="btnrow"><button class="btn primary" data-a="check">Kontroli</button><button class="btn" data-a="show">Montri la respondojn</button><button class="btn" data-a="reset">Reprovi</button></div>':'<div class="btnrow"><button class="btn" data-a="reset">Reprovi</button></div>'}`;
  if(prev) showScore(sec.querySelector('.score'),prev.s,prev.t);
  const ol=sec.querySelector('.items');
  const record=(s,t)=>{ showScore(sec.querySelector('.score'),s,t); if(key){ S.ex[key]={s,t}; save(); onSave&&onSave(); } };
  sec.querySelector('[data-a="reset"]').onclick=()=>buildSet(sec,set,letter,key,onSave,src);
  if(set.t==='mc'){ mcList(ol,set.items,record,i=>{ const it=set.items[i]; return [ekey(i),'mc',{q:it[0],o:it[1],c:it[2],e:it[3]||''},src]; }); return; }
  if(set.t==='order'){ orderList(ol,set.items,sec,record,ekey,src); return; }

  ol.innerHTML=set.items.map((it,i)=>{
    if(set.t==='fill'){
      const multi=Array.isArray(it[1][0]);
      const answers=multi?it[1]:[it[1]];
      let txt=it[0], hint='';
      const m=txt.match(/\s*(\([^()]*\))\s*$/); if(m){ hint=m[1]; txt=txt.slice(0,m.index); }
      let bi=0;
      const html=esc(txt).replace(/___/g,()=>{ const a=answers[bi]||['']; const w=Math.max(4,...a.map(x=>x.length))+2; return `<input class="blank" data-b="${bi++}" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="truo">`; });
      return `<li><div><div class="sent">${html}${hint?`<span class="hint">${esc(hint)}</span>`:''}<span class="fb"></span></div><div class="expl" hidden></div></div></li>`;
    } else {
      const html=esc(it[0]).replace(/\{([^}]*)\}/,'<span class="err">$1</span>');
      const w=Math.max(10,...it[1].map(x=>x.length))+2;
      return `<li><div><div class="sent">${html}</div><div class="fixline">Korekto: <input class="blank" data-b="0" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="korekto"><span class="fb"></span></div><div class="corrected" hidden></div></div></li>`;
    }
  }).join('');

  const inputs=[...ol.querySelectorAll('.blank')];
  inputs.forEach((inp,k)=>inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){ e.preventDefault(); const li=inp.closest('li'); const idx=[...ol.children].indexOf(li);
      const rowInputs=[...li.querySelectorAll('.blank')];
      if(inp===rowInputs[rowInputs.length-1]) checkRow(idx);
      const nx=inputs[k+1]; if(nx) nx.focus(); }
  }));
  const results=new Array(set.items.length).fill(null);
  function answersOf(i){ const it=set.items[i]; if(set.t==='fix') return [it[1]]; return Array.isArray(it[1][0])?it[1]:[it[1]]; }
  function checkRow(i,reveal){
    const li=ol.children[i], it=set.items[i], ans=answersOf(i);
    let rowOk=true; const notes=[];
    li.querySelectorAll('.blank').forEach(inp=>{
      const b=+inp.dataset.b; const r=judge(inp.value,ans[b]);
      inp.classList.remove('ok','no','acc');
      if(reveal && r!=='ok'){ inp.value=ans[b][0]; inp.classList.add('acc'); rowOk=false; return; }
      inp.classList.add(r);
      if(r!=='ok') rowOk=false;
      if(r==='no') notes.push(ans[b][0]);
      if(r==='acc') notes.push('literumo: '+ans[b][0]);
    });
    const fb=li.querySelector('.fb');
    fb.innerHTML = reveal ? '' : (rowOk?'<span class="mark ok">✓</span>':`<span class="mark ${notes.every(n=>n.startsWith('literumo'))?'acc':'no'}">${esc(notes.join(' · '))}</span>`);
    if(set.t==='fill' && it[2]){ const ex=li.querySelector('.expl'); ex.textContent=it[2]; ex.hidden=false; }
    if(set.t==='fix'){ const co=li.querySelector('.corrected'); co.textContent='✓ '+it[2]; co.hidden=false; }
    const tried=[...li.querySelectorAll('.blank')].some(x=>x.value.trim());
    if(!reveal && tried && results[i]===null) tick();
    if(!reveal && tried && !rowOk) addErr(ekey(i), set.t==='fix'?'fix':'fill', set.t==='fix'?{p:it[0],a:it[1],c:it[2]}:{p:it[0],a:it[1],e:it[2]||''}, src);
    results[i]= reveal?false:rowOk;
    if(results.every(r=>r!==null) && !reveal) record(results.filter(Boolean).length,results.length);
    return rowOk;
  }
  sec.querySelector('[data-a="check"]').onclick=()=>{ set.items.forEach((_,i)=>checkRow(i)); };
  sec.querySelector('[data-a="show"]').onclick=()=>{ set.items.forEach((_,i)=>{ if(results[i]!==true) checkRow(i,true); }); };
}

/* ---------- IA ---------- */
let samplePromise=null;
function getSample(){
  if(!samplePromise) samplePromise = (async()=>{ try{ return (window.claude&&window.claude.use) ? await window.claude.use('sample') : null; }catch(e){ return null; } })();
  return samplePromise;
}
const ERR={not_granted:'Claude ankoraŭ ne rajtas uzi ĉi tiun paĝon. Permesu ĝin en la agordoj de la paĝo kaj reprovu.',sampling_disabled:'Claude ne disponeblas por ĉi tiu konto.',rate_limited:'Tro da petoj sinsekve. Atendu kelkajn minutojn kaj reprovu.',session_expired:'Via seanco finiĝis: ensalutu denove en Claude.',refused:'La peto estis rifuzita. Provu reformuli la tekston.',invalid_json:'La respondo venis en neatendita formo. Reprovu.'};
const errMsg=e=>ERR[e&&e.code]||'Ne eblis plenumi la peton. Reprovu post momento.';

async function generate(u){
  const btn=$('#genbtn'), msg=$('#genmsg');
  btn.disabled=true; msg.textContent='Mi verkas la frazojn…';
  const sample=await getSample();
  if(!sample){ msg.textContent='Generi ekzercojn eblas nur kun ĉi tiu paĝo malfermita en Claude.'; btn.disabled=false; return; }
  const pt=aiLang(u)==='pt';
  const prompt=`You are an expert Esperanto teacher. Write 6 NEW and varied gap-fill exercises in Esperanto on: ${u.focus}. Level ${u.lvl}.
The student is a Brazilian native speaker of Portuguese who also speaks Spanish fluently: at least 3 sentences must target typical mistakes of Portuguese/Spanish speakers on this topic (for example the accusative -n, por/pro, ke/kiu, -ig-/-iĝ-, sia, false friends).
Rules: natural, modern Esperanto that follows the Fundamento and PMEG, always with the letters ĉ ĝ ĥ ĵ ŝ ŭ (never x or h systems); ${u.band===0?'5-10 words, simple A1 vocabulary':'7-16 words'}; exactly ONE gap written "___"; after the sentence, in brackets, a hint (the base word, or the Portuguese meaning). "risposte" lists every acceptable correct answer (lower case, no punctuation). "spiegazione" in ${pt?'Portuguese':'simple Esperanto'}, max 20 words.
Answer only with a JSON array: [{"frase":"Mi trinkas ___ ĉiumatene. (kafo)","risposte":["kafon"],"spiegazione":"${pt?'Objeto direto: acusativo -n.':'Rekta objekto: akuzativo -n.'}"}]`;
  try{
    const data=await sample.json(prompt,{cache:false});
    const items=(Array.isArray(data)?data:[]).filter(x=>x&&typeof x.frase==='string'&&(x.frase.match(/___/g)||[]).length===1&&Array.isArray(x.risposte)&&x.risposte.length)
      .map(x=>[x.frase,x.risposte.map(String),x.spiegazione?String(x.spiegazione):'']);
    if(!items.length) throw {code:'invalid_json'};
    S.gen[u.id]=(S.gen[u.id]||[]).concat([items]).slice(-5); save();
    addGenSet(u,items,S.gen[u.id].length-1);
    msg.textContent='Farite: la nova aro estas sube.';
  }catch(e){ msg.textContent=errMsg(e); }
  btn.disabled=false;
}


/* ---------- escrita ---------- */
function md(t){
  const lines=esc(t).split('\n'); let out='', list=null;
  const inline=s=>s.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/~~([^~]+)~~/g,'<del>$1</del>').replace(/(^|\s)_([^_]+)_/g,'$1<i>$2</i>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g,'$1<i>$2</i>');
  const close=()=>{ if(list){ out+=`</${list}>`; list=null; } };
  lines.forEach(l=>{
    let m;
    if((m=l.match(/^#{1,4}\s+(.*)/))){ close(); out+=`<h4>${inline(m[1])}</h4>`; }
    else if((m=l.match(/^\s*[-*•]\s+(.*)/))){ if(list!=='ul'){close(); out+='<ul>'; list='ul';} out+=`<li>${inline(m[1])}</li>`; }
    else if((m=l.match(/^\s*\d+[.)]\s+(.*)/))){ if(list!=='ol'){close(); out+='<ol>'; list='ol';} out+=`<li>${inline(m[1])}</li>`; }
    else if(l.trim()===''){ close(); }
    else { close(); out+=`<p>${inline(l)}</p>`; }
  });
  close(); return out;
}
function aiLang(u){ if(S.aiLang==='pt'||S.aiLang==='eo') return S.aiLang; return (u&&u.band<2)?'pt':'eo'; }
function corrPrompt(u,text){
  const lvl=u.lvl.split('→').pop().trim();
  const head=`You are a demanding but encouraging Esperanto teacher and KER examiner (the CEFR-based international Esperanto exam). Correct the text of a Brazilian student (native Portuguese, fluent Spanish) who is working towards level ${lvl}.
Grammar focus of the unit: ${u.focus}.
Task: ${u.write.task}
Judge the Esperanto by the Fundamento and good modern usage (PMEG). Always write Esperanto with ĉ ĝ ĥ ĵ ŝ ŭ.
`;
  const body = aiLang(u)==='pt' ? `
Answer IN PORTUGUESE (examples in Esperanto), with exactly these markdown sections:
## Avaliação geral
Nível QECR estimado do texto e uma nota de 0 a 5 em Conteúdo, Organização, Gramática e Vocabulário; 2-3 frases sobre pontos fortes e fracos, e se a tarefa e as estruturas da unidade foram usadas.
## Erros
Lista com cada erro no formato: ~~errado~~ → **certo**: explicação curta. Marque [PT] ou [ES] quando for interferência dessas línguas. Agrupe por tipo (gramática, vocabulário, ortografia, pontuação).
## Texto corrigido
O texto inteiro corrigido, mudando o mínimo possível.
## Para soar mais natural
3 sugestões mais naturais (afixos, tabelvortoj, expressões idiomáticas), com o trecho original e a versão melhorada.
## Exercício personalizado
3 frases para completar baseadas nos erros dela (com ___), e as soluções no fim.
` : `
Answer IN ESPERANTO, in clear sentences suited to level ${lvl} (if an explanation is hard, you may add a Portuguese word in brackets), with exactly these markdown sections:
## Ĝenerala takso
Taksata nivelo laŭ la Komuna Eŭropa Referenckadro, noto de 0 ĝis 5 pri Enhavo, Organizo, Gramatiko kaj Vortprovizo, 2-3 frazoj pri fortaj kaj malfortaj punktoj, kaj ĉu la tasko kaj la strukturoj de la unuo estis uzitaj.
## Eraroj
Ĉiu eraro en la formo: ~~malĝuste~~ → **ĝuste**: mallonga klarigo. Marku [PT] aŭ [ES], kiam la eraro venas el tiuj lingvoj. Grupigu laŭ tipo (gramatiko, vortprovizo, literumo, interpunkcio).
## Korektita teksto
La tuta teksto korektita, kun kiel eble plej malmultaj ŝanĝoj.
## Por soni pli nature
3 pli naturaj esprimoj (afiksoj, tabelvortoj, idiomaĵoj), kun la originala parto kaj la plibonigita versio.
## Via persona ekzerco
3 frazoj por kompletigi, bazitaj sur ŝiaj eraroj (kun ___), kaj la solvoj fine.
`;
  return head+body+`
STUDENT'S TEXT:
"""
${text}
"""`;
}
function tabWrite(u,c){
  const W=u.write; const st=S.write[u.id]||{text:'',done:false};
  c.innerHTML=`<div class="card" style="background:var(--blu-soft);border-color:transparent;box-shadow:none"><span class="lab note">Tasko · ${W.words[0]}–${W.words[1]} vortoj</span><p class="task" style="margin:6px 0 0">${esc(W.task)}</p></div>
   <div class="write-grid">
    <div><textarea class="paper" id="wtext" placeholder="Skribu vian tekston ĉi tie… (cx → ĉ, sx → ŝ, ux → ŭ)" spellcheck="false" lang="eo">${esc(st.text||'')}</textarea>
     <p class="wc" id="wc"></p>
     <div class="btnrow" style="margin-top:12px"><button class="btn red" id="wcorr">Korekti per la ruĝa plumo</button><button class="btn" id="wmodel">Vidi la modelan tekston</button><button class="btn" id="wdone"></button></div>
    </div>
    <aside class="side"><h4>Celoj de la tasko</h4><ul class="checklist" id="wtargets"></ul><p class="note" style="margin:0">As metas são contadas enquanto você escreve (algumas são estimativas). Marque à mão as de «kontrolu mem».</p><h4>Korekto en</h4><div class="seg" id="ailang" style="margin:0"><button data-l="pt" aria-pressed="${aiLang(u)==='pt'}">Portugala</button><button data-l="eo" aria-pressed="${aiLang(u)==='eo'}">Esperanto</button></div></aside>
   </div>
   <div id="wmodelbox" hidden><div class="model">${esc(W.model)}</div></div>
   <div id="wout"></div>`;
  const ta=$('#wtext');
  const manual=st.manual||{};
  function upd(){
    const t=ta.value; const n=t.trim()?t.trim().split(/\s+/).length:0;
    $('#wc').innerHTML=`<b>${n}</b> vortoj · celo ${W.words[0]}–${W.words[1]}${n>=W.words[0]?' <span class="mark ok">✓</span>':''}`;
    $('#wtargets').innerHTML=W.targets.map((tg,i)=>{
      if(tg.manual){ const on=!!manual[i]; return `<li class="${on?'on':''}"><span class="bx">${on?'✓':'○'}</span><label><input type="checkbox" data-m="${i}" ${on?'checked':''} hidden>${esc(tg.l)} <span class="note">(kontrolu mem)</span></label></li>`; }
      const ms=t.match(rx(tg.re))||[]; const cnt=tg.distinct?new Set(ms.map(x=>x.toLowerCase())).size:ms.length; const on=cnt>=tg.n;
      return `<li class="${on?'on':''}"><span class="bx">${on?'✓':'○'}</span><span>${esc(tg.l)} <span class="note">${cnt}/${tg.n}</span></span></li>`;
    }).join('');
    $('#wtargets').querySelectorAll('[data-m]').forEach(cb=>cb.addEventListener('change',()=>{ manual[cb.dataset.m]=cb.checked; persist(); upd(); }));
  }
  function persist(){ S.write[u.id]=Object.assign(S.write[u.id]||{},{text:ta.value,manual}); save(); }
  function doneBtn(){ const d=S.write[u.id]&&S.write[u.id].done; const b=$('#wdone'); b.textContent=d?'✓ Tasko farita':'Marki kiel farita'; b.classList.toggle('primary',!d); }
  ta.addEventListener('input',()=>{ upd(); persist(); });
  upd(); doneBtn();
  $('#ailang').querySelectorAll('button').forEach(b=>b.onclick=()=>{ S.aiLang=b.dataset.l; save(); $('#ailang').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.l===S.aiLang)); });
  $('#wdone').onclick=()=>{ persist(); S.write[u.id].done=!S.write[u.id].done; save(); doneBtn(); refreshProgress(u); };
  $('#wmodel').onclick=()=>{ const b=$('#wmodelbox'); b.hidden=!b.hidden; $('#wmodel').textContent=b.hidden?'Vidi la modelan tekston':'Kaŝi la modelan tekston'; };
  if(S.corr[u.id]) $('#wout').innerHTML=`<div class="ai-out"><div class="stamp">Konservita korekto</div>${md(S.corr[u.id])}</div>`;
  $('#wcorr').onclick=async()=>{
    const text=ta.value.trim(); const out=$('#wout');
    if(text.split(/\s+/).length<30){ out.innerHTML=`<div class="ai-out"><p>Skribu almenaŭ 30 vortojn antaŭ ol peti korekton.</p></div>`; return; }
    const prompt=corrPrompt(u,text);
    const btn=$('#wcorr'); btn.disabled=true;
    out.innerHTML=`<div class="ai-out"><div class="stamp">La instruisto legas…</div><div id="aibody"></div><div class="btnrow" style="margin-top:10px"><button class="btn" id="aistop">Halti</button></div></div>`;
    const sample=await getSample();
    if(!sample){
      out.innerHTML=`<div class="ai-out fallback"><p>A correção automática só funciona com esta página aberta dentro do Claude. Copie o pedido abaixo e cole numa conversa com o Claude: ele já contém o seu texto e as instruções.</p><textarea readonly id="fbtext">${esc(prompt)}</textarea><div class="btnrow" style="margin-top:8px"><button class="btn" id="fbcopy">Kopii la peton</button><span class="note" id="fbmsg"></span></div></div>`;
      $('#fbcopy').onclick=()=>{ const tx=$('#fbtext'); navigator.clipboard.writeText(tx.value).then(()=>$('#fbmsg').textContent='Kopiita.',()=>{ tx.select(); $('#fbmsg').textContent='Elektita: premu Ctrl+C / Cmd+C.'; }); };
      btn.disabled=false; return;
    }
    const ctl=new AbortController(); $('#aistop').onclick=()=>ctl.abort();
    try{
      const r=await sample(prompt,{cache:false,signal:ctl.signal,onText:({text})=>{ const b=$('#aibody'); if(b) b.innerHTML=md(text); }});
      S.corr[u.id]=r.text; save();
      out.querySelector('.stamp').textContent='Korektita ✓'; const s=$('#aistop'); s&&s.remove();
      if(r.truncated) out.querySelector('.ai-out').insertAdjacentHTML('beforeend','<p class="note">La respondo estis tranĉita. Provu iom pli mallongan tekston.</p>');
    }catch(e){
      const b=$('#aibody'); if(b) b.innerHTML=e.text?md(e.text):'';
      out.querySelector('.stamp').textContent = e.code==='cancelled'?'Korekto haltigita':errMsg(e);
      const s=$('#aistop'); s&&s.remove();
    }
    btn.disabled=false;
  };
}


/* ---------- FALSI AMICI ---------- */
let falsiMode='cards';
function renderFalsi(){
  let h=`<header class="uhead"><div class="eyebrow">Iloj · vortoj</div><h1 class="title">Falsaj amikoj</h1><p class="subtitle">Palavras que parecem portuguesas ou espanholas mas querem dizer outra coisa. Vire as cartas e depois teste-se no quiz.</p></header>
  <div class="seg" role="group"><button data-m="cards" aria-pressed="${falsiMode==='cards'}">Kartoj</button><button data-m="quiz" aria-pressed="${falsiMode==='quiz'}">Kvizo</button></div><div id="fbody"></div>`;
  $('#main').innerHTML=h;
  $('#main').querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ falsiMode=b.dataset.m; renderFalsi(); });
  const fb=$('#fbody');
  if(falsiMode==='cards'){
    fb.innerHTML=`<div class="fgrid">${FALSI.map((f,i)=>`<button class="flip" data-i="${i}" aria-label="${esc(f[0])}: turni la karton"><div class="in"><div class="f"><b>${esc(f[0])}</b><small>tuŝu por vidi la signifon</small></div><div class="b"><span class="m">${esc(f[1])}</span><span class="tr">≠ ${esc(f[2])}</span><span class="ex">${esc(f[3])}</span></div></div></button>`).join('')}</div>`;
    fb.querySelectorAll('.flip').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
  } else quizFalsi(fb);
}
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function quizFalsi(fb){
  const qs=shuffle(FALSI).slice(0,10).map(f=>{
    const opts=shuffle([f[1],...shuffle(FALSI.filter(x=>x!==f)).slice(0,3).map(x=>x[1])]);
    const q=[`Kion signifas «${f[0]}»?`,opts,opts.indexOf(f[1]),`Atentu: ${f[2]}. Ekz.: ${f[3]}`]; q.w=f[0]; return q;
  });
  fb.innerHTML=`<section class="card"><div class="card-h"><div><span class="lab">10 hazardaj demandoj</span><h3>Kvizo pri falsaj amikoj</h3></div><span class="score" id="fscore">${S.falsi.best?'rekordo '+S.falsi.best+'/10':''}</span></div><ol class="items" id="fq"></ol><div class="btnrow"><button class="btn primary" id="fnew">Nova kvizo</button></div></section>`;
  mcList($('#fq'),qs,(s,t)=>{ S.falsi.best=Math.max(S.falsi.best||0,s); save(); $('#fscore').textContent=s+'/'+t+' · rekordo '+S.falsi.best+'/10'; }, i=>['f-'+qs[i].w,'falso',{w:qs[i].w},'Falsaj amikoj']);
  $('#fnew').onclick=()=>quizFalsi(fb);
}