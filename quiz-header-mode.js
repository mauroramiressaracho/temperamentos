(() => {
  const quiz = document.getElementById('quiz');
  if (!quiz) return;

  const sync = () => {
    document.body.classList.toggle('quiz-mode', quiz.classList.contains('active'));
  };

  const observer = new MutationObserver(sync);
  observer.observe(quiz, { attributes: true, attributeFilter: ['class'] });
  sync();
})();
