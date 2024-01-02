/*
import {useEffect, useState} from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles"; // styles 기능 추가
const useStyles = makeStyles(theme => ({  // style 요소 선언
  margin: {
    margin: theme.spacing(1),
}
}));

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/test')
        .then((res) => {
          setHello(res.data);
        })
  }, []);
  const classes = useStyles();
  return (
      <div className="App">
        백엔드 데이터 : {hello}
        <div >
          <Button variant="contained" color="primary" className={classes.margin}>
            Primary
          </Button>
          <Button variant="contained" color="secondary" className={classes.margin}>
            Disabled
          </Button>
        </div>
      </div>
      
  );
}

export default App;
*/
import {Route, Routes} from "react-router-dom";
import BoardList from "./routes/BoardList";
import Home from "./routes/Home";
import React from "react";
import BoardDetail from "./routes/BoardDetail";
import BoardWrite from './routes/BoardWrite';
import BoardUpdate from "./routes/BoardUpdate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/board" element={<BoardList/>}/>
      <Route path="/board/:bid" element={<BoardDetail/>}/>
      <Route path="/write" element={<BoardWrite />} />
      <Route path="/update/:bid" element={<BoardUpdate />} />
    </Routes>
  );
}

export default App;