import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { MdMic, MdMicNone } from "react-icons/md";
import { useAppSelector } from "../../app/hooks";
import { selectLangs } from "../../app/langs/langsSlice";
import styles from "./SpeechToText.module.scss";

type Props = {
  recording: boolean;
  toggle: (recording: boolean) => void;
  text: (text: string) => void;
  style?: any;
};

const SpeechToText: React.FC<Props> = ({ recording, toggle, text, style }) => {
  const [recognition, setRecognition] = useState<SpeechRecognition>();
  const { locale } = useAppSelector(selectLangs);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = locale;
    setRecognition(recognition);
  }, [locale]);

  useEffect(() => {
    if (!recognition) return;
    if (recording) {
      recognition.start();
    } else {
      recognition.abort();
    }
  }, [recording, recognition]);

  if (recognition) {
    if (recording) {
      recognition.onresult = (event) => {
        var interimTranscripts = "";
        for (var i = event.resultIndex; i < event.results.length; i++) {
          var transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            text(transcript);
          } else {
            interimTranscripts += transcript;
          }
        }
        // console.log(`interimTranscripts=${interimTranscripts}`);
      };

      recognition.onend = (event) => {
        console.log("onend", event);
      };

      recognition.onerror = (event) => {
        console.error(event);
      };
    } else {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    }
  }

  return (
    <div className={styles.select} style={style}>
      <Button
        // icon="pi pi-eye"
        className={
          `p-button-rounded` +
          (recording ? " p-button-danger" : " p-button-text")
        }
        onClick={() => {
          // dispatch(viewCard(card));
          toggle(!recording);
        }}
        style={{ padding: "5px", zoom: 1.3 }}
      >
        {recording ? <MdMic /> : <MdMicNone />}
      </Button>
    </div>
  );
};

export default SpeechToText;
