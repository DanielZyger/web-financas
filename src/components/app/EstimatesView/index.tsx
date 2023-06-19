/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import * as S from "./styles";
import { FaEye, FaEyeSlash, FaBan } from "react-icons/fa";
import { getMounthAndYear } from "../../../utils/dateFormats";
import { formatNumberFractionalDigits } from "../../../utils/getCurrencyFormat";
import { Expenses, Increases } from "../../../store/types";
import { listExpense } from "../../../services/expense-repository";
import { listIncrease } from "../../../services/increase-repository";

const Estimates = () => {
  const [censored, setCensored] = useState(false);
  const [increases, setIncreases] = useState<Increases[]>([]);
  const [expenses, setExpenses] = useState<Expenses[]>([]);

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      "financaWeb.censored.estimates"
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);
  };

  useEffect(() => {
    const listIncreases = async () => {
      const list = await listIncrease()
      setIncreases(list);
    }
    const listExpenses = async () => {
      const list = await listExpense()
      setExpenses(list);
    }
    listExpenses();
    listIncreases();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Gráfico de Gastos</S.Title>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ? <FaEye size={26} /> : <FaEyeSlash size={26} />}
        </S.ViewButton>
      </S.Header>
        <S.GraphContainer>
        {censored ? (
          <FaBan size={40} />
        ) : (
          expenses.map((expense) => (
            <S.GraphItem key={expense.id}>
              <strong>
                {getMounthAndYear(new Date(expense.date), true)}
              </strong>
              <p>{formatNumberFractionalDigits(expense.value)}</p>
              <S.GraphIndicator
                value={formatNumberFractionalDigits(expense.value)}
              />
            </S.GraphItem>
          ))
        )}
      </S.GraphContainer>
    </S.Container>
  );
};

export default Estimates;
