import React from "react";
import "../index.css";
import { useSelector } from "react-redux";

const Report = () => {
  const reportData = useSelector((state) => state.reportData);

  const filterCharacters = (value) => {
    // Remove letters, dots, percent signs, and slashes
    return value.replace(/[a-zA-Z.%/]/g, '').trim();
  };

  return (
    reportData.length > 0 && (
      <div className="container" style={{ minHeight: "50vh" }}>
        <div className="report">
          <table className="table">
            <thead>
              <tr>
                <th>Investigation</th>
                <th>Result</th>
                <th>Reference Value</th>
                <th>Unit</th>
              </tr>
            </thead>
            <>
              {reportData?.map((item, index) => {
                return (
                  <tbody key={index} eventKey={index.toString()}>
                    <tr>
                      <td className="font-bold">{item?.category}</td>
                      <td className="font-bold"></td>
                      <td className="font-bold"></td>
                      <td className="font-bold"></td>
                      <td className="font-bold"></td>
                    </tr>
                    <>
                      {Object.keys(item)
                        .filter((key) => key !== "category")
                        .map((key, testIndex) => {
                          const test = item[key];
                          console.log("test 39=>", test);

                          return (
                            <tr key={testIndex}>
                              <td>{test?.investigation}</td>
                              <td>{test?.result}</td>
                              <td>{filterCharacters(test?.referenceValue)}</td>
                              <td>{test?.unit}</td>
                            </tr>
                          );
                        })}
                    </>
                  </tbody>
                );
              })}
            </>
          </table>
          <div className="pt-4">
            <p>
              <span className="font-semibold">Instruments:</span> Fully
              automated cell counter-Mindray300
            </p>
            <p>
              <span className="font-semibold">Interpretation:</span> Further
              confirm for Anemia
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Report;