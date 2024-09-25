import { useState } from "react";

export default function Contact({ contactMail }) {
  // En useState for å holde på skjemadataen
  const [contactData, setContactData] = useState({
    name: "",
    title: "",
    message: "",
  });

  // useState for å holde på innsendt melding
  const [submittedData, setSubmittedData] = useState(null);

  // Funksjon som håndterer innsending av skjemaet
  const handleContactFormSubmit = (event) => {
    event.preventDefault();
    // Lagre dataene som er sendt inn
    setSubmittedData(contactData);
    // Nullstill skjemaet
    setContactData({
      name: "",
      title: "",
      message: "",
    });
  };

  // Funksjon for å håndtere evt endringer i inputfeltene
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Oppdatere kun det feltet som er endret
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funksjon for å vise email
  const handleEmail = () => {
    alert(`Mailadr: ${contactMail}`);
  };

  return (
    <>
      <h1>Contact</h1>
      <section>
        <h2>Send me an email</h2>
        <button onClick={handleEmail} className="addProjectButton">
          Show email, please
        </button>
      </section>
      <section id="addProjectForm">
        <form onSubmit={handleContactFormSubmit}>
          <h2>Or write me a message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={contactData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={contactData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="message"
            placeholder="Your message"
            required
            value={contactData.message}
            onChange={handleInputChange}
          />
          <button type="submit" className="addProjectButton">
            Send
          </button>
        </form>
      </section>

      {submittedData && (
        <section>
          <h2>Hello, {submittedData.name}! You have sent this message:</h2>
          <p>
            <strong>Title:</strong> {submittedData.title}
          </p>
          <p>
            <strong>Message:</strong> {submittedData.message}
          </p>
        </section>
      )}
    </>
  );
}
