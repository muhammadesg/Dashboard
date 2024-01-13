import { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import './style.css';

const Chat = () => {
  const [username, setUserName] = useState('username');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showText, setShowtext] = useState(true);
  const [showAnimation, setShowanimation] = useState(true);
  let chunks = [];
  const [sendShow, setSendshow] = useState(false)
  const [audioShow, setAudioShow] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [read, setRead] = useState(false);

  // openChatFunction
  const OpenChat = () => {
    setChatOpen(!chatOpen);
  };

  // readMessagesfunction
  // const markMessageAsRead = async (messageId) => {
  //   console.log('MessageId:',messageId)
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/messagesid', {
  //       messageId: messageId,
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //     });
  
  //     console.log('Server Response:', response);
  
  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     setMessages((prevMessages) =>
  //       prevMessages.map((msg) =>
  //         msg.id === messageId ? { ...msg, read: true } : msg
  //       )
  //     );
  
  //     console.log('Message marked as read successfully');
  //   } catch (error) {
  //     console.error('Error marking message as read:', error);
  
  //     // Добавим вывод тела ответа, если оно есть
  //     if (error.response && error.response.data) {
  //       console.error('Response Data:', error.response.data);
  //     }
  //   }
  // };
  

  
  // startRecordingfunction
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
  
        setShowtext(false);
        setShowanimation(false)
  
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
            console.log('EventChunk:', chunks)
          }
        };
  
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          setIsRecording(false);
          // Очищаем локальный массив chunks
          chunks.length = 0;
        };
  
        recorder.start();
        setIsRecording(true);
        setMediaRecorder(recorder);
        console.log('EventChunk3:', chunks)
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };
  
  // stopRecordingfunction
  const stopRecording = () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
      }
      setAudioShow(false)
      setShowanimation(true)
      setSendshow(true)
  };

  // playAudiofunction
  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);
      console.log(audioElement)
      audioElement.play();
      setIsPlaying(true);
      
      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  };

  // deleteAudiofunction
  const deleteAudio = () => {
    setAudioBlob(null);
    setIsPlaying(false);
    setShowtext(true)
    setAudioShow(true)
    setSendshow(false)
  };

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  
  // sendFormfunction
  const submit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('message', message || '');
    formData.append('date', formattedDate);

    formData.append('read', false);
  
    if (audioBlob) {
      formData.append('audio', audioBlob, 'audio.wav');
    }
  
    if (image) {
      formData.append('image', image);
    }
  
    // Обновление messages с использованием функции обновления стейта
    setMessages((prevMessages) => [
      ...prevMessages,
      { username, message, date: formattedDate, image, audio: audioBlob, read: false, uuid: generateUUID() },
    ]);
    setMessage('');
    setShowtext(true);
  
    const imageInput = document.getElementById('imageInput');
    imageInput.value = '';
  
    const audioInput = document.getElementById('audioInput');
    audioInput.value = '';
    setImage([])
    setAudioShow(true)
    setSendshow(false)
    setAudioBlob(null)

    console.log('ImageValue:',image)
    console.log('MessageValue:',message)
    console.log('AudioValue:',audioShow)
  
    try {
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Опционально: завершить запись после отправки сообщения
      // stopRecording();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // onKeyDown
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // You can add additional logic here if needed
    }
  };
  

  // Pusher
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('bfff60d5708fda2d0873', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('chat');

    channel.bind('message', function (data) {
      if (data.username !== username) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      channel.unbind('message');
      pusher.unsubscribe('chat');
    };
  }, [username]);

  return (
    <>
      <div className="wrapper">
        <div className={chatOpen === true ? 'chat-box active' : 'chat-box'}>
          <div className="chat-head">
            <div className="chat__user-image">
              <i className="fas fa-solid fa-user"></i>
            </div>
            <div>
              <input
                placeholder="Username"
                type="text"
                className="input-user"
                required=""
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="chat-body">
            <div className="msg-insert">
              {messages.map((message, idx) => (
                <div key={idx} className={message.username === 'admin' ? 'msg-receive' : 'msg-send'}>
                  <div className="chat__name">
                    <p>{message.username}</p>
                    <p>{message.date.substring(12)}</p>
                  </div>

                  {message.image && (typeof message.image === 'string' || (message.image.type && message.image.type.includes('image'))) ? (
                    <div className="chat__image">
                      {message.image instanceof File ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/uploads/${message.image.name}`}
                          alt={`http://127.0.0.1:8000/storage/uploads/${message.image.name}`}
                          onError={(e) => {
                            e.target.src = `http://127.0.0.1:8000/storage/uploads/${message.image.name}?timestamp=${new Date().getTime()}`;
                          }}
                        />
                      ) : (
                        (() => {
                          const pathSegments = message.image.split('/');
                          const fileName = pathSegments[pathSegments.length - 1];

                          return <img src={`http://127.0.0.1:8000/storage/uploads/${fileName}`} alt="22" />;
                        })()
                      )}
                    </div>
                  ) : null}

                  <div className="chat__voice">
                    {message.audio && typeof message.audio === 'string' ? (
                      <audio controls>
                        <source src={`http://127.0.0.1:8000/storage/${message.audio}`} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : message.audio instanceof Blob ? (
                      <audio controls>
                        <source src={URL.createObjectURL(message.audio)} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : null}
                  </div>

                  <div className="chat__text">
                    <p>{message.message}</p>
                    {message.read && (
                      <span>
                        <i className="fas fa-check-circle"></i>
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {
                console.log(messages)
              }
            </div>
          </div>
          <div className="chat-text">
            <form className="chat__type" onSubmit={(e) => e.preventDefault()}>
              <label className={showText ? 'upload-btn active' : 'upload-btn'} htmlFor="imageInput">
                <i className="fas fa-regular fa-paperclip fa-rotate-180"></i>
              </label>
              <input
                className="input__image"
                id="imageInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
              />

              <div className={showAnimation ? 'loading active' : 'loading'}>
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <input
                className={showText ? 'input-style active' : 'input-style'}
                type="text"
                value={message}
                placeholder="Write message here..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              
              {isRecording ? (
                <button className={(message !== '' || (image && image.length !== 0) || (audioShow == false)) ? 'record' : 'stop-recording record active'} id="audioInput" onClick={stopRecording}>
                  <i className="fas fa-light fa-microphone-slash"></i>
                </button>
              ) : (
                <button
                  className={(message !== '' || (image && image.length !== 0) || (audioShow == false)) ? 'start-recording record' : 'start-recording record active'}
                  id="audioInput"
                  onClick={(e) => {
                    startRecording();
                  }}
                >
                  <i className="fas fa-light fa-microphone"></i>
                </button>
              )}

              {
                audioShow !== false ?
                (console.log('ImageValueTest:', image),
                console.log('MessageValue:', message),
                console.log('AudioValue:', audioShow)) : console.log(audioShow)            
              }

              <button onClick={(e) => submit(e)} className={(message !== '' || (image && image.length !== 0) || (sendShow == true)) ? 'send-active' : 'send'}>
                <i className="fas fa-solid fa-paper-plane"></i>
              </button>

              {audioBlob && (
                <>
                  <button onClick={playAudio} disabled={isPlaying}>
                    {isPlaying ? (<i className="fa-solid fa-pause"></i>) : (<i className="fas fa-solid fa-play"></i>)}
                  </button>
                  <button onClick={deleteAudio}><i className="fas fa-solid fa-trash"></i></button>
                  <div id="app">
                    <audio-player />
                  </div>
                </>
              )}


            </form>
          </div>
        </div>
      </div>
      <button className="chat-btn" onClick={OpenChat}>
        <i className="fas fa-thin fa-comments"></i>
      </button>
    </>
  );
};

export default Chat;
