import { Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router'

type PressdLogoProps = {
    size?: 'small' | 'medium' | 'large'
    showWordmark?: boolean
    to?: string
}

const sizeMap = {
    small: { icon: 20, text: '15px' },
    medium: { icon: 28, text: '20px' },
    large: { icon: 56, text: '34px' },
}

const PressdMark = ({ size }: { size: number }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="26" stroke="#C8A7FF" strokeWidth="2" />
            <circle
                cx="28"
                cy="28"
                r="17"
                stroke="#C8A7FF"
                strokeWidth="1.5"
                strokeOpacity="0.5"
            />
            <circle
                cx="28"
                cy="28"
                r="9"
                stroke="#C8A7FF"
                strokeWidth="1.5"
                strokeOpacity="0.3"
            />
            <circle cx="28" cy="28" r="3" fill="#C8A7FF" />
            <line
                x1="28"
                y1="28"
                x2="46"
                y2="12"
                stroke="#C8A7FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.7"
            />
            <circle cx="46.5" cy="11.5" r="2" fill="#C8A7FF" />
        </svg>
    )
}

export const PressdLogo = ({
    size = 'medium',
    showWordmark = true,
    to = '/',
}: PressdLogoProps) => {
    const selected = sizeMap[size]
    return (
        <Link to={to}>
            <Flex alignItems="center" gap="10px">
                <PressdMark size={selected.icon} />
                {showWordmark && (
                    <Text
                        fontSize={selected.text}
                        fontWeight="500"
                        letterSpacing="-0.03em"
                        color="var(--pressd-text)"
                    >
                        pressd
                    </Text>
                )}
            </Flex>
        </Link>
    )
}

