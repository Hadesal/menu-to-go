import emailjs from "@emailjs/browser";
import { useState } from "react";
import Form from "../../components/Form/Form";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();
  const getString = t;


  const sendEmail = (
    formValues: FormData,
    setFormValuesLocal: React.Dispatch<React.SetStateAction<FormData>>
  ) => {
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
          setToastMessage(getString("toastSuccessfully"));
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
          setToastMessage(getString("toastFail"));
          setSeverity("error");
          setShowToast(true);
        }
      );
  };

  return (
    <Form
      feedback={false}
      title={<>{getString("contactUs")}</>}
      subTitle={
        <>
          {getString("haveQuestionText")}
          <br />
          {getString("happyToHelpText")}
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
