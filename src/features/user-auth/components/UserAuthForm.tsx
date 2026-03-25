import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { useUserAuthForm } from '@/features/user-auth/hooks/useUserAuthForm'
import UserAuthFormField from '@/features/user-auth/components/UserAuthFormField'
import {
    emailRules,
    usernameRules,
    passwordRules,
} from '@/features/user-auth/data/user-auth.validation'

type UserAuthFormProps = {
    isCreateAccount: boolean
}

const UserAuthForm = ({ isCreateAccount }: UserAuthFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        onSubmit,
        authError,
        isLoading,
    } = useUserAuthForm(isCreateAccount)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                direction="column"
                alignItems="stretch"
                maxW="460px"
                mx="auto"
                mt={{ base: '28px', md: '56px' }}
                p={{ base: '18px', md: '28px' }}
                bg="var(--pressd-surface)"
                border="1px solid var(--pressd-border)"
                borderRadius="16px"
            >
                <Text
                    className="pressd-mono"
                    fontSize="10px"
                    mb="8px"
                    color="var(--pressd-text-muted)"
                >
                    {isCreateAccount ? 'Create account' : 'Sign in'}
                </Text>
                <Text
                    fontSize="26px"
                    fontWeight="500"
                    letterSpacing="-0.02em"
                    lineHeight="1.15"
                >
                    {isCreateAccount
                        ? 'Start your listening log.'
                        : 'Welcome back!'}
                </Text>
                <Text fontSize="14px" color="var(--pressd-text-sub)" mt="8px">
                    Track plays, rate records, and keep your music history in
                    one place.
                </Text>
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
                <Box padding="16px 0 8px 0">
                    <Text
                        asChild
                        fontSize="12px"
                        color="var(--pressd-text-muted)"
                        _hover={{ color: 'var(--pressd-accent)' }}
                    >
                        <Link to={isCreateAccount ? '/signin' : '/signup'}>
                            {isCreateAccount
                                ? 'Already have an account? Sign in here'
                                : "Don't have an account? Sign up here"}
                        </Link>
                    </Text>
                </Box>
                {authError && (
                    <Text fontSize="13px" color="var(--pressd-red)" pb="8px">
                        {authError}
                    </Text>
                )}
                <Button
                    loading={isLoading}
                    mb="4px"
                    type="submit"
                    bg="var(--pressd-accent)"
                    color="var(--pressd-bg)"
                    borderRadius="999px"
                    fontWeight="600"
                    _hover={{
                        bg: 'var(--pressd-accent-dim)',
                        color: 'var(--pressd-text)',
                    }}
                >
                    Submit
                </Button>
            </Flex>
        </form>
    )
}
export default UserAuthForm
