import { useMemo } from "react";
import * as S from "./styles";
import { GREEN_SOFT, RED_SOFT } from "../../../styles/global";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatNumberFractionalDigits } from "../../../utils/getCurrencyFormat";
import State from "../../../store/interfaces";
import { useSelector } from "react-redux";
import useCollapse from "react-collapsed";
import { Expenses, Increases } from "../../../types/increase";
import dayjs from "dayjs";

interface ItemType extends Increases, Expenses {}

interface ItemViewProps {
  type: "expense" | "increase";
  item: ItemType;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ItemView({
  type,
  item,
  onDelete,
  onEdit,
}: ItemViewProps) {
  const { theme } = useSelector((state: State) => state.themes);
  const { getCollapseProps, getToggleProps } = useCollapse({
    expandStyles: {
      opacity: 0,
    },
    collapseStyles: {
      opacity: 0,
    },
  });

  const redPrimary = theme === "dark" ? "#AB5249" : "#CC3728";
  const greenPrimary = theme === "dark" ? "#1A8289" : "#1A8289";

  const mainColor = type === "expense" ? redPrimary : greenPrimary;

  const backgroundColor = type === "expense" ? RED_SOFT : GREEN_SOFT;

  const date = useMemo(()=> {
    return dayjs(item.date).format('DD/MM/YYYY')
  }, [item]);

  return (
    <S.Collapse
      backgroundColor={backgroundColor}
      mainColor={mainColor}
      style={{ opacity: 0.8 }}
    >
      <S.CollapseContent mainColor={mainColor} {...getToggleProps()}>
        <p>{item.description}</p>
        <p>R$ {formatNumberFractionalDigits(item.value)}</p>
        <p>{date}</p>
      </S.CollapseContent>

      <S.Content {...getCollapseProps()}>
        <S.ButtonContainer>
          <button onClick={onEdit}>
            <FaEdit color={mainColor} size={22} />
          </button>
            <button onClick={onDelete}>
              <FaTrash color={redPrimary} size={22} />
            </button>
        </S.ButtonContainer>
      </S.Content>
    </S.Collapse>
  );
}
