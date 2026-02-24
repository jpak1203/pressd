import { Box, Flex, Button, Text } from '@chakra-ui/react';
import RouterLink from '@/components/router-link/RouterLink';
import { useUserAuthForm } from '@/features/user-auth/hooks/useUserAuthForm';
import UserAuthFormField from '@/features/user-auth/components/UserAuthFormField';
import {
	emailRules,
	usernameRules,
	passwordRules,
} from '@/features/user-auth/data/userAuth.validation';

type FormType = {
	isCreateAccount: boolean;
};

const UserAuthForm = ({ isCreateAccount }: FormType) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		onSubmit,
		authError,
		isLoading,
	} = useUserAuthForm(isCreateAccount);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" alignItems="center">
				<UserAuthFormField
					label="Email"
					registration={register('email', emailRules)}
					type="email"
					error={errors.email}
				/>
				{isCreateAccount && (
					<UserAuthFormField
						label="Username"
						registration={register('username', usernameRules)}
						type="text"
						error={errors.username}
					/>
				)}
				<UserAuthFormField
					label="Password"
					registration={register('password', passwordRules)}
					type="password"
					error={errors.password}
				/>
				<Box padding="12px 24px">
					<RouterLink
						variant={undefined}
						color="red"
						slug={isCreateAccount ? '/signin' : '/signup'}
					>
						<Text textStyle="sm">
							{isCreateAccount
								? 'Already have an account? Sign in here'
								: "Don't have an account? Sign up here"}
						</Text>
					</RouterLink>
				</Box>
				{authError && (
					<Text textStyle="sm" color="#f87171" pb="8px">
						{authError}
					</Text>
				)}
				<Button loading={isLoading} mb="24px" type="submit">
					Submit
				</Button>
			</Flex>
		</form>
	);
};
export default UserAuthForm;
