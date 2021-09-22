import { useTransactions } from "../Context/Context";
import { Container } from "./styles";
import { BsFillTrashFill } from "react-icons/bs";

export function TransactionsTable() {

  const { transactions, setTransactions } = useTransactions();

  function removeTransaction(id: Number) {
    const result = transactions.filter((transaction) => transaction.id !== id)
    setTransactions([...result]);
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={ transaction.id }>
              <td>{transaction.title}</td>
              <td
                className={transaction.type}
              >
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(transaction.amount))}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date (transaction.createdAt)
                )}
              </td>
              <td>
                <button
                  type="submit"
                  onClick={() => removeTransaction(transaction.id)}
                  className="delete"
                >
                  <BsFillTrashFill />
                </button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}