import { useEffect, useState } from "react";

type Props = {
  start: any;
  timeoutInSeconds: number;
  finished: () => void;
  className?: string;
};

const Timer: React.FC<Props> = ({
  start,
  timeoutInSeconds,
  finished,
  className,
}) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (timeoutInSeconds === 0) return;

    let interval = setInterval(() => {
      setTime(timeoutInSeconds--);
      if (timeoutInSeconds === 0) {
        clearInterval(interval);
        finished();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeoutInSeconds, start]);

  return <div className={className}>{time}</div>;
};

export default Timer;
