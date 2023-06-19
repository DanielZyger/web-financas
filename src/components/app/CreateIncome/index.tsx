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
import { format } from "date-fns";
import DatePicker from "../../utils/DatePicker";
import { Categories, Increases } from "../../../store/types";
import { createIncrease, updateIncrease } from "../../../services/increase-repository";
import { listCategory } from "../../../services/category-repository";
import { useEffect, useState } from "react";

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
  const [categoriesList, setCategoriesList] = useState<Categories[]>([])
  const [firstCategory, setFirstCategory] = useState('')

  const onSubmit: SubmitHandler<Increases> = async (data) => {
    if (increaseId) {
      await updateIncrease({
        id: increaseId,
        category_id: data.category_id,
        description: data.description,
        value: data.value,
        date: data.date
      });
      onFinish();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      return;
    }

    await createIncrease({
      description: data.description,
      category_id: data.category_id,
      value: data.value,
      date: data.date
    })
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    onFinish();
  };

  useEffect(() => {
    const categoriesList = async () => {
      const list = await listCategory()
      setCategoriesList(list);
    } 
    categoriesList()
  }, []);

  useEffect(() => {
    if(!categoriesList[0]) return;
    setFirstCategory(categoriesList[0].name)
  }, [categoriesList])

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
            options={categoriesList}
            defaultValue={firstCategory}
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
