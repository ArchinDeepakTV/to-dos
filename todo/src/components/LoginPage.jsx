import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [mail_id, set_mail_id] = React.useState("");
  const [password, set_password] = React.useState("");
  const [styles, set_styles] = React.useState({ display: "none" });
  const nodeBackendURL = sessionStorage.getItem("nodeBackendURL");

  const handle_form = async () => {
    if (
      mail_id.includes("@") &&
      mail_id.length > 0 &&
      password.length >= 8 &&
      mail_id.includes(".com") &&
      !mail_id.includes("@.com")
    ) {
      set_styles({ display: "none" });
      let new_entry = { mail_id: mail_id, password: password };
      await fetch(
        `${nodeBackendURL}/DB-check-password`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(new_entry),
        },
        { mode: "cors" }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else
      set_styles({
        textAlign: "center",
        display: "block",
        color: "red",
        fontSize: "18px",
      });
    // reroute to another page or take to frontpage
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100vw",
        border: "1px solid black",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid black",
          maxWidth: "45%",
          width: "30vw",
        }}
      >
        <h1 style={{ textAlign: "center" }}>LOGIN TO to-DO</h1>
        <Link to={"/register"}>
          <div
            className="flexJustifyCenter"
            style={{
              margin: "10px",
              border: "1px solid black",
              borderRadius: "1vh",
              backgroundColor: "aquamarine",
            }}
          >
            <button
              className="btn"
              type="submit"
              style={{ width: "20vw", textAlign: "center" }}
            >
              <b>Register</b>
            </button>
          </div>
        </Link>
      </div>
      <div style={{ borderLeft: "2px solid black", height: "99vh" }}></div>
      <div>
        <form onSubmit={handle_form}>
          <input
            type="text"
            placeholder="mail id"
            maxLength={40}
            autoFocus
            style={{
              textAlign: "center",
              margin: "10px",
              height: "3vh",
              width: "15vw",
              border: "1px solid gray",
              backgroundColor: "white",
              color: "black",
            }}
            value={mail_id}
            onChange={(e) => set_mail_id(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            maxLength={20}
            style={{
              textAlign: "center",
              margin: "10px",
              height: "3vh",
              width: "15vw",
              border: "1px solid gray",
              backgroundColor: "white",
              color: "black",
            }}
            value={password}
            onChange={(e) => set_password(e.target.value)}
          />
          <br />
          <div
            className="flexJustifyCenter"
            style={{
              margin: "10px",
              border: "2px solid black",
              borderRadius: "1vh",
              textAlign: "center",
            }}
          >
            <button className="btn" type="submit">
              <b>Login</b>
            </button>
          </div>
        </form>
        <div>
          <h4 style={styles}>INVALID CREDENTIALS</h4>
        </div>
      </div>
    </div>
  );
}
