import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import axios from 'axios';
import UserContext from "./UserContext";
import Loading from "./Loading";
import dayjs from 'dayjs';


export default function ScreenEntrada (){

    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { token } = useContext(UserContext)
  
    function submitEntrada(event) {
      event.preventDefault();

      setIsLoading(true);

      const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

      const body = {
        value: parseFloat(value),
        type: "entrada",
        description: description,
        day: dayjs().format('DD/MM')

      }

      const promise = axios.post('https://wallet13.herokuapp.com/posts', body, config)
      promise
      .then(res => {
        navigate("/registros");
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
              <form onSubmit={submitEntrada}>
                <h1>Nova entrada</h1>
                <input placeholder="Valor" type="number" value={value} required onChange={e => setValue(e.target.value)} disabled={isLoading} />
                <input placeholder="Descrição" type="text" value={description} required onChange={e => setDescription(e.target.value)} disabled={isLoading}/>
                <button className="button" type="submit" disabled={isLoading}> {" "} {isLoading ? <Loading /> : "Salvar entrada"}</button>
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
    margin-bottom: 30px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
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