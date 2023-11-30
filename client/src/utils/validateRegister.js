export const validateRegister = (email, password, confirmPassword) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const match = email.match(regex);
    let isValid = Boolean;
    let message = '';

    if (!match) {
        isValid = false;
        message = 'Invalid email';    
    }

    if (password !== confirmPassword) {
        isValid = false;
        message = 'Password missmatch';
    }

    return {
        isValid,
        message
    }
}