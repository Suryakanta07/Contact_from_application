import React, {useEffect, useState} from "react";
import { Formik } from 'formik'
import * as Yup from 'yup';
import {
    TextField,
    FormControl,
    Button
  } from '@material-ui/core';


const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    emailAddress: '',
    password: ''
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    lastName: Yup.string().required('Last name is required').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    userName: Yup.string().required('user name is required').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    emailAddress: Yup.string().required('Email is required').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    password: Yup.string().required('password is required').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
})
function Main(){

 const [tableData, setTableData] = useState([])
 const [showFormValue, setShowFormValue] = useState(false);



 useEffect(()=> {
    setShowFormValue(true)
    if (!localStorage.getItem("formValue")){
        setTableData([]);
    }else{
        setTableData(JSON.parse(localStorage.getItem("formValue")))
    }

 },[]);





 //delete data in the table
 const handleDelete=(e,id)=>{
     e.preventDefault();
    const data = tableData.filter((value,index)=>index!==id);
    localStorage.setItem('formValue', JSON.stringify(data))
    console.log(id);
    setTableData(tableData.filter((value,index)=>index!==id))

 }
  


 const handleFormSubmit= (values) =>{
    console.log(values);
    const data = [...tableData, values ];
    localStorage.setItem('formValue', JSON.stringify(data));
    setShowFormValue(true);
    setTableData(data);
 }  

 return(
     <React.Fragment>
     <div className="container">
     <div className="row">
         <div className="col-sm-8">
       

              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values,  {resetForm}) => {
                 handleFormSubmit(values)
            resetForm({ values: ''})
                }}
              >
                {({
                  errors,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                }) => {
                    console.log(errors, 'errors')
                  return (
                    <form
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div>
                        <FormControl
                            component="fieldset"
                            style={{ width: '100%'}}
                        >
                            <TextField
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            error={Boolean(
                                touched.firstName && errors.firstName
                            )}
                            helperText={
                                touched.firstName && errors.firstName
                            }
                            value={values.firstName}
                            style={{ margin: '20px 0 0 0' }}
                            />

                            <TextField
                            label="Last Name"
                            variant="outlined"
                            name="lastName"
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            error={Boolean(
                                touched.lastName && errors.lastName
                            )}
                            helperText={
                                touched.lastName && errors.lastName
                            }
                            value={values.lastName}
                            style={{ margin: '20px 0 0 0' }}
                            />

                             <TextField
                            label="UserName"
                            variant="outlined"
                            name="userName"
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            error={Boolean(
                                touched.userName && errors.userName
                            )}
                            helperText={
                                touched.userName && errors.userName
                            }
                            value={values.userName}
                            style={{ margin: '20px 0 0 0' }}
                            />

                             <TextField
                            label="EmailAddress"
                            variant="outlined"
                            name="emailAddress"
                            onChange={handleChange}
                            error={Boolean(
                                touched.emailAddress && errors.emailAddress
                            )}
                            helperText={
                                touched.emailAddress && errors.emailAddress
                            }
                            value={values.emailAddress}
                            style={{ margin: '20px 0 0 0' }}
                            />

                            <TextField
                            label="Password"
                            variant="outlined"
                            name= "password"
                            onChange={handleChange}
                            error={Boolean(
                                touched.password && errors.password
                            )}
                            helperText={
                                touched.password && errors.password
                            }
                            value={values.password}
                            style={{ margin: '20px 0 0 0' }}
                            />
                        </FormControl>

                        <Button type="submit" ><span className="button">Submit</span></Button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
         </div>
     </div>
    </div>
   
   { showFormValue && tableData.length > 0 ? (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
    
      <table border={4} width= "50%" cellPadding={10}>

        <tbody>
            <tr>
                <td>SL NO</td>
                <td>FirstName</td>
                <td>LastName</td>
                <td>UserName</td>
                <td>EmailAddress</td>
                <td>Action</td>
                {/* <td>Password</td> */}
            </tr>
                {
                    tableData.map((tableData, i) =>{
                        console.log(tableData)
                        return (
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{tableData.firstName}</td>
                                    <td>{tableData.lastName}</td>
                                    <td>{tableData.userName}</td>
                                    <td>{tableData.emailAddress}</td>
                                    <td className="button1" onClick={(e)=>handleDelete(e,i)}>Delete</td>
                                    {/* <td>{tableData.password}</td> */}
                                </tr>
                            )
                        }
                    )
                }

        </tbody>
      </table>


 </div>): null}

     </React.Fragment>
 );
}
export default Main;