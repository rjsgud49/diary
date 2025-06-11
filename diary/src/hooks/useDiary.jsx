import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";


const useDiary = (id) => { 
    const data = useContext(DiaryStateContext); 
    const [diary, setDiary] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        const matchDairy = data.find((it) => String(it.id) === String(id));
        if (matchDairy) {
            setDiary(matchDairy);
        } else {
            alert('일기가 존재하지않습니다')
            navigate('/', { replace: true }); // 홈으로 리다이렉트
        }
    }, [data, id, navigate]);

    return diary;
}

export default useDiary;