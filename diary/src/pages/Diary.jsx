import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import { getFormattedDate } from '../Utils';
import Button from '../component/Button';
import Header from '../component/Header';
import Viewer from '../component/Viewer';

const Diary = () => {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const goEdit = () => navigate(`/edit/${id}`);

    if (!data) return <div>일기를 불러오고 있습니다.</div>;

    const { date, emotion = 3, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

    return (
        <div>
            <Header
                title={title}
                leftChild={<Button text="뒤로가기" onClick={goBack} />}
                rightChild={<Button text="수정하기" onClick={goEdit} />}
            />
            <Viewer emotionId={Number(emotion)} content={content} /> {/* 👈 여기 핵심 */}
        </div>
    );
};

export default Diary;
