import { ChangePassword } from "./changePassword";
import { login } from "./login";

export interface changePasswordUser{
    user: login;
    changePassword: ChangePassword;
}