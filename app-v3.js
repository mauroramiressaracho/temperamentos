const DIMENSIONS = {
  E: 'Energia social', N: 'Intensidade emocional', R: 'Ruminação',
  A: 'Assertividade', S: 'Autorregulação', D: 'Adaptabilidade',
  IE: 'Inclusão expressa', IW: 'Inclusão desejada',
  CE: 'Controle expresso', CW: 'Controle desejado',
  AE: 'Afeição expressa', AW: 'Afeição desejada'
};

const q = (dimension, text, reverse = false, layer = 'Temperamento') => ({ dimension, text, reverse, layer });

const QUESTIONS = [
  q('E','Sinto-me energizado depois de conversar com várias pessoas.'),
  q('E','Costumo iniciar conversas mesmo quando não conheço bem as pessoas.'),
  q('E','Depois de muitas interações, preciso ficar sozinho para recuperar energia.',true),
  q('E','Gosto de atividades que envolvem contato frequente com pessoas.'),

  q('N','Críticas ou conflitos importantes podem afetar meu estado emocional por bastante tempo.'),
  q('N','Quando algo dá errado, meu corpo reage rapidamente ao estresse.'),
  q('N','Mesmo sob pressão, meu estado emocional costuma permanecer estável.',true),
  q('N','Incertezas importantes mobilizam bastante minha atenção.'),

  q('R','Repasso mentalmente conversas antigas pensando no que poderia ter feito diferente.'),
  q('R','Depois de tomar uma decisão importante, volto a avaliá-la várias vezes.'),
  q('R','Quando um assunto termina, geralmente consigo encerrá-lo mentalmente.',true),
  q('R','Antes de agir, penso em várias consequências possíveis.'),

  q('A','Quando ninguém decide, assumo a responsabilidade de dar direção.'),
  q('A','Consigo dizer não quando considero necessário.'),
  q('A','Evito expor minha posição para não gerar desconforto.',true),
  q('A','Sob pressão, consigo tomar decisões firmes.'),

  q('S','Cumpro o que prometo mesmo quando isso se torna inconveniente.'),
  q('S','Termino tarefas importantes mesmo sem vontade.'),
  q('S','Minha disciplina depende muito de estar motivado.',true),
  q('S','Antes de reagir impulsivamente, procuro me conter.'),

  q('D','Consigo improvisar quando o plano original deixa de funcionar.'),
  q('D','Mudanças de última hora me desorganizam por bastante tempo.',true),
  q('D','Troco de estratégia quando os fatos mostram que a primeira não funcionou.'),
  q('D','Consigo ajustar expectativas quando a realidade muda.'),

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

  q('CW','Trabalho melhor quando expectativas e responsabilidades estão claramente definidas.',false,'Relacionamento interpessoal'),
  q('CW','Em situações novas, valorizo receber orientação antes de agir sozinho.',false,'Relacionamento interpessoal'),
  q('CW','Fico desconfortável quando outras pessoas tentam dirigir excessivamente minhas escolhas.',true,'Relacionamento interpessoal'),
  q('CW','Gosto de saber com clareza a quem recorrer quando preciso de direção.',false,'Relacionamento interpessoal'),
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
  {label:'Discordo totalmente', value:1},
  {label:'Discordo', value:2},
  {label:'Nem concordo nem discordo', value:3},
  {label:'Concordo', value:4},
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
  localStorage.setItem('temperamentos-profile-v3', JSON.stringify(profile));
  showScreen('quiz');
  renderQuestion();
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
    localStorage.setItem('temperamentos-answers-v3', JSON.stringify(answers));
    if(current < QUESTIONS.length-1){
      current++;
      renderQuestion();
      window.scrollTo({top:0,behavior:'smooth'});
    } else finishQuiz();
  });
}

$('prev-question').onclick = () => { if(current>0){ current--; renderQuestion(); } };
$('restart').onclick = reset;
$('back-to-start').onclick = () => { if(confirm('Deseja apagar as respostas e recomeçar?')) reset(); };

function reset(){
  localStorage.removeItem('temperamentos-answers-v3');
  localStorage.removeItem('temperamentos-profile-v3');
  answers=Array(QUESTIONS.length).fill(null);
  current=0;
  profile={name:'',age:''};
  $('profile-form').reset();
  showScreen('intro');
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

function escapeHtml(text){
  return String(text).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

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
  const a = r.A > 60 ? 'Você tende a assumir direção quando percebe necessidade de decisão.' : r.A < 40 ? 'Sua assertividade tende a aparecer de forma mais cuidadosa e seletiva.' : 'Sua assertividade varia conforme o contexto e a importância do problema.';
  return `Seu padrão combina uma energia social ${e}, ${n}. ${a}`;
}

function insight(title, score, highText, lowText, midText){
  const text = score>60?highText:score<40?lowText:midText;
  return `<div class="report-card"><span class="pill">${band(score)} · ${score}/100</span><h3>${title}</h3><p>${text}</p></div>`;
}

function pairCard(title, expressed, wanted, eLabel, wLabel){
  const gap = wanted - expressed;
  let reading = 'Há relativa proximidade entre o que você demonstra e o que deseja receber nesta área.';
  if(gap >= 20) reading = 'Você tende a desejar mais dessa experiência do que costuma expressar. Pessoas próximas podem subestimar essa necessidade se ela não for comunicada.';
  if(gap <= -20) reading = 'Você tende a oferecer ou expressar mais nessa área do que sente necessidade de receber. Vale observar se isso gera sobrecarga ou expectativa de reciprocidade não verbalizada.';
  return `<div class="report-card full"><h2>${title}</h2><div class="score-list"><div class="score-row"><strong>${eLabel}</strong><div class="bar"><i style="width:${expressed}%"></i></div><b>${expressed}</b></div><div class="score-row"><strong>${wLabel}</strong><div class="bar"><i style="width:${wanted}%"></i></div><b>${wanted}</b></div></div><p>${reading}</p></div>`;
}

function christianReflection(r){
  const notes=[];
  if(r.A>60) notes.push('Firmeza pode se tornar serviço quando é acompanhada de mansidão e responsabilidade, não apenas de controle.');
  if(r.N>60 || r.R>60) notes.push('Sensibilidade e reflexão podem favorecer discernimento, desde que preocupação repetitiva não substitua confiança, oração e ação responsável.');
  if(r.IE<40 && r.IW>55) notes.push('Quando existe desejo de pertencimento maior do que a iniciativa de se aproximar, comunicar necessidades e praticar comunhão intencional pode reduzir expectativas silenciosas.');
  if(r.AE<40 && r.AW>55) notes.push('Desejar afeto e apoio sem demonstrá-los com clareza pode criar distância. A reciprocidade cresce quando amor, gratidão e vulnerabilidade são também expressos.');
  if(r.CE>60 && r.CW<40) notes.push('Uma forte preferência por autonomia pode ser valiosa na liderança, mas maturidade inclui saber receber conselho, correção e direção quando necessário.');
  if(!notes.length) notes.push('Seu perfil não determina caráter nem vocação. Ele pode ajudar a perceber tendências que, submetidas a valores cristãos, podem ser desenvolvidas com sabedoria, amor, serviço e domínio próprio.');
  return notes.map(n=>`<li>${n}</li>`).join('');
}

function renderReport(r){
  const name=escapeHtml(profile.name), age=escapeHtml(profile.age);
  const scores=[['Extroversão',r.E],['Intensidade emocional',r.N],['Ruminação',r.R],['Assertividade',r.A],['Autorregulação',r.S],['Adaptabilidade',r.D]];
  const scoreRows=scores.map(([label,value])=>`<div class="score-row"><strong>${label}</strong><div class="bar"><i style="width:${value}%"></i></div><b>${value}</b></div>`).join('');
  const temperCards=r.ranking.map(([t,value],i)=>`<div class="temper-card"><small>${i===0?'Afinidade principal':i===1?'Influência complementar':'Afinidade adicional'}</small><strong>${t}</strong><span>${value}/100</span></div>`).join('');

  $('report').innerHTML = `
    <section class="report-cover">
      <div><span class="eyebrow">DOSSIÊ PESSOAL</span><h1>${r.primary}<br><span style="font-size:.52em;font-family:'DM Sans'">com influência ${r.secondary.toLowerCase()}</span></h1><p>${paragraphFor(r)}</p></div>
      <div class="cover-meta"><span>${name}</span><span>${age} anos</span><span>${QUESTIONS.length} respostas</span><span>${new Date().toLocaleDateString('pt-BR')}</span></div>
    </section>

    <div class="report-grid">
      <div class="report-card"><h2>Afinidades temperamentais</h2><div class="quadrant">${temperCards}</div></div>
      <div class="report-card"><h2>Eixos principais</h2><div class="score-list">${scoreRows}</div></div>
      <div class="report-card full"><h2>Leitura geral</h2><p>${paragraphFor(r)}</p><p>As afinidades não colocam você em uma caixa rígida. Elas representam tendências relativas observadas nas suas respostas.</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      ${insight('Energia social',r.E,'Contato e movimento social tendem a mobilizar sua energia.','Você tende a administrar a energia social com critério e pode precisar de recuperação após muita interação.','Você transita entre sociabilidade e recolhimento conforme contexto e propósito.')}
      ${insight('Intensidade emocional',r.N,'Pressão, críticas e incertezas podem mobilizar rapidamente sua atenção e seu corpo.','Seu padrão sugere maior estabilidade diante de contratempos e recuperação relativamente rápida.','Algumas situações mobilizam bastante, enquanto outras são absorvidas sem impacto prolongado.')}
      ${insight('Ruminação',r.R,'Sua mente tende a continuar processando acontecimentos depois que eles terminam. A profundidade pode favorecer aprendizagem, desde que exista um ponto de encerramento.','Você tende a encerrar assuntos mentalmente com maior facilidade.','Você alterna entre análise profunda e capacidade de soltar assuntos conforme o contexto.')}
      ${insight('Assertividade',r.A,'Você tende a se posicionar e assumir direção quando percebe falta de clareza.','Você costuma ponderar antes de ocupar espaço ou confrontar problemas.','Sua iniciativa é situacional: você pode assumir a frente quando considera necessário.')}
      ${insight('Autorregulação',r.S,'Compromissos e deveres tendem a sustentar sua disciplina mesmo em dias difíceis.','Sua consistência pode depender mais de motivação e contexto; estruturas simples podem ajudar.','Você demonstra recursos razoáveis para sustentar compromissos, com oscilações naturais.')}
      ${insight('Adaptabilidade',r.D,'Você tende a ajustar rota e expectativa quando os fatos mudam.','Mudanças abruptas podem exigir mais tempo de processamento e preparação.','Você consegue se adaptar, embora contexto e previsibilidade provavelmente ajudem.')}
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card full"><h2>Expressado × Desejado</h2><p>Esta camada observa duas direções: o que você costuma demonstrar nas relações e o que tende a desejar receber das outras pessoas. Diferenças entre essas duas medidas podem revelar necessidades pouco visíveis.</p></div>
      ${pairCard('Inclusão',r.IE,r.IW,'Inclusão expressa','Inclusão desejada')}
      ${pairCard('Controle',r.CE,r.CW,'Controle expresso','Controle desejado')}
      ${pairCard('Afeição',r.AE,r.AW,'Afeição expressa','Afeição desejada')}
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card"><h2>Inclusão</h2><p>${r.IE>55?'Você tende a participar e integrar pessoas de forma relativamente ativa.':'Sua participação social tende a ser mais seletiva.'} ${r.IW>55?'Também valoriza ser lembrado, procurado e perceber pertencimento.':'Sua necessidade de ser incluído pelos outros parece mais moderada ou seletiva.'}</p></div>
      <div class="report-card"><h2>Controle</h2><p>${r.CE>55?'Você tende a organizar, definir direção e acompanhar responsabilidades.':'Você tende a exercer direção de forma mais seletiva.'} ${r.CW>55?'Clareza de liderança, critérios e expectativas pode trazer segurança.':'Você tende a preservar autonomia e pode resistir a direção excessiva.'}</p></div>
      <div class="report-card full"><h2>Afeição</h2><p>${r.AE>55?'Você tende a demonstrar apreço, apoio e abertura emocional com pessoas próximas.':'Sua expressão afetiva tende a ser mais reservada ou seletiva.'} ${r.AW>55?'Ao mesmo tempo, vínculos de confiança, apoio explícito e proximidade emocional parecem importantes para você.':'Sua necessidade de proximidade emocional recebida tende a ser mais seletiva.'}</p></div>
      <div class="report-card full"><h2>Perspectiva cristã</h2><p>Temperamento descreve tendências; não define identidade, maturidade espiritual ou caráter. Na perspectiva cristã, forças naturais podem ser colocadas a serviço do próximo, enquanto limitações podem se tornar áreas conscientes de crescimento.</p><ul>${christianReflection(r)}</ul><p class="quote">Use esta leitura como convite à autorreflexão, oração, diálogo e crescimento em amor, verdade, serviço, mansidão e domínio próprio.</p></div>
    </div>

    <div class="report-grid pdf-page-break">
      <div class="report-card full"><h2>Trabalho, liderança e ministério</h2><p>${r.CE>55?'Você tende a se sentir confortável assumindo direção e responsabilidade quando há necessidade.':'Sua liderança tende a aparecer de maneira mais situacional.'} ${r.A>55?'A assertividade pode favorecer decisões e posicionamentos claros.':''} ${r.S>55?'Sua autorregulação favorece acompanhamento e constância.':''} O ponto de desenvolvimento é alinhar influência com serviço, escuta e responsabilidade.</p></div>
      <div class="report-card full"><h2>Relacionamentos e comunicação</h2><p>Observe especialmente as diferenças entre o que você expressa e o que deseja receber. Necessidades não comunicadas podem gerar expectativas silenciosas. Relações maduras tendem a combinar verdade, limites, reciprocidade, perdão e disposição para compreender o outro.</p></div>
      <div class="report-card full"><h2>Próximos passos</h2><ol><li>Compare o resultado com a percepção de duas pessoas que conhecem você bem.</li><li>Observe por alguns dias em quais ambientes suas tendências aparecem com mais força.</li><li>Identifique uma diferença relevante entre Expressado e Desejado e experimente comunicá-la de maneira saudável.</li><li>Reflita sobre quais forças podem ser usadas para servir melhor e quais tendências precisam de maior domínio próprio.</li></ol></div>
      <div class="report-card full"><h2>Como ler este resultado</h2><p>Este relatório foi calculado diretamente a partir de ${QUESTIONS.length} respostas. Os escores representam afinidades dentro deste questionário, não percentis da população. A leitura combina Extroversão e Intensidade Emocional para os quatro quadrantes temperamentais, acrescenta facetas próprias e uma camada interpessoal Expressado × Desejado.</p><p class="quote">Este material é destinado a autoconhecimento e entretenimento. Não é teste psicológico validado, não reproduz FIRO-B ou Arno Profile System, não substitui avaliação profissional e não deve ser usado para diagnóstico ou decisões de saúde.</p></div>
    </div>`;
}

function finishQuiz(){
  if(answers.some(v=>v===null)) return;
  renderReport(calculate());
  showScreen('result');
}

(function restore(){
  try{
    const p=JSON.parse(localStorage.getItem('temperamentos-profile-v3')||'null');
    const a=JSON.parse(localStorage.getItem('temperamentos-answers-v3')||'null');
    if(p?.name){
      profile=p;
      $('full-name').value=p.name;
      $('age').value=p.age||'';
    }
    if(Array.isArray(a)&&a.length===QUESTIONS.length){
      answers=a;
      const first=answers.findIndex(v=>v===null);
      if(first===-1&&p?.name){ renderReport(calculate()); showScreen('result'); }
      else if(p?.name&&answers.some(v=>v!==null)){ current=Math.max(0,first); showScreen('quiz'); renderQuestion(); }
    }
  }catch(e){ console.warn('Estado local ignorado',e); }
})();
