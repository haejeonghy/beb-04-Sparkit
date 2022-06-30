import styled from "styled-components";
import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import axios from "axios";
import NavBar from "../components/Layout/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import GetUserId from "../states/userId";
import { useRecoilState } from "recoil";
import { userIdState } from "../states/spark";
import { CREATE_POST } from "../query/MutationQuery";

export default function WritePost() {
  const [isImageUpload, setImageUploaded] = useState(false);
  const [isdataURL, setdataURL] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hash, setHash] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [complete, setComplete] = useState(false);
  const [addNote, { data, loading, error }] = useMutation(CREATE_POST);
  const router = useRouter();
  router;
  useEffect(() => {
    setAccessToken(window.sessionStorage.getItem("userInfo"));
  }, []);
  GetUserId();
  const [userId] = useRecoilState(userIdState);
  console.log(userId);
  const onComplete = () => {
    if (!complete) {
      router.push("/");
      alert("Post created!");
    }
    if (complete) {
      console.error(error);
    }
  };

  const handleClick = () => {
    // 해시태그 #으로 구분
    let hashtags = hash.split("#");
    hashtags = hashtags.filter((element, i) => element != "");
    console.log(userId);
    console.log("토큰", accessToken);
    console.log("제목: ", title);
    console.log("컨텐츠: ", content);
    console.log("해시태그: ", hashtags);
    console.log("url들: ", isdataURL);
    if (title != undefined && content != undefined) {
      addNote({
        variables: {
          title: title,
          post_content: content,
          user_id: userId,
          hashtags: hashtags,
          images: isdataURL,
          access_token: accessToken,
        },
      });
      onComplete();
    } else {
      alert("제목과 컨텐츠는 필수 항목 입니다.");
    }
  };

  const sendFileToIPFS = async (f: any) => {
    if (f) {
      const formData = new FormData();
      formData.append("file", f);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `54f614daf83b97f523ed`,
          pinata_secret_api_key: `ee4d5326c60c345322fe611f7a1a04fb6a51077ee3e1c4d1305d1cc5fc11667a`,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `https://ipfs.moralis.io:2053/ipfs/${resFile.data.IpfsHash}`;
      setdataURL([...isdataURL, ImgHash]);
    }
  };

  return (
    <Container>
      <NavBar />
      <FormWrap>
        <TitleBox>
          <label className="title">Posting to</label>
          <input
            className="input"
            type="text"
            onChange={({ target: { value } }) => setTitle(value)}
            placeholder="제목"
            required
          ></input>
        </TitleBox>
        <ContentBox>
          <label className="content">컨텐츠</label>
          <textarea
            className="text"
            onChange={({ target: { value } }) => setContent(value)}
            placeholder="내용을 입력하세요"
            required
          />
        </ContentBox>
        <HashBox>
          <input
            className="hashtag"
            onChange={({ target: { value } }) => setHash(value)}
            placeholder="#hash"
            required
          />
        </HashBox>
        <ImageBox>
          <label className="image">사진업로드</label>
          <input
            type="file"
            onChange={(e) => sendFileToIPFS(e.target.files[0])}
            required
          />
          {isImageUpload
            ? loading
              ? "Loading image..."
              : "Upload complete!"
            : null}
        </ImageBox>
      </FormWrap>

      <TokenWrapper>
        {isdataURL.map((token) => {
          return (
            <TokenBox key={token}>
              <TokenImage src={token} />
            </TokenBox>
          );
        })}
      </TokenWrapper>
      <Submit type="reset" onClick={handleClick}>
        제출
      </Submit>
    </Container>
  );
}

const TokenWrapper = styled.div`
  display: flex;
  width: 600px;
  height: auto;
`;

const Container = styled.div`
  font-family: sans-serif;
  display: grid;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  justify-content: center;
`;

const FormWrap = styled.form`
  display: grid;

  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 100px auto 0;
`;

const TitleBox = styled.div`
  .title {
    display: grid;
    cursor: auto;
    font-weight: 600;
    font-size: 32px;
    line-height: 60px;
    color: white;
  }

  .input {
    border: 0;
    outline: 0;
    width: 600px;
    height: 30px;
    font-size: 16px;
    :hover {
      box-shadow: #b7dae9 0 0 20px;
      transition: 0.2s ease;
    }
  }
`;
const ContentBox = styled.div`
  .content {
    display: grid;
    cursor: auto;
    font-weight: 600;
    font-size: 32px;
    line-height: 60px;
    color: white;
  }

  .text {
    border: 0;
    outline: 0;
    width: 600px;
    height: 180px;
    font-size: 16px;
    :hover {
      box-shadow: #b7dae9 0 0 20px;
      transition: 0.2s ease;
    }
  }
`;
const ImageBox = styled.div`
  .image {
    display: grid;
    cursor: auto;
    font-weight: 600;
    font-size: 32px;
    line-height: 60px;
    color: white;
  }

  .upload {
  }
`;

const HashBox = styled.div`
  .hashtag {
    border: 0;
    outline: 0;
    margin: 5px auto;
    width: 600px;
    height: 30px;
    font-size: 16px;
    :hover {
      box-shadow: #b7dae9 0 0 20px;
      transition: 0.2s ease;
    }
  }
`;

const Submit = styled.button`
  height: 100px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 25px;
  padding: 10px 25px;
  background-color: #19ca69;
  color: white;
  border: none;
  margin: 20px;
  :hover {
    box-shadow: #b7dae9 0 0 20px;
    transition: 0.2s ease;
  }
`;

const TokenBox = styled.div``;

const TokenImage = styled.img`
  width: 180px;
  height: 180px;
  margin: 10px;
`;
