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

  const onChange = useCallback(({ target: { name, value } }) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onLogin = useCallback(() => {
    const { login, password } = formValues;

    if (login === DEMO_CREDENTIAL && password === DEMO_CREDENTIAL) {
      localStorage.setItem('isAuthenticated', 'true');
      history.push('/home');
    }
  }, [history, formValues]);

  return (
    <div className={styles.wrapper}>
      <h1>Log in</h1>
      <form className={styles.loginForm} noValidate autoComplete="off">
        <TextField
          value={formValues.login}
          onChange={onChange}
          name="login"
          id="login"
          label="login"
          variant="outlined"
        />
        <TextField
          value={formValues.password}
          onChange={onChange}
          name="password"
          id="password"
          label="password"
          variant="outlined"
        />
        <Button onClick={onLogin} variant="contained" color="primary">
          log in
        </Button>
      </form>
    </div>
  );
}

export default memo(Login);
