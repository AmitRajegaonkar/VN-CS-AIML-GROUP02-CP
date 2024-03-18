//1
const balance = document.getElementById(
  "balance"
);
const money_plus = document.getElementById(
  "money-plus"
);
const money_minus = document.getElementById(
  "money-minus"
);
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// let transactions = dummyTransactions;

//last 

// Function to convert transactions to CSV format


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



function transactionsToCSV(transactions) {
    const headers = ['date', 'amount']; // CSV headers
    const rows = transactions.map(transaction => [transaction.date, transaction.amount ]); // Convert transactions to rows

    // Construct CSV string
    const csvContent = headers.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');

    return csvContent;
}


// Function to save CSV data to a file
function saveCSV(csvContent, datac) {
    const blob = new Blob([csvContent], { type: 'text/csv' }); // Create a Blob
    const url = URL.createObjectURL(blob); // Create a URL from Blob
    const link = document.createElement('a'); // Create a link element
    link.setAttribute('href', url); // Set href attribute of the link
    link.setAttribute('download', datac); // Set download attribute of the link
    document.body.appendChild(link); // Append link to the body
    link.click(); // Click the link
    document.body.removeChild(link); // Remove the link
    URL.revokeObjectURL(url); // Revoke the URL to free up memory
}


// Function to export transactions as CSV
function exportCSV() {
    const csvContent = transactionsToCSV(transactions); // Convert transactions to CSV format
    saveCSV(csvContent, 'transactions.csv'); // Save CSV content to a file
}

document.getElementById('exportButton').addEventListener('click', exportCSV);

// Call exportCSV function when needed
// Example:
// exportCSV();




//5
//Add Transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '' || date.value.trim() === '') {
    alert('Please add text, amount, and date');
  } else {
    let transactionAmount = amount.value.trim(); // Get the trimmed value
    // Check if the amount is negative by default (no sign provided)
    const isNegative = transactionAmount.startsWith('-') || !transactionAmount.startsWith('+');

    // Remove any '+' or '-' signs from the amount
    transactionAmount = transactionAmount.replace(/[+-]/g, '');

    // Convert the amount to a number
    const amountValue = parseFloat(transactionAmount);

    // Determine the sign based on the default behavior
    const sign = isNegative ? '-' : '+';

    const transaction = {
      id: generateID(),
      text: text.value,
      amount: isNegative ? -amountValue : amountValue, // Adjust the sign based on the default behavior
      date: date.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
    date.value = '';
  }
}



//5.5
//Generate Random ID
function generateID(){
  return Math.floor(Math.random()*1000000000);
}

//2

//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add Class Based on Value
  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
  );

  item.innerHTML = `
    <span class="transaction-text">${transaction.text}</span>
    <span class="transaction-date">${transaction.date}</span>
    <span class="transaction-amount">${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  list.appendChild(item);
}

//4

//Update the balance income and expence
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`₹${total}`;
    money_plus.innerText = `₹${income}`;
    money_minus.innerText = `₹${expense}`;
}


//6 
console.log(Math.floor(Math.random()*1000000000));
//Remove Transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}
//last
//update Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

//3

//Init App
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

form.addEventListener('submit',addTransaction);

function scrollToBottom() {
  var scrollableDiv = document.getElementById("maindiv");
  scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

// Call the function after the content is loaded or whenever needed
window.onload = scrollToBottom;