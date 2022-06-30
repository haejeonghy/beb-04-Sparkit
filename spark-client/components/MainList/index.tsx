import styled from "styled-components";
import { GiAbstract048 } from "react-icons/gi";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import sparkLogo from "../../assets/sparkLogo.png";
import LikeAndComment, {
  MainListLikeButton,
  MainListContentP,
} from "./LikeAndComment";
import { darkTheme } from "../../styles/theme";
import { useRouter } from "next/router";
import { GetPosts } from "../../types/spark";

interface Props {
  data: GetPosts[];
}

interface Loader {
  src: string;
  width: number;
  quality: number;
}

const myLoader = ({ src, width, quality }: Loader) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const MainList = ({ data }: Props) => {
  const router = useRouter();
  const mainListDivClick = (title: string, id: number) => {
    router.push(`/detail/${title}/${id}`);
  };

  return (
    <MainUl>
      {!data && "Loading.."}
      {data &&
        data?.map((item, index) => {
          console.log(item.writer);
          let { title } = item;
          title = title || "spark";
          const uri = `/detail/${title}/${item.id}`;
          return (
            <MainListList key={`${item.id + index}`}>
              <MainListP>
                <MainListSpan>
                  <GiAbstract048 />
                </MainListSpan>
                <MainListSpan>{item.writer?.nickname}</MainListSpan>
                {item.hashtags.map((tag, idx) => {
                  return (
                    <MainListSpan key={tag.hashtag + idx}>
                      {tag.hashtag}
                    </MainListSpan>
                  );
                })}
                <MainListTime>
                  {String(new Date(item.created_at + "Z").toLocaleString())}
                </MainListTime>
              </MainListP>
              <MainListDiv>
                <MainListImgBox>
                  <Link href={uri}>
                    <LinkA>
                      <Image
                        loader={myLoader as ImageLoader}
                        src={
                          item.images !== null && item.images.length > 0
                            ? item.images[0].image_path
                            : sparkLogo
                        }
                        alt="logo image"
                        width={120}
                        height={120}
                      />
                    </LinkA>
                  </Link>
                </MainListImgBox>
                <MainListContentBox>
                  <MainListButton
                    type="button"
                    onClick={() => mainListDivClick(title, item.id)}
                  >
                    <MainListContentP>
                      <Link href={uri}>
                        <LinkA>{item.title}</LinkA>
                      </Link>
                    </MainListContentP>
                    <MainListContentP>
                      <Link href={uri}>
                        <LinkA>{item.post_content}</LinkA>
                      </Link>
                    </MainListContentP>
                  </MainListButton>
                  <LikeAndComment postData={item} />
                </MainListContentBox>
              </MainListDiv>
            </MainListList>
          );
        })}
    </MainUl>
  );
};

export default MainList;

const MainUl = styled.ul`
  width: 100%;
`;

const MainListList = styled.li`
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

const MainListButton = styled(MainListLikeButton)`
  background-color: transparent;
  cursor: pointer;
  padding: 8px;
`;

const MainListP = styled.p`
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
  padding: 8px;
`;

const MainListContentBox = styled.div`
  display: inline-block;
  width: 70%;

  > :last-child {
    border-top: 1px solid #aaa;
  }
`;

const LinkA = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
