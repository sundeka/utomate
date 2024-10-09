import { useState } from "react";
import Properties from "./components/Properties/Properties";
import Header from "./components/Header/Header";
import Steps from "./components/Steps/Steps";
import { Step } from "./objects/Step";
import Insert from "./components/Insert/Insert";
import Output from "./components/Output/Output";

const App = () => {
  // API
  const endpoint = "http://localhost:8080"// http vs. https
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [downloadUri, setDownloadUri] = useState<string | undefined>(undefined)

  // Payload
  const [name, setName] = useState<string>("")
  const [webdriver, setWebdriver] = useState<string>("chrome")
  const [headless, setHeadless] = useState<boolean>(false)
  const [steps, setSteps] = useState<Step[]>([])
  

  const disableModification: boolean = !!downloadUri || isLoading
  const disableGenerate: boolean = disableModification || !name || steps.length === 0
  
  async function generateFileDownloadUri() {
    const payload = { "name": name, "webdriver": webdriver, "headless": headless, "steps": steps }
    const request = new Request(endpoint + "/api/generate", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload) });
    setIsLoading(true)
    try {
      const response = await fetch(request)
      const uri = await response.text()
      setDownloadUri(uri)
    } catch (error) {
      alert(String(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="vertical-container">
      <Header />
      <Properties 
        disableFields={disableModification}
        name={name}
        setName={setName} 
        setWebdriver={setWebdriver} 
        webdriver={webdriver} 
        setHeadless={setHeadless} 
        headless={headless} 
      />
      <Steps disableEdit={disableModification} steps={steps} update={setSteps} />
      <Insert disableInsertion={disableModification} steps={steps} update={setSteps} />
      <div className="buttons">
        <div className={disableGenerate ? "generate disabled" : "generate"} onClick={disableGenerate ? () => {} : () => generateFileDownloadUri()}>
          <span>Generate</span>
        </div>
      </div>
      <Output 
        api={endpoint}
        uri={downloadUri} 
        setUri={setDownloadUri} 
        fileName={name}
        isLoading={isLoading} 
      />
    </div>
  );
}

export default App;