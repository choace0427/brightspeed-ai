"use client";

import { useState } from "react";
import { Group, Code, Title, Divider, Stack, Box } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconReport,
  IconEPassport,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../../styles/NavbarSegmented.module.css";
import { usePathname } from "next/navigation";

const data = [
  { link: "pcp", label: "PCP Contract", icon: IconReport },
  { link: "passport", label: "Passport Contract", icon: IconEPassport },
];

export default function SidebarSection() {
  const pathname = usePathname();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={pathname.includes(item.label) ? true : undefined}
      href={item.link}
      key={item.label}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(item.label);
      // }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between" px={"lg"} py={"md"}>
          {/* <MantineLogo size={28} inverted style={{ color: "white" }} /> */}
          <Title order={3}>BrightSpeed.ai</Title>
        </Group>
        <Divider w={"100%"} color="white" />
        <Box p={"md"}>{links}</Box>
      </div>
      <Divider color="white" />
      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
