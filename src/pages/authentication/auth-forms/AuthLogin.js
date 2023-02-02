import React, { useState,useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { Alert } from '../../../../node_modules/@mui/material/index';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [email,setEmail] = useState('');
    const [pass,setpass] = useState('');
    const [load,setload] = useState(false);
    const [open,setOpen] = useState(false);
    const setadmin = useRef("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClose = () =>{
        setOpen(false)
    }
    console.log("emaill",email);
    const HandleLogin = () => {
        if(email && pass){
            setload(true)
            var formdata = new FormData();
            formdata.append("email", email);
            formdata.append("pass", pass);
            
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow'
            };
            
            fetch("https://dashboard.weightlossondemand.com/backend/api/admin_login", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                if(result.status == 200){
                    localStorage.setItem("admin","admin");
                    setload(false)
                    console.log(localStorage.getItem('admin'));
                    if(localStorage.getItem('admin') != ""){
                        console.log("chala");
                        navigate('/trainer')
                    }
                }else{
                    setload(false)
                    setOpen(true)
                }
            })
              .catch(error => console.log('error', error));
        }else{
            setOpen(true)

        }
    }

    return (
        <>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                // validationSchema={Yup.object().shape({
                //     email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                //     password: Yup.string().max(255).required('Password is required') 
                // })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={(e) => {setEmail(e.target.value)}}
                                        placeholder="Enter email address"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={pass}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e)=>{setpass(e.target.value)}}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {/* <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="h6">Keep me sign in</Typography>}
                                    />
                                    <Link variant="h6" component={RouterLink} to="" color="text.primary">
                                        Forgot Password?
                                    </Link>
                                </Stack>
                            </Grid> */}
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        // color="success"
                                        style={{backgroundColor:"maroon"}}
                                        onClick={HandleLogin}
                                    >
                                        
                                        {load ?<CircularProgress disableShrink size="1.3rem" style={{color:"white"}}/>: 'Login'}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    {/* <Typography variant="caption"> Login with</Typography> */}
                                </Divider>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid> */}
                        </Grid>
                    </form>
                )}
            </Formik>
            <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       <DialogTitle textAlign="center"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg></DialogTitle>
       <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Invalid credentials &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{backgroundColor:"maroon", color:"white"}}>OK</Button>
        </DialogActions>
      </Dialog>
        </>
    );
};

export default AuthLogin;
