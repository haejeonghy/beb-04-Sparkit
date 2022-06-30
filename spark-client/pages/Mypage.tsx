import MainList from "../components/MainList";
import { gql, useQuery } from "@apollo/client";
import { GetPostsByUserId } from "../types/spark";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userIdState } from "../states/spark";
import GetUserId from "../states/userId";
import { USER_INFO } from "../query/GetQuery";


export default function Mypage() {
  // const [userId, setUserId] = useRecoilState(userIdState);

  // const settingUserId = (accessToken: string) => {
  //   const base64 = accessToken.split(".")[1];
  //   const payload = Buffer.from(base64, "base64");
  //   const result = JSON.parse(payload.toString());
  //   setUserId(Number(result.id));
  // };
  // const accessToken = window.sessionStorage.getItem("userInfo");
  // settingUserId(accessToken);
  GetUserId();
  const [userId] = useRecoilState(userIdState);
  const { data } = useQuery<GetPostsByUserId>(USER_INFO, {
    variables: { userId: userId },
  });


  if (!data) return <>loading</>;
  return (
    <>
      <UserTitleBox>{`Welcome! ${data.getUserInfo?.nickname}`}</UserTitleBox>
      <UserInfoContainer>
        <UserTitleBox>Account Information</UserTitleBox>
        <UserContentBox>
          <UserListP>EMAIL : {`${data.getUserInfo?.email}`}</UserListP>
          <UserListP>NICKNAME : {`${data.getUserInfo?.nickname}`}</UserListP>
          <UserListP>BALANCE : {`${data.getUserInfo?.balance}`}</UserListP>
          <UserListP>ACCOUNTS : {`${data.getUserInfo?.account}`}</UserListP>
        </UserContentBox>
      </UserInfoContainer>

      <UserListContainer>
        <UserTitleBox>
          <h3>토큰 리스트</h3>
        </UserTitleBox>
        {data && <MainList data={data.getUserInfo?.posts} />}
      </UserListContainer>
    </>
  );
}

const UserTitleBox = styled.div`
  height: 30px;
  font-size: 1.8rem;
  margin-bottom: 25px;
`;

const UserInfoContainer = styled.div`
  font-weight: 600;
  height: 280px;
  min-width: 400px;
  padding: 30px 30px;
  border-radius: 4px;
  margin-bottom: 40px;
  margin-left: 20px;
  margin-right: 20px;
  background: #111111;
`;

const UserContentBox = styled.div`
  height: 140px;
`;

const UserInfoAmendBox = styled.div`
  text-align: right;
`;

const UserListContainer = styled.div`
  border-top: 1px solid #aaa;
  padding: 24px;
`;

const UserListP = styled.p`
  margin-top: 5px;
  max-width: 100%;
  height: 20%;
  padding-bottom: 20px;

  border-bottom: 1px solid #636363;
`;

const UserInfoAmend = styled.button`
  background-color: #ececec;
  font-size: 14px;
  outline: none;
  border: none;
  border-radius: 2px;
  box-shadow: none;
  cursor: pointer;
  color: black;
  &:active {
    background-color: #ddd;
  }
`;
