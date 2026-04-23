const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event));

  const { clientName, clientEmail, serviceId, date, time, bookingId } = event;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // clave de aplicación
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: clientEmail,
    subject: `Reserva confirmada #${bookingId}`,
    html: `
      <h2>¡Hola ${clientName}!</h2>
      <p>Tu reserva ha sido creada exitosamente.</p>
      <ul>
        <li><strong>ID:</strong> ${bookingId}</li>
        <li><strong>Servicio:</strong> ${serviceId}</li>
        <li><strong>Fecha:</strong> ${date}</li>
        <li><strong>Hora:</strong> ${time}</li>
        <li><strong>Estado:</strong> Pendiente</li>
      </ul>
      <p>Te notificaremos cuando sea confirmada.</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};