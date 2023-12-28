// tableData = users.map(({ uuid, name, email }) => {
//   const { requestedAmount, uuid: applicationUuid } =
//   applications.find((application) => application.userUuid === uuid) || {};
//   const { paymentAmount, paymentMethod } =
//   payments.find(
//     (payment) => payment.applicationUuid === applicationUuid
//   ) || {};

//   // Format table data to be passed into the table component, pay button tacked
//   // onto the end to allow payments to be issued for each row
//   return {
//     uuid,
//     name,
//     email,
//     requestedAmount: formatCurrency(requestedAmount),
//     paymentAmount: formatCurrency(paymentAmount),
//     paymentMethod,
//     initiatePayment: requestedAmount ? (
//       <Button
//         onClick={() =>
//           initiatePayment({
//             applicationUuid,
//             requestedAmount,
//           })
//         }
//         variant="contained"
//       >
//         Pay
//       </Button>
//     ) : null,
//   };
// });


const arr = new Array(3).fill(0)
const arrMap = arr.map(e => {
  console.log('hi mom')
})