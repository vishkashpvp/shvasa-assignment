import axios from "axios";
import { config } from "../config";

const endpoint = `${config.API_URL}/api/support-tickets`;

export function createTicketReq(payload) {
  return axios.post(endpoint, payload);
}

export function getAllTickets() {
  return axios.get(endpoint);
}
