import { useState } from "react";
import Form from "../../components/common/Form/Form";
import { useTranslation } from "react-i18next";

// interface FormData {
//   name?: string;
//   email?: string;
//   message: string;
//   sentiments?: "";
// }

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const { t } = useTranslation();
  const getString = t;
  const handleSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <Form
      feedback={true}
      title={
        <>
          {getString("helpUsToImprove")}{" "}
          <span style={{ fontFamily: "Lucida Calligraphy" }}>
            <span style={{ color: "black" }}>Menu</span>
            -To-Go
          </span>
        </>
      }
      subTitle={
        <>
          {getString("feedBack")}{" "}
          <span
            style={{
              color: "var(--primary-color)",
              fontFamily: "Lucida Calligraphy",
            }}
          >
            <span style={{ color: "black" }}>Menu</span>
            -To-Go
          </span>
          <br />
          {getString("experienceQuestion")}
        </>
      }
      textFiledLabel={getString("pleaseTellUsInFewWords")}
      handleSubmit={handleSubmit}
      loading={loading}
      toastMessage={toastMessage}
      severity={severity}
      showToast={showToast}
      setShowToast={setShowToast}
    />
  );
}
