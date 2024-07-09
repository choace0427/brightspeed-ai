"use client";

import { AdapterList } from "@/app/utils/adatper";
import { handleAnalyze } from "@/app/utils/apis";
import { Badge, Box, Button, Flex, Select, Text } from "@mantine/core";
import { IconAnalyze } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SingleSelectAdapter(props) {
  const { data, prevStep, setLoading, setAnalyseData, selected, setSelected, nextStep } = props;

  const AnalyzeFunction = async () => {
    const requestData = {
      allS3Keys: data,
      queries: selected.queries,
      adapterId: selected.adapter_id,
      adapterVersion: selected.adapterVersion,
    };

    setLoading(true);
    await handleAnalyze(requestData)
      .then((res) => {
        const response = res.data;
        toast.success(response.message);
        setAnalyseData(response);
        setLoading(false);
        nextStep();
      })
      .catch((err) => {
        console.log("---err", err);
        setLoading(false);
      });
  };

  const [adapter, setAdapter] = useState();

  const handleSelectAdapter = (value) => {
    setAdapter(value);
    setSelected(AdapterList.filter((val) => value === val.name)[0]);
  };

  return (
    <Box>
      <Flex align={"center"} justify={"space-between"}>
        <Text size="xl">Please select Adapter</Text>
        <Flex align={"center"} justify={"space-between"} gap={"lg"}>
          {selected && (
            <Button leftSection={<IconAnalyze size={"1rem"} />} onClick={AnalyzeFunction}>
              Start Analyze
            </Button>
          )}
          <Button variant="outline" color="gray" onClick={prevStep}>
            Go to Preview Step
          </Button>
        </Flex>
      </Flex>
      <Select
        mt={"lg"}
        label="Select Adapter"
        searchable
        placeholder="Pick value"
        value={selected && selected.name}
        data={AdapterList.map((adapter) => ({
          value: adapter.name,
          label: adapter.name,
        }))}
        nothingFoundMessage="Nothing found..."
        onChange={(value) => handleSelectAdapter(value)}
      />
      {selected && (
        <Flex gap={"sm"} wrap={"wrap"} mt={"md"}>
          {selected &&
            selected.queries.map((item) => {
              return (
                <Badge color="gray" variant="light" tt={"initial"} key={item.Alias}>
                  {item.Text}
                </Badge>
              );
            })}
        </Flex>
      )}
    </Box>
  );
}
