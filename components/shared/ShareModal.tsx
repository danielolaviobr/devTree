import React, { useMemo } from "react";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaCopy, FaShare, FaTwitter, FaWhatsapp } from "react-icons/fa";
import useAuth from "@hooks/auth";
import { TwitterShareButton, WhatsappShareButton } from "react-share";

export default function ShareModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const userLink = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_URL}/sites/${user?.uid}`;
  }, [user?.uid]);
  const { onCopy } = useClipboard(userLink);
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    onClose();
    toast({
      status: "success",
      title: "Link copied",
      duration: 1500,
      position: "top",
    });
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="green" rightIcon={<FaShare />}>
        Share
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Share your sites</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <Stack spacing={4}>
              <WhatsappShareButton
                url={userLink}
                title="Hey, checkout my DevTree page!">
                <Button
                  as="div"
                  w="100%"
                  colorScheme="whatsapp"
                  leftIcon={<FaWhatsapp size={24} />}
                  onClick={onClose}>
                  WhatsApp
                </Button>
              </WhatsappShareButton>
              <TwitterShareButton
                url={userLink}
                hashtags={["devTree", "devLife"]}>
                <Button
                  as="div"
                  w="100%"
                  colorScheme="twitter"
                  leftIcon={<FaTwitter size={24} />}
                  onClick={onClose}>
                  Twitter
                </Button>
              </TwitterShareButton>
              <Button
                colorScheme="green"
                leftIcon={<FaCopy size={20} />}
                onClick={handleCopy}>
                Copy
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
