import { useState } from "react";
import { Riple } from "react-loading-indicators";

const App = () => {
  const [name, setName] = useState<string>("")
  const [webdriver, setWebdriver] = useState<string>("chrome")
  const [headless, setHeadless] = useState<boolean>(false)
  const [steps, setSteps] = useState<[]>([])
  
  const [isInserting, setIsInserting] = useState<boolean>(false)


  const [data, setData] = useState<string>("")
  const loading = false
  async function call() {
    if (!loading) {
      const payload = {
        "name": name,
        "webdriver": webdriver,
        "headless": headless,
        "steps": steps
      }
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        await response.json();
        setData("Your file is ready for download!")
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  }

  const renderOutput = () => {
    // TODO: turn into component
    if (data) {
      return (
        <div className="output" id="data">
          <p style={{color: "white"}}>{data}</p>
        </div>
      )
    } else if (loading) {
      return (
        <div className="output" id="loading">
          <Riple color="#3f3f3f" size="large" />
        </div>
      )
    }
  }

  const handleActionSelection = () => {
    //
    setIsInserting(false)
  }
  
  const renderInsertion = () => {
    if (isInserting) {
      return (
        <div className="action" id="select">
          <div className="action--select__header">
            <h2>Select an action</h2>
            <i className="fa-solid fa-xmark" id="close" onClick={() => setIsInserting(false)}></i>
          </div>
          <div className="action--select__options">
            <div 
              className="options__item" 
              onClick={() => handleActionSelection()}
              id="find"
            >
              <p>Find an element</p>
            </div>
            <div 
              className="options__item" 
              onClick={() => handleActionSelection()}
              id="click"
            >
              <p>Click an element</p>
            </div>
            <div 
              className="options__item" 
              onClick={() => handleActionSelection()}
              id="open"
            >
              <p>Open a website</p>
            </div>
            <div 
              className="options__item" 
              onClick={() => handleActionSelection()}
              id="loop"
            >
              <p>Loop</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="action" id="new" onClick={() => setIsInserting(true)}>
          <i className="fa-solid fa-plus"></i>
        </div>
      )
    }
  }

  return (
    <div className="vertical-container">
      <h1>u-Tomate</h1>
      <a href="./faq">FAQ</a>


      {/** Properties */}


      <div className="automation-properties">
        <div id="row">
          <label>Filename</label>
          <input id="filename-input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
        </div>
        <div id="row">
          <label>WebDriver</label>
          <select 
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setWebdriver(event.target.value)}
            defaultValue={webdriver}
          >
            <option value="chrome">Chrome</option>
            <option value="firefox">Firefox</option>
          </select>
        </div>
        <div id="row">
          <label>Run headless?</label>
          <input type="checkbox" value="headless" onClick={() => setHeadless(!headless)}></input>
        </div>
      </div>


      {/** Feed */}

      {/** feed.map(()) */}
      {renderInsertion()}


      {/** API call */}


      <div 
        className="action" 
        id={loading ? "generate-loading" : "generate"}
        onClick={() => call()}
      >
        <span>Generate code</span>
      </div>


      {/** API output */}


      {renderOutput()}


    </div>
  );
}

export default App;