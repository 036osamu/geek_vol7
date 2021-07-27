#!/usr/bin/env python
# coding: utf-8

# In[1]:


import cv2
import numpy as np
from IPython import display
from matplotlib import pyplot as plt
import datetime
import os


# In[2]:


#初めの画像を取り込む
camera = cv2.VideoCapture(0)

ret, frame = camera.read()

if ret:
    print('Success')
    cv2.imwrite('start.png', frame)
    
else:
    print('Failed')


# In[ ]:


#1秒おきに保存
def save_frame_camera_cycle(device_num, dir_path, basename, cycle, ext='png', delay=1, window_name='frame'):
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        return

    os.makedirs(dir_path, exist_ok=True)
    base_path = os.path.join(dir_path, basename)

    n = 0
    while True:
        ret, frame = cap.read()
        cv2.imshow(window_name, frame)
        if cv2.waitKey(delay) & 0xFF == ord('q'):
            break
        if n == cycle:
            n = 0
            cv2.imwrite('final.png', frame)
        n += 1

    cv2.destroyWindow(window_name)


save_frame_camera_cycle(0, 'data/', 'camera_capture_cycle', 300)


# In[7]:


#背景差分の画像を取り出す

if __name__ == '__main__'
    # 画像の読み込み
    img_src1 = cv2.imread("start.png", 1)
    img_src2 = cv2.imread("final.png", 1)

    fgbg = cv2.bgsegm.createBackgroundSubtractorMOG()

    fgmask = fgbg.apply(img_src1)
    fgmask = fgbg.apply(img_src2)

    # 表示
    cv2.imshow('frame',fgmask)

    # 検出画像
    bg_diff_path  = './result.png'
    cv2.imwrite(bg_diff_path,fgmask)

    cv2.waitKey(0)
    cv2.destroyAllWindows()


# In[ ]:


#画像読み込み
img = cv2.imread('result.png')

#グレースケール化
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#2値化
ret, bin_img = cv2.threshold(gray, 86, 100, cv2.THRESH_BINARY_INV)
imshow(bin_img)

#輪郭抽出
contours, hierarchy = cv2.findContours(bin_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#小さい輪郭を削除
contours = list(filter(lambda x: cv2.contourArea(x)>100000, contours))

#輪郭を描写
cv2.drawContours(img,contours, -1, color=(0,0,255),thickness=10)

final_area = 0

for i in range(len(contours)):
    area = cv2.contourArea(contours[i])
    print(i, area)
    final_area = final_area + area
imshow(img)
print(final_area)

