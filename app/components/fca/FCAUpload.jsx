"use client";

import { Alert, Badge, Box, Button, Flex, Group, Image, Text, rem } from "@mantine/core";
import PdfViewer from "../PdfViewer";
import { IconCircleCheck, IconReport, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { handleUpload } from "@/app/utils/apis";
import { useState } from "react";

export default function CFAUpload(props) {
  const { setData, setFiles, files, setLoading, loading, setOriginFiles, originFiles, nextStep, setPageSelect, pageSelect } = props;

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    setOriginFiles(acceptedFiles);
    const pdfFile = URL.createObjectURL(acceptedFiles[0]);
    setFiles(pdfFile);
  };

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

  return (
    <Box>
      {files && originFiles && (
        <Flex align={"center"} justify={"space-between"}>
          <Alert variant="light" color="green" title={`You uploaded file successfully`} icon={<IconCircleCheck />} />
          <Flex gap={"md"}>
            <Button leftSection={<IconUpload size={"1rem"} />} onClick={handleFileUpload} loading={loading}>
              Upload
            </Button>
            <Button variant="outline" color="red" onClick={() => setFiles(null)}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      )}
      <Flex justify={"center"} w={"100%"} gap={"xl"}>
        {files ? (
          <>
            {originFiles[0].type.split("/")[0] === "image" ? (
              <PhotoProvider>
                <div className="foo">
                  <PhotoView src={files}>
                    <Image radius="md" h={700} w={500} mah={650} src={files} mt={"xl"} />
                  </PhotoView>
                </div>
              </PhotoProvider>
            ) : (
              <Flex gap={"lg"} w={"100%"} justify={"center"}>
                <PdfViewer
                  key={`pdf-viewer-${Date.now()}`}
                  pdf={files}
                  visible={true}
                  setFiles={setFiles}
                  type={"cfa"}
                  pageSelect={pageSelect}
                  setPageSelect={setPageSelect}
                />
                {pageSelect.length > 0 && (
                  <Box maw={400}>
                    <Button variant="outline" color="red" leftSection={<IconTrash size={"1rem"} />} onClick={() => setPageSelect([])}>
                      Remove All Pages
                    </Button>
                    <div className="flex gap-2 flex-wrap mt-5">
                      {pageSelect.map((item, index) => {
                        return (
                          <Badge
                            size="lg"
                            key={index}
                            rightSection={
                              <IconX
                                size={"1rem"}
                                className="hover:cursor-pointer"
                                onClick={() => {
                                  let pages = [...pageSelect];
                                  pages.splice(index, 1);
                                  setPageSelect(pages);
                                }}
                              />
                            }
                          >
                            Page: {item}
                          </Badge>
                        );
                      })}
                    </div>
                  </Box>
                )}
              </Flex>
            )}
          </>
        ) : (
          <Dropzone
            multiple={false}
            onDrop={handleFileDrop}
            onReject={(files) => toast.error(`${files.length} files rejected due to wrong size/type`)}
            maxSize={5 * 1024 ** 2}
            accept={{ IMAGE_MIME_TYPE, PDF_MIME_TYPE }}
            mt={"xl"}
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
                <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconReport style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl">
                  In this step, you can Upload <span className=" font-bold text-[24px]">1</span> PDF or Image what you want scanning
                </Text>
                <Text size="sm" c="dimmed" mt={7}>
                  Attach as many files as you like, each file should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      </Flex>
    </Box>
  );
}
