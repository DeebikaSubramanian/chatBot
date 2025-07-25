import { Link } from 'react-router-dom'

type Props={
    to:string,
    bg:string,
    text:string,
    textColor:string,
    onClick?:()=>Promise<void>
}

const NavigationLink = (props:Props) => {
  return (
    
        <Link className='nav-link' to={props.to} style={{background:props.bg,color:props.textColor}} onClick={props.onClick}>{props.text}</Link>
    
  )
}

export default NavigationLink