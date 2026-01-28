import React from "react";
import { CloudArrowUpIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';
import { useMatrimonyForm } from "../Data/form";
import { useNavigate } from "react-router-dom";

const steps = [
  "தனிப்பட்ட விவரங்கள் / Personal Details",
  "கல்வி & தொழில் / Education & Career",
  "குடும்ப விவரங்கள் / Family Details",
  "ஜாதக விவரங்கள் / Horoscope Details",
  "முகவரி விவரங்கள் / Address Details",
  "சுயவிவர தனியுரிமை / Profile Visibility",
  "சுருக்கம் / Summary"
];

const MatrimonyForm = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    handleChange,
    handleFileChange,
    nextStep,
    prevStep,
    submitForm,
  } = useMatrimonyForm();

  const input =
    "w-full px-4 py-3 rounded-xl border border-[#D4BEE4] bg-white text-[#3B1E54] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]";
  const uploadBox =
    "relative w-40 h-40 rounded-2xl bg-[#D4BEE4] flex items-center justify-center overflow-hidden shadow-md cursor-pointer mx-auto mt-4";

  return (
    <div className="min-h-screen bg-[#9B7EBD] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-3 overflow-hidden min-h-[600px]">

        {/* LEFT STEPPER */}
        <div className="bg-[#D4BEE4] p-8 text-[#3B1E54]">
          <h2 className="text-2xl font-bold mb-10">
            சுயவிவரம் உருவாக்கவும் / Create Profile
          </h2>
          <ul className="space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-4">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                    i <= currentStep
                      ? "bg-[#3B1E54] text-white"
                      : "border border-[#3B1E54]/40 text-[#3B1E54]/50"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={
                    i === currentStep ? "font-bold" : "opacity-70 text-sm"
                  }
                >
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2 p-8 md:p-12 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="font-semibold text-[#3B1E54]"
            >
              ← வெளியேறு / Exit
            </button>
            <span className="text-sm text-[#3B1E54]/70 font-bold">
              படி {currentStep + 1} / Step {currentStep + 1} of 7
            </span>
          </div>

          <h3 className="text-2xl font-bold text-[#3B1E54] mb-8">
            {steps[currentStep]}
          </h3>

          <div className="flex-1 min-h-[350px]">

            {/* STEP 0 */}
            {currentStep === 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                <input className={input} name="fullName" placeholder="முழு பெயர் / Full Name" onChange={handleChange} value={formData.fullName} />
                <select className={input} name="gender" onChange={handleChange} value={formData.gender}>
                  <option value="">பாலினம் / Gender</option>
                  <option>ஆண் / Male</option>
                  <option>பெண் / Female</option>
                </select>
                <input type="date" className={input} name="dob" onChange={handleChange} value={formData.dob} />
                <input type="time" className={input} name="birthTime" onChange={handleChange} value={formData.birthTime} />
                <select className={input} name="maritalStatus" onChange={handleChange} value={formData.maritalStatus}>
                  <option value="">திருமண நிலை / Marital Status</option>
                  <option>திருமணம் ஆகாதவர் / Unmarried</option>
                  <option>விவாகரத்து பெற்றவர் / Divorced</option>
                  <option>விதவை / விதவர் / Widowed</option>
                </select>
              </div>
            )}

            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="grid md:grid-cols-2 gap-6">
                <input className={input} name="education" placeholder="கல்வித் தகுதி / Education" onChange={handleChange} value={formData.education} />
                <input className={input} name="occupation" placeholder="தொழில் / Occupation" onChange={handleChange} value={formData.occupation} />
                <input className={input} name="income" placeholder="வருமானம் / Income" onChange={handleChange} value={formData.income} />
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="grid md:grid-cols-2 gap-6">
                <input className={input} name="father" placeholder="தந்தையின் பெயர் / Father Name" onChange={handleChange} value={formData.father} />
                <input className={input} name="mother" placeholder="தாயின் பெயர் / Mother Name" onChange={handleChange} value={formData.mother} />
                <input className={input} name="grandfather" placeholder="தாத்தாவின் பெயர் / Grandfather Name" onChange={handleChange} value={formData.grandfather} />
                <input className={input} name="grandmother" placeholder="பாட்டியின் பெயர் / Grandmother Name" onChange={handleChange} value={formData.grandmother} />
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input className={input} name="raasi" placeholder="ராசி / Raasi" onChange={handleChange} value={formData.raasi} />
                  <input className={input} name="star" placeholder="நட்சத்திரம் / Star" onChange={handleChange} value={formData.star} />
                  <input className={input} name="dosham" placeholder="தோஷம் (இருந்தால்) / Dosham (if any)" onChange={handleChange} value={formData.dosham} />
                   <input
    className={input}
    name="religion"
    placeholder="மதம் / Religion"
    onChange={handleChange}
    value={formData.religion}
  />
    <input
    className={input}
    name="caste"
    placeholder="ஜாதி / Caste"
    onChange={handleChange}
    value={formData.caste}
  />

                </div>
                <label className="block">
                 <div className={uploadBox}>
  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer group px-4">
    {formData.horoscope ? (
      // ✅ Success State (Icon + Animation)
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <DocumentCheckIcon className="w-10 h-10 text-green-600" />
        </div>
        <span className="font-bold text-[#3B1E54] text-center">
          ஜாதகம் சேர்க்கப்பட்டது <br />
          <span className="text-xs text-green-600 font-medium">Horoscope Added Successfully!</span>
        </span>
        <p className="text-[10px] text-gray-400 mt-2 truncate max-w-[150px]">
          {formData.horoscope.name}
        </p>
      </div>
    ) : (
      // ☁️ Empty/Upload State
      <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
        <div className="w-16 h-16 bg-[#9B7EBD]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#9B7EBD]/20">
          <CloudArrowUpIcon className="w-10 h-10 text-[#9B7EBD]" />
        </div>
        <span className="font-bold text-[#3B1E54] text-center leading-tight">
          ஜாதகம் பதிவேற்றவும் <br />
          <span className="text-xs text-[#9B7EBD] font-medium italic">Click to browse Horoscope</span>
        </span>
        <p className="text-[10px] text-gray-400 mt-3 border border-dashed border-gray-300 px-3 py-1 rounded-full">
          PDF, JPG or PNG
        </p>
      </div>
    )}
    
    <input 
      type="file" 
      name="horoscope" 
      onChange={handleFileChange} 
      className="hidden" 
      accept=".pdf,image/*" 
    />
  </label>
</div>
                  <input type="file" name="horoscope" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="grid md:grid-cols-2 gap-6">
                <input className={input} name="address" placeholder="முகவரி / Address" onChange={handleChange} value={formData.address} />
                <input className={input} name="city" placeholder="நகரம் / City" onChange={handleChange} value={formData.city} />
                <input className={input} name="country" placeholder="நாடு / Country" onChange={handleChange} value={formData.country} />
              </div>
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <div className="space-y-6 text-[#3B1E54]">
                <div className="flex gap-4">
                  <label className="flex gap-2">
                    <input type="radio" name="privacy" value="Public" onChange={handleChange} /> பொது / Public
                  </label>
                  <label className="flex gap-2">
                    <input type="radio" name="privacy" value="Private" onChange={handleChange} /> தனிப்பட்டது / Private
                  </label>
                </div>
                <label className="block">
                  <div className={uploadBox}>
                    {formData.photo ? (
                      <span className="font-bold">புகைப்படம் சேர்க்கப்பட்டது / Photo Added</span>
                    ) : (
                      <span>சுயவிவர புகைப்படம் / Profile Photo</span>
                    )}
                  </div>
                  <input type="file" name="photo" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            )}

            {/* STEP 6 */}
            {currentStep === 6 && (
              <div className="space-y-2 text-[#3B1E54] bg-[#D4BEE4]/20 p-6 rounded-2xl">
                <p><b>பெயர் / Name:</b> {formData.fullName}</p>
                <p><b>கல்வி / Education:</b> {formData.education}</p>
                <p><b>ராசி / Raasi:</b> {formData.raasi}</p>
                <p><b>நட்சத்திரம் / Star:</b> {formData.star}</p>
                <p><b>தனியுரிமை / Privacy:</b> {formData.privacy}</p>
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-8 border-t pt-6">
            <button onClick={prevStep} className={`px-6 py-2 border rounded-xl font-bold ${currentStep === 0 ? "invisible" : "text-[#3B1E54]"}`}>
              பின்செல் / Back
            </button>
          <button onClick={currentStep === 6 ? () => { submitForm(); navigate("/user-dashboard"); } : nextStep} className="px-10 py-3 bg-[#3B1E54] text-white rounded-xl font-bold shadow-lg" > {currentStep === 6 ? "Submit" : "Next"} </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonyForm;
