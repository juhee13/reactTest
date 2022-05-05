import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BOARD_ALL_REQUEST, BOARD_DETAIL_REQUEST } from "../reducers/post";
import { Oval } from "react-loader-spinner";
import Router from "next/router";

const BasicBoard = () => {
  const [contents, setContents] = useState([]);
  const dispatch = useDispatch();
  const { Posts, isSuccess, isLoading, post } = useSelector(
    (state) => state.post
  );

  const getPost = () => {
    dispatch({
      type: BOARD_ALL_REQUEST,
    });
  };

  const goDetail = (board_seq) => {
    // 가져온 글 번호
    dispatch({
      type: BOARD_DETAIL_REQUEST,
      data: board_seq,
    });
    localStorage.setItem("board_seq", board_seq);
  };

  useEffect(() => {
    if (isSuccess) {
      Router.push("/board/detail");
    }
  }, [post]);

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    console.log(Posts.data);
    if (Posts?.data) {
      //post가 있고 post에 data 있을 때
      setContents(Posts.data);
    }
  }, [Posts && Posts.data]); // post가 변경되면 실행

  return (
    <>
      {isLoading && <Spinner color="#00BFFF" height={80} width={80} />}
      <Container>
        <TitleContainer>
          <Category>구분</Category>
          <TextTitle>글제목</TextTitle>
          <IconContainer>작성일</IconContainer>
          <IconContainer>좋아요</IconContainer>
        </TitleContainer>
        <ContentsContainer>
          {contents
            ? contents.map((item, index) => (
                <ContentsWrapper key={index + item.ins_dttm}>
                  <CategoryContent color={item.color}>{item.category}</CategoryContent>
                  <TitleContent onClick={() => goDetail(item.seq)}>
                    {item.title}
                    <span>[{item.comments_cnt}]</span>
                  </TitleContent>
                  <IconContent>{item.ins_dttm_fm}</IconContent>
                  <IconContent>{item.b_like}</IconContent>
                </ContentsWrapper>
              ))
            : "내용이 없습니다."}
        </ContentsContainer>
      </Container>
    </>
  );
};

export default BasicBoard;

const Container = styled.div`
  width: 100%;
  font-size: 13px;
  color: #1e1e1e;
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
  width: 150px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  color: ${props=> props.color};
`;

const TitleContent = styled.div`
  width: 100%;
  margin: 10px;
  cursor: pointer;
  span {
    font-size: 13px;
    color: #ff4343;
    margin-left: 5px;
  }
`;

const IconContent = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsContainer = styled.div`
  div {
    
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #EBECF1;
`;

const Spinner = styled(Oval)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
