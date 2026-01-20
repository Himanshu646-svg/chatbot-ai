import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { URL } from './constant'
import Answer from './components/Answer'



function App() {
  const [question, setquestion] = useState('')
  const [answer, setanswer] = useState('')

const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question + ". IMPORTANT: Only answer if the question is related to health or fitness. " +
            "If it is not, reply exactly with: 'I am sorry, I am not able to answer that question.'"
          }
        ]
      }
    ]
  }
  const askQuestion = async() => {
    let responce = await fetch(URL,{
      method: "POST",
      body: JSON.stringify(payload)
      })
      responce = await responce.json();

      let datastring = responce.candidates[0].content.parts[0].text
      datastring = datastring.split("* ");
      datastring = datastring.map((item) => item.trim())
      //console.log(datastring);
      setanswer(datastring);
  } 

  return (
    <>
    <div className='grid grid-cols-5'>
      <div className='col-span-1 bg-zinc-800 h-screen text-white justify-center flex py-1'>
<p className='justify-center'>Deletes searches</p>
      </div>
      <div className='col-span-4 text-zinc-300'>
        <div className='container h-110 overflow-y-auto p-4 mb-7 mt-3 min-h-[70vh]'> 
          
          <div className='text-white flex justify-center m-5'>
            <ul>
            {
             answer && answer.map((item, index) => (
             <li className='text-left p-1'> <Answer index={index} ans={item}/></li>
              ) )
            }
            </ul>
             </div>
          
        </div>
        <div className='flex bg-zinc-800 w-1/2 m-auto rounded-4xl h-16 border-zinc-400 border-1 align-center mb-2'>
          <input type="text" value={question} onChange={(e) => setquestion(e.target.value)} className='w-full h-full p-3 outline-none text-white ' placeholder='Ask me anything'/>
          <div className='flex '>
          <button onClick={askQuestion} className='bg-purple-800 mt-2.5 mx-4 text-white rounded-xl ml-2 p-2 h-10 hover:bg-purple-950 '>Ask</button>  
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
