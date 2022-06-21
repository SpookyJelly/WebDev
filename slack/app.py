import socket
import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
import random

client = WebClient(
    token="xoxb-3721487276464-3700150731252-jNnVXoMSk14wpEl8AjN1KXq7")

cnt = 0


def send_message():
    global cnt
    try:
        response = client.chat_postMessage(
            channel='#sandbox', text=f"Hello, world! {cnt+1}")
        assert response["message"]["text"] == f"Hello, world! {cnt+1}"
        cnt += 1
    except SlackApiError as e:
        assert e.response['ok'] is False
        assert e.response["error"]
        print(f"에러 발생 : {e.response['error']}")


def loopTesting():
    ran_num = random.randrange(1, 150)
    print('ran_num', ran_num)
    if(ran_num >= 70):
        send_message()
    else:
        print('DO NOT CHANGED')


for i in range(1, 10):
    loopTesting()

print('cnt', cnt)
