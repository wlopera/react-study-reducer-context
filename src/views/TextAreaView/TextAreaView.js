import {} from "react";
import styles from "./TextAreaView.module.css";

const TextAreaView = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData);
    console.log(formJson);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titulo del mensaje: <input name="title" defaultValue="Ciclismo" />
      </label>
      <label>
        Editar tu Mensaje:
        <textarea
          name="message"
          defaultValue="¡Yo realmente disfruté del ciclismo ayer!"
          rows={4}
          cols={40}
        />
      </label>
      <div className={styles.buttons}>
        <input type="reset" value="Reiniciar" className={styles.button} />
        <input type="submit" value="Enviar" className={styles.button} />
      </div>
    </form>
  );
};

export default TextAreaView;
