import React, { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Header from '../component/Header';
import Editor from '../component/Editor';

const New = () => {
  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const handleCreate = ({ date, content, emotion }) => {
    const parsedDate = new Date(date); 
    onCreate(parsedDate.getTime(), content, emotion); 
    navigate('/', { replace: true });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header title="새 일기쓰기" leftChild={<Button text="뒤로가기" onClick={goBack} />} />
      <Editor onSubmit={handleCreate} />
    </div>
  );
};

export default New;
