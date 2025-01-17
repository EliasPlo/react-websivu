import React from "react";
import Form from "@rjsf/core";
import Validator from '@rjsf/validator-ajv8';

const schema = {
  title: "Lomake",
  type: "object",
  required: ["nimi", "ikä", "sukupuoli"],
  properties: {
    nimi: { type: "string", title: "Nimi" },
    ikä: { type: "integer", title: "Ikä", minimum: 0 },
    sukupuoli: {
      type: "string",
      title: "Sukupuoli",
      enum: ["Mies", "Nainen", "Muu"],
    },
    aihe: {
      type: "string",
      title: "Aihe",
      maxLength: 300,
    },
  },
};

const uiSchema = {
  aihe: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 3,
    },
  },
};

const FormComponent = () => {
  const handleSubmit = ({ formData }) => {
    console.log("Lomakkeen tiedot:", formData);
  };

  return (
    <div>
      <h1>Lomakekomponentti</h1>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={handleSubmit}
        validator={Validator}
      />
    </div>
  );
};

export default FormComponent;

