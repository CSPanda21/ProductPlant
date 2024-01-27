import './App.css';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import ProdPlantTable from './components/ProdPlantTable';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ProdPlantTable/>
      <Alert/>
    </div>
  );
}

export default App;
