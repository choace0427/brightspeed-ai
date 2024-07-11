"use client";

import { Alert, Button, Flex, ScrollArea, Text, TextInput } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import moment from "moment";

export default function IDcardAnalyzedComponent(props) {
  const { data, handleNewTraining } = props;

  console.log(data);

  return (
    <>
      <Flex align={"center"} justify={"space-between"}>
        <Alert variant="light" color="green" title="Analyzed Successfully! &nbsp; Now you can view scanned data in this step" icon={<IconCircleCheck />} />
        <Button variant="outline" onClick={handleNewTraining}>
          New Scanning
        </Button>
      </Flex>
      <ScrollArea h={680} offsetScrollbars className="h-[calc(100vh - 67px)]" mt={"md"}>
        {/* {data &&
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
            })} */}
        You can see the scanning Result.
      </ScrollArea>
    </>
  );
}
