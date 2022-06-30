import styled from "styled-components";
import { BackColor } from "../../../../types/spark";
import { darkTheme } from "../../../../styles/theme";

export const AsideAside = styled.aside`
  position: relative;
  width: 20vw;
  min-width: 250px;
  max-width: 280px;
`;

export const AsideLi = styled.li``;

export const AsideContainer = styled.div`
  position: fixed;
  width: inherit;
  top: 120px;
  min-width: 250px;
  max-width: 280px;
`;

export const AsideDiv = styled.div<BackColor>`
  background-color: ${(props) => props.backgroundColor};
  height: 300px;
  border-radius: 4px;
  margin: 20px;
  padding: 16px 20px;
`;

export const AsideLiButton = styled.button`
  font-size: 14px;
  outline: none;
  border: none;
  box-shadow: none;
  cursor: pointer;
  width: 100%;
  padding: 14px 16px;
  text-align: left;
  color: ${darkTheme.accentColor};
  background-color: transparent;

  &:hover {
    font-weight: bold;
    color: #5fee99;
  }
`;
