var currentTheme = "dark";
var condition = '';
let previousConditionId = null; 

function cond(condition) {
    if (previousConditionId) {
        const previousSelected = document.getElementById(previousConditionId);
        previousSelected.style.backgroundColor = '';
    } 
    const selected = document.getElementById(condition);
    selected.style.backgroundColor = 'var(--four)';
    previousConditionId = condition;
    updatePrice(condition);
}

function updateBalance(balanceInt) {
    const bal = document.getElementById('bal');
    bal.innerHTML = balanceInt.toString();
}

function updatePrice(condition) {
    const makeId = document.getElementById('make');
    const yearId = document.getElementById('year');
    const make = makeId.value.toLowerCase();
    let balance = 0;
  
    if (make === 'voldza') {
        balance = 32000;
    } 
    else if (make === 'forden') {
        balance = 25000;
    } 
    else if (make === 'toyodai') {
        balance = 26000;
    } 
    else if (make === 'nissaru') {
        balance = 19000;
    } 
    else if (make === 'lamsche') {
        balance = 50500;
    }
  
    if (condition && condition !== 'p') {
      if (condition === 'vg') {
            balance = balance * 0.8;
      } 
      else if (condition === 'g') {
            balance = balance * 0.7;
      } 
      else if (condition === 'ng') {
            balance = balance * 0.5;
      } 
      else if (condition === 'd') {
            balance = balance * 0.3;
      }
    }
  
    const year = parseInt(yearId.value);
    if (2022 >= year && year >= 2018) {
        balance = balance * 0.7;
    } 
    else if (2018 > year && year >= 2013) {
        balance = balance * 0.5;
    } 
    else if (2013 > year) {
        balance = balance * 0.2;
    }

    if (balance === 0) {
        balance = 'nothing, sorry';
    }

    setCookie('make', make);
    setCookie('condition', condition);
    setCookie('year', year);
  
    updateBalance(balance);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value) {
    document.cookie = name + '=' + (value || '') + '; path=/';
}

function toggleTheme() {
    const body = document.body;
    switch (currentTheme) {
        case 'dark':
            body.classList.add('nord');
            body.classList.remove('dark');
            currentTheme = 'nord';
            setCookie('theme', 'nord');
            break;
        case 'nord':
            body.classList.add('forest');
            body.classList.remove('nord');
            currentTheme = 'forest';
            setCookie('theme', 'forest');
            break;
        case 'forest':
            body.classList.add('sepia');
            body.classList.remove('forest');
            currentTheme = 'sepia';
            setCookie('theme', 'sepia');
            break;
        case 'sepia':
            body.classList.add('light');
            body.classList.remove('sepia');
            currentTheme = 'light';
            setCookie('theme', 'light');
            break;
        case 'light':
            body.classList.add('dark');
            body.classList.remove('light');
            currentTheme = 'dark';
            setCookie('theme', 'dark');
            break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    updatePrice();
    const savedTheme = getCookie('theme');
    const savedMake = getCookie('make');
    const savedYear = getCookie('year');
    const savedCondition = getCookie('condition');
    const makeId = document.getElementById('make');
    const yearId = document.getElementById('year');
    if (savedTheme) {
        const body = document.body;
        body.classList.add(savedTheme);
        currentTheme = savedTheme;
    }
    else if (savedMake) {
        makeId.value = savedMake;
        yearId.value = savedYear;
        cond = savedCondition;
        updatePrice(savedCondition);
    }
    const inputFields = document.querySelectorAll('input');
    const handleInputChange = (event) => {
      if (event.target.matches('input')) {
        updatePrice();
      }
    };
    inputFields.forEach((field) => {
      field.addEventListener('input', handleInputChange);
    });
});
  
