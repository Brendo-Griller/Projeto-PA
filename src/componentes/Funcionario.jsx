import './Funcionario.css';

function Funcionario({ nome, cargo }) {
  return (
    <div className="funcionario-card">
      <div className="funcionario-avatar">👨🏻‍💼</div>
      <div className="funcionario-info">
        <h3 className="funcionario-nome">Nome: {nome}</h3>
        <p className="funcionario-cargo">Cargo: {cargo}</p>
      </div>
    </div>
  );
}

export default Funcionario;