export const validateRegister = (email, password, confirmPassword) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const match = email.match(regex);
    let isValid = Boolean;
    let message = [];

    if (!match) {
        isValid = false;
        message.push('Invalid email');    
    }

    if (password.length < 4) {
        isValid = false;
        message.push('Password must be atleast 4 characters long');
    }

    if (password !== confirmPassword) {
        isValid = false;
        message.push('Password missmatch');
    }

    return {
        isValid,
        message: message.join(', ')
    }
}