import Header from "../../components/app/Header";
import MainSide from "../../components/app/MainSide";
import MenuItem from "../../components/utils/MenuItem";

import {
  MdArrowUpward,
  MdArrowDownward,
  MdCreditCard,
  MdHome,
} from "react-icons/md";

import * as S from "./styles";

import HomeContent from "../../components/app/HomeContent";
import IncomeView from "../../components/app/IncomeView";
import ExpansesView from "../../components/app/ExpansesView";
import { useDispatch, useSelector } from "react-redux";
import { changeMenu } from "../../store/modules/Menus";
import State from "../../store/interfaces";
import { addMessage } from "../../store/modules/Feedbacks";
import { useEffect } from "react";
import { useMedia } from "../../utils/media";
import { sizes } from "../../styles/global";

const Home = () => {
  const dispatch = useDispatch<any>();
  const menu = useSelector((state: State) => state.menus);
  const tablet = useMedia(`(max-width: ${sizes.tablet})`);

  const scrollToItem = () => {
    if (window.pageYOffset < 541) {
      window.scrollTo({
        top: 541,
        behavior: "smooth",
      });
    }
  };

  const handleChangeMenu = (menu: string) => {
    if (menu === "Cartões") {
      dispatch(
        addMessage({
          type: "warning",
          message:
            "Função não implementada",
        })
      );
      return;
    }
    if (tablet) scrollToItem();
    dispatch(changeMenu(menu));
  };

  useEffect(() => {
    dispatch(changeMenu("Home"));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <S.Container>
        <S.Aside>
          <MainSide />
        </S.Aside>
        <S.MenuList>
          <MenuItem
            icon={MdHome}
            title="Inicio"
            selected={menu === "Home"}
            onClick={() => handleChangeMenu("Home")}
          />
          <MenuItem
            onClick={() => handleChangeMenu("Entradas")}
            icon={MdArrowUpward}
            selected={menu === "Entradas"}
            title="Entradas"
          />
          <MenuItem
            icon={MdArrowDownward}
            title="Despesas"
            selected={menu === "Despesas"}
            onClick={() => handleChangeMenu("Despesas")}
          />
          <MenuItem
            icon={MdCreditCard}
            title="Cartões"
            selected={menu === "Cartões"}
            onClick={() => handleChangeMenu("Cartões")}
          />
        </S.MenuList>

        <S.Content reverse={menu === "Entradas" || menu === "Despesas"}>
          {menu === "Home" && <HomeContent />}

          {menu === "Entradas" && <IncomeView />}

          {menu === "Despesas" && <ExpansesView />}

        </S.Content>
      </S.Container>
    </div>
  );
};

export default Home;
