import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { Site } from "@dtos/site";
import useAuth from "@hooks/auth";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import api from "../../utils/api";

interface AddSiteFormProps {
  name: string;
  url: string;
}

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<AddSiteFormProps>();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();
  const [flag, setFlag] = useBoolean();

  const handleCreateSite = async ({ name, url }) => {
    try {
      setFlag.toggle;
      const response = await api.post(
        "sites/create",
        { name, url, id: user.uid },
        { headers: { token: user.token }, withCredentials: true }
      );
      const { site } = response.data;
      await mutate(
        [`api/sites/${user.uid}`, user.token],
        async ({ sites }: { sites: Site[] }) => ({
          sites: [...sites, site],
        }),
        false
      );
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" my={4}>
        Add site +
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(handleCreateSite)}
          mx={4}>
          <ModalHeader>Add site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Site name</FormLabel>
              <Input
                name="name"
                colorScheme="green"
                ref={(e) => {
                  register(e, { required: true });
                  initialRef.current = e;
                }}
                placeholder="My site"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Site link</FormLabel>
              <Input
                name="url"
                ref={register}
                colorScheme="green"
                placeholder="https://example.com"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="green" type="submit" isLoading={flag}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
