import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './pages/Landing';
import { Drink } from './pages/Drink';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="drink" element={<Drink/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
