import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import LoadingContainer from "@components/shared/LoadingContainer";
import RemoveSiteDialog from "@components/shared/RemoveSiteDialog";
import { Site } from "@dtos/site";
import useAuth from "@hooks/auth";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import AddSiteModal from "../components/shared/AddSiteModal";
import Container from "../components/shared/Container";
import fetcher from "../utils/fetcher";

export default function Page() {
  const { user } = useAuth();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { data } = useSWR<{ sites: Site[] }>(
    () =>
      user.uid && user.token ? [`api/sites/${user.uid}`, user.token] : null,
    fetcher
  );

  if (data && data.sites?.length !== 0) {
    return (
      <Container name={user?.name}>
        <Flex direction="column">
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                {isLargerThan768 && (
                  <>
                    <Th>Url</Th>
                    <Th isNumeric>Nº of accesses</Th>
                  </>
                )}
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {data?.sites?.map((site: Site) => (
                <Tr key={site.id}>
                  <Td>{site.name}</Td>
                  {isLargerThan768 && (
                    <>
                      <Td>
                        <a href={site.url}>{site.url}</a>
                      </Td>
                      <Td isNumeric>{site.numberOfAccesses}</Td>
                    </>
                  )}
                  <Td isNumeric>
                    <RemoveSiteDialog siteId={site.id} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Container>
    );
  }

  if (data && data.sites.length === 0) {
    return (
      <>
        <Container>
          <AddSiteModal />
          <Flex direction="column">
            <span>No sites added</span>
          </Flex>
        </Container>
      </>
    );
  }

  return (
    <LoadingContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            {isLargerThan768 && (
              <>
                <Th>Url</Th>
                <Th isNumeric>Nº of accesses</Th>
              </>
            )}
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {new Array(8).fill(0).map((_, i) => (
            <Tr key={i}>
              <Td>
                <Skeleton h={6} />
              </Td>
              {isLargerThan768 && (
                <>
                  <Td>
                    <Skeleton h={6} key={i} />
                  </Td>
                  <Td>
                    <Skeleton h={6} key={i} />
                  </Td>
                </>
              )}
              <Td>
                <Skeleton h={6} key={i} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </LoadingContainer>
  );
}
