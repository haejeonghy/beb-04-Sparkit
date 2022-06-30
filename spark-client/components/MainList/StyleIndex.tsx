import styled from "styled-components";
import LikeAndComment, {
  MainListLikeButton,
  MainListContentP,
} from "./LikeAndComment";

import { darkTheme } from "../../styles/theme";

export const MainUl = styled.ul`
  width: 100%;
`;

export const MainListList = styled.li`
  width: 100%;
  background-color: ${darkTheme.contentColor};
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 16px;
  box-sizing: border-box;
  min-width: 430px;

  &:hover {
    box-shadow: 0.5px 0.5px 10px ${darkTheme.accentColor};
  }
`;

export const MainListButton = styled(MainListLikeButton)`
  background-color: transparent;
  cursor: pointer;
  padding: 8px;
`;

export const MainListP = styled.p`
  display: flex;
  > :nth-child(2) {
    color: #ececec;
    font-size: 18px;
  }
  > time {
    line-height: 19px;
    &::before {
      width: 10px;
      height: 10px;
      padding: 0 2px 0 4px;
      content: "•";
    }
  }
  span + span {
    padding-left: 8px;
  }
`;

export const MainListSpan = styled.span`
  color: #bbb;
  font-size: 16px;
`;

export const MainListTime = styled.time`
  color: #bbb;
  font-size: 14px;
`;

export const MainListDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

export const MainListImgBox = styled.div`
  display: inline-block;
  padding: 8px;
`;

export const MainListContentBox = styled.div`
  display: inline-block;
  width: 70%;

  > :last-child {
    border-top: 1px solid #aaa;
  }
`;

export const LinkA = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
