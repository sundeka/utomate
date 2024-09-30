import { useState } from "react";
import { Riple } from "react-loading-indicators";

const App = () => {
  const [name, setName] = useState<string>("")
  const [webdriver, setWebdriver] = useState<string>("chrome")
  const [headless, setHeadless] = useState<boolean>(false)
  const [steps, setSteps] = useState<React.ReactNode[]>([])
  
  const [isInserting, setIsInserting] = useState<boolean>(false)

  // TODO: älä kasaa JSX elemejä vaan jsoneita, jokasta jsonia kohden renderaa tietty elem
  // TODO: vasta finishattu step feediin!!! state handling pitää reworkata siltä osin


  const [data, setData] = useState<string>("")
  const loading = true
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

  const handleActionSelection = (selection: string) => {
    let content: React.ReactNode
    let title: string = ""
    switch (selection) {
      case "find":
        title = "Find an element"
        content = (
          <>
            <div id="row">
              <label>Strategy</label>
              <select>
                <option value="xpath">XPath</option>
                <option value="css">CSS</option>
              </select>
            </div>
            <div id="row">
              <label>Until</label>
              <select>
                <option value="presence">Presence of element located</option>
                <option value="visibility">Visibility of element located</option>
              </select>
            </div>
            <div id="row">
              <label>Locator</label>
              <input></input>
            </div>
          </>
        )
        break
      case "click":
        break
      case "open":
        break
      case "loop":
        break
    }
    steps.push(
      <div className="steps__instance">
        <div className="instance__header">
          <h2>{title}</h2>
        </div>
        {content}
        <div className="instance__footer">
          <div className="footer__ok-button">
            <span>OK</span>
          </div>
        </div>
      </div>
    )
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
              onClick={() => handleActionSelection("find")}
              id="find"
            >
              <p>Find an element</p>
            </div>
            <div 
              className="options__item" 
              //onClick={() => handleActionSelection("click")}
              id="click"
            >
              <p>Click an element</p>
            </div>
            <div 
              className="options__item" 
              //onClick={() => handleActionSelection("open")}
              id="open"
            >
              <p>Open a website</p>
            </div>
            <div 
              className="options__item" 
              //onClick={() => handleActionSelection("loop")}
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

  const renderSteps = () => {
    if (steps.length > 0) {
      return (
        <div className="steps">
          {steps.map((step: React.ReactNode) => { return step })}
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

      {renderSteps()}
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