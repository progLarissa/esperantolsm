const UNITS = [], ORDER = {}, USPEAK = {};
const U = u => { UNITS.push(u); };
/* ───────── UNUO 1 ───────── */
U({
id:1, lvl:'A1', band:0,
title:'Saluton! Sonoj, la artikolo kaj -o, -a, -j',
sub:'Pronúncia, substantivos, adjetivos e o verbo estas · O esqueleto de tudo',
focus:'pronunciation (c, ĉ, ĝ, ĥ, ĵ, ŝ, ŭ, j), stress on the penultimate syllable, nouns in -o, adjectives in -a, plural -j and agreement, the article la (no indefinite article), estas, personal pronouns, ĉu questions and ne',
lesson:`
<p class="lead">O esperanto foi feito para ser aprendido depressa: <b>uma letra = um som</b>, sem exceções, e o acento cai <b>sempre na penúltima sílaba</b>. Para quem fala português e espanhol, metade do vocabulário já parece de casa.</p>
<h3>As letras que mudam</h3>
<div class="tw"><table class="tbl">
<tr><th>letra</th><th>som</th><th>como em</th><th>exemplo</th></tr>
<tr><td><b>c</b></td><td>ts</td><td>«tsunami», italiano «pizza»</td><td><i>paco</i> (paz), <i>celo</i> (objetivo)</td></tr>
<tr><td><b>ĉ</b></td><td>tch</td><td>«tchau»</td><td><i>ĉokolado</i>, <i>ĉu</i></td></tr>
<tr><td><b>ĝ</b></td><td>dj</td><td>«Djavan», o «di» carioca de «dia»</td><td><i>ĝardeno</i> (jardim)</td></tr>
<tr><td><b>ĥ</b></td><td>j espanhol, gutural</td><td>ES «jamón»</td><td><i>ĥoro</i> (coro)</td></tr>
<tr><td><b>j</b></td><td>i semivogal</td><td>«pai», ES «hoy»</td><td><i>jes</i> (sim), <i>kaj</i> (e)</td></tr>
<tr><td><b>ĵ</b></td><td>j português</td><td>«janela»</td><td><i>ĵurnalo</i> (jornal)</td></tr>
<tr><td><b>ŝ</b></td><td>x / ch</td><td>«chave»</td><td><i>ŝi</i> (ela)</td></tr>
<tr><td><b>ŭ</b></td><td>u semivogal</td><td>«mau», «Paulo»</td><td><i>aŭto</i>, <i>ankaŭ</i> (também)</td></tr>
<tr><td><b>g</b></td><td>sempre duro</td><td>«gato», mesmo antes de e/i</td><td><i>geografio</i> = «gue-o-gra-FI-o»</td></tr>
<tr><td><b>h</b></td><td>aspirado</td><td>inglês «house»</td><td><i>hejmo</i> (lar)</td></tr>
<tr><td><b>r</b></td><td>r simples, vibrado</td><td>«caro» (nunca o «rr» de «rato»)</td><td><i>rapida</i></td></tr>
<tr><td><b>s</b></td><td>sempre s, nunca z</td><td>«sapo»</td><td><i>kaso</i> (caixa) × <i>kazo</i> (caso)</td></tr>
</table></div>
<p>As vogais <b>a e i o u</b> nunca mudam e nunca ficam nasais: <i>en</i> se diz «én», não «ẽ»; <i>bona</i> se diz «BÔ-na», sem o «õ» de «bom».</p>
<p class="note">Digitar: escreva <b>cx gx hx jx sx ux</b> e o caderno transforma em <b>ĉ ĝ ĥ ĵ ŝ ŭ</b> enquanto você digita. É o «sistema x», usado por todos os esperantistas.</p>
<h3>O acento: penúltima, sempre</h3>
<p><i>es-pe-RAN-to</i>, <i>Bra-ZI-lo</i>, <i>KA-fo</i>. Como <b>i</b> e <b>u</b> são vogais plenas, <i>familio</i> tem quatro sílabas: <i>fa-mi-LI-o</i> (não «fa-MÍ-lia»). Do mesmo jeito: <i>bi-blio-TE-ko</i>? Não: <i>bi-bli-o-TE-ko</i>.</p>
<h3>Cada classe de palavra tem a sua terminação</h3>
<div class="tw"><table class="tbl">
<tr><th>-o</th><td>substantivo</td><td><i>libro, domo, amiko, urbo</i></td></tr>
<tr><th>-a</th><td>adjetivo</td><td><i>bela, granda, nova, facila</i></td></tr>
<tr><th>-j</th><td>plural (substantivo e adjetivo)</td><td><i>bela<b>j</b> libro<b>j</b></i>, <i>grandaj urboj</i></td></tr>
</table></div>
<p>O adjetivo concorda em número: <i>la nova libro</i>, <i>la nova<b>j</b> libro<b>j</b></i>. E não existe gênero gramatical: <i>la tablo, la seĝo, la urbo</i> são todos iguais.</p>
<h3>Um artigo só: la</h3>
<p><b>la</b> = o, a, os, as. Não muda nunca. E não há «um/uma»: <i>libro</i> = um livro, <i>la libro</i> = o livro. <i>Unu</i> é o número «um», não artigo.</p>
<h3>Pronomes e estas</h3>
<div class="tw"><table class="tbl">
<tr><td><b>mi</b> eu</td><td><b>vi</b> você / vocês</td><td><b>li</b> ele</td><td><b>ŝi</b> ela</td></tr>
<tr><td><b>ĝi</b> ele/ela (coisa, animal)</td><td><b>ni</b> nós</td><td><b>ili</b> eles, elas</td><td><b>oni</b> a gente, «se»</td></tr>
</table></div>
<p><b>estas</b> = é, está, são, estão, para todas as pessoas, e serve para <b>ser</b> e <b>estar</b>: <i>Mi estas Marina. Ni estas en Madrido. La kafo estas varma.</i> Também significa «há»: <i>En la parko estas multaj homoj.</i></p>
<h3>Perguntas e negação</h3>
<p><b>ĉu</b> no começo transforma a frase em pergunta de sim ou não: <i>Ĉu vi estas brazilanino?</i> — <i>Jes. / Ne.</i> E <b>ne</b> vem antes do que se nega: <i>Mi ne estas laca</i> (não estou cansada).</p>
<div class="trap"><span class="pen">Atenção, hispanófona!</span> <b>mi</b> = eu (em espanhol «mi» é «meu»: em esperanto, <i>mia</i>). <b>ni</b> = nós (não «nem»). E <b>vi</b> = você, não «eu vi».</div>
<div class="trap"><span class="pen">Atenção!</span> Pergunta só com entonação («Vi estas laca?») soa estrangeira. Use sempre <b>ĉu</b>.</div>
<div class="plus"><span class="pen">Vantagem</span> Você já viu como o português e o espanhol aparecem em toda parte: <i>bela, nova, granda, amiko, libro, familio</i>. Cerca de três quartos das raízes vêm de línguas românicas.</div>
`,
reading:{
title:'Saluton el Madrido!',
text:`<p>Saluton! Mi estas Marina, kaj mi estas brazilanino. Mi estas el Kuritibo, sed nun mi [[loĝas|moro]] en Madrido. Madrido estas granda kaj bela urbo. La stratoj estas plenaj de homoj, kaj la [[kafejoj|cafés (lugares)]] estas ĉiam [[malfermitaj|abertos]].</p>
<p>Mia domo ne estas granda. Ĝi estas malgranda, sed hela kaj [[komforta|confortável]]. En la [[kuirejo|cozinha]] estas tablo, kvar seĝoj kaj multaj libroj. Jes, libroj en la kuirejo! Mi ŝatas legi, [[dum|enquanto]] mi manĝas.</p>
<p>Mia amiko Paŭlo estas italo. Li estas instruisto, kaj li estas tre [[gaja|alegre]]. Ni ofte estas kune en la parko. Ĉu Paŭlo parolas Esperanton? Jes, kaj tre bone! Ni parolas Esperanton, [[ĉar|porque]] ĝi estas facila kaj [[neŭtrala|neutra]]: ĝi ne estas lia lingvo, kaj ĝi ne estas mia lingvo. Ĝi estas nia lingvo.</p>`,
q:[
["De kie estas Marina?",["El Madrido","El Kuritibo","El Italio","El Romo"],1,"«Mi estas el Kuritibo, sed nun mi loĝas en Madrido»."],
["Kia estas ŝia domo?",["Granda kaj malhela","Malgranda kaj hela","Granda kaj bela","Malnova kaj malgaja"],1,"mal- inverte o sentido: malgranda = pequeno."],
["Kio estas en la kuirejo?",["Lito kaj komputilo","Tablo, seĝoj kaj libroj","Nur tablo","Televidilo"],1],
["Kiu estas Paŭlo?",["Ŝia frato","Itala instruisto","Hispana kuiristo","Brazila studento"],1,"«Li estas instruisto» e «italo» = italiano."],
["Kial ili parolas Esperanton?",["Ĉar ĝi estas ilia gepatra lingvo","Ĉar ĝi estas facila kaj neŭtrala","Ĉar Paŭlo ne parolas la italan","Ĉar ili estas en Brazilo"],1,"«…ĉar ĝi estas facila kaj neŭtrala»."]
]},
ex:[
{t:'fill', title:'Kompletigu la frazojn', items:[
["La libroj estas ___. (nova)",["novaj"],"Adjetivo concorda com o plural: -aj."],
["Tie estas du ___. (seĝo)",["seĝoj"],"Plural: -j."],
["___ kafo estas varma. (o artigo)",["la"]],
["Ŝi estas ___. (brasileira)",["brazilanino"],"Brazilo → brazilano (brasileiro) → brazilanino (brasileira)."],
["___ estas mia amiko. (ele)",["li"]],
["___ vi estas laca? (pergunta de sim ou não)",["ĉu"]],
["Ni ___ estas en Brazilo. (negação)",["ne"]],
["La ___ estas grandaj. (domo, plural)",["domoj"]],
["Esperanto estas ___ lingvo. (fácil)",["facila"]],
["La knabinoj estas ___. (feliĉa)",["feliĉaj"]],
["___ estas en la parko. (nós)",["ni"]],
["La kato estas nigra; ___ dormas. (ele, para animal)",["ĝi"],"Para coisas e animais: ĝi."]
]},
{t:'mc', title:'Elektu la ĝustan respondon', items:[
["Onde cai o acento em «familio»?",["FA-mi-li-o","fa-MI-li-o","fa-mi-LI-o","fa-mi-li-O"],2,"Sempre na penúltima sílaba; o i é vogal plena."],
["Como soa o «c» de «paco»?",["k","s","ts","tch"],2],
["«Um livro» em esperanto é…",["unu libro","la libro","libro","an libro"],2,"Não existe artigo indefinido: libro = um livro."],
["«Mi» significa…",["meu","eu","mim","me"],1,"Em espanhol «mi» é «meu»; em esperanto, mi = eu."],
["Qual está certa?",["la belaj domoj","la bela domoj","la belaj domo","las belaj domoj"],0],
["Como soa «ĝardeno»?",["guar-DE-no","djar-DE-no","jar-DE-no","rar-DE-no"],1,"ĝ = dj."]
]},
{t:'fix', title:'Korektu la substrekitan parton', items:[
["Ŝi estas {unu instruistino}.",["instruistino"],"Ŝi estas instruistino."],
["La domoj estas {granda}.",["grandaj"],"La domoj estas grandaj."],
["{Las} libroj estas novaj.",["la"],"La libroj estas novaj."],
["{Vi estas} brazilano?",["ĉu vi estas"],"Ĉu vi estas brazilano?"],
["Ili estas {bona} amikoj.",["bonaj"],"Ili estas bonaj amikoj."]
]}
],
write:{
task:'Apresente-se em esperanto: quem você é, de onde é, onde mora, como é sua casa ou sua cidade e quem é um amigo seu.',
words:[50,80],
targets:[
{l:'5 vezes estas', re:'<estas>', n:5},
{l:'4 adjetivos em -a / -aj', re:'<(?!la>|kaj>|ja>)W{2,}aj?>', n:4},
{l:'1 pergunta com ĉu', re:'<ĉu>', n:1},
{l:'1 negação com ne', re:'<ne>', n:1}
],
model:`Saluton! Mi estas Larissa, kaj mi estas brazilanino. Mi estas el Rio-de-Ĵanejro, sed nun mi loĝas en Madrido. Mi estas programistino. Madrido estas granda kaj interesa urbo, kaj la homoj estas afablaj.

Mia domo ne estas granda, sed ĝi estas hela kaj trankvila. En la ĉambro estas multaj libroj: italaj, anglaj kaj nun ankaŭ esperantaj!

Mia amiko Tomás estas hispano. Li estas muzikisto, kaj li estas tre gaja. Ĉu li parolas Esperanton? Ne, ankoraŭ ne. Sed li estas scivolema!`
}
});
ORDER[1]=[
["Mi estas brazilanino el Kuritibo.",[]],
["Ĉu vi estas laca?",[]],
["La novaj libroj estas sur la tablo.",[]],
["Madrido estas granda kaj bela urbo.",["Madrido estas bela kaj granda urbo."]],
["Ni ne estas en la parko.",[]]
];
USPEAK[1]={p:['Kiu vi estas? (Diga seu nome, sua nacionalidade e sua cidade.)','Kia estas via urbo?','Kia estas via domo?','Kiu estas via plej bona amiko?','Ĉu vi estas laca hodiaŭ?'],v:['Esperanto pronunciation alphabet','Esperanto prononco alfabeto']};

/* ───────── UNUO 2 ───────── */
U({
id:2, lvl:'A1', band:0,
title:'Verboj: -as, -is, -os',
sub:'Presente, passado e futuro sem nenhum verbo irregular',
focus:'verb endings -as (present), -is (past), -os (future), -i (infinitive), -u (imperative), the same form for all persons, modal verbs voli, povi, devi and ŝati + infinitive, time words hodiaŭ, hieraŭ, morgaŭ, nun, ofte, ĉiam, neniam',
lesson:`
<p class="lead">Aqui o esperanto mostra por que é famoso: <b>não há nenhum verbo irregular</b>, nem «esti» (ser/estar). E a forma é a mesma para todas as pessoas: <i>mi lernas, vi lernas, ili lernas</i>.</p>
<h3>Seis terminações para tudo</h3>
<div class="tw"><table class="tbl">
<tr><th>-as</th><td>presente</td><td><i>mi lernas</i></td><td>aprendo, estou aprendendo</td></tr>
<tr><th>-is</th><td>passado</td><td><i>mi lernis</i></td><td>aprendi, aprendia, estava aprendendo</td></tr>
<tr><th>-os</th><td>futuro</td><td><i>mi lernos</i></td><td>aprenderei, vou aprender</td></tr>
<tr><th>-i</th><td>infinitivo</td><td><i>lerni</i></td><td>aprender</td></tr>
<tr><th>-u</th><td>imperativo</td><td><i>lernu!</i></td><td>aprenda!</td></tr>
<tr><th>-us</th><td>condicional</td><td><i>mi lernus</i></td><td>eu aprenderia (unidade 9)</td></tr>
</table></div>
<p><i>esti</i>: <i>estas, estis, estos</i>. <i>havi</i> (ter): <i>havas, havis, havos</i>. Sempre assim.</p>
<h3>Um passado só</h3>
<p>Não há diferença entre perfeito e imperfeito: <i>mi legis</i> = «li», «lia», «estava lendo». O contexto e palavras como <i>jam</i> (já), <i>ofte</i> (frequentemente) ou <i>ĉiam</i> (sempre) fazem o trabalho.</p>
<h3>Verbo + infinitivo</h3>
<p><i>Mi <b>volas</b> lerni</i> (quero aprender) · <i>Mi <b>povas</b> veni</i> (posso vir) · <i>Mi <b>devas</b> labori</i> (tenho que trabalhar) · <i>Mi <b>ŝatas</b> danci</i> (gosto de dançar).</p>
<div class="trap"><span class="pen">Atenção!</span> <b>ŝati</b> não leva preposição: «gosto <b>de</b> dançar» = <i>Mi ŝatas danci</i>, nunca <s>Mi ŝatas de danci</s>.</div>
<div class="trap"><span class="pen">Atenção!</span> «Estou lendo» é simplesmente <i>mi legas</i>. E «vou viajar» é <i>mi vojaĝos</i>: <s>mi iras vojaĝi</s> significaria «estou indo (a algum lugar) para viajar».</div>
<h3>O imperativo e o «por favor»</h3>
<p><i>Venu!</i> (venha!) · <i>Atendu!</i> (espere!) · <i>Ne timu!</i> (não tenha medo!). O jeito educado: <b>bonvolu</b> + infinitivo: <i>Bonvolu sidiĝi</i> (sente-se, por favor), ou <i>…mi petas</i> no fim.</p>
<h3>Palavras de tempo</h3>
<div class="chips">hieraŭ (ontem) · hodiaŭ (hoje) · morgaŭ (amanhã) · nun (agora) · poste (depois) · jam (já) · ankoraŭ (ainda) · ofte (frequentemente) · ĉiam (sempre) · neniam (nunca) · matene (de manhã) · vespere (à noite)</div>
<p class="note">Você vai ver um <b>-n</b> no fim de algumas palavras nas leituras (<i>mi trinkas kafon</i>). É o acusativo: é o assunto da próxima unidade.</p>
<div class="plus"><span class="pen">Vantagem</span> Em italiano você precisa decorar centenas de formas. Aqui são seis terminações, e você já sabe todas.</div>
`,
reading:{
title:'Hieraŭ, hodiaŭ, morgaŭ',
text:`<p>Hieraŭ estis dimanĉo, kaj mi ne laboris. Mi dormis ĝis la naŭa, poste mi [[promenis|passeei]] en la parko kun mia hundo. Posttagmeze mi telefonis al mia patrino en Brazilo. Ni parolis dum unu horo! Vespere mi kuiris [[fazeolojn|feijão]] kaj spektis filmon.</p>
<p>Hodiaŭ estas lundo. Mi kutime laboras en oficejo, sed hodiaŭ mi laboras hejme. Nun estas la deka, kaj mi trinkas mian duan kafon. Mi ne ŝatas [[kunvenojn|reuniões]] matene, sed hodiaŭ mi devas partopreni en tri!</p>
<p>Morgaŭ mi [[komencos|vou começar]] kurson de Esperanto. La kurso okazos ĉiun mardon en la biblioteko. Mi volas lerni rapide, ĉar en julio mi vojaĝos al Kroatio por granda kongreso. Tie mi parolos nur Esperanton. Ĉu mi povos? Mi esperas, ke jes!</p>`,
q:[
["Kion la rakontanto faris hieraŭ matene?",["Laboris","Dormis ĝis la naŭa kaj promenis","Kuiris fazeolojn","Iris al la biblioteko"],1],
["Kun kiu la rakontanto parolis telefone?",["Kun amiko","Kun la patrino","Kun la estro","Kun la instruisto"],1],
["Kie la rakontanto laboras hodiaŭ?",["En la oficejo","Hejme","En la biblioteko","En la parko"],1,"«…sed hodiaŭ mi laboras hejme»."],
["Kiam okazos la kurso?",["Ĉiun lundon","Ĉiun mardon","Ĉiun dimanĉon","En julio"],1],
["Kial la rakontanto volas lerni rapide?",["Ĉar en julio li vojaĝos al kongreso","Ĉar la kurso estas multekosta","Ĉar la patrino parolas Esperanton","Ĉar li laboras en Kroatio"],0]
]},
ex:[
{t:'fill', title:'Konjugaciu la verbojn', items:[
["Hieraŭ mi ___ en la parko. (promeni)",["promenis"]],
["Morgaŭ ni ___ al Romo. (vojaĝi)",["vojaĝos"]],
["Nun ŝi ___ libron. (legi)",["legas"]],
["Mi volas ___ Esperanton. (lerni)",["lerni"],"Depois de voli, povi, devi: infinitivo -i."],
["___ ĉi tie, mi petas! (atendi, imperativo)",["atendu"]],
["Hieraŭ ___ tre varme. (esti)",["estis"]],
["En la parko ___ multaj infanoj. (há, presente)",["estas"]],
["Ĉu vi ___ veni morgaŭ? (povi)",["povos","povas"]],
["Mi ne ___ fiŝon. (gostar)",["ŝatas"]],
["Ili ___ labori sabate. (dever)",["devas"]],
["Kion vi ___ hieraŭ vespere? (fari)",["faris"]],
["Post unu jaro mi ___ flue. (paroli)",["parolos"]]
]},
{t:'mc', title:'Elektu la ĝustan respondon', items:[
["«Eu estava lendo quando…» numa narração:",["mi estas leganta","mi legis","mi legos","mi legu"],1,"O -is cobre o perfeito e o imperfeito."],
["«Vou viajar amanhã» →",["Mi iras vojaĝi morgaŭ.","Mi vojaĝos morgaŭ.","Mi vojaĝis morgaŭ.","Mi vojaĝi morgaŭ."],1,"Futuro = -os."],
["A terminação -as serve para…",["todas as pessoas","só eu","só eles","depende do verbo"],0],
["«Sente-se, por favor» →",["Bonvolu sidiĝi.","Bonvolu sidiĝu.","Bone sidiĝi.","Mi petas sidiĝas."],0,"bonvolu + infinitivo."],
["«Gosto de dançar» →",["Mi ŝatas de danci.","Mi ŝatas danci.","Mi ŝatas dancas.","Mi ŝatas al danci."],1],
["O passado de «esti» é…",["esis","estis","estiis","estos"],1,"Nenhum verbo é irregular."]
]},
{t:'fix', title:'Korektu la substrekitan parton', items:[
["Hieraŭ mi {iros} al la kinejo.",["iris"],"Hieraŭ mi iris al la kinejo."],
["Mi volas {lernas} la italan.",["lerni"],"Mi volas lerni la italan."],
["Ŝi {ŝatas de} legi.",["ŝatas"],"Ŝi ŝatas legi."],
["Morgaŭ {mi iras manĝi} kun Paŭlo.",["mi manĝos"],"Morgaŭ mi manĝos kun Paŭlo."],
["Ili {estas laborantaj} nun.",["laboras"],"Ili laboras nun."]
]}
],
write:{
task:'Escreva um pequeno diário: o que você fez ontem, o que está fazendo hoje e o que vai fazer amanhã.',
words:[60,100],
targets:[
{l:'4 verbos no passado (-is)', re:'<W+is>', n:4},
{l:'3 verbos no presente (-as)', re:'<W{2,}as>', n:3},
{l:'3 verbos no futuro (-os)', re:'<W+os>', n:3},
{l:'1 voli / povi / devi / ŝati + infinitivo', re:'<(vol|pov|dev|ŝat)(as|is|os|us)\\s+W+i>', n:1}
],
model:`Hieraŭ estis sabato. Mi vekiĝis malfrue, kaj mi trinkis kafon sur la balkono. Poste mi iris al la merkato kun mia edzo, kaj ni aĉetis fruktojn. Vespere ni vizitis amikojn, kaj ni parolis ĝis noktomezo.

Hodiaŭ mi ne laboras. Nun mi sidas en la kuirejo kaj studas Esperanton. Mi lernas la verbojn: ili estas tre facilaj!

Morgaŭ mi devas labori, kaj mi havos tri kunvenojn. Vespere mi telefonos al mia patrino, kaj mi rakontos al ŝi pri mia nova kurso. Ŝi certe ridos.`
}
});
ORDER[2]=[
["Hieraŭ mi ne laboris.",[]],
["Morgaŭ ni vojaĝos al Romo.",["Ni vojaĝos al Romo morgaŭ."]],
["Ĉu vi volas trinki kafon?",[]],
["Bonvolu atendi ĉi tie.",[]],
["Nun ŝi legas en la biblioteko.",["Ŝi nun legas en la biblioteko."]]
];
USPEAK[2]={p:['Kion vi faris hieraŭ?','Kion vi faras ĉiutage matene?','Kion vi faros la venontan semajnfinon?','Kion vi volas lerni ĉi-jare?','Kion vi devas fari morgaŭ?'],v:['Esperanto verbs as is os','lernu Esperanto verboj']};

/* ───────── UNUO 3 ───────── */
U({
id:3, lvl:'A1', band:0,
title:'La akuzativo: -n',
sub:'Quem faz e quem recebe a ação · A letra que liberta a ordem das palavras',
focus:'accusative -n for the direct object (nouns, adjectives, pronouns, plural -jn), free word order, kiun/kion questions, verbs with and without a direct object (helpi iun, telefoni al iu), no -n after esti',
lesson:`
<p class="lead">O <b>-n</b> marca o objeto direto: quem ou o que recebe a ação. Graças a ele, a ordem das palavras é livre: <i>La hundo vidas la kato<b>n</b></i> e <i>La kato<b>n</b> vidas la hundo</i> dizem a mesma coisa: o cachorro vê o gato.</p>
<h3>Onde vai o -n</h3>
<div class="tw"><table class="tbl">
<tr><th>sujeito</th><th>objeto</th><th>exemplo</th></tr>
<tr><td>libro</td><td>libro<b>n</b></td><td><i>Mi legas libron.</i></td></tr>
<tr><td>nova libro</td><td>nova<b>n</b> libro<b>n</b></td><td><i>Mi aĉetis novan libron.</i></td></tr>
<tr><td>belaj floroj</td><td>bela<b>jn</b> floro<b>jn</b></td><td><i>Li donis al mi belajn florojn.</i></td></tr>
<tr><td>mi, vi, li, ŝi, ĝi, ni, ili</td><td>mi<b>n</b>, vi<b>n</b>, li<b>n</b>, ŝi<b>n</b>, ĝi<b>n</b>, ni<b>n</b>, ili<b>n</b></td><td><i>Mi amas vin.</i></td></tr>
</table></div>
<p>O português só faz isso com pronomes (eu → me, ele → o). O esperanto faz com tudo: substantivo, adjetivo e pronome concordam.</p>
<h3>Perguntas: kion e kiun</h3>
<p><i><b>Kion</b> vi volas?</i> (o que você quer?) · <i><b>Kiun</b> vi vidis?</i> (quem você viu?). Sem -n, <i>kio</i> e <i>kiu</i> perguntam pelo sujeito: <i>Kiu venis?</i> (quem veio?).</p>
<h3>Sem -n depois de esti</h3>
<p>Depois de <i>esti</i> e <i>fariĝi</i> (tornar-se) não há objeto, então não há -n: <i>Ŝi estas bona instruistino</i> (nunca <s>bonan instruistinon</s>).</p>
<div class="trap"><span class="pen">Atenção!</span> Muitos verbos que pedem preposição em português são diretos em esperanto: <i>Mi ŝatas kafo<b>n</b></i> (gosto <b>de</b> café), <i>Mi helpas mian frato<b>n</b></i> (ajudo meu irmão), <i>Mi atendas la buso<b>n</b></i> (espero o ônibus).</div>
<div class="trap"><span class="pen">Atenção, hispanófona!</span> Nada de «a pessoal»: «Vi a María» = <i>Mi vidis Maria<b>n</b></i>, nunca <s>Mi vidis al Maria</s>. Mas <i>telefoni <b>al</b> iu</i> (telefonar a alguém) usa preposição, e então não há -n.</div>
<p>Depois de preposição, regra geral, nada de -n: <i>kun mia amiko</i>, <i>en la domo</i>. (A exceção, o -n de direção, fica para a unidade 5.)</p>
<p>Nomes estrangeiros que não terminam em -o recebem o -n com hífen ou sem nada: <i>Mi vidis João-n</i> ou <i>Mi vidis s-ron João</i>.</p>
<div class="plus"><span class="pen">Para que serve</span> A ordem livre permite enfatizar: <i>Kafon mi ne trinkas, sed teon jes!</i> (café eu não tomo, mas chá sim!). Repare que números nunca levam -n: <i>Mi havas tri katojn.</i></div>
`,
reading:{
title:'La perdita ŝlosilo',
text:`<p>Ĉi-matene mi ne trovis mian [[ŝlosilon|chave]]. Mi serĉis ĝin en la kuirejo, sub la lito kaj en ĉiuj [[poŝoj|bolsos (de roupa)]]. Nenio! Mi telefonis al mia fratino: «Ĉu vi vidis mian ŝlosilon?» Ŝi respondis: «Ne, mi ne vidis ĝin. Ĉu vi rigardis en via [[mansako|bolsa]]?»</p>
<p>Mi rigardis. En la mansako mi trovis du [[plumojn|canetas]], malnovan [[bileton|bilhete, ingresso]], tri bombonojn kaj foton de mia avino. Sed la ŝlosilon mi ne trovis.</p>
<p>Fine mi vokis la [[najbaron|vizinho]], sinjoron Petron. Li estas maljuna kaj tre afabla, kaj li havas kopion de mia ŝlosilo. Li donis al mi la kopion kaj diris: «Ankaŭ mi ĉiam perdas ĉion. Hieraŭ mi serĉis miajn [[okulvitrojn|óculos]] dum unu horo… kaj ili estis sur mia nazo!» Ni ridis longe. Vespere mi trovis la ŝlosilon: ĝi estis en la [[fridujo|geladeira]], apud la butero.</p>`,
q:[
["Kion la rakontanto ne trovis matene?",["La mansakon","La ŝlosilon","La telefonon","La okulvitrojn"],1],
["Kion la rakontanto trovis en la mansako?",["La ŝlosilon","Plumojn, bileton, bombonojn kaj foton","Nur foton","Kopion de la ŝlosilo"],1],
["Kiu havas kopion de la ŝlosilo?",["La fratino","La avino","La najbaro","Neniu"],2],
["Kie estis la okulvitroj de sinjoro Petro?",["Sur lia nazo","En la fridujo","Sub la lito","En la kuirejo"],0],
["En «Mi serĉis ĝin», kio estas «ĝin»?",["la kuirejo","la ŝlosilo","la fratino","la mansako"],1,"ĝin = acusativo de ĝi; refere-se à chave."]
]},
ex:[
{t:'fill', title:'Aldonu la akuzativon kiam necese', items:[
["Mi trinkas ___ ĉiumatene. (kafo)",["kafon"]],
["Ŝi aĉetis ___ ___. (nova aŭto)",[["novan"],["aŭton"]],"Adjetivo e substantivo recebem o -n."],
["Ĉu vi vidis ___? (li)",["lin"]],
["Ni amas ___ ___. (niaj infanoj)",[["niajn"],["infanojn"]],"Plural + acusativo: -jn."],
["La instruisto helpas ___. (ni)",["nin"],"helpi é direto: helpi iun."],
["___ vi volas manĝi? (O que)",["kion"]],
["___ vi renkontis en la festo? (Quem)",["kiun"]],
["Ŝi estas ___ kuracistino. (bona)",["bona"],"Depois de estas: sem -n."],
["Mi skribis ___ al mia amiko. (letero)",["leteron"]],
["Ili havas ___ ___. (tri katoj)",[["tri"],["katojn"]],"Números não levam -n."],
["Mi telefonis ___ Marta. (a)",["al"],"telefoni al iu: com preposição e sem -n."],
["Ŝi ŝatas ___ ___. (grandaj hundoj)",[["grandajn"],["hundojn"]]]
]},
{t:'mc', title:'Elektu la ĝustan respondon', items:[
["«La katon vidas la hundo» significa…",["O gato vê o cachorro.","O cachorro vê o gato.","Os dois se veem.","Está errado."],1,"Quem tem -n é o objeto, esteja onde estiver."],
["«Eu te amo» →",["Mi amas vi.","Mi amas vin.","Mi amas al vi.","Min amas vi."],1],
["«Gosto de chocolate» →",["Mi ŝatas de ĉokolado.","Mi ŝatas ĉokoladon.","Mi ŝatas al ĉokolado.","Mi ŝatas ĉokolado."],1],
["«Ela é uma boa amiga» →",["Ŝi estas bonan amikinon.","Ŝi estas bona amikino.","Ŝi estas bonajn amikinon.","Ŝi estas bona amikinon."],1],
["«Vi a Maria» →",["Mi vidis al Maria.","Mi vidis Marian.","Mi vidis Maria.","Mi vidis de Maria."],1,"Sem o «a» pessoal do espanhol."],
["Plural + acusativo:",["belajn florojn","belaj florojn","belan florojn","belajn floroj"],0]
]},
{t:'fix', title:'Korektu la substrekitan parton', items:[
["Ŝi legas {libro}.",["libron"],"Ŝi legas libron."],
["Mi vidis {li} hieraŭ.",["lin"],"Mi vidis lin hieraŭ."],
["Ni aĉetis {bela domon}.",["belan domon"],"Ni aĉetis belan domon."],
["La kafo estas {varman}.",["varma"],"La kafo estas varma."],
["Mi helpis {al mia frato}.",["mian fraton"],"Mi helpis mian fraton."]
]}
],
write:{
task:'Conte o que você comprou, comeu e viu na última semana, e quem você encontrou.',
words:[60,100],
targets:[
{l:'8 palavras com -n (acusativo)', re:'<W+[oa]j?n>', n:8},
{l:'2 pronomes no acusativo (min, vin, lin, ŝin, ĝin, nin, ilin)', re:'<(min|vin|lin|ŝin|ĝin|nin|ilin|sin)>', n:2},
{l:'1 pergunta com kion ou kiun', re:'<(kion|kiun|kiujn)>', n:1},
{l:'1 frase com estas + adjetivo, sem -n', manual:true}
],
model:`Lastan semajnon mi aĉetis novan telefonon, ĉar la malnova falis en la akvon. La nova telefono estas bela, sed tre multekosta!

Merkredon mi renkontis mian amikinon Carla en kafejo. Ŝi trinkis grandan kafon, kaj mi mendis teon kaj kukon. Ŝi montris al mi fotojn de sia vojaĝo al Japanio. Mi trovis ilin belegaj. Poste ŝi invitis min al sia naskiĝtago.

Sabaton ni vidis filmon en la kinejo. La filmo estis longa, sed interesa. Kaj vi? Kion vi faris lastan semajnon? Kiun vi renkontis?`
}
});
ORDER[3]=[
["Mi serĉis mian ŝlosilon en la kuirejo.",["En la kuirejo mi serĉis mian ŝlosilon."]],
["Kion vi volas trinki?",[]],
["Ŝi aĉetis novajn ŝuojn hieraŭ.",["Hieraŭ ŝi aĉetis novajn ŝuojn."]],
["Ĉu vi vidis la novan filmon?",[]],
["La najbaro donis al mi la kopion.",[]]
];
USPEAK[3]={p:['Kion vi manĝis hieraŭ?','Kion vi ŝatas fari dimanĉe?','Kiun vi vidas ĉiutage?','Kion vi aĉetis lastatempe?','Kion vi neniam trinkas?'],v:['Esperanto akuzativo','Esperanto accusative n explained']};

/* ───────── UNUO 4 ───────── */
U({
id:4, lvl:'A1', band:0,
title:'Mia, via, nombroj kaj la horo',
sub:'Possessivos, números, horas e datas · Falar da própria vida',
focus:'possessives mia, via, lia, ŝia, ĝia, nia, ilia with -j and -n agreement, numbers unu–mil, ordinals in -a, telling the time (Kioma horo estas? Estas la tria; je la oka), days and months in lower case, adverbs of time lunde, dates (la 15-a de decembro; la 3-an de majo)',
lesson:`
<h3>Possessivos = pronome + a</h3>
<p><i>mi → mia</i> (meu), <i>vi → via</i> (teu, seu), <i>li → lia</i> (dele), <i>ŝi → ŝia</i> (dela), <i>ni → nia</i>, <i>ili → ilia</i> (deles). Como são adjetivos, recebem <b>-j</b> e <b>-n</b>:</p>
<div class="chips">mia libro · miaj libroj · Mi legas mian libron · Mi legas miajn librojn</div>
<div class="trap"><span class="pen">Atenção!</span> Sem artigo: «o meu carro» = <i>mia aŭto</i>, nunca <s>la mia aŭto</s>. E <i>lia</i> / <i>ŝia</i> resolvem a ambiguidade do «seu» português: <i>lia domo</i> (a casa dele), <i>ŝia domo</i> (a casa dela).</div>
<h3>Os números</h3>
<div class="tw"><table class="tbl c">
<tr><td>1 unu</td><td>2 du</td><td>3 tri</td><td>4 kvar</td><td>5 kvin</td></tr>
<tr><td>6 ses</td><td>7 sep</td><td>8 ok</td><td>9 naŭ</td><td>10 dek</td></tr>
<tr><td>11 dek unu</td><td>20 dudek</td><td>23 dudek tri</td><td>100 cent</td><td>300 tricent</td></tr>
<tr><td>1000 mil</td><td>2026 du mil dudek ses</td><td colspan="3">1887 mil okcent okdek sep</td></tr>
</table></div>
<p>É só somar e multiplicar: <i>du-dek</i> = 2 × 10. Os números não mudam nunca: <i>tri katoj, tri katojn</i>.</p>
<p><b>Ordinais</b> com <b>-a</b>: <i>unua</i> (primeiro), <i>dua</i>, <i>tria</i>, <i>deka</i>, <i>dudeka</i>. E a idade: <i>Mi havas tridek jarojn</i> ou <i>Mi estas tridekjara</i>.</p>
<h3>Que horas são?</h3>
<div class="tw"><table class="tbl">
<tr><td><i>Kioma horo estas?</i></td><td>Que horas são?</td></tr>
<tr><td><i>Estas la tria.</i></td><td>São três horas (literalmente «a terceira»).</td></tr>
<tr><td><i>la tria kaj kvarono</i> · <i>la tria kaj duono</i></td><td>3:15 · 3:30</td></tr>
<tr><td><i>la tria kaj dek</i> · <i>kvarono antaŭ la kvara</i></td><td>3:10 · 3:45</td></tr>
<tr><td><i><b>je</b> la oka</i></td><td>às oito</td></tr>
</table></div>
<div class="trap"><span class="pen">Atenção!</span> «Às oito» é <i><b>je</b> la oka</i>, nunca <s>al la oka</s>. <i>Je</i> é a preposição curinga: horas, e quando nenhuma outra serve.</div>
<h3>Dias, meses e datas</h3>
<p><i>lundo, mardo, merkredo, ĵaŭdo, vendredo, sabato, dimanĉo</i> · <i>januaro, februaro, marto, aprilo, majo, junio, julio, aŭgusto, septembro, oktobro, novembro, decembro</i>. Tudo com <b>minúscula</b>.</p>
<p>Com <b>-e</b> viram advérbios: <i>lunde</i> = na segunda / às segundas; <i>vendrede vespere</i> = sexta à noite.</p>
<p>Datas: <i>Hodiaŭ estas la dek-kvina de decembro</i> (dia 15). Para dizer <b>quando</b>, o -n: <i>Mi naskiĝis la trian de majo</i> (nasci no dia 3 de maio); por escrito, <i>la 3-an de majo</i>.</p>
<div class="plus"><span class="pen">Para lembrar</span> O dia 15 de dezembro (<i>la 15-a de decembro</i>) é o Dia de Zamenhof, o criador do esperanto, a festa do «Esperantujo» (o mundo do esperanto). Muitos clubes fazem um encontro nesse dia.</div>
`,
reading:{
title:'Mia familio kaj mia semajno',
text:`<p>Mia familio ne estas granda. Mia patro havas sesdek du jarojn, kaj mia patrino havas sesdek. Ili loĝas en San-Paŭlo, en malgranda apartamento kun du katoj. Mia frato Rafael kaj lia edzino Júlia loĝas en Porto-Alegro. Iliaj infanoj estas tre amuzaj: ilia filino estas sepjara, kaj ilia filo nur trijara.</p>
<p>Mia semajno estas tre plena. Lunde kaj merkrede mi laboras ĝis la sesa. Marde mi havas kurson de la itala je la sepa kaj duono. Ĵaŭde mi iras al la [[naĝejo|piscina]]. Vendrede vespere mi telefonas al miaj gepatroj — ili ĉiam demandas, kiam mi venos al Brazilo!</p>
<p>Ĉi-jare mi vizitos ilin en decembro. Mia [[flugo|voo]] foriros la dudekan de decembro, je la dek-unua kaj kvarono matene, kaj alvenos en San-Paŭlo je la sesa vespere. La dudek-kvinan ni ĉiuj kune festos Kristnaskon: dek du personoj, unu granda tablo kaj tro da manĝaĵo!</p>`,
q:[
["Kiom da jaroj havas la patro?",["Sesdek","Sesdek du","Sep","Dudek du"],1],
["Kiu loĝas en Porto-Alegro?",["La gepatroj","La frato kaj lia familio","La rakontanto","La katoj"],1],
["Kiam estas la kurso de la itala?",["Lunde je la sesa","Marde je la sepa kaj duono","Ĵaŭde je la sepa","Vendrede vespere"],1],
["Je kioma horo foriros la flugo?",["11:15","10:45","6:00","12:15"],0,"«la dek-unua kaj kvarono» = 11:15."],
["Kiom da personoj festos Kristnaskon kune?",["Dek","Dek du","Dudek","Kvin"],1]
]},
ex:[
{t:'fill', title:'Posedaj pronomoj, nombroj kaj horoj', items:[
["___ fratino loĝas en Romo. (minha)",["mia"]],
["Ĉu vi vidis ___ ___? (meus óculos: mia okulvitroj)",[["miajn"],["okulvitrojn"]]],
["Mi konas ___ ___. (o irmão dela: ŝia frato)",[["ŝian"],["fraton"]]],
["Kioma horo estas? Estas la ___. (3:00)",["tria"]],
["La kurso komenciĝas ___ la oka. (às)",["je"]],
["Estas la tria kaj ___. (3:30)",["duono"]],
["12 = ___",["dek du"]],
["45 = ___",["kvardek kvin"]],
["Hodiaŭ estas la ___ de decembro. (dia 15)",["dek-kvina","dekkvina","15-a"]],
["Mi naskiĝis ___ 3-an de majo.",["la"]],
["Ŝi estas mia ___ instruistino. (primeira)",["unua"]],
["Ni laboras ___. (às segundas)",["lunde"]],
["1987 = ___ (por extenso)",["mil naŭcent okdek sep"]]
]},
{t:'mc', title:'Elektu la ĝustan respondon', items:[
["«O meu carro» →",["la mia aŭto","mia aŭto","la aŭto mia","mian aŭton"],1],
["«3:15» →",["la tria kaj kvarono","la tria kaj duono","kvarono antaŭ la tria","la dek-kvina"],0],
["«Às sete» →",["al la sepa","je la sepa","en la sepa","de la sepa"],1],
["Os dias da semana se escrevem…",["com maiúscula","com minúscula","com hífen","depende"],1],
["«Vendrede» significa…",["sexta-feira (o dia)","na sexta / às sextas","na próxima sexta","todas as semanas"],1,"-e transforma em advérbio de tempo."],
["«Convidei meus amigos» →",["Mi invitis miaj amikoj.","Mi invitis mian amikojn.","Mi invitis miajn amikojn.","Mi invitis mia amikojn."],2]
]},
{t:'fix', title:'Korektu la substrekitan parton', items:[
["{La mia} patrino estas instruistino.",["mia"],"Mia patrino estas instruistino."],
["Mi vidis {mia} fratinon.",["mian"],"Mi vidis mian fratinon."],
["La koncerto estas {al la oka}.",["je la oka"],"La koncerto estas je la oka."],
["Ŝi havas {trijn} katojn.",["tri"],"Ŝi havas tri katojn."],
["Hodiaŭ estas {Lundo}.",["lundo"],"Hodiaŭ estas lundo."]
]}
],
write:{
task:'Descreva sua família e a sua semana: idades, onde as pessoas moram, o que você faz em cada dia e a que horas.',
words:[70,110],
targets:[
{l:'5 possessivos (mia, via, lia, ŝia, nia, ilia…)', re:'<(mi|vi|li|ŝi|ĝi|ni|ili|si)aj?n?>', n:5},
{l:'3 números por extenso', re:'<(unu|du|tri|kvar|kvin|ses|sep|ok|naŭ|dek|cent|mil|dudek|tridek|kvardek|kvindek|sesdek|sepdek|okdek|naŭdek)>', n:3},
{l:'2 horas com je la…', re:'<je la (W|-)+a>', n:2},
{l:'2 dias da semana com -e (lunde, marde…)', re:'<(lunde|marde|merkrede|ĵaŭde|vendrede|sabate|dimanĉe)>', n:2}
],
model:`Mia familio loĝas en Brazilo. Mia patrino havas sesdek kvin jarojn, kaj ŝi estas tre aktiva. Mia patro havas sesdek ok jarojn. Mia fratino loĝas en Kuritibo kun sia edzo. Ilia filo estas dekjara, kaj li ŝatas futbalon.

Mia semajno estas plena. Lunde kaj merkrede mi laboras en la oficejo ĝis la sesa. Marde kaj ĵaŭde mi havas kurson de la itala je la sepa. Vendrede mi laboras hejme, kaj vespere mi vidas filmon. Sabate mi dormas ĝis la naŭa! Dimanĉe je la dek-unua mi telefonas al miaj gepatroj.`
}
});
ORDER[4]=[
["Mia frato havas du infanojn.",[]],
["Kioma horo estas nun?",[]],
["La kurso komenciĝas je la sepa kaj duono.",["Je la sepa kaj duono la kurso komenciĝas."]],
["Mi naskiĝis la trian de majo.",[]],
["Vendrede mi telefonas al miaj gepatroj.",["Mi telefonas al miaj gepatroj vendrede."]]
];
USPEAK[4]={p:['Kiom da personoj estas en via familio?','Kion vi faras lunde?','Je kioma horo vi kutime vekiĝas?','Kiam estas via naskiĝtago?','Kiu estas via plej ŝatata tago de la semajno, kaj kial?'],v:['Esperanto numbers nombroj','Esperanto kioma horo estas']};
