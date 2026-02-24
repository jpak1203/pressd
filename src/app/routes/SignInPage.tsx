import React from 'react';
import UserAuthForm from '@/features/user-auth/components/UserAuthForm';

const CreateAccountPage = () => {
	return <UserAuthForm isCreateAccount={false} />;
};

export default CreateAccountPage;
