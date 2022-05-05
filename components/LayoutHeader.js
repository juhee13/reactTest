import styled from "styled-components";
import HeaderImg from "../public/images/header_image.svg";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_USER_REQUEST, LOGIN_USER_REQUEST} from "../reducers/user";
import { Oval } from "react-loader-spinner";
import ModalImg from "../public/images/modal_header.svg";
import Times from "../public/images/times.svg";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from 'redux-saga';

const Modal = ({ title, width, height }) => (
    <Container>
        <ModalWrapper wsize={width} hsize={height}>
            <ModalTitle>
                <ModalImg />
                <TitleText>{title}</TitleText>
                <Times />
            </ModalTitle>
            <Line />
            <IdInput onChange={idvalue} />
            <PasswordInput />
        </ModalWrapper>
    </Container>
);

const LayoutHeader = () => {
    const [id, setId] = useState('zena');
    const [password, setPassword] = useState('asdf1234');
    const [value, setValue] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { isLoading, isLogIn, user } = useSelector((state) => state.user);

    useEffect(() => {
        console.log('user', user);
        if (!user?.seq) {
            const seq = localStorage.getItem('user_seq');
            dispatch({
                type: LOAD_USER_REQUEST,
                data : {seq}
            })


        } else {
            if (isLogIn) {
                localStorage.setItem('user_seq', user?.seq);
                localStorage.setItem('token', user?.accessToken);
            }

        }
    }, [isLogIn]);

    const userLogIn = () => {
        dispatch({
            type: LOGIN_USER_REQUEST,
            data: { id, password }
        });
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const idValue = (e) => {
        setId(e.target.value);
    }

    const passwordValue = (e) => {
        setPassword(e.target.value);
    }



    return(
        <>
        {isLoading && <Spinner color="#00BFFF" height={80} width={80} />}
          <Container>
            <ImageContainer>
              <HeaderImage />
            </ImageContainer>
            <MenuContainer>
                <UserButton onClick={() => openModal()}>{isLogIn ? '로그아웃' : '로그인'}</UserButton>
                <UserButton>회원가입</UserButton>
            </MenuContainer>
          </Container>
            {modalOpen && <Container>
                <ModalWrapper >
                    <ModalTitle>
                        <ModalImg />
                        <TitleText>{}</TitleText>
                        <Times />
                    </ModalTitle>
                    <Line />
                    <IdInput onChange={idValue} />
                    <PasswordInput onChange={passwordValue} />
                    <LoginButton onClick={userLogIn}>로그인</LoginButton>
                </ModalWrapper>
            </Container>}
        </>
    )
};

/*export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});*/

export default LayoutHeader;



const Container = styled.div``;

const ImageContainer = styled.div`
  background: transparent linear-gradient(97deg, #f8e1e8 0%, #fbf3dd 100%);
  width: 100vw;
  height: 15%;
  display: flex;
  justify-content: center;
`;

const MenuContainer = styled.div`
  background: #393535;
  width: 100vw;
  height: 10%;
  display: flex;
`;

const HeaderImage = styled(HeaderImg)`
  width: 80%;
`;

const UserButton = styled.div`
  background: #393535;
  border: 1px solid #828282;
  color: #ffffff;
  font-size: 12px;
  width: 84px;
  height: 27px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  
`;

const Spinner = styled(Oval)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ModalWrapper = styled.div`
  width: ${(props) => (props.wsize ? props.wsize : 638)}px;
  height: ${(props) => (props.hsize ? props.hsize : 438)}px;
  z-index: 2;
  background: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const TitleText = styled.div``;

const Line = styled.div`
  background: #1e1e1e;
  width: 90%;
  height: 1px;
`;

const IdInput = styled.input``;

const PasswordInput = styled.input``;

const LoginButton = styled.div``;
