import { Container, Content } from "./styles";
import { FcMoneyTransfer } from "react-icons/fc";

interface HeaderProps {
  onOpenNewTransactionModel: () => void;
}

export function Header({ onOpenNewTransactionModel }: HeaderProps) {
  return (
    <Container>
      <Content>
        <FcMoneyTransfer className="icon" />
        <button
          type="button"
          onClick={ onOpenNewTransactionModel }
        >
          Nova transação
        </button>
      </Content>
    </Container>
  );
}