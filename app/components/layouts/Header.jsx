"use client";

import { ActionIcon, Flex, useMantineColorScheme, useMantineTheme, useComputedColorScheme, Divider } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export default function HeaderSection() {
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <>
      <Flex align={"center"} justify={"end"} px={"md"} pt={"md"}>
        <ActionIcon color="gray" variant="outline" size={"lg"} onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}>
          {colorScheme === "light" ? <IconMoonStars /> : <IconSun />}
        </ActionIcon>
      </Flex>
      <Divider mt={3} color={colorScheme === "light" ? "gray" : "white"} />
    </>
  );
}
