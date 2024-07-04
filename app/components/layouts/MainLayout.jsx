import { Box, Flex, Stack } from "@mantine/core";
import HeaderSection from "./Header";
import SidebarSection from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <main className="min-h-screen">
      <Flex className="h-screen" w={"100%"}>
        <Box w={400} className="h-[calc(100vh - 67px)]">
          <SidebarSection />
        </Box>
        <Stack w={"100%"}>
          <HeaderSection />
          <div className="w-full">{children}</div>
        </Stack>
      </Flex>
    </main>
  );
}
