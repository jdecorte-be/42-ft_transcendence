import { Alert, Button, CloseButton, MultiSelect, Select, TextInput } from "@mantine/core";
import React, { useState} from 'react'
import { useEffect } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';


function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] =  useState("");
    const [messageList, setMessageList] =  useState([]);
    const [groupList, setGroupList] =  useState([]);
    const [showAddGroup, setShowAddGroup] =  useState(false);
    const [showChat, setShowChat] =  useState(false);
    const [selectValue, setSelectValue] = useState("");
    const [inputName, setInputName] = React.useState('')
    const [inputPassword, setInputPassword] = React.useState('')
    const [errorPassword, setErrorPassword] = React.useState('')
    



    const popAddGroup = () => {
        if(showAddGroup)
            setShowAddGroup(false);
        else
            setShowAddGroup(true);
    };

    const sendMsg = () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            socket.emit("chat.send", messageData);
        }
    };


    const newGroup = (name : string, privacy : string, password : string) => {
        if(name !== "") {
   
            console.log(`${name}  ${privacy} ${password}`)
            const data = {
                name : name,
                privacy : privacy,
                password : password ? password : null,
            };
            // return error if newgroup exist
            socket.emit("chat.newgroup", data);
            setGroupList((list) => [...list, data])
        }
    };

    useEffect(() => {
        socket.on("chat.receive", (data) => {
            console.log("Msg receive from client")
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);






    return (

            <div className="h-full">
                    {
                        showChat ?

                        <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
                        <header className="pt-6 pb-4 px-5 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center">
                                    <a className="inline-flex items-start mr-3" href="#0">
                                        <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                                    </a>
                                    <div className="pr-1">
                                        <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                            <h2 className="text-xl leading-snug font-bold">John Decorte</h2>
                                        </a>
                                        <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@jdecorte</a>
                                    </div>
                                </div>
                            </div>
                        </header>



                        <div className="chat-body">
                                {
                                    messageList.map((messageContent) => {
                                        return <h3>{ messageContent.message}    {messageContent.time}</h3>
                                    })
                                }
                            </div>
                            <div className="chat-footer">
                                <input 
                                    type="text"
                                    placeholder="Type here..."
                                    onChange={(event) => {
                                        setCurrentMessage(event.target.value);
                                    }}
                                />
                                <button onClick={sendMsg}>Send</button>
                            </div>
                       
                    </div>



                        :

                        showAddGroup ?
                        
                        <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
                            <header className="pt-6 pb-4 px-5 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                        <a className="inline-flex items-start mr-3" href="#0">
                                            <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                                        </a>
                                        <div className="pr-1">
                                            <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                                <h2 className="text-xl leading-snug font-bold">John Decorte</h2>
                                            </a>
                                            <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@jdecorte</a>
                                        </div>
                                    </div>
                                </div>
                            </header>



                            <div className="py-3 px-5">

                                <CloseButton onClick={popAddGroup} className="content-end" aria-label="Close modal" />
                                <TextInput
                                    label="Group Name:"
                                    placeholder="Your group name..."
                                    onChange={event => setInputName(event.target.value)}
                                />
                                <Select
                                    label="Type of group:"
                                    placeholder="Pick one"
                                    onChange={setSelectValue}
                                    data={[
                                        { value: 'public', label: 'Public' },
                                        { value: 'private', label: 'Private' },
                                        { value: 'protected', label: 'Protected' },
                                    ]}
                                />

                                <TextInput
                                    label="Password:"
                                    placeholder="Password..."
                                    onChange={event => setInputPassword(event.target.value)}
                                />


                            </div>
                            <button onClick={() => newGroup(inputName, selectValue,inputPassword)} className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                                <span>Create</span>
                            </button>
                        </div>

                        :
                        
                        <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
                            <header className="pt-6 pb-4 px-5 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                        <a className="inline-flex items-start mr-3" href="#0">
                                            <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                                        </a>
                                        <div className="pr-1">
                                            <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                                <h2 className="text-xl leading-snug font-bold">John Decorte</h2>
                                            </a>
                                            <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@jdecorte</a>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className="py-3 px-5">
                                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>
                                <div className="divide-y divide-gray-200">

                                    {
                                        groupList.map((data) => {

                                            return <button onClick={() => setShowChat(true)} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                                                        <div className="flex items-center">
                                                            <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg" width="32" height="32" alt="Marie Zulfikar" />
                                                            <div>
                                                                <h4 className="text-sm font-semibold text-gray-900">{data.name}</h4>
                                                            </div>
                                                        </div>
                                                    </button>
                                        })
                                    }
                                </div>
                            </div>
            
                            <button onClick={popAddGroup} className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                                <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                                    <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                                </svg>
                                <span>New Group</span>
                            </button>
                        </div>

                    }

                    

            </div>
        



    )
}
export default Chat;
function isStrongPassword(password: string) {
    throw new Error("Function not implemented.");
}

