
import React from "react";
import { Accordion } from "react-bootstrap";

const MyAccordion = (props) => {
  console.log("Props Data=>", props.resultData);
  const resultTestData = props?.resultData?.filter((data) => data);
  return (
    <div className="mt-5">
      <Accordion>
        {resultTestData.map((item, index) => {
        //   console.log("item=>", item);

          return (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
                <p>{item.category}</p>
              </Accordion.Header>
              <Accordion.Body>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Investigation</th>
                      <th>Result</th>
                      <th>Reference Value</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(item).map((test, testIndex) => {
                    //   console.log("test=>", Object.keys(test))
                      return (
                       ( Object.keys(test) !== "category") && <tr key={testIndex}>
                          <td>{test.investigation}</td>
                          <td>{test.result}</td>
                          <td>{test.referenceValue}</td>
                          <td>{item.unit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default MyAccordion;
