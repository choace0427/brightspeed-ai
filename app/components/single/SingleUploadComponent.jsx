"use client";

import { Button, Flex, Group, Text, rem } from "@mantine/core";
import PdfViewer from "../PdfViewer";
import { IconReport, IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE, DropzoneProps } from "@mantine/dropzone";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SingleUploadComponent(props) {
  const { setActive, setFiles, files } = props;

  const [loading, setLoading] = useState(false);

  const handleFileDrop = (acceptedFiles) => {
    const pdfFile = URL.createObjectURL(acceptedFiles[0]);
    setFiles(pdfFile);
  };

  const handlePDFUpload = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Upload Successfully");
      setLoading(false);
      setActive((current) => (current < 2 ? current + 1 : current));
    }, 2000);
  };

  return (
    <Flex justify={"center"} w={"100%"} gap={"xl"}>
      {files ? (
        <>
          <PdfViewer key={`pdf-viewer-${Date.now()}`} pdf={files} visible={true} setFiles={setFiles} type={"single"} />
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
        <Dropzone
          multiple={false}
          onDrop={handleFileDrop}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={{ IMAGE_MIME_TYPE, PDF_MIME_TYPE }}
          {...DropzoneProps}
          mt={"lg"}
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
  );
}
