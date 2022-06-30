import React from "react";
import NavBar from "./Navbar";
import Main from "./Main/Main";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    // width: 100% , padding: 0px
    <Main>
      <NavBar />
      {props.children}
    </Main>
  );
}
