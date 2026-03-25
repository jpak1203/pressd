import { Field, Input } from '@chakra-ui/react'
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form'

type UserAuthFormFieldType = {
    label: string
    placeholder?: string
    registration: UseFormRegisterReturn
    type: 'email' | 'password' | 'text'
    error?: FieldError
}

const UserAuthFormField = ({
    label,
    placeholder,
    registration,
    type,
    error,
}: UserAuthFormFieldType) => {
    return (
        <Field.Root width="100%" pt="16px" invalid={!!error}>
            <Field.Label color="var(--pressd-text-sub)" fontSize="13px">
                {label}
            </Field.Label>
            <Input
                variant="outline"
                bg="var(--pressd-surface-2)"
                borderColor="var(--pressd-border)"
                color="var(--pressd-text)"
                _focusVisible={{
                    borderColor: 'var(--pressd-accent)',
                    boxShadow: '0 0 0 1px var(--pressd-accent)',
                }}
                placeholder={placeholder}
                type={type}
                {...registration}
            />
            <Field.ErrorText color="var(--pressd-red)">
                {error?.message}
            </Field.ErrorText>
        </Field.Root>
    )
}

export default UserAuthFormField
