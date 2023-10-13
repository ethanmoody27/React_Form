import { useState } from 'react';

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const result = await response.json();

            if (result.success) {
                if (result.data && result.data.username) {
                    setUsername(result.data.username);
                    setSuccessMessage(`Logged in as: ${result.data.username}`);
                    setError(null);
                } else {
                    setError("Username not found in response data.");
                }
            } else {
                setError(result.message);
                setUsername(null);
            }
        } catch (error) {
            setError(error.message);
            setUsername(null);
        }
    }

    return (
        <div>
            <h2>Authenticate</h2>
            <button onClick={handleClick}>Authenticate Token</button>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}
