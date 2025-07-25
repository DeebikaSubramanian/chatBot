import { TextField } from '@mui/material'

type Props = {
    name:string,
    label:string,
    type:string
}

const CustomizeInput = (props:Props) => {
  return (
    <TextField
    margin="normal"
    InputLabelProps={{style:{color:"white"}}} 
    name={props.name}  label={props.label} type={props.type} 
    InputProps={{style:{width:"400",borderRadius:"10px", fontSize:"20px",color:"white"}}} required></TextField>
  )
}

export default CustomizeInput