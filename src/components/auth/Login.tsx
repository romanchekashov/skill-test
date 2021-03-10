import React, {useState} from 'react';
import "./Login.css";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {UserState} from "../../redux/reducers/user";

type Props = {
    user: UserState
    userLogIn: (username: string) => void
}

const Login: React.FC<Props> = ({user, userLogIn}) => {
    const [username, setUsername] = useState<string>(user.username);

    const onHide = () => {
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        userLogIn(username);
    };

    return (
        <Dialog className="Login" header="Login"
                visible={!user.user}
                onHide={onHide}
                closable={false}>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="username1" className="p-d-block">Username</label>
                    <InputText id="username1"
                               aria-describedby="username1-help"
                               className="p-d-block"
                               value={username}
                               onChange={(e) => setUsername((e.target as any).value.trim())}
                               placeholder="Username"
                               required={true}
                               minLength={3}/>
                    <small id="username1-help" className="p-d-block">Enter your username to log in.</small>
                </div>
                <Button type="submit" label="Login"/>
            </form>
        </Dialog>
    );
}

export default Login;