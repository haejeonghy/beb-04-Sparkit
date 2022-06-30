import styled from "styled-components";
import { useState } from "react";

import SEO from "../../components/SEO";
import LikeAndComment from "../../components/MainList/LikeAndComment";
import { darkTheme } from "../../styles/theme";
import Layout from "../../components/Layout";
import { GetPosts } from "../../types/spark";

interface Data {
  getPost: GetPosts;
}
interface Props {
  params: string[];
  data: Data;
  onClick: () => void;
}

const DetailPage = ({ params, data, onClick }: Props) => {
  const [isLiked, setIsLiked] = useState(0);
  const { getPost } = data;
  const { title } = getPost;
  const { created_at } = getPost;
  const { nickname } = getPost.writer;
  const { post_content } = getPost;
  const { hashtags } = getPost;
  const { likes } = getPost;
  const { images } = getPost;
  const [postTitle] = params || [];

  return (
    <Layout>
      <DetailContainer>
        <SEO title={postTitle} />
        <PostContent>
          <PostHeader>
            <PostTitle>{title}</PostTitle>
            <PostUserCreate>
              <div className="user">작성자: {nickname}</div>
              <div className="create">날짜: {created_at}</div>
            </PostUserCreate>
          </PostHeader>

          <div className="inner_line"></div>

          <PostImage>
            {images.map((token: any) => {
              return (
                <div key={token}>
                  <img className="image" src={token.image_path} />
                </div>
              );
            })}
          </PostImage>

          <PostBody>
            <p className="content">{post_content}</p>
          </PostBody>

          <PostHash>
            {hashtags.map((token: any) => {
              return <div key={token}>#{token.hashtag} </div>;
            })}
          </PostHash>

          <PostBottom>
            <LikeAndComment postData={getPost} />
          </PostBottom>
        </PostContent>

        <Content></Content>
        <ContentBtn onClick={onClick}>입력</ContentBtn>
      </DetailContainer>
    </Layout>
  );
};

export default DetailPage;

const PostTitle = styled.h1`
  font-size: 36px;
`;

const PostUserCreate = styled.div`
  font-size: 20px;
  margin-top: 30px;

  .user {
    float: left;
  }
  .create {
    display: flex;
    float: right;
  }
`;

// 사용자 올린 그림
const PostImage = styled.div`
  margin-left: 20px;
  margin-top: 30px;
  .image {
    margin-top: 10px;
    width: 250px;
    height: 250px;
  }
`;

// post_content 사용자 작성 글
const PostBody = styled.div`
  font-size: 20px;
  margin-top: 30px;
  margin-left: 20px;

  .content {
    margin-top: 20px;
  }
`;

// post_content 사용자 작성 글
const PostHash = styled.div`
  display: flex;
  color: rgb(255, 255, 255, 0.65);
  font-size: 16px;
  margin-top: 30px;
  margin-left: 20px;
`;

// 댓글 입력 칸
const Content = styled.input`
  margin-left: 10px;
  width: 90%;
  height: 50px;
  border: 0;
  outline: 0;
`;
const ContentBtn = styled.button`
  margin-left: 5px;
`;

const DetailContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
  background-color: ${darkTheme.contentColor};
  width: 100%;
  border-radius: 4px;
`;

const PostContent = styled.div`
  width: 100%;
  .inner_line {
    border-top: 1px solid #797979;
    margin-top: 30px;
  }
`;

const PostHeader = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
`;

const PostBottom = styled(PostHeader)`
  margin-top: 50px;
  border: none;
`;
