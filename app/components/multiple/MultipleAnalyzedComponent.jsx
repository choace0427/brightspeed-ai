"use client";

import { formatFileSize } from "@/app/utils/simpleFunctions";
import { ActionIcon, Box, Button, Drawer, Flex, ScrollArea, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck, IconEye } from "@tabler/icons-react";
import { DataGrid, stringFilterFn } from "mantine-data-grid";
import { useState } from "react";

export default function MultipleAnalyzedComponent(props) {
  const { data, handleNewTraining } = props;
  const [opened, { open, close }] = useDisclosure(false);

  const [viewData, setViewData] = useState();

  const handleView = (index) => {
    setViewData(data[index]);
    open();
  };

  return (
    <Box>
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
      <DataGrid
        data={data}
        striped
        highlightOnHover
        withPagination
        withBorder
        withColumnBorders
        withSorting
        mt={"md"}
        columns={[
          {
            accessorKey: "pdf_name",
            header: "PDF Name",
            filterFn: stringFilterFn,
            size: 340,
            maxSize: 500,
            cell: (cell) => {
              const { name } = cell.row.original;
              return <Text>{name}</Text>;
            },
          },
          {
            accessorKey: "file_type",
            header: "File Type",
            filterFn: stringFilterFn,
            size: 30,
            cell: (cell) => {
              const { name } = cell.row.original;
              return <Text tt={"uppercase"}>{name.split(".")[1]}</Text>;
            },
          },
          {
            accessorKey: "size",
            header: "PDF Size",
            filterFn: stringFilterFn,
            size: 80,
            cell: (cell) => {
              const { size } = cell.row.original;
              return <Text>{formatFileSize(size)}</Text>;
            },
          },
          {
            accessorKey: "action",
            header: "Action",
            size: 40,
            cell: (cell) => {
              return (
                <Flex justify={"center"} w={"100%"}>
                  <ActionIcon radius={"xl"} variant="outline" onClick={() => handleView(cell.row.index)}>
                    <IconEye size={"1.2rem"} />
                  </ActionIcon>
                </Flex>
              );
            },
          },
        ]}
        styles={{
          dataCellContent: {
            width: "100%",
          },
        }}
      />
      <Drawer opened={opened} onClose={close} title="PDF Details View" position="right" size="700">
        <ScrollArea h={800} offsetScrollbars className="h-[calc(100vh - 67px)]" mt={"md"}>
          <Text size="xl" fw={700}>
            {viewData && viewData.name}
          </Text>
          {viewData &&
            viewData.queries.map((item, index) => {
              return <TextInput label={item.label} value={item.value} key={index} mt={"sm"} disabled />;
            })}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
