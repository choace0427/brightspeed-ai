"use client";

import { useState } from "react";
import { Button, Flex, Group, rem, ScrollArea, Select, Stack, Stepper, Text, TextInput } from "@mantine/core";
import { IconUpload, IconX, IconReport, IconBrain, IconAnalyze, IconCircleCheck } from "@tabler/icons-react";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import PdfViewer from "../../components/PdfViewer";
import { toast } from "react-toastify";

export default function Home() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [files, setFiles] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    const pdfFile = URL.createObjectURL(acceptedFiles[0]);
    setFiles(pdfFile); // Ensure this is a URL or a data buffer
  };

  const [queries, setQueries] = useState([
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

  const [adapter, setAdapter] = useState();

  const handlePDFUpload = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Upload Successfully");
      setLoading(false);
      setActive((current) => (current < 2 ? current + 1 : current));
    }, 2000);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Analytics Successfully");
      setLoading(false);
      setActive((current) => (current < 2 ? current + 1 : current));
    }, 4000);
  };

  const handleNewTraining = () => {
    setActive(0);
    setFiles(null);
  };

  return (
    <Stack p={"lg"}>
      <Stepper active={active} w={"100%"} onStepClick={setActive}>
        <Stepper.Step label="PDF Upload" icon={<IconUpload size={"1.2rem"} />} description="You can Upload PDF what you want training">
          <Flex justify={"center"} w={"100%"} gap={"xl"}>
            {files ? (
              <>
                <PdfViewer key={`pdf-viewer-${files.name}-${Date.now()}`} pdf={files} visible={true} setFiles={setFiles} />
                <Flex gap={"md"} mt={30}>
                  <Button leftSection={<IconUpload size={"1rem"} />} onClick={handlePDFUpload} loading={loading}>
                    PDF Upload
                  </Button>
                  <Button variant="outline" color="red" onClick={() => setFiles(null)}>
                    Cancel
                  </Button>
                </Flex>
              </>
            ) : (
              <Dropzone onDrop={handleFileDrop} onReject={(files) => console.log("rejected files", files)} maxSize={5 * 1024 ** 2} accept={PDF_MIME_TYPE}>
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                  <Dropzone.Accept>
                    <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconReport style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl">In this step, you can Upload PDF what you want train</Text>
                    <Text size="sm" c="dimmed" mt={7}>
                      Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            )}
          </Flex>
        </Stepper.Step>
        <Stepper.Step label="Select Adapter" description="You can select Adapter to train the pdf" icon={<IconBrain size={"1.2rem"} />}>
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
        <Stepper.Completed>
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
            {queries.map((item, index) => {
              return <TextInput label={item.label} value={item.value} key={index} mt={"sm"} disabled />;
            })}
          </ScrollArea>
        </Stepper.Completed>
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
