import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { useLayoutEffect, useState } from "react";
import { GetPosts } from "../../types/spark";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GetPostsByUserId } from "../../types/spark";
import GetUserId from "../../states/userId";
import { useRecoilState } from "recoil";
import { userIdState } from "../../states/spark";

export const MainListContentP = styled.p`
  padding: 4px 0 8px;
  text-align: left;
  &:last-child {
    padding: 0;
  }
`;

export const MainListLikeButton = styled.button`
  outline: none;
  border: none;
  box-shadow: none;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  padding: 8px 8px 2px;
  &:first-child {
    padding-right: 8px;
  }
  & + button {
    border-left: 1px solid #aaa;
  }
`;

const ContentSpan = styled.span`
  padding: 0 8px;
  height: 14px;
  font-size: 14px;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const heartSvgStyle = {
  width: "13.5px",
  height: "13.5px",
  fill: "#dc495c",
};

const commentSvgStyle = {
  width: "13.5px",
  height: "13.5px",
  filter: "brightness(0) invert(1)",
};

interface Props {
  postData: GetPosts;
}

const LIKEIT = gql`
  mutation CreateLikes($postId: Int, $userId: Int, $accessToken: String) {
    createLikes(post_id: $postId, user_id: $userId, access_token: $accessToken)
  }
`;
const LikeAndComment = ({ postData }: Props) => {
  const { likes } = postData;

  const accessToken = window.sessionStorage.getItem("userInfo");
  const [createLikes] = useMutation(LIKEIT);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [postLikes, setPostLikes] = useState(likes?.length);

  GetUserId();
  const [userId] = useRecoilState(userIdState);
  useLayoutEffect(() => {
    if (!likes) return;
    const likesUserIds = likes.map((item) => item.user_id);
    setIsLikeClicked(likesUserIds.includes(userId));
  }, []);

  const LikeVotting = () => {
    setPostLikes((prev) => (prev += 1));
    const args = {
      postId: postData.id,
      userId: userId,
      accessToken: accessToken,
    };
    createLikes({ variables: args });
  };
  const handleLikeButtonClick = () => {
    if (isLikeClicked) return;
    setIsLikeClicked(true);
    LikeVotting();
  };
  return (
    <MainListContentP>
      <MainListLikeButton type="button" onClick={handleLikeButtonClick}>
        <ContentDiv>
          {isLikeClicked ? (
            <FaHeart style={heartSvgStyle} />
          ) : (
            <FaRegHeart style={heartSvgStyle} />
          )}
          <ContentSpan>{postLikes}</ContentSpan>
        </ContentDiv>
      </MainListLikeButton>
      <MainListLikeButton>
        <ContentDiv>
          <GrEdit style={commentSvgStyle} />
          <ContentSpan>댓글</ContentSpan>
        </ContentDiv>
      </MainListLikeButton>
    </MainListContentP>
  );
};

export default LikeAndComment;
