import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import * as S from "./styles";
import {
  GREEN_PRIMARY,
  GREEN_SECONDARY,
  INCOME_INPUT,
  MAIN_TEXT,
} from "../../../styles/global";
import { FaSave } from "react-icons/fa";
import { IncomeCategories } from "../../../utils/types";
import { format } from "date-fns";
import DatePicker from "../../utils/DatePicker";
import { Increases } from "../../../types";
import { createIncrease } from "../../../services/increase-repository";

interface CreateIncrease {
  control: Control<Increases>;
  handleSubmit: UseFormHandleSubmit<Increases>;
  increaseId?: number;
  onFinish: () => void;
}

export default function CreateIncome({
  control,
  increaseId,
  onFinish,
  handleSubmit,
}: CreateIncrease) {

  const onSubmit: SubmitHandler<Increases> = async (data) => {
    console.log('o que tentou criar', data);
    createIncrease({
      description: data.description,
      value: data.value,
      date: data.date
    })

    if (!!increaseId) {
      // const incomeToUpdate: IUpdateIncome = {
      //   ...data,
      //   value:
      //     data.value && data.value.startsWith("R$")
      //       ? Number(currencyToValue(data.value))
      //       : Number(data.value),
      //   receiptDate: startDateParsed,
      //   startDate: startDateParsed,
      // };
      // console.log('incomeToUpdate', incomeToUpdate)
      // // dispatch(updateIncome(incomeToUpdate, increaseId));
      onFinish();
      return;
    }
    // const incomeToCreate: ICreateIncome = {
    //   ...data,
    //   value:
    //     data.value && data.value !== "0"
    //       ? Number(currencyToValue(data.value))
    //       : 0,
    //   receiptDate: startDateParsed,
    //   startDate: startDateParsed,
    // };
    // console.log(incomeToCreate)

    onFinish();
  };

  return (
    <>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            backgroundColor={INCOME_INPUT}
            textColor={MAIN_TEXT}
            name="description"
            defaultValue={""}
            control={control}
          />

          <Input
            label="Valor"
            backgroundColor={INCOME_INPUT}
            textColor={MAIN_TEXT}
            name="value"
            defaultValue={"0"}
            control={control}
          />
          <S.Row>
            <S.Col>
              <DatePicker
                label="Data de recebimento"
                backgroundColor={INCOME_INPUT}
                textColor={MAIN_TEXT}
                name="date"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                control={control}
              />
            </S.Col>
          </S.Row>
          <Select
            label="Categoria"
            backgroundColor={INCOME_INPUT}
            textColor={MAIN_TEXT}
            name="category"
            control={control}
            options={IncomeCategories}
            defaultValue={IncomeCategories[0].name}
          />

          <S.ButtonContainer>
            <Button
              title="Salvar"
              colors={{
                PRIMARY_BACKGROUND: GREEN_PRIMARY,
                SECOND_BACKGROUND: GREEN_SECONDARY,
                TEXT: "#fff",
              }}
              icon={() => <FaSave color="#FFF" size={25} />}
              type="submit"
            />
          </S.ButtonContainer>
        </form>
      </S.Container>
    </>
  );
}
