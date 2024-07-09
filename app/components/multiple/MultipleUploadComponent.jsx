import { ActionIcon, Alert, Box, Button, Drawer, Flex, Group, Paper, rem, SimpleGrid, Text } from "@mantine/core";
import PdfViewer from "../PdfViewer";
import { IconCircleCheck, IconEye, IconFileText, IconPhoto, IconReport, IconTrash, IconUpload, Iconx } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { formatFileSize } from "@/app/utils/simpleFunctions";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { handleUpload } from "@/app/utils/apis";

export default function MultipleUploadComponent(props) {
  const { prevStep, setOriginFiles, originFiles, setLoading, loading, setData, nextStep } = props;

  const [opened, { open, close }] = useDisclosure(false);

  const [files, setFiles] = useState(null);

  //image preview
  const [imgFile, setImgFile] = useState([]);

  const handleFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < originFiles.length; i++) {
      formData.append("files", originFiles[i]);
    }

    await handleUpload(formData)
      .then((res) => {
        const response = res.data;
        toast.success(response.message);
        setData(response.allS3Keys);
        setLoading(false);
        if (response.allS3Keys && response.allS3Keys.length > 0) nextStep();
      })
      .catch((err) => {
        console.log("---err", err);
        setLoading(false);
      });
  };

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

  const handlePreviewImage = (index) => {
    const imageUrl = URL.createObjectURL(originFiles[index]);
    setImgFile(imageUrl);
  };

  return (
    <>
      {originFiles && originFiles.length > 1 && (
        <Flex justify={"space-between"} align={"center"}>
          <Alert variant="light" color="green" title={`You uploaded ${originFiles && originFiles.length} files successfully`} icon={<IconCircleCheck />} />
          <Flex gap={"md"}>
            <Button color="green" variant="outline" loading={loading} onClick={handleFileUpload}>
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
          <SimpleGrid cols={3} w={"100%"} mt={"lg"}>
            {originFiles.map((item, index) => {
              return (
                <Paper withBorder p={"sm"} radius={"sm"} shadow="sm" key={index}>
                  <Flex align={"center"} h={"100%"}>
                    <Box>
                      {item.type === "application/pdf" ? (
                        <IconFileText color="gray" size={"7rem"} stroke={"1.3"} />
                      ) : item.type?.split("/")[0] === "image" ? (
                        <IconPhoto color="gray" size={"7rem"} stroke={"1.3"} />
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Flex h={"100%"} direction={"column"} justify={"space-evenly"} w={"100%"}>
                      <Text fw={600} size="md" lineClamp={1}>
                        {item.name.split(".")[0]}
                      </Text>
                      <Text size="sm">
                        Type: <span className=" uppercase">{item.type.split("/")[1]}</span>
                      </Text>
                      <Flex align={"center"} justify={"space-between"}>
                        <Text size="sm">size: {formatFileSize(item.size)}</Text>
                        <Flex>
                          <ActionIcon
                            onClick={() => {
                              if (item.type === "application/pdf") handlePreviewPDF(index);
                              else if (item.type.split("/")[0] === "image") handlePreviewImage(index);
                            }}
                            variant="transparent"
                          >
                            {item.type.split("/")[0] === "image" ? (
                              <PhotoProvider>
                                <div className="foo">
                                  <PhotoView src={imgFile}>
                                    <IconEye size={"1.2rem"} color="#228be6" />
                                  </PhotoView>
                                </div>
                              </PhotoProvider>
                            ) : (
                              <IconEye size={"1.2rem"} color="#228be6" />
                            )}
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
            multiple={true}
            onDrop={handleMultiFilesDrop}
            onReject={(files) => toast.error(`${files.length} files rejected due to wrong size/type`)}
            maxSize={5 * 1024 ** 2}
            accept={{ IMAGE_MIME_TYPE, PDF_MIME_TYPE }}
            styles={{
              inner: {
                padding: "44px",
              },
            }}
          >
            <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
              <Dropzone.Accept>
                <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <Iconx style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconReport style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl">
                  In this step, you can Upload <span className=" font-bold text-[24px] mr-1">Multiple</span>PDFs or Images what you want scanning
                </Text>
                <Text size="sm" c="dimmed" mt={7}>
                  Attach as many files as you like, each file should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      </Flex>
    </>
  );
}
