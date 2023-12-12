import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import styles from "../assets/styles/SignIn.module.css";

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpScreen, setOtpScreen] = useState(false); // State variable to show/hide the OTP screen
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to store OTP digits
  const refs = [useRef(), useRef(), useRef(), useRef()]; // Refs for each OTP input
  const navigate = useNavigate();

  const [requestId, setRequestId] = useState(""); // State variable to store request ID returned by the API

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Combine the OTP digits
    try {
      const response = await fetch(
        `https://dev.api.goongoonalo.com/v1/auth/verify_otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            otp: enteredOtp,
            requestId,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://dev.api.goongoonalo.com/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
          }),
        }
      );
      const data = await response.json();
      setRequestId(data.requestId);
      if (response.status === 200) {
        setOtpScreen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input box
    if (index < refs.length - 1 && value !== "") {
      refs[index + 1].current.focus();
    }
  };

  return (
    <div className={styles.container_signin}>
      {otpScreen ? (
        <form className={styles.otp_box} onSubmit={handleVerify}>
          <h1 className={styles.otptext}>OTP Verification</h1>
          <p className={styles.desc}>
            We have sent an OTP to {phoneNumber}. Please enter the code received
            to verify.
          </p>
          <div className={styles.code_container}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={refs[index]}
                type="text"
                className={styles.code}
                placeholder="0"
                min={0}
                max={9}
                value={digit}
                autoFocus={index === 0 ? true : false}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>
          <input type="submit" className={styles.signbutton} value="Verify" />
          <button
            className={styles.resdiv}
            disabled={timer !== 0}
            onClick={(e) => {
              setTimer(30);
              sendOtp(e);
            }}
          >
            Resend OTP {timer === 0 ? "" : `in ${timer}s`}
          </button>
          <button
            className={styles.resdiv}
            onClick={() => {
              setPhoneNumber("");
              setOtpScreen(false);
            }}
          >
            Use another number
          </button>
        </form>
      ) : (
        <form className={styles.signin_box} onSubmit={sendOtp}>
          <h1 className={styles.signin}>Sign In</h1>
          <p className={styles.desc}>
            Please enter your mobile number to login. We will send an OTP to
            verify your number.
          </p>
          <PhoneInput
            defaultCountry="in"
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            className={styles.phoneInputField}
            autoFocus
          />
          <input type="submit" value="Sign In" className={styles.signbutton} />
        </form>
      )}
    </div>
  );
};

export default SignIn;
