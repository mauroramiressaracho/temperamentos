// Camada de linguagem simples. Mantém as mesmas dimensões, pesos, polaridades e escala do questionário.
// Apenas simplifica a forma de falar para facilitar a compreensão por públicos variados.

const POPULAR_QUESTIONS = [
  // Energia social (E)
  'Depois de conversar com várias pessoas, normalmente fico mais animado.',
  'Quando estou com gente que não conheço, consigo puxar conversa com facilidade.',
  'Depois de ficar muito tempo com muita gente, preciso ficar um pouco sozinho para descansar a cabeça.',
  'Gosto de atividades em que preciso conversar e lidar bastante com pessoas.',

  // Intensidade emocional (N)
  'Quando alguém me critica ou acontece uma briga, isso pode mexer comigo por bastante tempo.',
  'Quando alguma coisa dá errado, fico nervoso ou tenso rapidamente.',
  'Mesmo quando estou sob pressão, geralmente consigo continuar tranquilo por dentro.',
  'Quando não sei o que vai acontecer, fico pensando muito nisso.',

  // Ruminação (R)
  'Depois de uma conversa, às vezes fico pensando no que eu poderia ter falado ou feito diferente.',
  'Depois de tomar uma decisão importante, costumo ficar pensando se fiz a escolha certa.',
  'Quando um problema termina, normalmente consigo parar de pensar nele.',
  'Antes de fazer algo importante, penso bastante no que pode acontecer depois.',

  // Assertividade (A)
  'Quando ninguém toma uma decisão, geralmente eu tomo a frente.',
  'Quando preciso, consigo dizer não para uma pessoa.',
  'Às vezes fico calado para não causar problema, mesmo querendo dar minha opinião.',
  'Mesmo em momentos difíceis, consigo tomar uma decisão quando é preciso.',

  // Autorregulação (S)
  'Quando prometo alguma coisa, procuro cumprir mesmo quando fica difícil.',
  'Mesmo sem vontade, termino uma tarefa quando sei que ela precisa ser feita.',
  'Quando perco a vontade de fazer alguma coisa, tenho dificuldade para continuar.',
  'Quando fico bravo ou nervoso, tento me controlar antes de agir.',

  // Adaptabilidade (D)
  'Quando um plano dá errado, consigo pensar em outro jeito de fazer.',
  'Quando mudam meus planos de última hora, fico perdido ou irritado por um bom tempo.',
  'Se percebo que um jeito não está funcionando, tento fazer de outra forma.',
  'Quando as coisas mudam, consigo me acostumar com a nova situação.',

  // Inclusão expressa (IE)
  'Costumo chamar outras pessoas para conversar, participar ou fazer alguma coisa junto.',
  'Quando chego a um lugar novo, procuro me aproximar das pessoas.',
  'Com as pessoas de quem gosto, muitas vezes sou eu quem manda mensagem ou procura primeiro.',
  'Quando estou em um grupo, prefiro ficar mais na minha e não mostrar muito que quero participar.',
  'Quando vejo alguém sozinho ou de lado, procuro trazer essa pessoa para perto.',

  // Inclusão desejada (IW)
  'Gosto quando lembram de mim e me chamam para participar das coisas.',
  'Quando pessoas importantes passam muito tempo sem me procurar, sinto falta disso.',
  'Prefiro que me deixem mais no meu canto do que ficar recebendo muitos convites e mensagens.',
  'Para mim é importante sentir que minha presença faz diferença em um grupo.',
  'Gosto de fazer parte de grupos onde as pessoas se falam e participam bastante juntas.',

  // Controle expresso (CE)
  'Quando um grupo está perdido, normalmente começo a organizar as coisas.',
  'Quando ninguém sabe por onde começar, costumo dizer o que precisa ser feito primeiro.',
  'Quando uma decisão importante depende de mim, prefiro que outra pessoa decida.',
  'Quando é preciso, consigo colocar regras, limites ou combinar como as coisas vão funcionar.',
  'Quando fico responsável por alguma coisa, acompanho até terminar.',

  // Controle desejado (CW)
  'Trabalho melhor quando alguém explica claramente o que espera de mim.',
  'Quando faço algo novo, gosto de receber uma orientação antes de começar sozinho.',
  'Não gosto quando alguém tenta mandar demais nas minhas escolhas.',
  'Gosto de saber quem pode me orientar quando aparece uma dúvida ou decisão difícil.',
  'Fico mais seguro quando existe alguém responsável dando direção ao grupo.',

  // Afeição expressa (AE)
  'Tenho facilidade para mostrar carinho pelas pessoas de quem gosto.',
  'Quando confio em alguém, consigo falar sobre o que estou sentindo.',
  'Mesmo gostando muito de alguém, às vezes tenho dificuldade de mostrar isso.',
  'Quando alguém próximo está passando por um problema, procuro estar perto e ajudar.',
  'Costumo falar para as pessoas quando sou grato por elas ou quando fizeram algo bom.',

  // Afeição desejada (AW)
  'Gosto quando as pessoas demonstram claramente que gostam de mim e se importam comigo.',
  'Gosto de ter pelo menos uma ou duas pessoas com quem posso falar sobre coisas bem pessoais.',
  'Prefiro que as pessoas próximas não mexam muito com meus sentimentos ou assuntos pessoais.',
  'Quando alguém de confiança mostra que está do meu lado, isso me faz bem.',
  'Para mim é importante ter relações onde existe confiança, carinho e liberdade para conversar de verdade.'
];

if (typeof QUESTIONS !== 'undefined' && QUESTIONS.length === POPULAR_QUESTIONS.length) {
  QUESTIONS.forEach((item, index) => { item.text = POPULAR_QUESTIONS[index]; });
}

// Mantém exatamente a escala 1–5, apenas troca os rótulos por uma linguagem mais simples.
if (typeof ANSWERS !== 'undefined' && ANSWERS.length === 5) {
  const labels = [
    'Não tem nada a ver comigo',
    'Tem pouco a ver comigo',
    'Mais ou menos',
    'Tem a ver comigo',
    'Tem muito a ver comigo'
  ];
  ANSWERS.forEach((item, index) => { item.label = labels[index]; });
}

// Se o questionário já estiver aberto por restauração automática, atualiza a pergunta visível.
try {
  const quiz = document.getElementById('quiz');
  if (quiz?.classList.contains('active') && typeof renderQuestion === 'function') renderQuestion();
} catch (_) {}
