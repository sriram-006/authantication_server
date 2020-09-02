import React, {useState} from 'react';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState(null);


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            if (password !== confirmPassword) {
                console.log('eror');
                throw new Error(`Pssword and confirm password didn'tmatch`);
            }            
            const resp = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            if (!resp.ok) {
                // a
            }
            const json = await resp.json();
            // resp.text()
            console.log('json');
            console.log(json);
        } catch(err) {
            setFormError(err.message);
        }
    }
    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" required />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" id="confirm-password" required />
                </div>
                {formError && <div>{formError}</div>}
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Signup;