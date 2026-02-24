import { Field, Input } from '@chakra-ui/react';
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form';

type UserAuthFormFieldType = {
	label: string;
	placeholder?: string;
	registration: UseFormRegisterReturn;
	type: 'email' | 'password' | 'text';
	error?: FieldError;
};

const UserAuthFormField = ({
	label,
	placeholder,
	registration,
	type,
	error,
}: UserAuthFormFieldType) => {
	return (
		<Field.Root width="50%" pt="24px" pr="24px" pl="24px" invalid={!!error}>
			<Field.Label>{label}</Field.Label>
			<Input
				variant="subtle"
				placeholder={placeholder}
				type={type}
				{...registration}
			/>
			<Field.ErrorText colorPalette="red">
				{error?.message}
			</Field.ErrorText>
		</Field.Root>
	);
};

export default UserAuthFormField;
