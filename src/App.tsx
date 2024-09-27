import { useState } from "react";

const App = () => {
  const [name, setName] = useState<string>("")
  const [webdriver, setWebdriver] = useState<string>("chrome")
  const [headless, setHeadless] = useState<boolean>(false)
  const [steps, setSteps] = useState<[]>([])
  


  const [data, setData] = useState<string>("")
  async function call() {
    const payload = {
      "name": name,
      "webdriver": webdriver,
      "headless": headless,
      "steps": steps
    }
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      setData(data.title)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }



  return (
    <div className="vertical-container">
      <h1>u-Tomate</h1>
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
          </select>
        </div>
        <div id="row">
          <label>Run headless?</label>
          <input type="checkbox" value="headless" onClick={() => setHeadless(!headless)}></input>
        </div>
      </div>
      <div className="action" id="new">
        <i className="fa-solid fa-plus"></i>
      </div>
      <div className="action" id="generate" onClick={() => call()}>
        <span>Generate code</span>
      </div>
      <p style={{color: "white"}}>{data}</p>
    </div>
  );
}

export default App;