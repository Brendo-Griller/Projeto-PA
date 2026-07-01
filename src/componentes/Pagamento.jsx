import { useState } from 'react';

function Pagamento({ produtos, onVoltar, onFinalizar }) {
  // Estado para guardar qual método de pagamento foi escolhido
  const [metodo, setMetodo] = useState('');

  // Calcula o total (igual fizemos no carrinho)
  const total = produtos
    .filter(prod => prod.count > 0)
    .reduce((acc, prod) => {
      const valorNumerico = parseFloat(prod.valor.replace('R$ ', '').replace(',', '.'));
      return acc + (valorNumerico * prod.count);
    }, 0);

  const handleConfirmar = () => {
    if (!metodo) {
      alert("Por favor, selecione uma forma de pagamento para continuar!");
      return;
    }
    
    // Simula o processamento
    alert(`Pagamento de R$ ${total.toFixed(2).replace('.', ',')} via ${metodo} aprovado! Seu pedido já está na cozinha.`);
    
    // Chama a função que limpa o carrinho e volta pro início
    onFinalizar(); 
  };

  return (
    <div className="pagamento-container">
      <h2>Forma de Pagamento</h2>
      <h3 style={{ marginBottom: '20px' }}>
        Total a pagar: R$ {total.toFixed(2).replace('.', ',')}
      </h3>

      <div className="opcoes-pagamento" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
        <label>
          <input 
            type="radio" 
            name="metodo" 
            value="PIX" 
            onChange={(e) => setMetodo(e.target.value)} 
          />
          <strong> PIX</strong> (Aprovação imediata)
        </label>

        <label>
          <input 
            type="radio" 
            name="metodo" 
            value="Cartão" 
            onChange={(e) => setMetodo(e.target.value)} 
          />
          <strong> Cartão de Crédito / Débito</strong> (Maquininha na entrega)
        </label>

        <label>
          <input 
            type="radio" 
            name="metodo" 
            value="Dinheiro" 
            onChange={(e) => setMetodo(e.target.value)} 
          />
          <strong> Dinheiro</strong>
        </label>
      </div>

      {/* Renderização condicional para mostrar a chave Pix se ele escolher PIX */}
      {metodo === 'PIX' && (
        <div className="pix-info" style={{ padding: '10px', backgroundColor: '#eef', borderRadius: '5px', marginBottom: '20px' }}>
          <p>Chave PIX (Celular): <strong>(41) 99999-9999</strong></p>
        </div>
      )}

      <div className="botoes-acao" style={{ display: 'flex', gap: '10px' }}>
        <button className="btn-voltar" onClick={onVoltar}>
          Voltar ao Carrinho
        </button>
        <button 
          className="btn-finalizar" 
          onClick={handleConfirmar}
          style={{ backgroundColor: '#28a745', color: 'white', fontWeight: 'bold' }}
        >
          Confirmar e Finalizar
        </button>
      </div>
    </div>
  );
}

export default Pagamento;