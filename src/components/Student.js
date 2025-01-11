import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button , Paper} from '@mui/material';

export default function Student() {

    const [name,setName] = React.useState('')
    const [address,setAddress] = React.useState('')
    // get students from backend
    const  [students,setStudents] = React.useState([])

    const handleClick=(e)=> {
        e.preventDefault()
        const student = {name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New Student Added!")
        })
    }
// get data
    React.useEffect(()=> {
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result)
        })
    },[])

  return (
    
    <Container>

        <Container maxWidth="sm">
            <h1>Add Student</h1>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1} }}
                noValidate
                autoComplete="off"
            >
            <TextField id="standard-basic" label="Name" variant="standard" 
                value = {name}
                onChange={(e)=> setName(e.target.value)}
            
            />
            <TextField id="standard-basic" label="Address" variant="standard" 
                value = {address}
                onChange={(e)=> setAddress(e.target.value)}

            />
            
            </Box>
            
            <Button variant="outlined" onClick={handleClick}>Submit</Button>

        </Container>
            <h1>Student Data</h1>
        <Container>
            <Paper elevation={3}>
                {students.map(student=>(
                    <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
                     Id:{student.id}<br/>
                     Name:{student.name}<br/>
                     Address:{student.address}<br/>
                        
                    </Paper>
                ))}

            </Paper>
        </Container>
    </Container>
    
    
    
    
  );
}
