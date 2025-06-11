import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Button from '../component/Button';
import Header from '../component/Header';
import { useContext } from 'react'; 
import { DiaryDispatchContext } from '../App';
import Editor from '../component/Editor';


const Edit = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const onClickDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까? 다시 복구할 수 없습니다.")) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (data) => {
    if (window.confirm("수정하시겠습니까?")) {
      const { date, emotion, content } = data;
      onUpdate(id, date, content, emotion);
      navigate("/", { replace: true });
    }
  }

  const goBack = () => {
    navigate(-1);
  };
  
  if (!data) return (<div>일기를 불러오는중</div>);
  else {
    return (
      <div>
        <Header title={"일기 수정하기"}
          leftChild={<Button text={"뒤로가기"} onClick={goBack} />}
          rightChild={<Button type={"navigate"} text={"삭제하기"} onClick={onClickDelete} />}
        />
        <Editor initData={data} onSubmit={onSubmit} />
    </div>
  );
}
};

export default Edit;