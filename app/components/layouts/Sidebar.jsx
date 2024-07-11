"use client";

import { Group, Divider, Box, Text, NavLink, ScrollArea, Paper, Flex, useMantineColorScheme, ActionIcon, Avatar } from "@mantine/core";
import { IconReport, IconEPassport, IconLogout, IconHelpOctagon } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarSection() {
  const { colorScheme } = useMantineColorScheme();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Paper h={"100%"} bg={colorScheme === "light" ? "#f9fbfa" : ""} radius={0} className=" border-r-[1px] ">
      <Group px={"lg"} py={"md"} className="border-b-[1px]">
        <Text fz={24} fw={700} variant="gradient" gradient={{ from: "blue", to: "teal", deg: 90 }}>
          BrightSpeed.ai
        </Text>
      </Group>
      <Flex direction={"column"} justify={"space-between"}>
        <ScrollArea h={730}>
          <NavLink
            defaultOpened
            href="#required-for-focus"
            label="PCP Contract"
            leftSection={
              <Avatar variant="light" radius="sm" color="blue" src="" size={28}>
                <IconReport size="1rem" stroke={1.5} color="#228be6" />
              </Avatar>
            }
            childrenOffset={28}
            mt={"md"}
            styles={{
              label: {
                fontWeight: "bolder",
              },
            }}
          >
            <NavLink
              label="Multiple Contract"
              variant="light"
              active={pathname.includes("multiple")}
              color="blue"
              onClick={() => router.push("/train/pcp/multiple")}
            />
            <NavLink
              label="Single Contract"
              variant="light"
              active={pathname.includes("single")}
              color="blue"
              onClick={() => router.push("/train/pcp/single")}
            />
          </NavLink>
          <NavLink
            label="Passport Contract"
            leftSection={
              <Avatar variant="light" radius="sm" color="blue" src="" size={28}>
                <IconEPassport size="1rem" stroke={1.5} color="#228be6" />
              </Avatar>
            }
            onClick={() => router.push("/train/idcard")}
            active={pathname.includes("idcard")}
            childrenOffset={28}
            defaultOpened
            color="blue"
            styles={{
              label: {
                fontWeight: "bolder",
              },
            }}
          />
        </ScrollArea>
        <Box className="border-t-[1px]">
          <NavLink
            mt={"md"}
            href="#"
            label="FAQ"
            leftSection={
              <Avatar variant="light" radius="sm" color="blue" src="" size={28}>
                <IconHelpOctagon size="1rem" stroke={1.5} color="#228be6" />
              </Avatar>
            }
            childrenOffset={28}
            defaultOpened
            color="blue"
            styles={{
              label: {
                fontWeight: "bolder",
              },
            }}
          />
          <NavLink
            mt={"auto"}
            href="#"
            label="Log out"
            leftSection={
              <Avatar variant="light" radius="sm" color="red" src="" size={28}>
                <IconLogout size="1rem" stroke={1.5} color="red" />
              </Avatar>
            }
            childrenOffset={28}
            defaultOpened
            styles={{
              label: {
                fontWeight: "bolder",
                color: "red",
              },
            }}
          />
        </Box>
      </Flex>
    </Paper>
  );
}
