import styled from "styled-components";
import ToggleOn from "/public/images/toggle_on.svg";
import ToggleOff from "/public/images/toggle_off.svg";
import SearchImg from "/public/images/search.svg";

let switch_state = 'on';
const imgclick = () => {
  switch_state == 'on' ? switch_state = 'off' : switch_state = 'on';
  console.log(switch_state);
};

const SwitchButton = ({
  select_size,
  input_size,
  button_size,
  placeholder_text
}) => (
  <Container>
    <ToggleContainer>
      <ToggleText>스티커</ToggleText>
      <ToogleImage onClick={imgclick}>
        {switch_state == 'on' ? <ToggleOn /> : <ToggleOff />}
      </ToogleImage>
    </ToggleContainer>
    <ToggleContainer2>
      <ToggleText>성인글 필터링</ToggleText>
      <ToogleImage onClick={imgclick}>
        {switch_state == 'on' ? <ToggleOn /> : <ToggleOff />}
      </ToogleImage>
    </ToggleContainer2>
    <SearchContainer>
      <Select size={select_size}>
        <option>제목+내용</option>
        <option>제목</option>
        <option>내용</option>
        <option>태그</option>
      </Select>
      <InputBox placeholder={placeholder_text} size={input_size} />
      <Button size={button_size}>
        <BUttonImage />
        <span>검색</span>
      </Button>
    </SearchContainer>
  </Container>
);

export default SwitchButton;

const Container = styled.div`
  width: 890px;
  height: 60px;
  background-color: #F2F7FB;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleContainer = styled.div`
  /* margin-left: 100px; */
`;
const ToggleContainer2 = styled.div`
  margin-left: 30px;
`;
const SearchContainer = styled.div`
  margin-left: 30px;
`;

const ToggleText = styled.span`
    height: 18px;
    color: #393535;
    font-size: 13px;
    text-align: right;
    letter-spacing: 0;
    color: #393535;
    opacity: 1;
`;

const Select = styled.select`
  width: ${(props) => (props.select_size ? props.select_size : 97)}px;
  height: 35px;
  border: 1px solid #d2d2d2;
  font-size: 13px;
  text-align: center;

  option {
    letter-spacing: 0px;
    color: #393535;
  }
`;

const InputBox = styled.input`
  width: ${(props) => (props.input_size ? props.input_size : 240)}px;
  height: 35px;
  border: 1px solid #d2d2d2;
  font-size: 13px;
  text-indent: 11.5px;
  margin-left: 5px;
`;

const Button = styled.button`
  width: ${(props) => (props.button_size ? props.button_size : 78)}px;
  height: 35px;
  margin-left: 5px;
  border: 1px solid #707070;
  span {
    color : #1E1E1E;
    font-size: 13px;
  }
`;

const ToogleImage = styled.span`
  margin-left: 5px;
`;

const BUttonImage = styled(SearchImg)``;

