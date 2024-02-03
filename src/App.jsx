import './App.css'
import Navbar from './Navbar'
import PageContent from './PageContent'

import { createContext, useState } from 'react'

function App() {
  const [theme, setTheme] = useState('light');
  // useEffect(() => {
  //   console.log(theme);
  // }, [theme]);
  return (
    <div className={`App ${theme}`}>
      <WordAmountContext.Provider value={7}>
        <Navbar theme={theme} setTheme={setTheme} />
        <PageContent />
      </WordAmountContext.Provider>
    </div>
  )
}

export default App
export const WordAmountContext = createContext(null);