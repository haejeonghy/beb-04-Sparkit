import type { NextPage } from "next";
import styled from "styled-components";

import { gql, useQuery } from "@apollo/client";
import { ARR } from "../config/mainMock";
import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import LikeAndComment, {
  MainListLikeButton,
  MainListContentP,
} from "../components/LikeAndComment";

import { darkTheme } from "../styles/theme";

interface Hashtags {
  id: number;
  hashtag: string;
}

interface LinkProps {
  href: string;
}

interface Comments {
  post_id: number;
  user_id: number;
  commnet: string;
  id: number;
}

interface Writer {
  nickname: string;
}

interface Results {
  getPosts: GetPosts[];
}
interface GetPosts {
  id: number;
  title: string;
  post_content: string;
  user_id: number;
  created_at: string;
  hashtags: Hashtags[];
  comments: Comments[];
  writer: Writer;
  likes: number;
}

const ALL_POST = gql`
  query GetPosts {
    getPosts {
      id
      title
      post_content
      user_id
      created_at
      hashtags {
        id
        hashtag
      }
      comments {
        post_id
        user_id
        comment
      }
      likes
      writer {
        nickname
      }
    }
  }
`;

const GET_TAG_POST = gql`
  query getTagPost($postId: String!) {
    post(id: $postId) {
      id
      title
      content
      like @client
    }
  }
`;

const tags = ARR.map((item) => item.tag);

const Home: NextPage = ({}) => {
  const router = useRouter();
  const { data, loading } = useQuery<Results>(ALL_POST);
  const [io, setIo] = useState<IntersectionObserver | null>(null);
  const endList = useRef<HTMLDivElement>(null);

  const mainListDivClick = (title: string, id: number) => {
    router.push(`/detail/${title}/${id}`);
  };

  useEffect(() => {
    const targetIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("hi");
          if (io !== null) io.disconnect();
        }
      });
    });
    setIo(targetIO);
  }, []);
  io?.observe(endList.current as Element);
  return (
    <>
      <MainHeadDiv>
        <h1>전체 태그</h1>
      </MainHeadDiv>
      <MainUl>
        {!loading &&
          data?.getPosts.map((item, index) => {
            return (
              <MainList key={`${item.id + index}`}>
                <MainListP>
                  <MainListSpan>{item.writer?.nickname ?? "test"}</MainListSpan>

                  {item.hashtags.map((tag, idx) => {
                    return (
                      <MainListSpan key={tag.hashtag + idx}>
                        {tag.hashtag}
                      </MainListSpan>
                    );
                  })}

                  <MainListTime>{item.created_at}</MainListTime>
                </MainListP>
                <MainListDiv>
                  <MainListButton
                    type="button"
                    onClick={() => mainListDivClick(item.title, item.id)}
                  >
                    <MainListImgBox>img</MainListImgBox>
                  </MainListButton>
                  <MainListContentBox>
                    <MainListButton
                      type="button"
                      onClick={() => mainListDivClick(item.title, item.id)}
                    >
                      <MainListContentP>
                        <Link href={`/detail/${item.title}/${item.id}`}>
                          <LinkA>{item.title}</LinkA>
                        </Link>
                      </MainListContentP>
                      <MainListContentP>
                        <Link href={`/detail/${item.title}/${item.id}`}>
                          <LinkA>{item.post_content}</LinkA>
                        </Link>
                      </MainListContentP>
                    </MainListButton>
                    <LikeAndComment />
                  </MainListContentBox>
                </MainListDiv>
              </MainList>
            );
          })}
        <div ref={endList}></div>
      </MainUl>
    </>
  );
};

export default Home;

const MainUl = styled.ul`
  width: 100%;
`;

const MainList = styled.li`
  width: 100%;
  background-color: ${darkTheme.contentColor};
  height: 140px;
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 16px;
  box-sizing: border-box;
  min-width: 430px;

  &:hover {
    box-shadow: 0.5px 0.5px 10px #55e696;
  }
`;

const MainListButton = styled(MainListLikeButton)`
  background-color: transparent;
  cursor: pointer;
  padding: 8px;
`;

const MainListP = styled.p`
  > :first-child {
    color: #ececec;
    font-size: 18px;
  }
  > time {
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

const MainListSpan = styled.span`
  color: #bbb;
  font-size: 16px;
`;

const MainListTime = styled.time`
  color: #bbb;
  font-size: 14px;
`;

const MainListDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const MainListImgBox = styled.div`
  display: inline-block;
  width: 100px;
  height: 50px;
`;

const MainListContentBox = styled.div`
  display: inline-block;
  width: 70%;

  > :last-child {
    border-top: 1px solid #aaa;
  }
`;

const MainHeadDiv = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
`;

const LinkA = styled.a`
  text-decoration: none;
`;
