import React from 'react';
// import './Carrinho.css'; // Você pode criar este arquivo depois para estilizar

function Carrinho({ produtos, onVoltar, onAvancar }) {
  // 1. Filtra a lista para pegar apenas o que o cliente selecionou
  const itensSelecionados = produtos.filter(prod => prod.count > 0);

  // 2. Calcula o valor total do carrinho dinamicamente
  const calcularTotal = () => {
    return itensSelecionados.reduce((total, prod) => {
      // Transforma a string "R$ 15,90" em um número decimal 15.90 para o cálculo
      const valorNumerico = parseFloat(prod.valor.replace('R$ ', '').replace(',', '.'));
      return total + (valorNumerico * prod.count);
    }, 0);
  };

  const totalPedido = calcularTotal();

  return (
    <div className="carrinho-container">
      <h2>Revisão do Pedido</h2>

      {/* Verifica se o carrinho está vazio */}
      {itensSelecionados.length === 0 ? (
        <p className="carrinho-vazio">Seu carrinho está vazio. Adicione alguns lanches!</p>
      ) : (
        <div className="lista-itens">
          {itensSelecionados.map(prod => (
            <div key={prod.id} className="item-carrinho" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>{prod.count}x</strong> {prod.nome}</span>
              <span>{prod.valor}</span>
            </div>
          ))}
          
          <hr />
          
          <div className="total-carrinho" style={{ textAlign: 'right', marginTop: '15px' }}>
            <h3>Total: R$ {totalPedido.toFixed(2).replace('.', ',')}</h3>
          </div>
        </div>
      )}

      <div className="botoes-acao" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn-voltar" onClick={onVoltar}>
          Voltar ao Cardápio
        </button>
        
        {/* O botão de avançar só fica habilitado se houver itens no carrinho */}
        <button 
          className="btn-avancar" 
          onClick={onAvancar}
          disabled={itensSelecionados.length === 0}
        >
          Ir para Pagamento
        </button>
      </div>
    </div>
  );
}

export default Carrinho;