import React, {useState} from 'react';
import "./Login.css";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {UserState} from "../../redux/reducers/user";
import {Password} from "primereact/password";
import {auth} from "../../api/openApi";
import {UserDto} from "../../dto/UserDto";

type Props = {
    user: UserState
    userLogInSuccess: (user: UserDto) => void
}

const Login: React.FC<Props> = ({user, userLogInSuccess}) => {
    const [username, setUsername] = useState<string>(user.username);
    const [password, setPassword] = useState<string>("");

    const onHide = () => {
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        auth(username, password)
            .then(userLogInSuccess)
            .catch(reason => {
            });
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
                               className="p-d-block"
                               value={username}
                               onChange={(e) => setUsername((e.target as any).value.trim())}
                               placeholder="Username"
                               required={true}
                               minLength={3}/>
                </div>
                <div className="p-field">
                    <label htmlFor="password" className="p-d-block">Password</label>
                    <Password id="password"
                              className="p-d-block"
                              value={password}
                              onChange={(e) => setPassword((e.target as any).value.trim())}
                              placeholder="Password"
                              required={true}
                              minLength={8}/>
                </div>
                <Button type="submit" label="Login"/>
            </form>
        </Dialog>
    );
}

export default Login;