import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COMMENT_WRITE_REQUEST,
  RECOMMENT_WRITE_REQUEST,
} from "../reducers/comment";

const ReCommentsBox = ({ seq, isOpen }) => {
  const [contents, setContent] = useState("");
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { commentSuccess, commentLoading, comments } = useSelector(
    (state) => state.comment
  );

  const getContents = (e) => {
    const { value } = e.target;
    setContent(value);
  };
  const commentSave = () => {
    dispatch({
      type: RECOMMENT_WRITE_REQUEST,
      data: { board_seq: post.seq, contents, comment_seq: seq },
    });
    setContent("");
  };

  return (
    <>
      {isOpen ? (
        <Container>
          <InputBox
            value={contents}
            onChange={getContents}
            type="text"
            placeholder="댓글을 입력해주세요"
          />
          <InputBoxButton onClick={commentSave}>등록</InputBoxButton>
        </Container>
      ) : null}
    </>
  );
};

export default ReCommentsBox;

const Container = styled.div``;

const InputBox = styled.textarea`
  float: left;
  height: 95px;
  width: calc(100% - 130px);
  font-size: 13px;
  border: 1px solid #d2d2d2;
  background: #ffffff;
  opacity: 1;
  padding-left: 11.5px;
  padding-top: 5px;
  resize: none;
`;

const InputBoxButton = styled.button`
  margin-left: 5px;
  float: left;
  height: 104px;
  width: 102px;
  background: #393535;
  border: 1px solid #393535;
  opacity: 1;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
