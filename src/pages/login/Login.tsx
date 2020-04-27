import React, {
  memo,
  useCallback,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { DEMO_CREDENTIAL } from '../../utils/constants';
import styles from './Login.module.scss';

function Login(): React.ReactElement {
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    login: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const onChange = useCallback(({ target: { name, value } }) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onLogin = useCallback((event) => {
    event.preventDefault();
    const { login, password } = formValues;

    if (!(login && password)) {
      return setFormError('Please provide your login and password!');
    }

    if (login === DEMO_CREDENTIAL && password === DEMO_CREDENTIAL) {
      localStorage.setItem('isAuthenticated', 'true');
      return history.push('/home');
    }

    return setFormError('Access denied!');
  }, [history, formValues]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.center}>
        Log in
      </h1>
      <form
        onSubmit={onLogin}
        className={styles.loginForm}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={formValues.login}
          onChange={onChange}
          name="login"
          id="login"
          label="Login"
          type="text"
          variant="outlined"
          required
        />
        <TextField
          value={formValues.password}
          onChange={onChange}
          name="password"
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <div className={styles.formError}>
          { formError && (
            <div className={`${styles.errorMessage} ${styles.center}`}>
              { formError }
            </div>
          ) }
        </div>
      </form>
    </div>
  );
}

export default memo(Login);
