import cv2
import numpy as np
from IPython import display
from matplotlib import pyplot as plt
import datetime
import os

if __name__ == '__main__':
    # 現在画像を取り込む
    camera = cv2.VideoCapture(1)

    ret, frame = camera.read()

    if ret:
        print('Success')
        cv2.imwrite('final.png', frame)

    else:
        print('Failed')


    # 画像の読み込み
    img_src1 = cv2.imread("start.png", 0)
    img_src2 = cv2.imread("final.png", 0)

    fgbg = cv2.createBackgroundSubtractorMOG2()

    fgmask = fgbg.apply(img_src1)
    fgmask = fgbg.apply(img_src2)

    # 表示
    #cv2.imshow('frame', fgmask)

    # 検出画像
    bg_diff_path = 'result.png'
    cv2.imwrite(bg_diff_path, fgmask)
    print('Success2')
    cv2.waitKey(0)
    cv2.destroyAllWindows()