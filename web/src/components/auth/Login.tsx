import React, {useEffect, useState} from 'react';
import "./Login.css";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {createUser, getCurrentUser, login} from "../../api/openApi";
import {UserDto} from "@skill-test/data/dto/UserDto";
import {SelectButton} from "primereact/selectbutton";
import dataStore from "../../api/dataStore";

type Props = {
    userLogInSuccess: (user: UserDto) => void
}

const Login: React.FC<Props> = ({userLogInSuccess}) => {
    const [userNotFound, setUserNotFound] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const logIn = "Log In";
    const signUp = "Sign Up";
    const modes = [logIn, signUp];
    const [mode, setMode] = useState<string>(logIn);
    const [usernameError, setUsernameError] = useState<string>("");

    const setUser = (user: UserDto): void => {
        dataStore.setUser(user);
        userLogInSuccess(user);
        setUserNotFound(false);
    };

    useEffect(() => {
        const user = dataStore.getUser();
        if (user) {
            userLogInSuccess(user);
        } else {
            getCurrentUser()
                .then(setUser)
                .catch(reason => setUserNotFound(true));
        }
    }, []);

    const onHide = () => {
    };

    const doLogin = (username: string, password: string): void => {
        login(username, password)
            .then(setUser)
            .catch(console.error);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (usernameError) setUsernameError("");

        if (mode === signUp) {
            if (password === confirmPassword) {
                createUser(username, password)
                    .then(user => {
                        doLogin(username, password);
                    })
                    .catch(reason => setUsernameError(reason.message));
            }
        } else {
            doLogin(username, password);
        }
    };

    const header = () => {
        return <SelectButton value={mode} options={modes} onChange={(e) => setMode(e.value)}/>;
    }

    const notSamePassword = mode === signUp && password !== confirmPassword;
    return (
        <Dialog className="Login"
                header={header}
                visible={userNotFound}
                onHide={onHide}
                closable={false}>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="username" className="p-d-block">Username</label>
                    <InputText id="username"
                               aria-describedby="username-help"
                               className={`p-d-block ${usernameError ? "p-invalid" : ""}`}
                               value={username}
                               onChange={(e) => setUsername((e.target as any).value.trim())}
                               placeholder="Username"
                               required={true}
                               minLength={3}/>
                    {
                        usernameError ? <small id="username-help" className="p-error">{usernameError}</small> : null
                    }
                </div>
                <div className="p-field">
                    <label htmlFor="password" className="p-d-block">Password</label>
                    <Password id="password"
                              className={`p-d-block ${notSamePassword ? "p-invalid" : "p-valid"}`}
                              value={password}
                              onChange={(e) => setPassword((e.target as any).value.trim())}
                              placeholder="Password"
                              required={true}
                              minLength={8}
                              feedback={false}/>
                </div>
                {
                    mode === signUp ?
                        <div className="p-field">
                            <label htmlFor="confirmPassword" className="p-d-block">Confirm password</label>
                            <Password id="confirmPassword"
                                      className={`p-d-block ${notSamePassword ? "p-invalid" : "p-valid"}`}
                                      value={confirmPassword}
                                      onChange={(e) => setConfirmPassword((e.target as any).value.trim())}
                                      placeholder="Confirm password"
                                      required={true}
                                      minLength={8}
                                      feedback={false}/>
                        </div>
                        : null
                }
                {
                    mode === signUp ?
                        <Button type="submit" label={signUp} className="sign-up"/>
                        : <Button type="submit" label={logIn} className="log-in"/>
                }
            </form>
        </Dialog>
    );
}

export default Login;