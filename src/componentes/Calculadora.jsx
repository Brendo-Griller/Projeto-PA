import './Calculadora.css';

function Calculadora({ qtdXBurguer, qtdSalada, qtdRefri }) {
  
  const precoXBurguer = 15.90;
  const precoXSalada = 17.90;
  const precoRefri = 6.00; 

  // O cálculo é feito automaticamente sempre que uma quantidade mudar no App
  const total = (qtdXBurguer * precoXBurguer) + (qtdSalada * precoXSalada) + (qtdRefri * precoRefri);

  return (
    <div className="calculadora-container">
      <h2 className="calculadora-titulo">Total do Pedido:</h2>
      <p className="calculadora-valor">
        R$ {total.toFixed(2).replace('.', ',')}
      </p>
    </div>
  );
}

export default Calculadora;