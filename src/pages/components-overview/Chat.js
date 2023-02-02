import React, { useEffect } from 'react';
import { Breadcrumbs, Divider, Grid, Stack, Typography } from '@mui/material';
import DataTable, { createTheme } from 'react-data-table-component';
// project import
import ComponentSkeleton from './ComponentSkeleton';
import { Alert, Container, Hidden } from '../../../node_modules/@mui/material/index';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '../../../node_modules/@mui/material/index';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router-dom';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import moment from '../../../node_modules/moment/moment';
const customStyles = {
    headCells: {
        style: {
            backgroundColor: 'darkgrey',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'uppercase'
        }
    }
    // rows: {
    //     style: {
    //         width: '100%', // override the row height
    //     },
    // }
};
const textStyles = {
    delete: {
        backgroundColor: '#d14934',
        color: 'white'
    },
    cancel: {
        color: 'grey'
    },
    close: {
        backgroundColor: 'darkgrey',
        color: 'white'
    },
    text: {
        marginTop: '30px',
        width: 500
    },
    main: {
        display: 'flex',
        flexDirection: 'column'
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
    },
    ibutton :{
        // float:'right',
        margin: 10,
        backgroundColor:'maroon',
        color:'white',
    },
    blink :{
        textDecoration: 'none'

    }
};

export default function Chat() {
    
  const params = useLocation();
  console.log(">>",params.state);
  const navigate = useNavigate();
    const [col, setCol] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [ids, setId] = useState('');
    const [trName, settrName] = useState('');
    const [trEmail, settrEmail] = useState('');
    const [trGender, settrGender] = useState('');
    const [trDesc, settrDesc] = useState('');
    const [trLanguages, settrLanguages] = useState('');
    const [trQualifications, settrQualifications] = useState('');
    const [trSpeciality, settrSpeciality] = useState('');
    const [trType, settrType] = useState('');
    const [trToken, settrToken] = useState('');
    const [trAmount, settrAmount] = useState('');
    const [trImages, settrImages] = useState('');
    const [trFocus, settrFocus] = useState('');
    const [trSlots, settrSlots] = useState({});
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    
    const [count, setcount] = useState(false);
    const Close = () => {
        setAlert(false);
        window.location.reload(false);
      };
    
    // useEffect(() => {
    //     console.log("params",params?.state, count);
    //   if(params?.state?.tr_add){
    //     setAlert(true)
    //     setAlertMsg("Trainer has been added!")
    //   }else if(params?.state?.tr_delete){
    //     setAlert(true)
    //     setAlertMsg("Trainer has been deleted successfully!")
    //     setcount(true)
    //   }else{
    //     setAlert(false)
    //     setAlertMsg("")
    //   }
    //   if(count == true){
    //     setAlert(false);
    //     // params?.state?.tr_delete = ""
    //   }
    // }, [])
    
    function handleClickOpen(value) {
        // e.preventDefault();
        setOpen(true);
        setId(value);
    }
    function handleViewOpen(value) {
        // e.preventDefault();
        setShow(true);
        let time = moment().format("h:mma");
    console.log("time>>>>>>>>>>>",time);
        axios({
            method: 'get',
            url: `https://dashboard.weightlossondemand.com/backend/api/trainerDesc/${value}/${time}`
        }).then(function (response) {
            console.log('>', response.data.trainers.email);
            console.log("@@",response.data.slots);
            settrSlots(response.data.slots);
            settrName(response.data.trainers.tr_name);
            settrEmail(response.data.trainers.email);
            settrGender(response.data.trainers.gender);
            settrDesc(response.data.trainers.tr_desc)
            // settrLanguages(response.data.trainers.tr_desc);
            settrFocus(response.data.trainers.focus_area);
            settrLanguages(response.data.trainers.languages);
            settrQualifications(response.data.trainers.qualifications);
            settrSpeciality(response.data.trainers.tr_speciality);
            settrType(response.data.trainers.type);
            settrToken(response.data.trainers.token);
            settrAmount(response.data.trainers.tr_amount);
            settrImages(response.data.trainers.images);
        });
       

    }
    const handlee = () =>{
        setAlert(true)
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleViewClose = () => {
        setShow(false);
    };

    const handleDelete = (value) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://dashboard.weightlossondemand.com/backend/api/delete_chat/${value}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status === 200){
                 setOpen(false);
                    setAlert(true)
                }
            })
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        console.log('working');
        getVist();
    }, []);
    const getVist = () => {
        axios({
            method: 'GET',
            url: 'https://dashboard.ondemand.com/backend/api/all_chats'
        }).then(function (response) {
            console.log('>>>>>>', response.data.data);
            setData(response.data.data);

            let columns = Object.keys(response.data.data[0]);
            setCol(columns);
            console.log('c1', columns);
        });
    };
    console.log('heree', col);
    let valuesArrObj = [];
    col.forEach((val) => {
        if (val != 'updated_at')
            valuesArrObj.push({
                name: val,
                selector: (row, index) => row[val],
                sortable: true
                // width: '20%',
                // wrap: true,
                // maxWidth:"3%",
                // resizable:true,
                // allowOverflow: false
                // [val]: val
            });
    });
    valuesArrObj.push({
        name: 'Actions',
        // wrap:true,
        allowOverflow: true,
        selector: (row) => {
            return (
                <>
                    {/* <Link to={'/trainer-edit/' + row.tr_id}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="maroon"
                            className="bi bi-pencil-square "
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                        </svg>
                    </Link> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <a href='#'> */}
                    {/* <a href="#" onClick={() => handleViewOpen(row.tr_id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="maroon"
                            className="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                    </a> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={() => handleClickOpen(row.msg_id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="maroon"
                            className="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </a>
                </>
            );
        }
        // width: 'fit-content',
    });

    console.log('c2', valuesArrObj);
    // console.log("c3",valuesArr);
    //    const handleSelectChange = (value) =>{
    // this.setState({value})
    //     let valuesArr = col.split(',')
    //     let valuesArrObj = []
    //     valuesArr.forEach((val) => {
    //       valuesArrObj.push({
    //         [val]: val
    //       })
    //   })
    //   console.log("***",valuesArr);
    // };

    // const cols = [
    //     {
    //         name: 'Title',
    //         selector: (row) => row.vr_opts,
    //         sortable: true
    //     },
    // {
    //     name: 'Director',
    //     selector: row => row.director,
    //     sortable: true,
    // },
    //     {
    //         name: 'Year',
    //         selector: (row) => row.vr_id,
    //         sortable: true
    //     }
    // ];
    return (
        <ComponentSkeleton>
            {/* {alert &&
            <Alert  variant="filled" severity='success'>
                {alertMsg}
            </Alert> 

            }*/}
             <div style={{maxWidth:'1100px',margin: 'auto'}}>
            {/* <Link to={'/trainer-add'} style={textStyles.blink}>
            <Button style={textStyles.ibutton}>Insert Trainer</Button>
            </Link> 
            <Link to={'/slot-add'} style={textStyles.blink}>
            <Button style={textStyles.ibutton}>Add Trainer's Slots</Button>
            </Link> */}
            <Grid>
                <DataTable columns={valuesArrObj} data={data} theme="light" striped="true" pagination="true" customStyles={customStyles} />
            </Grid>
            {/*--------------Delete dialog -------------------- */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are you sure you want to delete record {ids}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={textStyles.cancel}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleDelete(ids)} autoFocus style={textStyles.delete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/*--------------View dialog -------------------- */}

            <Dialog open={show} onClose={handleViewClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    <b>Trainer Details</b>
                </DialogTitle>
                <DialogContent style={textStyles.main}>
                    {/* <DialogContentText id="alert-dialog-description"> */}
                    {/* <label>Trainer Name</label>
                    <p>{trName}</p>
                    <label>Trainer Name</label>
                    <p>{trEmail}</p>
                    <label>Trainer Name</label>
                    <p>{trName}</p>
                    <label>Trainer Name</label>
                    <p>{trName}</p> */}
                    <div style={{textAlign:"center"}}>
                    <img src={trImages} style={textStyles.circle}/>
                    </div>
                     <label style={textStyles.text} ><b>Name</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trName} />
                    <label style={textStyles.text} > <b>Email</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trEmail} />
                    <label style={textStyles.text} > <b>Gender</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trGender} />
                    <label style={textStyles.text} ><b>Description</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trDesc} />
                    <label style={textStyles.text} ><b>Language</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trLanguages} />
                    <label style={textStyles.text} ><b>Focus Area</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trFocus} />
                    <label style={textStyles.text} ><b>Qualification</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trQualifications} />
                    <label style={textStyles.text} ><b>Speciality</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trSpeciality} />
                    <label style={textStyles.text} ><b>Type</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trType} />
                    <label style={textStyles.text} ><b>Token</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trToken} />
                    <label style={textStyles.text} ><b>Fee</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trAmount} />
                    <label style={textStyles.text} ><b>Type</b></label>
                    <TextField  id="outlined-required" variant="standard" lable="Required" value={trType} />
                    <label style={textStyles.text} ><b>Slots</b></label>
                    {/* <TextField  id="outlined-required" variant="standard" lable="Required" value={trSlots} />
                     */}
                     {
                        Object.keys(trSlots).length > 0 ? trSlots?.map(obj => <div  key={obj.sl_id}>{obj.sl_time} ({obj.tr_date})</div>) : "No slots available"
                     }
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleViewClose} style={textStyles.close}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
{/* <button onClick={handlee}>Click</button> */}
            <Dialog
        open={alert}
        // TransitionComponent={Transition}
        keepMounted
        onClose={Close}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign="center"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" className="bi bi-check2-circle" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
              </svg></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Record has been deleted!
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={textStyles.delete} onClick={Close}>OK</Button>
        </DialogActions>
      </Dialog>
        </ComponentSkeleton>

        // <div>
        //     <h1>ssssss</h1>
        // </div>
    );
}
