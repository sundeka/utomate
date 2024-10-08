import { useState } from "react";
import { Riple } from "react-loading-indicators";
import Properties from "./components/Properties/Properties";
import Header from "./components/Header/Header";
import Steps from "./components/Steps/Steps";
import { Step } from "./objects/Step";
import Insert from "./components/Insert/Insert";

const App = () => {
  const [name, setName] = useState<string>("")
  const [webdriver, setWebdriver] = useState<string>("chrome")
  const [headless, setHeadless] = useState<boolean>(false)
  const [steps, setSteps] = useState<Step[]>([])

  const [data, setData] = useState<string>("")
  const loading = false

  const disableGenerate: boolean = loading || !name || steps.length == 0

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

  return (
    <div className="vertical-container">
      <Header />
      <Properties 
        setName={setName}
        setWebdriver={setWebdriver}
        webdriver={webdriver}
        setHeadless={setHeadless}
        headless={headless}
      />
      <Steps steps={steps} update={setSteps} />
      <Insert steps={steps} update={setSteps} />
      {/** API call */}
      <div 
        className={disableGenerate ? "generate disabled" : "generate"} 
        onClick={disableGenerate ? () => {} : () => call()}
      >
        <span>Generate</span>
      </div>
      {/** API output */}
      {renderOutput()}
    </div>
  );
}

export default App;