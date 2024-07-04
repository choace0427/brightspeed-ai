import { ActionIcon, Flex, Text, Title } from "@mantine/core";
import { IconMoonStars } from "@tabler/icons-react";

export default function HeaderSection() {
  return (
    <Flex align={"center"} justify={"end"} p={"md"}>
      <ActionIcon color="gray" variant="outline" size={"lg"}>
        <IconMoonStars />
      </ActionIcon>
    </Flex>
  );
}
