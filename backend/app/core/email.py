import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

def send_email(to_emails: list[str], subject: str, body: str):
    if not to_emails:
        return

    msg = MIMEMultipart()
    msg["From"] = settings.smtp_from_email
    msg["To"] = ", ".join(to_emails)
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
            server.starttls()
            server.login(settings.smtp_username, settings.smtp_password)
            server.sendmail(settings.smtp_from_email, to_emails, msg.as_string())
    except Exception as e:
        # We never want a broken email config to block an enquiry from saving.
        # Log it and move on — the enquiry is still safely stored in MongoDB either way.
        print(f"Failed to send enquiry notification email: {e}")