import axios from "axios";
import { config } from "../config";

const endpoint = `${config.API_URL}/api/support-agents`;

export function createAgentReq(payload) {
  return axios.post(endpoint, payload);
}
