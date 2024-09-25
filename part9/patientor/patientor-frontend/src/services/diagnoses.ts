import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const findByCode = async (code: string) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/${code}`
  );
  return data;
};

export default {
  findByCode
};

