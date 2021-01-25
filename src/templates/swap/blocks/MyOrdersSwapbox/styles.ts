import styled , { css } from 'styled-components'
import { generateMedia } from 'styled-media-query'

const customMedia = generateMedia({
  custom: '1366px'
})

export const MyOrders = styled.div`
  height:100%;
  display:flex;
  flex-direction:column;
  padding-top:1rem;
  width:100%;
`
export const FirstRow = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  width:100%;
  height:34%;
  padding-left:5rem;
`
export const SecondRow = styled.div`
  display:flex;
  flex-direction:row;
  width:100%;
  height:35%;
  align-items:center;
  padding-left:3rem;
  padding-right:3rem;
  justify-content:space-evenly;
`
export const ThirdRow = styled.div`
  display:flex;
  width:100%;
  height:32%;
  align-items:center;
  padding-top:1rem;
  padding-left:5rem;
  padding-right:5rem;
  justify-content:space-between;
  
`
  export const WrapperBalance = styled.div`
  display:flex;
  flex-direction:column;
  margin-left: 1rem;
  font-size:2rem;
  font-family: Work Sans Medium;
  color: #ffffff;  
`;
export const SpanTextBlur = styled.span`
  text-align: left;
  font-family: Work Sans Medium;
  letter-spacing: 0px;
  color: #8BA1BE;
  font-size: small;
`;
export const Image = styled.img`
  width:100%;
`
export const WrapperImage = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
    background-color:#1C2023;
    color:#ffffff;
    height: 3.6rem;
    width: 3.6rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    img {
      width: 90%;
    :hover {
      opacity: 0.8;
    }   
    }
`
export const LoginButton = styled.button`
  background-color: #E60079;
  padding: 1.25rem 3rem;
  color: white;
  border-radius: 13px;
  font-size: 12px;
  margin-bottom: 2rem;
  cursor: pointer;
  font-family: Work Sans Medium;
  
  &:focus {
    outline: 0;
  }
`
export const TextWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    
    font-family: Work Sans Medium;
    font-size:1.3rem;
    color:white;
    align-items:center;
    padding-bottom:1.4rem;

`
export const Blur = styled.span`
  color: #8BA1BE;
  
  font-family: Work Sans Medium;
  `

