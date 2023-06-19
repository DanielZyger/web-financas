import { Colors } from "../../../styles/global";
import * as S from "./styles";
import LogoImg from "../../../assets/logo.svg";
import DefaultAvatar from "../../../assets/icons/user.svg";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { listUser } from "../../../services/user-repository";
import { Users } from "../../../store/types";
interface HeaderProps {
  expanded?: boolean;
}

const Header = ({ expanded = false }: HeaderProps) => {
  const backgroundColor = Colors.BLUE_PRIMARY_LIGHTER;
  const [users, setUsers] = useState<Users[]>([])
  const [userName, setUserName] = useState('')


  useEffect(() => {
    const userList = async () => {
      const list = await listUser()
      setUsers(list);
    } 
    userList()
  }, []);

  useEffect(() => {
    if(users.length) {
      setUserName(users[0].name);
      return
    }
    setUserName('Usuário');
  }, [users]);


  return (
    <S.Container backgroundColor={backgroundColor} expanded={expanded}>
      <Link to="/">
        <S.Logo src={LogoImg} />
      </Link>

      <S.UserContainer>
        <S.Welcome>
          <S.Text>Bem vindo,</S.Text>
          <S.BoldText>{userName}</S.BoldText>
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
