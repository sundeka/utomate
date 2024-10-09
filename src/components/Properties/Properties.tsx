type PropertiesProps = {
  disableFields: boolean
  name: string
  setName: (value: React.SetStateAction<string>) => void
  setWebdriver: (value: React.SetStateAction<string>) => void
  webdriver: string
  setHeadless: (value: React.SetStateAction<boolean>) => void
  headless: boolean
}

const Properties = ({ 
  disableFields,
  name,
  setName,
  setWebdriver,
  webdriver,
  setHeadless,
  headless
}: PropertiesProps) => {
  return (
    <div className="automation-properties" data-testid="automation-properties">
      <div id="row" data-testid="row">
        <label>Filename*</label>
        <input 
          id="filename-input" 
          disabled={disableFields}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
      </div>
      <div id="row" data-testid="row">
        <label>WebDriver</label>
        <select 
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setWebdriver(event.target.value)}
          disabled={disableFields}
          value={webdriver}
          defaultValue={webdriver}
          data-testid="webdriver-selection"
        >
          <option value="chrome">Chrome</option>
          <option value="firefox">Firefox</option>
        </select>
      </div>
      <div id="row" data-testid="row">
        <label>Run headless?</label>
        <input 
          type="checkbox" 
          checked={headless}
          disabled={disableFields}
          value="headless"
          onClick={() => setHeadless(!headless)}
        />
      </div>
    </div>
  )
}

export default Properties