document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const rightArrow = document.getElementsByClassName('fa-arrow-right')[0];
  const leftArrow = document.getElementsByClassName('fa-arrow-left')[0];
  const input = document.getElementById('row2Inp');
  const label = document.getElementById('row3Label');
  const formCompleted = document.getElementById('formComplete');
  const progressFill = document.getElementById('progressFill');
  const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+.\S+/ },
    { question: 'Create A Password', type: 'password' },
  ];
  let index = 0;
  let progressFillPercent = 25 / questions.length; // 25 === $formWidth - 25rem
  let progressFillWidth = 0;

  leftArrow.className = index ? 'fas fa-arrow-left' : 'fas fa-user'

  label.innerHTML = questions[index].question;

  rightArrow.addEventListener('click', nextStep)

  function nextStep() {
    if (input.value !== undefined) input.value = input.value.trim();

    input.focus();

    if (input.value === '') return form.classList.add('error');

    if (questions[index].pattern) {
      if (!questions[index].pattern.test(input.value)) {
        form.classList.add('error');
        input.value = '';
        return;
      }
    }

    progressFillWidth += progressFillPercent;
    progressFill.style.width = progressFillWidth + 'rem';

    if (index === questions.length - 1) {
      form.classList.add('hideMe');
      progressFill.classList.add('hideMe');

      setTimeout(() => {
        form.outerHTML = '<div id="formComplete">You will receive an email soon!</div>';
        progressFill.classList.remove('hideMe');
      }, 700);
      return;
    }

    form.classList.remove('error');
    input.value = '';
    index++;
    label.innerHTML = questions[index].question;
    leftArrow.className = index ? 'fas fa-arrow-left' : 'fas fa-user';
    input.type = questions[index].type || 'text';
  }

  leftArrow.addEventListener('click', goBack);

  function goBack() {
    input.focus();
    if (index === 0) return;

    index--;
    label.innerHTML = questions[index].question;
    leftArrow.className = index ? 'fas fa-arrow-left' : 'fas fa-user';
    form.classList.remove('error');
    input.type = questions[index].type || 'text';
    progressFillWidth -= progressFillPercent;
    progressFill.style.width = progressFillWidth + 'rem';
  }

  document.addEventListener('keyup', (e) => (e.keyCode === 13) ? nextStep() : null);
});