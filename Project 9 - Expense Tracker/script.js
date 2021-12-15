const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please a text and amount');
    return;
  }

  const transaction = {
    id: getRandomID(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);

  AddTransactionDOM(transaction);

  updateValues();

  updateLocalStorage();

  text.value = '';
  amount.value = '';
};

const getRandomID = () => {
  return Math.floor(Math.random() * 100000000);
};

const AddTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(sign === '-' ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
};

const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expenses = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.textContent = `$${total}`;
  money_plus.textContent = `$${income}`;
  money_minus.textContent = `$${expenses}`;
};

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const init = () => {
  list.innerHTML = '';

  transactions.forEach(AddTransactionDOM);
  updateValues();
};

init();

form.addEventListener('submit', addTransaction);
