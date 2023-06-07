import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import Switch from "react-switch";
import * as S from "./styles";
import {
  MAIN_TEXT,
  RED_PRIMARY,
  RED_SECONDARY,
  RED_SOFT,
} from "../../../styles/global";
import State, {
  ICreateExpanse,
  ICreateExpanseOnAccount,
  IUpdateExpanse,
} from "../../../store/interfaces";
import {
  currencyMask,
  currencyToValue,
} from "../../../utils/getCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaSave, FaTrash } from "react-icons/fa";
import { ExpanseCategories } from "../../../utils/types";
import { useEffect, useState } from "react";
import SelectButton from "../../utils/SelectButton";
import { addMonths, format, isSameMonth, parse } from "date-fns";
import DatePicker from "../../utils/DatePicker";
import { ExpanseFormData } from "../../../utils/formDatas";
import Modal from "../../utils/Modal";
interface CreateIncomeProps {
  control: Control<ExpanseFormData>;
  handleSubmit: UseFormHandleSubmit<ExpanseFormData>;
  expanseId?: string;
  expanseOnInvoiceId?: string;
  fromInvoice?: boolean;
  onFinish: () => void;
  recurrence: "Mensal" | "Parcelada";
  defaultAccount?: string;
}

export default function CreateExpanse({
  control,
  expanseId,
  expanseOnInvoiceId,
  recurrence,
  fromInvoice = false,
  defaultAccount,
  onFinish,
  handleSubmit,
}: CreateIncomeProps) {
  const dispatch = useDispatch<any>();
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const { accounts } = useSelector((state: State) => state.accounts);
  const { expanseCreated } = useSelector((state: State) => state.expanses);
  const { theme } = useSelector((state: State) => state.themes);

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const [recurrenceState, setRecurrenceState] = useState<
    "Mensal" | "Parcelada"
  >(recurrence);
  const [received, setReceived] = useState(false);

  const handleDelete = () => {
    if (expanseId && expanseOnInvoiceId) {
      console.log('delete');
    }
  };

  const onSubmit: SubmitHandler<ExpanseFormData> = (data) => {
    const interationVerified =
      data.iteration === "0" ? 1 : Number(data.iteration);
    const startDateParsed = parse(data.startDate, "yyyy-MM-dd", new Date());
    if (!!expanseId) {
      const expanseToUpdate: IUpdateExpanse = {
        ...data,
        userId: 'aff',
        value:
          data.value && data.value.startsWith("R$")
            ? Number(currencyToValue(data.value))
            : Number(data.value),
        iteration:
          recurrenceState === "Parcelada"
            ? String(interationVerified)
            : "Mensal",
        receiptDate: startDateParsed,
        startDate: startDateParsed,
        endDate:
          recurrenceState === "Parcelada"
            ? addMonths(startDateParsed, interationVerified - 1)
            : null,
      };
      console.log(expanseToUpdate)
      console.log('seila')
      // dispatch(updateExpanse(expanseToUpdate, expanseId, fromInvoice));
      // onFinish();
      return;
    }
    const expanseToCreate: ICreateExpanse = {
      ...data,
      userId: 'showw',
      value:
        data.value && data.value !== "0"
          ? Number(currencyToValue(data.value))
          : 0,
      iteration:
        recurrenceState === "Parcelada" ? String(interationVerified) : "Mensal",
      receiptDate: startDateParsed,
      startDate: startDateParsed,
      endDate:
        recurrenceState === "Parcelada"
          ? addMonths(startDateParsed, interationVerified - 1)
          : null,
    };
    console.log(expanseToCreate)
    // dispatch(createExpanse(expanseToCreate, received, fromInvoice));
    // onFinish();
  };

  useEffect(() => {
    setRecurrenceState(recurrence);
  }, [recurrence]);

  useEffect(() => {
    if (received && expanseCreated) {
      const findAccount = accounts.find(
        (acc) => acc.id === expanseCreated.receiptDefault
      );

      const expanseOnAccountToCreate: ICreateExpanseOnAccount = {
        userId: 'opa',
        accountId: expanseCreated.receiptDefault,
        expanseId: expanseCreated.id,
        month: new Date(expanseCreated.receiptDate),
        value: expanseCreated.value,
        name: expanseCreated.name,
        recurrence: expanseCreated.iteration,
      };

      if (findAccount) {
        console.log('expanseOnAccountToCreate', expanseOnAccountToCreate)
        // dispatch(createExpanseOnAccount(expanseOnAccountToCreate, findAccount));
        // setReceived(false);
      }
    }
  }, [expanseCreated, accounts, received, dispatch]);

  return (
    <>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            backgroundColor={RED_SOFT}
            textColor={MAIN_TEXT}
            name="name"
            defaultValue={""}
            control={control}
          />

          <Input
            label="Valor"
            backgroundColor={RED_SOFT}
            textColor={MAIN_TEXT}
            name="value"
            mask={currencyMask}
            defaultValue={"0"}
            control={control}
          />

          <S.Col>
            <S.Label color="#000">Recorrência</S.Label>
            <S.Row>
              <SelectButton
                type="button"
                backgroundColor={RED_SOFT}
                textColor={MAIN_TEXT}
                icon={() => <FaCheck color="#FFF" size={25} />}
                title="Mensal"
                checked={recurrenceState === "Mensal"}
                onClick={() => setRecurrenceState("Mensal")}
              />
            </S.Row>
          </S.Col>

          <S.Row>
            <S.Col>
              <DatePicker
                label="Data de recebimento"
                backgroundColor={RED_SOFT}
                textColor={MAIN_TEXT}
                name="startDate"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                control={control}
              />
            </S.Col>

            <S.Col style={{ alignItems: "flex-end" }}>
              {isSameMonth(new Date(), selectedMonth) &&
                !expanseId &&
                !fromInvoice && (
                  <>
                    <S.Label
                      color="#000"
                      style={{ width: "100%", textAlign: "right" }}
                    >
                      Pago
                    </S.Label>

                    <Switch
                      checked={received}
                      onChange={() => setReceived(!received)}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      offColor={theme === "dark" ? "#262626" : "#d2d2d2"}
                      onColor={theme === "dark" ? "#D46559" : "#E9DEDF"}
                      onHandleColor={theme === "dark" ? "#AB5249" : "#cc3728"}
                      offHandleColor={theme === "dark" ? "#D46559" : "#E9DEDF"}
                      height={13}
                      width={31}
                      handleDiameter={20}
                    />
                  </>
                )}
            </S.Col>
          </S.Row>
          <Select
            label="Categoria"
            backgroundColor={RED_SOFT}
            textColor={MAIN_TEXT}
            name="category"
            control={control}
            options={ExpanseCategories}
            defaultValue={ExpanseCategories[0].name}
          />

          <S.ButtonContainer>
            <Button
              title="Salvar"
              colors={{
                PRIMARY_BACKGROUND: RED_PRIMARY,
                SECOND_BACKGROUND: RED_SECONDARY,
                TEXT: "#fff",
              }}
              icon={() => <FaSave color="#FFF" size={25} />}
              type="submit"
            />

            {fromInvoice && expanseId && (
              <S.DeleteButton
                type="button"
                onClick={() => setDeleteConfirmationVisible(true)}
              >
                <FaTrash size={28} />
              </S.DeleteButton>
            )}
          </S.ButtonContainer>
        </form>
      </S.Container>

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
}
