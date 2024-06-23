import emailjs from "@emailjs/browser";
import { useState } from "react";
import Form from "../../components/Form/Form";

interface FormData {
  name?: string;
  email?: string;
  message: string;
  sentiments?: string;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const sendEmail = (
    formValues: FormData,
    setFormValuesLocal: React.Dispatch<React.SetStateAction<FormData>>
  ) => {
    console.log(formValues);
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_REACT_APP_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_TEMPLATE_ID,
        {
          user_name: formValues.name,
          user_email: formValues.email,
          message: formValues.message,
        },
        import.meta.env.VITE_REACT_APP_PUBLIC_ID
      )
      .then(
        () => {
          setLoading(false);
          setToastMessage("Your request has been submitted successfully!");
          setSeverity("success");
          setShowToast(true);
          setFormValuesLocal({
            name: "",
            email: "",
            message: "",
          });
        },
        () => {
          setLoading(false);
          setToastMessage("Failed to submit your request. Please try again.");
          setSeverity("error");
          setShowToast(true);
        }
      );
  };

  return (
    <Form
      feedback={false}
      title={<>Contact Us</>}
      subTitle={
        <>
          Have a question? Feel free to contact us.
          <br />
          We are happy to help you!
        </>
      }
      textFiledLabel=""
      handleSubmit={sendEmail} // Pass formValues to sendEmail
      loading={loading}
      toastMessage={toastMessage}
      severity={severity}
      showToast={showToast}
      setShowToast={setShowToast}
    />
  );
}
