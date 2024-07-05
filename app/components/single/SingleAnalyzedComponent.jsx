"use client";

import { Button, Flex, ScrollArea, Text, TextInput } from "@mantine/core";
import { IconCircleCheck, IconEye } from "@tabler/icons-react";

export default function SingleAnalyzedComponent(props) {
  const { data, handleNewTraining } = props;

  return (
    <>
      <Flex align={"center"} justify={"space-between"}>
        <Flex align={"center"} gap={"xs"}>
          <IconCircleCheck color="green" />
          <Text size="xl" color="green">
            Training Successfully! &nbsp; Now you can view trained data in this step
          </Text>
        </Flex>
        <Button variant="outline" onClick={handleNewTraining}>
          New Training
        </Button>
      </Flex>
      <ScrollArea h={680} offsetScrollbars className="h-[calc(100vh - 67px)]" mt={"md"}>
        {data.map((item, index) => {
          return <TextInput label={item.label} value={item.value} key={index} mt={"sm"} disabled />;
        })}
      </ScrollArea>
    </>
  );
}
