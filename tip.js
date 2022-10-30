const web3 = new Web3(Web3.givenProvider);

const form = document.querySelector("form");

const send = async (amount) => {
  // Connecting to a digital wallet
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // ether to wei
  const wei = web3.utils.toWei(amount, "ether");

  // to hexadecimal
  const weiHex = web3.utils.toHex(wei);

  if (accounts.length > 0) {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "Your Wallet Address",
          value: weiHex,
        },
      ],
    });
  }
};

if (window.ethereum) {
  // add className to the form tag
  form.classList.add("has-eth");
} else {
  alert("Please Install a Digital Wallet ex: Metamask");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (window.ethereum) {
    const input = form.querySelector("input");
    send(input.value);
  } else {
    alert("Please Install a Digital Wallet");
  }
});
