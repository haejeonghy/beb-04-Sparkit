import { ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import styled from "styled-components";
import SignUp from "../../../pages/SignUp";
interface Props {
  position: string;
}

const NavContainer = styled.nav<Props>`
  position: ${(props) => props.position};
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: #000000ef;
  align-items: center;
  gap: 10px;
  z-index: 1;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const NavLogo = styled.div`
  padding-left: 10px;
  border: none;
  color: #55e696;
  font-size: 1.9em;
  font-weight: 600;
  transition: 0.2s;
  animation: boxFades 3s 1s infinite linear alternate;

  @keyframes boxFades {
    0% {
      color: white;
    }
    25% {
      color: white;
    }
    50% {
      color: #7ae4aa;
    }
    75% {
      color: #55e696;
    }
    100% {
      color: #55e696;
    }
  }
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  border: none;
  color: #ffffff;
  font-size: 1.2em;
  font-weight: 500;
`;
const SignInBtn = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const SignUpBtn = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const SignPost = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const MyPage = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const Logout = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;

const NavBar = (): ReactElement => {
  const [showSignIn, setshowSignIn] = useState<boolean>(false);
  const [showSignUp, setshowSignUp] = useState<boolean>(false);
  const [log, setLog] = useState<boolean>(false);
  let isLoggedIn;
  useEffect(() => {
    isLoggedIn = window.sessionStorage.getItem("userInfo");
    if (!isLoggedIn) {
      setLog(false);
    } else {
      setLog(true);
    }
  }, []);

  function openSignin() {
    setshowSignIn(!showSignIn);
  }

  function closeSignin() {
    setshowSignIn(!showSignIn);
  }
  function logout() {
    router.push("/");
    setLog(false);
    isLoggedIn = window.sessionStorage.clear();
  }
  const router = useRouter();
  return (
    <NavContainer
      position={router.pathname === "/SignUp" ? "relative" : "fixed"}
    >
      <NavLogo onClick={() => router.push("/")}>Spark it</NavLogo>

      {log ? (
        <BtnContainer>
          <MyPage onClick={() => router.push("/Mypage")}>마이페이지</MyPage>
          <SignPost onClick={() => router.push("/WritePost")}>글쓰기</SignPost>
          <Logout onClick={logout}>로그아웃</Logout>
        </BtnContainer>
      ) : (
        <BtnContainer>
          <SignInBtn onClick={openSignin}>로그인</SignInBtn>
          <SignInModal open={showSignIn} close={closeSignin} />
          <SignUpBtn onClick={() => router.push("/SignUp")}>회원가입</SignUpBtn>
          <SignPost onClick={() => router.push("/WritePost")}>글쓰기</SignPost>
        </BtnContainer>
      )}
    </NavContainer>
  );
};

export default NavBar;
