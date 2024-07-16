"use client";

import { parseDate } from "@/app/utils/simpleFunctions";
import { Alert, Button, Card, Divider, Flex, NumberInput, Paper, ScrollArea, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCircleCheck, IconCircleX, IconInfoCircle } from "@tabler/icons-react";

export default function IDcardAnalyzedComponent(props) {
  const { data, handleNewTraining } = props;

  console.log(data);

  return (
    <>
      <Flex align={"center"} justify={"space-between"}>
        {data.status === "failure" ? (
          <Alert variant="light" color="orange" title={`Analyzed successfully, but ${data.mismatches.length} data doesn't matched`} icon={<IconInfoCircle />} />
        ) : (
          <Alert variant="light" color="green" title="Analyzed Successfully! &nbsp; Now you can view scanned data in this step" icon={<IconCircleCheck />} />
        )}
        <Button variant="outline" onClick={handleNewTraining}>
          New Scanning
        </Button>
      </Flex>
      <Flex gap={"lg"} mt={"md"}>
        <Paper withBorder shadow="md" radius={"md"} py={"md"} pl={"md"} pr={4} w={"100%"}>
          <Text size="lg" fw={700}>
            Analyzed Data
          </Text>
          <Divider mt={"sm"} mr={12} />
          <ScrollArea h={570} mah={570} offsetScrollbars className="h-[calc(100vh - 250px)]" mt={"md"} scrollbarSize={8}>
            <Stack gap={"sm"} mr={"xs"}>
              <TextInput label="Surname" value={data.extractedData.Surname} disabled />
              <TextInput label="MiddleName" value={data.extractedData.MiddleName} disabled />
              <TextInput label="GivenName" value={data.extractedData.GivenName} disabled />
              <TextInput label="PassportNumber" value={data.extractedData.PassportNumber} disabled />
              <NumberInput value={data.extractedData.Age} label="Age" disabled />
              <DateInput defaultValue={new Date(data.extractedData.DateOfBirth)} valueFormat="YYYY-MM-DD" label="Date of Birth" disabled />
              <DateInput defaultValue={new Date(data.extractedData.IssueDate)} valueFormat="YYYY-MM-DD" label="Issue Date" disabled />
              <DateInput defaultValue={new Date(data.extractedData.ExpireDate)} valueFormat="YYYY-MM-DD" label="Expire Date" disabled />
            </Stack>
          </ScrollArea>
        </Paper>
        <Paper withBorder shadow="md" radius={"md"} py={"md"} pl={"md"} pr={4} w={"100%"} h={"fit-content"}>
          <Text size="lg" fw={700}>
            Missmatched Data
          </Text>
          <Divider mt={"sm"} mr={12} />
          <ScrollArea mah={500} offsetScrollbars className="h-[calc(100vh - 250px)]" mt={"md"} scrollbarSize={8}>
            <Stack gap={"sm"} mr={"xs"}>
              {data.mismatches.map((item, index) => {
                return (
                  <Flex w={"100%"} justify={"space-between"} align={"center"}>
                    <Tooltip label={item.message} position="bottom-start" offset={{ mainAxis: 5, crossAxis: 0 }}>
                      <Text size="md" fw={500} tt={"uppercase"}>
                        {item.field}
                      </Text>
                    </Tooltip>
                    <IconCircleX fill="red" color="white" size={"1.7rem"} />
                  </Flex>
                );
              })}
            </Stack>
          </ScrollArea>
        </Paper>
      </Flex>
      {/* <ScrollArea h={680} offsetScrollbars className="h-[calc(100vh - 67px)]" mt={"md"}>
        {data &&
          data[0]?.data
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
        You can see the scanning Result.
      </ScrollArea> */}
    </>
  );
}
