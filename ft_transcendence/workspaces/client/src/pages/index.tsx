import Intro from '../components/game/Intro'
import Chat from '../components/game/Chat'
import io from 'socket.io-client'
import { Button } from '@mantine/core';

const socket = io("http://localhost:3000");


function App() {

  // const test = () => {
  //   console.log("oug oug message");
  //   socket.emit('message', 'caca');
  // }

  // socket.on('message', ({data}) => {
  //   console.log(`receive back : ${data}`);

  // })

  return (
    <div className="container max-w-2xl mt-16">
      {/* <Header/> */}
      <Chat socket={socket} username={"Test"} room={"123"}/>
      {/* <Button onClick={test}></Button> */}
    </div>
  )
}
export default App;