import { useTransactions } from "../Context/Context";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      acc.deposits += Number(transaction.amount);
      acc.total += Number(transaction.amount);
    } else {
      acc.withdraws += Number(transaction.amount);
      acc.total -= Number(transaction.amount);
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src="https://cdn-icons-png.flaticon.com/512/5650/5650076.png" width="24px" alt="aumentar" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.deposits)
          }
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src="https://cdn-icons-png.flaticon.com/512/5659/5659463.png"  width="24px" alt="diminuir" />
        </header>
        <strong>
          - {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.withdraws)
          }</strong>
      </div>
      <div>
        <header>
          <p>Total</p>
          <img src="https://cdn-icons-png.flaticon.com/512/5572/5572161.png" width="24px" alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.total)
          }</strong>
      </div>
    </Container>
  );
}