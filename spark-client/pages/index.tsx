import type { NextPage } from "next";

import styled from "styled-components";

import { useRecoilState } from "recoil";
import { postsState } from "../states/spark";

import MainList from "../components/MainList";


const Home: NextPage = ({}) => {
  const [postData] = useRecoilState(postsState);

  return (
    <>
      <MainList data={postData} />
    </>
  );
};

export default Home;

const MainHeadDiv = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
`;
