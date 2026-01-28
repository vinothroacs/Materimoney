import { useState } from "react";
import toast from "react-hot-toast";
export const useMatrimonyForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profiles, setProfiles] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "", gender: "", dob: "", birthTime: "", maritalStatus: "",
    education: "", occupation: "", income: "",
    father: "", mother: "", grandfather: "", grandmother: "",
    siblings: "", kuladeivam: "", raasi: "", star: "", religion: "",   caste: "",  dosham: "",
    horoscope: null, address: "", city: "", country: "", privacy: "", photo: null,
  });

  const stepFields = [
    ["fullName", "gender", "dob", "birthTime", "maritalStatus"],
    ["education", "occupation", "income"],
    ["father", "mother", "grandfather", "grandmother"],
    ["raasi", "star", "dosham", "horoscope"],
    ["address", "city", "country"],
    ["privacy", "photo"],
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const validateStep = () => {
    const fields = stepFields[currentStep];
    if (!fields) return true;
    return fields.every((field) => formData[field] && formData[field] !== "");
  };

  const nextStep = () => {
    if (!validateStep()) {
      toast.error("Please fill all mandatory fields !");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const submitForm = () => {
    setProfiles((prev) => [...prev, formData]);
    toast.success("Profile submitted successfully 💍");
  };

  return { currentStep, formData, handleChange, handleFileChange, nextStep, prevStep, submitForm };
};