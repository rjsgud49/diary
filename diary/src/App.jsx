import React, {
  useReducer,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// Context 생성
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// 리듀서         
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE': {
      const createdState = [action.data, ...state];
      localStorage.setItem('diary', JSON.stringify(createdState));
      return createdState;
    }

    case 'UPDATE': {
      const updatedState = state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
      localStorage.setItem('diary', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'DELETE': {
      const filteredState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem('diary', JSON.stringify(filteredState));
      return filteredState;
    }

    case 'INIT':
      return action.data;

    default:
      return state;
  }
}


// 더미 데이터
// const mockData = [
//   {
//     id: 0,
//     date: new Date().getTime() - 1,
//     content: '오늘은 정말 기분이 좋았다.',
//     emotion: 1,
//   },
//   {
//     id: 1,
//     date: new Date().getTime() - 2,
//     content: '오늘은 정말 기분이 나빴다.',
//     emotion: 2,
//   },
//   {
//     id: 2,
//     date: new Date().getTime() - 3,
//     content: '오늘은 정말 기분이 나빴다.',
//     emotion: 3,
//   },
// ];

// App
const App = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    // dispatch({ type: 'INIT', data: mockData });
    // setIsDataLoaded(true);
    const rawData = localStorage.getItem('diary');
    const localData = JSON.parse(rawData);

    if  (!localData) {
      setIsDataLoaded(true);
      return
    }

    localData.sort((a, b) => Number(b.id) - Number(a.id)); 
    idRef.current = localData[0].id + 1;
    
    dispatch({ type: 'INIT', data: localData });
    setIsDataLoaded(true)
  }, []);

  const onCreate = useCallback((date, content, emotionId) => {
    const parsedDate = new Date(date); // ← 문자열이면 여기서 Date 객체로 변환
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: parsedDate.getTime(), // ← 이게 안전해짐
        content,
        emotion: emotionId,
      },
    });
    idRef.current += 1;
  }, []);

  const onUpdate = useCallback((id, date, content, emotionId) => {
    const parsedDate = new Date(date);
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        date: parsedDate.getTime(),
        content,
        emotion: emotionId,
      },
    });
  }, []);


  const onDelete = useCallback((targetId) => {
    dispatch({ type: 'DELETE', targetId });
  }, []);

  if (!isDataLoaded) {
    return <div className="App">데이터를 주워오고 있는 중 입니다...</div>;
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <Router>
            <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
          </div>
        </Router>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
