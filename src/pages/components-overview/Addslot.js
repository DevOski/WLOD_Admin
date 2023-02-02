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
import moment from '../../../node_modules/moment/moment';

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
        justifyContent:'space-around',
        // justify-content: space-around;
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
      value: 'Monday',
      label: 'Monday',
    },
    {
      value: 'Tuesday',
      label: 'Tuesday',
    },
    {
      value: 'Wednesday',
      label: 'Wednesday',
    },
    {
      value: 'Thursday',
      label: 'Thursday',
    },
    {
      value: 'Friday',
      label: 'Friday',
    },
    {
      value: 'Saturday',
      label: 'Saturday',
    },
    {
      value: 'Sunday',
      label: 'Sunday',
    }
  ];


  
export default function AddTrainer() {
  let navigate = useNavigate();

  const [slot,setslot]=useState('');
  const [temail,setTemail]=useState('');
  const [tpass,setTpass]=useState('');
  const [sdate,setSdate]=useState('');
  const [tgender,setTgender]=useState('');
  const [tlanguage,setTlanguage]=useState('');
  const [day,setday]=useState('');
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
console.log(']]',sdate);
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
    console.log("chal gaay",slot);
    var formdata = new FormData();
    formdata.append("slot_time", slot);
    formdata.append("email", temail);
    formdata.append("slot_date", sdate);
    formdata.append("day", day);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://dashboard.weightlossondemand.com/backend/api/addtr_slot", requestOptions)
      .then(response => response.json())
      .then(result =>{
        console.log(result)
        if(result.status == 200){
        //   seterror(true)
        //   setvmsg("success")
        //   setemsg(result.message)
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
        <h2 >Add Trainer's Slot</h2>
        <Container>

        <div style={textStyles.main}>
       {/* <div> <label style={textStyles.text} ><b>Name</b></label><br></br><br></br></div> */}
       <div style={textStyles.sub}>

        <TextField id="outlined-basic" label="Enter Slot Time i.e.:05:00pm" variant="outlined" value={slot} style={textStyles.text} onChange={e => setslot(e.target.value)} />
        {/* <label style={textStyles.text} ><b>Name</b></label><br></br> */}
        {/* <TextField id="outlined-basic" label="Enter Email here" variant="outlined" value={temail} style={textStyles.text} onChange={e => setTemail(e.target.value)}/> */}
        <TextField
          id="outlined-select-currency"
          select
          label="Select Day"
          defaultValue={day ? day : 'Select day'}
        //   helperText="Please select your currency"
        onChange={e => setday(e.target.value)}
          style={textStyles.text}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </div>
        <div style={textStyles.sub}>

        <TextField type="date" id="outlined-basic"  variant="outlined" value={moment(sdate,"DD/MM/YYYY").format("YYYY-MM-DD")} style={textStyles.text} onChange={e =>{ console.log("__",moment(e.target.value,"YYYY-MM-DD").format("DD/MM/YYYY")); setSdate(moment(e.target.value,"YYYY-MM-DD").format("DD/MM/YYYY"))}} />
        {/* <label style={textStyles.text} ><b>Name</b></label><br></br> */}
        <TextField id="outlined-basic" label="Enter Trainer's email" variant="outlined" value={temail} style={textStyles.text} onChange={e => setTemail(e.target.value)}/>
       
        </div>
        <div>
        <Button style={textStyles.ibutton1} onClick={StoreTrainer}>
        Add Slot
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
           Trainer's slot has been added successfully!
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={textStyles.delete}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
