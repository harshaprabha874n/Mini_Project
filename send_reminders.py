from twilio.rest import Client
SID=""
token=""
ct=Client(SID,token)
ct.messages.create(body="hello \n Reminder: Don't forget your Birthday today! \n \n thank you❤️ \n\nBlossomBazaar Teams",from_='+12564642018' ,to ='7904324567')
