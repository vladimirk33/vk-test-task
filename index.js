// не может собрать 400, 900 и т.д. рублей
fetch = async(url) => {
    return await Promise.resolve({
        json: () => Promise.resolve({
            'amount': money,
            'banknotes': {
                '5000': 98,
                '2000': 30,
                '1000': 1840,
                '500': 45,
                '200': 1,
                '100': 1
            }
        })
    })
}


const moneyHead = document.querySelector('#money');
const buttonsDiv = document.querySelector('.buttons-container');
const resultDiv = document.querySelector('.grid-container');
const submitBtn = document.querySelector('.button-submit');
let money = 0;

function showMoney(e) {
    if (e.target.classList.contains('button-money')) {
        money += parseInt(e.target.value);
        moneyHead.innerHTML = '';
        moneyHead.innerHTML = `${money} рублей`;
    }
}

function handleMoney() {
    if (money === 0) {
        resultDiv.innerHTML = 'Вы не можете снять 0 рублей';
    } else {
        fetch('some-site')
            .then(response => response.json())
            .then(json => {
                let banknotesKeys = [];
                for (let key of Object.keys(json.banknotes)) {
                    banknotesKeys.push(key);
                }
                for (let [key, value] of Object.entries(json.banknotes)) {
                    console.log(key, value);
                }
                keysLength = banknotesKeys.length;
                let amount = json.amount;
                let result = [];
                for (let i = keysLength - 1; i >= 0; i--) {
                    while (amount >= banknotesKeys[i]) {
                        if (json.banknotes[banknotesKeys[i]] > 0) {
                            amount -= banknotesKeys[i];
                            json.banknotes[banknotesKeys[i]] -= 1;
                            result.push(banknotesKeys[i]);
                        } else {
                            break;
                        }
                    }
                }
                showBanknotes(result, json);
            })
    }
}

function showBanknotes(result, json) {
    resultDiv.className = '';
    resultDiv.innerHTML = '';
    if (result.length === 0 || !(result.reduce((s, el) => s + parseInt(el), 0) === json.amount)) {
        resultDiv.classList.add('img-div');
        resultDiv.innerHTML = 'Мы не можем собрать эту сумму';
        let img = new Image();
        img.src = './sad.jpg';
        img.classList.add('photo');
        resultDiv.append(img);
    } else {
        resultDiv.classList.add('grid-container');
        for (let i = 0; i < result.length; i++) {
            let banknote = document.createElement('div');
            let banknoteText = document.createElement('h2');
            banknote.classList.add('card');
            if (result[i] == 5000) {
                banknote.classList.add('card-five-thousand');
            } else if (result[i] == 2000) {
                banknote.classList.add('card-two-thousand');
            } else if (result[i] == 1000) {
                banknote.classList.add('card-one-thousand');
            } else if (result[i] == 500) {
                banknote.classList.add('card-five-hundred');
            } else if (result[i] == 200) {
                banknote.classList.add('card-two-hundred');
            } else if (result[i] == 100) {
                banknote.classList.add('card-one-hundred');
            }
            banknote.appendChild(banknoteText);
            banknote.childNodes[0].innerHTML = result[i];
            resultDiv.append(banknote);
        }
    }
}

buttonsDiv.addEventListener('click', showMoney);
submitBtn.addEventListener('click', handleMoney)