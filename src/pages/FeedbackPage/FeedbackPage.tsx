import { useState } from "react";
import Form from "../../components/Form/Form";

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

  const handleSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <Form
      feedback={true}
      title={
        <>
          Help us to improve{" "}
          <span style={{ fontFamily: "Lucida Calligraphy" }}>
            <span style={{ color: "black" }}>Menu</span>
            -To-Go
          </span>
        </>
      }
      subTitle={
        <>
          We'd love your feedback on your experience on{" "}
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
          How was your experience?
        </>
      }
      textFiledLabel=""
      handleSubmit={handleSubmit}
      loading={loading}
      toastMessage={toastMessage}
      severity={severity}
      showToast={showToast}
      setShowToast={setShowToast}
    />
  );
}
