/* ───────── TESTOJ: legado (5) + malferma kompletigo (8) + plurelekta (7) = 20 ───────── */
const TESTS = [
{id:1, units:[1,4], lvl:'A1', title:'Testo A1',
reading:{title:'La nova najbaro',
text:`<p>Mia nova najbaro estas juna viro el Ganao. Li nomiĝas Kwame, kaj li havas dudek ok jarojn. Li estas kuiristo en restoracio apud la stacidomo. Li loĝas sola, sed li havas grandan hundon, Bobi.</p>
<p>Ĉiumatene je la sepa Kwame promenas kun Bobi en la parko. Mi ofte vidas ilin de mia fenestro. Lundon mi renkontis ilin en la lifto, kaj ni parolis iomete. Li parolas la anglan, la francan kaj iom da Esperanto!</p>
<p>Sabaton li invitis min al sia hejmo. Li kuiris fiŝon kun rizo kaj tomatoj. Mi alportis brazilan kukon. Ni manĝis, ridis kaj parolis ĝis la dek-unua. Nun ni estas amikoj.</p>`,
q:[
["De kie estas Kwame?",["El Brazilo","El Ganao","El Francio","El Anglio"],1],
["Kion li faras?",["Li estas instruisto","Li estas kuiristo","Li estas studento","Li laboras en la stacidomo"],1],
["Kiam li promenas kun la hundo?",["Vespere","Je la sepa matene","Sabate","Je la dek-unua"],1],
["Kie ili parolis la unuan fojon?",["En la parko","En la lifto","En la restoracio","En lia hejmo"],1],
["Kion alportis la rakontanto?",["Fiŝon","Rizon","Brazilan kukon","Tomatojn"],2]
]},
cloze:{title:'Mia unua leciono',
text:`Hieraŭ mi [1] (iri) al mia unua leciono de Esperanto. La instruistino estas tre afabla, kaj ŝi parolas malrapide. En la klaso estas dek [2] (lernanto). Ni lernis la alfabeton kaj la nombrojn. Poste ni skribis mallongan tekston pri [3] (nia) familioj. Mi skribis pri mia frato, [4] (li) mi tre amas. La leciono finiĝis [5] la oka kaj duono. Morgaŭ mi [6] (legi) la unuan ĉapitron de la lernolibro. [7] vi volas veni kun mi la venontan semajnon? La kurso [8] (ne) kostas multe!`,
a:[["iris"],["lernantoj"],["niaj"],["lin"],["je"],["legos"],["ĉu"],["ne"]]},
mc:[
["Mi ___ brazilanino.",["estas","estis la","esti","estos la"],0],
["La domoj estas ___.",["granda","grandaj","grandan","grandajn"],1],
["Mi trinkas ___ ĉiumatene.",["kafo","kafon","kafoj","la kafo"],1],
["Hieraŭ ni ___ filmon.",["vidas","vidos","vidis","vidi"],2],
["Kioma horo estas? Estas ___ tria.",["je la","la","al la","unu"],1],
["Ŝi ___ legi.",["ŝatas de","ŝatas","ŝatas al","ŝatis de"],1],
["Mi vidis ___ fratinon en la parko.",["mia","mian","miajn","la mia"],1]
]},
{id:2, units:[5,8], lvl:'A2', title:'Testo A2',
reading:{title:'Semajnfino en Brugo',
text:`<p>Lastan monaton mi pasigis semajnfinon en Brugo, malgranda belga urbo, ĉe esperantista familio, kiun mi trovis per Pasporta Servo. Miaj gastigantoj, Pieter kaj Anke, loĝas en malnova domo apud kanalo. Ilia filino Lotte estas dekjara kaj parolas Esperanton denaske: ŝi lernis ĝin de siaj gepatroj, kiuj renkontiĝis en junulara kongreso.</p>
<p>Sabate matene Lotte gvidis min tra la urbo. Ŝi montris al mi la plej malnovajn pontojn kaj la placon, kie oni vendas la plej bonan ĉokoladon de la lando. «Ĉi tie la ĉokolado estas pli bona ol en Bruselo», ŝi diris serioze. Mi aĉetis kilogramon da ĝi por mia familio.</p>
<p>Vespere ni ĉiuj kuiris kune. Anke preparis fiŝan supon, kaj mi faris brigadeirojn. Lotte manĝis dek du! Dimanĉe pluvis la tutan tagon, do ni restis hejme, ludante kartojn kaj aŭskultante muzikon. Mi neniam forgesos tiun semajnfinon.</p>`,
q:[
["Kiel la rakontanto trovis la familion?",["Per hotelo","Per Pasporta Servo","Per la lernejo","Per la universitato"],1],
["Kial Lotte parolas Esperanton denaske?",["Ŝi lernis ĝin en la lernejo","Ŝiaj gepatroj parolas ĝin hejme","Ŝi loĝis en Brazilo","Ŝi lernis ĝin en kongreso"],1],
["Kion Lotte diris pri la ĉokolado?",["Ke ĝi estas tro multekosta","Ke ĝi estas pli bona ol en Bruselo","Ke ŝi ne ŝatas ĉokoladon","Ke ĝi venas el Brazilo"],1],
["Kion faris la rakontanto vespere?",["Fiŝan supon","Brigadeirojn","Ĉokoladon","Nenion"],1],
["Kial ili restis hejme dimanĉe?",["Ĉar ili estis lacaj","Ĉar pluvis","Ĉar la vendejoj estis fermitaj","Ĉar Lotte estis malsana"],1]
]},
cloze:{title:'Letero al amikino',
text:`Kara Lia, dankon [1] via longa letero! Mi nun loĝas en Valencio, en dometo apud la maro. Ĉiumatene mi [2] (veki + -iĝ-, presente) je la sepa kaj iras al la plaĝo. La akvo estas pli varma [3] en Rio, ĉu vi kredas? Mia nova laboro komenciĝos post du semajnoj. Ĝis tiam mi havas multe [4] tempo. Hieraŭ mi renkontis virinon, [5] parolas Esperanton! Ŝi invitis min al la loka klubo. Mi diris, ke mi [6] (iri) kun plezuro. Ĉu vi volas viziti min en aŭgusto? Vi povos dormi en la ĉambro, kie mi nun [7] (labori). Ĉi tie mi faras [8] (nenio) dum la vesperoj: perfekta vivo!`,
a:[["pro"],["vekiĝas"],["ol"],["da"],["kiu"],["iros"],["laboras"],["nenion"]]},
mc:[
["Dankon ___ la donaco!",["por","pro","per","de"],1],
["La kato kuris ___.",["en la ĝardeno","en la ĝardenon","al en la ĝardeno","en ĝardeno la"],1],
["Mi vidis ___ en la strato.",["neniu","neniun","ne neniun","nenion homon"],1],
["Ŝi estas pli alta ___ mi.",["ke","kiel","ol","de"],2],
["La filmo ___ je la naŭa.",["finis","finiĝis","finigis","fino"],1],
["Paŭlo telefonis al ___ patrino (la propra).",["lia","sia","ŝia","lian"],1],
["Persono, kiu programas, estas ___.",["programilo","programejo","programisto","programaĵo"],2]
]},
{id:3, units:[9,12], lvl:'B1', title:'Testo B1',
reading:{title:'La biblioteko, kiu neniam fermiĝas',
text:`<p>En malgranda germana urbo troviĝas unu el la plej grandaj bibliotekoj de Esperanto en la mondo. Ĝi estas prizorgata de volontuloj, kiuj ricevas librojn el ĉiuj kontinentoj: romanojn, poemarojn, lernolibrojn, eĉ revuojn de la 19-a jarcento. Multaj el tiuj libroj estis donacitaj de familioj de forpasintaj esperantistoj, kiuj ne volis, ke la kolekto de siaj gepatroj perdiĝu.</p>
<p>La bibliotekistino, kiu laboras tie de dek jaroj, rakontis al ni, ke ŝi ricevas ĉirkaŭ ducent pakaĵojn jare. «Kelkfoje mi malfermas skatolon kaj trovas leterojn skribitajn antaŭ cent jaroj, kun la samaj eraroj, kiujn faras niaj lernantoj hodiaŭ», ŝi diris ridante. «Tio montras, ke la lingvo vere ne ŝanĝiĝis.»</p>
<p>La plej granda defio ne estas la spaco, sed la tempo: necesas katalogi ĉion, por ke esploristoj povu trovi la librojn. Tial la teamo komencis skani la plej malnovajn tekstojn kaj publikigi ilin rete. Se la projekto sukcesos, iu ajn, en iu ajn lando, povos legi ilin senpage. «Biblioteko, kiu neniam fermiĝas», kiel diras la volontuloj.</p>`,
q:[
["Kiu prizorgas la bibliotekon?",["La urbestro","Volontuloj","Universitato","La registaro"],1],
["De kie venas multaj libroj?",["El vendejoj","El familioj de forpasintaj esperantistoj","El aliaj bibliotekoj","El la lernejoj"],1],
["Kion montras, laŭ la bibliotekistino, la malnovaj leteroj?",["Ke la lingvo multe ŝanĝiĝis","Ke la lingvo vere ne ŝanĝiĝis","Ke oni skribis pli bone antaŭe","Ke la lernantoj ne faras erarojn"],1],
["Kio estas la plej granda defio?",["La spaco","La mono","La tempo por katalogi ĉion","Trovi volontulojn"],2],
["Kion signifas «biblioteko, kiu neniam fermiĝas»?",["Ĝi estas malfermita nokte","La tekstoj estos legeblaj rete, ĉiam","Ĝi havas multajn pordojn","Ĝi neniam ricevas librojn"],1]
]},
cloze:{title:'Konsilo al komencanto',
text:`Se mi [1] (povi) rekomenci, mi lernus Esperanton multe pli frue. Mia konsilo estas simpla: parolu ekde la unua tago. Ne atendu, ĝis vi [2] (koni) ĉiujn regulojn! [3] (legi, gerúndio) facilajn tekstojn, vi lernos la vortojn nature. Mi petas, ke vi [4] (skribi) al mi post unu monato. Mia unua instruisto diris, ke la lingvo [5] (esti) facila, kaj li pravis. La libro «Gerda malaperis!» estas tre [6] (legi + -ind-) por komencantoj. Ĝi estis verkita [7] Claude Piron. Kaj memoru: [8] la plej bonaj parolantoj iam estis komencantoj.`,
a:[["povus"],["konos"],["legante"],["skribu"],["estas"],["leginda"],["de"],["eĉ"]]},
mc:[
["Se mi ___ riĉa, mi vojaĝus.",["estas","estos","estus","estu"],2],
["Mi volas, ke vi ___ al mi.",["telefonas","telefonos","telefonu","telefonus"],2],
["___ la laboron, ŝi iris hejmen.",["Fininta","Fininte","Finanta","Finita"],1],
["La pordo estas ___; ni ne povas eniri.",["fermanta","fermita","ferminta","fermo"],1],
["Ĉi tie ___ parolas la portugalan.",["si","oni","ili oni","oni si"],1],
["Li diris, ke li ___ morgaŭ.",["venus","venos","venis","venu"],1],
["Ŝi demandis, ___ mi estas laca.",["se","ke","ĉu","kiu"],2]
]}
];

/* ───────── VORTARO LAŬ TEMOJ: {t, lvl, w:[[eo, pt, ekzemplo]]} ───────── */
const LESSICO = [
{t:'Saluti kaj ĝentileco', lvl:'A1', w:[
["Saluton!","Oi! Olá!","Saluton, kiel vi fartas?"],["Bonan matenon!","Bom dia!","Bonan matenon, kara!"],["Bonan tagon!","Bom dia! Boa tarde!","Bonan tagon, sinjorino."],["Bonan vesperon!","Boa noite! (chegando)","Bonan vesperon al ĉiuj."],["Bonan nokton!","Boa noite! (dormir)","Bonan nokton, dormu bone."],
["Ĝis revido!","Até logo!","Ĝis revido, kaj dankon!"],["Ĝis!","Tchau!","Ĝis morgaŭ!"],["Kiel vi fartas?","Como vai?","Kiel vi fartas hodiaŭ?"],["Mi fartas bone.","Estou bem.","Mi fartas bone, dankon."],["Dankon!","Obrigada!","Dankon pro ĉio!"],
["Ne dankinde.","De nada.","— Dankon! — Ne dankinde."],["Mi petas.","Por favor.","Kafon, mi petas."],["Bonvolu…","Por favor, queira…","Bonvolu sidiĝi."],["Pardonu!","Desculpe!","Pardonu, kie estas la stacidomo?"],["Bonvenon!","Bem-vindo(a)!","Bonvenon al nia klubo!"],
["Mi nomiĝas…","Eu me chamo…","Mi nomiĝas Larissa."],["Estas plezuro.","É um prazer.","Estas plezuro koni vin."],["sinjoro, sinjorino","senhor, senhora","Sinjorino Silva estas mia najbarino."]]},
{t:'Familio kaj homoj', lvl:'A1', w:[
["patro, patrino","pai, mãe","Mia patrino estas instruistino."],["gepatroj","pais (pai e mãe)","Miaj gepatroj loĝas en Brazilo."],["frato, fratino","irmão, irmã","Mi havas du fratojn."],["gefratoj","irmãos e irmãs","Ni estas kvin gefratoj."],["filo, filino","filho, filha","Ilia filino estas sepjara."],
["avo, avino","avô, avó","Mia avino kuiras bonege."],["nepo, nepino","neto, neta","La nepoj vizitas ŝin dimanĉe."],["onklo, onklino","tio, tia","Mia onklo loĝas en Portugalio."],["nevo, nevino","sobrinho, sobrinha","Mia nevino lernas Esperanton."],["kuzo, kuzino","primo, prima","Mi havas multajn kuzojn."],
["edzo, edzino","marido, esposa","Ŝia edzo estas inĝeniero."],["geedzoj","casal (marido e mulher)","La geedzoj festis sian datrevenon."],["bopatrino","sogra","Mia bopatrino estas tre afabla."],["infano","criança","La infanoj ludas en la parko."],["knabo, knabino","menino, menina","La knabino legas libron."],
["viro, virino","homem, mulher","Tiu virino estas mia ĉefo."],["amiko, amikino","amigo, amiga","Ŝi estas mia plej bona amikino."],["najbaro","vizinho","La najbaro havas grandan hundon."]]},
{t:'Hejmo kaj domo', lvl:'A1', w:[
["domo","casa","Ili loĝas en malnova domo."],["apartamento","apartamento","Nia apartamento havas tri ĉambrojn."],["ĉambro","quarto, cômodo","Mia ĉambro estas hela."],["dormoĉambro","quarto de dormir","La dormoĉambro estas malgranda."],["kuirejo","cozinha","Ni manĝas en la kuirejo."],
["banĉambro","banheiro","La banĉambro estas maldekstre."],["salono","sala de estar","Ni spektas filmojn en la salono."],["fenestro","janela","Malfermu la fenestron, mi petas."],["pordo","porta","La pordo estas verda."],["lito","cama","La lito estas tre mola."],
["tablo","mesa","La ŝlosiloj estas sur la tablo."],["seĝo","cadeira","Prenu seĝon kaj sidiĝu."],["ŝranko","armário","La vestoj estas en la ŝranko."],["fridujo","geladeira","La lakto estas en la fridujo."],["lampo","lâmpada, luminária","Ŝaltu la lampon."],
["ŝlosilo","chave","Mi perdis mian ŝlosilon!"],["etaĝo","andar","Ni loĝas en la tria etaĝo."],["lifto","elevador","La lifto ne funkcias hodiaŭ."]]},
{t:'Manĝi kaj trinki', lvl:'A1', w:[
["manĝaĵo","comida","La brazila manĝaĵo estas bongusta."],["trinkaĵo","bebida","Kion vi volas kiel trinkaĵon?"],["pano","pão","Mi aĉetis freŝan panon."],["akvo","água","Glason da akvo, mi petas."],["kafo","café","Mi trinkas tri kafojn tage."],
["teo","chá","Ĉu vi preferas teon aŭ kafon?"],["lakto","leite","Kafo kun lakto, mi petas."],["fromaĝo","queijo","Pano kun fromaĝo estas mia matenmanĝo."],["butero","manteiga","La butero estas en la fridujo."],["ovo","ovo","Mi manĝis du ovojn."],
["rizo kaj fazeoloj","arroz e feijão","Rizo kaj fazeoloj ĉiutage!"],["viando","carne","Mi ne manĝas viandon."],["fiŝo","peixe","Ĉi tie la fiŝo estas freŝa."],["legomoj","legumes, verduras","Manĝu pli da legomoj."],["frukto","fruta","Mango estas mia plej ŝatata frukto."],
["pomo","maçã","Pomo tage, sano por ĉiam."],["terpomo","batata","Terpomojn kun fiŝo, mi petas."],["matenmanĝo, tagmanĝo, vespermanĝo","café da manhã, almoço, jantar","La tagmanĝo estas je la unua."],["bongusta","gostoso","Via kuko estas bongustega!"],["la kalkulon, mi petas","a conta, por favor","Kelnero, la kalkulon, mi petas."]]},
{t:'Urbo kaj vojaĝo', lvl:'A2', w:[
["urbo","cidade","Madrido estas granda urbo."],["vilaĝo","vila, aldeia","Ŝi loĝas en malgranda vilaĝo."],["strato","rua","Mia strato estas trankvila."],["placo","praça","Ni renkontiĝos sur la placo."],["stacidomo","estação (de trem)","La stacidomo estas apud la rivero."],
["flughaveno","aeroporto","Mi alvenos en la flughavenon je la sepa."],["bileto","bilhete, passagem","Mi aĉetis la bileton rete."],["valizo","mala","Mia valizo ne alvenis!"],["hotelo","hotel","La hotelo estas malmultekosta."],["gastiganto","anfitrião","Mia gastiganto estas tre afabla."],
["dekstren, maldekstren","para a direita, para a esquerda","Iru dekstren ĉe la apoteko."],["rekte","em frente, reto","Iru rekte ĝis la placo."],["proksime, malproksime","perto, longe","La plaĝo estas proksime."],["vendejo","loja","La vendejo fermiĝas je la oka."],["apoteko","farmácia","Ĉu estas apoteko proksime?"],
["preĝejo","igreja","La preĝejo estas tre malnova."],["mapo","mapa","Ĉu vi havas mapon de la urbo?"],["vidindaĵo","atração turística","Kiuj estas la ĉefaj vidindaĵoj?"],["vojaĝi","viajar","Mi vojaĝos al Pollando en julio."],["veturi","andar (de veículo)","Ni veturis per trajno."]]},
{t:'Tempo kaj vetero', lvl:'A2', w:[
["hodiaŭ, hieraŭ, morgaŭ","hoje, ontem, amanhã","Hodiaŭ estas lundo."],["semajno","semana","Ĝis la venonta semajno!"],["monato","mês","Mi lernas Esperanton de unu monato."],["jaro","ano","Bonan novan jaron!"],["horo, minuto","hora, minuto","Atendu kvin minutojn."],
["frue, malfrue","cedo, tarde","Mi vekiĝas frue."],["baldaŭ","logo, em breve","Ĝis baldaŭ!"],["ofte, malofte","frequentemente, raramente","Mi ofte legas vespere."],["vetero","tempo (clima)","Kia vetero estas hodiaŭ?"],["pluvi","chover","Pluvas la tutan tagon."],
["neĝi","nevar","En Brazilo malofte neĝas."],["suno","sol","La suno brilas."],["nubo","nuvem","Estas multaj nuboj hodiaŭ."],["vento","vento","Forta vento blovas."],["varma, malvarma","quente, frio","Estas tre varme en Rio."],
["printempo, somero","primavera, verão","Somere ni iras al la plaĝo."],["aŭtuno, vintro","outono, inverno","La vintro en Madrido estas malvarma."],["naskiĝtago","aniversário","Feliĉan naskiĝtagon!"]]},
{t:'Korpo kaj sano', lvl:'A2', w:[
["korpo","corpo","Sporto estas bona por la korpo."],["kapo","cabeça","Mia kapo doloras."],["okulo","olho","Ŝi havas verdajn okulojn."],["orelo","orelha","Mi aŭdas nenion per tiu orelo."],["buŝo","boca","Ne parolu kun plena buŝo!"],
["mano","mão","Lavu viajn manojn."],["piedo","pé","Ni iros piede."],["brako, kruro","braço, perna","Mi rompis mian kruron."],["dorso","costas","Mia dorso doloras pro la komputilo."],["dento","dente","Mi devas iri al la dentisto."],
["sana, malsana","saudável, doente","Ŝi estas malsana hodiaŭ."],["dolori","doer","Kie doloras al vi?"],["kuracisto","médico","Mi havas rendevuon ĉe la kuracisto."],["medikamento","remédio","Prenu la medikamenton post la manĝo."],["malvarmumo","resfriado","Mi havas malvarmumon."],
["febro","febre","La infano havas febron."],["laca","cansado","Mi estas tre laca hodiaŭ."],["ripozi","descansar","Vi devas ripozi."]]},
{t:'Laboro kaj teknologio', lvl:'B1', w:[
["laboro","trabalho","Mi ŝatas mian laboron."],["oficejo","escritório","Mi laboras en oficejo."],["kolego","colega","Miaj kolegoj estas afablaj."],["estro, ĉefo","chefe","La estro ne venis hodiaŭ."],["kunveno","reunião","Mi havas tri kunvenojn hodiaŭ."],
["firmao","empresa","Ŝi laboras por granda firmao."],["salajro","salário","La salajro ne estas alta."],["programisto","programador","Mi estas programistino."],["komputilo","computador","Mia komputilo estas malrapida."],["programo","programa","Mi skribas programon en Python."],
["retejo","site","Nia retejo havas novan dezajnon."],["retpoŝto","e-mail","Sendu al mi retpoŝtan mesaĝon."],["dosiero","arquivo","Mi perdis la dosieron!"],["ŝargi, elŝuti","carregar, baixar","Elŝutu la aplikaĵon."],["aplikaĵo","aplicativo","Ĉu vi konas la aplikaĵon Amikumu?"],
["ekrano","tela","La ekrano estas tro malgranda."],["klavaro","teclado","Mia klavaro ne havas ĉ."],["cimo","bug (inseto)","Mi trovis cimon en la kodo."],["labori hejme","trabalhar de casa","Vendrede mi laboras hejme."],["templimo","prazo","La templimo estas vendredo."]]},
{t:'Sentoj kaj karaktero', lvl:'B1', w:[
["feliĉa","feliz","Mi estas tre feliĉa hodiaŭ."],["malĝoja","triste","Kial vi estas malĝoja?"],["gaja","alegre","Li estas ĉiam gaja."],["kolera","bravo, irritado","La estro estis kolera."],["timi","ter medo","Ne timu erari!"],
["nervoza","nervoso","Mi estas nervoza antaŭ la ekzameno."],["trankvila","tranquilo","Estu trankvila, ĉio estos bona."],["enui","entediar-se","Mi enuas sen libroj."],["ĝojo","alegria","Kia ĝojo revidi vin!"],["sopiri","sentir saudade","Mi sopiras al mia familio."],
["afabla","gentil, simpático","La gastigantoj estis tre afablaj."],["scivolema","curioso","Infanoj estas scivolemaj."],["timema","tímido","Mi estis timema kiel infano."],["pacienca","paciente","Bona instruisto estas pacienca."],["laborema","trabalhador","Ŝi estas laborema kaj inteligenta."],
["amuza","divertido","La filmo estis tre amuza."],["enamiĝi","apaixonar-se","Ili enamiĝis en kongreso."],["fiera","orgulhoso","Mi estas fiera pri vi."]]},
{t:'Libera tempo', lvl:'B1', w:[
["libera tempo","tempo livre","Kion vi faras en via libera tempo?"],["ŝatokupo","hobby, passatempo","Mia ŝatokupo estas fotado."],["legi","ler","Mi legas antaŭ ol dormi."],["filmo","filme","Ĉu vi vidis la novan filmon?"],["kinejo","cinema","Ni iros al la kinejo."],
["teatro","teatro","La teatraĵo estis bonega."],["koncerto","show, concerto","La koncerto komenciĝos je la naŭa."],["kanto","canção","Tiu kanto estas tre bela."],["ludi gitaron","tocar violão","Li ludas gitaron ĉiuvespere."],["danci","dançar","Ni dancis ĝis la mateno."],
["naĝi","nadar","Mi naĝas ĵaŭde."],["promeni","passear","Ni promenis laŭ la rivero."],["biciklo","bicicleta","Mi iras al la laboro per biciklo."],["fotado","fotografia (atividade)","Fotado estas mia pasio."],["kuiri","cozinhar","Mi ŝatas kuiri por amikoj."],
["ferioj","férias","Kien vi iros dum la ferioj?"],["plaĝo","praia","La plaĝo estas plena de homoj."],["semajnfino","fim de semana","Bonan semajnfinon!"]]},
{t:'Naturo kaj medio', lvl:'B1', w:[
["naturo","natureza","Mi amas la naturon."],["arbo","árvore","Tiu arbo estas tre malnova."],["arbaro","floresta","La amazonia arbaro estas grandega."],["floro","flor","Ŝi donis al mi florojn."],["herbo","grama, erva","La infanoj sidas sur la herbo."],
["rivero","rio","La rivero estas pura."],["lago","lago","Ni naĝis en la lago."],["maro","mar","Mi sopiras al la maro."],["monto","montanha","Ni grimpis la monton."],["insulo","ilha","Florianópolis troviĝas sur insulo."],
["besto","animal","Kiu estas via plej ŝatata besto?"],["birdo","pássaro","La birdoj kantas matene."],["hundo, kato","cachorro, gato","Mia kato dormas la tutan tagon."],["ĉielo","céu","La ĉielo estas blua."],["tero","terra","La tero estas seka."],
["medio","meio ambiente","Ni devas protekti la medion."],["rubo","lixo","Ne ĵetu rubon sur la straton."],["reciklado","reciclagem","Reciklado estas grava."]]},
{t:'Esperantujo', lvl:'B1', w:[
["esperantisto","esperantista","Ŝi estas esperantistino de dudek jaroj."],["samideano","companheiro de ideal","Karaj samideanoj, bonvenon!"],["Esperantujo","o mundo esperantista","En Esperantujo oni sentas sin hejme."],["kongreso","congresso","La Universala Kongreso okazas ĉiujare."],["renkontiĝo","encontro","Mi iros al junulara renkontiĝo."],
["krokodili","falar a língua materna entre esperantistas","Ne krokodilu, parolu Esperanton!"],["verda stelo","estrela verde (símbolo)","Ŝi portas verdan stelon."],["denaskulo","falante nativo","Lotte estas denaskulo."],["komencanto","iniciante","Mi ankoraŭ estas komencanto."],["krokodilo","quem «krokodilas»","Ĉi tie ne estas krokodiloj!"],
["kurso","curso","La kurso estas senpaga."],["lernolibro","livro didático","Mi uzas bonan lernolibron."],["vortaro","dicionário","Serĉu la vorton en la vortaro."],["prelego","palestra","La prelego estis interesa."],["gufujo","café tranquilo (nos encontros)","Post la koncerto ni iris al la gufujo."],
["drinkejo","bar","La drinkejo malfermiĝas je la deka."],["Zamenhofa Tago","Dia de Zamenhof (15/12)","Ni festos la Zamenhofan Tagon."],["Pasporta Servo","rede de hospedagem esperantista","Mi gastis ĉe gastiganto de Pasporta Servo."]]}
];

/* ───────── KULTURO ───────── */
const CULTURA = [
{t:'Doktoro Esperanto', pt:'Zamenhof e o nascimento da língua', tag:'Historio',
p:[
["Ludoviko Lazaro Zamenhof naskiĝis en 1859 en Bjalistoko, urbo tiam en la Rusa Imperio kaj hodiaŭ en Pollando. En lia urbo oni parolis la polan, la rusan, la jidan kaj la germanan, kaj la diversaj grupoj ofte malamis unu la alian. La juna Zamenhof kredis, ke parto de la problemo estas la [[malkompreno|falta de entendimento]].","Ludwik Lejzer Zamenhof nasceu em 1859 em Białystok, cidade então no Império Russo e hoje na Polônia. Na sua cidade se falavam polonês, russo, iídiche e alemão, e os diferentes grupos muitas vezes se odiavam. O jovem Zamenhof acreditava que parte do problema era a falta de entendimento."],
["Dum la tuta junaĝo li laboris pri neŭtrala lingvo, kiu apartenus al neniu popolo. Fine, en julio 1887, li publikigis en Varsovio la «Unuan Libron», per la pseŭdonimo «Doktoro Esperanto». La nomo de la aŭtoro rapide fariĝis la nomo de la lingvo.","Durante toda a juventude ele trabalhou numa língua neutra, que não pertencesse a nenhum povo. Finalmente, em julho de 1887, publicou em Varsóvia o «Primeiro Livro», sob o pseudônimo «Doktoro Esperanto». O nome do autor logo virou o nome da língua."],
["Zamenhof estis okulisto, kaj li neniam riĉiĝis per sia lingvo: li [[rezignis|renunciou]] pri ĉiuj aŭtoraj rajtoj. Li mortis en 1917. Lia naskiĝtago, la 15-a de decembro, estas hodiaŭ la Zamenhofa Tago, festata de esperantistoj en la tuta mondo.","Zamenhof era oftalmologista e nunca enriqueceu com a sua língua: renunciou a todos os direitos autorais. Morreu em 1917. O dia do seu aniversário, 15 de dezembro, é hoje o Dia de Zamenhof, festejado por esperantistas no mundo todo."]
],
curio:['Zamenhof também traduziu para o esperanto obras como «Hamlet» e o Antigo Testamento, para mostrar que a língua servia para literatura.','A primeira gramática tinha só 16 regras e cerca de 900 raízes.','Há ruas e praças com o nome de Zamenhof em centenas de cidades, inclusive no Brasil.'],
w:[["naskiĝi","nascer"],["popolo","povo"],["lingvo","língua"],["pseŭdonimo","pseudônimo"],["aŭtoraj rajtoj","direitos autorais"],["festi","festejar"]],
q:[["Kie naskiĝis Zamenhof?",["En Varsovio","En Bjalistoko","En Parizo","En Berlino"],1],["Kion signifas la pseŭdonimo «Doktoro Esperanto»?",["Doktoro, kiu esperas","Doktoro de la lingvoj","Doktoro el Esperantujo","Kuracisto de okuloj"],0],["Kiam estas la Zamenhofa Tago?",["La 26-an de julio","La 15-an de decembro","La 1-an de januaro","La 17-an de aprilo"],1]]},
{t:'La 16 reguloj kaj la Fundamento', pt:'Por que o esperanto não virou dialetos', tag:'Historio',
p:[
["La gramatiko de la «Unua Libro» havis nur dek ses regulojn. Ili diras, ekzemple, ke ĉiuj substantivoj finiĝas per -o, ke la akcento estas ĉiam sur la antaŭlasta silabo kaj ke ĉiu vorto estas legata tiel, kiel ĝi estas skribita.","A gramática do «Primeiro Livro» tinha só dezesseis regras. Elas dizem, por exemplo, que todos os substantivos terminam em -o, que o acento cai sempre na penúltima sílaba e que toda palavra é lida como é escrita."],
["Kiam la lingvo disvastiĝis, multaj volis «plibonigi» ĝin. En 1905, en la unua Universala Kongreso en Bulonjo-ĉe-Maro, la esperantistoj akceptis la «Fundamenton de Esperanto»: aron de bazaj tekstoj, kiujn neniu rajtas ŝanĝi. Oni povas aldoni vortojn, sed ne forigi la malnovajn.","Quando a língua se espalhou, muitos quiseram «melhorá-la». Em 1905, no primeiro Congresso Universal, em Boulogne-sur-Mer, os esperantistas aprovaram o «Fundamento do Esperanto»: um conjunto de textos básicos que ninguém tem o direito de mudar. Pode-se acrescentar palavras, mas não eliminar as antigas."],
["Tial la lingvo evoluas kiel vivanta lingvo, sed restas stabila. Hodiaŭ la Akademio de Esperanto gardas la Fundamenton kaj konsilas pri la uzo. Kaj ĝuste tial vi povas legi tekston de 1910 sen vortaro.","Por isso a língua evolui como uma língua viva, mas continua estável. Hoje a Academia de Esperanto guarda o Fundamento e dá orientações sobre o uso. E é justamente por isso que você pode ler um texto de 1910 sem dicionário."]
],
curio:['Em 1907 surgiu o Ido, uma «reforma» do esperanto; alguns esperantistas mudaram, mas o esperanto continuou bem maior.','A ideia de não poder apagar nada lembra a compatibilidade retroativa de uma linguagem de programação.','A Academia de Esperanto nasceu do «Lingva Komitato», o comitê linguístico criado em 1905.'],
w:[["regulo","regra"],["akcento","acento tônico"],["disvastiĝi","espalhar-se"],["plibonigi","melhorar"],["rajti","ter o direito"],["gardi","guardar, proteger"]],
q:[["Kiom da reguloj havis la unua gramatiko?",["Ses","Dek ses","Cent","Naŭcent"],1],["Kio okazis en 1905?",["Zamenhof naskiĝis","La Fundamento estis akceptita en la unua UK","Aperis la Unua Libro","Oni fondis Pasportan Servon"],1],["Kion oni NE rajtas fari kun la Fundamento?",["Aldoni vortojn","Ŝanĝi ĝiajn bazajn regulojn","Legi ĝin","Traduki ĝin"],1]]},
{t:'La verda stelo kaj La Espero', pt:'Os símbolos do movimento', tag:'Simboloj',
p:[
["La plej konata simbolo de Esperanto estas la verda stelo kun kvin pintoj. La verdo signifas esperon, kaj la kvin pintoj reprezentas la kvin kontinentojn. Ofte oni vidas ĝin sur [[insignoj|broches, distintivos]], T-ĉemizoj kaj aŭtoj, por ke aliaj esperantistoj rekonu la portanton.","O símbolo mais conhecido do esperanto é a estrela verde de cinco pontas. O verde significa esperança, e as cinco pontas representam os cinco continentes. Muitas vezes ela aparece em broches, camisetas e carros, para que outros esperantistas reconheçam quem a usa."],
["La esperanta flago estas verda, kun blanka kvadrato en la supra maldekstra angulo, kaj en la kvadrato estas la verda stelo. La blanko reprezentas pacon kaj neŭtralecon.","A bandeira do esperanto é verde, com um quadrado branco no canto superior esquerdo, e no quadrado está a estrela verde. O branco representa a paz e a neutralidade."],
["La himno de la movado nomiĝas «La Espero». La vortojn verkis Zamenhof mem, kaj la plej konata melodio estas de la franca komponisto Félicien Menu de Ménil. Ĝi estas kantata en la malfermo de la kongresoj, ofte kun larmoj en la okuloj.","O hino do movimento se chama «La Espero» (A Esperança). A letra foi escrita pelo próprio Zamenhof, e a melodia mais conhecida é do compositor francês Félicien Menu de Ménil. Ele é cantado na abertura dos congressos, muitas vezes com lágrimas nos olhos."]
],
curio:['Em vez da estrela, há quem use o «jubilea simbolo», um símbolo criado para o centenário da língua (1987).','O verde da bandeira não tem um tom oficial único: cada fabricante usa o seu.','Usar a estrela verde em viagem é um jeito antigo de encontrar esperantistas por acaso.'],
w:[["stelo","estrela"],["pinto","ponta"],["flago","bandeira"],["kvadrato","quadrado"],["himno","hino"],["paco","paz"]],
q:[["Kion reprezentas la kvin pintoj de la stelo?",["Kvin landojn","La kvin kontinentojn","Kvin regulojn","Kvin lingvojn"],1],["Kiu verkis la vortojn de «La Espero»?",["Félicien Menu de Ménil","Zamenhof","Claude Piron","William Auld"],1],["Kion signifas la blanka koloro en la flago?",["Pacon kaj neŭtralecon","Esperon","La neĝon","La maron"],0]]},
{t:'La Universala Kongreso', pt:'Uma semana por ano em que o mundo fala esperanto', tag:'Movado',
p:[
["Ĉiun someron, de 1905, miloj da esperantistoj kunvenas en alia lando por la Universala Kongreso de Esperanto, organizata de UEA, la Universala Esperanto-Asocio, fondita en 1908. Dum unu semajno ĉio okazas en Esperanto: prelegoj, koncertoj, teatro, ekskursoj kaj, kompreneble, longaj noktaj babiladoj.","Todo verão, desde 1905, milhares de esperantistas se reúnem num país diferente para o Congresso Universal de Esperanto, organizado pela UEA, a Associação Universal de Esperanto, fundada em 1908. Durante uma semana tudo acontece em esperanto: palestras, shows, teatro, excursões e, claro, longas conversas noturnas."],
["Brazilo gastigis du Universalajn Kongresojn: en Braziljo en 1981 kaj en Fortalezo en 2002. Krom la UK ekzistas multaj aliaj renkontiĝoj, ekzemple la Internacia Junulara Kongreso por gejunuloj kaj la Tut-Amerika Kongreso.","O Brasil sediou dois Congressos Universais: em Brasília, em 1981, e em Fortaleza, em 2002. Além do UK existem muitos outros encontros, por exemplo o Congresso Internacional da Juventude e o Congresso Pan-Americano."],
["Multaj kongresanoj rakontas, ke la plej forta sperto ne estas la programo, sed la unua tago: kiam oni aŭdas centojn da homoj el ĉiuj landoj paroli la saman lingvon, kaj [[konstatas|percebe]], ke ankaŭ oni mem komprenas ĉion.","Muitos congressistas contam que a experiência mais forte não é a programação, e sim o primeiro dia: quando se ouvem centenas de pessoas de todos os países falando a mesma língua, e se percebe que a gente mesma entende tudo."]
],
curio:['Durante a pandemia, o congresso de 2020 e 2021 aconteceu online, como «Virtuala Kongreso».','O maior UK da história reuniu quase seis mil pessoas em Varsóvia, em 1987, no centenário da língua.','Nos congressos existe a «Internacia Kongresa Universitato», com aulas de nível universitário em esperanto.'],
w:[["kunveni","reunir-se"],["prelego","palestra"],["ekskurso","excursão"],["babilado","bate-papo"],["kongresano","congressista"],["sperto","experiência"]],
q:[["Kiu organizas la Universalan Kongreson?",["La Akademio","UEA","La urbo","TEJO sola"],1],["En kiuj brazilaj urboj okazis UK?",["Rio kaj San-Paŭlo","Braziljo kaj Fortalezo","Salvadoro kaj Rekifo","Kuritibo kaj Porto-Alegro"],1],["Kio, laŭ multaj, estas la plej forta sperto?",["La ekskursoj","La unua tago, kiam oni komprenas ĉion","La koncertoj","La manĝaĵo"],1]]},
{t:'Pasporta Servo kaj vojaĝi', pt:'Dormir de graça na casa de esperantistas', tag:'Movado',
p:[
["Pasporta Servo estas reto de gastigantoj: esperantistoj en pli ol cent landoj, kiuj senpage akceptas aliajn esperantistojn en sia hejmo dum kelkaj tagoj. Ĝi ekzistas de la 1970-aj jaroj kaj estas prizorgata de TEJO, la Tutmonda Esperantista Junulara Organizo.","O Pasporta Servo é uma rede de anfitriões: esperantistas em mais de cem países que recebem gratuitamente outros esperantistas em casa por alguns dias. Existe desde os anos 1970 e é mantido pela TEJO, a Organização Mundial da Juventude Esperantista."],
["La regulo estas simpla: la gasto ne pagas, sed li aŭ ŝi devas paroli Esperanton kun la gastigantoj. Multaj vojaĝantoj diras, ke tio estas la plej bona maniero koni landon: ne kiel turisto, sed kiel amiko de la familio.","A regra é simples: o hóspede não paga, mas precisa falar esperanto com os anfitriões. Muitos viajantes dizem que é a melhor maneira de conhecer um país: não como turista, mas como amigo da família."],
["Antaŭ la interreto, la gastigantoj estis listigitaj en papera libreto. Hodiaŭ ĉio estas en retejo kaj aplikaĵo, kaj aplikaĵoj kiel Amikumu helpas trovi esperantistojn proksime al vi.","Antes da internet, os anfitriões ficavam listados num livrinho de papel. Hoje tudo está num site e num aplicativo, e aplicativos como o Amikumu ajudam a encontrar esperantistas perto de você."]
],
curio:['O Pasporta Servo já funcionava décadas antes de redes como o Couchsurfing existirem.','É educado levar um pequeno presente do seu país: brigadeiro faz sucesso garantido.','O hóspede e o anfitrião combinam tudo antes: datas, número de noites, regras da casa.'],
w:[["reto","rede"],["gastiganto","anfitrião"],["gasto","hóspede"],["senpage","de graça"],["maniero","maneira"],["proksime","perto"]],
q:[["Kion la gasto devas fari en Pasporta Servo?",["Pagi la gastigantojn","Paroli Esperanton kun ili","Kuiri ĉiutage","Resti unu monaton"],1],["Kiu prizorgas Pasportan Servon?",["UEA","TEJO","La Akademio","La registaro"],1],["Kio estis antaŭ la interreto?",["Papera libreto","Radio","Telefono","Nenio"],0]]},
{t:'Esperanto en Brazilo', pt:'Um dos movimentos mais antigos e fortes do mundo', tag:'Brazilo',
p:[
["Esperanto alvenis en Brazilon jam komence de la 20-a jarcento. La unuaj kluboj aperis en 1906, en Campinas kaj en Rio-de-Ĵanejro, kaj en julio 1907 oni fondis en Rio la ligon, kiu hodiaŭ nomiĝas Brazila Esperanto-Ligo (BEL).","O esperanto chegou ao Brasil já no começo do século 20. Os primeiros clubes surgiram em 1906, em Campinas e no Rio de Janeiro, e em julho de 1907 foi fundada no Rio a liga que hoje se chama Liga Brasileira de Esperanto (BEL)."],
["Brazilo havas unu el la plej grandaj esperantistaj komunumoj de la mondo. Parto de tio venas de la spiritisma movado, kiu de jardekoj subtenas Esperanton per kursoj, libroj kaj eldonejoj. Sed ekzistas ankaŭ multaj laikaj kluboj, universitataj grupoj kaj junulaj renkontiĝoj.","O Brasil tem uma das maiores comunidades esperantistas do mundo. Parte disso vem do movimento espírita, que há décadas apoia o esperanto com cursos, livros e editoras. Mas existem também muitos clubes laicos, grupos universitários e encontros de jovens."],
["Por brazilanoj, Esperanto estas aparte facila: la sonoj similas al la portugalaj, kaj grandega parto de la vortoj havas latinan devenon. Hodiaŭ oni povas lerni ĝin senpage per la portugala, ekzemple en Duolingo kaj en lernu.net, kaj trovi lokajn klubojn en preskaŭ ĉiuj ŝtatoj.","Para brasileiros, o esperanto é especialmente fácil: os sons parecem os do português, e uma parte enorme das palavras tem origem latina. Hoje é possível aprendê-lo de graça a partir do português, por exemplo no Duolingo e no lernu.net, e encontrar clubes locais em quase todos os estados."]
],
curio:['A Federação Espírita Brasileira publica livros em esperanto há décadas, inclusive traduções e obras originais.','A revista «Brazila Esperantisto» é publicada desde 1907.','O exame internacional de esperanto (KER) também é aplicado no Brasil.'],
w:[["jarcento","século"],["ligo","liga"],["komunumo","comunidade"],["subteni","apoiar"],["eldonejo","editora"],["deveno","origem"]],
q:[["Kiam estis fondita la brazila ligo?",["En 1887","En 1907","En 1981","En 2002"],1],["Kiu movado multe subtenas Esperanton en Brazilo?",["La sporta","La spiritisma","La muzika","La politika"],1],["Kial Esperanto estas facila por brazilanoj?",["Ĉar ĝi estas brazila lingvo","Ĉar la sonoj kaj multaj vortoj similas al la portugalaj","Ĉar ĝi ne havas gramatikon","Ĉar ĉiuj lernas ĝin en la lernejo"],1]]},
{t:'Libroj kaj muziko', pt:'Uma cultura de mais de um século', tag:'Kulturo',
p:[
["En Esperanto ekzistas dekmiloj da libroj: tradukoj de la mondliteraturo kaj ankaŭ originalaj verkoj. La skota poeto William Auld estis pluroble proponita por la Nobel-premio pri literaturo, kaj liaj poemoj estas klasikaĵoj. Por komencantoj, la plej fama romano estas «Gerda malaperis!» de Claude Piron, krimromano verkita per malmultaj vortoj.","Em esperanto existem dezenas de milhares de livros: traduções da literatura mundial e também obras originais. O poeta escocês William Auld foi indicado várias vezes ao Nobel de literatura, e seus poemas são clássicos. Para iniciantes, o romance mais famoso é «Gerda malaperis!» (Gerda desapareceu!), de Claude Piron, um romance policial escrito com poucas palavras."],
["La muziko estas ankoraŭ pli viva. Ekzistas rokgrupoj, repistoj, popkantistoj kaj kantistoj de popolmuziko, el Francio, Brazilo, Svedio kaj Japanio. La eldonejo Vinilkosmo publikigis centojn da albumoj, kaj vi povas aŭskulti multajn el ili senpage en la reto.","A música é ainda mais viva. Existem bandas de rock, rappers, cantores pop e de música folclórica, da França, do Brasil, da Suécia e do Japão. A gravadora Vinilkosmo publicou centenas de álbuns, e você pode ouvir muitos deles de graça na internet."],
["Ekzistas ankaŭ filmoj, podkastoj kaj kanaloj en Jutubo. Por lernanto tio estas trezoro: oni povas aŭskulti la lingvon en veraj situacioj, kun diversaj akĉentoj, kaj kompreni, ke Esperanto ne estas nur lernolibra lingvo.","Existem também filmes, podcasts e canais no YouTube. Para quem aprende isso é um tesouro: dá para ouvir a língua em situações reais, com vários sotaques, e entender que o esperanto não é só língua de livro didático."]
],
curio:['O filme «Incubus» (1966), com William Shatner, foi rodado inteiramente em esperanto.','Claude Piron, o autor de «Gerda malaperis!», era psicólogo e trabalhou como tradutor na ONU.','O site «Muzaiko» foi uma rádio online que tocava música em esperanto 24 horas por dia.'],
w:[["verko","obra"],["traduko","tradução"],["romano","romance (livro)"],["krimromano","romance policial"],["kantisto","cantor"],["trezoro","tesouro"]],
q:[["Kiu estas «Gerda malaperis!»?",["Poemo de William Auld","Romano por komencantoj de Claude Piron","Filmo","Kanto"],1],["Kio estas Vinilkosmo?",["Muzika eldonejo","Kongreso","Vortaro","Radio"],0],["Kial la muziko kaj filmoj estas trezoro por lernantoj?",["Ĉar ili estas senpagaj","Ĉar oni aŭdas la lingvon en veraj situacioj","Ĉar ili estas mallongaj","Ĉar ili estas en la portugala"],1]]},
{t:'Esperanto hodiaŭ', pt:'Wikipedia, apps e falantes nativos', tag:'Hodiaŭ',
p:[
["Neniu scias precize, kiom da homoj parolas Esperanton: la taksoj varias de centmiloj ĝis du milionoj. Certe estas, ke ĝi estas la plej parolata planita lingvo de la mondo, kaj ke ĝi havas eĉ denaskajn parolantojn, kiuj kreskis kun ĝi hejme.","Ninguém sabe exatamente quantas pessoas falam esperanto: as estimativas variam de centenas de milhares a dois milhões. O certo é que é a língua planejada mais falada do mundo, e que tem até falantes nativos, que cresceram com ela em casa."],
["La Vikipedio en Esperanto havas pli ol tricent okdek mil artikolojn: ĝi estas la plej granda Vikipedio en planita lingvo. Kursoj en Duolingo, lernu.net kaj aliaj retejoj havas centmilojn da lernantoj, kaj multaj el ili poste partoprenas en retaj babilejoj kaj renkontiĝoj.","A Wikipedia em esperanto tem mais de trezentos e oitenta mil artigos: é a maior Wikipedia numa língua planejada. Cursos no Duolingo, no lernu.net e em outros sites têm centenas de milhares de alunos, e muitos deles depois participam de chats e encontros."],
["UNESKO rekonis la valoron de Esperanto per rezolucioj en 1954 kaj 1985. Sed la plej grava forto de la lingvo ne estas oficiala: ĝi estas la komunumo de homoj, kiuj elektis lerni ĝin libervole, kaj kiuj ĝojas renkonti iun novan, kiu diras «Saluton!».","A UNESCO reconheceu o valor do esperanto em resoluções de 1954 e 1985. Mas a maior força da língua não é oficial: é a comunidade de pessoas que escolheram aprendê-la por vontade própria, e que ficam felizes ao encontrar alguém novo que diz «Saluton!»."]
],
curio:['A Wikipedia em esperanto começou em 2001, uma das primeiras edições da enciclopédia.','O Google Tradutor inclui o esperanto desde 2012.','Muitos falantes nativos são filhos de casais que se conheceram em encontros esperantistas.'],
w:[["takso","estimativa"],["planita lingvo","língua planejada"],["denaska","nativo, de nascença"],["artikolo","artigo"],["rezolucio","resolução"],["libervole","por vontade própria"]],
q:[["Kio estas certa pri la nombro de parolantoj?",["Ke estas precize unu miliono","Ke ĝi estas la plej parolata planita lingvo","Ke estas nur mil","Ke ĝi estas la plej parolata lingvo de la mondo"],1],["Kiom da artikoloj havas la esperanta Vikipedio?",["Pli ol tricent okdek mil","Ĉirkaŭ dek mil","Pli ol tri milionoj","Cent"],0],["Kio estas, laŭ la teksto, la plej granda forto de Esperanto?",["La rezolucioj de UNESKO","La komunumo de homoj","La registaroj","La mono"],1]]}
];
