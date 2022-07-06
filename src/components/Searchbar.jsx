import React,{useRef, useState,useEffect} from 'react'
import styled from 'styled-components'
import { useThrottle } from "use-throttle";

const Searchbar = ({loading,setloading,onChange,suggestions}) => {
    const [inputtext, setinputtext] = useState('')
    const [active, setactive] = useState(0)
    const scrollref=useRef()
    const throttletext=useThrottle(inputtext,1000)

    useEffect(() => {
      onChange(throttletext)
    }, [throttletext,onChange])
    

    const handleinputchange=(e)=>{
            setinputtext(e.target.value)
            setloading(true)
    }
    console.log(suggestions)

    const handleclear=()=>{
        setinputtext('')
        onChange('')
        setloading(false)
    }
    
    const handleactivesuggetions=(e)=>{
        switch(e.keyCode){
            //arraydown
            case 40:
                if(active>=5){
                  setactive(prev=>prev+1)
                  scrollref.current.scrollTop+=38.05
                }else{
                  setactive((prev)=>prev+1)
                }
                break;
                //arrayup
            case 38:
                if(active<=2){
                  scrollref.current.scrollTop-=38.05
                    // setactive(5)
                    setactive(prev=>prev-1)
                }else{
                setactive(prev=>prev-1)
                }
                break;

                //enter
            case 13:
                break;

                default:
                    return;
        }
    }
  return (
  <>
  <Searchbarwrapper len={suggestions.length} onKeyUp={handleactivesuggetions}>
    <Image src="https://cdn.iconscout.com/icon/free/png-256/search-1767866-1502119.png" alt="Search-Icon"/>
    <Input value={inputtext} onChange={handleinputchange}/>
    <Rightside>
        {inputtext &&(
        <Image src="https://i.pinimg.com/originals/1a/22/83/1a22832304ea254136649cbb289129a1.jpg" alt="cross" style={{cursor:"pointer"}} onClick={handleclear}/>)}
        {loading &&
        ( <StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>)
  }
    </Rightside>

  </Searchbarwrapper>
  {!loading && suggestions.length >0 && (

      <SuggestionsBox len={suggestions.length} limit={5} active={active} ref={scrollref}>
        {suggestions.map((item,index)=>{
            return ( <div key={item} onMouseOver={()=>setactive(index+1)}>{item}</div>)
        })}

  </SuggestionsBox>
  )}
  </>
  )
}

export default Searchbar

const SuggestionsBox=styled.div`
border:1px solid black;
display:flex;
flex-direction:column;
flex:0 0 auto;
max-height:200px;
overflow:auto;
border-bottom-radius:20px;
border-bottom-left:20px;
border-top-color: ${({len})=>(len ? "transparent" : "black")}

& * {flex:1;
text-align:left;
padding:10px;
padding-left:50px;
}

& :nth-child(${({active})=>active}){
    background:lightblue;
    color:black;
    font-weight:700;
    cursor:pointer;
}

`;


const Searchbarwrapper=styled.div`
border:1px solid black;
display:flex;
border-radius:20px;
padding:5px 10px;
align-items:center;
border-bottom-right-radius:${({len})=>(len ? "0px" : "20px")};
border-bottom-left-radius:${({len})=>(len ? "0px" : "20px")};
`
const Image=styled.img`
height:20px;
padding-right:20px
`
const Input=styled.input`
border:none;
outline:none;
font-size:20px;
flex:1`

const Rightside =styled.div``

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;

  width: 20px;
  height: 20px;
  
  & .path {
    stroke: #5652BF;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
