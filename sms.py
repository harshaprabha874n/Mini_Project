from twilio.rest import Client
import mysql.connector
from datetime import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Twilio credentials
account_sid = ''
auth_token = ''
twilio_number = ''  # Replace with your Twilio number
client = Client(account_sid, auth_token)

# Email credentials and configuration
smtp_server = 'smtp.nharshaprabha@gmail.com'  # E.g., 'smtp.gmail.com' for Gmail
smtp_port = 587  # 587 for TLS, 465 for SSL (confirm with your provider)
email_user = 'nharshaprabha@gmail.com'
email_password = 'H72004'

# Database configuration
db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'flower_shop',
    'port':'8080'
}

# Function to send SMS and Email reminders
def send_reminders():
    # Connect to the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Get current date and time
    current_date = datetime.now().strftime('%Y-%m-%d')
    current_time = datetime.now().strftime('%H:%M')

    # Select reminders due now
    query = "SELECT phone, email, occasionName FROM reminders WHERE occasionDate = %s AND occasionTime = %s"
    cursor.execute(query, (current_date, current_time))

    # Send SMS and Email reminders
    for (phone, email, occasionName) in cursor:
        # Send SMS
        try:
            message = client.messages.create(
                body=f"Reminder: Don't forget your {occasionName} today!",
                from_=twilio_number,
                to=phone
            )
            print(f"SMS sent to {phone} for occasion: {occasionName}")
        except Exception as e:
            print(f"Error sending SMS to {phone}: {e}")

        # Send Email
        try:
            send_email(email, occasionName)
            print(f"Email sent to {email} for occasion: {occasionName}")
        except Exception as e:
            print(f"Error sending email to {email}: {e}")

    cursor.close()
    conn.close()

# Helper function to send email
def send_email(email, occasionName):
    # Set up the email server and login
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(email_user, email_password)

    # Compose the email
    msg = MIMEMultipart()
    msg['From'] = email_user
    msg['To'] = to_email
    msg['Subject'] = "Occasion Reminder"

    # Email body
    body = f"Hello,\n\nThis is a friendly reminder for your upcoming occasion: {occasionName} today.\n\nBest regards,\nBlossom Bazaar"
    msg.attach(MIMEText(body, 'plain'))

    # Send the email
    server.sendmail(email_user, to_email, msg.as_string())
    server.quit()

# Call the function to send reminders
send_reminders()
