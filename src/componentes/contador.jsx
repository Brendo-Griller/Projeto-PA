import { useState } from "react";
import './Contador.css';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <> {/* 1. ABRIMOS O ELEMENTO PAI AQUI */}
      
      <div className="container-contador">
        <h1>{contador}</h1>
        <button className="button-contador" onClick={() => setContador(contador + 1)}>Adicionar</button>
        <button className="button-contador" onClick={() => {if(contador > 0) setContador(contador - 1)}}>Retirar</button>
        <button className="button-contador" onClick={() => setContador(0)}>Limpar</button>
      </div>

      <div> {/* Troquei o fragmento vazio por uma div para organizar melhor */}
        <h1>{contador}</h1>
        <button className="button-contador" onClick={() => setContador(contador + 1)}>Adicionar</button>
        <button onClick={() => setContador(contador - 1)}>Retirar</button>
        <button onClick={() => setContador(0)}>Limpar</button>
      </div>

    </> 
  );
}

export default Contador;