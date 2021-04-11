import React, { useMemo } from "react";
import useSWR, { mutate } from "swr";
import { Site } from "@dtos/site";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Stack,
  Text,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import fetcher from "@utils/fetcher";
import api from "@utils/api";

type ResponseType = {
  sites: Omit<Site, "user" | "userId">[];
  user: { name: string; avatar: string };
};

export default function UserSites() {
  const router = useRouter();
  const userId = useMemo(() => router.query?.userId, [router.query]);
  const { data } = useSWR<ResponseType>(
    userId ? `/api/sites/${userId}` : null,
    fetcher
  );

  const handleSiteClick = async (site: Site) => {
    await api.patch("sites/updateNumberOfAccesses", {
      id: site.id,
      currentNumberOfAccesses: site.numberOfAccesses,
    });
    router.push(site.url);
  };

  if (data) {
    const { user, sites } = data;
    return (
      <Flex align="center" direction="column" h="100%" m={8}>
        <Box
          bg="white"
          maxW="480px"
          w="100%"
          borderRadius="md"
          pb={8}
          px={4}
          boxShadow="md">
          <Flex align="center" direction="column" h="100%" my={8}>
            <Avatar src={user?.avatar} size="xl" mb={4} />
            <Heading>{user?.name}</Heading>
          </Flex>
          <Stack spacing={4} align="center" maxW="100vw" w="100%">
            {sites?.map((site: Site) => (
              <Button
                key={site.id}
                colorScheme="green"
                w="100%"
                onClick={() => {
                  handleSiteClick(site);
                }}>
                <Text isTruncated>{site.name}</Text>
              </Button>
            ))}
          </Stack>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex align="center" direction="column" h="100%" m={8}>
      <Box
        bg="white"
        maxW="480px"
        w="100%"
        borderRadius="md"
        pb={8}
        px={4}
        boxShadow="md">
        <Flex align="center" direction="column" h="100%" my={8}>
          <Avatar size="xl" mb={4} />
          <Skeleton h={8} w={48} />
        </Flex>
        <Stack spacing={4} align="center" maxW="100vw" w="100%">
          {new Array(6).fill(0).map((_, i) => (
            <Skeleton h={8} w="100%" key={i} />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
}
