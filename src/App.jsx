import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*(){}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText((password))
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-12 py-6 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-center text-white">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4"></div>
      <input
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3 mb-4 bg-white rounded-md"
        placeholder="password"
        readOnly
        ref={passwordRef}
      />
      <button
      onClick={copyPasswordToClipboard} className="bg-blue-50 h-full p-0 px-2 mb-3">Copy</button>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex text-sm gap-x-2">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="">Numbers</label>
        </div>
        <div className="flex text-sm gap-x-2">
          <input
            type="checkbox"
            defaultChecked={character}
            id="characterInput"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label>Char</label>
        </div>
      </div>
    </div>
  );
}

export default App;
