"use client";

import { useState } from "react";
import { Box, LoadingOverlay, Stack, Stepper } from "@mantine/core";
import { IconUpload, IconBrain, IconRosetteDiscountCheck } from "@tabler/icons-react";
import SingleAnalyzedComponent from "@/app/components/single/SingleAnalyzedComponent";
import SingleUploadComponent from "@/app/components/single/SingleUploadComponent";
import SingleSelectAdapter from "@/app/components/single/SingleSelectAdapter";

export default function Home() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [files, setFiles] = useState();

  const [originFiles, setOriginFiles] = useState();
  const [data, setData] = useState();

  const [analyseData, setAnalyseData] = useState();
  const [selected, setSelected] = useState();

  const handleNewTraining = () => {
    setActive(0);
    setFiles(null);
    setOriginFiles(null);
    setData();
    setSelected();
    setAnalyseData();
  };

  return (
    <Stack p={"lg"} className="h-[calc(100vh-90px)]">
      <Box pos="relative" h={"100%"}>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "pink", type: "bars" }} />
        <Stepper active={active} w={"100%"} onStepClick={setActive}>
          <Stepper.Step label="FCA(PDF) Upload" icon={<IconUpload size={"1.2rem"} />}>
            <SingleUploadComponent
              nextStep={nextStep}
              files={files}
              setFiles={setFiles}
              setLoading={setLoading}
              loading={loading}
              setOriginFiles={setOriginFiles}
              originFiles={originFiles}
              setData={setData}
            />
          </Stepper.Step>
          <Stepper.Step label="Select Adapter" icon={<IconBrain size={"1.2rem"} />}>
            <SingleSelectAdapter
              prevStep={prevStep}
              nextStep={nextStep}
              data={data}
              setLoading={setLoading}
              setAnalyseData={setAnalyseData}
              setSelected={setSelected}
              selected={selected}
            />
          </Stepper.Step>
          <Stepper.Step label="Show Result" icon={<IconRosetteDiscountCheck size={"1.2rem"} />}>
            {analyseData && <SingleAnalyzedComponent data={analyseData} handleNewTraining={handleNewTraining} />}
          </Stepper.Step>
          {/* <Stepper.Completed>{analyseData && <SingleAnalyzedComponent data={analyseData} handleNewTraining={handleNewTraining} />}</Stepper.Completed> */}
        </Stepper>
      </Box>
    </Stack>
  );
}

//  description="You can Upload PDF or Image what you want scanning"
// description="You can select Adapter to scan the PDF or Image"
