"use client";

import { ActionIcon, Flex, ScrollArea, Stack } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import PDF from "react-pdf-js";

export default function PdfViewer({ pdf, key }) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const onDocumentComplete = (numPages) => {
    setPages(numPages);
  };

  const onDocumentError = (err) => {
    console.error("pdf viewer error:", err);
  };

  const onPage = (type) => {
    var newPage = type ? page + 1 : page - 1;

    if (newPage > pages) {
      newPage = 1;
    } else if (newPage < 1) {
      newPage = pages;
    }

    setPage(newPage);
  };

  return (
    <>
      <Stack h={500}>
        <div className="relative">
          <ScrollArea h={700} w={610} offsetScrollbars>
            <PDF key={key} file={pdf} onDocumentComplete={onDocumentComplete} onDocumentError={onDocumentError} page={page} scale={1} />
          </ScrollArea>
          {/* <ActionIcon color="red" radius={"xl"} className="top-[-12px] right-[-12px]" style={{ position: "absolute" }} onClick={() => setFiles(null)}>
            <IconX size={"0.9rem"} />
          </ActionIcon> */}
        </div>
        <Flex justify={"center"} gap={"md"} align={"center"}>
          <ActionIcon onClick={() => onPage(0)} variant="outline" radius={"xl"}>
            <IconChevronLeft />
          </ActionIcon>
          <div>
            <span style={{ textAlign: "center" }}>
              Page {page} of {pages}
            </span>
          </div>
          <ActionIcon onClick={() => onPage(1)} variant="outline" radius={"xl"}>
            <IconChevronRight />
          </ActionIcon>
        </Flex>
      </Stack>
    </>
  );
}
