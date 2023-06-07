import { Colors } from "../../../styles/global";
import * as S from "./styles";
import LogoImg from "../../../assets/logo.svg";
import DefaultAvatar from "../../../assets/icons/user.svg";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
interface HeaderProps {
  expanded?: boolean;
}

const Header = ({ expanded = false }: HeaderProps) => {
  const backgroundColor = Colors.BLUE_PRIMARY_LIGHTER;

  return (
    <S.Container backgroundColor={backgroundColor} expanded={expanded}>
      <Link to="/">
        <S.Logo src={LogoImg} />
      </Link>

      <S.UserContainer>
        <S.Welcome>
          <S.Text>Bem vindo,</S.Text>
          <S.BoldText>{'Daniel Zyger dos Santos'}</S.BoldText>
        </S.Welcome>

        <Link to="/profile">
          <S.Avatar
            src={DefaultAvatar}
          />
        </Link>

          <S.SignOutButton>
            <FaSignOutAlt color="#fff" size={28} />
          </S.SignOutButton>
      </S.UserContainer>
    </S.Container>
  );
};

export default Header;
