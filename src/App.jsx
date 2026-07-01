import { useState, useEffect } from 'react';
import Header from './componentes/Header';
import Login from './componentes/Login';
import CardProd from './componentes/CardProd';
import Funcionario from './componentes/Funcionario';
import Calculadora from './componentes/Calculadora';
import Carrinho from './componentes/Carrinho';
import Pagamento from './componentes/Pagamento';
import './App.css';

function App() {
  // 1. Estado para controlar o Login
  const [isLogado, setIsLogado] = useState(false);

  // 2. Estado para controlar a tela atual (cardapio, carrinho, pagamento)
  const [telaAtual, setTelaAtual] = useState('cardapio');

  // 3. Estado dos produtos com Local Storage (Persistência)
  const [produtos, setProdutos] = useState(() => {
    // Tenta buscar os dados salvos no navegador
    const dadosSalvos = localStorage.getItem('carrinhoHamburgueria');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    // Lista original caso não tenha nada salvo
    return [
      {
        id: 1,
        nome: "X-Burguer",
        valor: "R$ 15,90",
        count: 0,
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80"
      },
      {
        id: 2,
        nome: "X-Salada",
        valor: "R$ 17,90",
        count: 0,
        imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80"
      },
      {
        id: 3,
        nome: "Refrigerante",
        valor: "R$ 6,00",
        count: 0,
        imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80"
      }
    ];
  });

  // Salva no navegador sempre que a variável 'produtos' mudar
  useEffect(() => {
    localStorage.setItem('carrinhoHamburgueria', JSON.stringify(produtos));
  }, [produtos]);

  // Função para adicionar ou retirar itens do carrinho
  const alterarQuantidade = (id, delta) => {
    setProdutos(produtos.map(prod => {
      if (prod.id === id) {
        const novoValor = prod.count + delta;
        return { ...prod, count: novoValor >= 0 ? novoValor : 0 };
      }
      return prod;
    }));
  };

  // Função para limpar todas as contagens
  const limparPedido = () => {
    setProdutos(produtos.map(prod => ({ ...prod, count: 0 })));
  };

  // Calcula o total de itens para o botão do carrinho
  const totalItensCarrinho = produtos.reduce((total, prod) => total + prod.count, 0);

  return (
    <div className="app-container">
      <Header titulo="lanchonete" subtitulo="O melhor da Região" />

      <main className="main-content">
        {/* Lado Esquerdo: Login (Só aparece se NÃO estiver logado) */}
        {!isLogado && (
          <aside className="sidebar-login">
            <Login onEntrar={() => setIsLogado(true)} />
          </aside>
        )}

        {/* Lado Direito: Se logado, ocupa 100% da largura. */}
        <section className={`painel-pedidos ${isLogado ? 'tela-cheia' : ''}`}>
          <Funcionario nome="João" cargo="Atendente" />

          {/* TELA 1: CARDÁPIO */}
          {telaAtual === 'cardapio' && (
            <div className="fade-in">
              <div className="produtos-grid">
                {produtos.map(prod => (
                  <CardProd
                    key={prod.id}
                    nome={prod.nome}
                    valor={prod.valor}
                    imagem={prod.imagem}
                    quantidade={prod.count}
                    onAdd={() => alterarQuantidade(prod.id, 1)}
                    onRemove={() => alterarQuantidade(prod.id, -1)}
                  />
                ))}
              </div>

              <div className="area-finalizar">
                <Calculadora
                  qtdXBurguer={produtos[0].count}
                  qtdSalada={produtos[1].count}
                  qtdRefri={produtos[2].count}
                />
                <div className="botoes-acao" style={{ display: 'flex', gap: '15px' }}>
                  <button className="btn-limpar" onClick={limparPedido}>Limpar Pedido</button>
                  <button className="btn-avancar" onClick={() => setTelaAtual('carrinho')}>
                    Ir para o Carrinho {totalItensCarrinho > 0 ? `(${totalItensCarrinho})` : ''}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TELA 2: CARRINHO */}
          {telaAtual === 'carrinho' && (
            <div className="fade-in">
              <Carrinho 
                produtos={produtos} 
                onVoltar={() => setTelaAtual('cardapio')} 
                onAvancar={() => setTelaAtual('pagamento')} 
              />
            </div>
          )}

          {/* TELA 3: PAGAMENTO */}
          {telaAtual === 'pagamento' && (
            <div className="fade-in">
              <Pagamento
                produtos={produtos}
                onVoltar={() => setTelaAtual('carrinho')}
                onFinalizar={() => {
                  limparPedido(); 
                  setTelaAtual('cardapio'); 
                }}
              />
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default App;