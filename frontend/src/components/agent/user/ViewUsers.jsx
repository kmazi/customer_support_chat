import React, { Component } from "react";
import '../../../App.css';
import { Box, Heading, Container } from '@chakra-ui/react'


class ViewUser extends Component {
    render() {
        return (
            <Box bg='#f7fbfc' w='30%' p={4} color='rgb(22, 22, 87)'>
                <Container>
                    <Heading as='h3'>View User</Heading>
                </Container>
            </Box>
            
        );
    }
}
  
export default ViewUser;