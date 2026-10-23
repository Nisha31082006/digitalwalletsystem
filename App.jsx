
import { useState, useEffect } from "react";
import "./App.css";

function WalletTransaction({ walletHolder, amount }) {
  const [transactionAmount, setTransactionAmount] = useState(amount);

  useEffect(() => {
    console.log("Digital Wallet System Loaded");
  }, []);

  return (
    <div>
      <h2>Digital Wallet Management System</h2>
      <p>Wallet Holder: {walletHolder}</p>
      <p>Transaction Amount: ₹{transactionAmount}</p>

      <button onClick={() => setTransactionAmount(transactionAmount + 500)}>
        Add ₹500
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <WalletTransaction walletHolder="Priya" amount={3000} />
    </div>
  );
}

export default App;
