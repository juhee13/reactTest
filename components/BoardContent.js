import styled from "styled-components";
import CommentImg from "/public/images/comment.svg";
import LikeImg from "/public/images/like.svg";
import LinkImg from "/public/images/link.svg";
import SaveImg from "/public/images/save.svg";
import ReportImg from "/public/images/report.svg";
import FunctionImg from "/public/images/function.svg";

const BasicBoardContent = () => {
  return (
    <Container>
      <TitleContainer>
        <Category>유머</Category>
        <TextTitle>오늘 전 커뮤 온에어 난리난 금쪽같은 내새끼</TextTitle>
        <TitleButton>
          <FunctionImg />
        </TitleButton>
      </TitleContainer>
      <TitleBottomContainer>
        <Writer>익명</Writer>
        <WriteDate>2021.11.19. 11:52</WriteDate>
        <TitleBottomButtons>
          <CommentCount>
            <CommentImg />
            댓글 <span>25</span>
          </CommentCount>
          <LikeCount>
            <LikeImg />
            좋아요 <span>23</span>
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
        <Contents>
          남편이랑 시엄마가 엄마한테 가스라이팅 오져서 애가 그걸보고 엄마한테
          과잉반응함 손닿는 것도 극혐함
          <br /> 두번 유산 후 힘들게 금쪽이 얻었는데 애가 엄마 거부. 알고보니
          아빠랑 시어머니가 애 엄하게 혼내놓고 대놓고 엄마 왕따시킴. 무섭던
          금쪽이는 강자가 아빠, 할머니인거 깨닫고 엄마 싫어하는 척했던거고 아빠
          시어머니는 엄마탓만 하며 시어머니가 금쪽이 신청
        </Contents>
      </ContentsContainer>
      <ContentsBottomContainer>
        <LikeButton>
          <LikeImg />
          좋아요
          <span>23</span>
        </LikeButton>
        <DisLikeButton>
          <LikeImg />
          별로요
          <span>0</span>
        </DisLikeButton>
      </ContentsBottomContainer>
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
