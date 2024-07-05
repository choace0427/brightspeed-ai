"use client";

import { useState } from "react";
import { Button, Flex, Select, Stack, Stepper, Text } from "@mantine/core";
import { IconUpload, IconBrain, IconAnalyze } from "@tabler/icons-react";
import { toast } from "react-toastify";
import MultipleAnalyzedComponent from "@/app/components/multiple/MultipleAnalyzedComponent";
import MultipleUploadComponent from "@/app/components/multiple/MultipleUploadComponent";

export default function Home() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [originFiles, setOriginFiles] = useState();

  const [queries, setQueries] = useState([]);

  const [adapter, setAdapter] = useState();

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Analytics Successfully");
      setLoading(false);
      setActive((current) => (current < 2 ? current + 1 : current));
      originFiles.map((item) => {
        queries.push({
          name: item.name,
          size: item.size,
          queries: [
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
          ],
        });
      });
    }, 4000);
  };

  const handleNewTraining = () => {
    setActive(0);
    setOriginFiles(null);
    setQueries([]);
  };

  return (
    <Stack p={"lg"}>
      <Stepper active={active} w={"100%"} onStepClick={setActive}>
        <Stepper.Step label="PDF or Image Upload" icon={<IconUpload size={"1.2rem"} />} description="You can Upload PDF or Image what you want scanning">
          <MultipleUploadComponent setActive={setActive} originFiles={originFiles} setOriginFiles={setOriginFiles} />
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
        <Stepper.Completed>{queries && <MultipleAnalyzedComponent data={queries} handleNewTraining={handleNewTraining} />}</Stepper.Completed>
      </Stepper>
    </Stack>
  );
}
