import type { UseFormWatch } from 'react-hook-form';
import type { Inputs } from '@/features/user-auth/types/user-auth';

const passwordPattern =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const emailRules = {
	required: {
		value: true,
		message: 'This field is required',
	},
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		message: 'Please enter a valid email',
	},
};

export const usernameRules = {
	required: {
		value: true,
		message: 'This field is required',
	},
};

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
};
