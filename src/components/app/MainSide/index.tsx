import { useEffect, useMemo, useState } from "react";
import {
  BLUE_PRIMARY,
  GREEN_PRIMARY,
  MAIN_TEXT,
  RED_PRIMARY,
} from "../../../styles/global";
import * as S from "./styles";
import { getMounthAndYear } from "../../../utils/dateFormats";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { changeMonth } from "../../../store/modules/Dates";
import { formatNumberFractionalDigits } from "../../../utils/getCurrencyFormat";
import { listIncrease } from "../../../services/increase-repository";
import { sumBy } from "lodash";
import { Expenses, Increases, Invests } from "../../../store/types";
import { listExpense } from "../../../services/expense-repository";
import { listInvest } from "../../../services/invest-repository";

const MainSide = () => {
  const dispatch = useDispatch<any>();
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const [increases, setIncreases] = useState<Increases[]>([]);
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [invest, setInvest] = useState<Invests[]>([]);
  const [censored, setCensored] = useState(false);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem("financaWeb.censored.mainside", String(!censored));
  };

  const handleChangeMonth = (order: "PREV" | "NEXT") => {
    const currentMonth = selectedMonth.getMonth();
    const newDate = new Date(
      selectedMonth.setMonth(
        order === "NEXT" ? currentMonth + 1 : currentMonth - 1
      )
    );
    dispatch(changeMonth(newDate.toISOString()));
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
    const listInvests = async () => {
      const list = await listInvest()
      setInvest(list);
    }
    listInvests();
    listExpenses();
    listIncreases();
  }, []);

  const totalValueIncreases = useMemo(() => {
    return sumBy(increases, 'value')
  }, [increases]);

  const totalValueExpenses = useMemo(() => {
    return sumBy(expenses, 'value')
  }, [expenses]);

  const totalValueInvest = useMemo(() => {
    return sumBy(invest, 'value')
  }, [invest]);

  const currentBalance = useMemo(() => {
    return totalValueIncreases - totalValueExpenses
  }, [totalValueExpenses, totalValueIncreases]);

  return (
    <>
      <S.Container>
        <S.Header>
          <S.MonthSelector>
            <S.Prev onClick={() => handleChangeMonth("PREV")}>
              <FaChevronLeft color="#fff" />
            </S.Prev>
            <S.Month>{getMounthAndYear(selectedMonth)}</S.Month>
            <S.Next onClick={() => handleChangeMonth("NEXT")}>
              <FaChevronRight color="#fff" />
            </S.Next>
          </S.MonthSelector>

          <S.ViewButton onClick={handleToggleCensored}>
            {censored ? (
              <FaEye color="#fff" size={26} />
            ) : (
              <FaEyeSlash color="#fff" size={26} />
            )}
          </S.ViewButton>
        </S.Header>
        <S.Balances>
          <S.Row>
            <S.Balance>
              <S.Title textColor={BLUE_PRIMARY}>Saldo atual</S.Title>
              {censored ? (
                <S.Value textColor={MAIN_TEXT}>***********</S.Value>
              ) : (
                <S.Value textColor={MAIN_TEXT}>
                  R${formatNumberFractionalDigits(currentBalance)}
                </S.Value>
              )}
            </S.Balance>
            <S.Balance>
              <S.Title textColor={BLUE_PRIMARY}>
                Saldo investido
              </S.Title>
              {censored ? (
                <S.Value textColor={MAIN_TEXT} opacity={0.5}>
                  ***********
                </S.Value>
              ) : (
                <S.Value textColor={MAIN_TEXT}>
                  R$ {formatNumberFractionalDigits(totalValueInvest)}
                </S.Value>
              )}
            </S.Balance>
          </S.Row>

          <S.Row>
            <S.Balance>
              <S.Title textColor={GREEN_PRIMARY}>Receitas</S.Title>
              {censored ? (
                <S.Value textColor={GREEN_PRIMARY} opacity={0.5}>***********</S.Value>
              ) : (
                <S.Value textColor={GREEN_PRIMARY}>
                  R${formatNumberFractionalDigits(totalValueIncreases)}
                </S.Value>
              )}
            </S.Balance>
            <S.Balance>
              <S.Title textColor={RED_PRIMARY}>Despesas</S.Title>
              {censored ? (
                <S.Value textColor={RED_PRIMARY}>***********</S.Value>
              ) : (
                <S.Value textColor={RED_PRIMARY}>
                  R${formatNumberFractionalDigits(totalValueExpenses)}
                </S.Value>
              )}
            </S.Balance>
          </S.Row>
        </S.Balances>
      </S.Container>
    </>
  );
};

export default MainSide;
