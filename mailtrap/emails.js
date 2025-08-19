const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates")
const { mailtrapClient, sender } = require("./mailtrap")

exports.sendVerificationEmail= async(email,verificationToken) => {
    const recipient = [{email}]

    try {
        const res = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", res)
    } catch (err) {
        console.error(err)
        throw new Error (`Error sending verification email: ${err}` )
    }
}

// exports.sendWelcomeEmail = async