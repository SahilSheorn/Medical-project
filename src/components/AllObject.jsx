export const medicalTests = [
    {
        category: "HAEMATOLOGY",
        tests: [
            {
                testName: "Haemoglobin(Hb)",
                testRefValueM: "Male (14-16 gms %)",
                testRefValueF: "Female (12-14 gms%)",
                unit: "gm%",
            },
            {
                testName: "ESR (W.G)",
                testRefValueM: "Male(5-15 mm.)",
                testRefValueF: "Female(5-20 mm.)",
                unit: "mm in 1st Hr. ",
            },
            {
                testName: "TLC",
                testRefValue: "(4000-11000/cumm)",
                unit: "/cmm ",
            },
            {
                testName: "Absolute Eosinophils Count",
                testRefValue: "(40-440)",
                unit: "/cmm",
            },
            {
                testName: "Platelet's Count",
                testRefValue: "(1,50,000-4,50,000)",
                unit: "/cmm",
            },
            {
                testName: "Bleeding time",
                testRefValue: "(2-5 min)",
                unit: "min",
            },
            {
                testName: "Clotting time",
                testRefValue: "(3-7 min)",
                unit: "min",
            },
            {
                testName: "R.B. C's Count",
                testRefValue: "(4.5-6.5 million / cumm)",
                unit: "NA",
            },
            {
                testName: "Malaria Parasite  (Card Test)",
                testRefValue: "NA",
                unit: "NA",
            },
        ],
    },
    {
        category: "DLC",
        tests: [
            {
                testName: "Polymorphs",
                testRefValue: "(40-60%)",
                unit: "%",
            },
            {
                testName: "Lymphocytes",
                testRefValue: "(40-60%)",
                unit: "%",
            },
            {
                testName: "Monocytes",
                testRefValue: "(2-6%)",
                unit: "%",
            },
            {
                testName: "Eosinophils",
                testRefValue: "(1-5%)",
                unit: "%",
            },
            {
                testName: "Basophils",
                testRefValue: "(<1%)",
                unit: "%",
            },
            {
                testName: "Immature Cells",
                testRefValue: "NIL",
                unit: "%",
            },
        ],
    },
    {
        category: "Bio-Chemistry",
        tests: [
            {
                testName: "Blood Sugar(Fasting)",
                testRefValue: "(70-100 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName: "Blood Sugar(2 hr. Post Prandial)",
                testRefValue: "(90-140 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName: "Blood Sugar (Random)",
                testRefValue: "(80-120 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName: "HbA1c (Glycated Haemoglobin)",
                testRefValue: "(4.5%-6.3%)",
                unit: "%",
            },
            {
                testName: "Blood Urea ",
                testRefValue: "(15-40 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName: "BUN",
                testRefValue: "(9 - 23 mg/dl)",
                unit: "mg/dL",
            },
            {
                testName: "Serum Creatinine",
                testRefValue: "(0.9 to 1.4 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName: "Serum Cholesterol",
                testRefValue: "(150-250 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName: "Serum Uric Acid",
                testRefValueM: "(3.0-7.5 mg /dL)",
                testRefValueF: "F(1.5 - 6.0 mg /dL)",
                unit: "mg/dL",
            },
            {
                testName: "Serum Total Protein",
                testRefValue: "(9 - 23 mg/dl)",
                unit: "gm/dL",
            },
            {
                testName: "Serum Albumin",
                testRefValue: "(3.5-5.0 gm/dL)",
                unit: "gm/dL",
            },
            // {
            //     testName: "Serum Total Protein",
            //     testRefValue: "(9 - 23 mg/dl)",
            //     unit: "gm/dL",
            // },
            // {
            //     testName: "Serum Total Protein",
            //     testRefValue: "(9 - 23 mg/dl)",
            //     unit: "gm/dL",
            // },
            // {
            //     testName: "Serum Total Protein",
            //     testRefValue: "(9 - 23 mg/dl)",
            //     unit: "gm/dL",
            // },
        ],
    },
    {
        category: "LIPID PROFILE",
        tests: [
            {
                testName: "Serum Cholesterol",
                testRefValue: "(150-200 mg/dl)",
                unit: "mg/dl",
            },
            {
                testName:"HDL Cholesterol",
                testRefValue: "(30-65 mg/dl)",
                unit: "mg/dl",
            },
            {
                testName:"LDL Cholesterol",
                testRefValue: "(50-190 mg/dl)",
                unit: "mg/dl",
            },
            {
                testName:"VLDL Cholesterol",
                testRefValue: "(up to 40 mg/dl)",
                unit: "mg/dl",
            },
            {
                testName:"Serum Triglycerides",
                testRefValue: "(65-170 mg/dl)",
                unit: "mg/dl",
            },
            {
                testName:"Total Cholesterol HDLRatio",
                testRefValue: "(< 5.1 )",
                unit: "mg/dl",
            }
        ]
    },
    {
        category: "RENAL FUNCTION TEST (RFT)",
        tests: [
            {
                testName: "Blood Urea ",
                testRefValue: "(15-40 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName:"Serum Creatinine",
                testRefValue: "(0.9 to 1.4 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName:"Serum Uric Acid",
                testRefValue: "(3.0-7.5 mg /dL)",
                unit: "mg/dL",
            },
            {
                testName:"Serum Albumin",
                testRefValue: "(3.5 - 5.0 gm/dL)",
                unit: "mg/dL",
            },
            {
                testName:"Serum Protein",
                testRefValue: "(5.5 - 8.0 gm/dL)",
                unit: "mg/dL",
            },
            {
                testName:"Serum Na+",
                testRefValue: "(135 - 155 mmol/L)",
                unit: "mmol/L",
            },
            {
                testName:"Serum K+",
                testRefValue: "(3.5 - 5.5 mmo/L",
                unit: "mmol/L",
            },
            {
                testName:"Phosphours",
                testRefValue: "(2.5 - 4.5 mg/dl)",
                unit: "mg/dL",
            },

        ]
    },
    {
        category: "AG RATIO",
        tests: [
            {
                testName: "Serum Protein",
                testRefValue: "(5.5-8.0 gm /dl)",
                unit: "gm/dl",
            },
            {
                testName:"Serum Albumin",
                testRefValue: "(3.5-5.0 gm/dl)",
                unit: "gm/dl",
            },
            {
                testName:"Serum Globulin",
                testRefValue: "(1.8-3.6 gm/dl)",
                unit: "gm/dl",
            },
            {
                testName:"AG Ratio",
                testRefValue: "(1.2: 1 to 2:1 )",
                unit: "",
            },
        ]
    },
    {
        category: "LIVER FUNCTION TEST (LFT)",
        tests: [
            {
                testName: "Serum Bilirubin (Total)",
                testRefValue: "(0.2-1.0 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName:"Direct (Conjugated)",
                testRefValue: "(0.0-0.2 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName:"Indirect (Unconjugated)",
                testRefValue: "(0.2-0.8 mg/dL)",
                unit: "mg/dL",
            },
            {
                testName:"SGOT",
                testRefValue: "(8-40 Units)",
                unit: "Units",
            },
            {
                testName:"SGPT",
                testRefValue: "(5 - 35 Units)",
                unit: "Units",
            },
            {
                testName:"Serum Alkaline Phosphatase",
                testRefValue: "37-147 IU/L",
                unit: "IU/L",
            },
            {
                testName:"GAMMA GT (GGTP)",
                testRefValue: "(10 - 45 U/L)",
                unit: "U/L",
            },
            {
                testName:"Creatine phosphokinase CK(CPK)",
                testRefValue: "(25-200 IU/L)",
                unit: "IU/L",
            },
            {
                testName:"CPK -MB",
                testRefValue: "(25-200 IU/L)",
                unit: "U/L",
            },
            {
                testName:"LDH",
                testRefValue: "(114 -240 IU/L)",
                unit: "IU/L",
            },
            {
                testName:"Total Acid Phosphatase",
                testRefValue: "(0-9 U/L)",
                unit: "U/L",
            },
            {
                testName:"Prostatic Acid Phosphatase",
                testRefValue: "(0-3 U/L)",
                unit: "U/L",
            },
            {
                testName:"Serum Bicarbonate",
                testRefValue: "(22- 33 mEq/L)",
                unit: "mEq/L",
            },
            {
                testName:"Serum Magnesium",
                testRefValue: "(1.32 -2.14 mEq/L)",
                unit: "mEq/L",
            },
            {
                testName:"Serum Amylase",
                testRefValue: "(Less than 86 U/L)",
                unit: "mEq/L",
            },
            {
                testName:"Serum Bicarbonate",
                testRefValue: "(22- 33 mEq/L)",
                unit: "U/L",
            },
            {
                testName:"Cholinesterase(CHE)",
                testRefValue: "(3700-11500U/L)at 300c",
                unit: "",
            },
        ]
    },
    {
        category: "SEROLOGICAL TEST",
        tests: [
            {
                testName: "Serum Protein",
                testRefValue: "(5.5-8.0 gm /dl)",
                unit: "gm/dl",
            },
            {
                testName:"Serum Albumin",
                testRefValue: "(3.5-5.0 gm/dl)",
                unit: "gm/dl",
            },
            {
                testName:"Serum Globulin",
                testRefValue: "(1.8-3.6 gm/dl)",
                unit: "gm/dl",
            },
            {
                testName:"AG Ratio",
                testRefValue: "(1.2: 1 to 2:1 )",
                unit: "",
            },
        ]
    },
];
    // },


    // {
    //     name: 'Urine Test',
    //     description: 'A test to analyze urine components.',
    // },
    // {
    //     name: 'X-Ray',
    //     description: 'A medical imaging technique to visualize the inside of the body.',
    // },
    // {
    //     name: 'CT Scan',
    //     description: 'A detailed cross-sectional imaging of the body.',
    // },
// ];