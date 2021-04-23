import { UserDto } from "@skill-test/data/dto/UserDto";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { SelectButton } from "primereact/selectbutton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataStore from "../../api/dataStore";
import { useAppDispatch } from "../../lib/hooks";
import {
  createUser,
  loadCurrentUser,
  LoginDialogMode,
  loginUser,
  selectUser,
  showLogin,
  showSignup,
  closeLoginDialog,
} from "../../lib/slices/usersSlice";
import styles from "./Login.module.css";

type Props = {
  userLogInSuccess?: (user: UserDto) => void;
};

const Login: React.FC<Props> = ({ userLogInSuccess }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    user,
    userLoading,
    userLoginError,
    userLodingError,
    userCreateError,
    loginDialogMode,
  } = useSelector(selectUser);

  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const logIn = "Log In";
  const signUp = "Sign Up";
  const modes = [LoginDialogMode.logIn, LoginDialogMode.signUp];
  const [usernameError, setUsernameError] = useState<string>("");

  const setUser = (user: UserDto): void => {
    dataStore.setUser(user);
    // userLogInSuccess(user);
    setUserNotFound(false);
  };

  useEffect(() => {
    if (!user) dispatch(loadCurrentUser());
  }, [user]);

  useEffect(() => {
    if (userCreateError) setUsernameError(userCreateError);
  }, [userCreateError]);

  console.log(userLodingError, userNotFound);
  if (userLodingError && !userNotFound) {
    if (router.pathname !== "/") router.push("/");
    setUserNotFound(true);
  }

  if (userNotFound && user) setUserNotFound(false);

  const onHide = () => {
    dispatch(closeLoginDialog());
  };

  const doLogin = (username: string, password: string): void => {
    dispatch(loginUser({ username, password }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (usernameError) setUsernameError("");

    if (loginDialogMode === LoginDialogMode.signUp) {
      if (password === confirmPassword) {
        dispatch(createUser({ username, password })).then((data: any) => {
          if (!data.error) dispatch(loginUser({ username, password }));
        });
      }
    } else {
      doLogin(username, password);
    }
  };

  const header = () => {
    return (
      <SelectButton
        value={loginDialogMode || LoginDialogMode.logIn}
        options={modes}
        onChange={(e) => {
          if (LoginDialogMode.signUp === e.value) {
            dispatch(showSignup());
          } else {
            dispatch(showLogin());
          }
        }}
      />
    );
  };

  const isSignUp = loginDialogMode === LoginDialogMode.signUp;
  const notSamePassword = isSignUp && password !== confirmPassword;

  return (
    <Dialog
      className={styles.Login}
      header={header}
      visible={!!loginDialogMode}
      onHide={onHide}
      closable={true}
    >
      {userLoginError ? (
        <div className={styles.error}>{userLoginError}</div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="username" className="p-d-block">
            Username
          </label>
          <InputText
            id="username"
            aria-describedby="username-help"
            className={`p-d-block ${usernameError ? "p-invalid" : ""}`}
            value={username}
            onChange={(e) => setUsername((e.target as any).value.trim())}
            placeholder="Username"
            required={true}
            minLength={3}
          />
          {usernameError ? (
            <small id="username-help" className="p-error p-d-block">
              {usernameError}
            </small>
          ) : null}
        </div>
        <div className="p-field">
          <label htmlFor="password" className="p-d-block">
            Password
          </label>
          <Password
            id="password"
            className={`p-d-block ${notSamePassword ? "p-invalid" : "p-valid"}`}
            value={password}
            onChange={(e) => setPassword((e.target as any).value.trim())}
            placeholder="Password"
            required={true}
            minLength={8}
            feedback={false}
          />
        </div>
        {isSignUp ? (
          <div className="p-field">
            <label htmlFor="confirmPassword" className="p-d-block">
              Confirm password
            </label>
            <Password
              id="confirmPassword"
              className={`p-d-block ${
                notSamePassword ? "p-invalid" : "p-valid"
              }`}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword((e.target as any).value.trim())
              }
              placeholder="Confirm password"
              required={true}
              minLength={8}
              feedback={false}
            />
            {notSamePassword ? (
              <small id="confirmPassword" className="p-error p-d-block">
                Passwords should be same.
              </small>
            ) : null}
          </div>
        ) : null}
        {isSignUp ? (
          <Button type="submit" label={signUp} className="sign-up" />
        ) : (
          <Button type="submit" label={logIn} className="log-in" />
        )}
      </form>
    </Dialog>
  );
};

export default Login;
