const balanceDisplay = document.querySelector('#balance')
const expenseDisplay = document.querySelector('#money-minus')
const incomeDisplay = document.querySelector('#money-plus')
const transactionUl = document.querySelector("#transactions")

const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

//vai remover do DOM a transacao que foi implementada
const  removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  init()
}
//vai add as transacoes no DOM
const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const CSSClass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSClass);
  li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick ="removeTransaction(${transaction.id})">x</button>
    `;
  transactionUl.prepend(li);
};

const uptadeBalenceValues = () => {
  const transactionsAmounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
  const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
  const expense = Math.abs(transactionsAmounts
    .filter((value) => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`

};

const init = () => {
    transactionUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM);
  uptadeBalenceValues();
};
init();

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const ganerateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === ''){
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }

    const transaction = { 
        id: ganerateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    }
    
    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})