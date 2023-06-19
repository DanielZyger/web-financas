import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { RED_PRIMARY, RED_SECONDARY } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../../utils/ItemView";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../utils/Modal";
import CreateExpanse from "../CreateExpanse";
import { deleteExpense, listExpense } from "../../../services/expense-repository";
import { Categories, Expenses } from "../../../store/types";
import { listCategory } from "../../../services/category-repository";

const schema = yup.object({
  description: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
});


const ExpansesList = () => {
  const { theme } = useSelector((state: State) => state.themes);
  const [expenseList, setExpenseList] = useState<
    Expenses[]
  >([]);
  const [categoryList, setCategoryList] = useState<
    Categories[]
  >([]);
  

  const [censored, setCensored] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [expenseSelected, setExpenseSelected] = useState<Expenses | null>(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = theme === "dark" ? "#4876AC" : "#2673CE";

  const { control, handleSubmit, setValue } = useForm<Expenses>({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setModalVisibility(false);
    setValue("description", '');
    setValue("value", 0);
    setValue("date", new Date());
    setExpenseSelected(null);
  };

  const handleOpenEditModal = (expense: Expenses) => {
    setModalVisibility(true);
    setValue("description", expense.description);
    setValue("value", expense.value);
    setValue("date", expense.date);
    setValue("category_id", expense.category_id);
    setExpenseSelected(expense ? expense : expense);
  };

  const handleOpenDeleteModal = (expense: Expenses) => {
    console.log(expense);
    setExpenseSelected(expense ? expense : null);
    setDeleteConfirmationVisible(true);
  };

  const handleDelete = async () => {
    if(!expenseSelected) return;
    await deleteExpense(expenseSelected.id)
    handleCloseModal()
    setModalVisibility(false)
    setDeleteConfirmationVisible(false)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  };

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.expanseList`, String(!censored));
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
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.expanseList`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  useEffect(() => {
    const expenseList = async () => {
      const list = await listExpense()
      setExpenseList(list);
    } 
    const categoryList = async () => {
      const list = await listCategory()
      setCategoryList(list);
    } 
    categoryList()
    expenseList()
  }, []);

  return (
    <>
      <S.Container>
        <S.Header>
          <div>
            <S.Title color={titleColor}>Despesas</S.Title>
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
          title="Nova despesa"
          icon={() => <FaPlus color="#FFF" size={25} />}
          colors={{
            PRIMARY_BACKGROUND: RED_PRIMARY,
            SECOND_BACKGROUND: RED_SECONDARY,
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
            {expenseList.map((item, index) => {
              return (
                <div key={index}>
                    <ItemView
                      item={item}
                      categories={categoryList}
                      onEdit={(item) => handleOpenEditModal(item)}
                      onDelete={(item) => handleOpenDeleteModal(item)}
                      type="expense"
                    />
                </div>
              );
            })
        }
            {expenseList.length === 0 && (
              <S.Empty>
                <FaBan />
                <p>Nenhuma despesa nesse mês</p>
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
        <CreateExpanse
          control={control}
          expenseId={expenseSelected?.id}
          handleSubmit={handleSubmit}
          onFinish={handleCloseModal}
        />
      </Modal>

      <Modal
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        overlaid
        type="Delete"
        title="Tem certeza que deseja excluir essa despesa?"
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ExpansesList;
