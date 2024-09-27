const App = () => {
  return (
    <div className="vertical-container">
      <h1>u-tomate</h1>
      <div className="automation-properties">
        <div id="row">
          <label>WebDriver</label>
          <select>
            <option>Chrome</option>
          </select>
        </div>
        <div id="row">
          <label>Run headless?</label>
          <input type="checkbox" value="headless"></input>
        </div>
      </div>
      <div className="action" id="new">
        <span>+</span>
      </div>
      <div className="action" id="generate">
        <span>Generate code</span>
      </div>
    </div>
  );
}

export default App;