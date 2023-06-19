import { useEffect, useState } from "react";
import * as S from "./styles";
import { GREEN_PRIMARY, RED_PRIMARY } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash } from "react-icons/fa";
import { formatNumberFractionalDigits } from "../../../utils/getCurrencyFormat";
import { useSelector } from "react-redux";
import { Expenses, Increases, Transactions } from "../../../store/types";
import { listExpense } from "../../../services/expense-repository";
import { listIncrease } from "../../../services/increase-repository";
import State from "../../../store/interfaces";
import { isEmpty } from "lodash";

export default function Transacoes() {
  const { theme } = useSelector((state: State) => state.themes);
  const [ listTransactions, setListTransactions ] = useState<Transactions[]>([]);
  const [ expenses, setExpenses ] = useState<Expenses[]>([]);
  const [ increases, setIncreases ] = useState<Increases[]>([]);

  const [censored, setCensored] = useState(false);

  const iconsColor = theme === "dark" ? "#4876AC" : "#2673CE";

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem("financaWeb.censored.transactions", String(!censored));
  };

  useEffect(() => {
    const expensesList = async () => {
      const list = await listExpense();
      setExpenses(list)
    } 
    const increaseList = async () => {
      const list = await listIncrease();
      setIncreases(list)
    } 
    increaseList();
    expensesList();
  }, []);

  useEffect(() => {
    const [transactionsExpense] = expenses.map((expense) => {
      return {
        ...expense,
        type: 'expense',
      }
    })
    const [transactionsIncrease] = increases.map((increase) => {
      return {
        ...increase,
        type: 'increase',
      }
    })
    const transacoes = [transactionsIncrease, transactionsExpense]
    setListTransactions(transacoes)
  }, [expenses, increases]);

  console.log('listTransactions', listTransactions)

  return (
    <S.Container>
      <S.Header>
        <S.Title>Últimas Transações</S.Title>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ? (
            <FaEye color={iconsColor} size={26} />
          ) : (
            <FaEyeSlash color={iconsColor} size={26} />
          )}
        </S.ViewButton>
      </S.Header>

      {censored ? (
        <S.CensoredContainer>
          <FaBan size={40} color={iconsColor} />
        </S.CensoredContainer>
      ) : (
        <S.TransactionsList>
          {isEmpty(listTransactions) && (
            <S.EmptyItem>
              <p>Nenhuma transação por enquanto</p>
            </S.EmptyItem>
          )}
          {listTransactions.map((transaction) => {
            return (
              <S.TransactionItem textOpacity={0.8} key={transaction?.id}>
                <S.TextContainer
                  regularColor={
                    transaction?.type === "expense" ? RED_PRIMARY : GREEN_PRIMARY
                  }
                >
                  <strong>{transaction?.description}</strong>
                  <p> R$ 
                    {transaction?.type === "expense" && "- "}
                    {formatNumberFractionalDigits(transaction?.value)}
                  </p>
                  <p>{new Date(transaction?.date).getDate() + '/' + new Date(transaction?.date).getMonth()}</p>
                </S.TextContainer>

              </S.TransactionItem>
            );
          })}
        </S.TransactionsList>
      )}
    </S.Container>
  );
}
