"use client";

import { useState } from "react";
import { ActionIcon, Box, Button, Drawer, Flex, Group, Paper, rem, ScrollArea, Select, SimpleGrid, Stack, Stepper, Text, TextInput } from "@mantine/core";
import {
  IconUpload,
  IconX,
  IconReport,
  IconBrain,
  IconAnalyze,
  IconCircleCheck,
  IconFileReport,
  IconFileTypePdf,
  IconFileText,
  IconTrash,
  IconEye,
} from "@tabler/icons-react";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import PdfViewer from "../../../components/PdfViewer";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { DataGrid, stringFilterFn } from "mantine-data-grid";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [files, setFiles] = useState(null);
  const [originFiles, setOriginFiles] = useState();

  const handleMultiFilesDrop = (acceptedFiles) => {
    if (acceptedFiles.length < 2) {
      toast.warn("Please upload 2 files at least");
    }
    setOriginFiles(acceptedFiles);
  };

  const handlePreviewPDF = (id) => {
    const pdfFile = URL.createObjectURL(originFiles[id]);
    setFiles(pdfFile);
    open();
  };

  const [queries, setQueries] = useState([]);

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
      setQueries([
        {
          name: originFiles && originFiles[0].name,
          size: originFiles && originFiles[0].size,
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
        },
        {
          name: originFiles && originFiles[1].name,
          size: originFiles && originFiles[1].size,
          queries: [
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
          ],
        },
      ]);
    }, 4000);
  };

  const handleNewTraining = () => {
    setActive(0);
    setOriginFiles(null);
  };

  function formatFileSize(sizeInBytes) {
    if (sizeInBytes < 1024) {
      return sizeInBytes + " B";
    } else if (sizeInBytes < 1024 * 1024) {
      return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  }

  return (
    <Stack p={"lg"}>
      <Stepper active={active} w={"100%"} onStepClick={setActive}>
        <Stepper.Step label="PDF Upload" icon={<IconUpload size={"1.2rem"} />} description="You can Upload PDF what you want training">
          {originFiles && originFiles.length > 1 && (
            <Flex justify={"space-between"} align={"center"}>
              <Text size="lg" fw={600} my={"md"}>
                You uploaded {originFiles && originFiles.length} PDF files
              </Text>
              <Flex gap={"md"}>
                <Button color="green" variant="outline" loading={loading} onClick={handlePDFUpload}>
                  Upload All
                </Button>
                <Button color="red" variant="outline" disabled={originFiles.length < 2} onClick={() => setOriginFiles()}>
                  Remove all
                </Button>
              </Flex>
            </Flex>
          )}

          <Flex w={"100%"} gap={"xl"}>
            <Drawer opened={opened} onClose={close} title="PDF Details View" position="right" size="700">
              <Flex justify={"center"}>
                <PdfViewer key={`pdf-viewer-${Date.now()}`} pdf={files} visible={true} setFiles={setFiles} type={"multi"} />
              </Flex>
            </Drawer>
            {originFiles && originFiles.length > 1 ? (
              <SimpleGrid cols={3}>
                {originFiles.map((item, index) => {
                  return (
                    <Paper withBorder p={"sm"} radius={"sm"} shadow="sm" key={index}>
                      <Flex align={"center"} h={"100%"}>
                        <Box>
                          <IconFileText color="gray" size={"7rem"} stroke={"1.3"} />
                        </Box>
                        <Flex h={"100%"} direction={"column"} justify={"space-evenly"} w={"100%"}>
                          <Text fw={600} size="md" lineClamp={2}>
                            {item.name}
                          </Text>
                          <Flex align={"center"} justify={"space-between"}>
                            <Text size="sm">size: {formatFileSize(item.size)}</Text>
                            <Flex>
                              <ActionIcon onClick={() => handlePreviewPDF(index)} variant="transparent">
                                <IconEye size={"1.2rem"} color="#228be6" />
                              </ActionIcon>
                              <ActionIcon
                                color="red"
                                variant="transparent"
                                onClick={() => {
                                  if (originFiles.length === 2) {
                                    toast.warn("Uploaded Files must over 2 files at least!");
                                  } else setOriginFiles(originFiles.filter((_, i) => i !== index));
                                }}
                              >
                                <IconTrash size={"1.2rem"} color="red" />
                              </ActionIcon>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Paper>
                  );
                })}
              </SimpleGrid>
            ) : (
              <Dropzone
                mx={"auto"}
                mt={"lg"}
                onDrop={handleMultiFilesDrop}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={PDF_MIME_TYPE}
                styles={{
                  inner: {
                    border: "1px dashed lightgray",
                    borderRadius: "8px",
                    padding: "44px",
                  },
                }}
              >
                <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
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
                    <Text size="xl">
                      In this step, you can Upload <span className=" font-bold text-[24px] mr-1">Multiple</span>PDFs what you want train
                    </Text>
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
          {queries && <MultipleCompleteStep data={queries} handleNewTraining={handleNewTraining} formatFileSize={formatFileSize} />}
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

const MultipleCompleteStep = (props) => {
  const { data, handleNewTraining, formatFileSize } = props;
  const [opened, { open, close }] = useDisclosure(false);

  const [viewData, setViewData] = useState();

  const handleView = (index) => {
    setViewData(data[index]);
    open();
  };

  console.log(viewData);
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
            cell: (cell) => {
              const { name } = cell.row.original;
              return <Text>{name}</Text>;
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
                    <IconEye size={"1.4rem"} />
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
};
