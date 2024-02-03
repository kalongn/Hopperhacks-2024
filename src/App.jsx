import './App.css'
import Box from './Box'

function App() {
  
  let amountOfBox = 7;
  function renderBoxes() {
    let boxes = [];
    for (let i = 0; i < amountOfBox; i++) {
      boxes.push(<Box index={i} />);
    }
    return boxes;
  }

  return (
    <div className="App" id="App">
      {renderBoxes()}
    </div>
  )
}




export default App