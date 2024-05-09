import { useEffect, useState, useRef} from "react";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import RecentChatsComponent from "./chat/RecentChatsComponent";
import SweetAlert from "../../commons/SweetAlert";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import OnboardingHeader from "../../components/headers/OnboardingHeader";
import useAuth from "../../services/hooks/useAuth";
import RealTimeChatDefaultView  from "./chat/RealTimeChatDefaultView";
import RealTimeChatComponent  from "./chat/RealTimeChatComponent";
import {SearchUserModal} from "./chat/search/SearchUserModal";
import { Icon } from "@iconify/react";
import {BASE_URL} from "../../services/api/axiosConfig";

function ChatPage () {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [error, setError] = useState("");
    const { token, emailAddress } = useAuth();
    const [recipientData, setRecipientData] = useState({firstName: "", lastName: "", emailAddress: "", profilePicUrl: ""});
    const [recentCardIsClicked, setRecentCardIsClicked] = useState(false);
    const [recentChats, setRecentChats] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const axios = useAxiosWithAuth();
    const scrollableRef = useRef(null)


    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }


    const fetchRecentChats = async() => {
        try {
         const response = await axios.get("/user/chat/recent", {
              params: {
                  page: 0,
                  pageSize: 10
              }
          });
          console.log("response.status is  ", response.status);
          if (response.status === 200) {
            response.data.data?.length === 0 && setIsOpen(true);
            setRecentChats(response.data.data); // Assuming data is in the 'data' property
          } else {
            SweetAlert(response.data["message"], 'error')
          }
        } catch (error) {
          setError('Error fetching recent chats: ' + error.message);
        }
      };


    useEffect(() => {
        if (selected) {
          console.log('recentChats.length is', recentChats.length);
        if (recentChats.length  === 0){
            let firstChat = {
                chatMessageId: '',
                message: '',
                timeCreated: '',
                userEmail: emailAddress,
                senderEmail: '',
                recipientEmail: recipientData.emailAddress,
                otherUserFirstName: recipientData.firstName,
                otherUserLastName: recipientData.lastName,
                otherUserProfilePictureUrl: recipientData.profilePicUrl

            }
            setRecentChats(prev => [...prev, firstChat])
            setSelected(false);
            onClickRecentChartCard(firstChat);
        }else {
           const isPresent =  recentChats.some(rc => {
            console.log('rc.recipientEmail is', rc.recipientEmail);
            console.log('recipientData.email is ', recipientData.emailAddress);
            if (rc.recipientEmail === recipientData.emailAddress) {return true}});
           console.log('isPresent ', isPresent);
           if (!isPresent) {
            let addUser = {
                chatMessageId: '',
                message: '',
                timeCreated: '',
                userEmail: emailAddress,
                senderEmail: '',
                recipientEmail: recipientData.emailAddress,
                otherUserFirstName: recipientData.firstName,
                otherUserLastName: recipientData.lastName,
                otherUserProfilePictureUrl: recipientData.profilePicUrl

            }
            setRecentChats(prev => [...prev, addUser])
            setSelected(false);
            onClickRecentChartCard(addUser);
           }
        }
    }
    
    }, [selected])


    const fetchChatsWithUser = async (receiverEmail) => {
        try {
         const response = await axios.get("/user/chat-history", {
              params: {
                  otherUserEmail: receiverEmail,
                  page: 0,
                  pageSize: 30
              }
          });
          console.log("response.status is  ", response.status);
          if (response.status === 200) {
            console.log('Chat history fetched successfully:', response.data);
            setMessages(response.data.data); // Assuming data is in the 'data' property
          } else {
            console.error('Unexpected response status:', response.status);
            SweetAlert(response.data["message"], 'error')
          }
        } catch (error) {
          console.error('Error fetching chats:', error);
          setError('Error fetching chats: ' + error.message);
        }
        
      };

      const scrollToBottom = () => {
        setTimeout(() => {
          if (scrollableRef.current) {
            scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
          }
        }, 0);
      };
    
      // Effect to scroll to bottom whenever the content in the scrollable area updates
      useEffect(() => {
        scrollToBottom();
      }, [messages?.length])



      const connect = () => {
        let socket = new SockJS(`${BASE_URL}/mind_connect-ws`);
        let client = Stomp.over(socket);

        client.connect({Authorization: `Bearer ${token}`}, (frame) => {
            console.log('Connected ', frame);
            setStompClient(client);


        });

        const disconnect = () => {
            if (client && client.connected) {
                client.disconnect();
                alert('Disconnected. Refresh page.')
                console.log('Disconnected');
            }
        };
    
        return { disconnect };
    };

    const subscribe = () => {
        stompClient.subscribe('/user/private/chats', onMessageReceived)
      };

      const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body)
        setMessages(prevMessages => [...prevMessages, payloadData]);
        fetchRecentChats();
      }

      useEffect(() => {
            stompClient && subscribe();
    
        // Cleanup function
        return () => {
            // Disconnect from WebSocket
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [stompClient]);


      const onClickRecentChartCard = (chat) => {
        setIsOpen(false)
        setRecipientData({
            emailAddress: chat.recipientEmail === chat.userEmail ? chat.senderEmail : chat.recipientEmail,
            firstName: chat.otherUserFirstName,
            lastName: chat.otherUserLastName,
            profilePicUrl: chat.otherUserProfilePictureUrl
        });
        setRecentCardIsClicked(true);
        fetchChatsWithUser(chat.recipientEmail === chat.userEmail ? chat.senderEmail : chat.recipientEmail);
            // Set up WebSocket connection and message subscription
            connect();
            console.log('called!');
    }


    const sendMessage = () => {
        // fetchRecentChats();
        if (stompClient && messageInput.trim() !== '' && recipientData.emailAddress !== emailAddress) {

            stompClient.send("/app/chat", {}, JSON.stringify({
                recipientEmail: recipientData.emailAddress,
                senderEmail: emailAddress,
                message: messageInput
            }));
            setMessageInput('');
            setIsOpen(false);
        }
  };
    
    const handleMessageChange = (e) => {
        setMessageInput(e.target.value);

    }

    return (
      <>
      <div className="flex flex-col h-screen bg-slate-100">
    <OnboardingHeader />
    <div className="flex-1 flex overflow-y-auto mx-16">
    <div className="w-2/5 overflow-y-auto">
        <aside className="bg-white h-full">
            <div className="px-2 justify-around items-center gap-[250px] inline-flex pt-[10px]">
                <div className="text-gray-900 text-[32px] font-bold font-['Inter'] ps-12 leading-[44.80px] tracking-tight">
                    Messages
                </div>
                <Icon icon="ph:plus-bold" width={20} onClick={() => {console.log('clicked!'); toggleIsOpen()}} />
            </div>
            <div className="overflow-y-auto flex-1">
                <RecentChatsComponent 
                    onClick={onClickRecentChartCard}
                    recentChats={recentChats}
                    fetchRecentChats={fetchRecentChats}
                />
            </div>
        </aside>
    </div>
    <div className="w-3/5 flex flex-col relative px-6 bg-[#F9FAFB]">
    {/* <div className="w-3/5 px-8 overflow-y-auto bg-[#F9FAFB]"> */}
    <div  className="flex-1 overflow-y-auto overflow-x-hidden" ref={scrollableRef}>
        <div className="flex-col justify-start items-center gap-4 flex">
            {recentCardIsClicked ? (
                <>
                <div className="justify-around items-center gap-80 inline-flex pt-[10px]">
                    <div className="py-[3px] justify-around items-center gap-8 flex">
                        <div className="ml-[-100px] text-gray-900 text-[32px] font-bold font-['Inter'] leading-[44.80px] tracking-tight">
                            {recipientData.firstName + ' ' + recipientData.lastName}
                        </div>
                        <div className="text-emerald-600 text-base font-normal font-['Inter'] leading-snug tracking-tight">
                            Active
                        </div>
                    </div>
                    <div className="w-6 h-6 relative bg-gray-300 rounded-sm "/>
                </div>
                <div className="w-[795px] h-0.5 relative bg-zinc-100"/>
                </>
            ) : null }
        </div>
        {!recentCardIsClicked ? (
            <RealTimeChatDefaultView />
        ) : (
            <RealTimeChatComponent messages={messages} currentUserEmail={emailAddress} />
        )}
        </div>
        {recentCardIsClicked ? (
            <div className="bg-white border-t border-gray-200 p-4 flex justify-around items-center gap-4">
            <input
              type="text"
              placeholder="Type a message"
              onChange={handleMessageChange}
              value={messageInput}
              className="w-4/5 p-3 border border-gray-300 rounded-l h-10"
            />
            <button
              className="w-1/5 px-4 py-3 bg-blue-600 text-white rounded-r h-10 flex items-center justify-center"
              onClick={() => {
                console.log("Send button clicked!");
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        ) : null }
        <div></div>
    </div>
    </div>
</div>
{isOpen ?
    (<SearchUserModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setSelected={setSelected}
        setRecipientData={setRecipientData}
        recentChats={recentChats}
    />) : null}

  </>
        
    )


}
export default ChatPage;