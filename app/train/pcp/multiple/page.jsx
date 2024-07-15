"use client";

import { useState } from "react";
import { Box, Button, Flex, LoadingOverlay, Select, Stack, Stepper, Text } from "@mantine/core";
import { IconUpload, IconBrain, IconAnalyze, IconRosetteDiscountCheck } from "@tabler/icons-react";
import { toast } from "react-toastify";
import MultipleAnalyzedComponent from "@/app/components/multiple/MultipleAnalyzedComponent";
import MultipleUploadComponent from "@/app/components/multiple/MultipleUploadComponent";
import MultipleSelectAdapter from "@/app/components/multiple/MultipleSelectAdapter";

export default function Home() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [originFiles, setOriginFiles] = useState();
  const [data, setData] = useState();

  //add upload files
  const [addMoreFiles, setAddMoreFiles] = useState(null);
  const [add, setAdd] = useState(false);

  const [analyseData, setAnalyseData] = useState();
  const [selected, setSelected] = useState();

  const handleNewTraining = () => {
    setActive(0);
    setOriginFiles(null);
    setData();
    setSelected();
    setAnalyseData();
  };

  return (
    <Stack className="h-[calc(100vh-90px)]">
      <Box pos="relative" h={"100%"} p={"lg"}>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "pink", type: "bars" }} />
        <Stepper active={active} w={"100%"} onStepClick={setActive}>
          <Stepper.Step label="PDF or Image Upload" icon={<IconUpload size={"1.2rem"} />}>
            <MultipleUploadComponent
              prevStep={prevStep}
              nextStep={nextStep}
              originFiles={originFiles}
              setOriginFiles={setOriginFiles}
              setLoading={setLoading}
              loading={loading}
              setData={setData}
              setAddMoreFiles={setAddMoreFiles}
              addMoreFiles={addMoreFiles}
              add={add}
              setAdd={setAdd}
            />
          </Stepper.Step>
          <Stepper.Step label="Select Adapter" icon={<IconBrain size={"1.2rem"} />}>
            <MultipleSelectAdapter
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
            {analyseData && <MultipleAnalyzedComponent data={analyseData} handleNewTraining={handleNewTraining} />}
          </Stepper.Step>
          {/* <Stepper.Completed>{analyseData && <MultipleAnalyzedComponent data={analyseData} handleNewTraining={handleNewTraining} />}</Stepper.Completed> */}
        </Stepper>
      </Box>
    </Stack>
  );
}

// description="You can Upload PDF or Image what you want scanning"
// description="You can select Adapter to scan the PDF or Image"
// description="You can see the scanned result"
