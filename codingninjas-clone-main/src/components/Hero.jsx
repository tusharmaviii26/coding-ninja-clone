import React, { useState, useRef, useEffect } from "react";

/* ---------------- CUSTOM SELECT COMPONENT ---------------- */

function TopicSelect({ value, setValue, touched, setTouched }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setTouched(true);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setTouched]);

  const options = ["Full Stack Development", "Data Analytics", "Gen AI"];
  const error = touched && !value;

  return (
    <div className=" relative" ref={ref}>
      <label className="text-[12px] text-gray-700">
        Select topic of interest
      </label>

      <div
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full p-2 text-xs sm:text-sm
          border rounded-md cursor-pointer
          bg-white flex justify-between items-center
          ${
            error
              ? "border-red-500"
              : open
              ? "border-blue-500"
              : "border-gray-300"
          }
          ${value ? "text-black" : "text-gray-400"}
        `}
      >
        {value || "Select your options/choices"}
        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                setValue(item);
                setOpen(false);
                setTouched(true);
              }}
              className="px-4 py-3 cursor-pointer text-[13px] hover:bg-gray-200"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-[11px] text-[#F66B60]">
          Topic of interest is required
        </p>
      )}
    </div>
  );
}


/* ---------------- HERO COMPONENT ---------------- */

export default function Hero() {
  const [topic, setTopic] = useState("");
  const [topicTouched, setTopicTouched] = useState(false);

  const [experienceTouched, setExperienceTouched] = useState(false);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const isError = (field) => touched[field] && !values[field];

  return (
    <section className="relative w-full bg-[#15181A] text-white pt-10 pb-16 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-10 z-10">

        {/* LEFT TEXT SECTION */}
        <div className="lg:w-[44%] text-left sm:text-center lg:text-left flex flex-col items-center lg:items-start w-full">

          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c23a] to-[#C6FF4D] font-semibold text-[16px] sm:text-[16px] lg:text-lg mb-5 sm:mb-8">
            Restricted by opportunities?
          </p>
          <h1 className="text-3xl sm:text-3xl md:text-[2.8rem] font-bold mb-12 sm:mb-20 leading-normal sm:leading-normal lg:leading-snug">
            Get the tech career <br />
            you deserve. <span>Faster.</span>
          </h1>

          <div className="space-y-6 sm:space-y-10 w-full">
            {[
              "128% average hike via our placement cell",
              "1.5 Lac+ learners cracked top tech companies",
              "1,400+ alumni in MAANG & 103 unicorn startups",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#15181A] px-5 py-4 border-t border-[#2d2d2d] hover:bg-[#1a1a1a] transition shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
              >
                <img src="/check.svg" alt="check" className="h-4 w-4" />
                <div className="w-px h-5 bg-[#3a3a3a]" />
                <p className="text-gray-300 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="relative w-full sm:w-[85%] md:w-[70%] lg:w-[45%] mx-auto flex justify-center">

          {/* Glow */}
          <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
            <div className="w-[92%] max-w-sm h-full rounded-[2rem]
              bg-gradient-to-b from-[#CBB997] via-[#CBB997] to-[#08405F]
              opacity-40 blur-2xl" />
          </div>
          
          {/* Border */}
          <div className="absolute w-[92%] max-w-sm h-full rounded-[2rem]
            border-[12px] border-[#15181A] z-30 pointer-events-none" />

          {/* Form */}
          <div className="relative bg-white text-gray-800 rounded-[2.1rem]
            p-6 sm:p-8 max-w-sm w-[90%] mx-auto z-10">

            <h2 className="text-base sm:text-lg font-semibold mb-3">
              Let's find the right course for you
            </h2>

            <p className="text-xs text-gray-700 mb-2">Experience</p>

            <div
              className={`space-y-2 mb-4 ${
                experienceTouched ? "" : ""
              }`}
              onBlur={() => setExperienceTouched(true)}
            >
              {[
                "Working Professional - Technical Roles",
                "Working Professional - Non Technical",
                "College Student - Final Year",
                "College Student - 1st to Pre-final Year",
                "Others",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2 text-[13px]">
                  <input
                    type="radio"
                    name="experience"
                    required
                    className="accent-black"
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* ✅ FIXED SELECT */}
            <TopicSelect
              value={topic}
              setValue={setTopic}
              touched={topicTouched}
              setTouched={setTopicTouched}
            />

            {/* INPUTS */}
            {[
              { key: "name", label: "Name" },
              { key: "phone", label: "Phone Number" },
              { key: "email", label: "Email" },
            ].map(({ key, label }) => (
              <div key={key} className="">
                <label className="text-[12px] text-gray-700">{label}</label>
                <input
                  type="text"
                  value={values[key]}
                  onChange={(e) =>
                    setValues({ ...values, [key]: e.target.value })
                  }
                  onBlur={() =>
                    setTouched({ ...touched, [key]: true })
                  }
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={`
                    w-full rounded-md p-2 text-xs sm:text-sm
                    border focus:outline-none
                    ${
                      isError(key)
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }
                  `}
                />
                {isError(key) && (
                  <p className="text-[10px] text-[#F66B60]">
                    {label} is required
                  </p>
                )}
              </div>
            ))}

            <button className="w-full bg-[#F26A21] text-white py-2.5 rounded-md
              font-medium hover:bg-[#e45f1c] transition mt-2">
              Find your course
            </button>

            <p className="text-[7px] text-gray-500 mt-3 leading-snug">
              I authorise Coding Ninjas to contact me with course updates & offers via
              Email/SMS/Whatsapp/Call. I agree to{" "}
              <span className="text-orange-600 underline">Privacy Policy</span> &{" "}
              <span className="text-orange-600 underline">Terms of use</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
