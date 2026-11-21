/* ───────── RADIKOJ: radikoj laŭ utileco, kun derivaĵoj ─────────
   linio: vorto (radiko/finaĵo) | pt | derivaĵo=pt; derivaĵo=pt */
const RAD_GROUPS = [
{t:'Bazo', lvl:'A1', s:`
kaj|e
sed|mas
aŭ|ou
ĉar|porque
se|se (condição)
ke|que (conjunção)
ĉu|partícula de pergunta; se (indireto)
ne|não
jes|sim
ankaŭ|também
tre|muito (intensidade)
tro|demais
nur|só, apenas
jam|já
ankoraŭ|ainda|ankoraŭ ne=ainda não
nun|agora|nuna=atual
hodiaŭ|hoje|hodiaŭa=de hoje
hieraŭ|ontem
morgaŭ|amanhã
baldaŭ|logo, em breve
tuj|imediatamente
eĉ|até, mesmo
do|então, portanto
tamen|porém, mesmo assim
ja|de fato, bem que (ênfase)
plu|mais, adiante (continuação)|ne plu=não mais
pli|mais (comparação)|plej=o mais
ol|que (comparação)
preskaŭ|quase
almenaŭ|pelo menos
apenaŭ|mal, quase não
nek|nem|nek… nek…=nem… nem…
kvankam|embora
kvazaŭ|como se
ambaŭ|ambos
ĉi|perto (aproxima)|ĉi tie=aqui; ĉi tiu=este
en|em, dentro de
al|para, a
de|de, desde
el|de dentro de, feito de
kun|com (companhia)
sen|sem|senpaga=gratuito
per|com, por meio de
por|para (finalidade)
pro|por causa de
pri|sobre, a respeito de
sur|sobre, em cima de
sub|sob, embaixo de
super|acima de
apud|ao lado de
antaŭ|antes de, diante de|antaŭe=antes; antaŭen=para a frente
post|depois de, atrás de|poste=depois
inter|entre
ĉe|junto a, na casa de
ĉirkaŭ|ao redor de; cerca de
ĝis|até|Ĝis!=Tchau!
dum|durante; enquanto
tra|através de
trans|do outro lado de
laŭ|segundo, ao longo de
kontraŭ|contra|kontraŭa=oposto
krom|além de, exceto
anstataŭ|em vez de|anstataŭi=substituir
ekster|fora de|ekstere=lá fora
je|preposição curinga (horas, medida)
da|de (depois de quantidade)
est/i|ser, estar|estaĵo=ser, criatura; estonteco=futuro
hav/i|ter|havaĵo=bens
far/i|fazer|fariĝi=tornar-se; faro=ato
ir/i|ir|eliri=sair; eniri=entrar; foriri=ir embora
ven/i|vir|reveni=voltar; alveni=chegar; bonvenon=bem-vindo
dir/i|dizer|diro=dito
pov/i|poder|povo=poder; povas esti=pode ser
vol/i|querer|volo=vontade; bonvolu=por favor
dev/i|dever, ter que|devo=obrigação
sci/i|saber|scio=conhecimento
kon/i|conhecer|konato=conhecido; konatiĝi=conhecer-se
vid/i|ver|revidi=rever; vidinda=que vale a pena ver
aŭd/i|ouvir|aŭdebla=audível
parol/i|falar|parolanto=falante; parolado=discurso
leg/i|ler|leganto=leitor; legebla=legível
skrib/i|escrever|skribilo=caneta; priskribi=descrever
lern/i|aprender|lernejo=escola; lernanto=aluno
labor/i|trabalhar|laboristo=operário; laborejo=local de trabalho
manĝ/i|comer|manĝaĵo=comida; manĝejo=refeitório
trink/i|beber|trinkaĵo=bebida
dorm/i|dormir|ekdormi=adormecer; dormoĉambro=quarto
loĝ/i|morar|loĝejo=moradia; loĝanto=morador
dom/o|casa (prédio)|dometo=casinha
hejm/o|lar, casa|hejme=em casa; hejmen=para casa
famili/o|família|familiano=membro da família
patr/o|pai|patrino=mãe; gepatroj=pais
frat/o|irmão|fratino=irmã; gefratoj=irmãos
fil/o|filho|filino=filha
edz/o|marido|edzino=esposa; geedzoj=casal
infan/o|criança|infaneco=infância
hom/o|ser humano, pessoa|homaro=humanidade; homa=humano
vir/o|homem|virino=mulher
amik/o|amigo|amikino=amiga; amikeco=amizade
nom/o|nome|nomiĝi=chamar-se; nomi=nomear
tag/o|dia|ĉiutage=todo dia; tagmezo=meio-dia
nokt/o|noite|nokte=à noite; noktomezo=meia-noite
maten/o|manhã|matene=de manhã; matenmanĝo=café da manhã
vesper/o|fim de tarde, noite|vespere=à noite; vespermanĝo=jantar
semajn/o|semana|semajnfino=fim de semana
monat/o|mês|ĉiumonate=todo mês
jar/o|ano|jarcento=século; ĉiujare=todo ano
hor/o|hora|horloĝo=relógio
temp/o|tempo (duração)|samtempe=ao mesmo tempo
foj/o|vez|unufoje=uma vez; kelkfoje=às vezes
lok/o|lugar|loka=local; lokigi=colocar
land/o|país|landano=compatriota
urb/o|cidade|urbestro=prefeito; urbano=cidadão
strat/o|rua
lingv/o|língua, idioma|lingvisto=linguista
vort/o|palavra|vortaro=dicionário
libr/o|livro|librejo=livraria
akv/o|água
pan/o|pão|panisto=padeiro
kaf/o|café|kafejo=cafeteria
te/o|chá
mon/o|dinheiro|monujo=carteira
aŭt/o|carro
voj/o|caminho|vojaĝi=viajar; vojaĝanto=viajante
ĉambr/o|quarto, cômodo|banĉambro=banheiro
tabl/o|mesa
seĝ/o|cadeira
pord/o|porta
fenestr/o|janela
lit/o|cama|enlitiĝi=deitar-se; ellitiĝi=levantar-se
kuir/i|cozinhar|kuirejo=cozinha; kuiristo=cozinheiro
bon/a|bom|bone=bem; malbona=ruim; boneco=bondade
bel/a|bonito, belo|malbela=feio; beleco=beleza
grand/a|grande|malgranda=pequeno; grandeco=tamanho
nov/a|novo|malnova=velho, antigo; novaĵo=notícia
jun/a|jovem|junulo=jovem (pessoa); maljuna=idoso
long/a|comprido, longo|mallonga=curto; longeco=comprimento
facil/a|fácil|malfacila=difícil; faciligi=facilitar
varm/a|quente|malvarma=frio; varmega=muito quente
feliĉ/a|feliz|malfeliĉa=infeliz; feliĉo=felicidade
rapid/a|rápido|malrapida=lento; rapidi=apressar-se
mult/a|muito (quantidade)|multe=muito; malmultaj=poucos
sam/a|mesmo, igual|same=igualmente
tut/a|todo, inteiro|tute=totalmente
ali/a|outro|alie=de outro modo; aliloke=em outro lugar
propr/a|próprio
plen/a|cheio|malplena=vazio; plenumi=cumprir
ver/a|verdadeiro|vere=realmente; vero=verdade
cert/a|certo, seguro|certe=certamente; necerta=incerto
grav/a|importante|gravi=importar
kar/a|querido; caro
ŝat/i|gostar de|ŝatata=preferido; ŝatokupo=hobby
am/i|amar|amo=amor; enamiĝi=apaixonar-se
dank/i|agradecer|dankon=obrigado(a); danka=grato
pet/i|pedir|peto=pedido; mi petas=por favor
demand/i|perguntar|demando=pergunta
respond/i|responder|respondo=resposta
komenc/i|começar (algo)|komenciĝi=começar (sozinho); komencanto=iniciante
fin/i|terminar (algo)|finiĝi=terminar (sozinho); fine=finalmente
sid/i|estar sentado|sidiĝi=sentar-se
star/i|estar de pé|stariĝi=levantar-se
ripoz/i|descansar|ripozo=descanso
atend/i|esperar, aguardar
help/i|ajudar|helpo=ajuda
trov/i|encontrar, achar|troviĝi=encontrar-se, ficar situado
serĉ/i|procurar
pren/i|pegar, tomar
don/i|dar|donaco=presente; redoni=devolver
met/i|pôr, colocar|surmeti=vestir
port/i|carregar; usar (roupa)|alporti=trazer; forporti=levar embora
aĉet/i|comprar|aĉetanto=comprador
pag/i|pagar|pago=pagamento; senpaga=gratuito
kost/i|custar|multekosta=caro; malmultekosta=barato
vend/i|vender|vendejo=loja
rigard/i|olhar|rigardo=olhar
kompren/i|entender|komprenebla=compreensível; kompreneble=claro, naturalmente
pens/i|pensar|penso=pensamento; pripensi=refletir sobre
kred/i|acreditar|kredebla=crível
memor/i|lembrar|memoro=memória; rememori=recordar
forges/i|esquecer
viv/i|viver|vivo=vida; vivanta=vivo
mort/i|morrer|morto=morte; mortigi=matar
nask/i|dar à luz|naskiĝi=nascer; naskiĝtago=aniversário
kant/i|cantar|kanto=canção; kantisto=cantor
lud/i|jogar; tocar (instrumento)|ludo=jogo; ludilo=brinquedo
promen/i|passear|promeno=passeio
kur/i|correr
naĝ/i|nadar|naĝejo=piscina
lav/i|lavar|lavujo=pia
vek/i|acordar (alguém)|vekiĝi=acordar; vekhorloĝo=despertador
uz/i|usar|uzanto=usuário; uzebla=utilizável
bezon/i|precisar de|bezono=necessidade
okaz/i|acontecer|okazo=ocasião; okazaĵo=acontecimento
ŝanĝ/i|mudar (algo)|ŝanĝiĝi=mudar
send/i|enviar
ricev/i|receber
telefon/i|telefonar|telefono=telefone; poŝtelefono=celular
manier/o|maneira
afer/o|coisa, assunto
person/o|pessoa
mond/o|mundo|tutmonda=mundial
sun/o|sol|sune=ensolarado
pluv/i|chover|pluvo=chuva; pluvombrelo=guarda-chuva
fiŝ/o|peixe|fiŝi=pescar
viand/o|carne
frukt/o|fruta
pom/o|maçã|terpomo=batata
lakt/o|leite
ov/o|ovo
suker/o|açúcar
sal/o|sal
glas/o|copo
tas/o|xícara
botel/o|garrafa
kurs/o|curso
klas/o|turma, classe
instru/i|ensinar|instruisto=professor
stud/i|estudar|studento=estudante
ekzamen/o|exame|ekzameni=examinar
ĉef/a|principal|ĉefo=chefe; ĉefurbo=capital
nombr/o|número (quantidade)|nombri=contar
part/o|parte|partopreni=participar
kolor/o|cor|kolora=colorido
ruĝ/a|vermelho|ruĝiĝi=corar
verd/a|verde
blu/a|azul
blank/a|branco
nigr/a|preto
flav/a|amarelo
alt/a|alto|malalta=baixo; alteco=altura
proksim/a|próximo|proksime=perto; malproksime=longe
dekstr/a|direito (lado)|dekstre=à direita; maldekstre=à esquerda
supr/e|em cima|supren=para cima; malsupre=embaixo
interes/i|interessar|interesa=interessante; interesiĝi=interessar-se
ŝajn/i|parecer|ŝajne=aparentemente
plaĉ/i|agradar|plaĉa=agradável
dolor/i|doer|doloro=dor
san/a|saudável|malsana=doente; sano=saúde; malsanulejo=hospital
lac/a|cansado|laciĝi=cansar-se; laciga=cansativo
sat/a|satisfeito (de comida)|malsata=com fome; satiĝi=saciar-se
soif/i|ter sede|soifa=com sede
vest/i|vestir|vesto=roupa; vestiĝi=vestir-se
ŝu/o|sapato
kap/o|cabeça|kapdoloro=dor de cabeça
man/o|mão|mansako=bolsa
pied/o|pé|piede=a pé
okul/o|olho|okulvitroj=óculos
kor/o|coração|kore=de coração
korp/o|corpo
voĉ/o|voz|laŭtvoĉe=em voz alta
vizaĝ/o|rosto
har/o|cabelo
bild/o|imagem, quadro|bildstrio=quadrinhos
fot/o|foto|foti=fotografar
film/o|filme
muzik/o|música|muzikisto=músico
best/o|animal
hund/o|cachorro
kat/o|gato
bird/o|pássaro
arb/o|árvore|arbaro=floresta
flor/o|flor|flori=florescer
mar/o|mar|marbordo=litoral
river/o|rio
mont/o|montanha|montaro=cordilheira
ter/o|terra; chão|Tero=a Terra
ĉiel/o|céu
lum/o|luz|lumigi=iluminar
salut/i|cumprimentar|saluton=oi
prez/o|preço
ferm/i|fechar|malfermi=abrir; fermita=fechado
ŝlos/i|trancar|ŝlosilo=chave
klub/o|clube|klubano=sócio
grup/o|grupo
traduk/i|traduzir|traduko=tradução; tradukisto=tradutor
signif/i|significar|signifo=significado
ekzempl/o|exemplo|ekzemple=por exemplo
problem/o|problema
ide/o|ideia
plan/o|plano|plani=planejar
dezir/i|desejar|deziro=desejo
esper/i|esperar (ter esperança)|espero=esperança
tim/i|ter medo|timo=medo; timema=tímido
ĝoj/i|alegrar-se|ĝojo=alegria; ĝoja=alegre
rid/i|rir|rideti=sorrir; ridinda=ridículo
plor/i|chorar
koler/a|zangado|koleri=zangar-se; kolero=raiva
trankvil/a|tranquilo|trankviligi=acalmar
gaj/a|alegre
afabl/a|gentil, amável
ĝust/a|correto, exato|ĝuste=exatamente
erar/i|errar|eraro=erro; erara=errado
stel/o|estrela
`},
{t:'Ĉiutago', lvl:'A2', s:`
akcept/i|aceitar; receber|akcepto=recepção
aĝ/o|idade|aĝa=idoso; plenaĝa=adulto
aer/o|ar
amuz/i|divertir|amuza=divertido; amuziĝi=divertir-se
apart/a|separado, especial|aparte=especialmente
aper/i|aparecer|malaperi=desaparecer
aranĝ/i|arrumar, organizar|aranĝo=evento
art/o|arte|artisto=artista
aŭtun/o|outono
somer/o|verão
vintr/o|inverno
printemp/o|primavera
av/o|avô|avino=avó; praavo=bisavô
baz/o|base|baza=básico
ban/i|banhar|banĉambro=banheiro
bank/o|banco (instituição)
bilet/o|bilhete, ingresso
blov/i|soprar
boat/o|barco
bord/o|borda, margem
brak/o|braço
krur/o|perna
fingr/o|dedo
dors/o|costas
ventr/o|barriga
buŝ/o|boca
naz/o|nariz
orel/o|orelha
dent/o|dente|dentisto=dentista
sang/o|sangue
haŭt/o|pele
genu/o|joelho
bru/o|barulho|brua=barulhento
butik/o|loja
bus/o|ônibus
trajn/o|trem
stacidom/o|estação de trem
haven/o|porto|flughaveno=aeroporto
flug/i|voar|flugo=voo; flugilo=asa
vetur/i|andar (de veículo)|veturilo=veículo
ĉemiz/o|camisa
pantalon/o|calça
rob/o|vestido
mantel/o|casaco
ĉapel/o|chapéu
ŝtrump/o|meia
ombrel/o|guarda-chuva
ĉeval/o|cavalo
ĉokolad/o|chocolate
daŭr/i|durar|daŭrigi=continuar (algo); daŭre=continuamente
decid/i|decidir|decido=decisão
direkt/o|direção|direkti=dirigir
diskut/i|discutir|diskuto=discussão
dolĉ/a|doce|dolĉaĵo=doce (comida)
duŝ/i|tomar banho de chuveiro|duŝo=chuveiro
ebl/a|possível|eble=talvez; neebla=impossível; ebligi=possibilitar
ekzist/i|existir
fakt/o|fato|fakte=na verdade
fal/i|cair|falo=queda
fam/a|famoso|famo=fama
fart/i|passar (de saúde)|Kiel vi fartas?=Como vai?
fest/i|festejar|festo=festa
flank/o|lado|flanke=ao lado
fond/i|fundar|fondinto=fundador
fort/a|forte|malforta=fraco; forto=força
frap/i|bater
fraz/o|frase
freŝ/a|fresco
fromaĝ/o|queijo
buter/o|manteiga
riz/o|arroz
fazeol/o|feijão
legom/o|legume, verdura
salat/o|salada
sup/o|sopa
kuk/o|bolo
kaĉ/o|mingau
oranĝ/o|laranja
banan/o|banana
vinber/o|uva
citron/o|limão
cep/o|cebola
ajl/o|alho
pipr/o|pimenta
ole/o|óleo
vin/o|vinho
bier/o|cerveja
fru/e|cedo|frua=precoce; malfrue=tarde
fum/i|fumar|fumo=fumaça
gast/o|hóspede, convidado|gastiganto=anfitrião; gasti=hospedar-se
gazet/o|jornal, revista|gazetaro=imprensa
gust/o|gosto, sabor|bongusta=gostoso
gvid/i|guiar|gvidanto=guia, líder
halt/i|parar|haltejo=ponto (de ônibus)
hel/a|claro, luminoso|malhela=escuro
histori/o|história|historia=histórico
hotel/o|hotel
humor/o|humor|bonhumora=bem-humorado
invit/i|convidar|invito=convite
ĵet/i|jogar, lançar|forĵeti=jogar fora
ĵus|acabou de, há pouco
ĵurnal/o|jornal|ĵurnalisto=jornalista
kaŝ/i|esconder|kaŝiĝi=esconder-se
kamp/o|campo|kamparo=interior, zona rural
kapabl/a|capaz|kapablo=capacidade
kaŭz/i|causar|kaŭzo=causa
kelk/aj|alguns|kelkfoje=às vezes
klar/a|claro (compreensível)|klarigi=explicar; klarigo=explicação
knab/o|menino|knabino=menina
kolekt/i|colecionar, juntar|kolekto=coleção
komput/i|computar|komputilo=computador
komun/a|comum|komune=em comum; komunumo=comunidade
konsil/i|aconselhar|konsilo=conselho
konstru/i|construir|konstruaĵo=edifício
kontent/a|contente, satisfeito|malkontenta=insatisfeito
kovr/i|cobrir|malkovri=descobrir; kovrilo=cobertor, tampa
kruc/o|cruz|krucvojo=cruzamento
kuler/o|colher
fork/o|garfo
teler/o|prato (louça)
pot/o|panela
fridujo|geladeira
forn/o|forno
kurac/i|tratar (doente)|kuracisto=médico; kuracilo=remédio
kurten/o|cortina
kuŝ/i|estar deitado|kuŝiĝi=deitar-se
kusen/o|travesseiro, almofada
mur/o|parede, muro
tegment/o|telhado
plank/o|chão (piso)
ŝtup/o|degrau|ŝtuparo=escada
lag/o|lago
lamp/o|lâmpada, luminária
las/i|deixar|forlasi=abandonar
laŭt/a|alto (som)|laŭte=em voz alta; mallaŭte=baixinho
leter/o|carta
lev/i|levantar (algo)|leviĝi=levantar-se
lig/i|ligar, atar|ligo=liga, ligação; ligilo=link
list/o|lista
lun/o|lua
mank/i|faltar|manko=falta
map/o|mapa
merkat/o|mercado|supermerkato=supermercado
mez/o|meio|meza=médio
minut/o|minuto
mir/i|admirar-se|mirinda=maravilhoso
mov/i|mover|moviĝi=mover-se
naci/o|nação|nacia=nacional; internacia=internacional
neces/a|necessário|necesas=é preciso
neĝ/i|nevar|neĝo=neve
nub/o|nuvem
numer/o|número (de ordem)
objekt/o|objeto
odor/i|cheirar (exalar)|odoro=cheiro
ofic/o|cargo|oficejo=escritório; oficisto=funcionário
okup/i|ocupar|okupita=ocupado; okupiĝi=ocupar-se
ord/o|ordem|ordigi=arrumar
organiz/i|organizar|organizo=organização
pac/o|paz
paĝ/o|página
pak/i|embalar, fazer a mala|pakaĵo=pacote
pal/a|pálido
paper/o|papel
park/o|parque|parkumi=estacionar
pas/i|passar|pasinta=passado; pasigi=passar (o tempo)
paŝ/i|dar passos|paŝo=passo
pen/i|esforçar-se|peno=esforço
pez/a|pesado|malpeza=leve; pezo=peso
pilk/o|bola
plaĝ/o|praia
plad/o|prato (comida)
poŝ/o|bolso|poŝtelefono=celular
poŝt/o|correio|retpoŝto=e-mail
prefer/i|preferir
prepar/i|preparar
pret/a|pronto|pretigi=aprontar
prezent/i|apresentar|prezentiĝi=apresentar-se
produkt/i|produzir|produkto=produto
profesi/o|profissão
propon/i|propor|propono=proposta
publik/a|público|publiko=o público; publikigi=publicar
pur/a|limpo|purigi=limpar; malpura=sujo
rakont/i|contar, narrar|rakonto=história, conto
reg/i|governar, dominar|registaro=governo
rekt/a|reto, direto|rekte=diretamente
renkont/i|encontrar (alguém)|renkontiĝo=encontro
rest/i|ficar, permanecer|restaĵo=resto
ret/o|rede|reta=online; retejo=site
riĉ/a|rico|malriĉa=pobre; riĉaĵo=riqueza
rimark/i|notar, perceber|rimarko=observação
ripet/i|repetir
rok/o|rocha
romp/i|quebrar|rompita=quebrado
salon/o|sala
salt/i|pular
sak/o|saco, bolsa
sek/a|seco|sekigi=secar
sekv/i|seguir|sekva=seguinte; sekve=por conseguinte
sent/i|sentir|sento=sentimento; sentiĝi=sentir-se
serioz/a|sério
silent/i|calar-se|silenta=silencioso
simil/a|parecido|simili=parecer-se
simpl/a|simples
skatol/o|caixa
sol/a|sozinho, único|sole=somente
son/i|soar|sono=som
spac/o|espaço
special/a|especial
spekt/i|assistir (espetáculo)|spektaklo=espetáculo; spektanto=espectador
sport/o|esporte
ŝtat/o|estado (país)
strang/a|estranho
sukces/i|ter sucesso|sukceso=sucesso
supoz/i|supor
sufiĉ/a|suficiente|sufiĉi=bastar
ŝanc/o|chance
ŝerc/i|brincar, gracejar|ŝerco=piada
ŝip/o|navio
ŝir/i|rasgar
ŝtel/i|roubar|ŝtelisto=ladrão
ŝton/o|pedra
tajp/i|digitar
teatr/o|teatro|teatraĵo=peça
ten/i|segurar
tir/i|puxar
tranĉ/i|cortar|tranĉilo=faca
turist/o|turista
universitat/o|universidade
util/a|útil|senutila=inútil; utilo=utilidade
valiz/o|mala
valor/o|valor|valori=valer
vent/o|vento
vizit/i|visitar|vizito=visita
vitr/o|vidro|vitra=de vidro
vok/i|chamar|voko=chamada
zorg/i|cuidar, preocupar-se|zorgo=preocupação; prizorgi=cuidar de
sap/o|sabão
kuz/o|primo|kuzino=prima
nev/o|sobrinho|nevino=sobrinha
onkl/o|tio|onklino=tia
nep/o|neto|nepino=neta
najbar/o|vizinho
koleg/o|colega
estr/o|chefe|urbestro=prefeito
ŝofor/o|motorista
polic/o|polícia|policano=policial
advokat/o|advogado
inĝenier/o|engenheiro
program/o|programa|programisto=programador
`},
{t:'Konstrui', lvl:'A2–B1', s:`
adres/o|endereço
agrabl/a|agradável|malagrabla=desagradável
akir/i|adquirir
aktiv/a|ativo
akurat/a|pontual
amas/o|monte, multidão
angul/o|canto, ângulo
anonc/i|anunciar|anonco=anúncio
apog/i|apoiar
aplik/i|aplicar|aplikaĵo=aplicativo
argument/o|argumento
asert/i|afirmar
atent/a|atento|atenti=prestar atenção; atentu!=cuidado!
atest/i|atestar|atestilo=certificado
aŭtor/o|autor
avantaĝ/o|vantagem|malavantaĝo=desvantagem
avert/i|avisar, advertir
bedaŭr/i|lamentar|bedaŭrinde=infelizmente
bat/i|bater
batal/i|lutar|batalo=batalha
bind/i|encadernar|bindisto=encadernador
blind/a|cego
brul/i|queimar (arder)|bruligi=queimar (algo)
cel/o|objetivo, alvo|celi=visar
ĉes/i|parar, cessar|senĉese=sem parar
defend/i|defender
defi/i|desafiar|defio=desafio
detal/o|detalhe|detale=em detalhe
detru/i|destruir
difekt/i|danificar
diferenc/o|diferença|diferenci=diferir
divid/i|dividir
dokument/o|documento
dub/i|duvidar|dubo=dúvida; sendube=sem dúvida
eduk/i|educar|eduko=educação
efik/i|ter efeito|efika=eficaz
egal/a|igual|egaleco=igualdade; egale=tanto faz
ekonomi/o|economia
eldon/i|publicar, editar|eldonejo=editora; eldono=edição
elekt/i|escolher|elekto=escolha, eleição
energi/o|energia
enhav/i|conter|enhavo=conteúdo
esplor/i|pesquisar, explorar|esploristo=pesquisador
esprim/i|expressar|esprimo=expressão
evident/a|evidente
evit/i|evitar
evolu/i|evoluir
fak/o|área, especialidade|faka=técnico
fid/i|confiar|fidinda=confiável
fier/a|orgulhoso
fiks/i|fixar
fleg/i|cuidar (de doente)|flegisto=enfermeiro
form/o|forma|formi=formar
fraŭl/o|solteiro
fremd/a|estrangeiro, estranho|fremdulo=estrangeiro
funkci/i|funcionar|funkcio=função
gajn/i|ganhar|gajno=lucro
gard/i|guardar, proteger|gardisto=guarda
glu/i|colar|gluo=cola
honest/a|honesto
hont/i|ter vergonha|honto=vergonha
imag/i|imaginar|imago=imaginação
impres/o|impressão
inform/i|informar|informo=informação
inteligent/a|inteligente
intenc/i|pretender|intenco=intenção
invent/i|inventar
juĝ/i|julgar|juĝisto=juiz
just/a|justo|maljusta=injusto
kalkul/i|calcular|kalkulo=conta
kapt/i|capturar, pegar
karier/o|carreira
klopod/i|tentar, esforçar-se
komerc/o|comércio|komercisto=comerciante
kompar/i|comparar|komparo=comparação
kompat/i|ter pena|kompatinda=coitado
komplik/a|complicado
komunik/i|comunicar|komunikado=comunicação
koncern/i|dizer respeito a
kondiĉ/o|condição
konduk/i|conduzir, levar (alguém)
kondut/i|comportar-se|konduto=comportamento
konfes/i|confessar
konkur/i|competir|konkurso=concurso
konsent/i|concordar|malkonsenti=discordar
konserv/i|conservar, guardar
konsider/i|considerar
konsist/i|consistir
konstat/i|constatar
kontakt/o|contato
kontrol/i|controlar, verificar
konvink/i|convencer
kopi/o|cópia
korekt/i|corrigir|korekta=correto
kre/i|criar|kreiva=criativo
kresk/i|crescer|kreskigi=fazer crescer
kriz/o|crise
kritik/i|criticar|kritiko=crítica
kri/i|gritar|krio=grito
kulp/a|culpado|kulpo=culpa
kultur/o|cultura
kuraĝ/a|corajoso|kuraĝo=coragem
kutim/o|costume|kutime=normalmente; kutimi=costumar
kvalit/o|qualidade
leĝ/o|lei
liber/a|livre|libereco=liberdade; liberigi=libertar
lim/o|limite, fronteira|limigi=limitar
logik/a|lógico
lu/i|alugar|lupago=aluguel
majstr/o|mestre
material/o|material
medicin/o|medicina
medi/o|meio ambiente
mensog/i|mentir|mensogo=mentira
merit/i|merecer
mesaĝ/o|mensagem
metod/o|método
mezur/i|medir|mezuro=medida
milit/o|guerra
mister/o|mistério|mistera=misterioso
modern/a|moderno
moment/o|momento
natur/o|natureza|nature=naturalmente
normal/a|normal
not/i|anotar|noto=nota
nutr/i|nutrir|nutraĵo=alimento
obe/i|obedecer
opini/i|opinar, achar|opinio=opinião
oportun/a|conveniente
ordinar/a|comum, ordinário
pacienc/a|paciente
pardon/i|perdoar|pardonu=desculpe
perd/i|perder|perdiĝi=perder-se
perfekt/a|perfeito
permes/i|permitir|malpermesi=proibir
plend/i|reclamar|plendo=reclamação
plezur/o|prazer
popol/o|povo|populara=popular
posed/i|possuir
postul/i|exigir
praktik/a|prático|praktiki=praticar
precip/e|principalmente
preciz/a|preciso
prem/i|apertar|premo=pressão
premi/o|prêmio
pres/i|imprimir|presilo=impressora
prezid/i|presidir|prezidanto=presidente
princip/o|princípio
progres/i|progredir
projekt/o|projeto
promes/i|prometer|promeso=promessa
protekt/i|proteger
prov/i|tentar, provar|provo=tentativa
pruv/i|provar (demonstrar)|pruvo=prova
pun/i|punir|puno=castigo
rajt/i|ter o direito|rajto=direito
reag/i|reagir
real/a|real|realigi=realizar
recept/o|receita
regul/o|regra|regula=regular
rekomend/i|recomendar
rekon/i|reconhecer
rezult/i|resultar|rezulto=resultado
rilat/i|relacionar-se|rilato=relação
risk/i|arriscar|risko=risco
rol/o|papel (função)
sav/i|salvar|savo=salvamento
scienc/o|ciência|sciencisto=cientista
sekret/o|segredo|sekreta=secreto
sekur/a|seguro (sem perigo)|sekureco=segurança
senc/o|sentido|senca=sensato
serv/i|servir|servo=serviço
sign/o|sinal
situaci/o|situação
soci/o|sociedade|socia=social
solv/i|resolver|solvo=solução
spert/a|experiente|sperto=experiência
spirit/o|espírito
stat/o|estado (condição)
subten/i|apoiar|subteno=apoio
sufer/i|sofrer
sugest/i|sugerir
surpriz/i|surpreender|surprizo=surpresa
ŝpar/i|economizar, poupar
taŭg/a|adequado|taŭgi=servir para
teknologi/o|tecnologia
tem/o|tema
tip/o|tipo|tipa=típico
toler/i|tolerar|tolerema=tolerante
trafik/o|trânsito
trezor/o|tesouro
urĝ/a|urgente
var/o|mercadoria
voĉdon/i|votar
ekran/o|tela
klavar/o|teclado
dosier/o|arquivo
datum/o|dado|datumbazo=banco de dados
kont/o|conta
pasvort/o|senha
retumil/o|navegador
ŝarg/i|carregar (arma, bateria)|ŝargilo=carregador; malŝargita=descarregado
ŝut/i|despejar (grãos, areia)|elŝuti=baixar (arquivo); alŝuti=fazer upload
cim/o|percevejo; bug|sencimigi=depurar
kod/o|código
salajr/o|salário
dung/i|contratar|maldungi=demitir
kunven/o|reunião
templim/o|prazo
kvartal/o|bairro
plac/o|praça
trotuar/o|calçada
ŝose/o|estrada
pont/o|ponte
pasport/o|passaporte
bagaĝ/o|bagagem
dogan/o|alfândega
sabl/o|areia
foli/o|folha
herb/o|erva, grama
insekt/o|inseto
muŝ/o|mosca
ŝaf/o|ovelha
bov/o|boi|bovino=vaca
pork/o|porco
kok/o|galo|kokino=galinha
serpent/o|cobra
`},
{t:'Esprimi', lvl:'B1', s:`
abund/a|abundante
adapt/i|adaptar
aktual/a|atual
aliĝ/i|aderir, inscrever-se
alud/i|aludir
antikv/a|antigo|antikvaĵo=antiguidade
aparat/o|aparelho
aprob/i|aprovar
asoci/o|associação
aspekt/i|ter aparência|aspekto=aspecto
atak/i|atacar
ating/i|alcançar, atingir
avar/a|avarento
aventur/o|aventura
balanc/i|balançar
bar/i|bloquear|baro=barreira
benk/o|banco (assento)
bot/o|bota
branĉ/o|ramo, galho
bril/i|brilhar|brila=brilhante
buĝet/o|orçamento
ĉapitr/o|capítulo
ĉarm/a|encantador
ĉas/i|caçar
ĉen/o|corrente
ĉerp/i|tirar (de uma fonte)
danĝer/o|perigo|danĝera=perigoso
deklar/i|declarar
delikat/a|delicado
diligent/a|aplicado, diligente
diplom/o|diploma
disput/i|disputar
vast/a|vasto|disvastigi=difundir
dorlot/i|mimar
drink/i|beber (álcool)|drinkejo=bar
ekip/i|equipar|ekipaĵo=equipamento
ekscit/i|emocionar, excitar
ekspozici/o|exposição
eksperiment/o|experimento
emoci/o|emoção
enu/i|entediar-se|enua=entediante
envi/i|invejar
fabrik/o|fábrica
fajr/o|fogo
fantazi/o|imaginação, fantasia
farb/i|pintar (parede)|farbo=tinta
fend/i|rachar
fervor/a|fervoroso
fianĉ/o|noivo|fianĉino=noiva
filozofi/o|filosofia
financ/i|financiar|financa=financeiro
firm/a|firme|firmao=empresa
flar/i|cheirar (sentir cheiro)
fleks/i|dobrar, flexionar
font/o|fonte
frost/o|geada|frosta=gelado
fulm/o|relâmpago|fulmotondro=tempestade com raios
fund/o|fundo
glaci/o|gelo|glaciaĵo=sorvete
glit/i|deslizar
glor/o|glória
grad/o|grau
gramatik/o|gramática
gratul/i|parabenizar|gratulon!=parabéns!
griz/a|cinza
gut/o|gota
hered/i|herdar|heredaĵo=herança
hezit/i|hesitar
hok/o|gancho
honor/o|honra
humid/a|úmido
indiĝen/o|indígena, nativo
influ/i|influenciar|influo=influência
insist/i|insistir
inspir/i|inspirar
instituci/o|instituição
insul/o|ilha
intern/a|interno|interne=por dentro
interpret/i|interpretar
intim/a|íntimo
izol/i|isolar
ĵaluz/a|ciumento|ĵaluzi=ter ciúmes
ĵur/i|jurar
kalendar/o|calendário
kanal/o|canal
kandel/o|vela
karakter/o|caráter
kas/o|caixa (pagamento)
katalog/o|catálogo
kelner/o|garçom
klient/o|cliente
klimat/o|clima
kompani/o|companhia
komplet/a|completo
konced/i|admitir, conceder
konflikt/o|conflito
kongres/o|congresso|kongresano=congressista
konsci/a|consciente|konscio=consciência
konsekvenc/o|consequência
konstant/a|constante
kontrakt/o|contrato
kontribu/i|contribuir
konven/i|convir|konvena=apropriado
koridor/o|corredor
krajon/o|lápis
krim/o|crime|krimulo=criminoso
kudr/i|costurar
kviet/a|quieto, calmo
lert/a|hábil|lerteco=habilidade
lign/o|madeira
lip/o|lábio
literatur/o|literatura
lojal/a|leal
lukt/i|lutar (esforço)
manifest/i|manifestar
manuskript/o|manuscrito
marŝ/i|marchar, caminhar
matur/a|maduro
memstar/a|independente
menci/i|mencionar
metal/o|metal
minac/i|ameaçar
mok/i|zombar
monument/o|monumento
moral/o|moral
mord/i|morder
murmur/i|murmurar
neglekt/i|negligenciar
nerv/o|nervo|nervoza=nervoso
nobel/a|nobre
nuanc/o|nuance
obstin/a|teimoso
orient/o|leste
okcident/o|oeste
nord/o|norte
sud/o|sul
ofert/i|oferecer (comercialmente)|oferto=oferta
ombr/o|sombra
ond/o|onda
orkestr/o|orquestra
palac/o|palácio
parenc/o|parente
pec/o|pedaço
pentr/i|pintar (quadro)|pentraĵo=pintura
perfid/i|trair
period/o|período
persist/i|persistir
pint/o|ponta
plant/i|plantar|planto=planta
plenum/i|cumprir, realizar
poem/o|poema|poeto=poeta
polv/o|pó, poeira
potenc/a|poderoso|potenco=poder
preleg/i|dar palestra|prelego=palestra
preter|além de, passando por|preterlasi=omitir
privat/a|privado
procent/o|por cento
proces/o|processo
profund/a|profundo
proverb/o|provérbio
provizor/a|provisório
prudent/a|prudente
puŝ/i|empurrar
radik/o|raiz
raport/i|relatar|raporto=relatório
reciprok/a|recíproco
reklam/o|propaganda
rekompenc/i|recompensar
religi/o|religião
respekt/i|respeitar
rev/i|sonhar acordado|revo=sonho
rifuz/i|recusar
rimed/o|recurso, meio
rond/o|círculo, roda
rub/o|lixo
ruz/a|astuto
sem/i|semear
sinjor/o|senhor|sinjorino=senhora
sistem/o|sistema
skrap/i|raspar
sopir/i|sentir saudade, ansiar
spec/o|espécie, tipo
spegul/o|espelho
spir/i|respirar
sprit/a|espirituoso
stabil/a|estável
streb/i|aspirar a, esforçar-se
subit/a|súbito|subite=de repente
suspekt/i|suspeitar
ŝarĝ/i|carregar (peso)|ŝarĝo=carga
ŝild/o|placa, escudo
ŝtof/o|tecido
ŝvit/i|suar
tapiŝ/o|tapete
tavol/o|camada
tend/o|barraca
tendenc/o|tendência
terur/a|terrível
tord/i|torcer
tradici/o|tradição
traf/i|acertar
trejn/i|treinar
trem/i|tremer
tribunal/o|tribunal
tromp/i|enganar
tuŝ/i|tocar
unik/a|único
vak/a|vago, livre
valid/a|válido
vang/o|bochecha
velk/i|murchar
venk/i|vencer|venko=vitória
verk/i|escrever (obra)|verko=obra; verkisto=escritor
vers/o|verso
vic/o|fila; vez|vice=por sua vez
vigl/a|animado, vivo
vilaĝ/o|aldeia, vila
viŝ/i|enxugar, apagar
vund/i|ferir|vundo=ferida
zon/o|cinto; zona
`},
{t:'Nuancoj', lvl:'B1–B2', s:`
abstrakt/a|abstrato
absurd/a|absurdo
adekvat/a|adequado
afiŝ/o|cartaz|afiŝi=afixar, postar
agnosk/i|reconhecer (oficialmente)
akademi/o|academia
akcent/o|acento
akcident/o|acidente
alternativ/o|alternativa
ambici/o|ambição
analiz/i|analisar
arbitr/a|arbitrário
arkitekt/o|arquiteto
arm/i|armar|armilo=arma; armeo=exército
artikol/o|artigo
aŭtomat/a|automático
aŭtoritat/o|autoridade
cenzur/i|censurar
cikl/o|ciclo
cit/i|citar|citaĵo=citação
civil/a|civil|civilizo=civilização
debat/i|debater|debato=debate
dediĉ/i|dedicar
deleg/i|delegar|delegito=delegado
demokrati/o|democracia|demokrata=democrático
deven/i|provir|deveno=origem
dialekt/o|dialeto
diskriminaci/i|discriminar
disciplin/o|disciplina
diven/i|adivinhar
divers/a|variado, diverso
doktor/o|doutor
escept/o|exceção|escepte=exceto
ekspluat/i|explorar (abusar)
elegant/a|elegante
elimin/i|eliminar
embaras/o|embaraço, dificuldade
emfaz/i|enfatizar
entuziasm/o|entusiasmo
epok/o|época
esenc/o|essência|esenca=essencial
estim/i|estimar|estimata=prezado
etik/o|ética
ekvilibr/o|equilíbrio
fals/a|falso|falsi=falsificar
fantom/o|fantasma
favor/a|favorável|favoro=favor
fenomen/o|fenômeno
fikci/o|ficção
flu/i|fluir|flua=fluente; flue=fluentemente
fundament/o|fundamento
garanti/i|garantir
generaci/o|geração
geni/o|gênio
gest/o|gesto
grandioz/a|grandioso
hipotez/o|hipótese
humil/a|humilde
identec/o|identidade
ideal/o|ideal
ignor/i|ignorar
iluzi/o|ilusão
imit/i|imitar
impon/a|imponente
inkluziv/e|inclusive
instig/i|incentivar
instinkt/o|instinto
intens/a|intenso
intervju/o|entrevista|intervjui=entrevistar
invest/i|investir
ironi/o|ironia
kamarad/o|camarada
kategori/o|categoria
klasik/a|clássico
kompens/i|compensar
kompetent/a|competente
kompliment/o|elogio
kompromis/o|meio-termo, acordo
koncept/o|conceito
konferenc/o|conferência
konfuz/i|confundir
konklud/i|concluir|konkludo=conclusão
konkret/a|concreto
konscienc/o|consciência (moral)
kontekst/o|contexto
kontraŭdir/i|contradizer
kurioz/a|curioso (estranho)
manipul/i|manipular
mekanism/o|mecanismo
metafor/o|metáfora
misi/o|missão
motiv/o|motivo|motivi=motivar
naiv/a|ingênuo
negativ/a|negativo
pozitiv/a|positivo
neŭtral/a|neutro
nostalgi/o|nostalgia
objektiv/a|objetivo (imparcial)
subjektiv/a|subjetivo
observ/i|observar
optimism/o|otimismo|optimisma=otimista
pesimism/o|pessimismo
origin/a|original|origino=origem
paradoks/o|paradoxo
paragraf/o|parágrafo
politik/o|política
prestiĝ/o|prestígio
pretekst/o|pretexto
prioritat/o|prioridade
profit/i|lucrar, aproveitar|profito=lucro
proporci/o|proporção
prosper/i|prosperar
protest/i|protestar
provok/i|provocar
psikologi/o|psicologia
radikal/a|radical
reform/o|reforma
relativ/a|relativo
renom/o|renome|renoma=renomado
reprezent/i|representar
resum/i|resumir|resumo=resumo
revoluci/o|revolução
rezign/i|renunciar
riproĉ/i|repreender, censurar
ritm/o|ritmo
sever/a|severo
sincer/a|sincero
skeptik/a|cético
solidar/a|solidário
spontan/a|espontâneo
stereotip/o|estereótipo
stil/o|estilo
stimul/i|estimular
strategi/o|estratégia
strikt/a|estrito
struktur/o|estrutura
substanc/o|substância
subtil/a|sutil
tragedi/o|tragédia
trajt/o|traço, característica
trakt/i|tratar (de)
utopi/o|utopia
venĝ/i|vingar-se
versi/o|versão
viktim/o|vítima
vizi/o|visão
`},
{t:'Abstrakte', lvl:'B2', s:`
akord/o|acordo; acorde (música)|akordiĝi=entrar em acordo
aspir/i|aspirar
atmosfer/o|atmosfera
aŭdac/a|audacioso
bagatel/o|ninharia
ceremoni/o|cerimônia
cirkonstanc/o|circunstância
civit/o|cidade-estado|civitano=cidadão
ĉagren/i|aborrecer|ĉagreno=aborrecimento
elokvent/a|eloquente
fortik/a|robusto, sólido
fuŝ/i|estragar, fazer malfeito|fuŝaĵo=trabalho malfeito
ideologi/o|ideologia
imperi/o|império
impuls/o|impulso
indulg/i|ser indulgente com
inerci/o|inércia
infer/o|inferno
inklin/a|inclinado (a fazer algo)|inklino=inclinação
insult/i|insultar
kaos/o|caos
karakteriz/i|caracterizar
koher/a|coerente
kolaps/i|desabar, colapsar
komplez/o|favor, gentileza|komplezema=prestativo
konfid/i|confiar (um segredo)|konfido=confiança
konjekt/i|conjeturar
kontempl/i|contemplar
krud/a|cru, grosseiro
kulmin/i|culminar
kvalifik/i|qualificar
lekci/o|aula, lição
log/i|atrair, seduzir|loga=atraente
majest/a|majestoso
malic/a|malicioso
maksimum/o|máximo
minimum/o|mínimo
mend/i|encomendar, pedir (no restaurante)|mendo=pedido
mens/o|mente
moder/a|moderado
modest/a|modesto
monoton/a|monótono
mut/a|mudo
naŭz/i|enjoar|naŭza=nojento
nebul/o|neblina|nebula=nebuloso
nepre|sem falta, a todo custo
nivel/o|nível
obsed/i|obcecar
obstakl/o|obstáculo
ofend/i|ofender
ornam/i|enfeitar|ornamo=enfeite
paf/i|atirar|pafilo=fuzil
pasi/o|paixão|pasia=apaixonado
persvad/i|persuadir
perspektiv/o|perspectiva
pigr/a|preguiçoso
pozici/o|posição
procedur/o|procedimento
propagand/o|propaganda (ideológica)
rabat/o|desconto
rafin/i|refinar|rafinita=refinado
rav/i|encantar|rava=encantador
reĝ/o|rei|reĝino=rainha; reĝlando=reino
rezerv/i|reservar|rezervo=reserva
rigid/a|rígido
ruin/o|ruína|ruinigi=arruinar
sagac/a|perspicaz
sankci/o|sanção
satir/o|sátira
sensaci/o|sensação (alvoroço)
skandal/o|escândalo
skiz/o|esboço
skrupul/o|escrúpulo
sovaĝ/a|selvagem
spit/i|desafiar, fazer frente a
stagn/i|estagnar
statistik/o|estatística
sublim/a|sublime
subvenci/o|subsídio
superstiĉ/o|superstição
ŝancel/i|abalar|ŝanceliĝi=vacilar
ŝirm/i|abrigar, proteger|ŝirmejo=abrigo
ŝov/i|empurrar (deslizando)
ŝvel/i|inchar
tabu/o|tabu
taks/i|avaliar, estimar|takso=estimativa
tekst/o|texto
tent/i|tentar (seduzir)|tento=tentação
tikl/i|fazer cócegas
tren/i|arrastar
triumf/i|triunfar
trud/i|impor|trudema=insistente
turment/i|atormentar
uniform/a|uniforme
vag/i|vagar, perambular
vant/a|vão, inútil|vane=em vão
varb/i|recrutar, angariar
verŝ/i|despejar, verter
verŝajn/a|provável|verŝajne=provavelmente
vet/i|apostar
`}
];
