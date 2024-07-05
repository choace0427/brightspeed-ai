"use client";

import { useState } from "react";
import { Button, Flex, Select, Stack, Stepper, Text } from "@mantine/core";
import { IconUpload, IconBrain, IconAnalyze } from "@tabler/icons-react";
import { toast } from "react-toastify";
import SingleAnalyzedComponent from "@/app/components/single/SingleAnalyzedComponent";
import SingleUploadComponent from "@/app/components/single/SingleUploadComponent";

export default function Home() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [files, setFiles] = useState();
  const [queries, setQueries] = useState([]);

  const [adapter, setAdapter] = useState();

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Analytics Successfully");
      setLoading(false);
      setActive((current) => (current < 2 ? current + 1 : current));
      setQueries([
        {
          label: "What's the name of customer?",
          value: "Mr Lewis Lawrence",
        },
        {
          label: "What's the address of customer?",
          value: "53 Lime Close South Ockendon Essex RM15 6NN",
        },
        {
          label: "What's the registration number?",
          value: "HJ12WYK",
        },
        {
          label: "When's the first registered of Vehicle?",
          value: "31 Mar 2012",
        },
        {
          label: "What's the name of lender?",
          value: "Advantage Finance Limited",
        },
        {
          label: "What's the address of lender?",
          value: "Unit 7, Acorn Business Park, Moss Road, Grimsby, North East Lincolnshire, DN32 OLW",
        },
        {
          label: "What's the name of Credit Intermediary?",
          value: "Canvey Carriage Company",
        },
        {
          label: "What's the address of Credit Intermediary?",
          value: "Charfleet Industrial Estate, Kings Close, Canvey Island, SS8 0PR",
        },
        {
          label: "How much is the total cash Price of goods?",
          value: "Mr Lewis Lawrence",
        },
        {
          label: "What's the address of customer?",
          value: "£8000.00",
        },
        {
          label: "How much is the Advance Payment (Cash)?",
          value: "£0.00",
        },
        {
          label: "How much is the Advance Payment (Part Exchange)?",
          value: "£0.00",
        },
        {
          label: "How much is the amount of credit?",
          value: "£8000.00",
        },
        {
          label: "How much is the Plus Finance Charges of Interest, Acceptance Fee, Purchase Fee?",
          value: "£8325.00",
        },
        {
          label: "How much is the Total Amount Payable?",
          value: "£16325.00",
        },
        {
          label: "How much is the percent of APR?",
          value: "37.51",
        },
        {
          label: "How many months are the Duration of agreement?",
          value: "60",
        },
      ]);
    }, 4000);
  };

  const handleNewTraining = () => {
    setActive(0);
    setFiles(null);
    setQueries([]);
  };

  return (
    <Stack p={"lg"}>
      <Stepper active={active} w={"100%"} onStepClick={setActive}>
        <Stepper.Step label="PDF or Image Upload" icon={<IconUpload size={"1.2rem"} />} description="You can Upload PDF or Image what you want scanning">
          <SingleUploadComponent setActive={setActive} files={files} setFiles={setFiles} />
        </Stepper.Step>
        <Stepper.Step label="Select Adapter" description="You can select Adapter to scan the PDF or Image" icon={<IconBrain size={"1.2rem"} />}>
          <Text size="xl">Please select Adapter</Text>
          <Select
            mt={"lg"}
            label="Select Adapter"
            placeholder="Pick value"
            data={[
              "motonovo-adapter",
              "honda-finance-adapter",
              "fca-adapter",
              "fce-adapter",
              "closebrothers-adapter",
              "blackhorse-adapter-v2",
              "blackhorse-adapter-v1",
              "bmw-adapter",
              "vwgroup-adapter",
              "demo-advantage-adapter",
            ]}
            onChange={(value) => setAdapter(value)}
          />
          <Flex align={"center"} justify={"space-between"} mt={"lg"}>
            {adapter && (
              <Button leftSection={<IconAnalyze size={"1rem"} />} loading={loading} onClick={handleAnalyze}>
                Start Analyze
              </Button>
            )}
            <Button variant="outline" color="gray" onClick={prevStep}>
              Go to Preview Step
            </Button>
          </Flex>
        </Stepper.Step>
        <Stepper.Completed>{queries && <SingleAnalyzedComponent data={queries} handleNewTraining={handleNewTraining} />}</Stepper.Completed>
      </Stepper>
      {/* <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </Stack>
  );
}
