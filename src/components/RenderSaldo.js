import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "./UserContext";
import axios from "axios";


export default function RenderSaldo() {

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
      
      const balanceSection = buildBalance;


        return(
            <None> <div> <span className="saldo">SALDO</span> <span style={balanceSection > 0 ? {color : "#03AC00"} : {color: "#C70000"}} >{balanceSection}</span></div> </None>
        )

}


//Styles

const None = styled.div`

display:flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
position: relative;

.saldo{
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #000000;
  position: absolute;
  bottom: 0;
  left: 0;
}
`