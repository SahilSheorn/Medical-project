import React, { useEffect, useState } from "react";
import { medicalTests } from "./AllObject";
import { useSelector, useDispatch } from "react-redux";
import { addReportData } from "../redux/formDataSlice";
import axios from "axios";
const Test = () => {
  const dispatch = useDispatch();

  const gender = useSelector((state) => state?.patientData?.gender);
  console.log("gender", gender);
  const patientData = useSelector((state) => state.patientData);

  const [selectedTestIndex, setSelectedTestIndex] = useState(null);
  const [resultTestData, setResultTestData] = useState();
  const [testResults, setTestResults] = useState([]);
  const [info, setinfo] = useState(patientData);

  const handleTestSelection = (e) => {
    setSelectedTestIndex(
      e.target.value !== "" ? parseInt(e.target.value, 10) : null
    );
    // setTestResults([]); // Clear testResults when a new test is selected
  };

  const handleTestResultChange = (
    testIndex,
    result,
    item,
    selectedTestIndex,
    refValue,
    category
  ) => {
    // console.log("item index=>",item, testIndex, selectedTestIndex, refValue)
    const updatedResults = [...testResults];

    if (updatedResults) {
      // console.log("updatedResults[selectedTestIndex]=>",updatedResults[selectedTestIndex]);
      updatedResults[selectedTestIndex] = {
        ...(updatedResults[selectedTestIndex]
          ? updatedResults[selectedTestIndex]
          : {}),
        [item.testName]: {
          result: result,
          investigation: item.testName,
          referenceValue: refValue,
          unit: item.unit,
        },
        category: category,
      };
    }
    setTestResults(updatedResults);
    console.log("This is updateResults", updatedResults);
  };

  useEffect(() => {
    setinfo(patientData);
  }, [patientData]);

  const baseUrl = "http://localhost:5000/user";

  const handleSaveResult = async () => {
    const combinedData = { info, testResults };

    console.log("CombinedData", combinedData, testResults);
    try {
      const response = await axios.post(baseUrl, combinedData);
      console.log("Response:", response.data);
      dispatch(addReportData(testResults));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    gender !== "NA" && (
      <div className="container mt-5 print-d-none">
        <div className="card">
          <div className="card-body">
            <h2>Medical Test Selection</h2>

            <label htmlFor="testSelect">Select a Medical Test:</label>
            <select
              id="testSelect"
              className="form-select"
              value={selectedTestIndex !== null ? selectedTestIndex : ""}
              onChange={handleTestSelection}
            >
              <option value="">Select a test</option>
              {medicalTests.map((item, index) => (
                <option key={index} value={index}>
                  {item.category}
                </option>
              ))}
            </select>

            {selectedTestIndex !== null && (
              <div>
                <h3 style={{ textAlign: "center" }}>
                  {medicalTests[selectedTestIndex].category}
                </h3>
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
                    {medicalTests[selectedTestIndex].tests.map(
                      (item, index) => {
                        const result =
                          testResults &&
                          testResults[selectedTestIndex] &&
                          testResults[selectedTestIndex][item?.testName]
                            ?.result;
                        const refValue =
                          (gender === "male"
                            ? item.testRefValueM
                            : item.testRefValueF) || item.testRefValue;

                        return (
                          <tr key={index}>
                            <td>{item.testName}</td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                // testResults && testResults[selectedTestIndex] && testResults[selectedTestIndex][item?.testName]?.result
                                value={result || ""}
                                onChange={(e) =>
                                  handleTestResultChange(
                                    index,
                                    e.target.value,
                                    item,
                                    selectedTestIndex,
                                    refValue,
                                    medicalTests[selectedTestIndex].category
                                  )
                                }
                              />
                              {item.result}
                            </td>
                            <td>{refValue}</td>
                            <td>{item.unit}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
                <button className="btn btn-primary" onClick={handleSaveResult}>
                  Save Result
                </button>
              </div>
            )}
          </div>
        </div>
        {/* {resultTestData && <MyAccordion resultData={resultTestData} />} */}
      </div>
    )
  );
};

export default Test;