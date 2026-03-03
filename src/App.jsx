import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Clientes } from './Pages/Clientes';
import { Produtos } from './Pages/Produtos/';
import { Vendas } from './Pages/Vendas';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <nav className="bg-green-800 p-4 text-white flex gap-4">
        <Link to="/" className="hover:underline">Clientes</Link>
        <Link to="/produtos" className="hover:underline">Produtos/Estoque</Link>
        <Link to="/vendas" className="hover:text-green-200 transition-colors">Vendas/Financeiro</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </BrowserRouter>
  );
}