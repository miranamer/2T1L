import { useState } from 'react'
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import {Audio, BallTriangle, InfinitySpin, Dna, Triangle} from 'react-loader-spinner';
import Card from './components/Card.jsx';
import toast, { Toaster } from 'react-hot-toast';
import {BsGithub} from 'react-icons/bs'
import {FiHelpCircle} from 'react-icons/fi'

function App() {

  const { promiseInProgress } = usePromiseTracker();
  const [inputLength, setInputLength] = useState(213);
  const [promptLie, setPromptLie] = useState("");
  const [promptTruth, setPromptTruth] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setPrompt(e.target.value)

    if(prompt.length > 19){
      setInputLength(inputLength + 10);
    }
  }

  const LoadingIndicator = props => {

    var theRandomNumber = Math.floor(Math.random() * 4) + 1;
    
      return (
        promiseInProgress &&
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {theRandomNumber === 1 ? <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          /> : theRandomNumber === 2 ? <InfinitySpin 
          width='200'
          color="#4fa94d"
        /> : theRandomNumber === 3 ? <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      /> : theRandomNumber === 4 ? <Triangle
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    /> : null}
        </div>
     );  
    }

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [response2, setResponse2] = useState("");
  const [response3, setResponse3] = useState("");

  const [finalArray, setFinalArray] = useState([]);

  const generateResponses = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/chat";

    let lie = `make a very realistic lie about ${prompt} that is hard to tell is a lie`
    let truth = `give me a fact about ${prompt}`

    const postOne = axios.post(url, {prompt: lie})
    const postTwo = axios.post(url, {prompt: truth})
    const postThree = axios.post(url, {prompt: truth})

    trackPromise(
    axios.all([postOne, postTwo, postThree])
    .then(
      axios.spread((...responses) => {
        setFinalArray(shuffle([{text: responses[0].data, id: 0, lie: true},{text: responses[1].data, id: 1, lie: false}, {text: responses[2].data, id: 2, lie: false}]))
      })
    ))
    
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const [choice, setChoice] = useState(100);
  const [right, setRight] = useState(100);

  const actors = ['The Rock', 'Tom Hardy', 'Chris Evans', 'Chris Pratt', 'Steve Harvey', 'Brad Pitt']; // Use An API After

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


  const handleAnswer = async () => {
    if(choice === 100){
      alert('Select An Option!')
    }
    else{
      for(var j = 0; j < finalArray.length; j++){
        if(finalArray[j].lie === true){
          setRight(finalArray[j].id);
        }
      }
      for(let i = 0; i < finalArray.length; i++){
        if(finalArray[i].id === choice){
          if(finalArray[i].lie === true){
            toast.success("Correct!")
            await sleep(2000);
            window.location.reload();
          }
          else{
            toast.error("Wrong :(")
            await sleep(2500);
            window.location.reload();
          }
        }
      }
    }
  }

  const handleRandomise =  (e) => {
    e.preventDefault()
    
    const url = "http://localhost:8080/chat";

    const prompt2 = actors[Math.floor(Math.random() * actors.length)]

    let lie = `make a very realistic lie about ${prompt2} that is hard to tell is a lie`
    let truth = `give me a fact about ${prompt2}`

    const postOne = axios.post(url, {prompt: lie})
    const postTwo = axios.post(url, {prompt: truth})
    const postThree = axios.post(url, {prompt: truth})

    trackPromise(
    axios.all([postOne, postTwo, postThree])
    .then(
      axios.spread((...responses) => {
        setFinalArray(shuffle([{text: responses[0].data, id: 0, lie: true},{text: responses[1].data, id: 1, lie: false}, {text: responses[2].data, id: 2, lie: false}]))
        console.log(prompt2)
        console.log(lie)
        console.log(truth)
      })
    ))
  }
  

  return (
    <>

        <div className=" bg-gray-900 text-white font-[poppins]">
          <Toaster/>
          <a href="https://github.com/miranamer"><BsGithub className=' hover:animate-pulse hover:scale-[150%] transition-all text-3xl fixed bottom-10 right-[110px] hover:text-purple-300 hover:cursor-pointer' /></a>
          <FiHelpCircle className=' transition-all hover:cursor-pointer hover:scale-150 hover:text-yellow-400 text-3xl fixed bottom-10 right-10' />
          <div className=" flex flex-col gap-4 items-center justify-center h-screen">
            <h1 className=' font-[fauna] text-3xl font-bold '><span className=' text-gray-400 font-thin'>ChatGPT</span> 2<span className=' text-green-300'>T</span>1<span className=' text-red-300'>L</span></h1>
            <div className=" flex gap-2">
              <input id='txt' className=' rounded-md font-semibold text-white bg-gray-700 border-gray-400 border-2 px-4 py-2 text-center' placeholder='Celeb:' type="text" onChange={handleInput} style={{width: inputLength}} />
              <button className=' transition-all hover:translate-y-[-5px] font-semibold hover:font-bold bg-green-100 border-2 border-green-200 px-4 py-2 rounded-md text-green-600 hover:border-green-400' onClick={generateResponses}>Search</button>
              <button className=' transition-all hover:translate-y-[-5px] font-semibold hover:font-bold bg-pink-100 border-2 border-pink-200 px-4 py-2 rounded-md text-pink-600 hover:border-pink-400' onClick={handleRandomise} >Randomise</button>
            </div>
            <LoadingIndicator />
            {finalArray.length !== 0 ? <div className=" flex flex-col w-auto h-auto gap-10 relative top-10">
              {finalArray.map((obj) => <Card right={right} txt={obj.text} setChoice={setChoice} choice={choice} id={obj.id} />)}
              {finalArray.length !== 0 ? (<button onClick={handleAnswer} className=' h-[60px] transition-all hover:translate-y-[-5px] hover:font-bold font-semibold bg-blue-100 border-2 border-blue-200 px-4 py-2 rounded-md text-blue-600 hover:border-blue-400'>Submit</button>) : null}
            </div> : null}
          </div>
        </div>

    </>
  );
}

export default App
