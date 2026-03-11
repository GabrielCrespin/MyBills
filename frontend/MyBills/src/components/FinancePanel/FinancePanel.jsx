import { useState } from "react";
import "./FinancePanel.css";

function FinancePanel(){

  const [contas, setContas] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [salario, setSalario] = useState("");

  function adicionarConta(){

    if(!nome || !valor) return;

    const novaConta = {
      id: Date.now(),
      nome: nome,
      valor: Number(valor)
    };

    setContas([...contas, novaConta]);

    setNome("");
    setValor("");

  }

  function deletarConta(id){

    const novasContas = contas.filter(
      (conta) => conta.id !== id
    );

    setContas(novasContas);

  }

  const totalContas = contas.reduce(
    (soma, conta) => soma + conta.valor,
    0
  );

  const restante = salario - totalContas;

  const guardar = restante > 0 ? restante * 0.30 : 0;

  const livre = restante - guardar;

  return(

    <div className="finance-container">

      <div className="finance-card">

        <h2>Controle Financeiro</h2>

        {/* SALARIO */}

        <div className="salario-input">

          <label>Salário do mês</label>

          <input
            type="number"
            placeholder="Digite seu salário"
            value={salario}
            onChange={(e)=>setSalario(Number(e.target.value))}
          />

        </div>


        {/* ADICIONAR CONTA */}

        <div className="add-conta">

          <input
            type="text"
            placeholder="Nome da conta"
            value={nome}
            onChange={(e)=>setNome(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e)=>setValor(e.target.value)}
          />

          <button onClick={adicionarConta}>
            Adicionar
          </button>

        </div>


        {/* TABELA */}

        <div className="tabela-contas">

          <div className="tabela-header">
            <span>Conta</span>
            <span>Valor</span>
            <span>Ações</span>
          </div>

          {contas.map((conta)=>(

            <div key={conta.id} className="tabela-row">

              <span>{conta.nome}</span>

              <span>R$ {conta.valor}</span>

              <button
                className="delete-btn"
                onClick={()=>deletarConta(conta.id)}
              >
                Excluir
              </button>

            </div>

          ))}

        </div>


        {/* RESUMO */}

        <div className="finance-resumo">

          <p>Total das contas: <strong>R$ {totalContas}</strong></p>

          <p>Dinheiro restante: <strong>R$ {restante}</strong></p>

          <p>Guardar (30%): <strong>R$ {guardar.toFixed(2)}</strong></p>

          <p>Dinheiro livre: <strong>R$ {livre.toFixed(2)}</strong></p>

        </div>

      </div>

    </div>

  );

}

export default FinancePanel;