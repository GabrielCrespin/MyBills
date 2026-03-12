import axios from "axios";

const API_URL = "http://localhost:5091/api/bills";

export const getBills = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBill = async (bill) => {
  const response = await axios.post(API_URL, bill);
  return response.data;
};

export const deleteBill = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateBill = async (bill) => {
  await axios.put(`${API_URL}/${bill.id}`, bill);
};