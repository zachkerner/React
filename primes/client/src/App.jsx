import { useState, useEffect } from 'react'
import axios from 'axios'
import { Heading, SubHeading } from './components/Headings.jsx'


const AnswerDisplay = ({ number }) => {
  return (
    <p>Median numbers: {`[${number.toString()}]`} </p>
  )
}

const Form = ({ onSubmit }) => { 
  const [num, setNum] = useState(0)
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(num)
  }
  return (
    <form onSubmit={handleSubmit}>
      your number: 
      <input
      value={num}
      onChange={(e) => setNum(e.target.value)}
      type="number"
      />
      <button type="submit">submit</button>
  </form>
  )
}

function App() {
  const [result, setResult] = useState([])
  const handleSubmit = async (num) => {
    const response = await axios.get(`http://localhost:3000/${num}`)
    setResult(response.data)
  }
  console.log(result)
  return (
    <>
    <Heading text={"welcome to the primes calculator!"} />
    <SubHeading text={"pick a prime from 2 to ten million and 2"} />
    <Form onSubmit={handleSubmit}/>
    <AnswerDisplay number={result}/>
    </>
  )
}

export default App
