import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { postsState } from "../../../states/spark";
import { gql, useQuery } from "@apollo/client";
import { darkTheme } from "../../../styles/theme";

import {
  AsideAside,
  AsideLi,
  AsideContainer,
  AsideDiv,
  AsideLiButton,
} from "./Mainstyle/Saside";


import { ALL_POST, ALL_POST_BY_HASHTAG } from "../../../query/GetQuery";
import { ResultsHashTag, Results, BackColor, Tags } from "../../../types/spark";

interface TagsCount {
  [name: string]: { id: number; count: number };
}

interface Obj {
  name: string;
  id: number;
  count: number;
}

interface Props {
  setTitle: Function;
}

const Aside = ({ setTitle }: Props) => {
  const [, setPostData] = useRecoilState(postsState);
  const [tags, setTags] = useState<Tags[]>([]);
  const [obj, setObj] = useState<Obj[]>([]);

  const [tagId, setTagId] = useState(0);
  const { data, refetch } = useQuery<Results>(ALL_POST);
  const { data: data2, refetch: refetch2 } = useQuery<ResultsHashTag>(
    ALL_POST_BY_HASHTAG,
    {
      variables: { hashtagId: tagId },
    }
  );

  useEffect(() => {
    refetch2();
  }, [tagId]);

  useEffect(() => {
    if (!data2) return;
    setPostData(data2.getPostsByHashtag);
  }, [data2]);

  const sortTagCountArr = (arr: Obj[]) => {
    return arr.sort(function (a, b) {
      return b.count - a.count;
    });
  };

  const tagsCountObj = (arr: Tags[]) => {
    const newObj: TagsCount = {};
    arr.forEach((item) => {
      for (let i = 0; i < item.tags.length; i++) {
        const tag = item.tags[i].hashtag;
        if (newObj[tag]) newObj[tag].count += 1;
        else newObj[tag] = { count: 1, id: item.tags[i].id };
      }
    });
    return newObj;
  };
  const tagsCountArr = (obj: TagsCount) => {
    const arr = [];
    for (let key in obj) {
      arr.push({ name: key, count: obj[key].count, id: obj[key].id });
    }
    return arr;
  };

  const handleTagClick = (item: number, name: string) => {
    if (!data2) return;

    setPostData(data2.getPostsByHashtag);
    setTitle(name);
    setTagId(item);
  };
  const handleTagAllClick = () => {
    refetch();
    if (!data) return;
    setPostData(data.getPosts);
    setTitle("전체 태그");
  };

  useEffect(() => {
    if (!data) return;
    const tags = data.getPosts
      .map((item) => {
        return { tags: item.hashtags };
      })
      .flat();

    setTags(tags);
    setPostData(data.getPosts);
  }, [data]);

  useEffect(() => {
    if (!tags) return;
    const result1 = tagsCountObj(tags);
    const result2 = tagsCountArr(result1);
    const sortedArr = sortTagCountArr(result2);
    setObj(sortedArr);
  }, [tags]);

  const tagList = useMemo(() => {
    return obj.slice(0, 6).map((item, index) => {
      return (
        <AsideLi key={item.name + index}>
          <AsideLiButton
            type="button"
            onClick={() => handleTagClick(item.id, item.name)}
          >
            {item.name}
          </AsideLiButton>
        </AsideLi>
      );
    });
  }, [obj]);

  return (
    <AsideAside>
      <AsideContainer>
        <AsideDiv backgroundColor={`${darkTheme.contentColor}`}>
          <ul>
            <AsideLi>⭐공지사항⭐</AsideLi>
            <AsideLi>
              <h1>댓글 작성 및 NFT 구매 기능은 차후 지원 예정입니다.</h1>
            </AsideLi>
          </ul>
        </AsideDiv>
        {
          <AsideDiv backgroundColor={`${darkTheme.contentColor}`}>
            <nav>
              <ul>
                <AsideLi>
                  <AsideLiButton type="button" onClick={handleTagAllClick}>
                    전체 태그
                  </AsideLiButton>
                </AsideLi>
                {obj !== [] && tagList}
              </ul>
            </nav>
          </AsideDiv>
        }
      </AsideContainer>
    </AsideAside>
  );
};

export default Aside;
