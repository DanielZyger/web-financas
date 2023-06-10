import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { GREEN_PRIMARY, GREEN_SECONDARY } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../../utils/ItemView";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import Modal from "../../utils/Modal";
import CreateIncome from "../CreateIncome";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { listIncrease } from "../../../services/increase-repository";
import { Increases } from "../../../types";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
});

// interface Increase extends Increases {}

const IncomeList = () => {
  const { theme } = useSelector((state: State) => state.themes);
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const [incomesList, setIncomesList] = useState<
    Increases[]
  >([]);

  const [censored, setCensored] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [increaseSelected, setIncreaseSelected] = useState<Increases | null>(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = theme === "dark" ? "#4876AC" : "#2673CE";

  const { control, handleSubmit, setValue } = useForm<Increases>({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setModalVisibility(false);
    setValue("description", '');
    setValue("value", 0);
    setValue("date", new Date());
    setIncreaseSelected(null);
  };

  const handleOpenEditModal = (increase: Increases) => {
    setModalVisibility(true);
    setValue("description", increase.description);
    setValue("value", increase.value);
    setValue("date", increase.date);
    setIncreaseSelected(increase ? increase : increase);
  };

  const handleOpenDeleteModal = (increase: Increases) => {
    setIncreaseSelected(increase ? increase : null);
    setDeleteConfirmationVisible(true);
  };

  const handleDelete = () => {
    if (increaseSelected) {
      setDeleteConfirmationVisible(false);
      setIncreaseSelected(null);
    }
  };

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.incomeList`, String(!censored));
  };

  useEffect(() => {
    listRef.current?.addEventListener("mouseenter", () => {
      if (listRef.current) listRef.current.style.overflowY = "scroll";
    });
    listRef.current?.addEventListener("mouseleave", () => {
      if (listRef.current) listRef.current.style.overflowY = "hidden";
    });
  }, []);

  useEffect(() => {
    const incomesList = async () => {
      const list = await listIncrease()
      setIncomesList(list);
    } 
    incomesList()
  }, []);

  return (
    <>
      <S.Container>
        <S.Header>
          <div>
            <S.Title color={titleColor}>Receitas</S.Title>
          </div>

          <S.ViewButton onClick={handleToggleCensored}>
            {censored ? (
              <FaEye color={titleColor} size={26} />
            ) : (
              <FaEyeSlash color={titleColor} size={26} />
            )}
          </S.ViewButton>
        </S.Header>

        <Button
          title="Nova receita"
          icon={() => <FaPlus color="#FFF" size={25} />}
          colors={{
            PRIMARY_BACKGROUND: GREEN_PRIMARY,
            SECOND_BACKGROUND: GREEN_SECONDARY,
            TEXT: "#fff",
          }}
          onClick={() => setModalVisibility(true)}
        />

        {censored ? (
          <S.CensoredContainer>
            <FaBan size={40} color={titleColor} />
          </S.CensoredContainer>
        ) : (
          <S.ItemsList ref={listRef}>
            {incomesList.map((item, index) => {
              return (
                <div key={index}>
                    <ItemView
                      item={item}
                      onEdit={(item) => handleOpenEditModal(item)}
                      onDelete={(item) => handleOpenDeleteModal(item)}
                      type="increase"
                    />
                </div>
              );
            })
        }
            {incomesList.length === 0 && (
              <S.Empty>
                <FaBan />
                <p>Nenhuma entrada nesse mês</p>
              </S.Empty>
            )}
          </S.ItemsList>
        )}
      </S.Container>

      <Modal
        visible={modalVisibility}
        onCancel={handleCloseModal}
        closeButtonFixed
      >
        <CreateIncome
          control={control}
          increaseId={increaseSelected?.id}
          handleSubmit={handleSubmit}
          onFinish={handleCloseModal}
        />
      </Modal>

      <Modal
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        overlaid
        type="Delete"
        title="Tem certeza que deseja excluir essa entrada?"
        onConfirm={handleDelete}
      />
    </>
  );
};

export default IncomeList;
