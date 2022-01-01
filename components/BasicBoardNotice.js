import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const BasicBoard = () => {
  const [contents, setContents] = useState([]);

  const getPost = async () => {
    // let boardList = await axios.get("http://localhost:3060/post");
    // setContents(boardList.data);
    const boardList = [
      {
        category: "공지",
        title: "지난 메뉴 보기",
        comment_count: 3,
        date: "11:52",
        emphasis: true,
        notice_type: "basic",
      },
      {
        category: "필독",
        title: "금전 거래 이용 규칙",
        comment_count: 123,
        date: "09:24",
        emphasis: true,
        notice_type: "must",
      },
      {
        category: "후원글",
        title: "2022년 1월 후원금 & 사용내역",
        comment_count: 22,
        date: "2022.01.01",
        emphasis: false,
        notice_type: "support",
      },
      {
        category: "공지",
        title: "율도 가락방 서비스 종료",
        comment_count: 33,
        date: "2021.11.08",
        emphasis: false,
        notice_type: "basic",
      },
    ];
    setContents(boardList);
  };
  useEffect(() => {
    getPost();
  }, []);

  function chkNoticeType(type) {
    console.log(type);
    if (type == "01") {
      return "basic";
    }
  }

  return (
    <Container>
      <TitleContainer>
        <Category>구분</Category>
        <TextTitle>글제목</TextTitle>
        <IconContainer>작성일</IconContainer>
      </TitleContainer>
      <ContentsContainer>
        {contents
          ? contents.map((item, index) => (
              <div
                key={index + item.date}
                class={item.emphasis ? "emphasis" : "no-emphasis"}
              >
                <CategoryContent type={item.notice_type}>
                  {item.category}
                </CategoryContent>
                <TitleContent>
                  {item.title}
                  <span>[{item.comment_count}]</span>
                </TitleContent>
                <IconContent>{item.date}</IconContent>
              </div>
            ))
          : "내용이 없습니다."}
      </ContentsContainer>
    </Container>
  );
};

export default BasicBoard;

const Container = styled.div`
  width: 100%;
  font-size: 13px;
  color: #1e1e1e;
  .emphasis {
    background-color: #f2f7fb;
    font-weight: bold;
  }
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid #1e1e1e;
  height: 44px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Category = styled.div`
  width: 150px;
`;
const TextTitle = styled.div`
  width: 100%;
`;
const IconContainer = styled.div`
  width: 150px;
`;

const CategoryContent = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  font: normal normal normal 12px/17px Noto Sans CJK KR;
  font-weight: ${(props) => (props.type == "basic" ? "bold" : "normal")};
  color: ${(props) => (props.type == "basic" ? "#ff9100" : "#FFFFFF")};
  background: ${(props) =>
    props.type == "basic" ? "" : " #6a859a 0% 0% no-repeat padding-box"};
  background: ${(props) =>
    props.type == "support" ? "#E865AB  0% 0% no-repeat padding-box" : ""};
  border-radius: ${(props) => (props.type == "basic" ? "" : "5px")};
`;
const TitleContent = styled.div`
  width: 100%;
  padding-left: 30px;
  span {
    font-size: 13px;
    color: #ff4343;
    margin-left: 5px;
    font-weight: normal;
  }
`;
const IconContent = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  font-weight: normal;
`;

const ContentsContainer = styled.div`
  div {
    display: flex;
  }
`;
