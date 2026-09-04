const DIMENSIONS = {
  E: 'Energia social', N: 'Intensidade emocional', R: 'Ruminação',
  A: 'Assertividade', S: 'Autorregulação', C: 'Cooperação', D: 'Adaptabilidade',
  IE: 'Inclusão expressa', IW: 'Inclusão desejada',
  CE: 'Controle expresso', CW: 'Controle desejado',
  AE: 'Afeição expressa', AW: 'Afeição desejada'
};

const q = (dimension, text, reverse = false, layer = 'Temperamento') => ({ dimension, text, reverse, layer });

const QUESTIONS = [
  q('E','Sinto-me energizado depois de conversar com várias pessoas.'),
  q('E','Costumo iniciar conversas mesmo quando não conheço bem as pessoas.'),
  q('E','Prefiro observar por algum tempo antes de participar de um grupo.',true),
  q('E','Ambientes movimentados costumam aumentar minha disposição.'),
  q('E','Depois de muitas interações, preciso ficar sozinho para recuperar energia.',true),
  q('E','Falo com facilidade quando tenho uma ideia para compartilhar.'),
  q('E','Evito ser o centro das atenções, mesmo quando conheço o assunto.',true),
  q('E','Gosto de atividades que envolvem contato frequente com pessoas.'),
  q('E','Em grupos novos, normalmente espero alguém falar comigo primeiro.',true),
  q('E','Sinto prazer em conhecer pessoas e histórias novas.'),
  q('E','Muitas pessoas ao meu redor por muito tempo me deixam esgotado.',true),
  q('E','Consigo manter presença social por bastante tempo sem me cansar.'),

  q('N','Críticas ficam na minha cabeça por bastante tempo.'),
  q('N','Quando algo dá errado, meu corpo reage rapidamente ao estresse.'),
  q('N','Consigo deixar preocupações para trás com relativa facilidade.',true),
  q('N','Imprevistos importantes mexem muito comigo.'),
  q('N','Mesmo sob pressão, meu estado emocional costuma permanecer estável.',true),
  q('N','Incertezas me fazem imaginar vários cenários possíveis.'),
  q('N','Uma conversa difícil pode afetar meu humor por horas.'),
  q('N','Recupero meu equilíbrio rapidamente depois de uma frustração.',true),
  q('N','Percebo pequenas mudanças no clima emocional ao meu redor.'),
  q('N','Quando me sinto cobrado, a tensão aumenta depressa.'),
  q('N','Problemas cotidianos raramente alteram meu estado interno.',true),
  q('N','Costumo sentir emoções com bastante intensidade.'),

  q('R','Repasso mentalmente conversas antigas pensando no que poderia ter dito.'),
  q('R','Depois de tomar uma decisão, volto a avaliá-la várias vezes.'),
  q('R','Quando um assunto termina, geralmente consigo encerrá-lo mentalmente.',true),
  q('R','Antecipar possíveis problemas ocupa bastante espaço nos meus pensamentos.'),
  q('R','Erros antigos voltam à minha mente mesmo quando já não há nada a fazer.'),
  q('R','Consigo distinguir rapidamente reflexão útil de preocupação repetitiva.',true),
  q('R','Antes de agir, penso em muitas consequências possíveis.'),
  q('R','Tenho dificuldade de desligar a mente depois de um conflito.'),
  q('R','Uma vez resolvido um problema, raramente volto a ele mentalmente.',true),
  q('R','Analiso detalhes que outras pessoas parecem deixar passar.'),

  q('A','Quando ninguém decide, assumo a responsabilidade de dar direção.'),
  q('A','Consigo dizer não quando considero necessário.'),
  q('A','Evito expor minha posição para não gerar desconforto.',true),
  q('A','Sob pressão, consigo tomar decisões firmes.'),
  q('A','Fico impaciente quando decisões simples demoram demais.'),
  q('A','Prefiro deixar outra pessoa assumir a liderança, mesmo quando tenho clareza do caminho.',true),
  q('A','Defendo minhas ideias com objetividade quando considero algo importante.'),
  q('A','Consigo confrontar um problema sem atacar a pessoa envolvida.'),

  q('S','Cumpro o que prometo mesmo quando isso se torna inconveniente.'),
  q('S','Termino tarefas importantes mesmo sem vontade.'),
  q('S','Deixo responsabilidades para depois quando perco o entusiasmo.',true),
  q('S','Consigo organizar prioridades quando várias demandas chegam ao mesmo tempo.'),
  q('S','Minha disciplina depende muito de estar motivado.',true),
  q('S','Antes de reagir impulsivamente, costumo tentar me conter.'),
  q('S','Mantenho compromissos mesmo quando ninguém está cobrando.'),
  q('S','Quando fico irritado, ajo antes de pensar nas consequências.',true),
  q('S','Consigo sustentar rotinas quando compreendo o propósito delas.'),
  q('S','Reorganizo meu dia quando percebo que perdi o foco.'),

  q('C','Procuro entender o ponto de vista do outro antes de concluir uma discussão.'),
  q('C','Considero como minhas decisões podem afetar as pessoas próximas.'),
  q('C','Tenho dificuldade de pedir desculpas quando percebo que errei.',true),
  q('C','Busco soluções em que responsabilidades fiquem claras para todos.'),
  q('C','Prefiro vencer uma discussão a encontrar um acordo razoável.',true),
  q('C','Percebo quando alguém está desconfortável mesmo sem falar.'),
  q('C','Consigo cooperar sem abrir mão de limites importantes.'),
  q('C','Escuto opiniões diferentes antes de fechar uma decisão.'),

  q('D','Consigo improvisar quando o plano original deixa de funcionar.'),
  q('D','Mudanças de última hora me desorganizam por bastante tempo.',true),
  q('D','Troco de estratégia quando os fatos mostram que a primeira não funcionou.'),
  q('D','Preciso que tudo esteja previsto para conseguir avançar.',true),
  q('D','Aprendo rapidamente novas formas de realizar uma tarefa.'),
  q('D','Quando uma rotina muda, levo muito tempo para recuperar meu ritmo.',true),
  q('D','Consigo ajustar expectativas quando a realidade muda.'),
  q('D','Planos alternativos me ajudam a lidar bem com imprevistos.'),

  q('IE','Costumo convidar pessoas para participar de conversas, grupos ou atividades.',false,'Relacionamento interpessoal'),
  q('IE','Quando chego a um ambiente novo, procuro me integrar ativamente.',false,'Relacionamento interpessoal'),
  q('IE','Normalmente sou eu quem mantém contato com pessoas que considero importantes.',false,'Relacionamento interpessoal'),
  q('IE','Em grupos, prefiro não demonstrar interesse em participar.',true,'Relacionamento interpessoal'),
  q('IE','Faço esforço consciente para incluir pessoas que estão à margem.',false,'Relacionamento interpessoal'),

  q('IW','Gosto quando outras pessoas me procuram espontaneamente para participar de algo.',false,'Relacionamento interpessoal'),
  q('IW','Sinto falta quando passo muito tempo sem ser lembrado ou incluído por pessoas importantes.',false,'Relacionamento interpessoal'),
  q('IW','Prefiro que respeitem meu espaço a receber muitos convites e contatos.',true,'Relacionamento interpessoal'),
  q('IW','É importante para mim perceber que minha presença faz diferença em um grupo.',false,'Relacionamento interpessoal'),
  q('IW','Desejo pertencer a grupos em que exista contato e participação frequentes.',false,'Relacionamento interpessoal'),

  q('CE','Assumo naturalmente a organização quando um grupo precisa de direção.',false,'Relacionamento interpessoal'),
  q('CE','Costumo definir prioridades quando percebo que as pessoas estão sem rumo.',false,'Relacionamento interpessoal'),
  q('CE','Prefiro evitar responsabilidade por decisões que afetem outras pessoas.',true,'Relacionamento interpessoal'),
  q('CE','Sinto-me confortável estabelecendo limites, regras ou combinados quando necessário.',false,'Relacionamento interpessoal'),
  q('CE','Quando tenho responsabilidade por algo, acompanho de perto até a conclusão.',false,'Relacionamento interpessoal'),

  q('CW','Trabalho melhor quando as expectativas e responsabilidades estão claramente definidas por alguém.',false,'Relacionamento interpessoal'),
  q('CW','Em situações novas, valorizo receber orientação antes de agir sozinho.',false,'Relacionamento interpessoal'),
  q('CW','Fico desconfortável quando outras pessoas tentam dirigir excessivamente minhas escolhas.',true,'Relacionamento interpessoal'),
  q('CW','Gosto de saber com clareza a quem recorrer quando preciso de decisão ou direção.',false,'Relacionamento interpessoal'),
  q('CW','Sinto segurança quando há liderança presente e critérios bem estabelecidos.',false,'Relacionamento interpessoal'),

  q('AE','Demonstro com facilidade carinho e apreço por pessoas próximas.',false,'Relacionamento interpessoal'),
  q('AE','Costumo compartilhar sentimentos pessoais com quem confio.',false,'Relacionamento interpessoal'),
  q('AE','Tenho dificuldade de mostrar às pessoas que elas são importantes para mim.',true,'Relacionamento interpessoal'),
  q('AE','Procuro estar emocionalmente presente quando alguém próximo precisa de apoio.',false,'Relacionamento interpessoal'),
  q('AE','Expresso gratidão e reconhecimento de maneira clara nas relações próximas.',false,'Relacionamento interpessoal'),

  q('AW','É importante para mim receber demonstrações claras de carinho e consideração.',false,'Relacionamento interpessoal'),
  q('AW','Desejo ter pelo menos algumas relações em que possa falar de assuntos muito pessoais.',false,'Relacionamento interpessoal'),
  q('AW','Prefiro que pessoas próximas não entrem muito no meu mundo emocional.',true,'Relacionamento interpessoal'),
  q('AW','Sinto-me fortalecido quando pessoas de confiança demonstram apoio de forma explícita.',false,'Relacionamento interpessoal'),
  q('AW','Valorizo relações em que exista confiança, proximidade e abertura emocional recíproca.',false,'Relacionamento interpessoal')
];

const ANSWERS = [
  {label:'Discordo totalmente', value:1}, {label:'Discordo', value:2},
  {label:'Nem concordo nem discordo', value:3}, {label:'Concordo', value:4},
  {label:'Concordo totalmente', value:5}
];

let current = 0;
let answers = Array(QUESTIONS.length).fill(null);
let profile = { name:'', age:'' };
const $ = id => document.getElementById(id);

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

$('profile-form').addEventListener('submit', e => {
  e.preventDefault();
  profile = { name:$('full-name').value.trim(), age:$('age').value };
  localStorage.setItem('temperamentos-profile-v2', JSON.stringify(profile));
  showScreen('quiz'); renderQuestion();
});

function renderQuestion(){
  const item = QUESTIONS[current];
  $('question-counter').textContent = `Pergunta ${current+1} de ${QUESTIONS.length}`;
  $('question-text').textContent = item.text;
  $('question-dimension').textContent = item.layer;
  $('progress-bar').style.width = `${((current+1)/QUESTIONS.length)*100}%`;
  $('answered-count').textContent = `${answers.filter(v=>v!==null).length} respondidas`;
  $('prev-question').disabled = current===0;
  $('answer-options').innerHTML = ANSWERS.map(a => `<button type="button" class="answer-option ${answers[current]===a.value?'selected':''}" data-value="${a.value}"><span>${a.label}</span><span>${a.value}/5</span></button>`).join('');
  document.querySelectorAll('.answer-option').forEach(btn => btn.onclick = () => {
    answers[current] = Number(btn.dataset.value);
    localStorage.setItem('temperamentos-answers-v2', JSON.stringify(answers));
    if(current < QUESTIONS.length-1){ current++; renderQuestion(); window.scrollTo({top:0,behavior:'smooth'}); }
    else finishQuiz();
  });
}

$('prev-question').onclick = () => { if(current>0){current--;renderQuestion();} };
$('restart').onclick = reset;
$('back-to-start').onclick = () => { if(confirm('Deseja apagar as respostas e recomeçar?')) reset(); };

function reset(){
  localStorage.removeItem('temperamentos-answers-v2');
  localStorage.removeItem('temperamentos-profile-v2');
  answers=Array(QUESTIONS.length).fill(null); current=0; profile={name:'',age:''};
  $('profile-form').reset(); showScreen('intro');
}

function dimensionScore(dim){
  const indices = QUESTIONS.map((item,i)=>item.dimension===dim?i:-1).filter(i=>i>=0);
  const total = indices.reduce((sum,i)=>{
    const raw=answers[i];
    const value=QUESTIONS[i].reverse ? 6-raw : raw;
    return sum+value;
  },0);
  return Math.round(((total-indices.length)/(indices.length*4))*100);
}

function band(score){
  if(score<35)return 'baixo';
  if(score<45)return 'moderadamente baixo';
  if(score<=55)return 'equilibrado';
  if(score<=65)return 'moderadamente alto';
  return 'alto';
}

function escapeHtml(text){ return String(text).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function calculate(){
  const dims={};
  Object.keys(DIMENSIONS).forEach(k=>dims[k]=dimensionScore(k));
  const temperaments = {
    Sanguíneo: Math.round((dims.E + (100-dims.N))/2),
    Colérico: Math.round((dims.E + dims.N)/2),
    Melancólico: Math.round(((100-dims.E) + dims.N)/2),
    Fleumático: Math.round(((100-dims.E) + (100-dims.N))/2)
  };
  const ranking = Object.entries(temperaments).sort((a,b)=>b[1]-a[1]);
  return {...dims,temperaments,primary:ranking[0][0],secondary:ranking[1][0],ranking};
}

function paragraphFor(r){
  const e = r.E < 45 ? 'mais seletiva e reservada' : r.E > 55 ? 'mais expansiva e orientada ao contato' : 'equilibrada entre contato e recolhimento';
  const n = r.N > 60 ? 'com respostas emocionais intensas diante de pressão e incerteza' : r.N < 40 ? 'com boa estabilidade emocional diante de mudanças' : 'com reatividade emocional em faixa intermediária';
  const a = r.A > 60 ? 'Você tende a assumir direção e se posicionar quando percebe necessidade de decisão.' : r.A < 40 ? 'Sua assertividade tende a aparecer de forma mais cuidadosa e seletiva.' : 'Sua assertividade varia conforme o contexto e a importância do problema.';
  return `Seu padrão combina uma energia social ${e}, ${n}. ${a}`;
}

function scoreRow(label,value){
  return `<div class="score-row"><strong>${label}</strong><div class="bar"><i style="width:${value}%"></i></div><b>${value}</b></div>`;
}

function insight(title, score, highText, lowText, midText){
  const text = score>60?highText:score<40?lowText:midText;
  return `<div class="report-card"><span class="pill">${band(score)} · ${score}/100</span><h3>${title}</h3><p>${text}</p></div>`;
}

function relationGap(exp,want){ return exp-want; }
function gapText(area,exp,want){
  const gap=relationGap(exp,want);
  if(Math.abs(gap)<=12) return `Em ${area.toLowerCase()}, aquilo que você costuma expressar e aquilo que deseja receber aparecem relativamente alinhados.`;
  if(gap>12) return `Em ${area.toLowerCase()}, você tende a oferecer ou assumir mais do que espera receber. Isso pode transmitir independência, mas também pode fazer suas próprias necessidades parecerem menores do que realmente são.`;
  return `Em ${area.toLowerCase()}, você tende a desejar receber mais do que costuma expressar. Essa diferença pode gerar frustração silenciosa quando outras pessoas não percebem espontaneamente aquilo que você valoriza.`;
}

function inclusionText(r){
  const base=gapText('Inclusão',r.IE,r.IW);
  const detail=r.IE>60?'Você costuma iniciar contato e favorecer participação.':r.IE<40?'Você tende a entrar nos grupos com maior seletividade.':'Sua participação social é bastante dependente do contexto.';
  return `${detail} ${base}`;
}
function controlText(r){
  const base=gapText('Controle',r.CE,r.CW);
  const detail=r.CE>60?'Você tende a assumir direção, organizar e acompanhar responsabilidades.':r.CE<40?'Você tende a evitar ocupar o papel de direção sem necessidade clara.':'Você alterna entre conduzir e compartilhar decisões conforme a situação.';
  return `${detail} ${base}`;
}
function affectionText(r){
  const base=gapText('Afeição',r.AE,r.AW);
  const detail=r.AE>60?'Você demonstra proximidade e reconhecimento com relativa facilidade.':r.AE<40?'Você tende a proteger mais a expressão do seu mundo emocional.':'Sua abertura afetiva varia de acordo com confiança e segurança.';
  return `${detail} ${base}`;
}

function spiritualReflection(r){
  const items=[];
  if(r.CE>60 || r.A>60) items.push('Liderança: exercitar firmeza como serviço e responsabilidade, evitando transformar iniciativa em controle excessivo.');
  if(r.N>60 || r.R>60) items.push('Vida interior: cultivar práticas de entrega, oração, silêncio e discernimento para que reflexão não se transforme em peso contínuo.');
  if(r.AW>r.AE+12) items.push('Comunhão: comunicar necessidades de proximidade com clareza, em vez de esperar que pessoas próximas as percebam sem palavras.');
  if(r.IW>r.IE+12) items.push('Pertencimento: reconhecer o valor da comunidade e também participar ativamente da construção dos vínculos que deseja receber.');
  if(r.S<45) items.push('Mordomia pessoal: fortalecer hábitos, limites e constância, especialmente quando a motivação diminui.');
  if(r.C>=55) items.push('Relacionamentos: sua disposição para considerar o outro pode ser canal de cuidado, desde que preserve verdade, limites e responsabilidade mútua.');
  if(!items.length) items.push('Maturidade: observar como suas tendências podem ser colocadas a serviço do amor, da verdade, do domínio próprio e da edificação de outras pessoas.');
  return items.slice(0,4).map(x=>`<li>${x}</li>`).join('');
}

function renderReport(r){
  const name=escapeHtml(profile.name), age=escapeHtml(profile.age);
  const scores=[['Extroversão',r.E],['Intensidade emocional',r.N],['Ruminação',r.R],['Assertividade',r.A],['Autorregulação',r.S],['Cooperação',r.C],['Adaptabilidade',r.D]];
  const scoreRows=scores.map(([label,value])=>scoreRow(label,value)).join('');
  const temperCards=r.ranking.map(([t,value],i)=>`<div class="temper-card"><small>${i===0?'Afinidade principal':i===1?'Influência complementar':'Afinidade adicional'}</small><strong>${t}</strong><span>${value}/100</span></div>`).join('');
  const interpersonalRows=[['Inclusão expressa',r.IE],['Inclusão desejada',r.IW],['Controle expresso',r.CE],['Controle desejado',r.CW],['Afeição expressa',r.AE],['Afeição desejada',r.AW]].map(([l,v])=>scoreRow(l,v)).join('');

  $('report').innerHTML = `
    <section class="report-cover">
      <div><span class="eyebrow">DOSSIÊ PESSOAL</span><h1>${r.primary}<br><span style="font-size:.52em;font-family:'DM Sans'">com influência ${r.secondary.toLowerCase()}</span></h1><p>${paragraphFor(r)}</p></div>
      <div class="cover-meta"><span>${name}</span><span>${age} anos</span><span>${QUESTIONS.length} respostas</span><span>${new Date().toLocaleDateString('pt-BR')}</span></div>
    </section>

    <div class="report-grid">
      <div class="report-card"><h2>Afinidades temperamentais</h2><div class="quadrant">${temperCards}</div></div>
      <div class="report-card"><h2>Eixos e facetas</h2><div class="score-list">${scoreRows}</div></div>
      <div class="report-card full"><h2>Leitura geral</h2><p>${paragraphFor(r)}</p><p>Os quatro temperamentos aparecem como afinidades relativas, não como caixas rígidas. O núcleo do perfil é calculado pelos eixos de energia social e intensidade emocional, complementado por facetas de funcionamento pessoal.</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      ${insight('Energia social',r.E,'Interações e ambientes estimulantes tendem a mobilizar sua energia. Observe apenas se a busca por movimento reduz espaço para processamento e descanso.','Você tende a administrar a energia social com critério. Interações significativas podem ser agradáveis, mas períodos de recolhimento provavelmente ajudam na recuperação.','Você parece transitar entre sociabilidade e recolhimento de acordo com contexto, afinidade e propósito.')}
      ${insight('Intensidade emocional',r.N,'Pressão, críticas e incertezas podem mobilizar rapidamente sua atenção. Isso pode ampliar percepção e envolvimento, mas pede estratégias claras de recuperação.','Seu padrão sugere maior estabilidade diante de contratempos, com tendência a recuperar o equilíbrio com relativa rapidez.','Sua reatividade aparece em faixa intermediária: algumas situações mobilizam bastante, outras são absorvidas sem impacto prolongado.')}
      ${insight('Ruminação',r.R,'Sua mente tende a continuar trabalhando depois que um evento termina. Essa profundidade pode favorecer aprendizagem, desde que exista um ponto de encerramento.','Você tende a encerrar assuntos mentalmente com maior facilidade.','Você alterna entre análise profunda e capacidade de soltar assuntos; observe quando a reflexão deixa de acrescentar algo novo.')}
      ${insight('Assertividade',r.A,'Você tende a se posicionar e assumir direção quando percebe ausência de clareza. O cuidado é diferenciar firmeza de urgência acumulada.','Você costuma ponderar antes de ocupar espaço ou confrontar problemas. Pode ser útil comunicar incômodos antes que se acumulem.','Sua iniciativa parece situacional: você não precisa liderar o tempo todo, mas pode assumir a frente quando considera necessário.')}
    </div>

    <div class="report-grid pdf-page-break">
      ${insight('Autorregulação',r.S,'Compromissos, deveres e consequências concretas parecem sustentar sua disciplina.','Sua consistência pode depender mais de motivação e contexto. Estruturas simples e prazos visíveis podem ajudar.','Você demonstra recursos razoáveis para sustentar compromissos, com oscilações naturais quando propósito ou energia diminuem.')}
      ${insight('Cooperação',r.C,'Você tende a considerar o impacto das decisões e buscar reciprocidade. O desafio é colaborar sem assumir responsabilidades que pertencem aos outros.','Você tende a priorizar autonomia e objetividade. Vale observar se, sob pressão, isso reduz espaço para escuta e negociação.','Você equilibra consideração pelo outro com preservação dos próprios limites.')}
      ${insight('Adaptabilidade',r.D,'Você tende a ajustar rota, estratégia e expectativa quando os fatos mudam.','Mudanças abruptas podem exigir mais processamento. Antecipação e planos alternativos tendem a reduzir desgaste.','Você consegue se adaptar, embora provavelmente funcione melhor quando mudanças importantes chegam com algum contexto.')}
      <div class="report-card"><h3>Sob pressão</h3><p>${r.N>55?'A carga interna pode crescer antes de aparecer externamente.':'Você tende a preservar relativa estabilidade interna.'} ${r.A>55?'Parte dessa tensão pode virar decisão e ação.':'Você pode precisar de algum tempo antes de se posicionar.'} ${r.R>60?'Depois, o assunto pode continuar sendo processado mentalmente mesmo quando já terminou por fora.':''}</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card full"><span class="eyebrow">CAMADA INTERPESSOAL</span><h2>O que você expressa × o que deseja receber</h2><p>Esta camada foi construída com perguntas próprias inspiradas no estudo geral de necessidades interpessoais. Ela não reproduz nem pretende substituir FIRO-B, APS ou qualquer instrumento proprietário.</p></div>
      <div class="report-card"><h3>Mapa interpessoal</h3><div class="score-list">${interpersonalRows}</div></div>
      <div class="report-card"><h3>Como interpretar</h3><p><strong>Expresso</strong> indica a frequência com que você tende a oferecer, iniciar ou assumir aquele comportamento. <strong>Desejado</strong> indica o quanto você valoriza receber aquilo das outras pessoas.</p><p>Diferenças entre os dois lados são especialmente importantes, pois podem revelar necessidades pouco comunicadas ou comportamentos oferecidos em quantidade maior do que a pessoa espera receber.</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card full"><h2>Inclusão — pertencimento e participação</h2><div class="score-list">${scoreRow('Expresso',r.IE)}${scoreRow('Desejado',r.IW)}</div><p>${inclusionText(r)}</p></div>
      <div class="report-card full"><h2>Controle — direção e responsabilidade</h2><div class="score-list">${scoreRow('Expresso',r.CE)}${scoreRow('Desejado',r.CW)}</div><p>${controlText(r)}</p></div>
      <div class="report-card full"><h2>Afeição — proximidade e confiança</h2><div class="score-list">${scoreRow('Expresso',r.AE)}${scoreRow('Desejado',r.AW)}</div><p>${affectionText(r)}</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card"><h2>Forças para aproveitar</h2><ul>${r.S>=50?'<li>Compromisso e responsabilidade com entregas.</li>':''}${r.R>=50?'<li>Capacidade de aprofundar análise e perceber detalhes.</li>':''}${r.A>=50?'<li>Disposição para assumir direção quando necessário.</li>':''}${r.C>=50?'<li>Atenção ao impacto das decisões sobre outras pessoas.</li>':''}${r.D>=50?'<li>Capacidade de ajustar estratégia diante de fatos novos.</li>':''}</ul></div>
      <div class="report-card"><h2>Pontos para explorar</h2><ul>${r.R>60?'<li>Criar um ponto de encerramento para pensamentos repetitivos.</li>':''}${r.N>60?'<li>Separar competência externa de necessidade interna de recuperação.</li>':''}${r.A>60?'<li>Comunicar limites antes que urgência vire irritação.</li>':''}${r.D<45?'<li>Antecipar mudanças e trabalhar com planos alternativos.</li>':''}${Math.abs(r.AW-r.AE)>12?'<li>Comunicar com mais clareza suas necessidades de proximidade.</li>':''}</ul></div>
      <div class="report-card full"><h2>Trabalho e liderança</h2><p>Seu melhor ambiente tende a ser aquele em que suas características predominantes encontram propósito, responsabilidade e critérios claros. ${r.CE>60?'Você demonstra tendência a organizar, acompanhar e assumir direção.':''} ${r.CW>60?'Ao mesmo tempo, valoriza estruturas e referências de liderança bem definidas.':''} ${r.R>55?'Atividades de análise e planejamento podem aproveitar sua profundidade, desde que exista limite para excesso de processamento.':''}</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card full"><span class="eyebrow">PERSPECTIVA CRISTÃ</span><h2>Temperamento, caráter e maturidade</h2><p>Nesta leitura, temperamento é tratado como tendência, não como identidade definitiva. A perspectiva cristã acrescenta uma pergunta central: <strong>como essas tendências podem ser conduzidas em direção ao amor, à verdade, ao serviço e ao domínio próprio?</strong></p><p>O objetivo não é justificar comportamentos com o rótulo do temperamento, mas reconhecer forças, limites e necessidades para amadurecer o caráter e servir melhor às pessoas.</p></div>
      <div class="report-card"><h3>Reflexões para desenvolvimento</h3><ul>${spiritualReflection(r)}</ul></div>
      <div class="report-card"><h3>Referências bíblicas para reflexão</h3><p><strong>Romanos 12:3–8</strong> — diversidade de dons, sobriedade e serviço.<br><strong>Gálatas 5:22–23</strong> — fruto do Espírito e domínio próprio.<br><strong>Tiago 1:19</strong> — prontidão para ouvir e cautela ao falar e reagir.<br><strong>Provérbios 15:1</strong> — importância da forma como respondemos nos conflitos.</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card full"><h2>Próximos passos</h2><ol><li>Observe por duas semanas quais situações mais consomem ou restauram sua energia.</li><li>Compare aquilo que você expressa com aquilo que espera receber em inclusão, controle e afeição.</li><li>Após conversas difíceis, registre o que aconteceu, o que está sob seu controle, qual ação ainda existe e o que pode ser encerrado.</li><li>Peça feedback a duas pessoas confiáveis sobre sua forma de decidir, ouvir, demonstrar proximidade e se posicionar.</li><li>Em oração e reflexão, escolha uma característica para desenvolver de maneira prática nas próximas semanas.</li></ol></div>
      <div class="report-card full"><h2>Como ler este resultado</h2><p>Este relatório foi calculado diretamente a partir das ${QUESTIONS.length} respostas. Os escores representam afinidades dentro deste questionário e não percentis da população. O núcleo utiliza eixos associados à tradição de Eysenck e acrescenta facetas próprias. A camada interpessoal Expressado × Desejado usa perguntas e fórmulas originais inspiradas no estudo geral de necessidades interpessoais.</p><p class="quote">Este material é destinado a autoconhecimento e reflexão. Não é teste psicológico validado, não reproduz FIRO-B ou Arno Profile System, não substitui avaliação profissional e não deve ser usado para diagnóstico ou decisões clínicas.</p></div>
    </div>`;
}

function finishQuiz(){
  if(answers.some(v=>v===null)) return;
  renderReport(calculate()); showScreen('result');
}

(function restore(){
  try{
    const p=JSON.parse(localStorage.getItem('temperamentos-profile-v2')||'null');
    const a=JSON.parse(localStorage.getItem('temperamentos-answers-v2')||'null');
    if(p?.name){ profile=p; $('full-name').value=p.name; $('age').value=p.age||''; }
    if(Array.isArray(a)&&a.length===QUESTIONS.length){
      answers=a;
      const first=answers.findIndex(v=>v===null);
      if(first===-1&&p?.name){ renderReport(calculate()); showScreen('result'); }
      else if(p?.name&&answers.some(v=>v!==null)){ current=Math.max(0,first); showScreen('quiz'); renderQuestion(); }
    }
  }catch(e){ console.warn('Estado local ignorado',e); }
})();
