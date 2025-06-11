import React, { useState, useEffect, useCallback } from 'react';
import './Editor.css';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate, emotionList } from '../Utils';
import Button from './Button';
import EmotionItem from './EmotionItem';

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotion: 3,
        content: '',
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(Number(initData.date))), // 안정성 보완
            });
        }
    }, [initData]);

    const handleChangeDate = (e) => {
        setState((prev) => ({
            ...prev,
            date: e.target.value,
        }));
    };

    const handleChangeContent = (e) => {
        setState((prev) => ({
            ...prev,
            content: e.target.value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleChangeEmotion = useCallback((emotionId) => {
        setState((prev) => ({
            ...prev,
            emotion: emotionId,
        }));
    },[]);

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate} />
                </div>
            </div>

            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            id={it.id}
                            img={it.img}
                            name={it.name}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotion === it.id}
                        />
                    ))}
                </div>
            </div>

            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="오늘은 어땠나요?"
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>

            <div className="editor_section bottom_section">
                <Button text="취소하기" onClick={handleGoBack} />
                <Button text="작성완료" type="positive" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;
