import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import "./App.css";
import Table from "./components/table.jsx";
import Page from './components/page.jsx'
import { Container, Button } from "@material-ui/core";
import formatCurrency from "./utils/formatCurrency";

import { getUsers } from "./services/users.js";
import { getApplications } from "./services/applications.js";
import { getPayments, createPayment } from "./services/payments.js";

const App = () => {
  /**
   * Hydrate data for the table and set state for users, applications, and payments
   */
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState(1)
  useEffect(() => {
    async function fetchData() {
      const [usersData, applicationsData, paymentsData] = await Promise.all([
        getUsers(),
        getApplications(),
        getPayments(),
      ]);

      setUsers(usersData.body);
      setApplications(applicationsData.body);
      setPayments(paymentsData.body);
      setDataLoaded(true);
    }
    fetchData();
  }, []);

  const handlePage = (number) => {
    setPage(number)
  }

  const initiatePayment = async ({ applicationUuid, requestedAmount }) => {
    const { body } = await createPayment({
      applicationUuid,
      requestedAmount,
    });
    setPayments([...payments, body]);
  };

  let tableData = [];
  if (dataLoaded) {
    const lowerLimit = (page - 1) * 10 //0 for 
    const upperLimit = page * 10 - 1
    tableData = users.slice(lowerLimit, upperLimit).map(({ uuid, name, email }) => {
      const { requestedAmount, uuid: applicationUuid } =
      applications.find((application) => application.userUuid === uuid) || {};
      const { paymentAmount, paymentMethod } =
      payments.find(
        (payment) => payment.applicationUuid === applicationUuid
      ) || {};

      // Format table data to be passed into the table component, pay button tacked
      // onto the end to allow payments to be issued for each row
      return {
        uuid,
        name,
        email,
        requestedAmount: formatCurrency(requestedAmount),
        paymentAmount: formatCurrency(paymentAmount),
        paymentMethod,
        initiatePayment: requestedAmount ? (
          <Button
            onClick={() =>
              initiatePayment({
                applicationUuid,
                requestedAmount,
              })
            }
            variant="contained"
          >
            Pay
          </Button>
        ) : null,
      };
    });
  }
  //the numRows parameter should be based on page
  return (
    <div className="App">
      <Router>
        <Container>{dataLoaded && <Page numRows={users} handlePage={handlePage}/>}</Container>
        <Container>{dataLoaded &&  <Table data={tableData} />}</Container>
      </Router>
    </div>
  );
};

export default App;
