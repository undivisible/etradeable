import { initializeApp } from './firebase/app';
var oncec = false;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6er6NuL1iu1jyiezrec4xphG5kcU-pR8",
    authDomain: "etradeable.firebaseapp.com",
    projectId: "etradeable",
    storageBucket: "etradeable.appspot.com",
    messagingSenderId: "590598482683",
    appId: "1:590598482683:web:5ad01b18b1610b42861e5e"
};

initializeApp(firebaseConfig);

var oncec = false;
var condition = '';

function cond(conditionsel) {
    oncec = true;
    condition = conditionsel;
}

function updateBalance(balanceInt) {
    const bal = document.getElementById('bal');
    bal.innerHTML = balanceInt.toString();
}

function updatePrice() {
    const makeId = document.getElementById('make');
    const modelId = document.getElementById('model');
    const yearId = document.getElementById('year');
    const colorId = document.getElementById('color');
    const make = makeId.value.toLowerCase();
    const model = modelId.value.toLowerCase();
    let balance = 0;
  
    if (make === 'voldza' || model === 'voldza') {
        balance = 32000;
    } 
    else if (make === 'forden' || model === 'forden') {
        balance = 25000;
    } 
    else if (make === 'toyodai' || model === 'toyodai') {
        balance = 26000;
    } 
    else if (make === 'voldza' || model === 'voldza') {
        balance = 19000;
    } 
    else if (make === 'voldza' || model === 'voldza') {
        balance = 50500;
    }
  
    if (oncec && condition !== 'p') {
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
  
    updateBalance(balance);
  }



  function add() {
    const database = firebase.database();
    const makeId = document.getElementById('make');
    const modelId = document.getElementById('model');
    const yearId = document.getElementById('year');
    const colorId = document.getElementById('color');
    const make = makeId.value;
    const model = modelId.value;
    const year = yearId.value;
    const color = colorId.value;
  
    database.ref('cars').push({
      name: `${make} ${model}`,
      attributes: [year, condition, color]
    });
  }

function get() {
    database.ref('cars').once('value', snapshot => {
        const items = snapshot.val();
        for (const key in cars) {
            if (cars.hasOwnProperty(key)) {
                const car = cars[key];
                const name = car.name;
                const attributes = car.attributes;
                const year = attributes[0];
                const condition = attributes[1];
                const color = attributes[2];

                const card = document.createElement('div');
                card.classList.add('card');

                const cardImage = document.createElement('div');
                cardImage.classList.add('cardimage');
                const img = document.createElement('img');
                img.src = `img/${key}.img`;
                cardImage.appendChild(img);
                card.appendChild(cardImage);

                const left = document.createElement('div');
                left.classList.add('left');

                const info = document.createElement('div');
                info.classList.add('info');

                const yearDiv = document.createElement('div');
                yearDiv.classList.add('year');
                yearDiv.textContent = year;
                info.appendChild(yearDiv);

                const makemodelDiv = document.createElement('div');
                makemodelDiv.classList.add('makemodel');
                makemodelDiv.textContent = name;
                info.appendChild(makemodelDiv);

                const attribDiv = document.createElement('div');
                attribDiv.classList.add('attrib');
                attribDiv.textContent = condition + ' ' + color;
                info.appendChild(attribDiv);

                left.appendChild(info);

                const priceDiv = document.createElement('div');
                priceDiv.classList.add('price');
                priceDiv.textContent = price;
                left.appendChild(priceDiv);

                card.appendChild(left);

                container.appendChild(card);
                
            }
        }
    });  
}

document.addEventListener("DOMContentLoaded", function() {
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
  
