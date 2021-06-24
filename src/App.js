import './App.css';
import { useEffect, useState , useRef } from 'react';
import axios from 'axios'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Position from './components/Position';


function App() {
  const [images,setImages] = useState([]);
  const [leftArrow,setLeftArrow]= useState(false);
  const [rightArrow,setRightArrow]= useState(true);
  const imageContainer = useRef(null);
  const image = useRef(null);
  const [counter,setCounter] = useState(0);
  const [referenceCounter,setReferenceCounter] = useState(0);


  useEffect(() => {
    fetchData();
  },[])

  useEffect(()=>{
    if(imageContainer.current && image.current){
    setReferenceCounter((images.length)/(imageContainer.current.clientWidth /(image.current.clientWidth)) -1)}
  },[images.length,imageContainer,image]);

  useEffect(()=> {
    const handleScrollHelper = () => {
      console.log(counter);
      if(counter === 0){
        setLeftArrow(false);
        setRightArrow(true);
      }
      if(counter > 0 ){
        setLeftArrow(true);
        setRightArrow(true);
      }
      if(counter === referenceCounter){
        setRightArrow(false)
      }
    }
    handleScrollHelper();
  },[counter,referenceCounter]);

  const handleScrollRight = () => {
    setCounter(c => c+1);
    imageContainer.current.scrollLeft += imageContainer.current.clientWidth;
  }

  const handleScrollLeft = () => {
    setCounter(c => c-1);
    imageContainer.current.scrollLeft -= imageContainer.current.clientWidth;
  }





  async function fetchData(){
    const {data} = await axios.get("https://api.giphy.com/v1/gifs/trending?api_key=VtDaVwTWS6GizwV9IKy9roXoGlLgh0tm&limit=20");
    setImages(data.data);
  }

  const imagesDisplay = images.map((item) => <img className="images" alt = {item.title} key ={item.id} src ={item.images.original.url} ref={image}/>)

  return (
    <div className="App">
    <div className = "container">
        {leftArrow && <ArrowBackIosIcon className = "backward-arrow" onClick = {handleScrollLeft}/>}
        <div className = "carousel-container" ref = {imageContainer}>{imagesDisplay}</div>
        {rightArrow && <ArrowForwardIosIcon className="forward-arrow" onClick = {handleScrollRight}/>}
        <Position number = {referenceCounter + 1} selectedNumber={counter}/>
    </div>
    </div>
  );
}

export default App;
