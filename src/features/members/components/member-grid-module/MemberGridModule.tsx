import { Avatar, Box, Flex, Grid, Heading, Link, Skeleton, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import type { MemberCardItem } from '@/features/members/types/members'

type MemberGridModuleProps = {
    items: MemberCardItem[]
    headerText: string
    linkText?: string
    moreHref?: string
    isLoading?: boolean
}

export const MemberGridModule = ({
    items,
    headerText,
    linkText,
    moreHref,
    isLoading = false,
}: MemberGridModuleProps) => {
    return (
    <Box as="section" w="100%">
        <Flex
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid var(--pressd-border)"
            pb="10px"
            mb="12px"
        >
            <Heading
                size="md"
                textTransform="uppercase"
                className="pressd-mono"
                letterSpacing="0.08em"
                fontSize="11px"
                color="var(--pressd-text-muted)"
            >
                {headerText}
            </Heading>
            {linkText && moreHref && (
                <Link
                    asChild
                    fontSize="11px"
                    textTransform="uppercase"
                    color="var(--pressd-text-muted)"
                    _hover={{ color: 'var(--pressd-accent)' }}
                >
                    <RouterLink to={moreHref}>{linkText}</RouterLink>
                </Link>
            )}
        </Flex>

        <Grid
            templateColumns={{
                base: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                md: 'repeat(4, minmax(0, 1fr))',
                lg: 'repeat(6, minmax(0, 1fr))',
            }}
            gap="4"
            pb="2"
            w="100%"
        >
            {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                      <Flex key={i} direction="column" align="center" gap="2">
                          <Skeleton
                              width="110px"
                              height="110px"
                              borderRadius="9999px"
                          />
                          <Skeleton height="14px" width="70px" borderRadius="4px" />
                          <Skeleton height="12px" width="50px" borderRadius="4px" />
                      </Flex>
                  ))
                : items.map((item) => (
                      <Link
                          key={item.id}
                          asChild
                          _hover={{ textDecoration: 'none' }}
                      >
                          <RouterLink to={`/profile/${item.username}`}>
                              <Flex direction="column" align="center" gap="2">
                                  <Avatar.Root
                                      style={{ width: '110px', height: '110px' }}
                                  >
                                      {item.avatar_url ? (
                                          <Avatar.Image src={item.avatar_url} />
                                      ) : null}
                                      <Avatar.Fallback
                                          bg="var(--pressd-surface-2)"
                                          color="var(--pressd-text-muted)"
                                          fontSize="18px"
                                          className="pressd-mono"
                                      >
                                          {item.username.slice(0, 2).toUpperCase()}
                                      </Avatar.Fallback>
                                  </Avatar.Root>
                                  <Text
                                      fontWeight="500"
                                      fontSize="sm"
                                      color="var(--pressd-text)"
                                      textAlign="center"
                                      lineClamp={1}
                                  >
                                      {item.display_name ?? item.username}
                                  </Text>
                                  <Text
                                      fontSize="xs"
                                      color="var(--pressd-text-muted)"
                                      textAlign="center"
                                  >
                                      {item.follower_count.toLocaleString()} followers
                                  </Text>
                              </Flex>
                          </RouterLink>
                      </Link>
                  ))}
        </Grid>
    </Box>
    )
}
