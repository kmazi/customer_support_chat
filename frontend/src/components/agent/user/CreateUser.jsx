import React, { Component } from "react";
import '../../../App.css';
import { Heading, Input, Button, Container, Box, FormControl,
    FormLabel} from '@chakra-ui/react'


class CreateUser extends Component {
    render() {
        return (
            <Box bg='#f7fbfc' w='30%' p={4} color='rgb(22, 22, 87)'>
                <Container>
                    <Heading as='h4'>Create User</Heading>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' />
                        <FormLabel>Phone</FormLabel>
                        <Input type='text' />
                        <Button colorScheme='blue'>Create User</Button>
                    </FormControl>
                </Container>
                
            </Box>
        );
    }
}
  
export default CreateUser;