import React, { useState } from 'react'
import { Container, TextField, MenuItem, Radio,FormControlLabel, FormLabel, RadioGroup, Button } from '../../../node_modules/@mui/material/index';
import { Alert } from '../../../node_modules/@mui/material/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const textStyles = {
  
    text: {
        // marginTop: '30px',
        width: 320
    },
     
    text2: {
        // marginTop: '30px',
        width: 500
    },
    main: {
        display: 'flex',
        // justifyContent:'space-around',
        flexDirection: 'column'
    },
    sub :{
        display: 'flex',
        justifyContent:'space-between',
        margin:'10px 0px 10px 0px'
    },
    ibutton :{
      // float:'right',
      // alignSelf:"center",
      width: 'auto',
      margin: 10,
      backgroundColor:'maroon',
      color:'white',
  },
  ibutton1 :{
    width: 300,
    margin: 10,
    backgroundColor:'green',
    color:'white',
  },
  delete: {
    backgroundColor: '#d14934',
    color: 'white'
    }
}
const currencies = [
    {
      value: 'Weight Loss Consultant',
      label: 'Weight Loss Consultant',
    },
    {
      value: 'Professional Weight Loss Consultant',
      label: 'Professional Weight Loss Consultant',
    }
  ];


  
export default function AddTrainer() {
  let navigate = useNavigate();

  const [tname,setTname]=useState('');
  const [temail,setTemail]=useState('');
  const [tpass,setTpass]=useState('');
  const [tdesc,setTdesc]=useState('');
  const [tgender,setTgender]=useState('');
  const [tlanguage,setTlanguage]=useState('');
  const [type,setType]=useState('');
  const [tspec,setTspec]=useState('');
  const [farea,setfarea]=useState('');
  const [tqual,setTqual]=useState('');
  const [tfee,setTfee]=useState('');
  const [timg,setTimg]=useState('Upload Image');
  const [error,seterror]=useState(false);
  const [emsg,setemsg]=useState(false);
  const [vmsg,setvmsg]=useState("");


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/trainer');
  };

  function Uploader(e) {
    // const imageFile = e.target.files;
    //   console.log(imageFile);
    console.log("^^",e.target.files[0].name);
    console.log("**",e.target.files[0]);

    setTimg(e.target.files[0].name);
    // const reader = new FileReader();
    // reader.addEventListener("load", (e) => {
    //   setTimg(e.target.result);
    //   console.log(imageFile);
    // });

    // reader.readAsDataURL(imageFile);
  }
  const StoreTrainer = () =>{
    console.log("chal gaay");
    var formdata = new FormData();
    formdata.append("tr_name", tname);
    formdata.append("email", temail);
    formdata.append("password", tpass);
    formdata.append("gender", tgender);
    formdata.append("tr_desc", tdesc);
    formdata.append("focus_area", farea);
    formdata.append("lang", tlanguage);
    formdata.append("qualif", tqual);
    formdata.append("speciality", tspec);
    formdata.append("type", type);
    formdata.append("fee", tfee);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://dashboard.weightlossondemand.com/backend/api/store", requestOptions)
      .then(response => response.json())
      .then(result =>{
        console.log(result)
        if(result.status == 200){
          // seterror(true)
          // setvmsg("success")
          // setemsg(result.message)
          setOpen(true);
          
        }else{
          seterror(true)
          setvmsg("error")
          setemsg(result.message)
        }
      })
      .catch(error => console.log('error', error));
  }
  return (

    <div style={{textAlign:'center'}}>
       {error &&
        <Alert variant="filled" severity={vmsg}>
       {emsg}
      </Alert>}
        <h2 >Add Trainer</h2>
        <Container>

        <div style={textStyles.main}>
       {/* <div> <label style={textStyles.text} ><b>Name</b></label><br></br><br></br></div> */}
       <div style={textStyles.sub}>

        <TextField id="outlined-basic" label="Enter Name here" variant="outlined" value={tname} style={textStyles.text} onChange={e => setTname(e.target.value)} />
        {/* <label style={textStyles.text} ><b>Name</b></label><br></br> */}
        <TextField id="outlined-basic" label="Enter Email here" variant="outlined" value={temail} style={textStyles.text} onChange={e => setTemail(e.target.value)}/>
        <TextField id="outlined-basic" label="Enter Password here" variant="outlined" value={tpass} style={textStyles.text} onChange={e => setTpass(e.target.value)}/>

        </div>
        <div style={textStyles.sub}>

        <TextField id="outlined-basic" label="Enter Description" variant="outlined" value={tdesc} onChange={e => setTdesc(e.target.value)} multiline maxRows={6} style={textStyles.text2} />
        {/* <label style={textStyles.text} ><b>Name</b></label><br></br> */}
        {/* <TextField
          id="outlined-select-currency"
          select
          label="Select grnder"
          defaultValue="None"
        //   helperText="Please select your currency"
          style={textStyles.text}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField> */}
           <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group" onChange={e => setTgender(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroup>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          {/* <div></div>
          <div></div> */}
        </div>
        <div style={textStyles.sub}>
        <TextField id="outlined-basic" label="Enter Languages" variant="outlined" style={textStyles.text} value={tlanguage} onChange={e => setTlanguage(e.target.value)}/>
        {/* <label style={textStyles.text} ><b>Name</b></label><br></br> */}
         <TextField
          id="outlined-select-currency"
          select
          label="Select type"
          defaultValue={type}
        //   helperText="Please select your currency"
        onChange={e => setType(e.target.value)}
          style={textStyles.text}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        <TextField id="outlined-basic" label="Enter Speciality" variant="outlined" style={textStyles.text} value={tspec} onChange={e => setTspec(e.target.value)}/>
        </div>
        <div style={textStyles.sub}>
        <TextField id="outlined-basic" label="Focus Area" variant="outlined" multiline maxRows={6} style={textStyles.text} value={farea} onChange={e => setfarea(e.target.value)}/>
        
        <TextField id="outlined-basic" label="Enter Qualifications" variant="outlined" multiline maxRows={6} style={textStyles.text} value={tqual} onChange={e => setTqual(e.target.value)}/>
        <TextField id="outlined-basic" label="Enter Fee" variant="outlined" style={textStyles.text} value={tfee} onChange={e => setTfee(e.target.value)}/>
        
        </div>
        <div>
         <Button style={textStyles.ibutton}>
            {/* <input type="file" accept='images'> Upload Image</input>*/}
        <input type="file" style={{opacity:"0",position:"absolute"}} accept="image/*" onChange={Uploader}/>
        {timg}
          </Button> 
        </div>
        <div>
        <Button style={textStyles.ibutton1} onClick={StoreTrainer}>
        Insert Trainer
          </Button> 
        </div>
        </div>
        </Container>
        <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       <DialogTitle textAlign="center"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
              </svg></DialogTitle>
       <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Trainer has been added successfully!
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={textStyles.delete}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
