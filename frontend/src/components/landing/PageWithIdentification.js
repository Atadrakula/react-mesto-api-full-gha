import { Link } from "react-router-dom";
function PageWithIdentification({name, textSubmit, signatute, linkText, linkTo, onSubmit, onChange}) {

  return (
    <main className="content-auth">
      <section className="auth">
        <h2 className="auth__name">{name}</h2>
        <form
          action="#"
          className="auth__form"
          onSubmit={onSubmit}
        >
         <input
            name="email"
            type="email"
            placeholder="Email"
            className="auth__input auth__input_type_useremail"
            onChange={onChange}
            autoComplete="email"
            required
          />
          <span className="auth__input-text-error auth__input-text-error_type_useremail" />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="auth__input auth__input_type_userpassword"
            minLength="6"
            maxLength="200"
            onChange={onChange}
            autoComplete="current-password"
            required
          />
          <span className="auth__input-text-error auth__input-text-error_type_userpassword" />
          <button
            id="button-submit-auth"
            type="submit"
            className="auth__submit cursor-pointer button-clickable"
          >{textSubmit}
          </button>
        </form>
        <p className="auth__signature">{signatute}<Link to={linkTo} className="auth__link button-clickable">{linkText}</Link></p>
      </section>
    </main>
  );
}

export default PageWithIdentification;
