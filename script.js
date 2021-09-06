// Javascript file for Smart Contracts - Project

const money_plus = document.getElementById('buy');
const money_minus = document.getElementById('send');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custID = document.getElementById('custID');
const ethValue = document.getElementById('tokenValue');

const TransactionDataAll = [
      { id: '0x02cABE4133fABfF47Bce9b794D1186029BCEAA04', customername: 'Anson', bank: 'Metamask', balance: 0.098},
      { id: '0x0D6891418aa8ba1BaEfB234eE0199Fe42069B93a', customername: 'Charles', bank: 'Metamask', balance: 0.095},
      { id: '0x04C085b8837E8fDD113be79F68D18aCF97a24D8c', customername: 'Hong Jin', bank: 'Metamask', balance: 0.093},
      { id: '0xeC4AF723CDCb7DD65166b7F6fF78ef29959a0fca', customername: 'JY', bank: 'Metamask', balance: 0.099},
  ];

 var TransactionData = null;

// Add customer balance to DOM list
function addTransactionDOM(transaction) {
    
    const balance_item = document.createElement('li');
    
    balance_item.classList.add('plus');
    balance_item.innerHTML = `
    ${transaction.customername} - ${transaction.bank}  <span> ${Math.abs(
      transaction.balance
    ).toFixed(3)} ETH</span> 
    `;

    list.appendChild(balance_item);
}

function init() {
  list.innerHTML = '';
  reco.innerHTML = '';
}

function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  list.innerHTML = '';
  // reco.innerHTML = '';
  TransactionData = [...TransactionDataAll]; // Assigned whole array of data
  TransactionData = TransactionDataAll.filter(tran => tran.id.toUpperCase() == custID.value.toUpperCase());  
  TransactionData.forEach(addTransactionDOM);
}

init();
//form.addEventListener('submit', filterTransaction);
tokenBal.addEventListener('click',filterTransaction);
reset.addEventListener('click',init);  //no need to call init. when no event handler it will reload/referesh the page


/*
 * Code section for Etherium transfer of tokens
 */
const ethereumButton = document.querySelector('.enableEthereumButton');
const sendEthButton = document.querySelector('.sendEthButton');

let accounts = [];
let sendToAddr;
// let tokensToSend;
// const amount = web3.utils.toWei(tokensToSend, 'ether');
// const value = web3.utils.toHex(amount);

//Sending Ethereum to an address
sendEthButton.addEventListener('click', () => {

  sendToAddr = document.getElementById('sendAddr').value;
  // tokensToSend = document.getElementById('tknAmount').value;
  // console.log(sendToAddr);
  // console.log(tokensToSend);

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          // to: '0x02cABE4133fABfF47Bce9b794D1186029BCEAA04',
          to: sendToAddr,
          value: '0x29a2241af62c0000',
          // value: '0x' + tokensToSend.toString(16),
          gasPrice: '0x09184e72a000',
          gas: '0x5208',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

// Connecting to account
ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  // Check if metamask is installed
  if (window.ethereum && window.ethereum.isMetaMask) {
    // Continue with login
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    // ethereumButton.setAttribute('disabled', true);
  }
  else {
    // metamask not installed, show alert
    alert('Please install metamask extension to continue!');
  }
}
