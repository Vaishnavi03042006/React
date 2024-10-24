// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button, Paper } from '@mui/material';

// const ChatbotPage = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: input, user: true },
//         { text: `Response to: ${input}`, user: false }, 
//       ]);
//       setInput('');
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ marginTop: 4 }}>
//       <Typography variant="h4" align="center" mb={3}>Chatbot</Typography>
//       <Paper elevation={3} sx={{ padding: 2, maxHeight: '400px', overflowY: 'auto' }}>
//         {messages.map((msg, index) => (
//           <Typography key={index} align={msg.user ? 'right' : 'left'}>
//             <strong>{msg.user ? 'You:' : 'Bot:'}</strong> {msg.text}
//           </Typography>
//         ))}
//       </Paper>
//       <TextField
//         fullWidth
//         variant="outlined"
//         label="Type your message..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//         sx={{ marginTop: 2 }}
//       />
//       <Button
//         variant="contained"
//         onClick={handleSend}
//         sx={{ marginTop: 2, width: '100%' }}
//       >
//         Send
//       </Button>
//     </Container>
//   );
// };

// export default ChatbotPage;
// import React, { useState } from 'react';
// import axios from 'axios';

// const ChatbotPage = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (event) => {
//     setQuestion(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setAnswer(''); // Clear previous answer
//     setLoading(true); // Set loading state

//     try {
//       const response = await axios.post(
//         'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDU0_k5IFwa7oZPnvIhutPS28KmjI2W7WY', // Replace with your API key
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: question
//                 },
//               ],
//             },
//           ],
//         }
//       );

//       console.log(response); // Log the entire response for debugging

//       const responseData = response;
//       setAnswer(responseData.data.candidates[0].content.parts[0].text || 'No answer found.');
//     } catch (error) {
//       console.error('API error:', error); // Log the error details
//       setAnswer(`Error: ${error.response?.data?.error?.message || error.message}`);
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div>
//       <h1>Chatbot</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={question}
//           onChange={handleInputChange}
//           placeholder="Ask a question..."
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Sending...' : 'Send'}
//         </button>
//       </form>
//       {answer && (
//         <div>
//           <h2>Answer:</h2>
//           <p>{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotPage;
import React, { useState } from 'react';
import axios from 'axios';

const ChatbotPage = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: question, type: 'user' },
    ]);
    setQuestion('');

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDU0_k5IFwa7oZPnvIhutPS28KmjI2W7WY', // Replace with your API key
        {
          contents: [
            {
              parts: [
                {
                  text: question,
                },
              ],
            },
          ],
        }
      );

      const responseData = response;
      const answerText = responseData.data.candidates[0].content.parts[0].text || 'No answer found.';

      // Add the chatbot's response to the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: answerText, type: 'bot' },
      ]);
    } catch (error) {
      console.error('API error:', error); // Log the error details
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Error: ${error.response?.data?.error?.message || error.message}`, type: 'bot' },
      ]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    title: {
      textAlign: 'center',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
    },
    messagesContainer: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    message: {
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
      maxWidth: '80%',
    },
    userMessage: {
      backgroundColor: '#e7f3ff',
      color: '#0056b3',
      alignSelf: 'flex-end',
    },
    botMessage: {
      backgroundColor: '#d1e7dd',
      color: '#0f5132',
      alignSelf: 'flex-start',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chatbot</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          required
          style={styles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.type === 'user' ? styles.userMessage : styles.botMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotPage;
