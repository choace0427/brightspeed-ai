import axios from "axios";

export const handleUpload = async (data) => {
  const response = await axios.post("https://3furpyspkp.eu-west-2.awsapprunner.com/api/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const handleAnalyze = async (data) => {
  const response = await axios.post("https://3furpyspkp.eu-west-2.awsapprunner.com/api/analyze", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const handleIdCardUpload = async (data) => {
  const response = await axios.post("https://3furpyspkp.eu-west-2.awsapprunner.com/api/id_card", data, {
    headers: {},
  });

  return response;
};
