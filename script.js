const display = document.querySelector('#display');
const buttons = document.querySelector('button');
const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.dark');
const toggleIcon = document.querySelector('.toggler-icon');
const btnHistory = document.querySelector('#history');

let isDark = true;
let indexCurrent;
let calcCurrent;
let restCurrent;

function calc(id){
  if(id == 'clear'){
    display.value = '';
  }else if(id == 'backspace'){
    formatResult('disabled');
    let string = display.value
    display.value = string.substring(0, string.length - 1);
  }else if(display.value !== '' && display.value != 'Vazio!' && id == 'equal'){
    formatResult('active');
    let histCalc1 = sessionStorage.getItem('historyCalc[1]');
    let histCalc2 = sessionStorage.getItem('historyCalc[2]');
    let histCalc3 = sessionStorage.getItem('historyCalc[3]');
    let histCalc4 = sessionStorage.getItem('historyCalc[4]');
    let histCalc5 = sessionStorage.getItem('historyCalc[5]');
    if(histCalc1 == null || histCalc2 == null || histCalc3 == null || histCalc3 == null || histCalc5 == null){
      if(histCalc1 == null || histCalc1 == ""){
        indexCurrent = 1;
        sessionStorage.removeItem('historyCalc[2]');
        sessionStorage.removeItem('historyRest[2]');
      }else if(histCalc2 == null || histCalc2 == ""){
        indexCurrent = 2;
        sessionStorage.removeItem('historyCalc[3]');
        sessionStorage.removeItem('historyRest[3]');
      }else if(histCalc3 == null || histCalc3 == ""){
        indexCurrent = 3;
        sessionStorage.removeItem('historyCalc[4]');
        sessionStorage.removeItem('historyRest[4]');
        sessionStorage.removeItem('historyCalc[5]');
        sessionStorage.removeItem('historyRest[5]');
      }else if(histCalc4 == null || histCalc4 == ""){
        indexCurrent = 4;
      }else if(histCalc5 == null || histCalc5 == ""){
        indexCurrent = 5;
        sessionStorage.removeItem('historyCalc[1]');
        sessionStorage.removeItem('historyRest[1]');
      }
      calcCurrent = 'historyCalc[' + indexCurrent + ']';
      restCurrent = 'historyRest[' + indexCurrent + ']';
    }else{
      sessionStorage.clear();
    }
    sessionStorage.setItem(calcCurrent, display.value);
    
    calcular();

    sessionStorage.setItem(restCurrent, display.value);
  }else if(display.textContent == 'Vazio!' || display.value == '' && id == 'equal'){
    formatResult('disabled');
    display.value = 'Vazio!';
    setTimeout(() => display.value = '', 2000);
  }else{
    formatResult('disabled');
    display.value += id;
  }
}

const formatResult = (status) => {
  if(status == 'active'){
    display.classList.add('result');
    display.style.fontSize = '26pt';
  }else{
    display.classList.remove('result');
    display.style.fontSize = '20pt';
  }
}

function calcular(){
  try{
    const resultado = eval(display.value);
    display.value = resultado !== undefined ? resultado : '';
  }catch(error){
    try{
      const resultado = eval(display.value.substring(0, (display.value.length - 1)));
      display.value = resultado !== undefined ? resultado : '';
    }catch(error){
      
    }
  }
}

btnHistory.addEventListener('click', () => {
  let histCalc1 = sessionStorage.getItem('historyCalc[1]');
  let histCalc2 = sessionStorage.getItem('historyCalc[2]');
  let histCalc3 = sessionStorage.getItem('historyCalc[3]');
  let histCalc4 = sessionStorage.getItem('historyCalc[4]');
  let histCalc5 = sessionStorage.getItem('historyCalc[5]');
  let histRest1 = sessionStorage.getItem('historyRest[1]');
  let histRest2 = sessionStorage.getItem('historyRest[2]');
  let histRest3 = sessionStorage.getItem('historyRest[3]');
  let histRest4 = sessionStorage.getItem('historyRest[4]');
  let histRest5 = sessionStorage.getItem('historyRest[5]');
  let printHistory;
  if(histCalc5 != null && histCalc4 != null && histCalc3 != null && histCalc2 != null){
    printHistory = histCalc2 + ' = ' + histRest2 + '<br>' + histCalc3 + ' = ' + histRest3 + '<br>' + histCalc4 + ' = ' + histRest4 + '<br>' + histCalc5 + ' = ' + histRest5 + '<br>';
  }else if(histCalc4 != null&& histCalc3 != null && histCalc2 != null && histCalc1 !=null){
    printHistory = histCalc1 + ' = ' + histRest1 + '<br>' + histCalc2 + ' = ' + histRest2 + '<br>' + histCalc3 + ' = ' + histRest3 + '<br>' + histCalc4 + ' = ' + histRest4 + '<br>';  
  }else if(histCalc3 != null && histCalc2 != null && histCalc1 != null){
    printHistory = histCalc1 + ' = ' + histRest1 + '<br>' + histCalc2 + ' = ' + histRest2 + '<br>' + histCalc3 + ' = ' + histRest3 + '<br>';
  }else if(histCalc2 != null && histCalc1){
    printHistory = histCalc1 + ' = ' + histRest1 + '<br>' + histCalc2 + ' = ' + histRest2 + '<br>';
  }else if(histCalc1 != null){
    printHistory = histCalc1 + ' = ' + histRest1 + '<br>';
  }else{
    printHistory =  'Você ainda não fez um cálculo';
  }
  Swal.fire(
    "<h5> Últimos Cálculos </h5><span class='alert-format'>" + printHistory +'</span>'
    )
  })
  
  themeToggleBtn.onclick = () => {
    btnHistory.classList.toggle('dark');
    calculator.classList.toggle('dark');
    document.querySelector('body').classList.toggle('body-dark');
    themeToggleBtn.classList.toggle('active');
    isDark = !isDark;
  }

document.addEventListener('keyup', (evento) => {
  evento.preventDefault();
  display.focus();

  if(evento.keyCode == 13){
    formatResult('active');
    calcular();
    return '';
  }else{
    formatResult('disabled');
  }

  const codesValidos = [
    {
      nome: 'virgula',
      caracter: '.',
      codigo: 188
    },

    {
      nome: 'ponto',
      caracter: '.',
      codigo: 190
    },

    {
      nome: 'ponto',
      caracter: '.',
      codigo: 110
    },

    {
      nome: 'apagar',
      caracter: 'c',
      codigo: 67
    },

    {
      nome: 'divisao',
      caracter: '/',
      codigo: 191
    },

    {
      nome: 'divisao',
      caracter: '/',
      codigo: 111
    },

    {
      nome: 'subtracao',
      caracter: '-',
      codigo: 109
    },

    {
      nome: 'subtracao',
      caracter: '-',
      codigo: 189
    },

    {
      nome: 'adicao',
      caracter: '+',
      codigo: 107
    },

    {
      nome: 'multiplicacao',
      caracter: '*',
      codigo: 16
    },

    {
      nome: 'multiplicacao',
      caracter: '*',
      codigo: 106
    },

    {
      nome: 'igual',
      caracter: '=',
      codigo: 187
    }
  ]

  const caracteresEspeciais = [
    '!', '@', '#', '$', ' %', '^', '&', '`', '"', '~'
  ]
  
  const cod = codesValidos.findIndex(e => e.codigo == evento.keyCode);
  const numero = 
    evento.keyCode >= 48 && evento.keyCode <= 57 || 
    evento.keyCode >= 96 && evento.keyCode <= 105 && 
    new RegExp('^[0-9]+$').test(evento.keyCode);

  if(cod == -1 && !numero || caracteresEspeciais.includes(display.value[display.value.length - 1])){
    display.value = display.value.substring(0, (display.value.length - 1));
  }
})