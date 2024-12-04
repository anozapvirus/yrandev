import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";

import LoadingScreen from "../../components/loadingscreen/LoadingScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `linear-gradient(to right, rgba(2, 0, 36, 1), rgba(37, 117, 252, 0.8)), 
                     url('https://example.com/seu-gif.gif') center/cover no-repeat`,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    padding: "40px 30px",
    maxWidth: "400px",
    width: "100%",
  },
  logo: {
    marginBottom: theme.spacing(4),
    width: "120px",
    height: "auto",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  inputField: {
    margin: theme.spacing(2, 0),
    "& input": {
      padding: "10px 0",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #ccc",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "2px solid #000",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #2575fc",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    fontSize: "1rem",
  },
  link: {
    marginTop: theme.spacing(2),
    color: "#2575fc",
    textDecoration: "none",
    "&:hover": {
      color: "#1a5dc0",
      textDecoration: "underline",
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });
  const { handleLogin } = useContext(AuthContext);
  const [viewregister, setViewregister] = useState("disabled");
  const [loading, setLoading] = useState(true);

  const logo = `${process.env.REACT_APP_BACKEND_URL}/public/logotipos/login.png`; // Caminho da logo

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchViewRegister();
  }, []);

  const fetchViewRegister = async () => {
    try {
      const response = await api.get("/settings/viewregister");
      const viewregisterX = response?.data?.value;
      console.log("Valor de viewregister:", viewregisterX); // Para verificar o valor
      setViewregister(viewregisterX);
    } catch (error) {
      console.error("Erro ao buscar viewregister:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* Exibição da logo */}
          <img src={logo} alt="Logo" className={classes.logo} />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label={i18n.t("login.form.email")}
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
              className={classes.inputField}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label={i18n.t("login.form.password")}
              type="password"
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
              className={classes.inputField}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component={RouterLink}
                   to="/signup"
                  variant="body2"
                  className={classes.link}
                >
                   Não tem uma conta? Cadastre-se!
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            {/* Botão de Cadastro (condicional) */}
            {viewregister === "enabled" && (
              <Grid container>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/signup"
                    className={classes.link}
                  >
                    Não tem uma conta? Cadastre-se!
                  </Link>
                </Grid>
              </Grid>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
