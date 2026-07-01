import './Login.css';

// 1. Adicionamos o { onEntrar } aqui nos parâmetros
function Login({ onEntrar }) {
  return (
    <div className='login'>
      <h2>Login</h2>
      <input type="text" id="pip-usuario" placeholder="Usuário" />
      <input type="password" id="pip-Senha" placeholder="Senha" />
      
      {/* 2. Adicionamos o onClick ao botão */}
      <button onClick={onEntrar}>Enviar</button>
      
      <a href="#" className="esqueceu-senha">Esqueceu a senha?</a>
    </div>
  );
}

export default Login;