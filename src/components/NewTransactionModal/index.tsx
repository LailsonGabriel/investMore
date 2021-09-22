import Modal from 'react-modal';
import { Container, TransactionTypeContainer } from './styles';
import { IoClose, IoAddOutline, IoRemove } from 'react-icons/io5';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../Context/Context';

interface NewTranslationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTranslationModal({ isOpen, onRequestClose }:NewTranslationModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })
    setTitle('');
    setType('');
    setAmount('');
    setCategory('');
    onRequestClose();
  }

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <IoClose />
      </button>
      <Container>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TransactionTypeContainer>
          <button
            type="button"
            className={ type === 'deposit' ? 'deposit' : '' }
            onClick={() => setType('deposit')}
          >
            <IoAddOutline fontSize="25" />
            <span>Entrada</span>
          </button>

          <button
            type="button"
            className={ type === 'withdraw' ? 'withdraw' : '' }
            onClick={() => setType('withdraw')}
          >
            <IoRemove fontSize="25" />
            <span>Saída</span>
          </button>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleCreateNewTransaction}
        >Cadastrar</button>
      </Container>
    </Modal>
  )
}

export default NewTranslationModal;

