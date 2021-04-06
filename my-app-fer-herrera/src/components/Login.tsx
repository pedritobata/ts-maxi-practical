import React, { useState } from 'react';

interface User {
    name: string;
    lastName: string;
    age: number;
}

const defaultUser: User = {
    name: 'Perico',
    lastName: 'Martinez',
    age: 45
}

const Login: React.FC = () => {

    const [user, setUser] = useState<User>(defaultUser);

    const handleClick = (): void => {

    }

    return (
        <div>
            <h2>Login User</h2>
            <button>Login</button>
            <pre>{JSON.stringify(user)}</pre>
        </div>
    )
}

export default Login;
