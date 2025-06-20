import emotion1 from './img/emotion1.png';
import emotion2 from './img/emotion2.png';
import emotion3 from './img/emotion3.png';
import emotion4 from './img/emotion4.png';
import emotion5 from './img/emotion5.png';

export const getEmotionImgById = (emotionId) => {
    const targetEmotionId = String(emotionId);
    switch (targetEmotionId) {
        case '1':
            return emotion1;
        case '2':
            return emotion2;
        case '3':
            return emotion3;
        case '4':
            return emotion4;
        case '5':
            return emotion5;
        default:
            return null;
    }
}

export const getFormattedDate = (targetdate) => {
    let year = targetdate.getFullYear();
    let month = String(targetdate.getMonth() + 1);
    let date = String(targetdate.getDate());

    if (month.length < 2) month = '0' + month;
    if (date.length < 2) date = '0' + date;

    return `${year}-${month}-${date}`;
};

export const emotionList = [
    {
        id: 1,
        name: '완전기쁨',
        img: getEmotionImgById(1),
    },
    {
        id: 2,
        name: '기쁨',
        img: getEmotionImgById(2),
    },
    {
        id: 3,
        name: '그럭저럭',
        img: getEmotionImgById(3),
    },
    {
        id: 4,
        name: '나쁨',
        img: getEmotionImgById(4),
    },
    {
        id: 5,
        name: '완전나쁨',
        img: getEmotionImgById(5),
    },
]

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endTimeStamp = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()
    return {beginTimeStamp, endTimeStamp}
}
