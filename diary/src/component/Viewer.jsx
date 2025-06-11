import "./Viewer.css";
import { getEmotionImgById } from "../utils";
import { emotionList } from "../utils";

const Viewer = ({ emotionId, content }) => {
  const emotionItem = emotionList.find(
    (item) => item.id === Number(emotionId)
  );


  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div
          className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}
        >
          <img src={getEmotionImgById(emotionId)} />
          <div>{emotionItem.name}</div>    
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
