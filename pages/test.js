import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicBoard from "../components/BasicBoard";

const test = () => {
  const [new_nickname, setNickname] = useState();
  const { nickname } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeNick = useCallback(() => {
    dispatch({
      type: "CHANGE_NICKNAME",
      data: new_nickname,
    });
  }, [new_nickname]);

  const changeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setNickname(value);
    },
    [new_nickname]
  );

  return (
    <>
      <BasicBoard />
    </>
  );
};

export default test;
