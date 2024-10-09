import { useState } from "react";
import Properties from "./components/Properties/Properties";
import Header from "./components/Header/Header";
import Steps from "./components/Steps/Steps";
import { Step } from "./objects/Step";
import Insert from "./components/Insert/Insert";
import Output from "./components/Output/Output";

const App = () => {
  // API
  const endpoint = "https://localhost:3000/api/"
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<string>("")

  // Payload
  const [name, setName] = useState<string>("")
  const [webdriver, setWebdriver] = useState<string>("chrome")
  const [headless, setHeadless] = useState<boolean>(false)
  const [steps, setSteps] = useState<Step[]>([])
  
  const disableGenerate: boolean = isLoading || !name || steps.length == 0
  
  async function call() {
    const payload = { "name": name, "webdriver": webdriver, "headless": headless, "steps": steps }
    const request = new Request(endpoint, { method: "POST", body: JSON.stringify(payload) });
    setIsLoading(true)
    try {
      const response = await fetch(request);
      const data = await response.json();
      setData(data)
    } catch (error) {
      alert(String(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="vertical-container">
      <Header />
      <Properties setName={setName} setWebdriver={setWebdriver} webdriver={webdriver} setHeadless={setHeadless} headless={headless} />
      <Steps steps={steps} update={setSteps} />
      <Insert steps={steps} update={setSteps} />
      <div className={disableGenerate ? "generate disabled" : "generate"} onClick={disableGenerate ? () => {} : () => call()}>
        <span>Generate</span>
      </div>
      <Output data={data} isLoading={isLoading} />
    </div>
  );
}

export default App;