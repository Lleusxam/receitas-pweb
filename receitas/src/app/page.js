import styles from './styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Receitas de Next</h1>
      <h2>Escolha a Receita</h2>
      <a className={styles.link} href="./receita1/rota1">Receita 1</a>
    </div>
  );
}
