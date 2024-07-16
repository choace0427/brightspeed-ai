"use client";

import { Alert, Box, Button, Flex, Group, Image, Text, rem } from "@mantine/core";
import { IconCircleCheck, IconReport, IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { getImageSize } from "react-image-size";
import { handleIdCardUpload } from "@/app/utils/apis";

export default function IDUpload(props) {
  const { crmData, nextStep, idData, setIdData, setOriginFiles, originFiles, setAnalyseData, setData, setLoading, loading } = props;

  const fetchImageSize = async (file) => {
    try {
      const dimensions = await getImageSize(file);
      if (dimensions.width < 950 && dimensions.height < 600) {
        setIdData();
        toast.error("The Id Card size is too small. Width * Height should be 950 * 600 at least");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileDrop = (acceptedFiles) => {
    const idFile = URL.createObjectURL(acceptedFiles[0]);
    setOriginFiles(acceptedFiles);
    setIdData(idFile);

    fetchImageSize(idFile);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("id_card", originFiles[0]);
    formData.append("birthday", crmData.birth);
    formData.append("email", crmData.email);
    formData.append("first_name", crmData.first_name);
    formData.append("last_name", crmData.last_name);
    formData.append("lender_name", crmData.lender_name);
    formData.append("phone", crmData.phone);
    formData.append("country", crmData.country);
    formData.append("state", crmData.state);
    formData.append("address", crmData.street);
    formData.append("zip", crmData.zip);

    setAnalyseData(formData);

    await handleIdCardUpload(formData)
      .then((res) => {
        const response = res.data;
        if (response.status === "failure") {
          toast.warn("Some Data does not mathced with your ID Card");
        } else {
          toast.success("ID card scanning Success!");
        }
        setData(response);
        setLoading(false);
        nextStep();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Box>
      {idData && (
        <Flex align={"center"} justify={"space-between"}>
          <Alert variant="light" color="green" title={`You uploaded file successfully`} icon={<IconCircleCheck />} />
          <Flex gap={"md"}>
            <Button leftSection={<IconUpload size={"1rem"} />} onClick={handleUpload}>
              Upload
            </Button>
            <Button variant="outline" color="red" onClick={() => setIdData(null)}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      )}
      <Flex justify={"center"} w={"100%"} gap={"xl"}>
        {idData ? (
          <PhotoProvider>
            <div className="foo">
              <PhotoView src={idData}>
                <Image radius="md" h={700} w={"auto"} mah={600} src={idData} mt={"xl"} />
              </PhotoView>
            </div>
          </PhotoProvider>
        ) : (
          <Dropzone
            multiple={false}
            onDrop={handleFileDrop}
            onReject={(idData) => toast.error(`${idData.length} files rejected due to wrong size/type.`)}
            // maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
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
                  In this step, you can Upload <span className=" font-bold text-[24px]">1</span> ID Card image what you want scanning
                </Text>
                <Text size="sm" c="dimmed" mt={7}>
                  Attach as many files as you like, each file width should big than 900px and height should big than 600px
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      </Flex>
    </Box>
  );
}
