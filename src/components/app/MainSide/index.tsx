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
// import * as yup from "yup";
import { changeMonth } from "../../../store/modules/Dates";
// import { isSameMonth } from "date-fns";
import { formatNumberFractionalDigits } from "../../../utils/getCurrencyFormat";
import { listIncrease } from "../../../services/increase-repository";
import { isEmpty, sumBy } from "lodash";
import { Expenses, Increases } from "../../../types/increase";

// const schema = yup.object({
//   name: yup
//     .string()
//     .required("Campo obrigátorio")
//     .min(2, "deve ter no mínimo 2 caracteres")
//     .max(25, "deve ter no máximo 25 caracteres"),
//   type: yup.string().required("Campo obrigátorio"),
// });

// type FormData = {
//   name: string;
//   type: string;
//   status: string;
//   initialValue?: string;
// };

// type AccountBalance = {
//   accountId: string;
//   currentBalance: number;
//   estimateBalance: number;
// };

// type Balance = {
//   accountId: string;
//   currentBalance: number;
//   estimateBalance: number;
// };

const MainSide = () => {
  const dispatch = useDispatch<any>();
  // const {
  //   incomes,
  //   incomesOnAccount,
  //   loading: incomesLoading,
  // } = useSelector((state: State) => state.incomes);
  // const {
  //   expanses,
  //   expansesOnAccount,
  //   loading: expansesLoading,
  // } = useSelector((state: State) => state.expanses);
  const { selectedMonth } = useSelector((state: State) => state.dates);

  const [increases, setIncreases] = useState<Increases[]>([]);
  const [expenses, setExpenses] = useState<Expenses[]>([]);


  const [censored, setCensored] = useState(false);

  // const [balances, setBalances] = useState<Balance[]>([]);

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

  // const calculateBalance = useCallback(
  //   (isTheSameMonth: boolean) => {
  //     let sumTotalCurrentBalance = 0;
  //     let sumTotalEstimateBalance = 0;
  //     const accountsBalances: AccountBalance[] = [];
  //   },[])
  
  useEffect(() => {
    const listIncreases = async () => {
      const list = await listIncrease()
      setIncreases(list);
    }
    const listExpenses = async () => {
      const list = await listExpenses()
      setIncreases(list);
    }
    listExpenses();
    listIncreases();
  }, []);

  const totalValueIncreases = useMemo(() => {
    return sumBy(increases, 'value')
  }, [increases]);

  const totalValueExpenses = useMemo(() => {
    return sumBy(expenses, 'value')
  }, [expenses]);

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
                  R${formatNumberFractionalDigits(totalValueIncreases)}
                </S.Value>
              )}
            </S.Balance>
            <S.Balance>
              <S.Title textColor={BLUE_PRIMARY} opacity={0.5}>
                Saldo previsto
              </S.Title>
              {censored ? (
                <S.Value textColor={MAIN_TEXT} opacity={0.5}>
                  ***********
                </S.Value>
              ) : (
                <S.Value textColor={MAIN_TEXT} opacity={0.5}>
                  {formatNumberFractionalDigits(2000)}
                </S.Value>
              )}
            </S.Balance>
          </S.Row>

          <S.Row>
            <S.Balance>
              <S.Title textColor={GREEN_PRIMARY}>Receitas</S.Title>
              {censored ? (
                <S.Value textColor={GREEN_PRIMARY}>***********</S.Value>
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
