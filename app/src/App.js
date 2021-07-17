import logo from './logo.svg';
import './App.css';
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
  
        <LoginPage />
        {/* <TodoPage /> */}
      </header>
    </div>
  );
}

export default App;
