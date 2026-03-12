import "./FinancePanel.css";
import { getBills, createBill, deleteBill } from "../../service/billService";
import { useEffect, useState } from "react";

function FinancePanel(){

  const [contas, setContas] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [salario, setSalario] = useState("");

  // carregar contas ao iniciar
  useEffect(() => {
    carregarContas();
  }, []);

  async function carregarContas(){
    try{
      const data = await getBills();
      setContas(data);
    }catch(error){
      console.error("Erro ao carregar contas:", error);
    }
  }

  async function adicionarConta(){

    if(!nome || !valor) return;

    try{

      const novaConta = {
        name: nome,
        value: Number(valor)
      };

      const contaCriada = await createBill(novaConta);

      setContas([...contas, contaCriada]);

      setNome("");
      setValor("");

    }catch(error){
      console.error("Erro ao adicionar conta:", error);
    }

  }

  async function deletarConta(id){

    try{

      await deleteBill(id);

      const novasContas = contas.filter(
        (conta) => conta.id !== id
      );

      setContas(novasContas);

    }catch(error){
      console.error("Erro ao deletar conta:", error);
    }

  }

  const totalContas = contas.reduce(
    (soma, conta) => soma + conta.value,
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

              <span>{conta.name}</span>

              <span>R$ {conta.value}</span>

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