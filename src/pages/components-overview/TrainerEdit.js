import React from 'react'
import axios from '../../../node_modules/axios/index';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import moment from '../../../node_modules/moment/moment';
import { Container, TextField, MenuItem, Radio,FormControlLabel, FormLabel, RadioGroup, Button } from '../../../node_modules/@mui/material/index';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '../../../node_modules/@mui/material/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
const textStyles = {
  
    text: {
        // marginTop: '30px',
        width: 320
    },
     
    text2: {
        // marginTop: '30px',
        width: 400
    },
    main: {
        display: 'flex',
        // justifyContent:'space-around',
        flexDirection: 'column'
    },
    sub :{
        display: 'flex',
        justifyContent:'space-around',
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
    backgroundColor:'maroon',
    color:'white',
  },
  delete: {
    backgroundColor: '#d14934',
    color: 'white'
    },
    circle:{
        // display: 'inline-block',
    // margin:"auto",
    // padding: 10,
    width:' 130px',
    height: '130px',    
    lineHeight: '50px',
    fontSize: '12px',
    fontWeight: 'lighter !important',
    // color:' #fff !important',
    // textAlign: 'center',
    whiteSpace: 'nowrap',
    // verticalAlign: 'baseline',
    // backgroundColor: '#d73d33',
    borderRadius:'80px',
    // position: 'relative',
    top: '-3px',
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


export default function TrainerEdit() {
    let navigate = useNavigate();
    const { id } = useParams();
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
  const [timg,setTimg]=useState('Change Image');
  const [trimg,setTrimg]=useState('');
  const [error,seterror]=useState(false);
  const [emsg,setemsg]=useState(false);
  const [vmsg,setvmsg]=useState("");
  const [alert,setAlert]=useState(false);

    let time = moment().format("h:mma");
    

    useEffect(() => {
        console.log('working',id);
        getVist();
    }, []);
    const Close = () => {
        setAlert(false);
        navigate('/trainer')
      };
    function handleChange(e) {
        console.log(e.target.files);
        setTrimg(URL.createObjectURL(e.target.files[0]));
    }
    const getVist = () => {

        axios({
            method: 'get',
            url: `https://dashboard.weightlossondemand.com/backend/api/trainerDesc/${id}/${time}`
        }).then(function (response) {
            console.log('>>>>>>', response.data.trainers);
            setTname(response.data.trainers.tr_name)
            setTemail(response.data.trainers.email)
            setTdesc(response.data.trainers.tr_desc)
            setTgender(response.data.trainers.gender)
            setTfee(response.data.trainers.tr_amount)
            setTqual(response.data.trainers.qualifications)
            setTspec(response.data.trainers.tr_speciality)
            setTlanguage(response.data.trainers.languages)
            setfarea(response.data.trainers.focus_area)
            setType(response.data.trainers.type)
            setTrimg(response.data.trainers.images)
            console.log(">>>>>!",type);
            // setData(response.data.data);

            // let columns = Object.keys(response.data.data[0]);
            // setCol(columns);
            // console.log('c1', columns);
        });
    }

    const HandleUpdate = () => {
    var formdata = new FormData();
    formdata.append("name", tname);
    formdata.append("email", temail);
    formdata.append("gender", tgender);
    formdata.append("desc", tdesc);
    formdata.append("farea", farea);
    formdata.append("lang", tlanguage);
    formdata.append("qual", tqual);
    formdata.append("spec", tspec);
    formdata.append("type", type);
    formdata.append("fee", tfee);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`https://dashboard.weightlossondemand.com/backend/api/tr_edit`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        console.log(result)
        if(result.status == 200){
          // seterror(true)
          // setvmsg("success")
          // setemsg(result.message)
          setAlert(true);
          
        }else{
          seterror(true)
          setvmsg("error")
          setemsg(result.message)
        }
      })
      .catch(error => console.log('error', error));
    }
  return (
      <div>
         {error &&
        <Alert variant="filled" severity={vmsg}>
       {emsg}
      </Alert>}
    <div style={{textAlign:'center'}}>
        <h2>TrainerEdit</h2>
    <div style={textStyles.main}>
       {/* <div> <label style={textStyles.text} ><b>Name</b></label><br></br><br></br></div> */}
       <div>
       <img src={trimg} style={textStyles.circle}/><br></br>
       <Button style={textStyles.ibutton}>
            {/* <input type="file" accept='images'> Upload Image</input>*/}
        <input type="file" style={{opacity:"0",position:"absolute"}} accept="image/*" onChange={handleChange}/>
        {timg}
          </Button> 
       </div>
       <div style={textStyles.sub}>

        <TextField id="outlined-basic" label="Enter Name here" variant="outlined" value={tname} style={textStyles.text} onChange={e => setTname(e.target.value)} />
        {/* <label style={textStyles.text} ><b>Name</b></label><br></br> */}
        <TextField id="outlined-basic" label="Enter Email here" variant="outlined" value={temail} style={textStyles.text} onChange={e => setTemail(e.target.value)}/>
        {/* <TextField id="outlined-basic" label="Enter Password here" variant="outlined" value={tpass} style={textStyles.text} onChange={e => setTpass(e.target.value)}/> */}
        <TextField
          id="outlined-select-currency"
          select
          label="Select type"
          key={type}
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
        </div>
        {/* <div style={{margin:'1%'}}>

        <TextField id="outlined-basic" label="Enter Speciality" variant="outlined" style={textStyles.text} value={tspec} onChange={e => setTspec(e.target.value)}/>
        <TextField id="outlined-basic" label="Enter Fee" variant="outlined" style={textStyles.text} value={tfee} onChange={e => setTfee(e.target.value)}/>
        
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
           {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group" onChange={e => setTgender(e.target.value)}
      >
        <FormControlLabel value={tgender ? tgender : 'female'} control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> *
      </RadioGroup>
          <div></div>
          <div></div>
          <div></div>
          <div></div> */}
          {/* <div></div>
          <div></div> 
        </div> */}
        <div style={textStyles.sub}>
        <TextField id="outlined-basic" label="Enter Languages" variant="outlined" style={textStyles.text} value={tlanguage} onChange={e => setTlanguage(e.target.value)}/>
        {/* <label style={textStyles.text} ><b>Name</b></label><br></br> */}
        
        <TextField id="outlined-basic" label="Focus Area" variant="outlined" multiline maxRows={6} style={textStyles.text} value={farea} onChange={e => setfarea(e.target.value)}/>
        
        <TextField id="outlined-basic" label="Enter Qualifications" variant="outlined" multiline maxRows={6} style={textStyles.text} value={tqual} onChange={e => setTqual(e.target.value)}/>
        
        </div>
       <div  style={textStyles.sub}>
       <TextField id="outlined-basic" label="Enter Speciality" variant="outlined" style={textStyles.text} value={tspec} onChange={e => setTspec(e.target.value)}/>
        
       <TextField id="outlined-basic" label="Enter Description" variant="outlined" value={tdesc} onChange={e => setTdesc(e.target.value)} multiline maxRows={6} style={textStyles.text2} />

        <TextField id="outlined-basic" label="Enter Fee" variant="outlined" style={textStyles.text} value={tfee} onChange={e => setTfee(e.target.value)}/>
       </div>
        <div>
        <Button style={textStyles.ibutton1} onClick={HandleUpdate}>
        Update Trainer
          </Button> 
        </div>
        </div>
</div>
<Dialog
        open={alert}
        // TransitionComponent={Transition}
        keepMounted
        onClose={Close}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign="center"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
              </svg></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Trainer has been Updated successfully!
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={textStyles.delete} onClick={Close}>OK</Button>
        </DialogActions>
      </Dialog>
      </div>
      )
}
