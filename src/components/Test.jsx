import React, { useEffect, useState } from "react";
import { medicalTests } from "./AllObject";
import { useSelector, useDispatch } from "react-redux";
import { addReportData } from "../redux/formDataSlice";
import axios from "axios";
import Select from "react-select"; // Import react-select
import { Link } from "react-router-dom";
import GoBack from './Img/goBack.png'
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


const Test = ({handleTabClick}) => {
  // const navigate = useNavigate();
  // Other state and function declarations...

  const handleNavigateToPatientInfo = () => {
    handleTabClick('Patient Info'); // Call handleTabClick with the tab name
  };

  const [activeTab, setActiveTab] = useState('Patient Info');

  const dispatch = useDispatch();

  const gender = useSelector((state) => state?.patientData?.gender);
  console.log("gender", gender);
  const patientData = useSelector((state) => state.patientData);

  const [selectedTestIndexes, setSelectedTestIndexes] = useState([]);
  const [resultTestData, setResultTestData] = useState();
  const [testResults, setTestResults] = useState([]);
  const [info, setinfo] = useState(patientData);

  const handleTestSelection = (selectedOptions) => {
    const indexes = selectedOptions.map(option => option.value);
    setSelectedTestIndexes(indexes);
    // setTestResults([]); // Clear testResults when new tests are selected
  };

  const handleTestResultChange = (
    testIndex,
    result,
    item,
    selectedTestIndex,
    refValue,
    category
  ) => {
    const updatedResults = [...testResults];

    if (updatedResults) {
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

  // Convert medicalTests into options array for react-select
  const options = medicalTests.map((item, index) => ({
    value: index,
    label: item.category,
  }));


  // // Function to handle navigation back to PatientInfo
  // const handleGoBack = () => {
  //   history.goBack();
  // };

  return (
    gender !== "NA" && (
      <div className="container mt-5 print-d-none">
        <div className="card w-[630px]">
          <div className="card-body">
            <div className="flex items-center mb-8">
              {/* Clickable image to navigate to PatientInfo */}
              <img src={GoBack} alt="Go Back" className="h-12 cursor-pointer" onClick={handleNavigateToPatientInfo} />
            </div>
            <h2>Medical Test Selection</h2>

            <label htmlFor="testSelect">Select Medical Test Categories:</label>
            <Select
              isMulti
              id="testSelect"
              options={options}
              onChange={handleTestSelection}
            />

            {selectedTestIndexes.length > 0 && (
              <div className="mt-3">
                {selectedTestIndexes.map(selectedTestIndex => (
                  <div key={selectedTestIndex}>
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
                  </div>
                ))}
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
