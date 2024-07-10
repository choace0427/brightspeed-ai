"use client";

import { formatFileSize } from "@/app/utils/simpleFunctions";
import { ActionIcon, Alert, Box, Button, Drawer, Flex, ScrollArea, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck, IconEye } from "@tabler/icons-react";
import { DataGrid, stringFilterFn } from "mantine-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";

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
        <Alert variant="light" color="green" title="Analyzed Successfully! &nbsp; Now you can view scanned data in this step" icon={<IconCircleCheck />} />
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
        mt={"xl"}
        columns={[
          {
            accessorKey: "pdf_name",
            header: "PDF Name",
            filterFn: stringFilterFn,
            size: 340,
            maxSize: 500,
            cell: (cell) => {
              const { fileName } = cell.row.original;
              return <Text>{fileName.split(".")[0]}</Text>;
            },
          },
          {
            accessorKey: "file_type",
            header: "File Type",
            filterFn: stringFilterFn,
            size: 30,
            cell: (cell) => {
              const { fileName } = cell.row.original;
              return <Text tt={"uppercase"}>{fileName.split(".")[1]}</Text>;
            },
          },
          // {
          //   accessorKey: "size",
          //   header: "PDF Size",
          //   filterFn: stringFilterFn,
          //   size: 80,
          //   cell: (cell) => {
          //     const { size } = cell.row.original;
          //     return <Text>{formatFileSize(size)}</Text>;
          //   },
          // },
          {
            accessorKey: "action",
            header: "Action",
            size: 40,
            cell: (cell) => {
              return (
                <Flex justify={"center"} w={"100%"}>
                  <ActionIcon radius={"xl"} size={"sm"} variant="outline" onClick={() => handleView(cell.row.index)}>
                    <IconEye size={"1rem"} />
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
            {viewData && viewData.fileName}
          </Text>
          {viewData &&
            viewData.data
              .sort((a, b) => {
                let textA = a.QuestionText.toUpperCase();
                let textB = b.QuestionText.toUpperCase();
                if (textA < textB) {
                  return 1;
                }
                if (textA > textB) {
                  return -1;
                }
                return 0;
              })
              .map((item, index) => {
                let formattedValue = item.AnswerText;
                const possibleFormats = [
                  "DD MMM YYYY",
                  "DD/MM/YYYY",
                  "DD-MM-YYYY",
                  "DD.MM.YYYY",
                  "DD MM YY",
                  "MM YYYY",
                  "MM/YYYY",
                  "MM.YYYY",
                  "MM-YYYY",
                  "MM/YY",
                  "MM.YY",
                  "MM YY",
                  "MM-YY",
                  "M/YY",
                  "M.YY",
                  "M YY",
                  "M-YY",
                ];
                const momentDate = moment(item.AnswerText, possibleFormats, true);

                if (item.QueryAlias.toLowerCase().includes("date") || item.QuestionText.toLowerCase().includes("when")) {
                  if (momentDate.isValid()) {
                    if (
                      ["MM YYYY", "MM/YYYY", "MM.YYYY", "MM-YYYY", "MM/YY", "MM.YY", "MM YY", "MM-YY", "M/YY", "M.YY", "M YY", "M-YY"].includes(
                        momentDate.creationData().format
                      )
                    ) {
                      formattedValue = momentDate.set("date", 1).format("MM/DD/YYYY");
                    } else {
                      formattedValue = momentDate.format("MM/DD/YYYY");
                    }
                  }
                }

                return <TextInput label={item.QuestionText} value={formattedValue} key={index} mt={"sm"} disabled />;
              })}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
