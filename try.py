import cv2
import numpy as np
from IPython import display
from matplotlib import pyplot as plt
import datetime
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#画像読み込み
img = cv2.imread('result.png')

#グレースケール化
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#2値化
ret, bin_img = cv2.threshold(gray, 86, 100, cv2.THRESH_BINARY_INV)
#cv2.imshow(bin_img)
threshold = 120
bin_img = gray.copy()
bin_img[bin_img<threshold] = 0
bin_img[bin_img>=threshold] = 255
#輪郭抽出
contours, hierarchy = cv2.findContours(bin_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#小さい輪郭を削除
contours = list(filter(lambda x: cv2.contourArea(x)>100000, contours))

#輪郭を描写
cv2.drawContours(img, contours, -1, color=(0,255,0),thickness=5)

final_area = 0

for i in range(len(contours)):
    area = cv2.contourArea(contours[i])
    print(i, area)
    final_area = final_area + area

cv2.imshow('', img)
cv2.imwrite('outline.png', img)
print(final_area)

cred = credentials.Certificate("/Users/daiki.m/Desktop/supporters/gikucamp-firebase-adminsdk-bw43u-2fb954e096.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
ref = db.collection(u'data')
docs = ref.stream()

for doc in docs:
    print(u'{} => {}'.format(doc.id, doc.to_dict()))
###################################################################################


input_cvdata = final_area
####################################################################################
doc_ref = db.collection(u'data').document(u'90TwVL13wTuPpmCgw24C')
doc_ref.set({
    u'amount': f"{input_cvdata}",
})