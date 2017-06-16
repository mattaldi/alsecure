import cv2
import serial
import requests
import json
import ftplib
import time

global last_received

header = {"Content-Type": "application/json; charset=utf-8",
          "Authorization": "Basic Y2YwMGRlMjEtMjI2Ni00NDJmLThhNzYtZGI2MjZiNTBjZWRi"}
session = ftplib.FTP('server29.000webhost.com','a7191699','4k4tsuk1')
ser = serial.Serial('/dev/ttyACM0', 9600)
buffer_string = ''
last_received = ''
detect = 0
detekawal = "yes"
i = 0
cv2.namedWindow('alsecure')
camera = cv2.VideoCapture(0)
foto_n = 0

while True:

    (ret, frame) = camera.read()
    frame = cv2.flip(frame,1)

    buffer_string = buffer_string + ser.read(ser.inWaiting())
    if '\r\n' in buffer_string:
        lines = buffer_string.split('\r\n')
        last_received = lines[-2]
        buffer_string = lines[-1]

    print last_received

    if (last_received == "terdeteksi"):
        i = i + 1
        #print i
        if (detekawal == "yes"):
            detect = 1
            print "OK"
            
            now = time.strftime("%c")
            foto_n = foto_n + 1
            namafoto = "foto-%d.jpg _ %s " %(foto_n, now)
            cv2.imwrite(namafoto, frame)
            file = open(namafoto,'rb')
            tempatsimpan = 'STOR /public_html/alsecure/foto/%s' %namafoto
            session.storbinary(tempatsimpan, file)
            file.close()
            
            payload = {"app_id": "220693a5-4fcd-460e-99e8-29951e2a1423",
                       "included_segments": ["All"],
                       "contents": {"en": namafoto}}            
            req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))

            detekawal = "no"
            
        
    if (last_received == "tidak"):
        detekawal = "yes"
        i = 0
        
    cv2.imshow("alsecure", frame)
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break

session.quit()
camera.release()
cv2.destroyAllWindows()
