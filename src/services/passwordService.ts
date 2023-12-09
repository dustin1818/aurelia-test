import * as toastr from 'toastr';
export class PasswordService {
    public password = "password";
    public confirmPassword = "confirmPassword";
    public checkPassword(password, confirmPassword) {
        if (password === confirmPassword) {
            toastr.success("Password Matched");
        } else {
            toastr.error("Password Not Matched");
        }
    }
}