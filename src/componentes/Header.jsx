import './Header.css'

function Header({ titulo, subtitulo }) {
  return (
    <header className="titulo">
      <h1>{titulo}</h1>
      <h2>{subtitulo}</h2>
    </header>
  )
}

export default Header