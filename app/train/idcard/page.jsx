"use client";

import { useState } from "react";
import { Box, LoadingOverlay, Stack, Stepper } from "@mantine/core";
import { IconUpload, IconBrain, IconRosetteDiscountCheck, IconEPassport } from "@tabler/icons-react";
import SingleAnalyzedComponent from "@/app/components/single/SingleAnalyzedComponent";
import CRMRefernece from "@/app/components/CRMReference";
import IDUpload from "@/app/components/IDUpload";
import IDcardAnalyzedComponent from "./IDcardAnalyzedComponent";

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

  const [crmData, setCRMData] = useState();
  const [idData, setIdData] = useState();

  return (
    <Stack p={"lg"} className="h-[calc(100vh-90px)]">
      <Box pos="relative" h={"100%"}>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "pink", type: "bars" }} />
        <Stepper active={active} w={"100%"} onStepClick={setActive}>
          <Stepper.Step label="CRM Reference Info" icon={<IconUpload size={"1.2rem"} />}>
            <CRMRefernece setCRMData={setCRMData} nextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step label="Id Card Upload" icon={<IconEPassport size={"1.2rem"} />}>
            <IDUpload
              crmData={crmData}
              nextStep={nextStep}
              setIdData={setIdData}
              idData={idData}
              setOriginFiles={setOriginFiles}
              originFiles={originFiles}
              setAnalyseData={setAnalyseData}
            />
          </Stepper.Step>
          <Stepper.Step label="Show Result" icon={<IconRosetteDiscountCheck size={"1.2rem"} />}>
            {analyseData && <IDcardAnalyzedComponent data={analyseData} handleNewTraining={handleNewTraining} />}
          </Stepper.Step>
          {/* <Stepper.Completed>{analyseData && <SingleAnalyzedComponent data={analyseData} handleNewTraining={handleNewTraining} />}</Stepper.Completed> */}
        </Stepper>
      </Box>
    </Stack>
  );
}
