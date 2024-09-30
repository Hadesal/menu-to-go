import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Form from "../../components/Form/Form";
import { useAppSelector } from "../../redux/reduxHooks";

interface FormData {
  name?: string;
  email?: string;
  message: string;
  sentiments?: string;
  typeOfInquiry?: string;
}

export default function ContactPage() {
  const { user } = useAppSelector((state) => state.userData);

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
          user_name: user?.name,
          user_email: user?.email,
          inquiry_type:
            formValues.sentiments === ""
              ? formValues.typeOfInquiry
              : `${formValues.typeOfInquiry} (${formValues.sentiments})`,
          message: formValues.message,
          ticket_number: Math.floor(1000 + Math.random() * 9000).toString(),
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
            message: "",
            typeOfInquiry: "General Inquiry",
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
      handleSubmit={sendEmail}
      loading={loading}
      toastMessage={toastMessage}
      severity={severity}
      showToast={showToast}
      setShowToast={setShowToast}
    />
  );
}
