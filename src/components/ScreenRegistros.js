import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import axios from 'axios';
import UserContext from "./UserContext";
import Loading from "./Loading";
import RenderRegistros from "./RenderRegistros";
import add from "../assets/add.svg"
import remove from "../assets/remove.svg"
import logout from "../assets/log-out.svg"
import RenderSaldo from "./RenderSaldo"



export default function ScreenRegistros (){

  const {setToken, token} = useContext(UserContext);
  const [registros, setRegistros] = useState([]);
  const {reload} = useContext(UserContext);
  const {setName, name, setLocalUser, setLocalToken} = useContext(UserContext);
  const navigate = useNavigate();


  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  useEffect(() => {
      const promise = axios.get(
        "https://wallet13.herokuapp.com/posts", config
      );
  
      promise.then((response) => {
        setRegistros([...response.data]);
        
        }
      );
    }, [reload]);

    function buildBalance() {
      if(registros.length > 0) {
        return registros.reduce((previous, current) => {
          if(current.type === "entrada") {
            return previous + current.value;
          }
  
          return previous - current.value;
        }, 0)
      } else {
        return 0;
      }
    }
    
    const balanceSection = buildBalance();

    function logOutButton(){

      const promise = axios.get(
        "https://wallet13.herokuapp.com/singout", config
      );

      promise.then( res => {
        setLocalToken("");
        setLocalUser("");
        setToken("");
        setName("");
        navigate("/");
      }
      )
    }
  

    return(
        <>  
            <Helmet>
                <style>{"body { background-color: #8C11BE; }"}</style>
            </Helmet>
            <Container >
                <div className="header"><div><h1>Olá, {name}</h1></div> <Link to="/"> <div onClick={logOutButton} ><img src={logout}></img></div> </Link> </div>
                <div className="back">
                  <RenderRegistros/>
                  <div className="saldoTitulo">SALDO</div>
                  <div className="saldo" style={balanceSection > 0 ? {color : "#03AC00"} : {color: "#C70000"}} >{balanceSection}</div>
                </div>
                <div className="buttons">
                <Link to='/entrada'> <div className="button"> <img src={add}></img> <h3>Nova entrada</h3></div></Link>
                <Link to='/saida'> <div className="button"> <img src={remove}></img> <h3>Nova saída</h3></div></Link>
                </div>
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


  img{
    width: 36px;
    height: 36px;
  }

  .header{
    width: 320px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .back {
    width: 326px;
    min-height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    text-align: center;
    color: #868686;
    position: relative;

    .saldo{
      position: absolute;
      bottom: 10px;
      right: 20px;
    }

    .saldoTitulo{
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      color: #000000;
    }

  }

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

  .buttons {
    display:flex;
    margin: 5px;
  }

  .button {
    position: relative;
    width: 156px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    margin: 7px;

  img{
    width:28px;
    height:28px;
    color: white;
    position:absolute;
    top: 8px;
    left: 8px;
  }

  h3{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    color: #FFFFFF;
    position:absolute;
    bottom: 10px;
    left: 10px;
    width: 60px;
  }

  }


  h1{
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