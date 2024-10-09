import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  // Logic for generating Random Password
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numbersAllowed) str += '0123456789'
    if(charAllowed) str += '@!~#$%&*_-+'

    for(let i = 1; i <= length; i++){
      let charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }, [length, numbersAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-lg bg-gray-100 mx-auto my-16 shadow-md rounded-lg py-8 px-8 select-none'>
      <h1 className='text-center text-purple-500 font-bold text-2xl '>Password Generator</h1>
      <div className='flex justify-center mt-12 mb-8 mx-auto'>
        
        <input 
        type="text" 
        value={password} 
        readOnly
        placeholder='Password'
        ref={passwordRef}
        className='outline-none w-full max-w-sm ring-2 rounded-lg text-lg'/>
        <button 
        className='rounded-xl mx-4 text-white bg-blue-600 px-4 py-2 transition ease-in-out font-bold
        hover:bg-white hover:text-blue-600 
        active:opacity-60'
        onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>
      <div className='flex text-md gap-x-2 font-bold text-purple-400'>
        <div className='flex gap-x-1 items-center'>
          <input 
          type="range" 
          min={6} 
          max={32} 
          value={length} 
          className='cursor-pointer' 
          onChange={(e) => {setLength(e.target.value)}}/>
          <label >Length: {length}</label>
        </div>
        <div className='flex gap-x-1 items-center'>
          <input type="checkbox" defaultChecked={numbersAllowed} id='numberInput' onChange={() => {
            setNumbersAllowed((prev) => !prev)
          }}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex gap-x-1 items-center'>
          <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => {
            setCharAllowed((prev) => !prev)
          }} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
