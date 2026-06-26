const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

export const emailRules = {
    required: {
        value: true,
        message: 'This field is required',
    },
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Please enter a valid email',
    },
}

export const usernameRules = {
    required: {
        value: true,
        message: 'This field is required',
    },
    minLength: {
        value: 3,
        message: 'Username must be at least 3 characters',
    },
    maxLength: {
        value: 20,
        message: 'Username must be at most 20 characters',
    },
    pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: 'Use only letters, numbers, and underscores',
    },
}

export const passwordRules = {
    required: {
        value: true,
        message: 'This field is required',
    },
    minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
    },
    pattern: {
        value: passwordPattern,
        message:
            'Password must include at least one uppercase letter, one number, and one special character',
    },
}
