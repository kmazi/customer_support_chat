import '../App.css';
import { Button } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { Box } from '@chakra-ui/react'

function Home() {
    return (
        <Box bg='#d6f1f8' w='100%' p={4} color='rgb(22, 22, 87)'>
            <header className="App-header">
                <h2>Branch Customer Agent Chat</h2>
                <HStack>
                    <Link to={"customer/room"}>
                        <Button colorScheme='blue'>Customer Chat Room</Button>
                    </Link>
                    <Link to={"agent/room"}>
                        <Button colorScheme='blue'>Agent Console</Button>
                    </Link>
                </HStack>
            </header>
        </Box> 
    );
}
  
export default Home;