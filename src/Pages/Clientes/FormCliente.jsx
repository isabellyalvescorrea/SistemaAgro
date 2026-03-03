
import { useState } from 'react';
import { api } from '../../Services/api';
import { toast } from 'sonner';

export function FormCliente({ onClienteCadastrado }) {
  const [novoCliente, setNovoCliente] = useState({
    nomeFazenda: '',
    proprietario: '',
    cpf: '',
    numero: '',
    email: ''
  });

  function validarGmail(email) {
    return email.endsWith('@gmail.com');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!novoCliente.cpf.replace(/\D/g, '').length === 11) {
      toast.error("CPF deve conter 11 números.");
      return;
    }

    if (!validarGmail(novoCliente.email)) {
      toast.error("Digite um email válido do Gmail (@gmail.com)");
      return;
    }

    try {
      await api.post('/clientes', novoCliente);
      toast.success("Cliente cadastrado com sucesso!");

      setNovoCliente({
        nomeFazenda: '',
        proprietario: '',
        cpf: '',
        numero: '',
        email: ''
      });

      if (onClienteCadastrado) {
        onClienteCadastrado();
      }

    } catch (error) {
      toast.error("Erro ao cadastrar cliente.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-100"
    >
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          Nome da Fazenda
        </label>
        <input
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          value={novoCliente.nomeFazenda}
          onChange={e =>
            setNovoCliente({ ...novoCliente, nomeFazenda: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          Proprietário
        </label>
        <input
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          value={novoCliente.proprietario}
          onChange={e =>
            setNovoCliente({ ...novoCliente, proprietario: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          CPF do Proprietário
        </label>
        <input
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          placeholder="000.000.000-00"
          value={novoCliente.cpf}
          onChange={e =>
            setNovoCliente({ ...novoCliente, cpf: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          WhatsApp
        </label>
        <input
          required
          type="text"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          value={novoCliente.numero}
          onChange={e =>
            setNovoCliente({ ...novoCliente, numero: e.target.value })
          }
        />
      </div>

      <div className="md:col-span-4">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
          Email (Gmail)
        </label>
        <input
          required
          type="email"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          value={novoCliente.email}
          onChange={e =>
            setNovoCliente({ ...novoCliente, email: e.target.value })
          }
        />
      </div>

      <button className="bg-green-700 text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-all shadow-lg md:col-span-4">
        + Cadastrar Cliente
      </button>
    </form>
  );
}