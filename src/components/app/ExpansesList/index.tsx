import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Colors, RED_PRIMARY, RED_SECONDARY } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../../utils/ItemView";
import { getMonthName } from "../../../utils/dateFormats";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import State, {
  ICreateExpanseOnAccount,
  IExpanses,
  IExpansesOnAccount,
} from "../../../store/interfaces";
import { listByDate } from "../../../utils/listByDate";
import { ExpanseFormData } from "../../../utils/formDatas";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExpanseCategories } from "../../../utils/types";
import { differenceInCalendarMonths, format } from "date-fns";
import Loader from "../../utils/Loader";
import Modal from "../../utils/Modal";
import CreateExpanse from "../CreateExpanse";
import { getCurrentIteration } from "../../../utils/getCurrentIteration";
import { listExpense } from "../../../services/expense-repository";
import { Expenses } from "../../../types/increase";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
});

interface Expanse extends IExpanses, IExpansesOnAccount {}

const ExpansesList = () => {
  const { theme } = useSelector((state: State) => state.themes);
  const { accounts } = useSelector((state: State) => state.accounts);
  const { expanses, expansesOnAccount, loading } = useSelector(
    (state: State) => state.expanses
  );
  const { selectedMonth } = useSelector((state: State) => state.dates);

  const [expenseList, setExpenseList] = useState<Expenses[]>([]);
  const [censored, setCensored] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [expanseSelected, setExpanseSelected] = useState<IExpanses | null>(
    null
  );
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [
    deleteReceiveConfirmationVisible,
    setDeleteReceiveConfirmationVisible,
  ] = useState(false);
  const [confirmReceivedVisible, setConfirmReceivedVisible] = useState(false);
  const [accountIdSelected, setAccountIdSelected] = useState<string | null>(
    null
  );

  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = theme === "dark" ? "#4876AC" : "#2673CE";
  const textColor = Colors.MAIN_TEXT_LIGHTER;

  const { control, handleSubmit, setValue } = useForm<ExpanseFormData>({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setModalVisibility(false);
    setValue("name", "");
    setValue("iteration", "1");
    setValue("category", ExpanseCategories[0].name);
    setValue("startDate", format(new Date(), "yyyy-MM-dd"));
    setValue("value", "0");
    setExpanseSelected(null);
  };

  const handleOpenEditModal = (expanse: Expanse) => {
    setModalVisibility(true);
    setValue("name", expanse.name);
    setValue("receiptDefault", expanse.receiptDefault || expanse.accountId);
    setValue("iteration", expanse.iteration || expanse.expanse.iteration);
    setValue("category", expanse.category || expanse.expanse.category);
    setValue(
      "startDate",
      format(
        new Date(expanse.startDate || expanse.expanse.startDate),
        "yyyy-MM-dd"
      )
    );
    setValue("value", String(expanse.value));
    setExpanseSelected(expanse.expanse ? expanse.expanse : expanse);
  };

  const handleOpenDeleteModal = (expanse: Expanse) => {
    setExpanseSelected(expanse.expanse ? expanse.expanse : expanse);
    setDeleteConfirmationVisible(true);
  };

  const handleOpenConfirmReceiveModal = (expanse: Expanse) => {
    setConfirmReceivedVisible(true);
    setAccountIdSelected(expanse.receiptDefault);
    setExpanseSelected(expanse);
  };

  const handleOpenConfirmUnreceiveModal = (expanse: Expanse) => {
    setDeleteReceiveConfirmationVisible(true);
    setAccountIdSelected(expanse.accountId);
    setExpanseSelected(expanse);
  };

  const handleDelete = () => {
    if (expanseSelected) {
      setDeleteConfirmationVisible(false);
      setExpanseSelected(null);
    }
  };

  const handleDeleteExpanseOnAccount = () => {
    if (expanseSelected) {
      const findAccount = accounts.find(
        (acc) =>
          acc.id === accountIdSelected ||
          acc.id === expanseSelected.receiptDefault
      );

      if (findAccount) {
        setDeleteReceiveConfirmationVisible(false);
        setExpanseSelected(null);
        setAccountIdSelected(null);
      }
    }
  };

  const handleReceive = () => {
    if (expanseSelected) {
      const findAccount = accounts.find(
        (acc) =>
          acc.id === accountIdSelected ||
          acc.id === expanseSelected.receiptDefault
      );

      const currentPart = expanseSelected.endDate
        ? differenceInCalendarMonths(
            new Date(expanseSelected.endDate),
            new Date()
          )
        : null;

      const month = new Date(expanseSelected.receiptDate);

      const expanseOnAccountToCreate: ICreateExpanseOnAccount = {
        userId: 'epaa',
        accountId: accountIdSelected || expanseSelected.receiptDefault,
        expanseId: expanseSelected.id,
        month: new Date(month.setMonth(new Date().getMonth())),
        value: expanseSelected.value,
        name: expanseSelected.name,
        recurrence:
          expanseSelected.iteration === "mensal"
            ? "mensal"
            : getCurrentIteration(currentPart, expanseSelected.iteration),
      };

      console.log(expanseOnAccountToCreate)
      if (findAccount) {
      }

      setConfirmReceivedVisible(false);
      setExpanseSelected(null);
    }
  };

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.expanseList`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

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
    const expenseList = async () => {
      const list = await listExpense()
      setExpenseList(list);
    } 
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
            {loading ? (
              <Loader
                height="150px"
                width="360.63px"
                color="#E9DEDF"
                rectLength={3}
                rectProps={{
                  height: "32",
                  rx: "20",
                  ry: "20",
                  y: "20",
                  x: "0",
                  width: "360",
                }}
              />
            ) : (
              <>
                {expenseList.map((item, index) => {
                  return (
                    <div key={index}>
                        return (
                          <ItemView
                            key={index}
                            type="expense"
                            item={item}
                            // onEdit={() => handleOpenEditModal(item)}
                            // onDelete={() => handleOpenDeleteModal(item)}
                          />
                        );
                    </div>
                  );
                })}
              </>
            )}

            {!loading && expenseList.length === 0 && (
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
          expanseId={expanseSelected?.id}
          handleSubmit={handleSubmit}
          onFinish={handleCloseModal}
          recurrence={
            expanseSelected?.iteration === "Mensal" ? "Mensal" : "Parcelada"
          }
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

      <Modal
        visible={deleteReceiveConfirmationVisible}
        onCancel={() => setDeleteReceiveConfirmationVisible(false)}
        overlaid
        type="Delete"
        title="Tem certeza que deseja excluir esse pagamento?"
        onConfirm={handleDeleteExpanseOnAccount}
      />

      <Modal
        visible={confirmReceivedVisible}
        onCancel={() => setConfirmReceivedVisible(false)}
        overlaid
        type="Confirmation"
        title="Em qual conta a despesa será paga?"
        onConfirm={handleReceive}
        okButtonTitle="Pagar"
        confirmationOptions={accounts}
        onSelectOption={(e) => setAccountIdSelected(e)}
        optionValue={accountIdSelected}
      />
    </>
  );
};

export default ExpansesList;
