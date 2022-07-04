/*

Renderiza 

*/

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "./UserContext";
import axios from "axios";


export default function RenderRegistros() {

    const {token} = useContext(UserContext);
    const [registros, setRegistros] = useState([]);
    const {reload} = useContext(UserContext);


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


      if (registros.length < 1) {
          return (
              <None>Não há registros de entrada ou saída</None>
          )
      } else {
        return(
            <>{registros.map((registro) => (<Registrar value={registro.value} key={registro._id} day={registro.day}  type={registro.type} description={registro.description}/> ))}</>
        )
      }
}


function Registrar({value, day, description, type}){

    return (
        <Registros>
            <span className="each" style={{color:"#C6C6C6"}} >{day} <span style={{color:'black'}}>{description}</span> </span>
            <span className="each" style={type === "entrada" ? {color:"#03AC00"}: {color:"#C70000"}} >{value.toFixed(2)}</span>
        </Registros>
    )
}


//Styles

const None = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
text-align: center;
color: #868686;
margin-top: 50%;
margin-left: 60px;
margin-right: 60px;

`

const Registros = styled.div`
    background-color: #FFFFFF;
    margin-top: 20px;
    border-radius: 5px;
    position: relative;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    display:flex;
    justify-content: space-between;

    .each{
        margin-left: 8px;
        margin-right: 8px;
    }



`
