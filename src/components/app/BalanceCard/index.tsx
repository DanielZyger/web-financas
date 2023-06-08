import { FaDollarSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { getMounthAndYear } from "../../../utils/dateFormats";
import { formatNumberFractionalDigits } from "../../../utils/getCurrencyFormat";
import * as S from "./styles";
import theme from "styled-theming";

interface BalanceCardProps {
  primaryColor: string | theme.ThemeSet;
  secondColor: string | theme.ThemeSet;
  type: "EXPANSE" | "INCOME";
  balance: {
    currentBalance: number;
    estimateBalance: number;
  };
}

const BalanceCard = ({
  primaryColor,
  secondColor,
  type,
  balance,
}: BalanceCardProps) => {
  const { selectedMonth } = useSelector((state: State) => state.dates);

  return (
    <S.Container
      linearGradient={{
        first: primaryColor,
        second: secondColor,
      }}
    >
      <div>
        <S.Title>
          {type === "INCOME" && `Receitas ${getMounthAndYear(selectedMonth)}`}
          {type === "EXPANSE" && `Despesas ${getMounthAndYear(selectedMonth)}`}
        </S.Title>
        <S.Value>{formatNumberFractionalDigits(2000)}</S.Value>
        <S.Subvalue>
          {`Previsto ${formatNumberFractionalDigits(2000)}`}
        </S.Subvalue>
      </div>
      <div>
        <span>
          <FaDollarSign size={25} />
        </span>
      </div>
    </S.Container>
  );
};

export default BalanceCard;
