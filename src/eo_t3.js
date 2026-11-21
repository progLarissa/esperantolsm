/* ───────── LAŬTLEGADO ───────── */
const TESTI = [
{t:'Mia mateno', lvl:'A1', text:`Mi kutime vekiĝas je la sepa. Unue mi trinkas grandan tason da kafo kaj rigardas tra la fenestro. Poste mi duŝas min kaj vestas min.

Mi laboras hejme, do mi ne devas rapidi. Je la oka mi malfermas mian komputilon kaj legas miajn mesaĝojn.

Vendrede estas alie. Mi renkontas mian amikinon Saran en kafejo apud la parko, kaj ni matenmanĝas kune. Tio estas mia plej ŝatata momento de la semajno.`,
pron:['VE-ki-ĝas: ĝ = «dj»','TA-son: o acento na penúltima','KOM-pu-ti-lon → kom-pu-TI-lon','ŝa-TA-ta: ŝ = «ch» de «chave»','kun-E? Não: KU-ne'],
ask:['Kion vi faras ĉiumatene?','Kiu estas via plej ŝatata momento de la semajno?','Ĉu vi preferas kafon aŭ teon?']},
{t:'La pluva semajnfino', lvl:'A1', text:`Lastan semajnfinon pluvis de vendredo vespere ĝis dimanĉo. Ni volis iri al la plaĝo, sed kompreneble ni restis hejme.

Sabate ni spektis tri filmojn kaj mendis picon. Mia fratino ekdormis dum la dua filmo, do ŝi ankoraŭ ne scias la finon.

Dimanĉe mi finis libron, kiun mi komencis en januaro. La pluvo ĉesis dum unu horo, kaj ni promenis en la malplenaj stratoj.`,
pron:['plu-VIS: u pleno, nunca «pl-vis»','KOM-pre-ne-ble → kom-pre-NE-ble','pi-CON: c = «ts», «pi-tson»','ek-DOR-mis','pro-ME-nis'],
ask:['Kion vi faras, kiam pluvas?','Rakontu pri via lasta semajnfino.','Kiun libron vi laste finis?']},
{t:'Vojaĝo al Lisbono', lvl:'A2', text:`Kiam mi alvenis en Lisbonon, la suno jam subiris. Mia gastiganto, Jozefo, atendis min ĉe la stacio kun verda stelo sur la ĉemizo.

Ni marŝis supren laŭ mallarĝaj stratoj ĝis lia domo. De la balkono oni vidis la tutan urbon kaj la riveron.

La sekvan tagon ni vizitis malnovan kafejon, kie poetoj kunvenis antaŭ cent jaroj. Mi trinkis kafon, manĝis kukon kun kremo kaj parolis Esperanton dum la tuta tago, sen eĉ unu vorto en la portugala.`,
pron:['Lis-BO-non: s sempre «s», nunca «z»','gas-ti-GAN-to','ĉe-MI-zo: ĉ = «tch»','mal-lar-ĜAJ: ĝ + aj','ĝis: «djis»'],
ask:['Kiun urbon vi ŝatus viziti per Pasporta Servo?','Priskribu la vidon de via fenestro.','Kion vi manĝas, kiam vi vizitas novan urbon?']},
{t:'La krokodilo', lvl:'A2', text:`En esperantaj renkontiĝoj oni ofte aŭdas strangan vorton: krokodili. Krokodili signifas paroli sian gepatran lingvon inter esperantistoj, anstataŭ Esperanto.

Ekzemple, du brazilanoj en kongreso, kiuj babilas en la portugala, krokodilas. Neniu punas ilin, sed amiko eble ridetos kaj diros: «Ne krokodilu!»

La ŝerco havas seriozan flankon. Kiam ni parolas Esperanton, ĉiuj ĉirkaŭ ni povas partopreni. Kiam ni krokodilas, ni fermas la pordon al la aliaj.`,
pron:['kro-ko-DI-li','ge-PA-tran','es-pe-ran-TIS-toj','ri-de-TOS','ĉir-KAŬ: aŭ como «au» em «mau»'],
ask:['Ĉu vi iam «krokodilis» en kurso de lingvo?','Kial estas grave paroli la komunan lingvon en grupo?','Kiun vorton de Esperanto vi plej ŝatas?']},
{t:'La lasta trajno', lvl:'B1', text:`Elirinte el la teatro, Klara rimarkis, ke ŝia telefono estas malŝargita. La lasta trajno foriros post duonhoro, do ŝi rapidis tra la malplenaj stratoj.

Sur la kajo staris nur maljuna sinjoro leganta gazeton kaj juna violonisto. Dum la vojaĝo la violonisto komencis kanteti melodion, kiun Klara tuj rekonis: ĝi estis la ĉefa temo de la teatraĵo, kiun ŝi ĵus vidis.

Ili parolis ĝis ŝia stacio. Nur hejme ŝi rimarkis, ke ŝi forgesis demandi lian nomon.`,
pron:['e-li-RIN-te: particípio, acento normal','mal-ŝar-GI-ta','vi-o-lo-NIS-to','te-a-TRA-ĵo: ĵ = «j» de «janela»','ĵus: «jus»'],
ask:['Rakontu pri renkonto, kiun vi neniam forgesis.','Kion vi faras, kiam via telefono estas malŝargita?','Kiun muzikon vi kantetas, kiam vi estas sola?']},
{t:'Kial mi lernas Esperanton', lvl:'B1', text:`Oni ofte demandas min, kial mi lernas Esperanton, se mi jam parolas la portugalan, la hispanan kaj iom la italan. La respondo estas simpla: ĉar ĝi estas la plej demokrata lingvo, kiun mi konas.

En Esperanto neniu estas indiĝeno kaj neniu estas fremdulo. Kiam mi parolas kun japanino aŭ kun polo, ni ambaŭ faris la saman vojon por renkontiĝi en la mezo.

Krome, la lingvo estas amuza. Mi ŝatas konstrui novajn vortojn kiel ludilojn, kaj mi ĝojas, kiam iu komprenas vorton, kiun mi ĵus inventis.`,
pron:['de-mo-KRA-ta','in-di-ĜE-no','frem-DU-lo','ja-pa-NI-no','lu-DI-lojn'],
ask:['Kial vi lernas Esperanton?','Kiun lingvon vi plej ŝatas, kaj kial?','Inventu novan vorton kaj klarigu ĝin.']},
{t:'La biblioteko, kiu neniam fermiĝas', lvl:'B2', text:`En malgranda germana urbo, volontuloj prizorgas unu el la plej grandaj esperantaj bibliotekoj de la mondo. Ĉiujare ili ricevas centojn da pakaĵoj: romanojn, poemarojn, revuojn kaj leterojn, ofte donacitajn de familioj de forpasintaj esperantistoj.

La plej granda defio ne estas la spaco, sed la tempo. Necesas katalogi ĉion, por ke esploristoj povu trovi la librojn, kaj skani la plej malnovajn, antaŭ ol la papero disfalos.

Se la projekto sukcesos, iu ajn, en iu ajn lando, povos legi tiujn tekstojn senpage. Tio estas la revo de la volontuloj: biblioteko, kiu neniam fermiĝas.`,
pron:['vo-lon-TU-loj','po-e-MA-rojn','for-pa-SIN-taj','ka-ta-LO-gi','dis-FA-los'],
ask:['Kiun libron vi savus el brulanta biblioteko?','Ĉu vi preferas paperajn aŭ elektronikajn librojn? Kial?','Kion vi farus kiel volontulo?']},
{t:'Maŝinoj kaj homoj', lvl:'B2', text:`Nun, kiam ĉiu poŝtelefono tradukas tuj, multaj demandas, ĉu ankoraŭ valoras lerni lingvojn. Laŭ mi, la demando mem montras miskomprenon: lingvo ne estas nur kodo por transdoni informojn.

Kiam mi parolas rekte kun iu, mi aŭdas ne nur liajn vortojn, sed ankaŭ lian humoron, liajn hezitojn, liajn ŝercojn. La maŝino tradukas la frazon, sed perdas la homon.

Tamen mi ne estas kontraŭ la teknologio. Mi uzas ĝin ĉiutage en mia laboro. Mi simple kredas, ke la plej bona tradukilo ankoraŭ estas homo, kiu volas kompreni alian homon.`,
pron:['po-ŝte-le-FO-no','mis-kom-PRE-non','he-zi-TOJN → he-ZI-tojn','tek-no-lo-GI-o','tra-du-KI-lo'],
ask:['Ĉu vi uzas maŝinan tradukadon? Por kio?','Kion maŝino ne povas traduki, laŭ vi?','Ĉu indas lerni lingvojn en 2030? Kial?']}
];

/* ───────── LANGOROMPILOJ ───────── */
const SCIOGLI = [
["Ŝi ŝatas ŝiajn ŝuojn, sed ŝia ŝafo ŝatas ŝiajn ŝtrumpojn.","ŝ: o «ch» de «chave»"],
["Ĉiu ĉevalo ĉe la ĉefa ĉambro ĉiam ĉeestas.","ĉ: o «tch» de «tchau»"],
["Cent cikonioj cirkas en la centro de la urbo.","c: sempre «ts»"],
["Ĝi ĝojas ĝis la ĝardeno ĝuas la ĝustan horon.","ĝ: «dj»"],
["Ĵaŭde ĵurnalisto ĵuris ĵeti la ĵurnalon.","ĵ: o «j» de «janela»"],
["Aŭdu, aŭdu: la aŭto aŭtune aŭdacas.","ŭ: «au» de «mau»"],
["Ĥoro de ĥemiistoj ĥaose kantas en Ĉeĥio.","ĥ: o «j» espanhol de «jamón»"],
["Rapida rivero ruliĝas rekte al la ruĝa roko.","r: vibrado simples, nunca o «rr» carioca"],
["Kiu kuiras kukon kun kvin kuleroj da kakao?","k + u: «ku» sem chiado"],
["Sesdek ses sesoj sidas sur seka sablo.","s: nunca «z», mesmo entre vogais"]
];

/* ───────── AŬSKULTADO: dialogoj ───────── */
const ASCOLTI = [
{t:'En la kafejo', lvl:'A1', where:'Madrido', names:{A:'Kelnero',B:'Klientino'}, lines:[
['A','Bonan tagon! Kion vi deziras?'],['B','Saluton. Mi ŝatus kafon kun lakto, mi petas.'],['A','Ĉu grandan aŭ malgrandan?'],['B','Grandan, mi petas. Kaj ĉu vi havas kukon?'],['A','Jes, ni havas ĉokoladan kukon kaj pomkukon.'],['B','Pomkukon, mi petas.'],['A','Do, granda kafo kun lakto kaj pomkuko. Tio kostas kvin eŭrojn kaj kvindek cendojn.'],['B','Jen, dankon.'],['A','Dankon al vi! Bonan apetiton.']],
q:[["Kion ŝi trinkos?",["Teon","Kafon kun lakto","Akvon","Sukon"],1],["Kian kukon ŝi elektis?",["Ĉokoladan","Pomkukon","Fromaĝan","Neniun"],1],["Kiom kostas ĉio?",["5,50 €","15,50 €","5,15 €","50,50 €"],0],["«Bonan apetiton» signifas…",["Bom apetite","Boa viagem","Bom dia","Obrigada"],0]],
notes:['«Mi ŝatus…» = eu gostaria (condicional educado).','«Ĉu grandan aŭ malgrandan?»: o -n porque continua o objeto «kafon».','«Kvin eŭrojn kaj kvindek cendojn» = 5,50 €.']},
{t:'Prezentiĝo en la kurso', lvl:'A1', where:'reta kurso', names:{A:'Instruisto',B:'Lernantino'}, lines:[
['A','Bonvenon al la kurso! Kiel vi nomiĝas?'],['B','Mi nomiĝas Larissa. Mi estas brazilanino, sed mi loĝas en Hispanio.'],['A','Tre interese! Kion vi faras profesie?'],['B','Mi estas programistino. Mi laboras por eŭropa firmao.'],['A','Kaj kial vi lernas Esperanton?'],['B','Ĉar mi ŝatas lingvojn. Mi jam parolas la portugalan kaj la hispanan, kaj mi lernas la italan kaj la anglan.'],['A','Kvin lingvoj! Bonege. Ĉu Esperanto estas facila por vi?'],['B','Jes, tre facila. Sed la akuzativo estas iom stranga!']],
q:[["Kie ŝi loĝas?",["En Brazilo","En Hispanio","En Italio","En Anglio"],1],["Kio estas ŝia profesio?",["Instruistino","Programistino","Tradukistino","Studentino"],1],["Kiom da lingvoj ŝi parolas aŭ lernas?",["Tri","Kvar","Kvin","Ses"],2],["Kio ŝajnas stranga al ŝi?",["La verboj","La akuzativo","La prononco","La nombroj"],1]],
notes:['«Kion vi faras profesie?» = qual é a sua profissão?','«Bonege!» = ótimo! (bon + eg + e).','«iom stranga» = um pouco estranho.']},
{t:'Ĉe la stacidomo', lvl:'A2', where:'Varsovio', names:{A:'Oficisto',B:'Vojaĝanto'}, lines:[
['B','Pardonu, je kioma horo foriras la trajno al Krakovo?'],['A','La sekva foriras je la dek-kvara kaj kvardek. Sed ĝi estas plena.'],['B','Ho ne! Kaj la posta?'],['A','Je la deksesa kaj dek. Ĝi alvenas en Krakovon je la deknaŭa kaj duono.'],['B','Bone, mi prenos tiun. Kiom kostas la bileto?'],['A','Okdek zlotojn. Aŭ sesdek, se vi estas studento.'],['B','Mi ne plu estas studento, bedaŭrinde! Unu bileton, mi petas.'],['A','Jen. La trajno foriros de la kajo numero kvar.']],
q:[["Kial la vojaĝanto ne prenas la unuan trajnon?",["Ĝi estas tro multekosta","Ĝi estas plena","Ĝi jam foriris","Ĝi ne iras al Krakovo"],1],["Je kioma horo foriros lia trajno?",["14:40","16:10","19:30","16:40"],1],["Kiom li pagas?",["60 zlotojn","80 zlotojn","40 zlotojn","100 zlotojn"],1],["De kiu kajo foriros la trajno?",["De la unua","De la dua","De la tria","De la kvara"],3]],
notes:['Horas de 24h: «la deksesa kaj dek» = 16:10.','«la posta» = a seguinte (depois dessa).','«Mi ne plu estas studento» = não sou mais estudante.']},
{t:'Telefone kun la gastiganto', lvl:'A2', where:'Lisbono', names:{A:'Jozefo',B:'Marina'}, lines:[
['A','Halo, Jozefo parolas.'],['B','Saluton, Jozefo! Estas Marina, via gasto de Pasporta Servo.'],['A','Ho, Marina! Kie vi estas?'],['B','Mi ĵus eliris el la metroo, sed mi ne trovas la preĝejon.'],['A','Ĉu vi vidas grandan apotekon?'],['B','Jes, ĝi estas antaŭ mi.'],['A','Bone. Iru maldekstren kaj supren laŭ la strato. Post du minutoj vi vidos la preĝejon. Nia domo estas apud ĝi, kun verda pordo.'],['B','Perfekte. Ĝis baldaŭ!'],['A','Ĝis tuj! Mi atendos vin ĉe la pordo.']],
q:[["Kion Marina ne trovas?",["La metroon","La preĝejon","La apotekon","La riveron"],1],["Kion ŝi vidas antaŭ si?",["Kafejon","Apotekon","Preĝejon","Verdan pordon"],1],["Kien ŝi devas iri?",["Dekstren","Maldekstren kaj supren","Malsupren","Rekte"],1],["Kie Jozefo atendos?",["En la stacio","Ĉe la pordo","En la apoteko","En la preĝejo"],1]],
notes:['«Ĵus» = acabei de: «Mi ĵus eliris» = acabei de sair.','«Ĝis tuj!» = até já!','«antaŭ mi» = na minha frente.']},
{t:'Pri la semajnfino', lvl:'B1', where:'oficejo', names:{A:'Tomas',B:'Elena'}, lines:[
['A','Elena! Kiel estis via semajnfino?'],['B','Laciga, sed bela. Mi helpis mian fratinon translokiĝi.'],['A','Ĉu ŝi translokiĝis al alia urbo?'],['B','Ne, nur al alia kvartalo. Sed ŝi havas pli da libroj ol biblioteko! Ni portis kvardek skatolojn.'],['A','Kvardek! Kaj ĉu vi trovis tempon por ripozi?'],['B','Dimanĉe vespere, jes. Ni mendis picon kaj spektis malnovan filmon. Kaj vi?'],['A','Mi estis en esperanta renkontiĝo en la montoj. Ni marŝis, kantis kaj parolis ĝis la tria matene.'],['B','Mi envias vin! La venontan fojon mi venos kun vi, se vi invitos min.'],['A','Kompreneble! La venonta estos en marto.']],
q:[["Kion faris Elena?",["Ŝi vojaĝis","Ŝi helpis la fratinon translokiĝi","Ŝi laboris","Ŝi iris al renkontiĝo"],1],["Kiom da skatoloj ili portis?",["Dek kvar","Kvardek","Kvar","Kvardek kvar"],1],["Kie estis Tomas?",["En la montoj, en esperanta renkontiĝo","Ĉe la maro","Hejme","En biblioteko"],0],["Kiam okazos la venonta renkontiĝo?",["En majo","En marto","Venontsemajne","En decembro"],1]],
notes:['«Laciga» = cansativo (lac + ig + a: que cansa).','«translokiĝi» = mudar-se (de casa).','«Mi envias vin» = tenho inveja de você (no bom sentido).']},
{t:'Ĉe la kuracisto', lvl:'B1', where:'kliniko', names:{A:'Kuracistino',B:'Paciento'}, lines:[
['A','Bonan tagon. Kio okazas al vi?'],['B','De tri tagoj mi havas kapdoloron kaj iom da febro.'],['A','Ĉu vi tusas?'],['B','Jes, precipe nokte. Kaj mi dormas tre malbone.'],['A','Mi vidu… Malfermu la buŝon, mi petas. Jes, via gorĝo estas ruĝa. Ŝajnas, ke vi havas gripon.'],['B','Ĉu mi devas preni antibiotikojn?'],['A','Ne, ne necesas. Ripozu, trinku multe da akvo kaj prenu ĉi tiun medikamenton kontraŭ la febro. Se post kvin tagoj vi ne fartos pli bone, revenu.'],['B','Ĉu mi povas labori hejme?'],['A','Mi preferus, ke vi tute ripozu dum du tagoj.']],
q:[["De kiam li havas kapdoloron?",["De hieraŭ","De tri tagoj","De unu semajno","De kvin tagoj"],1],["Kion diras la kuracistino pri lia malsano?",["Ŝajnas gripo","Ĝi estas grava","Li devas iri al hospitalo","Li ne estas malsana"],0],["Ĉu li bezonas antibiotikojn?",["Jes, tuj","Ne","Nur nokte","Post kvin tagoj"],1],["Kion la kuracistino preferas?",["Ke li laboru hejme","Ke li tute ripozu dum du tagoj","Ke li revenu morgaŭ","Ke li iru al la laborejo"],1]],
notes:['«De tri tagoj» = há três dias (e continua).','«Mi vidu…» = deixe-me ver (volitivo).','«Mi preferus, ke vi … ripozu» = -us cortês + -u depois de ke.']},
{t:'Debato: maŝina tradukado', lvl:'B2', where:'radio', names:{A:'Gvidanto',B:'Sofia',C:'Marko'}, lines:[
['A','Bonvenon al nia programo. Hodiaŭ ni demandas: ĉu maŝina tradukado mortigos la lingvolernadon? Sofia, vi laboras pri lingvaj teknologioj.'],['B','Jes, kaj mi respondas: ne. La tradukiloj estas mirindaj, sed ili solvas nur parton de la problemo. Ili transdonas informojn, ne rilatojn.'],['C','Permesu, ke mi malkonsentu. Por la plimulto de la homoj sufiĉas informoj. Turisto ne bezonas amikiĝi kun la kelnero; li volas mendi manĝon.'],['B','Eble. Sed ni ne lernas lingvojn nur por mendi manĝon. Ni lernas ilin por kompreni aliajn manierojn pensi.'],['C','Tio estas bela ideo, sed ĝi koncernas malplimulton. Mi timas, ke en dudek jaroj nur entuziasmuloj lernos lingvojn.'],['A','Kaj Esperanto? Ĉu ĝi havas lokon en tiu mondo?'],['B','Ĝi estas la pruvo, ke homoj lernas lingvon eĉ sen ekonomia neceso, simple por renkonti unu la alian.']],
q:[["Kion opinias Sofia pri la tradukiloj?",["Ke ili estas senutilaj","Ke ili transdonas informojn, ne rilatojn","Ke ili mortigos la lingvojn","Ke ili estas tro multekostaj"],1],["Kion argumentas Marko?",["Ke ĉiuj lernos pli da lingvoj","Ke por la plimulto sufiĉas informoj","Ke turistoj devas amikiĝi kun kelneroj","Ke Esperanto estas la solvo"],1],["Kion timas Marko?",["Ke la maŝinoj fariĝos tro inteligentaj","Ke nur entuziasmuloj lernos lingvojn","Ke Esperanto malaperos","Ke la turistoj ne plu vojaĝos"],1],["Kion pruvas Esperanto laŭ Sofia?",["Ke la maŝinoj ne funkcias","Ke homoj lernas lingvon eĉ sen ekonomia neceso","Ke ĉiuj parolas ĝin","Ke ĝi estas la plej facila lingvo"],1]],
notes:['«Permesu, ke mi malkonsentu» = permita-me discordar (volitivo).','«plimulto / malplimulto» = maioria / minoria.','«amikiĝi» = fazer amizade (amik + iĝ + i).']},
{t:'Novaĵoj en simpla Esperanto', lvl:'B2', where:'retradio', names:{N:'Anoncisto'}, lines:[
['N','Bonan vesperon. Jen la ĉefaj novaĵoj de la tago.'],['N','En Kopenhago oni inaŭguris la plej longan biciklan ponton de la urbo. Ĝi estas uzata ĉiutage de pli ol dudek mil biciklistoj, laŭ la urbestraro.'],['N','En Brazilo, la registaro anoncis, ke ĝi plantos unu milionon da arboj en la urboj de la nordoriento dum la venontaj kvin jaroj.'],['N','En Japanio, sciencistoj kreis roboton, kiu helpas maljunulojn ellitiĝi. La roboto estos testata en tri hospitaloj ekde januaro.'],['N','Kaj fine, la vetero: morgaŭ estos sune en la sudo, sed en la nordo oni atendas fortan pluvon kaj venton. Ĝis morgaŭ!']],
q:[["Kio estis inaŭgurita en Kopenhago?",["Nova metroo","Bicikla ponto","Hospitalo","Parko"],1],["Kion anoncis la brazila registaro?",["Novajn lernejojn","La plantadon de unu miliono da arboj","Novan ponton","Novan roboton"],1],["Kion faras la japana roboto?",["Ĝi kuiras","Ĝi helpas maljunulojn ellitiĝi","Ĝi tradukas","Ĝi purigas"],1],["Kia estos la vetero en la nordo?",["Suna","Forta pluvo kaj vento","Neĝo","Varmega"],1]],
notes:['«inaŭguri» = inaugurar; «urbestraro» = a prefeitura (o conjunto dos dirigentes).','«estos testata» = será testado (passiva com -at-).','«ellitiĝi» = levantar-se da cama (el + lit + iĝ + i). Pura vortfarado!']}
];

/* ───────── FRAZARO ───────── */
const FRASARIO = [
{t:'Gajni tempon (kiam mankas vortoj)', lvl:'A1–B2', f:[["Momenton…","Um momento…"],["Mi pensu iomete…","Deixa eu pensar um pouco…"],["Kiel oni diras…?","Como se diz…?"],["Mi ne trovas la vorton.","Não encontro a palavra."],["Nu…","Bom…"],["Kion mi volis diri… ah, jes!","O que eu queria dizer… ah, sim!"],["Mi ne scias, kiel diri tion, sed…","Não sei como dizer isso, mas…"],["Kie mi estis?","Onde eu estava?"]]},
{t:'Kiam vi ne komprenas', lvl:'A1', f:[["Pardonu, mi ne komprenis.","Desculpe, não entendi."],["Ĉu vi povas ripeti, mi petas?","Pode repetir, por favor?"],["Bonvolu paroli pli malrapide.","Fale mais devagar, por favor."],["Kion signifas…?","O que significa…?"],["Kiel oni skribas tion?","Como se escreve isso?"],["Ĉu vi volas diri, ke…?","Você quer dizer que…?"],["Mi estas komencanto.","Sou iniciante."],["Ĉu vi parolas la portugalan?","Você fala português?"]]},
{t:'Babilado (malgranda konversacio)', lvl:'A1–A2', f:[["Kiel vi fartas?","Como vai?"],["Bone, dankon. Kaj vi?","Bem, obrigada. E você?"],["De kie vi venas?","De onde você vem?"],["Kion vi faras profesie?","Qual é a sua profissão?"],["De kiam vi parolas Esperanton?","Desde quando você fala esperanto?"],["Ĉu estas via unua kongreso?","É o seu primeiro congresso?"],["Estis plezuro paroli kun vi.","Foi um prazer falar com você."],["Ni restu en kontakto!","Vamos manter contato!"]]},
{t:'Doni sian opinion', lvl:'B1', f:[["Laŭ mi…","Para mim, na minha opinião…"],["Mi opinias, ke…","Acho que…"],["Mi tute konsentas.","Concordo totalmente."],["Mi ne tute konsentas.","Não concordo totalmente."],["Vi pravas.","Você tem razão."],["Tio dependas de…","Isso depende de…"],["Unuflanke…, aliflanke…","Por um lado…, por outro…"],["Mi ne estas certa pri tio.","Não tenho certeza disso."]]},
{t:'Ĝentilaj petoj', lvl:'A2–B1', f:[["Ĉu vi povus helpi min?","Você poderia me ajudar?"],["Mi ŝatus…","Eu gostaria de…"],["Ĉu ĝenus vin, se…?","Incomodaria se…?"],["Ĉu eblas…?","É possível…?"],["Dankon anticipe.","Obrigada desde já."],["Ne gravas.","Não tem problema."],["Pardonu la ĝenon.","Desculpe o incômodo."],["Kun plezuro!","Com prazer!"]]},
{t:'En la kongreso', lvl:'A2–B1', f:[["Kie okazas la prelego?","Onde é a palestra?"],["Ĉu tiu seĝo estas libera?","Esta cadeira está livre?"],["Je kioma horo komenciĝas la koncerto?","A que horas começa o show?"],["Ĉu vi venos al la gufujo?","Você vai ao café (gufujo)?"],["Mi perdis mian kongresan insignon.","Perdi meu crachá do congresso."],["Ne krokodilu!","Não fale a sua língua materna!"],["Kiu gvidas la ekskurson?","Quem guia a excursão?"],["Ĝis la venonta kongreso!","Até o próximo congresso!"]]},
{t:'Esprimi sentojn', lvl:'B1–B2', f:[["Kia ĝojo!","Que alegria!"],["Mi tre ĝojas aŭdi tion.","Fico muito feliz em ouvir isso."],["Bedaŭrinde…","Infelizmente…"],["Mi komprenas vin.","Eu te entendo."],["Ne zorgu.","Não se preocupe."],["Mi estas tute laca.","Estou completamente cansada."],["Tio tre plaĉas al mi.","Gosto muito disso."],["Mi ne povas kredi!","Não acredito!"]]}
];

/* ───────── KONVERSACIO KUN LA AI ───────── */
const ROLEPLAY = [
{t:'En kafejo', lvl:'A1', role:'a friendly waiter in a small café in Madrid who speaks Esperanto', goal:'order a drink and something to eat, ask the price and pay'},
{t:'Nova konato', lvl:'A1', role:'a curious and friendly Esperanto speaker from Japan you meet online in a beginners\' chat', goal:'introduce yourself, say where you are from, what you do and why you are learning Esperanto'},
{t:'Pasporta Servo', lvl:'A2', role:'a warm host in Lisbon who will welcome you through Pasporta Servo', goal:'arrange your stay by phone: dates, how to get to the house, the key and the house rules'},
{t:'Ĉe la stacidomo', lvl:'A2', role:'a patient ticket clerk at Warsaw central station', goal:'buy a train ticket to Kraków: times, platform, price and a discount'},
{t:'Unua tago en la kongreso', lvl:'B1', role:'an experienced, funny Esperanto speaker from France at your first World Congress', goal:'ask about the programme, learn some movement slang (krokodili, gufujo, samideano) and make a plan for the evening'},
{t:'Pri libroj kaj filmoj', lvl:'B1', role:'a book-loving Esperanto friend from Brazil who has opinions about everything', goal:'recommend a book or film, explain the story without spoilers and react to your friend\'s recommendation'},
{t:'Laborintervjuo', lvl:'B2', role:'a polite interviewer at an international NGO that works in Esperanto', goal:'present your professional experience as a programmer and explain why you want the job'},
{t:'Debato', lvl:'B2', role:'a friendly but sceptical journalist who doubts that Esperanto has a future', goal:'defend your opinion about Esperanto and machine translation with clear arguments'}
];

/* ───────── PAROLA EKZAMENO ───────── */
const ORALE = [
{lvl:'A1', t:'Pri vi', p:'Prezentu vin: via nomo, de kie vi estas, kie vi loĝas, kion vi faras kaj kion vi ŝatas.', prep:30, talk:60},
{lvl:'A1', t:'Via hejmo', p:'Priskribu vian hejmon. Kiom da ĉambroj ĝi havas? Kio plaĉas al vi en ĝi?', prep:30, talk:60},
{lvl:'A1', t:'Via tago', p:'Rakontu pri via kutima tago, de la mateno ĝis la vespero.', prep:30, talk:60},
{lvl:'A2', t:'Lasta semajnfino', p:'Rakontu, kion vi faris lastan semajnfinon kaj kun kiu.', prep:45, talk:75},
{lvl:'A2', t:'Via urbo', p:'Priskribu vian urbon al turisto: kion viziti, kie manĝi, kiel moviĝi.', prep:45, talk:75},
{lvl:'B1', t:'Memorinda vojaĝo', p:'Priskribu vojaĝon, kiun vi neniam forgesos: kien vi iris, kun kiu, kio okazis kaj kial ĝi estis speciala.', prep:60, talk:90},
{lvl:'B1', t:'Lerni lingvojn', p:'Kiel vi lernas lingvojn? Kio funkcias por vi, kaj kio ne? Kion vi konsilus al komencanto?', prep:60, talk:90},
{lvl:'B1', t:'Se vi povus…', p:'Se vi povus loĝi unu jaron en iu ajn lando, kie vi loĝus kaj kion vi farus tie?', prep:60, talk:90},
{lvl:'B2', t:'Teknologio', p:'Ĉu la teknologio plibonigas aŭ malbonigas niajn rilatojn? Donu argumentojn por ambaŭ flankoj kaj vian opinion.', prep:60, talk:120},
{lvl:'B2', t:'Lingvo kaj identeco', p:'Ĉu la lingvo, kiun ni parolas, ŝanĝas nian manieron pensi? Uzu ekzemplojn el viaj lingvoj.', prep:60, talk:120}
];

/* ───────── LEGAJ EKZAMENOJ (stilo KER) ───────── */
const EXAM_TYPES = {
mc:{name:'Plurelekta legado', exam:'KER · Legado', how:`Leia o texto inteiro uma vez, rápido, só para entender o tema e o tom. Depois, para cada pergunta, encontre o trecho certo (as perguntas seguem a ordem do texto) e só então olhe as opções. A resposta certa quase nunca repete as palavras do texto: diz a mesma coisa com outras palavras. As erradas costumam usar palavras do texto com sentido trocado.`},
tfng:{name:'Vera / Malvera / Ne dirite', exam:'KER · Legado',how:`<b>Vera</b>: o texto diz a mesma coisa. <b>Malvera</b>: o texto diz o contrário. <b>Ne dirite</b>: o texto não diz, mesmo que pareça provável. O erro mais comum é usar o próprio conhecimento: responda só com o que está escrito. Desconfie de palavras como <i>ĉiuj, ĉiam, nur, neniam</i> na afirmação.`},
match:{name:'Kunigado', exam:'KER · Legado',how:`Aqui não se lê com calma: é leitura rápida. Leia as afirmações primeiro e sublinhe a ideia-chave de cada uma. Depois leia um texto de cada vez e marque as afirmações que ele responde. Cuidado com textos que mencionam o mesmo tema mas dizem outra coisa.`}
};
const EXAMS = [
{id:'mc-b1', type:'mc', lvl:'B1', minutes:15, title:'La kafejo de la lingvoj',
text:`<p>Antaŭ tri jaroj Mirela, rumana studentino en Liono, malfermis strangan kafejon. Ĉe ĉiu tablo estas flageto, kiu montras la lingvon de tiu tablo: la hispana, la germana, la japana… kaj ĉe la tablo apud la fenestro, Esperanto. La regulo estas simpla: kiu sidas ĉe tablo, devas paroli ties lingvon, eĉ se nur iomete.</p>
<p>«Komence mi pensis, ke venos nur studentoj», ŝi rakontas. «Sed baldaŭ aperis pensiuloj, turistoj, eĉ komercistoj, kiuj volis praktiki antaŭ vojaĝo.» Hodiaŭ la kafejo havas ĉirkaŭ tricent regulajn klientojn, kaj vendrede vespere oni devas atendi por trovi lokon.</p>
<p>La esperanta tablo havas apartan historion. Mirela mem ne parolis Esperanton, kiam ŝi malfermis la kafejon; ŝi aldonis la flageton nur post kiam maljuna kliento petis ĝin. «Li venis ĉiusemajne kaj sidis sola, ĝis alvenis du junaj ĉeĥoj, kiuj lernis la lingvon rete. Nun estas la plej brua tablo de la kafejo», ŝi diras ridante.</p>
<p>Ne ĉio estas facila. La enspezoj apenaŭ sufiĉas por pagi la lupagon, kaj Mirela laboras dek du horojn tage. Tamen ŝi ne pensas pri fermo. «Ĉi tie mi vidas homojn, kiuj timis paroli, fariĝi pli kuraĝaj. Tio valoras pli ol mono.»</p>`,
q:[
["Kio estas aparta en la kafejo de Mirela?",["Ĝi vendas nur rumanajn manĝaĵojn","Ĉiu tablo havas sian lingvon","Ĝi estas malfermita nur por studentoj","Oni ne rajtas paroli tie"],1,"«Ĉe ĉiu tablo estas flageto, kiu montras la lingvon de tiu tablo»."],
["Kiuj klientoj surprizis Mirelan?",["La studentoj","Pensiuloj, turistoj kaj komercistoj","Nur esperantistoj","La rumanoj"],1,"«Sed baldaŭ aperis pensiuloj, turistoj, eĉ komercistoj» — ela esperava só estudantes."],
["Kiel aperis la esperanta tablo?",["Mirela estas esperantistino","Maljuna kliento petis ĝin","Du ĉeĥoj fondis ĝin","Ĝi estis tie de la komenco"],1,"«ŝi aldonis la flageton nur post kiam maljuna kliento petis ĝin»."],
["Kio ŝanĝiĝis ĉe la esperanta tablo?",["Ĝi fariĝis la plej silenta","Ĝi fariĝis la plej brua","Oni forigis ĝin","Ĝi translokiĝis al la fenestro"],1,"«Nun estas la plej brua tablo de la kafejo»."],
["Kio estas la financa situacio?",["La kafejo gajnas multe","La enspezoj apenaŭ sufiĉas","Mirela vendos la kafejon","La lupago estas senpaga"],1,"«La enspezoj apenaŭ sufiĉas por pagi la lupagon» — apenaŭ = mal e mal."],
["Kial Mirela ne fermas la kafejon?",["Ĉar ŝi riĉiĝas","Ĉar ŝi vidas homojn fariĝi pli kuraĝaj","Ĉar la klientoj malpermesas","Ĉar ŝi ne havas alian laboron"],1,"«…homojn, kiuj timis paroli, fariĝi pli kuraĝaj. Tio valoras pli ol mono»."]
]},
{id:'tf-b1', type:'tfng', lvl:'B1', minutes:12, title:'La unuaj jaroj de Esperanto en Brazilo',
text:`<p>Esperanto alvenis en Brazilon komence de la dudeka jarcento, kiam kelkaj intelektuloj legis pri ĝi en eŭropaj revuoj. En 1906 aperis la unuaj kluboj: unu en Campinas, en la ŝtato San-Paŭlo, kaj alia en Rio-de-Ĵanejro, tiam la ĉefurbo de la lando.</p>
<p>La sekvan jaron, en julio 1907, grupo de entuziasmuloj fondis en Rio nacian ligon, por kunordigi la kursojn kaj la eldonadon de libroj. La organizo, kiu poste ricevis la nomon Brazila Esperanto-Ligo, ekeldonis ankaŭ revuon, «Brazila Esperantisto», kiu aperas ĝis hodiaŭ.</p>
<p>Dum la sekvaj jardekoj la movado kreskis precipe en la grandaj urboj. Multaj kursoj okazis en lernejoj kaj kluboj, kaj baldaŭ ankaŭ la spiritisma movado komencis subteni la lingvon. Tiu subteno daŭras ĝis nun kaj klarigas, parte, kial Brazilo hodiaŭ havas unu el la plej grandaj esperantistaj komunumoj de la mondo.</p>
<p>La brazilaj esperantistoj gastigis la Universalan Kongreson du fojojn: en Braziljo en 1981 kaj en Fortalezo en 2002. En ambaŭ okazoj venis pli ol mil kvarcent kongresanoj el multaj landoj.</p>`,
q:[
["La unuaj kluboj aperis en du malsamaj urboj.","T","Campinas kaj Rio-de-Ĵanejro."],
["En 1906 Rio-de-Ĵanejro estis la ĉefurbo de Brazilo.","T","«…en Rio-de-Ĵanejro, tiam la ĉefurbo de la lando»."],
["La nacia ligo estis fondita en San-Paŭlo.","F","Ĝi estis fondita en Rio."],
["La revuo «Brazila Esperantisto» ne plu aperas.","F","«…kiu aperas ĝis hodiaŭ»."],
["La unuaj brazilaj esperantistoj estis ĉefe instruistoj.","NG","O texto fala de «intelektuloj», mas não diz que eram professores."],
["La movado kreskis precipe en la kamparo.","F","«…precipe en la grandaj urboj»."],
["La spiritisma movado subtenas Esperanton ankoraŭ hodiaŭ.","T","«Tiu subteno daŭras ĝis nun»."],
["La kongreso en Fortalezo havis pli da partoprenantoj ol tiu en Braziljo.","NG","O texto diz só que ambos tiveram mais de 1.400; não compara."]
]},
{id:'mt-b1', type:'match', lvl:'B1', minutes:15, title:'Kiel mi lernas lingvojn',
sections:[
["A","Rafael, 29, flegisto",`<p>Mi lernas per serioj. Unue mi spektas kun subtekstoj en mia lingvo, poste kun subtekstoj en la lernata lingvo, kaj fine tute sen subtekstoj. Mi notas en kajero ĉiun esprimon, kiu plaĉas al mi, kaj mi uzas ĝin la saman tagon, eĉ se nur parolante al mia kato. Gramatikon mi preskaŭ neniam studas: mi lernas ĝin per la oreloj.</p>`],
["B","Sun, 41, inĝenierino",`<p>Mi bezonas strukturon. Ĉiumatene, antaŭ la laboro, mi faras duonhoron da gramatikaj ekzercoj, kaj mi uzas aplikaĵon kun kartoj por la vortoj. Mi konfesas, ke mi timas paroli: mi preferas skribi retmesaĝojn, ĉar tiel mi havas tempon por pensi. Mia celo estas trapasi oficialan ekzamenon la venontan jaron.</p>`],
["C","Teodoro, 63, emerita instruisto",`<p>Mi lernas per la piedoj! Tri aŭ kvar fojojn jare mi vojaĝas, ĉiam al lando, kies lingvon mi ne konas, kaj mi lernas la bazon surloke, babilante kun vendistoj kaj najbaroj. Mi faras multajn erarojn, sed la homoj ĉiam ĝojas, ke fremdulo provas paroli kun ili. Hejme mi preskaŭ neniam studas.</p>`],
["D","Lívia, 24, studentino",`<p>Mi lernas per legado. Mi komencis per bildstrioj, poste legis simpligitajn romanojn, kaj nun mi legas la originalojn. Kiam mi ne konas vorton, mi ne tuj serĉas ĝin: mi provas diveni ĝin el la kunteksto, kaj nur post la fino de la ĉapitro mi kontrolas en la vortaro. Mi ankaŭ tenas taglibron en la lingvo, kiun mi lernas.</p>`]
],
q:[
["Kiu ne tuj serĉas nekonatajn vortojn?",3,"Lívia: «mi ne tuj serĉas ĝin: mi provas diveni ĝin el la kunteksto»."],
["Kiu preferas skribi ol paroli?",1,"Sun: «mi timas paroli: mi preferas skribi retmesaĝojn»."],
["Kiu lernas la bazon de lingvo dum vojaĝoj?",2,"Teodoro: «mi lernas la bazon surloke»."],
["Kiu uzas novajn esprimojn ankoraŭ la saman tagon?",0,"Rafael: «mi uzas ĝin la saman tagon»."],
["Kiu havas konkretan ekzamenan celon?",1,"Sun: «trapasi oficialan ekzamenon la venontan jaron»."],
["Kiu diras, ke li preskaŭ ne studas gramatikon?",0,"Rafael: «Gramatikon mi preskaŭ neniam studas»."],
["Kiu ŝanĝis la tipon de legaĵoj laŭ sia progreso?",3,"Lívia: bildstrioj → simpligitaj romanoj → originaloj."],
["Kiu mencias, kiel la homoj reagas al liaj eraroj?",2,"Teodoro: «la homoj ĉiam ĝojas, ke fremdulo provas»."],
["Kiu studas ĉiutage je fiksa horo?",1,"Sun: «Ĉiumatene, antaŭ la laboro…»."],
["Kiu skribas personajn notojn en la lingvo, kiun ŝi lernas?",3,"Lívia: «Mi ankaŭ tenas taglibron en la lingvo, kiun mi lernas»."]
]},
{id:'mc-b2', type:'mc', lvl:'B2', minutes:18, title:'La lingvo, kiun neniu posedas',
text:`<p>Kiam oni demandas al esperantistoj, kial ili elektis lingvon, kiun parolas relative malmultaj homoj, la respondoj ofte surprizas. Malofte ili parolas pri praktikeco aŭ pri vojaĝoj. Pli ofte ili mencias sentojn: la plezuron de egaleco, la senton, ke en Esperanto neniu estas «hejme» pli ol la aliaj.</p>
<p>Lingvistoj, kiuj esploris la komunumon, rimarkis interesan fenomenon. Ĉar ĉiu parolanto lernis la lingvon konscie, la parolantoj emas esti pli toleremaj al eraroj ol la parolantoj de naciaj lingvoj. Denaska anglalingvano facile ridetas pri fremda akcento; esperantisto, kontraŭe, memoras la proprajn unuajn paŝojn kaj pacience atendas.</p>
<p>Tio tamen ne signifas, ke ĉio estas permesata. La komunumo havas fortan senton pri «bona lingvo», kaj publikaj diskutoj pri vortoj aŭ gramatikaj detaloj povas daŭri jarojn. Paradokse, la lingvo, kiun neniu posedas, havas multajn zorgemajn gardantojn.</p>
<p>Kritikantoj asertas, ke tia komunumo restas fermita en si mem: ĝi parolas pri internacia komunikado, sed ĉefe komunikas kun si. La esperantistoj respondas, ke ĉiu lingva komunumo estas iusence fermita, kaj ke la vera demando ne estas la grandeco de la komunumo, sed la kvalito de la rilatoj, kiujn ĝi ebligas.</p>`,
q:[
["Kion la esperantistoj plej ofte mencias, laŭ la teksto?",["Praktikajn avantaĝojn","Vojaĝojn","Sentojn de egaleco","Profesiajn ŝancojn"],2,"«Pli ofte ili mencias sentojn: la plezuron de egaleco…»."],
["Kial esperantistoj estas pli toleremaj al eraroj?",["Ĉar la lingvo ne havas regulojn","Ĉar ĉiuj lernis ĝin konscie kaj memoras siajn unuajn paŝojn","Ĉar ili ne komprenas la erarojn","Ĉar ili estas lingvistoj"],1,"«…memoras la proprajn unuajn paŝojn kaj pacience atendas»."],
["Kion signifas «ne ĉio estas permesata» en la tria alineo?",["Ke la komunumo ankaŭ zorgas pri la lingva kvalito","Ke oni malpermesas erarojn","Ke ekzistas leĝoj kontraŭ akcentoj","Ke la Akademio punas la parolantojn"],0,"Existe uma forte noção de «bona lingvo» e longas discussões."],
["Kio estas la «paradokso» menciita?",["La lingvo estas malnova sed moderna","Neniu posedas la lingvon, sed multaj gardas ĝin","La komunumo estas granda sed malgranda","La gramatiko estas facila sed malfacila"],1,"«…la lingvo, kiun neniu posedas, havas multajn zorgemajn gardantojn»."],
["Kion asertas la kritikantoj?",["Ke Esperanto estas tro facila","Ke la komunumo ĉefe komunikas kun si mem","Ke la lingvo ne havas literaturon","Ke la esperantistoj ne vojaĝas"],1,"«…ĝi parolas pri internacia komunikado, sed ĉefe komunikas kun si»."],
["Kiel la esperantistoj respondas al la kritiko?",["Ili konfesas, ke la kritiko pravas","Ili diras, ke gravas la kvalito de la rilatoj, ne la grandeco","Ili promesas kreskigi la komunumon","Ili ignoras ĝin"],1,"«…la vera demando ne estas la grandeco… sed la kvalito de la rilatoj»."]
]},
{id:'mt-b2', type:'match', lvl:'B2', minutes:15, title:'Kial mi lernis Esperanton',
sections:[
["A","Hiroko, 45, kuracistino",`<p>Mi komencis pro scivolemo, post kiam mi legis artikolon pri Zamenhof. Mi ne atendis, ke la lingvo ŝanĝos mian vivon. Sed en mia unua kongreso mi renkontis kolegojn el dek landoj, kaj hodiaŭ ni kune verkas fakajn artikolojn pri medicino. Mi ankoraŭ uzas la anglan en la laboro, sed la plej sinceraj diskutoj okazas en Esperanto.</p>`],
["B","Lucas, 23, studento",`<p>Por mi Esperanto estis ludo. Mi ŝatis konstrui vortojn kiel Lego-briketojn, kaj mi lernis la bazon en du semajnoj per aplikaĵo. Poste mi malkovris la muzikon: rokon, repon, eĉ metalon! Nun mi kantas en grupo, kiu kantas nur en Esperanto, kaj lastan someron ni ludis antaŭ kvincent homoj en Pollando.</p>`],
["C","Ana, 67, pensiulino",`<p>Mi lernis ĝin post la morto de mia edzo, kiam mi sentis min tre sola. Amikino kondukis min al la loka klubo. Mi ne estas bona pri lingvoj, kaj mi bezonis du jarojn por paroli flue. Sed la homoj estis tiel paciencaj! Hodiaŭ mi gastigas vojaĝantojn per Pasporta Servo, kaj mia domo neniam estas malplena.</p>`],
["D","Tomasz, 38, programisto",`<p>Mi venis al Esperanto per la teknologio: mi volis kontribui al malfermkoda projekto, kies dokumentado estis en Esperanto. La logiko de la gramatiko tuj plaĉis al mi; ĝi similas al programlingvo sen esceptoj. Mi neniam iris al kongreso, sed mi tradukis plurajn programojn kaj babilas ĉiutage en retaj grupoj.</p>`]
],
q:[
["Kiu lernis la lingvon tre rapide?",1,"Lucas: «mi lernis la bazon en du semajnoj»."],
["Kiu bezonis multan tempon por paroli flue?",2,"Ana: «mi bezonis du jarojn por paroli flue»."],
["Kiu uzas la lingvon profesie kun kolegoj?",0,"Hiroko verkas fakajn artikolojn kun kolegoj."],
["Kiu neniam partoprenis en kongreso?",3,"Tomasz: «Mi neniam iris al kongreso»."],
["Kiu komparas la gramatikon kun io teknika?",3,"Tomasz: «…similas al programlingvo sen esceptoj»."],
["Kiu komencis en malfacila persona momento?",2,"Ana: «…post la morto de mia edzo»."],
["Kiu prezentiĝis antaŭ granda publiko?",1,"Lucas: «…ni ludis antaŭ kvincent homoj»."],
["Kiu diras, ke la plej honestaj interparoloj okazas en Esperanto?",0,"Hiroko: «la plej sinceraj diskutoj okazas en Esperanto»."],
["Kiu nun regule ricevas gastojn hejme?",2,"Ana gastigas vojaĝantojn per Pasporta Servo."],
["Kiu malkovris la lingvon per artikolo?",0,"Hiroko: «post kiam mi legis artikolon pri Zamenhof»."]
]},
{id:'tf-b2', type:'tfng', lvl:'B2', minutes:14, title:'Labori de hejme: kvin jarojn poste',
text:`<p>Antaŭ kelkaj jaroj, labori de hejme estis privilegio de malmultaj. Hodiaŭ, en multaj oficejaj profesioj, ĝi fariĝis normala parto de la semajno. Tamen la unuaj entuziasmaj prognozoj, laŭ kiuj la oficejoj tute malaperos, ne realiĝis: la plimulto de la firmaoj elektis miksitan modelon, kun du aŭ tri tagoj hejme kaj la ceteraj en la oficejo.</p>
<p>Esploroj montras, ke la dungitoj aprezas precipe la ŝparitan tempon: kiu antaŭe pasigis unu horon tage en la trafiko, nun povas uzi ĝin por dormi, sporti aŭ prizorgi la familion. Ankaŭ la koncentriĝo ofte pliboniĝas, ĉar hejme estas malpli da interrompoj ol en granda malferma oficejo.</p>
<p>La malavantaĝoj tamen ne estas malgravaj. Multaj homoj plendas, ke la limo inter laboro kaj privata vivo malklariĝis: la komputilo restas sur la kuireja tablo, kaj la retmesaĝoj alvenas ankaŭ vespere. Junaj dungitoj, siaflanke, rakontas, ke ili lernas malpli rapide, ĉar ili ne plu povas observi siajn pli spertajn kolegojn.</p>
<p>Por la urboj la ŝanĝo havas neatenditajn sekvojn. En kelkaj centroj, kafejoj kaj restoracioj, kiuj vivis de la tagmanĝoj de oficistoj, devis fermiĝi. Aliflanke, la loĝkvartaloj fariĝis pli viglaj dum la tago. Neniu ankoraŭ scias, ĉu tiu ekvilibro daŭros, aŭ ĉu post kelkaj jaroj la pendolo denove svingiĝos al la oficejo.</p>`,
q:[
["Laŭ la teksto, la oficejoj tute malaperis.","F","«…la oficejoj tute malaperos, ne realiĝis»: as previsões não se confirmaram."],
["La plej multaj firmaoj kombinas laboron hejme kaj en la oficejo.","T","«la plimulto de la firmaoj elektis miksitan modelon»."],
["Labori de hejme kutime kunportas pli altan salajron.","NG","O texto não fala de salário."],
["Hejme oni ofte estas malpli interrompata ol en granda malferma oficejo.","T","«hejme estas malpli da interrompoj ol en granda malferma oficejo»."],
["Ĉiuj dungitoj preferus labori hejme kvin tagojn semajne.","NG","O texto fala do que as empresas escolheram, não do que todos os funcionários prefeririam. Desconfie de «ĉiuj»."],
["Junaj dungitoj lernas pli rapide, kiam ili laboras hejme.","F","«ili lernas malpli rapide»."],
["Kelkaj kafejoj en urbocentroj devis fermiĝi.","T","«kafejoj kaj restoracioj… devis fermiĝi»."],
["La aŭtoro certas, ke la homoj baldaŭ revenos al la oficejoj.","F","«Neniu ankoraŭ scias…»: o autor não tem certeza."]
]},
{id:'mc-b2b', type:'mc', lvl:'B2', minutes:18, title:'Kiam la urbo forpelis la aŭtojn',
text:`<p>Antaŭ ses jaroj la urbestraro de mezgranda eŭropa urbo prenis decidon, kiun multaj loĝantoj tiam nomis frenezo: ĝi malpermesis la privatajn aŭtojn en la tuta historia centro. Komercistoj protestis, ĉar ili timis perdi siajn klientojn, kaj la loka gazeto publikigis ĉefartikolon kun la titolo «La morto de la centro».</p>
<p>La unuaj monatoj ŝajnis doni al ili pravon. La vendoj falis, kaj kelkaj vendejoj fermiĝis. Sed la urbestraro ne cedis. Ĝi plilarĝigis la trotuarojn, plantis arbojn, aldonis benkojn kaj regule organizis bazarojn kaj koncertojn en la liberigitaj placoj. Samtempe ĝi pliigis la nombron de busoj kaj kreis sekurajn vojojn por biciklantoj.</p>
<p>Post du jaroj la situacio renversiĝis. Laŭ la statistikoj de la urbo, la nombro de piedirantoj en la centro duobliĝis, kaj la vendoj ne nur revenis al la antaŭa nivelo, sed eĉ superis ĝin. Familioj, kiuj antaŭe evitis la bruajn stratojn, nun pasigas tie siajn semajnfinojn. Eĉ la gazeto, kiu antaŭdiris la morton de la centro, publikigis artikolon kun la titolo «Ni eraris».</p>
<p>Tamen ne ĉiuj estas kontentaj. Maljunuloj kaj homoj, kiuj malfacile marŝas, plendas, ke fariĝis pli komplike atingi la kuraciston aŭ la apotekon. La lupagoj en la centro rapide altiĝis, kaj kelkaj familioj devis translokiĝi al la periferio, de kie ili nun… veturas per aŭto. Ĉiu sukceso havas sian prezon, konkludas urbanisto, kiun ni intervjuis: «La demando ne estas, ĉu ŝanĝi, sed kiel protekti tiujn, kiuj pagas la kostojn de la ŝanĝo.»</p>`,
q:[
["Kiel multaj loĝantoj reagis al la decido komence?",["Ili tuj aprobis ĝin","Ili konsideris ĝin freneza","Ili ne interesiĝis pri ĝi","Ili postulis pli da parkejoj"],1,"«…decidon, kiun multaj loĝantoj tiam nomis frenezo»."],
["Kio okazis dum la unuaj monatoj?",["La vendoj kreskis","La vendoj malkreskis kaj kelkaj vendejoj fermiĝis","La urbestraro nuligis la decidon","La gazeto ŝanĝis sian opinion"],1,"«La vendoj falis, kaj kelkaj vendejoj fermiĝis»."],
["Kion faris la urbestraro por igi la centron alloga?",["Ĝi malaltigis la impostojn","Ĝi plibeligis la publikan spacon kaj plibonigis la publikan transporton","Ĝi konstruis grandan parkejon","Ĝi malpermesis la busojn"],1,"Calçadas, árvores, bancos, feiras, mais ônibus e ciclovias."],
["Kion signifas «la situacio renversiĝis»?",["La situacio fariĝis la malo de la komenca","La situacio restis la sama","La situacio iomete malboniĝis","La urbo forigis la regulon"],0,"renversiĝi = virar do avesso, inverter-se."],
["Kial la titolo «Ni eraris» estas ironia?",["Ĉar la gazeto neniam eraras","Ĉar ĝi venas de la sama gazeto, kiu antaŭdiris la morton de la centro","Ĉar la urbestro verkis ĝin","Ĉar la vendoj ja falis"],1,"O mesmo jornal que tinha anunciado «a morte do centro»."],
["Kio estas la ĉefa ideo de la lasta alineo?",["La ŝanĝo estis tute malsukcesa","Ĉiu sukcesa ŝanĝo havas kostojn, kaj necesas protekti tiujn, kiuj pagas ilin","La aŭtoj devas reveni al la centro","La lupagoj ne gravas"],1,"«…kiel protekti tiujn, kiuj pagas la kostojn de la ŝanĝo»."]
]}

];
