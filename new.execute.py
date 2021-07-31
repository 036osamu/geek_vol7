import cv2
import numpy as np
from IPython import display
from matplotlib import pyplot as plt
import datetime
import os
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore, storage


if __name__ == '__main__':
    cred = credentials.Certificate(
        "/Users/daiki.m/Desktop/supporters/gikucamp-firebase-adminsdk-bw43u-2fb954e096.json")
    firebase_admin.initialize_app(cred, {'storageBucket': 'gikucamp.appspot.com'})
    db = firestore.client()
    doc_ref = db.collection(u'data').document(u'90TwVL13wTuPpmCgw24C')
    ref = db.collection(u'data')
    docs = ref.stream()

    bucket = storage.bucket()
    filename = 'outline.png'
    content_type = 'outline/png'
    blob = bucket.blob(filename)
    filename2 = 'tiny.png'
    blob = bucket.blob(filename2)

    '''
    # 現在画像を取り込む
    camera = cv2.VideoCapture(1)
    ret, frame = camera.read()
    if ret:
        print('Success')
        cv2.imwrite('final.png', frame)

    else:
        print('Failed')

    '''
    #start_name = 'start.png'
    #final_name = 'final.png'
    start_name = 'outline40.png'
    final_name = 'outline0.png'
    # 画像の読み込み
    img_src1 = cv2.imread(start_name, 0)
    img_src2 = cv2.imread(final_name, 0)

    fgbg = cv2.createBackgroundSubtractorMOG2()

    fgmask = fgbg.apply(img_src1)
    fgmask = fgbg.apply(img_src2)


    # 検出画像
    bg_diff_path = 'result.png'
    cv2.imwrite(bg_diff_path, fgmask)
    print('Success2')

    # 画像読み込み
    img = cv2.imread('result.png')
    img2 = cv2.imread('final.png')

    # グレースケール化
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 2値化
    ret, bin_img = cv2.threshold(gray, 86, 100, cv2.THRESH_BINARY_INV)
    # cv2.imshow(bin_img)
    threshold = 120
    bin_img = gray.copy()
    bin_img[bin_img < threshold] = 0
    bin_img[bin_img >= threshold] = 255
    # 輪郭抽出
    contours, hierarchy = cv2.findContours(bin_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 小さい輪郭を削除
    contours = list(filter(lambda x: cv2.contourArea(x) > 100000, contours))

    # 輪郭を描写
    cv2.drawContours(img2, contours, -1, color=(0, 255, 0), thickness=5)

    final_area = 0

    for a in range(len(contours)):
        area = cv2.contourArea(contours[a])
        print(a, area)
        final_area = final_area + area

    cv2.imshow('', img)
    cv2.imwrite('outline_.png', img2)
    print(final_area)

    '''
    for doc in docs:
        print(u'{} => {}'.format(doc.id, doc.to_dict()))
    ###################################################################################

    input_cvdata = final_area
    ####################################################################################

    doc_ref.set({
        u'amount': f"{input_cvdata}",
    })

    with open(filename2, 'rb') as f:
        blob.upload_from_file(f, content_type=content_type)

    final_name = start_name
    '''