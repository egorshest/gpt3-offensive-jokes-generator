import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
    });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
  }

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Here's the hotfix</h1>
          </div>
          <div className="header-subtitle">
            <h2>This is the place where you can get a hotfix for your daily problems</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
              className="prompt-box"
              placeholder="What is your problem?"
              value={userInput}
              onChange={onUserChangedText}
          />;
          <div className="prompt-buttons">
      <a className="generate-button" onClick={callGenerateEndpoint}>
        <div className="generate">
        {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
        </div>
      </a>
    </div>
    {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>This is your hotfix</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
