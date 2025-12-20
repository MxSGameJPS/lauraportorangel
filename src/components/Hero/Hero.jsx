import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background with overlay is handled in CSS, but we can add a specific overlay div if needed for multiple layers */}

      <div className={styles.content}>
        <span className={styles.subtitle}>
          Psicopedagoga, Escritora & Cordenadora de das rodas de Leitura
        </span>
        <h1 className={styles.title}>Laura Porto Rangel</h1>
        <p className={styles.description}>
          &quot;A leitura não é apenas um ato de decifrar palavras, mas um encontro
          profundo com mundos que habitam dentro e fora de nós.&quot;
        </p>

        <div className={styles.buttons}>
          <a href="/livros" className={styles.primaryBtn}>
            Conheça meus Livros
          </a>
          <a href="/agenda" className={styles.secondaryBtn}>
            Agenda de Encontros
          </a>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </section>
  );
}
