"use client";

import { Box, Button, Flex, Group, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import PhoneInput from "react-phone-input-2";

export default function CRMRefernece(props) {
  const { setCRMData, nextStep } = props;

  const [value, setValue] = useState();
  const [address, setAddress] = useState();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      lender_name: "",
      first_name: "",
      last_name: "",
      address: "",
      birth: "",
      phone: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      lender_name: isNotEmpty("Lender Name is required"),
      first_name: isNotEmpty("First Name is required"),
      last_name: isNotEmpty("Last Name is required"),
      address: isNotEmpty("Address Name is required"),
      birth: isNotEmpty("Birthday is required"),
      phone: (value) => (value.length < 4 ? "Name must have at least 2 letters" : null),
    },
  });

  const handleCRMReferenceSubmit = (values) => {
    const formData = values;
    setCRMData({
      ...formData,
      address: address,
    });
    nextStep();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleCRMReferenceSubmit(values))}>
      <TextInput withAsterisk label="Email" placeholder="Email" key={form.key("email")} {...form.getInputProps("email")} mt={"sm"} />
      <Flex gap={"md"} mt={"sm"}>
        <TextInput withAsterisk label="First Name" w={"100%"} placeholder="First Name" key={form.key("first_name")} {...form.getInputProps("first_name")} />
        <TextInput withAsterisk label="Last Name" w={"100%"} placeholder="xxx" key={form.key("last_name")} {...form.getInputProps("last_name")} />
      </Flex>
      <TextInput withAsterisk mt={"sm"} label="Lender Name" placeholder="BrightAI" key={form.key("lender_name")} {...form.getInputProps("lender_name")} />
      <Box w={"100%"} mt={"sm"}>
        <label htmlFor="address_global" className="m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label">
          Address
          <span class="m_78a94662 mantine-InputWrapper-required mantine-TextInput-required" aria-hidden="true">
            {" "}
            *
          </span>
        </label>
        <div className="m_6c018570 mantine-Input-wrapper mantine-TextInput-wrapper">
          <ReactGoogleAutocomplete
            apiKey={"AIzaSyD20fa8okNgStseZ2om1G0aaf7qzVmOvGQ"}
            className="m_8fb7ebe7 mantine-Input-input mantine-TextInput-input"
            id="address_global"
            onPlaceSelected={(place) => setAddress(place.formatted_address)}
            key={form.key("address")}
            {...form.getInputProps("address")}
          />
        </div>
      </Box>
      <Flex gap={"md"} mt={"sm"}>
        <Box w={"100%"}>
          <label htmlFor="react-tel-input" className="m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label">
            Phone
            <span class="m_78a94662 mantine-InputWrapper-required mantine-TextInput-required" aria-hidden="true">
              {" "}
              *
            </span>
          </label>
          <PhoneInput
            country={"us"}
            value={value}
            onChange={(phone) => setValue(phone)}
            id="react-tel-input"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
          />
        </Box>
        <DateInput
          w={"100%"}
          withAsterisk
          valueFormat="DD/MM/YYYY"
          label="DOB"
          placeholder="Select Birthday"
          key={form.key("birth")}
          {...form.getInputProps("birth")}
        />
      </Flex>

      <Group justify="flex-end" mt="md">
        <Button type="submit" leftSection={<IconSend size={"1rem"} />}>
          Submit
        </Button>
      </Group>
    </form>
  );
}
