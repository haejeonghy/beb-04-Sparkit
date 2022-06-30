import styled from "styled-components";

import { darkTheme } from "../../../styles/theme";

import Aside from "./Aside";

import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const Main = (props: Props) => {
  const router = useRouter();
  const [io, setIo] = useState<IntersectionObserver | null>(null);
  const [title, setTitle] = useState("전체 태그");
  const endList = useRef<HTMLDivElement>(null);

  const { pathname } = router;
  // const title = pathName === "/detail/[...params]" ? "detail" : "전체 태그";
  useEffect(() => {
    const targetIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (io !== null) io.disconnect();
          console.log("hi");
        }
      });
    });
    setIo(targetIO);
  }, []);
  io?.observe(endList.current as Element);
  return (
    <MainMain>
      <MainDiv>
        {pathname !== "/Mypage" && <Aside setTitle={setTitle} />}
        <Section>
          {pathname !== "/Mypage" && (
            <MainHeadDiv>
              <h1>{title}</h1>
            </MainHeadDiv>
          )}
          {props.children}
        </Section>
      </MainDiv>
      <div ref={endList} style={{ height: "20px" }}></div>
    </MainMain>
  );
};

export default Main;

const Section = styled.section`
  width: 60vw;
  padding: 20px;
  margin-left: 12px;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
`;

const MainMain = styled.main`
  margin: 0 auto;
  background-color: ${darkTheme.bgColor};
  color: #fafafa;
  min-height: calc(100vh - 52px);
  padding: 20px;
  box-sizing: border-box;
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1400px;
  margin: 40px auto 0;
`;

const MainHeadDiv = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
`;
