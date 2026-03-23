import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatStyles } from './chatstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import SendIcon from '@mui/icons-material/Send';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';
import { getConversations, getMessages, sendMessage, markMessagesAsRead } from '../actions/messages';
import { getUsers } from '../actions/user';

const Chat = () => {
    const styles = new ChatStyles();
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('profile'))?.result;

    const { conversations, currentMessages } = useSelector((state) => state.messages);
    const users = useSelector((state) => state.user);

    const [activeUser, setActiveUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial Fetch
    useEffect(() => {
        dispatch(getConversations());
        dispatch(getUsers());
    }, [dispatch]);

    // Load messages when a user is selected and poll for live updates
    useEffect(() => {
        let interval;
        if (activeUser) {
            // Initial fetch on select
            dispatch(getMessages(activeUser._id));
            dispatch(markMessagesAsRead(activeUser._id));

            // Poll every 5 seconds to keep the active chat live
            interval = setInterval(() => {
                dispatch(getMessages(activeUser._id));
                dispatch(markMessagesAsRead(activeUser._id));
                dispatch(getConversations()); // Refresh sidebar snippet as well
            }, 5000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeUser, dispatch]);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && activeUser) {
            dispatch(sendMessage({ text: newMessage.trim(), receiverId: activeUser._id }));
            setNewMessage('');
            // Refresh conversation list occasionally to update snippet, but action will update currentMessages 
        }
    };

    const startNewChat = (user) => {
        setActiveUser(user);
        setIsNewChatModalOpen(false);
    };

    return (
        <div style={styles.container}>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
            <TopBar />
            <div style={{ display: 'flex', flex: 1, paddingTop: '64px' }}>
                <NavigationBar />
                <div style={styles.mainContent}>

                    <div style={styles.chatWrapper}>

                        {/* Sidebar */}
                        <div style={styles.sidebar}>
                            <div style={styles.sidebarHeader}>
                                <h1 style={styles.sidebarTitle}>Chats</h1>
                                <button
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1f2937' }}
                                    onClick={() => setIsNewChatModalOpen(true)}
                                >
                                    <AddCommentIcon />
                                </button>
                            </div>
                            <div style={styles.userList} className="hide-scrollbar">
                                {conversations.map((conv) => (
                                    <div
                                        key={conv.user._id}
                                        style={{
                                            ...styles.userItem,
                                            ...(activeUser?._id === conv.user._id ? styles.userItemActive : {})
                                        }}
                                        onClick={() => setActiveUser(conv.user)}
                                    >
                                        <div style={styles.avatar}>
                                            {conv.user.profilePicture ?
                                                <img src={conv.user.profilePicture} alt={conv.user.name} style={styles.avatarImg} /> :
                                                <PersonIcon />
                                            }
                                        </div>
                                        <div style={styles.userInfo}>
                                            <div style={styles.userName}>{conv.user.name} {conv.user.surname}</div>
                                            <div style={styles.userLastMessage}>
                                                {conv.lastMessage?.text || 'No messages yet'}
                                            </div>
                                        </div>
                                        {conv.unreadCount > 0 && activeUser?._id !== conv.user._id && (
                                            <span style={styles.unreadBadge}>{conv.unreadCount}</span>
                                        )}
                                    </div>
                                ))}
                                {conversations.length === 0 && (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                                        No active conversations.<br />Click the + icon to start chatting.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Chat Area */}
                        <div style={styles.chatWindow}>
                            {activeUser ? (
                                <>
                                    <div style={styles.chatHeader}>
                                        <div style={styles.avatar}>
                                            {activeUser.profilePicture ?
                                                <img src={activeUser.profilePicture} alt={activeUser.name} style={styles.avatarImg} /> :
                                                <PersonIcon />
                                            }
                                        </div>
                                        <h2 style={{ ...styles.sidebarTitle, marginLeft: '0.5rem' }}>
                                            {activeUser.name} {activeUser.surname}
                                        </h2>
                                    </div>

                                    <div style={styles.messagesArea} className="hide-scrollbar">
                                        {currentMessages.map((msg, index) => {
                                            const isMe = msg.sender === currentUser?._id;
                                            return (
                                                <div key={index} style={{
                                                    ...styles.messageBubble,
                                                    ...(isMe ? styles.messageSent : styles.messageReceived)
                                                }}>
                                                    {msg.text}
                                                    <span style={styles.messageTime}>
                                                        {moment(msg.createdAt).format('LT')}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    <form style={styles.inputArea} onSubmit={handleSendMessage}>
                                        <input
                                            style={styles.input}
                                            placeholder="Type a message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            autoFocus
                                        />
                                        <button type="submit" style={styles.sendButton} disabled={!newMessage.trim()}>
                                            <SendIcon style={{ fontSize: '1.2rem', marginLeft: '4px' }} />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div style={styles.emptyState}>
                                    <AddCommentIcon style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }} />
                                    <h2>Your Messages</h2>
                                    <p>Select a conversation or start a new one to chat.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* New Chat Modal */}
            {isNewChatModalOpen && (
                <div style={styles.modalOverlay} onClick={() => setIsNewChatModalOpen(false)}>
                    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                            <h2 style={{ margin: 0, color: '#1f2937' }}>New Chat</h2>
                            <CloseIcon style={{ cursor: 'pointer', color: '#6b7280' }} onClick={() => setIsNewChatModalOpen(false)} />
                        </div>
                        <div style={styles.userListModal}>
                            {Array.isArray(users) && users.filter(u => u._id !== currentUser?._id).map(u => (
                                <div
                                    key={u._id}
                                    style={{ ...styles.userItem, borderBottom: 'none' }}
                                    onClick={() => startNewChat(u)}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={styles.avatar}>
                                        {u.profilePicture ?
                                            <img src={u.profilePicture} alt={u.name} style={styles.avatarImg} /> :
                                            <PersonIcon />
                                        }
                                    </div>
                                    <div style={styles.userName}>{u.name} {u.surname}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
