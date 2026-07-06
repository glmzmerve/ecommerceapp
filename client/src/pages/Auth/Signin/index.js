import React from 'react'
import {flexbox,Box,Heading,FormControl,FormLabel, Flex, Input,Button,Alert} from '@chakra-ui/react'
import {useFormik} from 'formik'
import validation from './validations'
import { fetchLogin } from '../../../api'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";
function Signin() {

    const { login } = useAuth()
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
          
        },
        validationSchema: validation,
        onSubmit: async (values,bag) => {

            try {
                const loginResponse = await fetchLogin({email: values.email, password: values.password})
                console.log(loginResponse)
                login(loginResponse)
                navigate("/profile"); 
            } catch (error) {
            bag.setErrors({general: error.response.data.message});
            }
        }
    });

  return (
    <div>
     <Flex align="center" justify="center" width="full">
       <Box pt={10}>
        <Box textAlign="center">
         <Heading >
           Sign In
         </Heading>
        </Box>
           <Box my={5}>{
            formik.errors.general && (
                <Alert status='error'>
                    {formik.errors.general}
                </Alert>
            )
        }
            
           </Box> 
            <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} placeholder="Enter your email"  />
            </FormControl>
            <FormControl mt="4">
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password} placeholder="Enter your password" />

            </FormControl>
            
            <Button mt="4" width="full" type="submit">

            Sign In

            </Button>

            </form>
            </Box>
              </Box>      
                
                </Flex>
                </div>
            )
            }

export default Signin
