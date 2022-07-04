import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import axios from 'axios';
import UserContext from "./UserContext";
import Loading from "./Loading";


export default function ScreenLogin (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setLocalToken, setLocalUser } = useContext(UserContext);
  
    function submitLogin(event) {
      event.preventDefault();

      setIsLoading(true);

      const body = {
        email: email,
        password: password
      }

      const promise = axios.post('https://wallet13.herokuapp.com/login', body)
      promise
      .then(res => {
        setLocalToken(res.data.token)
        setLocalUser(res.data.name)
        navigate("/registros");
        alert("Logado");
        setIsLoading(false);

      })
      .catch(err => {
        alert("Algo deu errado, tente novamente");
        setIsLoading(false);
      })
    }

    return(
        <>  
            <Helmet>
                <style>{"body { background-color: #8C11BE; }"}</style>
            </Helmet>
            <Container >
              <form onSubmit={submitLogin}>
                <h1>MyWallet</h1>
                <input placeholder="E-mail" type="email" value={email} required onChange={e => setEmail(e.target.value)} disabled={isLoading} />
                <input placeholder="Senha" type="password" value={password} required onChange={e => setPassword(e.target.value)} disabled={isLoading}/>
                <button className="button" type="submit" disabled={isLoading}> {" "} {isLoading ? <Loading /> : "Entrar"}</button>
                <Link to="/cadastro"><p>Primeira vez? Cadastre-se!</p></Link>
              </form>
            </Container>
        </>
    )
}


//Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 30px;

  a {
    text-decoration: none;
  }

  input {
    box-sizing: border-box;
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: #666666;
    margin: 4px;

    &::placeholder{
        color: #dbdbdb;
        padding-left: 10px;
    }

  }

  .button {
    width: 303px;
    height: 45px;
    background: #A328D6;
    border-radius: 4.63636px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    margin: 5px;
  }


  h1{
    margin-top: 100px;
    margin-bottom: 30px;
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    color: #FFFFFF;
  }


  p{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 17px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 15px;
  }

  img{
      margin-top: 30px;
      margin-bottom: 20px;
  }

  form{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  button{
    padding: 0;
    margin:0;
    border: none;
    background: transparent;
}

`;
