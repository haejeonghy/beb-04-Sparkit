import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useState } from "react";

import { darkTheme } from "../../styles/theme";

import DetailPage from "../../components/Body/DetailPage";
import { GET_POST } from "../../query/GetQuery";

interface Params {
  params: { params: string[] };
}

interface Props {
  params: string[];
}

const DetailContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
  background-color: ${darkTheme.contentColor};
  width: 100%;
  border-radius: 4px;
`;

export default function Post({ params }: Props) {
  const [isLiked, setIsLiked] = useState(0);
  const [, postId] = params || [];

  const post_id = Number(postId);
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_POST, {
    variables: {
      post_id,
    },
  });

  const onClick = () => {
    cache.writeFragment({
      id: `posts:${post_id}`,
      fragment: gql`
        fragment postFragment on posts {
          like
        }
      `,
      data: {
        like: setIsLiked(isLiked + 1),
      },
    });
  };

  // 데이터 받아오기 까지 대기화면
  if (!data)
    return (
      <DetailContainer>
        <div>Loading...</div>
      </DetailContainer>
    );

  return <DetailPage params={params} data={data} onClick={onClick} />;
}

export function getServerSideProps({ params: { params } }: Params) {
  return {
    props: { params },
  };
}
