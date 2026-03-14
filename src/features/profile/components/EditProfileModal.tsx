import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEditProfile } from "../hooks/useEditProfile";
import type { ProfileData } from "../types/profile";

type EditProfileModalProps = {
  profile: ProfileData;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

const EditProfileModal = ({
  profile,
  open,
  onClose,
  onSaved,
}: EditProfileModalProps) => {
  const [bio, setBio] = useState(profile.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");

  // Reset form from current profile whenever the dialog opens (e.g. after cancel)
  useEffect(() => {
    if (open) {
      setBio(profile.bio ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
    }
  }, [open, profile.bio, profile.avatar_url]);

  const { save, isSubmitting, error } = useEditProfile(profile.id, () => {
    onSaved();
    onClose();
  });

  const handleSave = () => {
    void save({ bio, avatar_url: avatarUrl });
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <Dialog.Positioner>
        <Dialog.Content
          bg="var(--pressd-surface)"
          border="1px solid var(--pressd-border)"
          borderRadius="16px"
          p="6"
          maxW="480px"
          w="90vw"
        >
          <Flex justify="space-between" align="center" mb="5">
            <Text
              className="pressd-mono"
              fontSize="10px"
              color="var(--pressd-accent)"
              letterSpacing="0.14em"
            >
              EDIT PROFILE
            </Text>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="var(--pressd-text-muted)" />
            </Dialog.CloseTrigger>
          </Flex>

          <VStack gap="4" align="stretch">
            <Box>
              <Text
                fontSize="12px"
                color="var(--pressd-text-muted)"
                mb="1.5"
                className="pressd-mono"
              >
                BIO
              </Text>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                bg="var(--pressd-bg)"
                border="1px solid var(--pressd-border)"
                color="var(--pressd-text)"
                fontSize="14px"
                borderRadius="8px"
                rows={4}
                resize="vertical"
                _focus={{
                  borderColor: "var(--pressd-accent)",
                  outline: "none",
                }}
              />
            </Box>

            <Box>
              <Text
                fontSize="12px"
                color="var(--pressd-text-muted)"
                mb="1.5"
                className="pressd-mono"
              >
                AVATAR URL
              </Text>
              <Input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                bg="var(--pressd-bg)"
                border="1px solid var(--pressd-border)"
                color="var(--pressd-text)"
                fontSize="14px"
                borderRadius="8px"
                _focus={{
                  borderColor: "var(--pressd-accent)",
                  outline: "none",
                }}
              />
            </Box>

            {error && (
              <Text fontSize="13px" color="var(--pressd-red)">
                {error}
              </Text>
            )}

            <Flex gap="3" justify="flex-end" mt="2">
              <Button
                size="sm"
                onClick={onClose}
                border="1px solid var(--pressd-border)"
                backgroundColor="var(--pressd-surface-2)"
                color="var(--pressd-text-sub)"
                borderRadius="999px"
                fontSize="12px"
                className="pressd-mono"
                px="14px"
                _hover={{
                  color: "var(--pressd-text)",
                }}
              >
                cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSubmitting}
                bg="var(--pressd-accent)"
                color="var(--pressd-bg)"
                borderRadius="999px"
                fontSize="12px"
                className="pressd-mono"
                px="18px"
                _hover={{
                  bg: "var(--pressd-accent-dim)",
                  color: "var(--pressd-text)",
                }}
              >
                {isSubmitting ? "saving..." : "save"}
              </Button>
            </Flex>
          </VStack>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default EditProfileModal;
