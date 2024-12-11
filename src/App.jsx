import { useState } from 'react';
import axios from 'axios';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [headerData, setHeaderData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://chimpu.online/api/post.php', {
        phonenumber: phoneNumber,
      });

      setHeaderData(response.headers);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h1>Chimpu API Integration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>

      {headerData && (
        <div>
          <h2>Response Headers:</h2>
          <ul>
            {Object.entries(headerData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
