import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { Site } from "@dtos/site";
import useAuth from "@hooks/auth";
import api from "@utils/api";
import React, { useRef } from "react";
import { mutate } from "swr";

export default function RemoveSiteDialog({ siteId }: { siteId: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flag, setFlag] = useBoolean();
  const cancelRef = useRef();
  const { user } = useAuth();

  const handleDeleteSite = async () => {
    setFlag.toggle;
    await api.delete("/sites/delete", {
      data: { siteId },
      headers: { token: user.token },
      withCredentials: true,
    });

    await mutate(
      [`api/sites/${user.uid}`, user.token],
      async ({ sites }: { sites: Site[] }) => ({
        sites: sites.filter((site) => site.id !== siteId),
      }),
      false
    );

    onClose();
  };

  return (
    <>
      <Button
        colorScheme="green"
        variant="ghost"
        onClick={onOpen}
        ref={cancelRef}>
        Remove
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent mx={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Site
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteSite}
                ml={3}
                isLoading={flag}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
