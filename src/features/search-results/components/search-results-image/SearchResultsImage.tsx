import { Center, Image } from '@chakra-ui/react'

const SearchResultsImage = ({
    image,
    title,
}: {
    image: string | null
    title: string
}) => {
    if (!image) {
        return (
            <Center
                w="56px"
                h="56px"
                borderRadius="8px"
                border="1px solid var(--pressd-border)"
                bg="var(--pressd-surface-2)"
                color="var(--pressd-text-muted)"
                fontSize="10px"
                className="pressd-mono"
            >
                no art
            </Center>
        )
    }

    return (
        <Image
            src={image}
            alt={`${title} artwork`}
            w="56px"
            h="56px"
            objectFit="cover"
            borderRadius="8px"
            border="1px solid var(--pressd-border)"
        />
    )
}

export default SearchResultsImage
