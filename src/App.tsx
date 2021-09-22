import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";

import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { NewTranslationModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./components/Context/Context";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewtransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewtransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModel={handleOpenNewtransactionModal} />
      <Dashboard />
      <NewTranslationModal
        isOpen={ isNewTransactionModalOpen }
        onRequestClose={ handleCloseNewtransactionModal }
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
