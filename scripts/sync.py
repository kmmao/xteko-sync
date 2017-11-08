# Dependencies: watchdog, requests
# Usage: python sync.py [host] [filename]

import sys
import requests
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

HOST = sys.argv[1]
FILE = sys.argv[2]

class EventHandler(FileSystemEventHandler):
  def on_modified(self, event):
    if event.src_path == './' + FILE:
      files = {'files[]': open(FILE, 'rb')}
      requests.post('http://' + HOST + '/upload', files=files)

observer = Observer()
observer.schedule(EventHandler(), '.')
observer.start()

try:
  while True:
    time.sleep(1)
except KeyboardInterrupt:
  observer.stop()

observer.join()