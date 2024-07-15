"use client";

import { Box, Button, Flex, Group, Select, TextInput, useMantineColorScheme } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import moment from "moment";

export default function CRMRefernece(props) {
  const { colorScheme } = useMantineColorScheme();
  const { setCRMData, nextStep } = props;

  const [country, setCountry] = useState(null);
  const [birthdate, setBirthdate] = useState(null);

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState(null);
  const [cityList, setCityList] = useState(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      lender_name: "",
      first_name: "",
      last_name: "",
      birth: null,
      phone: "",
      country: null,
      state: "",
      street: "",
      zip: "",
      phone: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      lender_name: isNotEmpty("Lender Name is required"),
      first_name: isNotEmpty("First Name is required"),
      last_name: isNotEmpty("Last Name is required"),
      birth: isNotEmpty("Birthday is required"),
      phone: (value) => (value.length < 4 ? "Name must have at least 2 letters" : null),
      country: isNotEmpty("Country is required"),
      state: isNotEmpty("State is required"),
      street: isNotEmpty("Street is required"),
      zip: isNotEmpty("ZIP/Postal code is required"),
      phone: (value) => {
        if (!value || value.replace(/[^0-9]/g, "").length < 1) {
          return "Phone number is required";
        }
      },
    },
  });

  const handleCRMReferenceSubmit = (values) => {
    const formData = values;
    setCRMData({
      ...formData,
    });
    nextStep();
  };

  useEffect(() => {
    const handleGetCountryList = async () => {
      await GetCountries().then((result) => {
        setCountriesList(result);
      });
    };
    handleGetCountryList();
  }, []);

  const handleStateChange = async (value) => {
    const cityList = await GetCity(countryid, Number(value));
    setCityList(cityList);
  };

  const handleCountryChange = async (value) => {
    const listData = await GetState(Number(value));
    setStateList(listData);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleCRMReferenceSubmit(values))}>
      <Flex gap={"md"}>
        <Select
          w={"35%"}
          withAsterisk
          label="Country"
          value={country ? country.value : null}
          data={countriesList.map((item) => ({
            value: `${item.id}`,
            label: item.name,
          }))}
          onChange={(value, option) => {
            setCountry(option);
            form.setFieldValue("country", option.label);
            handleCountryChange(value);
          }}
          key={form.key("country")}
          searchable
        />
        <TextInput w={"65%"} label="Street address" withAsterisk key={form.key("street")} {...form.getInputProps("street")} />
      </Flex>
      <Flex gap={"md"} mt={"sm"}>
        <Select
          w={"100%"}
          label="State"
          withAsterisk
          data={
            stateList &&
            stateList.map((item) => ({
              value: `${item.id}`,
              label: item.name,
            }))
          }
          onChange={async (value, option) => {
            form.setFieldValue("state", option.label);
            setStateid(Number(value));
            GetCity(countryid, Number(value)).then((res) => {
              console.log("---", res);
              setCityList(res);
            });
          }}
          searchable
        />
        {cityList && cityList.length > 1 && (
          <Select
            w={"100%"}
            label="City"
            data={
              cityList &&
              cityList.map((item) => ({
                value: `${item.id}`,
                label: item.name,
              }))
            }
            onChange={(value) => {
              setCityid(Number(value));
            }}
            searchable
          />
        )}

        <TextInput w={"100%"} label="ZIP/Postal Code" key={form.key("zip")} {...form.getInputProps("zip")} withAsterisk />
      </Flex>
      <TextInput withAsterisk label="Email" placeholder="Email" key={form.key("email")} {...form.getInputProps("email")} mt={"sm"} />
      <Flex gap={"md"} mt={"sm"}>
        <TextInput withAsterisk label="First Name" w={"100%"} placeholder="First Name" key={form.key("first_name")} {...form.getInputProps("first_name")} />
        <TextInput withAsterisk label="Last Name" w={"100%"} placeholder="xxx" key={form.key("last_name")} {...form.getInputProps("last_name")} />
      </Flex>
      <TextInput withAsterisk mt={"sm"} label="Lender Name" placeholder="BrightAI" key={form.key("lender_name")} {...form.getInputProps("lender_name")} />
      <Flex gap={"md"} mt={"sm"}>
        <Box w={"100%"}>
          <label htmlFor="react-tel-input" className="m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label">
            Phone
            <span className="m_78a94662 mantine-InputWrapper-required mantine-TextInput-required" aria-hidden="true">
              {" "}
              *
            </span>
          </label>
          <PhoneInput
            country="us"
            value={form.values.phone}
            onChange={(phone) => form.setFieldValue("phone", phone)}
            id="react-tel-input"
            inputStyle={{
              border: form.errors.phone ? "1px solid #fa5252" : "",
              color: form.errors.phone ? "#fa5252" : "",
              // backgroundColor: colorScheme === "dark" ? "#2e2e2e !important" : "white",
            }}
          />
          {form.errors.phone && <div style={{ color: "#fa5252", marginTop: 5, fontSize: "12px" }}>{form.errors.phone}</div>}
        </Box>
        <DateInput
          w={"100%"}
          withAsterisk
          valueFormat="DD/MM/YYYY"
          label="Birthday"
          placeholder="Select Birthday"
          key={form.key("birth")}
          value={birthdate}
          onChange={(value) => {
            const date = moment(value).format("YYYY-MM-DD");
            setBirthdate(value);
            form.setFieldValue("birth", date);
          }}
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
