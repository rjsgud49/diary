import React from 'react';
import './DiaryItem.css';
import { getEmotionImgById } from '../Utils';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const emotionId = Number(emotion);
  const emotionImg = getEmotionImgById(emotionId);

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={["img_section", `img_section_${emotionId}`].join(' ')}
      >
        {emotionImg ? (
          <img src={emotionImg} alt={`emotion${emotionId}`} />
        ) : (
          <div className="img_placeholder">❓</div>
        )}
      </div>
      <div onClick={goDetail} className="info_section">
        <div className="date_wrapper">{new Date(date).toLocaleDateString()}</div>
        <div className="content_wrapper">{content.slice(0, 25)}</div>
      </div>
      <div className="button_section">
        <Button onClick={goEdit} text="수정하기" />
      </div>
    </div>
  );
};

export default  React.memo(DiaryItem);
