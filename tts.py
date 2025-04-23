# tts.py
import sys
from gtts import gTTS

text = sys.argv[1]
lang = sys.argv[2]
output = sys.argv[3]

tts = gTTS(text=text, lang=lang)
tts.save(output)
