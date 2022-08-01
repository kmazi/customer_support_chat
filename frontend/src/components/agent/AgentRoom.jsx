import React, { Component } from "react";
import '../../App.css';
import { Flex, Spacer } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import CreateUser from "./user/CreateUser";
import ViewUser from "./user/ViewUsers";


class AgentRoom extends Component {
    render() {
        return (
            <Flex padding='20px' minHeight='100vh' color='rgb(22, 22, 87)' bg='#d6f1f8'>
                <CreateUser/>
                <Spacer />
                <ViewUser/>
                <Spacer />
                <Box bg='#f7fbfc'>
                    Box 3
                </Box>
                <Spacer />
                <Box bg='#f7fbfc'>
                    Box 4
                </Box>
            </Flex>
        );
    }
}
  
  export default AgentRoom;