import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

import { getUsers } from "./services/users";
import { getApplications } from "./services/applications";
import { getPayments, createPayment } from "./services/payments";

jest.mock("./services/users.js")
jest.mock("./services/applications.js")
jest.mock("./services/payments.js")

const usersDataYankel = {
  "body": [
    {
      "uuid": "123456",
      "name": "Yankel Cohen",
      "email": "jc@gmail.com"
    }
  ]
}

const usersDataMendel = {
  "body":[
  {
    "uuid": "12435",
    "name": "Mendel Simchovitz",
    "email": "therebbe770@gmail.com"
  }
]}

const applicationsDataMendel ={ "body": [
    {
    "uuid":"4aaf4534-531d-4c98-b838-23460fb34e5b",
    "userUuid":"12435",
    "requestedAmount":44798
    }
  ]}

const paymentsDataMendel = {"body": [
    {
    "uuid":"630890b2-3ca0-46a2-b4a3-3da1cb5ed76b",
    "applicationUuid":"4aaf4534-531d-4c98-b838-23460fb34e5b",
    "paymentMethod":"ACH",
    "paymentAmount":25551
    }
  ]}

test('table renders with headers', async () => {
  getUsers.mockResolvedValue(usersDataMendel)
  getApplications.mockResolvedValue(applicationsDataMendel)
  getPayments.mockResolvedValue(paymentsDataMendel)

  render(<App />);
  await waitFor(() => screen.getByRole('table'))
  const uuidHeader = screen.getByText(/Uuid/g);
  expect(uuidHeader).toBeInTheDocument();
  const nameHeader = screen.getByText(/Name/g);
  expect(nameHeader).toBeInTheDocument();
  const emailHeader = screen.getByText(/Email/g);
  expect(emailHeader).toBeInTheDocument();
  const requestedAmountHeader = screen.getByText(/Requested Amount/g);
  expect(requestedAmountHeader).toBeInTheDocument();
  const paymentAmountHeader = screen.getByText(/Payment Amount/g);
  expect(paymentAmountHeader).toBeInTheDocument();
  const paymentMethodHeader = screen.getByText(/Payment Method/g);
  expect(paymentMethodHeader).toBeInTheDocument();
  const initiatePaymentHeader = screen.getByText(/Initiate Payment/g);
  expect(initiatePaymentHeader).toBeInTheDocument();
});

test('button for users with app', async () => {
  
  getUsers.mockResolvedValue(usersDataMendel)
  getApplications.mockResolvedValue(applicationsDataMendel)
  getPayments.mockResolvedValue(paymentsDataMendel)

  render(<App />)
  
  const table = await screen.findByRole('table')
  const button = screen.getByRole("button")
  expect(table).toBeInTheDocument()
  expect(button).toBeInTheDocument()

})

test('button for users with app', async () => {
  
  getUsers.mockResolvedValue(usersDataYankel)
  getApplications.mockResolvedValue({"body": []})
  getPayments.mockResolvedValue({"body": []})

  render(<App />)
  
  const table = await screen.findByRole('table')
  const button = screen.queryByRole('button')
  expect(table).toBeInTheDocument()
  expect(button).not.toBeInTheDocument()

})