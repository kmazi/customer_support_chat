import React, { Component } from "react";
import '../../App.css';
import { Container } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'


class CustomerRoom extends Component {
    render() {
        return (
            <Box bg='#d6f1f8' w='100%' p={4} color='rgb(22, 22, 87)'>
                <Container>
                    There are many benefits to a joint design and development system. Not only
                    does it bring benefits to the design team, but it also brings benefits to
                    engineering teams. It makes sure that our experiences have a consistent look
                    and feel, not just in our design specs, but in production
                </Container>
            </Box>
            
        );
    }
}
  
export default CustomerRoom;