import styled from "styled-components";
import CommentImg from "/public/images/comment.svg";
import LikeImg from "/public/images/like.svg";
import LinkImg from "/public/images/link.svg";
import SaveImg from "/public/images/save.svg";
import ReportImg from "/public/images/report.svg";
import FunctionImg from "/public/images/function.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BoardList from "./list";
import BasicBoard from "../../components/BasicBoard";
import CommentsBox from "../../components/CommentsBox";
import {
  COMMENT_LOAD_REQUEST,
  COMMENT_WRITE_REQUEST,
} from "../../reducers/comment";
import ReCommentsBox from "../../components/ReCommentsBox";
import {BOARD_DETAIL_REQUEST, DISLIKE_UPDATE_REQUEST, LIKE_UPDATE_REQUEST} from "../../reducers/post";

const BasicBoardContent = () => {
  const [rereSeq, setRereseq] = useState(null);
  const { post } = useSelector((state) => state.post);
  const { comments, commentLoading } = useSelector((state) => state.comment);
  const { isLogIn, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    //let seq = "zena";
    //let year = new Date().getFullYear(); // 년도
    //let month = new Date().getMonth() + 1;
    //let day = new Date().getDate();
    //console.log(day);
    //let test = seq + year + month + day;
    //console.log(test.toString().charCodeAt());
    //#endregion
    dispatch({
      type: COMMENT_LOAD_REQUEST,
      data: post.seq,
    });
  }, []);

  useEffect(() => {
    if (!post?.seq) {
      const board_seq = localStorage.getItem("board_seq");
      dispatch({
        type: BOARD_DETAIL_REQUEST,
        data: board_seq,
      });

      dispatch({
        type: COMMENT_LOAD_REQUEST,
        data: board_seq,
      });
    }
  }, [post]);

  useEffect(() => {
    if (comments) {
      console.log(comments);
    }
  }, [commentLoading]);

  const rereply = (comment_seq) => {
    setRereseq(comment_seq);
  };

  const likeUpdate = () => {
    if (isLogIn) {
      const isLike = post.Liker.filter((v) => v.user_seq === user.seq);
      //console.log('is_like', isLike);
      if (isLike?.length > 0) {
        return alert('이미 좋아요 하셨습니다');
      }
      const board_seq = localStorage.getItem("board_seq");
      dispatch({
        type: LIKE_UPDATE_REQUEST,
        data: {board_seq}
      })
    }
  };

  const dislikeUpdate = () => {
    if (isLogIn) {
      const isLike = post.DisLiker.filter((v) => v.user_seq === user.seq);
      //console.log('is_like', isLike);
      if (isLike?.length > 0) {
        return alert('이미 싫어요 하셨습니다');
      }
      const board_seq = localStorage.getItem("board_seq");
      dispatch({
        type: DISLIKE_UPDATE_REQUEST,
        data: {user_seq : user?.seq, board_seq}
      })
    }

  };

  return (
    <Container>
      <TitleContainer>
        <Category>{post.category}</Category>
        <TextTitle>{post.title}</TextTitle>
        <TitleButton>
          <FunctionImg />
        </TitleButton>
      </TitleContainer>
      <TitleBottomContainer>
        <Writer>{post.writer}</Writer>
        <WriteDate>{post.ins_dttm_fm}</WriteDate>
        <TitleBottomButtons>
          <CommentCount>
            <CommentImg />
            댓글 <span>{post.comment_cnt}</span>
          </CommentCount>
          <LikeCount>
            <LikeImg />
            좋아요 <span>{post.b_like}</span>
          </LikeCount>
          <CopyURL>
            <LinkImg />
            URL복사
          </CopyURL>
          <PostScrap>
            <SaveImg />
            스크랩
          </PostScrap>
          <PostReport>
            <ReportImg />
            신고
          </PostReport>
        </TitleBottomButtons>
      </TitleBottomContainer>
      <ContentsContainer>
        <Contents>{post.contents}</Contents>
      </ContentsContainer>
      <ContentsBottomContainer>
        <LikeButton onClick={() => likeUpdate()}>
          <LikeImg />
          좋아요
          <span>{post.b_like}</span>
        </LikeButton>
        <DisLikeButton onClick={() => dislikeUpdate()}>
          <LikeImg />
          별로요
          <span>{post.b_dislike}</span>
        </DisLikeButton>
      </ContentsBottomContainer>
      {comments && (
        <CommentContainer>
          {comments.map((val, index) => (
            <div key={index + new Date()}>
              <NickNameContainer>
                <span onClick={() => rereply(val.seq)}>{val.writer}</span>&nbsp;
                <span>{val.ins_dttm}</span>
              </NickNameContainer>
              <CommentContentContainer>{val.contents}</CommentContentContainer>
              <ReCommentsBox seq={val.seq} isOpen={val.seq == rereSeq} />
            </div>
          ))}
          <CommentsBox />
        </CommentContainer>
      )}
    </Container>
  );
};

export default BasicBoardContent;

const Container = styled.div`
  width: 890px;
  color: #1e1e1e;
  font-size: 13px;
`;

const TitleContainer = styled.div`
  height: 60px;
  background: #f2f7fb;
  display: flex;
  align-items: center;
`;

const Category = styled.div`
  width: 60px;
  color: #0099ff;
  font-size: 16px;
  text-align: center;
`;

const TextTitle = styled.div`
  width: 810px;
  font-size: 16px;
`;

const TitleButton = styled.div`
  margin-right: 30px;
`;

const TitleBottomContainer = styled.div`
  display: flex;
  height: 45px;
  border-bottom: 1px solid #ebecf1;
  align-items: center;
`;

const Writer = styled.div`
  width: 60px;
  text-align: center;
`;
const WriteDate = styled.div`
  width: 400px;
`;

const TitleBottomButtons = styled.div`
  width: 430px;
  display: flex;
  margin-right: 20px;
  justify-content: space-around;
  svg {
    margin-right: 5px;
    vertical-align: middle;
  }
  span {
    color: #ff4343;
  }
`;

const CommentCount = styled.div``;
const LikeCount = styled.div``;
const CopyURL = styled.div``;
const PostScrap = styled.div``;
const PostReport = styled.div``;

const ContentsContainer = styled.div`
  width: 810px;
  margin: 30px 40px;
`;
const Contents = styled.div`
  font-size: 13px;
`;

const ContentsBottomContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 60px 45px 35px 45px;
  svg {
    margin-right: 3px;
    vertical-align: middle;
  }
  span {
    color: #ff4343;
    margin-left: 3px;
  }
  button {
    width: 127px;
    height: 35px;
    border: 1px solid #a1a1a1;
    background-color: #ffffff;
    font-size: 13px;
  }
`;

const LikeButton = styled.button`
  font-size: 13px;
`;
const DisLikeButton = styled.button`
  border-left: none;
`;
const CommentContainer = styled.div`
  margin: 20px 10px;
`;
const NickNameContainer = styled.div`
  margin: 10px;
`;
const CommentContentContainer = styled.div`
  margin: 10px;
  border-bottom: 1px solid grey;
`;
