import { useState } from 'react';
import './CardProd.css';

function CardProd({ nome, valor, imagem, quantidade, onAdd, onRemove }) {
  return (
    <div className="card-prod">
      <h3>{nome}</h3>
      <p>{valor}</p>
      
      {/* Container da imagem do produto */}
      <div className="container-img-prod">
        <img src={imagem} alt={nome} className="img-produto" />
      </div>
      
      {/* Botões de controlo integrados no card */}
      <div className="contador-inline">
        <button className="btn-circulo btn-light" onClick={onRemove}>-</button>
        <span className="quantidade">{quantidade}</span>
        <button className="btn-circulo btn-dark" onClick={onAdd}>+</button>
      </div>
    </div>
  );
}

export default CardProd;